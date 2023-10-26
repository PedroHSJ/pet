import { Base } from 'src/interfaces/Base';
import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('procedures')
export class ProcedureEntity implements Base {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
    @Column({ type: 'varchar', length: 255, nullable: false })
    name: string;
    @Column({ type: 'varchar', length: 255, nullable: false })
    code: string;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
    price: number;
}
