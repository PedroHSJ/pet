import { Injectable } from '@nestjs/common';
import { ProcedureDTO } from './procedure.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProcedureEntity } from './procedure.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProcedureService {
    constructor(
        @InjectRepository(ProcedureEntity)
        private procedureRepository: Repository<ProcedureEntity>,
    ) {}

    async create(procedure: ProcedureDTO): Promise<{ id: string }> {
        const procedureEntity = this.procedureRepository.create(procedure);
        const newProcedure = await this.procedureRepository.save(
            procedureEntity,
        );
        return { id: newProcedure.id };
    }
}
