import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PetClassEntity } from './pet-class.entity';
import { PetClassDTO } from './pet-class.dto';

@Injectable()
export class PetClassService {
    constructor(
        @InjectRepository(PetClassEntity)
        private readonly petClassRepository: Repository<PetClassEntity>,
    ) {}

    async create(petClass: PetClassDTO): Promise<{ id: string }> {
        const newPetClass = await this.petClassRepository.create(petClass);
        const { id } = await this.petClassRepository.save(newPetClass);
        return { id };
    }

    async findAll(): Promise<PetClassEntity[]> {
        return await this.petClassRepository.find();
    }
}
