import { BadRequestException, Injectable } from '@nestjs/common';
import { PetEntity } from './pet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PetDTO, PetParamsDTO } from './pet.dto';
import { BreedEntity } from '../breed/breed.entity';
import { ClientEntity } from '../client/client.entity';
import { Sort } from 'src/utils/sort.type';
import { ApiResponseInterface } from 'src/interfaces/ApiResponse';

@Injectable()
export class PetService {
    constructor(
        @InjectRepository(PetEntity)
        private petRepository: Repository<PetEntity>,
        @InjectRepository(BreedEntity)
        private breedRepository: Repository<BreedEntity>,
        @InjectRepository(ClientEntity)
        private clientRepository: Repository<ClientEntity>,
    ) {}

    async create(pet: PetDTO): Promise<{ id: string }> {
        const breedEntity = await this.breedRepository.findOne({
            where: { name: pet.breed.name },
        });
        if (!breedEntity) throw new BadRequestException('Breed not found');
        const clientExist = await this.clientRepository.findOne({
            where: { id: pet.clientId },
        });
        if (!clientExist) throw new BadRequestException('Client not found');

        const petEntity = this.petRepository.create(pet);
        petEntity.breed = breedEntity;
        petEntity.client = clientExist;
        const newPet = await this.petRepository.save(petEntity);
        return { id: newPet.id };
    }

    async findAll(
        pageSize: number,
        page: number,
        order: Sort,
        pet: PetParamsDTO,
    ): Promise<ApiResponseInterface<PetEntity>> {
        const query = await this.petRepository
            .createQueryBuilder('pet')
            .leftJoin('pet.breed', 'breed')
            .addSelect('breed.name');

        if (pet.name)
            query.where('pet.name ILIKE :name', {
                name: `%${pet.name}%`,
            });

        if (pet.weight)
            query.andWhere('pet.weight = :weight', {
                weight: pet.weight,
            });

        if (pet.specie)
            query.andWhere('pet.specie = :specie', {
                specie: pet.specie,
            });

        if (pet.gender)
            query.andWhere('pet.gender = :gender', {
                gender: pet.gender,
            });

        if (pet.dateOfBirth)
            query.andWhere('pet.dateOfBirth = :dateOfBirth', {
                dateOfBirth: pet.dateOfBirth,
            });

        const [items, totalCount] = await query
            .take(pageSize)
            .skip((page - 1) * pageSize)
            .orderBy('pet.name', order)
            .getManyAndCount();

        return;
    }

    async findById(id: string): Promise<PetEntity> {
        return await this.petRepository
            .createQueryBuilder('pet')
            .leftJoin('pet.breed', 'breed')
            .addSelect('breed.name')
            .where('pet.id = :id', { id })
            .getOne();
    }
}
