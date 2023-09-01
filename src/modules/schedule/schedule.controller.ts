import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ScheduleService } from './schedule.service';
import { ScheduleDto, ScheduleParamsDto } from './schedule.dto';
import { Sort } from 'src/utils/sort.type';
import { ApiResponseInterface } from 'src/interfaces/ApiResponse';
import { ScheduleEntity } from './schedule.entity';
import { finished } from 'stream';
import { ApiBearerAuth } from '@nestjs/swagger';
@ApiTags('Schedule')
@Controller('schedule')
export class ScheduleController {
    constructor(private readonly scheduleService: ScheduleService) {}

    @Post()
    @ApiBearerAuth()
    async create(@Body() schedule: ScheduleDto): Promise<{ id: string }> {
        return await this.scheduleService.create(schedule);
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
        @Query() params: ScheduleParamsDto,
    ): Promise<ApiResponseInterface<ScheduleEntity>> {
        const { items, totalCount } = await this.scheduleService.findAll(
            params,
            pageSize,
            page,
            order,
        );
        return {
            items,
            totalCount,
            page,
            pageSize,
            order,
        };
    }

    @Put(':id')
    @ApiBearerAuth()
    @ApiParam({ name: 'id', type: String, required: true })
    @ApiQuery({ name: 'cancellationStatus', type: Boolean, required: true })
    async update(
        @Param('id') id: string,
        @Query() params: { cancellationStatus: boolean },
    ): Promise<{ id: string }> {
        return await this.scheduleService.update(id, params.cancellationStatus);
    }
}
