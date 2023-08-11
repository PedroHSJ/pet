import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { BreedService } from './breed.service';
import { BreedDTO } from './breed.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { ApiResponseInterface } from 'src/interfaces/ApiResponse';
import { BreedEntity } from './breed.entity';
import { Sort } from 'src/utils/sort.type';

@ApiTags('Breed')
@Controller('breed')
export class BreedController {
    constructor(private readonly breedService: BreedService) {}

    @Post()
    async create(@Body() breed: BreedDTO): Promise<{ id: string }> {
        return await this.breedService.create(breed);
    }

    @Get()
    @ApiQuery({ name: 'take', required: false })
    @ApiQuery({ name: 'skip', required: false })
    @ApiQuery({ name: 'sort', required: false })
    async findAll(
        @Query('take') take: number = 10,
        @Query('skip') skip: number = 1,
        @Query('sort') sort: Sort = 'ASC',
    ): Promise<ApiResponseInterface<BreedEntity>> {
        const breeds = await this.breedService.findAll(take, skip, sort);
        return {
            items: breeds,
            totalCount: breeds.length,
            skip,
            take,
            sort,
        };
    }
}
