import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfessionalEntity } from './professional.entity';
import { Repository } from 'typeorm';
import { ProfessionalDTO, ProfessionalParamsDTO } from './professional.dto';
import { hash } from 'bcrypt';
import { RoleEntity } from '../role/role.entity';
import { Sort } from 'src/utils/sort.type';
import { Role } from '../../enums/role';

@Injectable()
export class ProfessionalService {
    constructor(
        @InjectRepository(ProfessionalEntity)
        private professionalRepository: Repository<ProfessionalEntity>,
        @InjectRepository(RoleEntity)
        private roleRepository: Repository<RoleEntity>,
    ) {}

    async create(professional: ProfessionalDTO): Promise<{ id: string }> {
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
        skip: number,
        take: number,
        sort: Sort,
        professional: ProfessionalParamsDTO,
    ): Promise<ProfessionalEntity[]> {
        const query = await this.professionalRepository
            .createQueryBuilder('professional')
            .leftJoin('professional.role', 'role')
            .addSelect('role.name')
            .take(take);
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

        return await query.getMany();
    }
}
