import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { descryptHash } from 'src/utils';
import { JwtService } from '@nestjs/jwt';

import * as dotenv from 'dotenv'
dotenv.config()

@Injectable()
export class AuthService {
    constructor(
        private UserService: UserService,
        private JwtService: JwtService
    ) {}

    async userValidate(email: string, password: string) {
        const user = await this.UserService.findByEmail(email)
        if (user && descryptHash(password, user.password)) {
            return {
                email: user.email,
                id: user.id,
                role: user.role,
                isBanned: user.isBanned,
                banReason: user.banReason,
            }
        }
        return null
    }

    async login(user) {
        const payload = { username: user.email, sub: user.id }
        const token = await this.JwtService.sign(payload)
        return token
    }
}