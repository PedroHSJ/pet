import { Controller, Get, Query, Post, Body } from '@nestjs/common';
import { ProfessionalService } from './professional.service';
import { ApiResponseInterface } from 'src/interfaces/ApiResponse';
import { ProfessionalEntity } from './professional.entity';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { Sort } from 'src/utils/sort.type';
import { ProfessionalDTO } from './professional.dto';

@ApiTags('Professional')
@Controller('professional')
export class ProfessionalController {
    constructor(private readonly professionalService: ProfessionalService) {}

    @Get()
    @ApiQuery({ name: 'take', required: false })
    @ApiQuery({ name: 'skip', required: false })
    @ApiQuery({ name: 'sort', required: false })
    async findAll(
        @Query('take') take: number = 10,
        @Query('skip') skip: number = 1,
        @Query('sort') sort: Sort = 'ASC',
    ): Promise<ApiResponseInterface<ProfessionalEntity>> {
        const professionals = await this.professionalService.findAll(
            take,
            skip,
            sort,
        );
        return {
            items: professionals,
            totalCount: professionals.length,
            skip,
            take,
            sort,
        };
    }

    @Post()
    async create(
        @Body() professional: ProfessionalDTO,
    ): Promise<{ id: string }> {
        return await this.professionalService.create(professional);
    }
}
