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
import { RoleEntity } from '../role/role.entity';
import { ScheduleEntity } from '../schedule/schedule.entity';

@Entity('professionals')
export class ProfessionalEntity implements Base {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
    @Column({ type: 'varchar', length: 255, nullable: false })
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
    })
    phone: string;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: false,
        unique: true,
    })
    crmv: string;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: true,
    })
    verificationCode: string;

    @Column({ type: 'boolean', default: true })
    active: boolean;

    @ManyToOne(() => RoleEntity, {
        nullable: false,
    })
    @JoinColumn({ name: 'role_id' })
    role: RoleEntity;

    @OneToMany(() => ScheduleEntity, (schedule) => schedule.professional)
    schedules: ScheduleEntity[];
}
