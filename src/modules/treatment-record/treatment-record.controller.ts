import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { TreatmentRecordService } from './treatment-record.service';
import { TreatementRecordDTO } from './treatment-record.dto';
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
    @ApiQuery({ name: 'take', required: false })
    @ApiQuery({ name: 'skip', required: false })
    @ApiQuery({ name: 'sort', required: false })
    async findAll(
        @Query('take') take: number = 10,
        @Query('skip') skip: number = 1,
        @Query('sort') sort: Sort = 'ASC',
    ): Promise<ApiResponseInterface<TreatmentRecordEntity>> {
        const treatmentRecords = await this.treatmentRecordService.findAll(
            skip,
            take,
            sort,
        );
        return {
            items: treatmentRecords,
            totalCount: treatmentRecords.length,
            skip,
            take,
            sort,
        };
    }
}
