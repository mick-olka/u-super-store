import { Injectable } from "@nestjs/common";
// biome-ignore lint/style/useImportType: <explanation>
import { EventEmitter2 } from "@nestjs/event-emitter";
import { InjectModel } from "@nestjs/mongoose";
import type mongoose from "mongoose";
// biome-ignore lint/style/useImportType: <explanation>
import { Order, OrderDocument } from "src/schemas/order.schema";
import { Product } from "src/schemas/product.schema";
import { UserDocument } from "src/schemas/user.schema";
import { EVENTS } from "src/utils/constants";
import type {
	PaginationQuery,
	PromisePaginationResT,
} from "src/utils/interfaces";
import { getFilterForSearch } from "src/utils/utils";
import type { CreateOrderDto } from "./dto/create-order.dto";
import type { UpdateOrderDto } from "./dto/update-order.dto";
import { OrderCreatedEvent, OrderDeletedEvent } from "./events";

type OrderI = Order & { _id: mongoose.Types.ObjectId };

const populateProducts = {
	path: "cart",
	populate: {
		path: "product",
		model: Product.name,
		select: "_id name url_name price product thumbnail index",
	},
};

@Injectable()
export class OrdersService {
	constructor(
		private eventEmitter: EventEmitter2,
		@InjectModel(Order.name)
		private readonly OrderModel: mongoose.Model<OrderDocument>,
	) {}

	async findAll({
		page = "1",
		limit = "20",
		regex,
	}: PaginationQuery): PromisePaginationResT<OrderI> {
		const p = Number(page);
		const l = Number(limit);
		const count = await this.OrderModel.countDocuments();
		const filter = getFilterForSearch(regex, ["name", "phone"]);
		const items = await this.OrderModel.find(filter)
			.sort({ date: -1 })
			.skip((p - 1) * l)
			.limit(l);
		return { count, docs: items };
	}

	async findOne(id: string): Promise<OrderI> {
		return this.OrderModel.findOne({ _id: id })
			.populate(populateProducts)
			.exec();
	}

	async create(data: CreateOrderDto, userId: string | null): Promise<OrderI> {
		if (!userId) {
			// const guestUser = await this.UserService.();
		}
		const order_data = { ...data, date: new Date(), user: userId || undefined };
		const createdOrder = await this.OrderModel.create(order_data);
		const orderCreatedEvent = new OrderCreatedEvent(
			userId,
			createdOrder._id.toString(),
		);
		this.eventEmitter.emit(EVENTS.order_created, orderCreatedEvent);
		return createdOrder;
	}

	async update(id: string, data: UpdateOrderDto): Promise<OrderI> {
		const updatedItem = await this.OrderModel.findOneAndUpdate(
			{ _id: id },
			data,
			{ new: true },
		);
		return updatedItem;
	}

	async delete(id: string, userId: string): Promise<OrderI> {
		const deletedOrder = await this.OrderModel.findByIdAndDelete({
			_id: id,
		}).exec();
		const orderDeletedEvent = new OrderDeletedEvent(
			userId,
			deletedOrder._id.toString(),
		);
		this.eventEmitter.emit(EVENTS.order_deleted, orderDeletedEvent);
		return deletedOrder;
	}

	// @OnEvent(EVENTS.product_deleted)
	// async handleProductDeletedEvent(event: ProductDeletedEvent) {
	//   //
	// }
}
