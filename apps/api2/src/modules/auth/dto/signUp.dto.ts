import {
  IsNotEmpty,
  IsEmail,
  IsString,
  IsOptional,
  IsEnum,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { UserRole } from "src/schemas/user.schema";

export class SignUpDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  first_name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  last_name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description: "User type (user or admin)",
  })
  @IsNotEmpty()
  @IsEnum(UserRole)
  type: UserRole;

  @ApiProperty({
    description: "Admin Key (if you want to set role admin)",
  })
  @IsOptional()
  admin_key: string;
}
