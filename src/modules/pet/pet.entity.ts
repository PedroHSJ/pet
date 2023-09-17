import { Base } from 'src/interfaces/Base';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { BreedEntity } from '../breed/breed.entity';
import { ClientEntity } from '../client/client.entity';
import { Specie } from '../../enums/specie';
import { Gender } from '../../enums/gender';
import { ScheduleEntity } from '../schedule/schedule.entity';

@Entity('pets')
export class PetEntity implements Base {
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
        type: 'numeric',
        nullable: false,
    })
    weight: number;

    @ManyToOne(() => BreedEntity, {
        nullable: false,
    })
    @JoinColumn({ name: 'breed_id' })
    breed: BreedEntity;

    @ManyToOne(() => ClientEntity, {
        nullable: false,
    })
    @JoinColumn({ name: 'client_id' })
    client: ClientEntity;

    @Column({
        type: 'enum',
        enum: Specie,
        nullable: false,
    })
    specie: Specie;

    @Column({
        type: 'enum',
        enum: Gender,
    })
    gender: Gender;

    @Column({
        type: 'date',
        nullable: true,
        name: 'date_of_birth',
    })
    dateOfBirth: Date;

    @OneToMany(() => ScheduleEntity, (schedule) => schedule.pet)
    schedules: ScheduleEntity[];
}
