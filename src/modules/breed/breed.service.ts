import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BreedEntity } from './breed.entity';
import { QueryFailedError, Repository } from 'typeorm';
import { BreedDTO } from './breed.dto';
import { Sort } from 'src/utils/sort.type';

@Injectable()
export class BreedService {
    constructor(
        @InjectRepository(BreedEntity)
        private breedRepository: Repository<BreedEntity>,
    ) {}

    async findAll(
        take: number,
        skip: number,
        sort: Sort,
    ): Promise<BreedEntity[]> {
        const sortOptions = ['ASC', 'DESC'];
        if (!sortOptions.includes(sort.toUpperCase()))
            throw new BadRequestException('Invalid sort option');
        return await this.breedRepository.find({
            take,
            skip,
            order: {
                name: {
                    direction: sort,
                },
            },
        });
    }

    async create(breed: BreedDTO): Promise<{ id: string }> {
        try {
            const newBreed = await this.breedRepository.save(
                this.breedRepository.create(breed),
            );
            return { id: newBreed.id };
        } catch (error) {
            if (error instanceof QueryFailedError) {
                if (error.message.includes('duplicate key')) {
                    throw new BadRequestException('Breed already exists');
                }
                throw new BadRequestException(error.message);
            }
        }
    }
}
