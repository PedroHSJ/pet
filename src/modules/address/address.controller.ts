import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AddressService } from './address.service';
import { Sort } from 'src/utils/sort.type';
import { ApiResponseInterface } from 'src/interfaces/ApiResponse';
import { AddressEntity } from './address.entity';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { AddressDTO } from './address.dto';

@ApiTags('Address')
@Controller('address')
export class AddressController {
    constructor(private readonly addressService: AddressService) {}

    @Get()
    @ApiQuery({ name: 'take', required: false })
    @ApiQuery({ name: 'skip', required: false })
    @ApiQuery({ name: 'sort', required: false })
    async findAll(
        @Query('skip') skip: number = 1,
        @Query('take') take: number = 10,
        @Query('sort') sort: Sort = 'ASC',
    ): Promise<ApiResponseInterface<AddressEntity>> {
        const addresses = await this.addressService.findAll(skip, take, sort);
        return {
            items: addresses,
            totalCount: addresses.length,
            skip,
            take,
            sort,
        };
    }

    @Post()
    async create(@Body() address: AddressDTO): Promise<{ id: string }> {
        return await this.addressService.create(address);
    }
}
