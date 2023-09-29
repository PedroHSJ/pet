import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EstablishmentEntity } from './establishment.entity';
import { Repository } from 'typeorm';
import { Sort } from 'src/utils/sort.type';
import { EstablishmentDTO, EstablishmentParamsDTO } from './establishment.dto';
import { AddressEntity } from '../address/address.entity';
import { ApiResponseInterface } from 'src/interfaces/ApiResponse';

@Injectable()
export class EstablishmentService {
    constructor(
        @InjectRepository(EstablishmentEntity)
        private establishmentRepository: Repository<EstablishmentEntity>,
        @InjectRepository(AddressEntity)
        private addressRepository: Repository<AddressEntity>,
    ) {}

    async findAll(
        page: number,
        pageSize: number,
        order: Sort,
        establishment: EstablishmentParamsDTO,
    ): Promise<ApiResponseInterface<EstablishmentEntity>> {
        const query = this.establishmentRepository
            .createQueryBuilder('establishment')
            .leftJoinAndSelect('establishment.address', 'address');

        if (establishment.name)
            query.where('establishment.name ILIKE :name', {
                name: `%${establishment.name}%`,
            });
        if (establishment.cnpj)
            query.andWhere('establishment.cnpj ILIKE :cnpj', {
                cnpj: `%${establishment.cnpj}%`,
            });

        if (establishment.active) {
            query.andWhere('establishment.active = :active', {
                active: establishment.active,
            });
        }

        const [items, totalCount] = await query
            .take(pageSize)
            .skip((page - 1) * pageSize)
            .orderBy('establishment.name', order)
            .getManyAndCount();

        return { items, totalCount };
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
        // const addressExist = await this.addressRepository.findOne({
        //     where: { id: establishment.address },
        // });
        // if (!addressExist) throw new BadRequestException('Address not found');

        if (establishment.cnpj)
            establishment.cnpj = establishment.cnpj.replace(/\D/g, '');
        if (establishment.name)
            establishment.name = establishment.name.toUpperCase();
        if (establishment.address.postalCode)
            establishment.address.postalCode =
                establishment.address.postalCode.replace(/\D/g, '');

        const addressEntity = await this.addressRepository.save(
            this.addressRepository.create(establishment.address),
        );

        const establishmentEntity = this.establishmentRepository.create({
            ...establishment,
            address: addressEntity,
        });
        const newEstablishment = await this.establishmentRepository.save(
            establishmentEntity,
        );

        return { id: newEstablishment.id };
    }

    async update(
        id: string,
        establishment: EstablishmentDTO,
    ): Promise<{ id: string }> {
        const establishmentExist = await this.establishmentRepository.findOne({
            where: { id },
        });
        if (!establishmentExist)
            throw new BadRequestException('Establishment not found');
        if (establishment.cnpj)
            establishment.cnpj = establishment.cnpj.replace(/\D/g, '');
        if (establishment.name)
            establishment.name = establishment.name.toUpperCase();
        if (establishment.address.postalCode)
            establishment.address.postalCode =
                establishment.address.postalCode.replace(/\D/g, '');

        if (establishment.address) {
            const addressEntity = await this.addressRepository.save(
                this.addressRepository.create(establishment.address),
            );
            establishment.address = addressEntity;
        }
        this.establishmentRepository.update(id, establishment);
        return { id };
    }
}
