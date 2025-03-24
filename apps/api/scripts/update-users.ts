import { NestFactory } from "@nestjs/core";
import { AppModule } from "../src/app.module";
import { UsersService } from "../src/modules/users/users.service";

async function bootstrap() {
	const app = await NestFactory.createApplicationContext(AppModule);

	try {
		const usersService = app.get(UsersService);

		// Your update logic using the service
		console.log("Starting update...");

		// Example: Get all photos and perform updates
		const users = await usersService.findAll();
		for (const user of users) {
			console.log(user);
			const isGuest = user.email === "guest@mail.com";
			// if (isGuest) await usersService.delete(user._id.toString());
		}

		console.log("Update completed successfully!");
	} catch (error) {
		console.error("Error during update:", error);
	} finally {
		await app.close();
	}
}

bootstrap();

/* run with
npx ts-node -r tsconfig-paths/register scripts/update-users.ts
*/
