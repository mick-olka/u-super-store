import { ApiProperty } from "@nestjs/swagger";
import {
	IsNotEmpty,
	IsNotEmptyObject,
	IsOptional,
	IsString,
} from "class-validator";
import { type I_Locales, default_locales } from "src/schemas/data";

const notRequired = {
	required: false,
};

export class CreateTextBlockDto {
	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	name: string;

	@ApiProperty({ default: default_locales })
	@IsNotEmptyObject()
	text: I_Locales;

	@ApiProperty(notRequired)
	@IsOptional()
	font?: {
		size?: number;
		weight?: number;
		color?: number;
	};

	@ApiProperty(notRequired)
	@IsOptional()
	@IsString()
	url?: string;
}
