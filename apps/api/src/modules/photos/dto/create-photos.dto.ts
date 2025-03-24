import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";
import { type I_Locales, default_locales } from "src/schemas/data";

export class CreatePhotosDto {
	readonly main_color: I_Locales;
	readonly pill_color: I_Locales;
	readonly path_arr: string[];
}

export class CreatePhotoMultipartDto {
	@ApiProperty({ required: false, default: default_locales })
	@IsOptional()
	@IsString()
	readonly main_color?: string;

	@ApiProperty({ required: false, default: default_locales })
	@IsOptional()
	@IsString()
	readonly pill_color?: string;

	@ApiProperty({
		type: "string",
		format: "binary",
		required: true,
		isArray: true,
	})
	readonly files: File[];
}
