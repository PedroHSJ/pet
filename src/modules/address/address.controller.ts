import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AddressService } from './address.service';
import { Sort } from 'src/utils/sort.type';
import { ApiResponseInterface } from 'src/interfaces/ApiResponse';
import { AddressEntity } from './address.entity';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AddressDTO } from './address.dto';

@ApiTags('Address')
@Controller('address')
export class AddressController {
    constructor(private readonly addressService: AddressService) {}

    @Get()
    @ApiBearerAuth()
    @ApiQuery({ name: 'page', required: false })
    @ApiQuery({ name: 'pageSize', required: false })
    @ApiQuery({ name: 'order', required: false })
    async findAll(
        @Query('page') page: number = 1,
        @Query('pageSize') pageSize: number = 10,
        @Query('order') order: Sort = 'ASC',
    ): Promise<ApiResponseInterface<AddressEntity>> {
        const { items, totalCount } = await this.addressService.findAll(
            page,
            pageSize,
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

    @Post()
    @ApiBearerAuth()
    async create(@Body() address: AddressDTO): Promise<{ id: string }> {
        return await this.addressService.create(address);
    }
}
