import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ScheduleEntity } from './schedule.entity';
import { Between, Equal, Repository } from 'typeorm';
import { ScheduleDto } from './schedule.dto';
import { EstablishmentEntity } from '../establishment/establishment.entity';
import { ProfessionalEntity } from '../professional/professional.entity';
import { ClientEntity } from '../client/client.entity';
import { Sort } from 'src/utils/sort.type';
import { ApiResponseInterface } from 'src/interfaces/ApiResponse';

@Injectable()
export class ScheduleService {
    constructor(
        @InjectRepository(ScheduleEntity)
        private readonly scheduleRepository: Repository<ScheduleEntity>,
        @InjectRepository(EstablishmentEntity)
        private readonly establishmentRepository: Repository<EstablishmentEntity>,
        @InjectRepository(ProfessionalEntity)
        private readonly professionalRepository: Repository<ProfessionalEntity>,
        @InjectRepository(ClientEntity)
        private readonly clientRepository: Repository<ClientEntity>,
    ) {}

    async create(schedule: ScheduleDto): Promise<{ id: string }> {
        //verificando se profissional existe no banco de dados
        const professional = await this.professionalRepository.findOne({
            where: { id: schedule.professionalId },
        });
        if (!professional)
            throw new BadRequestException('Professional not found');

        // //verificando se cliente existe no banco de dados
        const client = await this.clientRepository.findOne({
            where: { id: schedule.clientId },
        });
        if (!client) throw new BadRequestException('Client not found');

        // //verificando se estabelecimento existe no banco de dados
        const establishment = await this.establishmentRepository.findOne({
            where: { id: schedule.establishmentId },
        });
        if (!establishment)
            throw new BadRequestException('Establishment not found');

        //verificando se horário já está ocupado em um intervalo de 1 hora
        const scheduleExists = await this.scheduleRepository
            .createQueryBuilder('schedule')
            .where('schedule.day = :day', { day: schedule.day })
            .andWhere('schedule.professional_id = :professionalId', {
                professionalId: schedule.professionalId,
            })
            .andWhere('schedule.establishment_id = :establishmentId', {
                establishmentId: schedule.establishmentId,
            })
            .andWhere('schedule.client_id = :clientId', {
                clientId: schedule.clientId,
            })
            .getCount();

        // throw new BadRequestException('Busy schedule');
        if (scheduleExists > 0) throw new BadRequestException('Busy schedule');
        const scheduleEntity = this.scheduleRepository.create(schedule);

        scheduleEntity.establishment = establishment;
        scheduleEntity.professional = professional;
        scheduleEntity.client = client;

        //throw new BadRequestException('Busy schedule');
        const newSchedule = await this.scheduleRepository.save(scheduleEntity);
        return { id: newSchedule.id };
    }

    async update(
        id: string,
        cancellation_status?: string,
    ): Promise<{ id: string }> {
        const scheduleExist = await this.scheduleRepository.findOne({
            where: { id },
        });
        if (!scheduleExist) throw new BadRequestException('Schedule not found');
        await this.scheduleRepository.update(id, {
            cancellationStatus: cancellation_status === 'true' ? 1 : 0,
        });
        const scheduleUpadted = await this.scheduleRepository.findOne({
            where: { id },
        });
        return { id };
    }

    async findAll(
        pageSize: number,
        page: number,
        order: Sort,
    ): Promise<ApiResponseInterface<ScheduleEntity>> {
        const query = this.scheduleRepository
            .createQueryBuilder('schedule')

            .leftJoinAndSelect('schedule.establishment', 'establishment')
            .leftJoinAndSelect('schedule.professional', 'professional')
            .leftJoinAndSelect('schedule.client', 'client');

        const [items, totalCount] = await query
            .take(pageSize)
            .skip((page - 1) * pageSize)
            .orderBy('schedule.day', order)
            .getManyAndCount();

        return { items, totalCount };
    }
}
