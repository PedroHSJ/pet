import { Base } from 'src/interfaces/Base';
import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { PetEntity } from '../pet/pet.entity';
import { SpecieEntity } from '../specie/specie.entity';

@Entity('pet_classses')
export class PetClassEntity implements Base {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: false,
    })
    name: string;

    @Column({
        type: 'boolean',
        default: true,
    })
    active: boolean;

    @OneToMany(() => PetClassEntity, (pet) => pet.species)
    species: SpecieEntity[];
}
