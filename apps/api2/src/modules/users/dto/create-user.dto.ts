import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { UserRole } from "src/schemas/user.schema";

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly first_name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly last_name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly hash: string;

  @ApiProperty({
    description: "User type (user or admin)",
  })
  @IsNotEmpty()
  role: UserRole;

  @ApiProperty({
    required: false,
  })
  @IsString()
  readonly hashedRt?: string;
}
