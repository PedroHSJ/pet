import { Base } from 'src/interfaces/Base';
import {
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
} from 'typeorm';
import { PetClassEntity } from '../pet-class/pet-class.entity';
import { PetEntity } from '../pet/pet.entity';

@Entity('species')
export class SpecieEntity implements Base {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
    @Column({ type: 'varchar', length: 255, nullable: false })
    name: string;
    @Column({ type: 'boolean', default: true })
    active: boolean;

    @ManyToOne(() => PetClassEntity, {
        nullable: false,
    })
    @JoinColumn({ name: 'pet_class_id' })
    petClass: PetClassEntity;

    @OneToMany(() => PetEntity, (pet) => pet.specie)
    pets: PetEntity[];
}
