import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SpecieEntity } from './specie.entity';
import { SpecieDTO, SpecieParamsDTO } from './specie.dto';
import { Sort } from 'src/utils/sort.type';
import { ApiResponseInterface } from 'src/interfaces/ApiResponse';
import { PetClassEntity } from '../pet-class/pet-class.entity';

@Injectable()
export class SpecieService {
    constructor(
        @InjectRepository(SpecieEntity)
        private readonly specieRepository: Repository<SpecieEntity>,
        @InjectRepository(PetClassEntity)
        private readonly petClassRepository: Repository<PetClassEntity>,
    ) {}

    async create(specie: SpecieDTO): Promise<{ id: string }> {
        const petClassExist = await this.petClassRepository.findOne({
            where: { id: specie.petClassId },
        });
        if (!petClassExist) throw new BadRequestException('PetClass not found');

        const newSpecie = await this.specieRepository.create(specie);
        newSpecie.petClass = petClassExist;
        const { id } = await this.specieRepository.save(newSpecie);
        return { id };
    }

    async findAll(
        pageSize: number,
        page: number,
        order: Sort,
        specie: SpecieParamsDTO,
    ): Promise<ApiResponseInterface<SpecieEntity>> {
        const query = await this.specieRepository.createQueryBuilder('specie');

        if (specie.name)
            query.where('specie.name ILIKE :name', {
                name: `%${specie.name}%`,
            });

        const [items, totalCount] = await query
            .take(pageSize)
            .skip((page - 1) * pageSize)
            .orderBy('specie.name', order)
            .getManyAndCount();

        return {
            items,
            totalCount,
        };
    }
}
