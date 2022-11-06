import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor( private UserService: UserService ) {}

    @UseGuards(JwtAuthGuard)
    @Get('all')
    getAll() {
        return this.UserService.getAllUsers()
    }
}
