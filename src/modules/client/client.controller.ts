import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import {
    ApiTags,
    ApiParam,
    ApiQuery,
    ApiBearerAuth,
    ApiBody,
} from '@nestjs/swagger';
import { ClientService } from './client.service';
import { ClientDTO, ClientParamDTO } from './client.dto';
import { ApiResponseInterface } from 'src/interfaces/ApiResponse';
import { ClientEntity } from './client.entity';
import { Sort } from 'src/utils/sort.type';
import { Public } from 'src/decorators/public.decorators';
import { UpdatePasswordDTO } from 'src/dto/UpdatePassword';

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
    @ApiParam({ name: 'id', type: String, required: true })
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

    @Post('update-password')
    @Public()
    async updatePassword(@Body() data: UpdatePasswordDTO) {
        await this.clientService.updatePass(
            data.email,
            data.password,
            data.verificationCode,
        );
        return { message: 'Senha alterada com sucesso.' };
    }
}
