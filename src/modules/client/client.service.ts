import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientDTO, ClientParamDTO } from './client.dto';
import { ClientEntity } from './client.entity';
import { compare, hash } from 'bcrypt';
import { RoleEntity } from '../role/role.entity';
import { Sort } from 'src/utils/sort.type';
import { AddressEntity } from '../address/address.entity';
import { Role } from '../../enums/role';
import { ApiResponseInterface } from 'src/interfaces/ApiResponse';

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
        const roleEntity = await this.roleRepository.findOneBy({
            name: Role.CLIENT,
        });
        if (roleEntity == null) throw new BadRequestException('Role not found');
        client.role = roleEntity;

        client.password = await hash(client.password, 10);
        client.phone = client.phone.replace(/\D/g, '');
        // PRIMEIRA LETRA DE CADA NOME MAIUSCULA
        client.name = client.name
            .split(' ')
            .map((name) => {
                return name.charAt(0).toUpperCase() + name.slice(1);
            })
            .join(' ');
        const clientEntity = this.clientRepository.create(client);
        const emailExist = await this.clientRepository.findOne({
            where: { email: client.email },
        });
        if (emailExist) throw new BadRequestException('Email already exists');

        const addressEntity = await this.addressRepository.save(
            this.addressRepository.create(client.address),
        );

        clientEntity.address = addressEntity;

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
        params: ClientParamDTO,
        page: number,
        pageSize: number,
        order: Sort,
    ): Promise<ApiResponseInterface<ClientEntity>> {
        const query = this.clientRepository
            .createQueryBuilder('client')
            .leftJoin('client.role', 'role')
            .addSelect('role.name')
            .leftJoinAndSelect('client.pets', 'pets')
            .leftJoinAndSelect('client.address', 'address');

        if (params.id) query.andWhere('client.id = :id', { id: params.id });

        if (params.name) {
            query.andWhere('client.name ilike :name', {
                name: `%${params.name}%`,
            });
        }
        if (params.email) {
            query.andWhere('client.email ilike :email', {
                email: `%${params.email}%`,
            });
        }
        if (params.phone) {
            query.andWhere('client.phone ilike :phone', {
                phone: `%${params.phone}%`,
            });
        }

        const [items, totalCount] = await query
            .skip((page - 1) * pageSize)
            .take(pageSize)
            .getManyAndCount();
        return {
            items,
            totalCount,
            page,
            pageSize,
            order,
        };
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

    async login(email: string): Promise<ClientEntity> {
        const query = this.clientRepository
            .createQueryBuilder('client')
            .addSelect('client.password')
            .leftJoin('client.role', 'role')
            .addSelect('role.name');

        if (email)
            query.andWhere('client.email ILIKE :email', {
                email: `%${email}%`,
            });

        return await query.getOne();
    }

    async updatePass(
        email: string,
        password: string,
        verificationCode: string,
    ) {
        const clientExist = await this.clientRepository.findOne({
            where: { email: email },
        });

        const comparedVericationCode = await compare(
            verificationCode,
            clientExist.verificationCode,
        );
        console.log(comparedVericationCode);

        if (clientExist && comparedVericationCode)
            await this.clientRepository.update(clientExist.id, {
                password: await hash(password, 10),
            });
    }
}
