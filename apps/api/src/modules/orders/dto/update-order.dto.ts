import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";
import { type I_Locales, StatusEnum } from "src/schemas/data";
import { type I_OrderItemDto, default_cart_item, orderItem } from "./data";

const notRequired = { required: false };

export class UpdateOrderDto {
	@ApiProperty(notRequired)
	@IsOptional()
	readonly name?: I_Locales;

	@ApiProperty(notRequired)
	@IsOptional()
	@IsString()
	readonly phone?: string;

	@ApiProperty(notRequired)
	@IsOptional()
	@IsString()
	readonly message?: string;

	@ApiProperty(notRequired)
	@IsOptional()
	@IsNumber()
	readonly sum?: number;

	@ApiProperty({ enum: StatusEnum, required: false })
	@IsOptional()
	@IsString()
	readonly status?: string;

	@ApiProperty({
		type: () => orderItem,
		required: false,
		isArray: true,
		default: [default_cart_item],
	})
	@IsOptional()
	readonly cart?: I_OrderItemDto[];
}
