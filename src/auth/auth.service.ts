import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { descryptHash } from 'src/utils';
import { JwtService } from '@nestjs/jwt';

import * as dotenv from 'dotenv'
import { emailReg } from 'src/constants';
dotenv.config()

@Injectable()
export class AuthService {
    constructor(
        private UserService: UserService,
        private JwtService: JwtService
    ) {}
    
    emailValidation(email: string): boolean {
        if (String(email).toLowerCase().match(emailReg)) {
            return true
        }
        return false
    }

    async isUnicUser(email: string): Promise<boolean> {
        const user = await this.UserService.findByEmail(email)
        if (user) {
            return true
        }
        return false
    }

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

    async findUserByEmail(email: string) {
        const user = await this.UserService.findByEmail(email)
        if (user) {
            return user
        }
        return null
    }
}
