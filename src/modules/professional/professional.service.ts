import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfessionalEntity } from './professional.entity';
import { Repository } from 'typeorm';
import { ProfessionalDTO } from './professional.dto';
import { hash } from 'bcrypt';
import { RoleEnum } from 'src/utils/role.enum';
import { RoleEntity } from '../role/role.entity';
import { Sort } from 'src/utils/sort.type';

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
        const roleEntity = await this.roleRepository.findOneBy({
            name: RoleEnum.VETERINARIAN,
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
    ): Promise<ProfessionalEntity[]> {
        return await this.professionalRepository
            .createQueryBuilder('professional')
            .leftJoin('professional.role', 'role')
            .addSelect('role.name')
            .take(take)
            .orderBy('professional.name', sort)
            .getMany();
    }
}
