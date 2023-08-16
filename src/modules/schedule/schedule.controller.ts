import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ScheduleService } from './schedule.service';
import { ScheduleDto } from './schedule.dto';
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
    @ApiQuery({ name: 'take', required: false })
    @ApiQuery({ name: 'skip', required: false })
    @ApiQuery({ name: 'sort', required: false })
    async findAll(
        @Query('take') take: number = 10,
        @Query('skip') skip: number = 1,
        @Query('sort') sort: Sort = 'ASC',
    ): Promise<ApiResponseInterface<ScheduleEntity>> {
        const schedules = await this.scheduleService.findAll(take, skip, sort);
        return {
            items: schedules,
            totalCount: schedules.length,
            skip,
            take,
            sort,
        };
    }

    @Put(':id')
    @ApiBearerAuth()
    @ApiParam({ name: 'id', type: String, required: true })
    @ApiQuery({ name: 'cancellationStatus', type: Boolean, required: true })
    async update(
        @Param('id') id: string,
        @Query() params: { cancellationStatus: string },
    ): Promise<{ id: string }> {
        return await this.scheduleService.update(id, params.cancellationStatus);
    }
}
