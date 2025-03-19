import { Injectable } from "@nestjs/common/decorators";
// biome-ignore lint/style/useImportType: <explanation>
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import type { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
	Strategy,
	"jwt-refresh",
) {
	constructor(config: ConfigService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: config.get<string>("REFRESH_TOKEN_SECRET"),
			passReqToCallback: true,
		});
	}

	validate(req: Request, payload: object) {
		const refreshToken = req.get("authorization").replace("Bearer", "").trim();
		return {
			...payload,
			refreshToken,
		};
	}
}
