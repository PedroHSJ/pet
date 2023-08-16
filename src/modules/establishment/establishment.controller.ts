import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { EstablishmentService } from './establishment.service';
import { ApiResponseInterface } from 'src/interfaces/ApiResponse';
import { EstablishmentEntity } from './establishment.entity';
import { Sort } from 'src/utils/sort.type';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { EstablishmentDTO, EstablishmentParamsDTO } from './establishment.dto';

@ApiTags('Establishment')
@Controller('establishment')
export class EstablishmentController {
    constructor(private establishmentService: EstablishmentService) {}

    @Get()
    @ApiBearerAuth()
    @ApiQuery({ name: 'take', required: false })
    @ApiQuery({ name: 'skip', required: false })
    @ApiQuery({ name: 'sort', required: false })
    async findAll(
        @Query('skip') skip: number = 0,
        @Query('take') take: number = 10,
        @Query('sort') sort: Sort = 'ASC',
        @Query() params: EstablishmentParamsDTO,
    ): Promise<ApiResponseInterface<EstablishmentEntity>> {
        const { items, totalCount } = await this.establishmentService.findAll(
            skip,
            take,
            sort,
            params,
        );
        return {
            items,
            totalCount,
            skip,
            take,
            sort,
        };
    }

    @Post()
    @ApiBearerAuth()
    async create(
        @Body() establishment: EstablishmentDTO,
    ): Promise<{ id: string }> {
        return await this.establishmentService.create(establishment);
    }
}
