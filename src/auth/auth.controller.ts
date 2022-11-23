import { Body, Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { CreateUserDto } from 'src/user/user.dto';
import { UserService } from 'src/user/user.service';
import { ServerError, SuccessObj } from 'src/utils';
import { User } from './auth.decorator';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(
        private AauthService: AuthService,
        private UserService: UserService,
    ) {}

    @Post('singup')
    async singup(@Body() dto: CreateUserDto) {
        if (!this.AauthService.isUnicUser(dto.email)) {
            return new ServerError(1, 'Пользователь с таким email уже существует')
        }
        if (!this.AauthService.emailValidation(dto.email)) {
            return new ServerError(1, 'Почта должна быть вида awesomepost@mail.com')
        }
        await this.UserService.createUser(dto)
        return await this.login(dto)
    }
    
    @Post('login')
    async login(@Body() dto: CreateUserDto) {
        const user = await this.AauthService.userValidate(dto.email, dto.password)
        if (user) {
            const accessToken = await this.AauthService.login({
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
    @Get('get-user')
    async getUser(@User() user) {
        if (user) {
            const currentUser = await this.UserService.findByEmail(user.username)
            if (currentUser) {
                const { password, ...userInfo } = currentUser.dataValues
                return new SuccessObj(userInfo)
            }
        }
        return new ServerError(1, 'Пользователь не найден')
    }
}
