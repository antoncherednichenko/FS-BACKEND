import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/user/user.dto';
import { UserService } from 'src/user/user.service';
import { ServerError, SuccessObj } from 'src/utils';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(
        private AauthService: AuthService,
        private UserService: UserService,
    ) {}

    @Post('singup')
    async singup(@Body() dto: CreateUserDto) {
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
}
