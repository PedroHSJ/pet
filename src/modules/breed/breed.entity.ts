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

@Entity('breeds')
export class BreedEntity implements Base {
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
        unique: true,
    })
    name: string;

    @OneToMany(() => PetEntity, (pet) => pet.breed)
    pets: PetEntity[];
}
