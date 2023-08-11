import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EstablishmentEntity } from './establishment.entity';
import { Repository } from 'typeorm';
import { Sort } from 'src/utils/sort.type';
import { EstablishmentDTO } from './establishment.dto';
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
    ): Promise<EstablishmentEntity[]> {
        return await this.establishmentRepository
            .createQueryBuilder('establishment')
            .leftJoinAndSelect('establishment.address', 'address')

            .getMany();
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
