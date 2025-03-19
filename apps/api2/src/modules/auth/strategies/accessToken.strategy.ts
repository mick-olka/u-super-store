import { Injectable } from "@nestjs/common/decorators";
// biome-ignore lint/style/useImportType: <explanation>
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { envNames } from "src/utils/constants";

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, "jwt") {
	constructor(config: ConfigService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: config.get<string>(envNames.ACCESS_TOKEN_SECRET),
		});
	}

	validate(payload: unknown) {
		return payload;
	}
}
