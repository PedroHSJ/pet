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
    @ApiQuery({ name: 'pageSize', required: false })
    @ApiQuery({ name: 'page', required: false })
    @ApiQuery({ name: 'order', required: false })
    async findAll(
        @Query('page') page: number = 1,
        @Query('pageSize') pageSize: number = 10,
        @Query('order') order: Sort = 'ASC',
        @Query() params: EstablishmentParamsDTO,
    ): Promise<ApiResponseInterface<EstablishmentEntity>> {
        console.log(params);
        const { items, totalCount } = await this.establishmentService.findAll(
            page,
            pageSize,
            order,
            params,
        );
        return {
            items,
            totalCount,
            page,
            pageSize,
            order,
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
