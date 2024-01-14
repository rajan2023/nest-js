import * as bcrypt from "bcrypt";
import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UserService } from '../user.service';
import User from '../entity/user.entity'; ''
import AppValidationException from 'src/exception/appValidationError.exception';
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) { }

    public async login(loginDto: LoginDto) {
        const user = await this.checkUser(loginDto.email);
        if (!user) {
            throw new AppValidationException({ email: "Please check your credentials" },);
        }
        await this.validatePassword(loginDto.password, user.password);
        return await this.getJwtToken({ userId: user?.id })
    }

    async checkUser(email: string): Promise<User> {
        const user = await this.userService.findUserByEmail(email);
        return user;
    }
    async validatePassword(password: string, hashedPassword: string) {
        const isPasswordMatching = await bcrypt.compare(password, hashedPassword);
        if (!isPasswordMatching) {
            throw new AppValidationException({ user: "Invalid credentials" },);
        }
    }

    async getJwtToken(payload: {
        userId: number,
    }) {
        return await this.jwtService.sign(payload)
    }
}
