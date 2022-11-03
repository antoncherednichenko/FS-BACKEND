import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from './user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private UserService: UserService) {}

    @Post('auth')
    createUser(@Body() dto: CreateUserDto) {
        return this.UserService.createUser(dto)
    }

    @Get('all')
    getAll() {
        return this.UserService.getAllUsers()
    }
}
