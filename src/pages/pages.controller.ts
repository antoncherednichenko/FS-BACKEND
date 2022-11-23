import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ServerError, SuccessObj } from 'src/utils';
import { CreatePagesDto } from './pages.dto';
import { PagesService } from './pages.service';

@Controller('pages')
export class PagesController {
    constructor(private PagesService: PagesService) {}

    @UseGuards(JwtAuthGuard)
    @Get('get-page')
    async getPage(@Query('page') page: string) {
        const pageData = await this.PagesService.findPage(page)
        if(pageData) {
            return new SuccessObj(pageData)
        }
        return new ServerError(1, 'При загрузке страницы произошла ошибка')
    }

    @UseGuards(JwtAuthGuard)
    @Post('create-page')
    async createPage(@Body() dto: CreatePagesDto) {
        const page = await this.PagesService.createPage(dto)
        return page
    }
}
