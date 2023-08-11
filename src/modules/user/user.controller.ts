import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from './user.dto';
import { UserEntity } from './user.entity';
import { ApiResponseInterface } from 'src/interfaces/ApiResponse';
import { ApiResponse, ApiTags, ApiParam, ApiQuery } from '@nestjs/swagger';
import { Sort } from 'src/utils/sort.type';

@ApiTags('User')
@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Get()
    @ApiQuery({ name: 'take', required: false })
    @ApiQuery({ name: 'skip', required: false })
    @ApiQuery({ name: 'sort', required: false })
    async findAll(
        @Query('take') take: number = 10,
        @Query('skip') skip: number = 1,
        @Query('sort') sort: Sort = 'ASC',
    ): Promise<ApiResponseInterface<UserEntity>> {
        const users = await this.userService.findAll(take, skip, sort);
        const response: ApiResponseInterface<UserEntity> = {
            items: users,
            totalCount: users.length,
        };
        return response;
    }

    @Get(':id')
    @ApiParam({ name: 'id', type: String })
    @ApiResponse({
        status: 200,
        description: 'Success',
    })
    async findOne(
        @Param() param: { id: string },
    ): Promise<ApiResponseInterface<UserEntity>> {
        const user = await this.userService.findOne(param.id);
        const response: ApiResponseInterface<UserEntity> = {
            items: [user],
            totalCount: 1,
        };
        return response;
    }

    // @Get('/role?')
    // async find(@Query('role') role: RoleEnum) {
    //     console.log(role);
    // }

    @Post()
    @ApiResponse({
        status: 201,
        description: 'Created',
        schema: {
            properties: {
                id: {
                    type: 'string',
                },
            },
        },
    })
    @ApiResponse({
        status: 400,
        description: 'Bad Request',
        schema: {
            properties: {
                statusCode: {
                    type: 'number',
                },
                //iso
                timestamp: {
                    type: 'string',
                    format: 'date-time',
                    example: '2021-05-24T15:33:00.000Z',
                },
                path: {
                    type: 'string',
                },
                message: {
                    type: 'string',
                },
            },
        },
    })
    async create(@Body() user: UserDTO): Promise<{ id: string }> {
        const newUser = await this.userService.create(user);
        return { id: newUser.id };
    }
}
