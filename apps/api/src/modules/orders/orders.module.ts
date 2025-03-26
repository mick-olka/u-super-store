import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { Order, OrderSchema } from "src/schemas/order.schema";
import { OrdersController } from "./orders.controller";
import { OrdersService } from "./orders.service";

@Module({
	imports: [
		JwtModule.register({}),
		MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
	],
	controllers: [OrdersController],
	providers: [OrdersService],
})
export class OrdersModule {}
