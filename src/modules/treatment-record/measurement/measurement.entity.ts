import { Base } from 'src/interfaces/Base';
import {
    Column,
    CreateDateColumn,
    Entity,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { MeasurementCondition } from './enums/hydration.enum';
import { TreatmentRecordEntity } from '../treatment-record.entity';

@Entity('measurements')
export class MeasurementEntity implements Base {
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
    temperature: string;
    @Column({
        type: 'varchar',
        length: 255,
        nullable: false,
    })
    bloodPressure: string;
    @Column({
        type: 'varchar',
        length: 255,
        nullable: false,
    })
    heartRate: string;
    @Column({
        type: 'varchar',
        length: 255,
        nullable: false,
    })
    respiratoryRate: string;
    @Column({
        type: 'varchar',
        length: 255,
        nullable: false,
    })
    glycemia: string;

    @Column({
        type: 'enum',
        enum: MeasurementCondition,
        name: 'hydration',
    })
    hydration: MeasurementCondition;

    @Column({
        type: 'enum',
        enum: MeasurementCondition,
        name: 'mucous',
    })
    mucous: MeasurementCondition;

    @Column({
        type: 'enum',
        enum: MeasurementCondition,
        name: 'oral_cavity',
    })
    oralCavity: MeasurementCondition;

    @Column({
        type: 'enum',
        enum: MeasurementCondition,
        name: 'nasal_cavity',
    })
    nasalCavity: MeasurementCondition;

    @Column({
        type: 'enum',
        enum: MeasurementCondition,
        name: 'lymph_nodes',
    })
    lymphNodes: MeasurementCondition;

    @OneToOne(
        () => TreatmentRecordEntity,
        (treatmentRecord) => treatmentRecord.measurement,
    )
    treatmentRecord: TreatmentRecordEntity;
}
