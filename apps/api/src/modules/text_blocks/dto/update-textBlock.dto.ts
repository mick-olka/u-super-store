import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";
import { type I_Locales, default_locales } from "src/schemas/data";

const notRequired = {
	required: false,
};

export class UpdateTextBlockDto {
	@ApiProperty(notRequired)
	@IsOptional()
	@IsString()
	name?: string;

	@ApiProperty({ required: false, default: default_locales })
	@IsOptional()
	text?: I_Locales;

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
