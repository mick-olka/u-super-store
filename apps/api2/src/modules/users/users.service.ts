import { Injectable } from "@nestjs/common";
// import { OnEvent } from "@nestjs/event-emitter";
import { InjectModel } from "@nestjs/mongoose";
// biome-ignore lint/style/useImportType: <explanation>
import mongoose, { Model, PopulateOptions } from "mongoose";
import { Order } from "src/schemas/order.schema";
import { UserRole } from "src/schemas/user.schema";
// import { EVENTS } from "src/utils/constants";
import { User, type UserDocument } from "../../schemas/user.schema";
// import type { OrderCreatedEvent } from "../orders/events";
import type { CreateUserDto } from "./dto/create-user.dto";
import type { UpdateUserDto } from "./dto/update-user.dto";

type UserI = User & { _id: mongoose.Types.ObjectId };

const populateOrders: PopulateOptions = {
	path: "orders",
	populate: {
		// path: "orders",
		path: "order",
		model: Order.name,
		select: "_id name cart",
	},
};

@Injectable()
export class UsersService {
	constructor(
		@InjectModel(User.name)
		private readonly UserModel: Model<UserDocument>,
	) {}

	async create(data: CreateUserDto): Promise<UserI> {
		const createdUser = await this.UserModel.create(data);
		return createdUser;
	}

	async findAll(): Promise<User[]> {
		return this.UserModel.find().exec();
	}

	async findById(id: string): Promise<UserI> {
		return this.UserModel.findOne({ _id: id }).exec();
	}

	async getUserOrders(id: string): Promise<UserI> {
		return (
			this.UserModel.findOne({ _id: id })
				// .select("_id")
				.populate("orders")
				.exec()
		);
	}

	async findOne(params: Partial<User>): Promise<UserI> {
		return this.UserModel.findOne(params).exec();
	}

	async updateOneById(id: string, data: UpdateUserDto): Promise<UserI> {
		return this.UserModel.findOneAndUpdate({ _id: id }, data, { new: true });
	}

	async updateOne(
		searchParams: mongoose.FilterQuery<
			mongoose.Document<unknown, unknown, User> &
				User & {
					_id: mongoose.Types.ObjectId;
				}
		>,
		data: UpdateUserDto,
	): Promise<UserI> {
		return this.UserModel.findOneAndUpdate(searchParams, data, { new: true });
	}

	async delete(id: string): Promise<UserI> {
		const deletedUser = await this.UserModel.findByIdAndDelete({
			_id: id,
		}).exec();
		return deletedUser;
	}

	// @OnEvent(EVENTS.order_created)
	// async handleOrderCreatedEvent(event: OrderCreatedEvent) {
	// 	// add order to user's orders list
	// 	await this.UserModel.findOneAndUpdate(
	// 		{ _id: event.user_id },
	// 		{ $push: { orders: event.order_id } },
	// 		{ new: true },
	// 	);
	// }

	async ensureGuestUserExists(): Promise<User> {
		let user = await this.UserModel.findOne({ name: "Guest" }).exec();
		if (!user) {
			const guestUserData: CreateUserDto = {
				first_name: "Guest",
				last_name: "Guest",
				email: "guest@mail.com",
				role: UserRole.user,
				hash: "guest",
			};
			user = new this.UserModel(guestUserData);
			await user.save();
		}
		return user;
	}
}
