import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiTags, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
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
    @ApiBearerAuth()
    async create(@Body() pet: PetDTO): Promise<{ id: string }> {
        return await this.petService.create(pet);
    }

    @Get(':id')
    @ApiBearerAuth()
    async findById(id: string): Promise<ApiResponseInterface<PetEntity>> {
        const pet = await this.petService.findById(id);
        const response: ApiResponseInterface<PetEntity> = {
            items: [pet],
            totalCount: 1,
        };
        return response;
    }

    @Get()
    @ApiBearerAuth()
    @ApiQuery({ name: 'pageSize', required: false })
    @ApiQuery({ name: 'page', required: false })
    @ApiQuery({ name: 'order', required: false })
    async findAll(
        @Query('pageSize') pageSize: number = 10,
        @Query('page') page: number = 1,
        @Query('order') order: Sort = 'ASC',
        @Query() params: PetParamsDTO,
    ): Promise<ApiResponseInterface<PetEntity>> {
        const { items, totalCount } = await this.petService.findAll(
            pageSize,
            page,
            order,
            params,
        );
        const response: ApiResponseInterface<PetEntity> = {
            items,
            totalCount,
            page,
            pageSize,
            order,
        };
        return response;
    }
}
