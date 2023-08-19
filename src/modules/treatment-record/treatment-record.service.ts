import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TreatmentRecordEntity } from './treatment-record.entity';
import { Repository } from 'typeorm';
import { TreatementRecordDTO } from './treatment-record.dto';
import { AnamnesisEntity } from './anamnese/anamnesis.entity';
import { ScheduleEntity } from '../schedule/schedule.entity';
import { Sort } from 'src/utils/sort.type';
import { ApiResponseInterface } from 'src/interfaces/ApiResponse';

@Injectable()
export class TreatmentRecordService {
    constructor(
        @InjectRepository(TreatmentRecordEntity)
        private readonly treatmentRecordRepository: Repository<TreatmentRecordEntity>,
        @InjectRepository(AnamnesisEntity)
        private readonly anamnesisRepository: Repository<AnamnesisEntity>,
        @InjectRepository(ScheduleEntity)
        private readonly scheduleRepository: Repository<ScheduleEntity>,
    ) {}

    async create(
        treatmentRecord: TreatementRecordDTO,
    ): Promise<{ id: string }> {
        const scheduleEntity = await this.scheduleRepository.findOne({
            where: { id: treatmentRecord.scheduleId },
        });

        if (!scheduleEntity)
            throw new BadRequestException('Schedule not found');

        const anamnesisEntity = this.anamnesisRepository.create(
            treatmentRecord.anamnesis,
        );
        const newAnamnesis = await this.anamnesisRepository.save(
            anamnesisEntity,
        );

        const treatmentRecordEntity =
            this.treatmentRecordRepository.create(treatmentRecord);

        treatmentRecordEntity.anamnesis = newAnamnesis;
        treatmentRecordEntity.schedule = scheduleEntity;
        const newTreatmentRecord = await this.treatmentRecordRepository.save(
            treatmentRecordEntity,
        );
        return { id: newTreatmentRecord.id };
    }

    async findAll(
        page: number,
        pageSize: number,
        order: Sort,
    ): Promise<ApiResponseInterface<TreatmentRecordEntity>> {
        const query = this.treatmentRecordRepository
            .createQueryBuilder('treatmentRecord')
            .leftJoinAndSelect('treatmentRecord.anamnesis', 'anamnesis')
            .leftJoinAndSelect('treatmentRecord.schedule', 'schedule');

        const [items, totalCount] = await query
            .take(pageSize)
            .skip((page - 1) * pageSize)
            .orderBy('treatmentRecord.id', order)
            .getManyAndCount();

        return {
            items,
            totalCount,
        };
    }
}
