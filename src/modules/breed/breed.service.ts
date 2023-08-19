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
        page: number,
        pageSize: number,
        order: Sort,
    ): Promise<BreedEntity[]> {
        return await this.breedRepository.find({
            take: pageSize,
            skip: (page - 1) * pageSize,
            order: {
                name: {
                    direction: order,
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
