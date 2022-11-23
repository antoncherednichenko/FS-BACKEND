import { Module } from '@nestjs/common';
import { PagesService } from './pages.service';
import { PagesController } from './pages.controller';
import { Pages } from './pages.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  providers: [PagesService],
  controllers: [PagesController],
  imports: [
    SequelizeModule.forFeature([Pages])
  ],
})
export class PagesModule {}
