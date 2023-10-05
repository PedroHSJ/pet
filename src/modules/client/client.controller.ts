import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiTags, ApiParam, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { ClientService } from './client.service';
import { ClientDTO, ClientParamDTO } from './client.dto';
import { ApiResponseInterface } from 'src/interfaces/ApiResponse';
import { ClientEntity } from './client.entity';
import { Sort } from 'src/utils/sort.type';
import { Public } from 'src/decorators/public.decorators';

@ApiTags('Client')
@Controller('client')
export class ClientController {
    constructor(private readonly clientService: ClientService) {}

    @Post()
    @Public()
    async create(@Body() client: ClientDTO): Promise<{ id: string }> {
        return await this.clientService.create(client);
    }
    @Put(':id')
    @ApiBearerAuth()
    @ApiParam({ name: 'id', type: String })
    async update(
        @Param('id') id: string,
        @Body() client: ClientDTO,
    ): Promise<{ id: string }> {
        return await this.clientService.update(id, client);
    }

    @Get()
    @ApiBearerAuth()
    @ApiQuery({ name: 'page', required: false })
    @ApiQuery({ name: 'pageSize', required: false })
    @ApiQuery({ name: 'order', required: false })
    async findAll(
        @Query('page') page: number = 1,
        @Query('pageSize') pageSize: number = 10,
        @Query('order') order: Sort = 'ASC',
        @Query() params: ClientParamDTO,
    ): Promise<ApiResponseInterface<ClientEntity>> {
        const { items, totalCount } = await this.clientService.findAll(
            params,
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

    // @ApiBearerAuth()
    // @ApiQuery({ name: 'take', required: false })
    // @ApiQuery({ name: 'skip', required: false })
    // @ApiQuery({ name: 'sort', required: false })
    // @Get('/params')
    // async findByParams(
    //     @Query('take') take: number = 10,
    //     @Query('skip') skip: number = 1,
    //     @Query('sort') sort: Sort = 'ASC',
    //     @Query() params: ClientParamDTO,
    // ) {
    //     const client = await this.clientService.findByParams(
    //         take,
    //         skip,
    //         sort,
    //         params,
    //     );
    //     return {
    //         items: client,
    //         totalCount: client.length,
    //         skip,
    //         take,
    //         sort,
    //     };
    // }
}
