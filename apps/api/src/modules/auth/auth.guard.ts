import { Injectable } from "@nestjs/common";
// biome-ignore lint/style/useImportType: <explanation>
import {
	CanActivate,
	ExecutionContext,
	UnauthorizedException,
} from "@nestjs/common";
// biome-ignore lint/style/useImportType: <explanation>
import { ConfigService } from "@nestjs/config";
// biome-ignore lint/style/useImportType: <explanation>
import { JwtService } from "@nestjs/jwt";
import { envNames } from "src/utils/constants";

@Injectable()
export class IsAdminGuard implements CanActivate {
	constructor(
		private readonly jwtService: JwtService,
		private config: ConfigService,
	) {}

	canActivate(context: ExecutionContext): boolean {
		const request = context.switchToHttp().getRequest();
		const token = request.headers.authorization?.split(" ")[1];
		if (token) {
			try {
				const decoded = this.jwtService.verify(token, {
					secret: this.config.get<string>(envNames.ACCESS_TOKEN_SECRET),
				});
				return decoded.role === "admin"; // Check if user type is 'admin'
			} catch (error) {
				// console.log(error);
				throw new UnauthorizedException("Invalid token"); // Handle JWT verification error
			}
		} else {
			throw new UnauthorizedException("Authorization token not provided"); // No token provided
		}
	}
}
