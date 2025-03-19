import { Test, type TestingModule } from "@nestjs/testing";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

describe("AppController", () => {
	let app: TestingModule;

	beforeAll(async () => {
		app = await Test.createTestingModule({
			controllers: [AppController],
			providers: [AppService],
		}).compile();
	});

	describe("getInfo", () => {
		it('should return "HThis is an API for the Super Store project"', () => {
			const appController = app.get(AppController);
			expect(appController.getHello()).toBe(
				"This is an API for the Super Store project",
			);
		});
	});
});
