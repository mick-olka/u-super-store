// biome-ignore lint/style/useImportType: <explanation>
import { Module, OnModuleInit } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "../../schemas/user.schema";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";

@Module({
	imports: [
		JwtModule.register({}),
		MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
	],
	controllers: [UsersController],
	providers: [UsersService],
	exports: [UsersService],
})
export class UsersModule implements OnModuleInit {
	constructor(private readonly usersService: UsersService) {}

	async onModuleInit() {
		await this.usersService.ensureGuestUserExists();
	}
}
