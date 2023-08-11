import { Address } from 'cluster';
import { Base } from 'src/interfaces/Base';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { AddressEntity } from '../address/address.entity';
import { ScheduleEntity } from '../schedule/schedule.entity';

@Entity('establishments')
export class EstablishmentEntity implements Base {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @Column({ type: 'varchar', length: 255, nullable: false })
    name: string;
    @Column({ type: 'varchar', length: 14, nullable: false })
    cnpj: string;

    @OneToOne(() => AddressEntity, (address) => address.establishment)
    @JoinColumn({ name: 'address_id' })
    address: AddressEntity;

    @OneToMany(() => ScheduleEntity, (schedule) => schedule.establishment)
    schedules: ScheduleEntity[];
}
