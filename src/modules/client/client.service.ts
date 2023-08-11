import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientDTO, ClientParamDTO } from './client.dto';
import { ClientEntity } from './client.entity';
import { hash } from 'bcrypt';
import { RoleDTO } from '../role/role.dto';
import { RoleEnum } from 'src/utils/role.enum';
import { RoleEntity } from '../role/role.entity';
import { Sort } from 'src/utils/sort.type';
import { AddressEntity } from '../address/address.entity';

@Injectable()
export class ClientService {
    constructor(
        @InjectRepository(ClientEntity)
        private clientRepository: Repository<ClientEntity>,
        @InjectRepository(RoleEntity)
        private roleRepository: Repository<RoleEntity>,
        @InjectRepository(AddressEntity)
        private addressRepository: Repository<AddressEntity>,
    ) {}

    async create(client: ClientDTO): Promise<{ id: string }> {
        client.password = await hash(client.password, 10);
        const roleEntity = await this.roleRepository.findOneBy({
            name: RoleEnum.CLIENT,
        });
        if (roleEntity == null) throw new BadRequestException('Role not found');
        client.role = roleEntity;

        const clientEntity = this.clientRepository.create(client);
        const emailExist = await this.clientRepository.findOne({
            where: { email: client.email },
        });
        if (emailExist) throw new BadRequestException('Email already exists');

        if (client.addressId) {
            const addressExist = await this.addressRepository.findOne({
                where: { id: client.addressId },
            });
            if (!addressExist)
                throw new BadRequestException('Address not found');

            clientEntity.address = addressExist;
        }

        const newClient = await this.clientRepository.save(clientEntity);
        return { id: newClient.id };
    }

    async update(id: string, client: ClientDTO): Promise<{ id: string }> {
        const clientExist = await this.clientRepository.findOne({
            where: { id },
        });
        if (!clientExist) throw new Error('Client not found');
        if (client.password) client.password = await hash(client.password, 10);
        this.clientRepository.update(id, client);
        return { id };
    }

    async findAll(
        take: number,
        skip: number,
        sort: Sort,
    ): Promise<ClientEntity[]> {
        return await this.clientRepository
            .createQueryBuilder('client')
            .leftJoin('client.role', 'role')
            .addSelect('role.name')
            .leftJoinAndSelect('client.pets', 'pets')
            .leftJoinAndSelect('client.address', 'address')
            .take(take)
            .addOrderBy('client.name', sort)
            .getMany();
    }

    async findByParams(
        take: number,
        skip: number,
        sort: Sort,
        client: ClientParamDTO,
    ): Promise<ClientEntity[]> {
        const query = this.clientRepository
            .createQueryBuilder('client')
            .leftJoin('client.role', 'role')
            .addSelect('role.name')
            .leftJoinAndSelect('client.pets', 'pets')
            .leftJoinAndSelect('client.address', 'address')
            .take(take)
            .addOrderBy('client.name', sort)
            .where('1=1');

        if (client.name) {
            query.andWhere('client.name ilike :name', {
                name: `%${client.name}%`,
            });
        }
        if (client.email) {
            query.andWhere('client.email like :email', {
                email: `%${client.email}%`,
            });
        }

        return await query.getMany();
    }
}
