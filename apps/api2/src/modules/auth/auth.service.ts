import { Injectable } from "@nestjs/common";
import { ForbiddenException } from "@nestjs/common/exceptions";
// biome-ignore lint/style/useImportType: <explanation>
import { ConfigService } from "@nestjs/config";
// biome-ignore lint/style/useImportType: <explanation>
import { JwtService } from "@nestjs/jwt";
// biome-ignore lint/style/useImportType: <explanation>
import { UsersService } from "../users/users.service";

import * as bcrypt from "bcryptjs";

import { UserRole } from "src/schemas/user.schema";
import { envNames } from "src/utils/constants";
import type { SignInDto, SignUpDto } from "./dto";
import type { Tokens } from "./models";

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private config: ConfigService
  ) {}

  async signUp(dto: SignUpDto): Promise<Tokens> {
    let userRole = dto.type;
    if (dto.admin_key !== this.config.get(envNames.ADMIN_KEY)) {
      userRole = UserRole.user;
      // throw new ForbiddenException("Access denied");
    }
    const hash = await this.hashData(dto.password);
    const newUser = await this.userService.create({
      first_name: dto.first_name,
      last_name: dto.last_name,
      email: dto.email,
      hash,
      role: userRole,
    });
    const tokens = await this.getTokens(
      String(newUser._id),
      newUser.email,
      newUser.role
    );
    await this.updateRefreshToken(String(newUser._id), tokens.refresh_token);
    return tokens;
  }

  async signIn(dto: SignInDto): Promise<Tokens> {
    const user = await this.userService.findOne({
      email: dto.email,
    });

    if (!user) throw new ForbiddenException("Access denied");

    const passwordMatches = await bcrypt.compare(dto.password, user.hash);

    if (!passwordMatches) throw new ForbiddenException("Access denied");

    const tokens = await this.getTokens(
      String(user._id),
      user.email,
      user.role
    );
    await this.updateRefreshToken(String(user._id), tokens.refresh_token);
    return tokens;
  }

  async signInAdmin(dto: SignInDto): Promise<Tokens> {
    const user = await this.userService.findOne({
      email: dto.email,
    });

    if (!user) throw new ForbiddenException("Access denied");

    const passwordMatches = await bcrypt.compare(dto.password, user.hash);

    if (!passwordMatches || user.role !== UserRole.admin)
      throw new ForbiddenException("Access denied");

    const tokens = await this.getTokens(
      String(user._id),
      user.email,
      user.role
    );
    await this.updateRefreshToken(String(user._id), tokens.refresh_token);
    return tokens;
  }

  async logout(
    userId: string,
    userEmail: string
  ): Promise<{ message: string }> {
    await this.userService.updateOne(
      {
        _id: userId,
        hashedRt: {
          $ne: null,
        },
      },
      {
        hashedRt: null,
      }
    );

    return {
      message: `Success, logged out ${userEmail}`,
    };
  }

  async refreshTokens(
    userId: string,
    rt: string
  ): Promise<{ new_token: string }> {
    const user = await this.userService.findById(userId);
    if (!user) throw new ForbiddenException("Access denied");

    const refreshTokenMatches = await bcrypt.compare(rt, user.hashedRt);

    if (!refreshTokenMatches) throw new ForbiddenException("Access denied");

    const tokens = await this.getTokens(
      String(user._id),
      user.email,
      user.role
    );
    await this.updateRefreshToken(String(user._id), tokens.refresh_token);

    return {
      new_token: tokens.access_token,
    };
  }

  async updateRefreshToken(userId: string, refreshToken: string) {
    const hash = await this.hashData(refreshToken);
    await this.userService.updateOneById(userId, {
      hashedRt: hash,
    });
  }

  hashData(data: string) {
    return bcrypt.hash(data, 10);
  }

  async getTokens(
    userId: string,
    email: string,
    userRole: UserRole
  ): Promise<Tokens> {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
          role: userRole,
        },
        {
          secret: this.config.get<string>(envNames.ACCESS_TOKEN_SECRET),
          expiresIn: 60 * 60 * 24,
        }
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
          role: userRole,
        },
        {
          secret: this.config.get<string>(envNames.REFRESH_TOKEN_SECRET),
          expiresIn: 60 * 60 * 24 * 7,
        }
      ),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }
}
