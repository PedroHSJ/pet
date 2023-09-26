import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TreatmentRecordEntity } from './treatment-record.entity';
import { Repository } from 'typeorm';
import { TreatementRecordDTO } from './treatment-record.dto';
import { AnamnesisEntity } from './anamnese/anamnesis.entity';
import { ScheduleEntity } from '../schedule/schedule.entity';
import { Sort } from 'src/utils/sort.type';
import { ApiResponseInterface } from 'src/interfaces/ApiResponse';
import { FoodEntity } from './food/food.entity';
import { MeasurementEntity } from './measurement/measurement.entity';

@Injectable()
export class TreatmentRecordService {
    constructor(
        @InjectRepository(TreatmentRecordEntity)
        private readonly treatmentRecordRepository: Repository<TreatmentRecordEntity>,
        @InjectRepository(AnamnesisEntity)
        private readonly anamnesisRepository: Repository<AnamnesisEntity>,
        @InjectRepository(ScheduleEntity)
        private readonly scheduleRepository: Repository<ScheduleEntity>,
        @InjectRepository(FoodEntity)
        private readonly foodRepository: Repository<FoodEntity>,
        @InjectRepository(MeasurementEntity)
        private readonly measurementRepository: Repository<MeasurementEntity>,
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

        const foodEntity = this.foodRepository.create(treatmentRecord.food);
        const newFood = await this.foodRepository.save(foodEntity);

        const measurementEntity = this.measurementRepository.create(
            treatmentRecord.measurement,
        );
        const newMeasurement = await this.measurementRepository.save(
            measurementEntity,
        );

        const treatmentRecordEntity =
            this.treatmentRecordRepository.create(treatmentRecord);

        treatmentRecordEntity.anamnesis = newAnamnesis;
        treatmentRecordEntity.schedule = scheduleEntity;
        treatmentRecordEntity.food = newFood;
        treatmentRecordEntity.measurement = newMeasurement;
        const newTreatmentRecord = await this.treatmentRecordRepository.save(
            treatmentRecordEntity,
        );
        await this.scheduleRepository.update(
            { id: treatmentRecord.scheduleId },
            { finished: true },
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
            .leftJoinAndSelect('treatmentRecord.schedule', 'schedule')
            .leftJoinAndSelect('treatmentRecord.food', 'food')
            .leftJoinAndSelect('treatmentRecord.measurement', 'measurement')
            .leftJoinAndSelect('schedule.professional', 'professional')
            .leftJoinAndSelect('schedule.client', 'client')
            .leftJoinAndSelect('schedule.establishment', 'establishment')
            .leftJoinAndSelect('schedule.pet', 'pet');

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
