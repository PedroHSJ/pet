import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddressEntity } from './address.entity';
import { Repository } from 'typeorm';
import { Sort } from 'src/utils/sort.type';
import { AddressDTO } from './address.dto';

@Injectable()
export class AddressService {
    constructor(
        @InjectRepository(AddressEntity)
        private addressRepository: Repository<AddressEntity>,
    ) {}

    async findAll(
        page: number,
        pageSize: number,
        order: Sort,
    ): Promise<{ items: AddressEntity[]; totalCount: number }> {
        const items = await this.addressRepository.find({
            take: pageSize,
            skip: (page - 1) * pageSize,
            order: {
                city: order,
            },
        });

        const totalCount = await this.addressRepository.count();
        return { items, totalCount };
    }

    async create(address: AddressDTO): Promise<{ id: string }> {
        const addressEntity = this.addressRepository.create(address);
        const newAddress = await this.addressRepository.save(addressEntity);
        return { id: newAddress.id };
    }
}
