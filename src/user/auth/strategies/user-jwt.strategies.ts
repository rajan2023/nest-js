import { Request } from "express";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { UserService } from "src/user/user.service";
@Injectable()
export class UserJwtStrategy extends PassportStrategy(Strategy, "user-jwt") {
    constructor(
        private readonly configService: ConfigService,
        private readonly userService: UserService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (request: Request) => {
                    return request?.headers?.jwt;
                },
            ]),
            secretOrKey: configService.get("JWT_SECRET"),
        });
    }

    async validate(payload: { userId: number}) {
        return this.userService.findUserById(payload.userId);
    }
}
