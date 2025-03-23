import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class SignInDto {
	@ApiProperty({
		description: "Email of existing account",
		default: "user1@gmail.com",
	})
	@IsNotEmpty()
	@IsEmail()
	email: string;

	@ApiProperty({
		description: "Password of existing account",
		default: "1234",
	})
	@IsNotEmpty()
	@IsString()
	password: string;
}
