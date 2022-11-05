import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ServerError, SuccessObj } from 'src/utils';
import { CreateUserDto } from './user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(
        private UserService: UserService,
        private AuthService: AuthService,
    ) {}

    @Post('singup')
    async singup(@Body() dto: CreateUserDto) {
        await this.UserService.createUser(dto)
        return await this.login(dto)
    }

    @Post('login')
    async login(@Body() dto: CreateUserDto) {
        const user = await this.AuthService.userValidate(dto.email, dto.password)
        if (user) {
            const accessToken = await this.AuthService.login({
                email: user.email,
                id: user.id   
            })
            return new SuccessObj({
                role: user.role,
                email: user.email,
                id: user.id,
                accessToken,
                isBanned: user.isBanned,
                banReason: user.banReason
            })
        }
        return new ServerError(1, 'Ошибка авторизации')
    }

    @UseGuards(JwtAuthGuard)
    @Get('all')
    getAll() {
        return this.UserService.getAllUsers()
    }
}
