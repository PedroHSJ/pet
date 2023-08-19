import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { BreedService } from './breed.service';
import { BreedDTO } from './breed.dto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ApiResponseInterface } from 'src/interfaces/ApiResponse';
import { BreedEntity } from './breed.entity';
import { Sort } from 'src/utils/sort.type';

@ApiTags('Breed')
@Controller('breed')
export class BreedController {
    constructor(private readonly breedService: BreedService) {}

    @Post()
    @ApiBearerAuth()
    async create(@Body() breed: BreedDTO): Promise<{ id: string }> {
        return await this.breedService.create(breed);
    }

    @Get()
    @ApiBearerAuth()
    @ApiQuery({ name: 'page', required: false })
    @ApiQuery({ name: 'pageSize', required: false })
    @ApiQuery({ name: 'order', required: false })
    async findAll(
        @Query('page') page: number = 10,
        @Query('pageSize') pageSize: number = 1,
        @Query('order') order: Sort = 'ASC',
    ): Promise<ApiResponseInterface<BreedEntity>> {
        const breeds = await this.breedService.findAll(page, pageSize, order);
        return {
            items: breeds,
            totalCount: breeds.length,
            page,
            pageSize,
            order,
        };
    }
}
