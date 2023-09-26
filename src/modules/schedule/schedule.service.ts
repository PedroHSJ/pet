import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ScheduleEntity } from './schedule.entity';
import { Between, Equal, Repository } from 'typeorm';
import { ScheduleDto, ScheduleParamsDto } from './schedule.dto';
import { EstablishmentEntity } from '../establishment/establishment.entity';
import { ProfessionalEntity } from '../professional/professional.entity';
import { ClientEntity } from '../client/client.entity';
import { Sort } from 'src/utils/sort.type';
import { ApiResponseInterface } from 'src/interfaces/ApiResponse';
import { PetEntity } from '../pet/pet.entity';

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
        @InjectRepository(PetEntity)
        private readonly petRepository: Repository<PetEntity>,
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

        // verificando se o pet do cliente informado existe no banco de dados
        const petClient = await this.clientRepository
            .createQueryBuilder('client')
            .leftJoinAndSelect('client.pets', 'pets')
            .where('client.id = :clientId', { clientId: schedule.clientId })
            .andWhere('pets.id = :petId', { petId: schedule.petId })
            .getOne();
        if (!petClient) throw new BadRequestException('Pet not found');

        const pet = await this.petRepository.findOne({
            where: { id: schedule.petId },
        });
        if (!pet) throw new BadRequestException('Pet not found');

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
        scheduleEntity.pet = pet;

        //throw new BadRequestException('Busy schedule');
        const newSchedule = await this.scheduleRepository.save(scheduleEntity);
        return { id: newSchedule.id };
    }

    async update(
        id: string,
        cancellation_status: boolean,
    ): Promise<{ id: string }> {
        const scheduleExist = await this.scheduleRepository.findOne({
            where: { id },
        });
        if (!scheduleExist) throw new BadRequestException('Schedule not found');
        await this.scheduleRepository.update(id, {
            cancellationStatus: cancellation_status,
        });
        const scheduleUpadted = await this.scheduleRepository.findOne({
            where: { id },
        });
        return { id };
    }

    async findAll(
        schedule: ScheduleParamsDto,
        pageSize: number,
        page: number,
        order: Sort,
    ): Promise<ApiResponseInterface<ScheduleEntity>> {
        const query = this.scheduleRepository
            .createQueryBuilder('schedule')

            .leftJoinAndSelect('schedule.establishment', 'establishment')
            .leftJoinAndSelect('schedule.professional', 'professional')
            .leftJoinAndSelect('schedule.client', 'client')
            .leftJoinAndSelect('client.address', 'address')
            .leftJoinAndSelect('schedule.pet', 'pets')
            .leftJoinAndSelect('pets.breed', 'breed');

        if (schedule.establishmentId)
            query.andWhere('schedule.establishment_id = :establishmentId', {
                establishmentId: schedule.establishmentId,
            });

        if (schedule.professionalId)
            query.andWhere('schedule.professional_id = :professionalId', {
                professionalId: schedule.professionalId,
            });

        if (schedule.clientId)
            query.andWhere('schedule.client_id = :clientId', {
                clientId: schedule.clientId,
            });

        if (schedule.day)
            query.andWhere('schedule.day = :day', {
                day: schedule.day,
            });

        if (schedule.finished) {
            query.andWhere('schedule.finished = :finished', {
                finished: schedule.finished,
            });
        }

        const [items, totalCount] = await query
            .take(pageSize)
            .skip((page - 1) * pageSize)
            .orderBy('schedule.day', order)
            .getManyAndCount();

        return { items, totalCount };
    }
}
