import { Injectable } from "@nestjs/common";
// biome-ignore lint/style/useImportType: <explanation>
import { EventEmitter2, OnEvent } from "@nestjs/event-emitter";
import { InjectModel } from "@nestjs/mongoose";
import type mongoose from "mongoose";
import { EVENTS } from "src/utils/constants";
import { getAllFiles } from "src/utils/files";
import type {
	PaginationQuery,
	PromisePaginationResT,
} from "src/utils/interfaces";
import { getProductsJSON, transferOneProduct } from "src/utils/transfer";
import { getFilterForSearch, getUrlNameFilter } from "src/utils/utils";
import { Product, type ProductDocument } from "../../schemas/product.schema";
import type { CollectionItemsUpdatedEvent } from "../collections/events/collection-items-updated.event";
import type { PhotosAddedEvent, PhotosDeletedEvent } from "../photos/events";
import type { CreateProductDto } from "./dto/create-product.dto";
import type { UpdateProductDto } from "./dto/update-product.dto";
import {
	ProductDeletedEvent,
	ProductImportedEvent,
} from "./events/product-deleted.event";

type ProductI = Product & { _id: mongoose.Types.ObjectId };

const populateProductsSelector =
	"_id name url_name thumbnail price old_price index active description";

const populateCollectionSelector = "_id name url_name";
@Injectable()
export class ProductsService {
	constructor(
		private eventEmitter: EventEmitter2,
		@InjectModel(Product.name)
		private readonly ProductModel: mongoose.Model<ProductDocument>,
	) {}

	async findAll({
		page = "1",
		limit = "99",
		regex,
		all,
	}: PaginationQuery): PromisePaginationResT<ProductI> {
		const p = Number(page);
		const l = Number(limit);
		const filter = getFilterForSearch(
			regex || null,
			["code", "name.ua", "name.en"],
			all,
		);
		const count = await this.ProductModel.countDocuments(filter);
		const items = await this.ProductModel.find(filter)
			.select(populateProductsSelector)
			.sort({ index: "asc", name: "asc" })
			.skip((p - 1) * l)
			.limit(l);
		return { count, docs: items };
	}

	async findOne(id: string): Promise<ProductI> {
		return this.ProductModel.findOne(getUrlNameFilter(id))
			.populate("collections", populateCollectionSelector)
			.populate("photos")
			.populate("related_products", populateProductsSelector)
			.populate("similar_products", populateProductsSelector);
	}

	async create(data: CreateProductDto): Promise<ProductI> {
		const createData = { ...data, collections: [] };
		return await this.ProductModel.create(createData);
	}

	async update(id: string, data: UpdateProductDto): Promise<ProductI> {
		return this.ProductModel.findOneAndUpdate(getUrlNameFilter(id), data, {
			new: true,
		});
	}

	async delete(id: string): Promise<ProductI> {
		const deletedProduct = await this.ProductModel.findOneAndDelete(
			getUrlNameFilter(id),
		);

		const productDeletedEvent = new ProductDeletedEvent(id, deletedProduct);
		this.eventEmitter.emit(EVENTS.product_deleted, productDeletedEvent);

		return deletedProduct;
	}

	async addPhotos(id: string, photos_id: string): Promise<ProductI> {
		return this.ProductModel.findByIdAndUpdate(id, {
			$addToSet: { photos: [photos_id] },
		});
	}

	async transferOneProduct(index?: number): Promise<Product> {
		const json = await getProductsJSON();
		const data = transferOneProduct(json[index]);
		const new_pr = await this.ProductModel.create(data.product);
		const productImportEvent = new ProductImportedEvent(new_pr.id, data.photos);
		this.eventEmitter.emit(EVENTS.product_import, productImportEvent);
		return new_pr;
	}

	async transferAllProducts(): Promise<number> {
		const json = await getProductsJSON();
		let counter = 0;
		for (const i in json) {
			try {
				const data = transferOneProduct(json[i]);
				const new_pr = await this.ProductModel.create(data.product);
				const productImportEvent = new ProductImportedEvent(
					new_pr.id,
					data.photos,
				);
				this.eventEmitter.emit(EVENTS.product_import, productImportEvent);
				counter++;
			} catch (e) {
				console.log(`E: ${json[i]._id}`);
				console.log(e);
			}
		}
		return counter;
	}

	async renamePhotos(): Promise<object> {
		const files = getAllFiles();
		return files.filter((f) => f.includes(" "));
	}

	async removePhotos(id: string, photos_id: string): Promise<ProductI> {
		return this.ProductModel.findByIdAndUpdate(id, {
			$pull: { photos: photos_id },
		});
	}

	@OnEvent(EVENTS.photos_deleted)
	async handlePhotoDeletedEvent(event: PhotosDeletedEvent) {
		// remove photo ref in product
		await this.removePhotos(event.product_id, event.id);
	}

	@OnEvent(EVENTS.photos_added)
	async handlePhotoAddedEvent(event: PhotosAddedEvent) {
		// add photo ref in product
		await this.addPhotos(event.product_id, event.id);
	}

	@OnEvent(EVENTS.collection_items_updated)
	async handleCollectionItemsUpdatedEvent(event: CollectionItemsUpdatedEvent) {
		// add or remove collection to products
		const items = event.data.items;
		for (const i in items) {
			let new_data = {};
			if (event.data.action === "add")
				new_data = { $addToSet: { collections: [event.id] } };
			else new_data = { $pullAll: { collections: [event.id] } };
			await this.update(items[i], new_data);
		}
	}
}
