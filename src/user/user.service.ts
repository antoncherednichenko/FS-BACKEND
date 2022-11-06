import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { descryptHash, hashPassword } from '../utils';
import { CreateUserDto } from './user.dto';
import { User } from './user.model';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User) private UserRepository: typeof User
    ){}

    async createUser(dto: CreateUserDto) {
        const user =  await this.UserRepository.create({
            ...dto,
            password: hashPassword(dto.password)
        })
        return user
    }

    async getAllUsers() {
        const users = await this.UserRepository.findAll()
        return users
    }

    async findByEmail(email: string) {
        const users = await this.getAllUsers()
        return users.find(user => user.email === email )
    }
}
