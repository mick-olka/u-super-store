import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
	getInfo(): string {
		return "This is an API for the Super Store project";
	}
}
