import { Base } from 'src/interfaces/Base';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { BreedEntity } from '../breed/breed.entity';
import { ClientEntity } from '../client/client.entity';
import { Specie } from 'src/enums/specie';
import { Gender } from 'src/enums/gender';

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
        nullable: false,
    })
    gender: Gender;
}
