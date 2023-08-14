import { Base } from 'src/interfaces/Base';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { AnamnesisEntity } from './anamnese/anamnesis.entity';
import { ScheduleEntity } from '../schedule/schedule.entity';
import { FoodEntity } from './food/food.entity';
import { MeasurementEntity } from './measurement/measurement.entity';

@Entity('treatment_records')
export class TreatmentRecordEntity implements Base {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @OneToOne(() => ScheduleEntity, (schedule) => schedule.treatmentRecord)
    @JoinColumn({ name: 'schedule_id' })
    schedule: ScheduleEntity;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: false,
        name: 'main_complaint',
    })
    mainComplaint: string;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: false,
        name: 'treatment_performed',
    })
    treatmentPerformed: string;

    @OneToOne(() => AnamnesisEntity, (anamnesis) => anamnesis.treatmentRecord)
    @JoinColumn({ name: 'anamnesis_id' })
    anamnesis: AnamnesisEntity;

    @OneToOne(() => FoodEntity, (food) => food.treatmentRecord)
    @JoinColumn({ name: 'food_id' })
    food: FoodEntity;

    @OneToOne(
        () => MeasurementEntity,
        (measurement) => measurement.treatmentRecord,
    )
    @JoinColumn({ name: 'measurement_id' })
    measurement: MeasurementEntity;
}
