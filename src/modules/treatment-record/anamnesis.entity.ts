import { Base } from 'src/interfaces/Base';
import { DigestiveSystem } from 'src/utils/digestiveSystem.enum';
import {
    Column,
    CreateDateColumn,
    Entity,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { TreatmentRecordEntity } from './treatment-record.entity';

@Entity('anamnesis')
export class AnamnesisEntity implements Base {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @Column({
        type: 'enum',
        enum: DigestiveSystem,
        nullable: false,
    })
    digestiveSystem: DigestiveSystem;

    @OneToOne(
        () => TreatmentRecordEntity,
        (treatmentRecord) => treatmentRecord.anamnesis,
    )
    treatmentRecord: TreatmentRecordEntity;
}
