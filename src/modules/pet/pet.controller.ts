import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiTags, ApiQuery } from '@nestjs/swagger';
import { PetService } from './pet.service';
import { PetDTO, PetParamsDTO } from './pet.dto';
import { ApiResponseInterface } from 'src/interfaces/ApiResponse';
import { PetEntity } from './pet.entity';
import { Sort } from 'src/utils/sort.type';

@ApiTags('Pet')
@Controller('pet')
export class PetController {
    constructor(private readonly petService: PetService) {}

    @Post()
    async create(@Body() pet: PetDTO): Promise<{ id: string }> {
        return await this.petService.create(pet);
    }

    @Get(':id')
    async findById(id: string): Promise<ApiResponseInterface<PetEntity>> {
        const pet = await this.petService.findById(id);
        const response: ApiResponseInterface<PetEntity> = {
            items: [pet],
            totalCount: 1,
        };
        return response;
    }

    @Get()
    @ApiQuery({ name: 'take', required: false })
    @ApiQuery({ name: 'skip', required: false })
    @ApiQuery({ name: 'sort', required: false })
    async findAll(
        @Query('take') take: number = 10,
        @Query('skip') skip: number = 1,
        @Query('sort') sort: Sort = 'ASC',
        @Query() params: PetParamsDTO,
    ): Promise<ApiResponseInterface<PetEntity>> {
        const pets = await this.petService.findAll(take, skip, sort, params);
        const response: ApiResponseInterface<PetEntity> = {
            items: pets,
            totalCount: pets.length,
            skip,
            take,
            sort,
        };
        return response;
    }
}
