import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { SequelizeModule } from '@nestjs/sequelize'
import { ConfigModule } from '@nestjs/config'
import { User } from './user/user.model';
import { AuthModule } from './auth/auth.module';
import { UserService } from './user/user.service';
import { AuthService } from './auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { UserController } from './user/user.controller';
import { PagesModule } from './pages/pages.module';
import * as dotenv from 'dotenv'
import { Pages } from './pages/pages.model';
import { LessonsModule } from './lessons/lessons.module';
dotenv.config()

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadModels: true,
      models: [User, Pages],
      synchronize: false,
    }),
    SequelizeModule.forFeature([User, Pages]),
    AuthModule,
    UserModule,
    PagesModule,
    LessonsModule,
  ],
  controllers: [AppController, UserController],
  providers: [AppService, AuthService, JwtService, UserService, ],
})
export class AppModule {}
