import { Injectable } from "@nestjs/common";
// biome-ignore lint/style/useImportType: <explanation>
import { EventEmitter2, OnEvent } from "@nestjs/event-emitter";
import { InjectModel } from "@nestjs/mongoose";
import type mongoose from "mongoose";
import {
	type PhotosDocument,
	Photos as PhotosSchema,
} from "src/schemas/photos.schema";
import { EVENTS } from "src/utils/constants";
import { deleteFile } from "src/utils/files";
import type {
	ProductDeletedEvent,
	ProductImportedEvent,
} from "../products/events/product-deleted.event";
import type { CreatePhotosDto } from "./dto/create-photos.dto";
import type { UpdatePhotosDto } from "./dto/update-photos.dto";
import { PhotosAddedEvent, PhotosDeletedEvent } from "./events";

type PhotosI = PhotosSchema & { _id: mongoose.Types.ObjectId };

@Injectable()
export class PhotosService {
	constructor(
		private eventEmitter: EventEmitter2,
		@InjectModel(PhotosSchema.name)
		private readonly PhotosModel: mongoose.Model<PhotosDocument>,
	) {}

	async findAll(): Promise<PhotosI[]> {
		return this.PhotosModel.find().exec();
	}

	async findOne(id: string): Promise<PhotosI> {
		return this.PhotosModel.findOne({ _id: id }).exec();
	}

	async create(product_id: string, data: CreatePhotosDto): Promise<PhotosI> {
		const createdItem = await this.PhotosModel.create(data);
		const photosAddedEvent = new PhotosAddedEvent(
			String(createdItem._id),
			product_id,
			createdItem,
		);
		this.eventEmitter.emit(EVENTS.photos_added, photosAddedEvent);
		return createdItem;
	}

	async update(
		id: string,
		data: UpdatePhotosDto,
		files: Express.Multer.File[],
	): Promise<PhotosI> {
		const update_data: {
			path_arr?: string[];
			$addToSet?: { path_arr: string[] };
		} = { ...data };
		// if new files then add to set
		if (files.length) {
			update_data.path_arr = undefined;
			update_data.$addToSet = { path_arr: data.path_arr };
		}
		const updatedItem = await this.PhotosModel.findOneAndUpdate(
			{ _id: id },
			update_data,
			{ new: true },
		);
		return updatedItem;
	}

	async delete(product_id: string, id: string): Promise<PhotosI> {
		// const photos = delete
		const deletedItem = await this.PhotosModel.findByIdAndDelete({
			_id: id,
		}).exec();
		for (const i in deletedItem.path_arr) {
			deleteFile(deletedItem.path_arr[i]);
		}
		const photosDeletedEvent = new PhotosDeletedEvent(
			id,
			product_id,
			deletedItem,
		);
		this.eventEmitter.emit(EVENTS.photos_deleted, photosDeletedEvent);

		return deletedItem;
	}

	async deletePhoto(id: string, filename: string): Promise<PhotosI> {
		const updated_photos = await this.PhotosModel.findOneAndUpdate(
			{ _id: id },
			{
				$pull: { path_arr: filename },
			},
			{ new: true },
		);
		deleteFile(filename);
		return updated_photos;
	}

	@OnEvent(EVENTS.product_deleted)
	async handleProductDeletedEvent(event: ProductDeletedEvent) {
		const p = event.data;
		// delete all photos of the product
		for (const i in p.photos) {
			await this.delete(String(event.id), p.photos[i]);
		}
	}

	@OnEvent(EVENTS.product_import)
	async handleProductImportedEvent(event: ProductImportedEvent) {
		const p = event.data;
		// create photos when product is imported
		for (const i in p) {
			await this.create(String(event.id), p[i]);
		}
	}
}
