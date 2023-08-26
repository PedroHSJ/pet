import { Base } from 'src/interfaces/Base';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { EstablishmentEntity } from '../establishment/establishment.entity';
import { ProfessionalEntity } from '../professional/professional.entity';
import { ClientEntity } from '../client/client.entity';
import { TreatmentRecordEntity } from '../treatment-record/treatment-record.entity';
import { PetEntity } from '../pet/pet.entity';

@Entity('schedules')
export class ScheduleEntity implements Base {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @ManyToOne(
        () => EstablishmentEntity,
        (establishment) => establishment.schedules,
    )
    @JoinColumn({ name: 'establishment_id' })
    establishment: EstablishmentEntity;

    @ManyToOne(
        () => ProfessionalEntity,
        (professional) => professional.schedules,
    )
    @JoinColumn({ name: 'professional_id' })
    professional: ProfessionalEntity;

    @ManyToOne(() => ClientEntity, (client) => client.schedules)
    @JoinColumn({ name: 'client_id' })
    client: ClientEntity;

    @Column({ type: 'timestamp', nullable: false })
    day: Date;

    @Column({
        type: 'bit',
        name: 'cancellation_status',
        nullable: false,
        default: 0,
    })
    cancellationStatus: number;

    @OneToOne(
        () => TreatmentRecordEntity,
        (treatmentRecord) => treatmentRecord.schedule,
    )
    treatmentRecord: TreatmentRecordEntity;

    @ManyToOne(() => PetEntity, (pet) => pet.schedules)
    pet: PetEntity;
}
