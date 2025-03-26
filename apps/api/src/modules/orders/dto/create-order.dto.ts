import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { type I_Locales, StatusEnum } from "src/schemas/data";
import { type I_OrderItemDto, default_cart_item, orderItem } from "./data";

const notRequired = { required: false };

export class CreateOrderDto {
	@ApiProperty({ default: "Matt Dock" })
	@IsString()
	@IsNotEmpty()
	readonly name: I_Locales;

	@ApiProperty({ default: "+380963963930" })
	@IsNotEmpty()
	@IsString()
	readonly phone: string;

	@ApiProperty(notRequired)
	@IsOptional()
	@IsString()
	readonly message?: string;

	@ApiProperty({ default: 1000 })
	@IsNumber()
	readonly sum: number;

	@ApiProperty({ enum: StatusEnum, default: StatusEnum.w })
	@IsOptional()
	@IsString()
	readonly status: string;

	@ApiProperty({
		type: () => orderItem,
		isArray: true,
		default: [default_cart_item],
	})
	@IsNotEmpty()
	readonly cart: I_OrderItemDto[];
}
