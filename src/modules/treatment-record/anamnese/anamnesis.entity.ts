import { Base } from 'src/interfaces/Base';
import {
    Column,
    CreateDateColumn,
    Entity,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { TreatmentRecordEntity } from '../treatment-record.entity';
import { DigestiveSystem } from './enums/digestiveSystem.enum';
import { UrogenitalSystem } from './enums/urogenitalSystem.enum';
import { CardioRespiratorySystem } from './enums/cardiorespiratorySystem.enum';
import { NeurologicalSystem } from './enums/neurologicalSystem.enum';
import { LocomotorSystem } from './enums/locomotorSystem.enum';
import { Skin } from './enums/skin.enum';
import { Eyes } from './enums/eyes.enum';
import { Ears } from './enums/ears.enum';
import { Environment } from './enums/environment.enum';
import { MeasurementCondition } from '../measurement/enums/hydration.enum';

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
        nullable: true,
        name: 'digestive_system',
    })
    digestiveSystem: DigestiveSystem;

    @Column({
        type: 'varchar',
        length: 255,
        name: 'other_digestive_system',
        nullable: true,
    })
    otherDigestiveSystem?: string;

    @Column({
        type: 'enum',
        enum: UrogenitalSystem,
        nullable: true,
        name: 'urogenital_system',
    })
    urogenitalSystem: UrogenitalSystem;

    @Column({
        type: 'varchar',
        length: 255,
        name: 'other_urogenital_system',
        nullable: true,
    })
    otherUrogenitalSystem?: string;

    @Column({
        type: 'enum',
        enum: CardioRespiratorySystem,
        nullable: true,
        name: 'cardiorespiratory_system',
    })
    cardiorespiratorySystem: CardioRespiratorySystem;

    @Column({
        type: 'varchar',
        length: 255,
        name: 'other_cardiorespiratory_system',
        nullable: true,
    })
    otherCardiorespiratorySystem?: string;

    @Column({
        type: 'enum',
        enum: NeurologicalSystem,
        nullable: true,
        name: 'neurological_system',
    })
    neurologicSystem: NeurologicalSystem;

    @Column({
        type: 'varchar',
        length: 255,
        name: 'other_neurological_system',
        nullable: true,
    })
    otherNeurologicSystem?: string;

    @Column({
        type: 'enum',
        enum: LocomotorSystem,
        nullable: true,
        name: 'locomotor_system',
    })
    locomotorSystem: LocomotorSystem;

    @Column({
        type: 'varchar',
        length: 255,
        name: 'other_locomotor_system',
        nullable: true,
    })
    otherLocomotorSystem?: string;

    @Column({
        type: 'enum',
        enum: Skin,
        nullable: true,
    })
    skin: Skin;

    @Column({
        type: 'varchar',
        length: 255,
        name: 'other_skin',
        nullable: true,
    })
    otherSkin?: string;

    @Column({
        type: 'enum',
        enum: Eyes,
        nullable: true,
    })
    eyes: Eyes;

    @Column({
        type: 'varchar',
        length: 255,
        name: 'other_eyes',
        nullable: true,
    })
    otherEyes?: string;

    @Column({
        type: 'enum',
        enum: Ears,
        nullable: true,
    })
    ears: Ears;

    @Column({
        type: 'varchar',
        length: 255,
        name: 'other_ears',
        nullable: true,
    })
    otherEars?: string;

    @Column({
        type: 'enum',
        enum: Environment,
        nullable: true,
    })
    environment: Environment;

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

    @Column({
        type: 'varchar',
        length: 255,
        name: 'other_environment',
        nullable: true,
    })
    otherEnvironment?: string;

    @OneToOne(
        () => TreatmentRecordEntity,
        (treatmentRecord) => treatmentRecord.anamnesis,
    )
    treatmentRecord: TreatmentRecordEntity;
}
