import { BadRequestException, Injectable } from '@nestjs/common';
import { PetEntity } from './pet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PetDTO } from './pet.dto';
import { BreedEntity } from '../breed/breed.entity';
import { ClientEntity } from '../client/client.entity';
import { Sort } from 'src/utils/sort.type';

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
        take: number,
        skip: number,
        sort: Sort,
    ): Promise<PetEntity[]> {
        return await this.petRepository
            .createQueryBuilder('pet')
            .leftJoin('pet.breed', 'breed')
            .addSelect('breed.name')
            .take(take)
            .orderBy('pet.name', sort)
            .getMany();
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
