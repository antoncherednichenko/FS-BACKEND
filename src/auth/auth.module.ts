import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/user/user.model';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { AuthController } from './auth.controller';
import * as dotenv from 'dotenv'
dotenv.config()

@Module({
  imports: [
    UserModule, 
    PassportModule, 
    SequelizeModule.forFeature([User]),
    JwtModule.register({
      secret: `${process.env.JWT_SECRET}`,
      signOptions: { expiresIn: '7d' },
    })
  ],
  providers: [
    AuthService, 
    LocalStrategy, 
    UserService, 
    JwtStrategy
  ],
  controllers: [AuthController]
})
export class AuthModule {}
