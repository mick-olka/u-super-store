import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";
import { UserRole } from "src/schemas/user.schema";

export class UpdateUserDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly first_name?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly last_name?: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  readonly email?: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  readonly hash?: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  readonly hashedRt?: string;

  @ApiProperty({
    description: "User type (user or admin)",
  })
  @IsOptional()
  readonly role?: UserRole;

  @ApiProperty({
    description: "User's orders",
  })
  @IsOptional()
  readonly orders?: string[];
}
