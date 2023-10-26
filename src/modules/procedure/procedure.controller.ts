import { Body, Controller, Post } from '@nestjs/common';
import { ProcedureService } from './procedure.service';
import { ApiBearerAuth, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ProcedureDTO } from './procedure.dto';
import { Public } from 'src/decorators/public.decorators';

@ApiTags('Procedure')
@Controller('procedure')
export class ProcedureController {
    constructor(private readonly procedureService: ProcedureService) {}

    @Post()
    @Public()
    async create(@Body() procedure: ProcedureDTO): Promise<{ id: string }> {
        return this.procedureService.create(procedure);
    }
}
