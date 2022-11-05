import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { SequelizeModule } from '@nestjs/sequelize'
import { User } from './user.model';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import * as dotenv from 'dotenv'
dotenv.config()


@Module({
  controllers: [UserController],
  providers: [UserService, AuthService, JwtService],
  imports: [
    SequelizeModule.forFeature([User])
  ]
})
export class UserModule {}
