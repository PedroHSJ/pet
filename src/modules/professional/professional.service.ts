import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfessionalEntity } from './professional.entity';
import { Repository } from 'typeorm';
import { ProfessionalDTO, ProfessionalParamsDTO } from './professional.dto';
import { hash } from 'bcrypt';
import { RoleEntity } from '../role/role.entity';
import { Sort } from 'src/utils/sort.type';
import { Role } from '../../enums/role';
import { ApiResponseInterface } from 'src/interfaces/ApiResponse';

@Injectable()
export class ProfessionalService {
    constructor(
        @InjectRepository(ProfessionalEntity)
        private professionalRepository: Repository<ProfessionalEntity>,
        @InjectRepository(RoleEntity)
        private roleRepository: Repository<RoleEntity>,
    ) {}

    async create(professional: ProfessionalDTO): Promise<{ id: string }> {
        const professionalCRMVExists =
            await this.professionalRepository.findOneBy({
                crmv: professional.crmv,
            });
        if (professionalCRMVExists)
            throw new BadRequestException('CRMV já cadastrado');

        const professionalEmailExists =
            await this.professionalRepository.findOneBy({
                email: professional.email,
            });
        if (professionalEmailExists)
            throw new BadRequestException('Email já cadastrado');

        professional.password = await hash(professional.password, 10);
        professional.name = professional.name.toUpperCase();
        professional.email = professional.email.toLowerCase();
        professional.phone = professional.phone.replace(/\D/g, '');
        const roleEntity = await this.roleRepository.findOneBy({
            name: Role.VETERINARIAN,
        });
        if (roleEntity == null) throw new Error('Role not found');
        const professionalEntity =
            this.professionalRepository.create(professional);
        professionalEntity.role = roleEntity;
        const newProfessional = await this.professionalRepository.save(
            professionalEntity,
        );
        return { id: newProfessional.id };
    }

    async findAll(
        professional: ProfessionalParamsDTO,
        pageSize: number,
        page: number,
        order: Sort,
    ): Promise<ApiResponseInterface<ProfessionalEntity>> {
        const query = this.professionalRepository
            .createQueryBuilder('professional')
            .leftJoin('professional.role', 'role')
            .addSelect('role.name');

        if (professional.name)
            query.andWhere('professional.name ILIKE :name', {
                name: `%${professional.name}%`,
            });

        if (professional.email)
            query.andWhere('professional.email ILIKE :email', {
                email: `%${professional.email}%`,
            });

        if (professional.phone)
            query.andWhere('professional.phone ILIKE :phone', {
                phone: `%${professional.phone}%`,
            });

        if (professional.crmv)
            query.andWhere('professional.crmv ILIKE :crmv', {
                crmv: `%${professional.crmv}%`,
            });

        const [items, count] = await query
            .skip((page - 1) * pageSize)
            .take(pageSize)
            .orderBy('professional.name', order)
            .getManyAndCount();
        return {
            items,
            totalCount: count,
            page,
            pageSize,
            order,
        };
    }

    async findById(id: string): Promise<ProfessionalEntity> {
        const query = this.professionalRepository
            .createQueryBuilder('professional')
            .leftJoin('professional.role', 'role')
            .addSelect('role.name')
            .where('professional.id = :id', { id });

        return await query.getOne();
    }

    async login(email: string): Promise<ProfessionalEntity> {
        const query = this.professionalRepository
            .createQueryBuilder('professional')
            .addSelect('professional.password')
            .leftJoin('professional.role', 'role')
            .addSelect('role.name');

        if (email)
            query.andWhere('professional.email ILIKE :email', {
                email: `%${email}%`,
            });

        return await query.getOne();
    }
}
