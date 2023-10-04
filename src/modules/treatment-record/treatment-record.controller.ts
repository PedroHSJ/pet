import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { TreatmentRecordService } from './treatment-record.service';
import {
    TreatementRecordDTO,
    TreatementRecordParamsDTO,
} from './treatment-record.dto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { TreatmentRecordEntity } from './treatment-record.entity';
import { Sort } from 'src/utils/sort.type';
import { ApiResponseInterface } from 'src/interfaces/ApiResponse';

@ApiTags('Treatment Record')
@Controller('treatment-record')
export class TreatmentRecordController {
    constructor(
        private readonly treatmentRecordService: TreatmentRecordService,
    ) {}

    @Post()
    @ApiBearerAuth()
    async create(
        @Body() treatmentRecord: TreatementRecordDTO,
    ): Promise<{ id: string }> {
        const newTreatmentRecord = await this.treatmentRecordService.create(
            treatmentRecord,
        );
        return { id: newTreatmentRecord.id };
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
        @Query() params: TreatementRecordParamsDTO,
    ): Promise<ApiResponseInterface<TreatmentRecordEntity>> {
        const { items, totalCount } = await this.treatmentRecordService.findAll(
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
}
