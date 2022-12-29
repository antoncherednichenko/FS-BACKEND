import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('lessons')
export class LessonsController {
    @UseGuards(JwtAuthGuard)
    @Get()
    getLesson(@Query() query) {
        return query
    }
}
