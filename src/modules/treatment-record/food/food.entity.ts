import { Base } from 'src/interfaces/Base';
import {
    Column,
    CreateDateColumn,
    Entity,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Portion } from './enums/portion.enum';
import { NaturalFood } from './enums/naturalFood.enum';
import { TreatmentRecordEntity } from '../treatment-record.entity';

@Entity('foods')
export class FoodEntity implements Base {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @Column({
        type: 'enum',
        enum: Portion,
    })
    portion: Portion;

    @Column({
        type: 'enum',
        enum: NaturalFood,
        name: 'natural_food',
    })
    naturalFood: NaturalFood;

    @OneToOne(
        () => TreatmentRecordEntity,
        (treatmentRecord) => treatmentRecord.food,
    )
    treatmentRecord: TreatmentRecordEntity;
}
