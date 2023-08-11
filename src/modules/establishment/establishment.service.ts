import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EstablishmentEntity } from './establishment.entity';
import { Repository } from 'typeorm';
import { Sort } from 'src/utils/sort.type';
import { EstablishmentDTO, EstablishmentParamsDTO } from './establishment.dto';
import { AddressEntity } from '../address/address.entity';

@Injectable()
export class EstablishmentService {
    constructor(
        @InjectRepository(EstablishmentEntity)
        private establishmentRepository: Repository<EstablishmentEntity>,
        @InjectRepository(AddressEntity)
        private addressRepository: Repository<AddressEntity>,
    ) {}

    async findAll(
        skip: number,
        take: number,
        sort: Sort,
        establishment: EstablishmentParamsDTO,
    ): Promise<EstablishmentEntity[]> {
        const query = await this.establishmentRepository
            .createQueryBuilder('establishment')
            .leftJoinAndSelect('establishment.address', 'address')
            .take(take)
            .orderBy('establishment.name', sort)
            .where('1 = 1');

        if (establishment.name)
            query.where('establishment.name ILIKE :name', {
                name: `%${establishment.name}%`,
            });
        if (establishment.cnpj)
            query.andWhere('establishment.cnpj ILIKE :cnpj', {
                cnpj: `%${establishment.cnpj}%`,
            });

        return query.getMany();
    }

    async findByParams(
        skip: number,
        take: number,
        sort: Sort,
        establishment: EstablishmentParamsDTO,
    ): Promise<EstablishmentEntity[]> {
        const query = this.establishmentRepository
            .createQueryBuilder('establishment')
            .leftJoinAndSelect('establishment.address', 'address')
            .take(take)
            .orderBy('establishment.name', sort)
            .where('1 = 1');

        if (establishment.name)
            query.where('establishment.name ILIKE :name', {
                name: `%${establishment.name}%`,
            });
        if (establishment.cnpj)
            query.andWhere('establishment.cnpj ILIKE :cnpj', {
                cnpj: `%${establishment.cnpj}%`,
            });

        return await query.getMany();
    }

    async create(establishment: EstablishmentDTO): Promise<{ id: string }> {
        const addressExist = await this.addressRepository.findOne({
            where: { id: establishment.addressId },
        });
        if (!addressExist) throw new BadRequestException('Address not found');
        const addressEntity = this.addressRepository.create(addressExist);

        const establishmentEntity = this.establishmentRepository.create({
            ...establishment,
            address: addressEntity,
        });

        const newEstablishment = await this.establishmentRepository.save(
            establishmentEntity,
        );

        return { id: newEstablishment.id };
    }
}
