import { Base } from 'src/interfaces/Base';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { RoleEntity } from '../role/role.entity';
import { PetEntity } from '../pet/pet.entity';
import { ScheduleEntity } from '../schedule/schedule.entity';
import { AddressEntity } from '../address/address.entity';

@Entity('clients')
export class ClientEntity implements Base {
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
        type: 'varchar',
        length: 255,
        nullable: false,
        unique: true,
    })
    email: string;
    @Column({
        type: 'varchar',
        length: 255,
        nullable: false,
        select: false,
    })
    password: string;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: true,
    })
    phone: string;

    @ManyToOne(() => RoleEntity, {
        nullable: false,
    })
    @JoinColumn({ name: 'role_id' })
    role: RoleEntity;

    @OneToMany(() => PetEntity, (pet) => pet.client)
    pets?: PetEntity[];

    @OneToMany(() => ScheduleEntity, (schedule) => schedule.client)
    schedules: ScheduleEntity[];

    @ManyToOne(() => AddressEntity, (address) => address.client, {
        nullable: true,
    })
    @JoinColumn({ name: 'address_id' })
    address?: AddressEntity;
}
