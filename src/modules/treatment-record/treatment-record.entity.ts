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
import { AnamnesisEntity } from './anamnesis.entity';

@Entity('treatment_records')
export class TreatmentRecordEntity implements Base {
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
    mainComplaint: string;

    @OneToOne(() => AnamnesisEntity, (anamnesis) => anamnesis.treatmentRecord)
    @JoinColumn({ name: 'anamnesis_id' })
    anamnesis: AnamnesisEntity;
}
