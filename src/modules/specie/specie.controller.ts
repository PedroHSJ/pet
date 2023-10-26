import { Body, Controller, Get, Inject, Post, Query } from '@nestjs/common';
import { PetService } from '../pet/pet.service';
import { Public } from 'src/decorators/public.decorators';
import { SpecieDTO, SpecieParamsDTO } from './specie.dto';
import { SpecieService } from './specie.service';
import { SpecieEntity } from './specie.entity';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ApiResponseInterface } from 'src/interfaces/ApiResponse';
import { Sort } from 'src/utils/sort.type';

@ApiTags('Specie')
@Controller('specie')
export class SpecieController {
    constructor(private readonly specieService: SpecieService) {}

    @Post()
    @Public()
    async create(@Body() specie: SpecieDTO): Promise<{ id: string }> {
        return await this.specieService.create(specie);
    }

    @Get()
    @Public()
    @ApiQuery({ name: 'pageSize', required: false })
    @ApiQuery({ name: 'page', required: false })
    @ApiQuery({ name: 'order', required: false })
    async findAll(
        @Query('pageSize') pageSize: number = 10,
        @Query('page') page: number = 1,
        @Query('order') order: Sort = 'ASC',
        @Query() params: SpecieParamsDTO,
    ): Promise<ApiResponseInterface<SpecieEntity>> {
        const { items, totalCount } = await this.specieService.findAll(
            pageSize,
            page,
            order,
            params,
        );
        const response: ApiResponseInterface<SpecieEntity> = {
            items,
            totalCount,
            page,
            pageSize,
            order,
        };
        return response;
    }
}
