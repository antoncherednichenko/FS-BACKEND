import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ServerError, SuccessObj } from 'src/utils';
import { CreateUserDto } from './user.dto';
import { User } from './user.model';

@Injectable()
export class UserService {
    constructor(@InjectModel(User) private UserRepository: typeof User){}

    async createUser(dto: CreateUserDto) {
        const isUnique = await this.getAllUsers()
            .then(users => {
                if(users?.length) {
                    return !users.some(user => user.email === dto.email)
                }
            })
        
        if (!isUnique) {
            return new ServerError(1, 'Пользователь с таким email уже существует')
        }

        const user =  await this.UserRepository.create(dto)
        return new SuccessObj({
            auth: true,
            email: user.email,
            isBanned: user.isBanned,
            id: user.id,
            role: user.role
        })
    }

    async getAllUsers() {
        const users = await this.UserRepository.findAll()
        return users
    }
}
