import {
    Controller,
    Get,
    Query,
    Post,
    Body,
    Param,
    NotFoundException,
    Put,
} from '@nestjs/common';
import { ProfessionalService } from './professional.service';
import { ApiResponseInterface } from 'src/interfaces/ApiResponse';
import { ProfessionalEntity } from './professional.entity';
import { ApiBearerAuth, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Sort } from 'src/utils/sort.type';
import { ProfessionalDTO, ProfessionalParamsDTO } from './professional.dto';
import { Public } from 'src/decorators/public.decorators';

@ApiTags('Professional')
@Controller('professional')
export class ProfessionalController {
    constructor(private readonly professionalService: ProfessionalService) {}

    @Get()
    @ApiBearerAuth()
    @ApiQuery({ name: 'pageSize', required: false })
    @ApiQuery({ name: 'page', required: false })
    @ApiQuery({ name: 'order', required: false })
    async findAll(
        @Query('pageSize') pageSize: number = 10,
        @Query('page') page: number = 1,
        @Query('order') order: Sort = 'ASC',
        @Query() params: ProfessionalParamsDTO,
    ): Promise<ApiResponseInterface<ProfessionalEntity>> {
        const { items, totalCount } = await this.professionalService.findAll(
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

    @Get(':id')
    @ApiBearerAuth()
    @ApiParam({ name: 'id', required: true })
    async findOne(
        @Param() param: { id: string },
    ): Promise<ApiResponseInterface<ProfessionalEntity>> {
        const response = await this.professionalService.findById(param.id);
        if (response == null)
            throw new NotFoundException('Profissional não encontrado');
        return {
            items: [response],
            totalCount: 1,
            page: 1,
            pageSize: 1,
            order: 'ASC',
        };
    }

    @Get('/verify-email/:email')
    @Public()
    @ApiParam({ name: 'email', required: true })
    async findByEmail(
        @Param() param: { email: string },
    ): Promise<ApiResponseInterface<Partial<ProfessionalEntity>>> {
        const response =
            await this.professionalService.verifyProfessionalExistsByEmail(
                param.email,
            );
        if (response == null)
            throw new NotFoundException('Profissional não encontrado');
        return {
            items: [
                {
                    email: response.email,
                },
            ],
            totalCount: 1,
            page: 1,
            pageSize: 1,
            order: 'ASC',
        };
    }

    @Post()
    @Public()
    async create(
        @Body() professional: ProfessionalDTO,
    ): Promise<{ id: string }> {
        return await this.professionalService.create(professional);
    }

    @Put(':id')
    @ApiBearerAuth()
    @ApiParam({ name: 'id', required: true })
    async update(
        @Param() param: { id: string },
        @Body() professional: ProfessionalDTO,
    ): Promise<{ id: string }> {
        return await this.professionalService.update(param.id, professional);
    }
}
