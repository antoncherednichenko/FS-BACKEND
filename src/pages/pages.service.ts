import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreatePagesDto } from './pages.dto';
import { Pages } from './pages.model';

@Injectable()
export class PagesService {

    constructor(
        @InjectModel(Pages) private PagesRepository: typeof Pages
    ) {}

    async createPage(dto: CreatePagesDto) {
        const page = await this.PagesRepository.create(dto)
        return page
    }

    async findPage(page: string) {
        const currentPage = await this.PagesRepository.findOne({
            where: { pageName: page }
        })

        return currentPage || null
    }
    
    async getPage(page: string) {
        switch(page) {
            case 'lending':
                return await this.findPage(page)
            default:
                return null
        }
    }
}
