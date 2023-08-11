import { Base } from 'src/interfaces/Base';
import {
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    Column,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { RoleEntity } from '../role/role.entity';

@Entity('users')
export class UserEntity implements Base {
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

    @ManyToOne(() => RoleEntity, {
        nullable: false,
    })
    @JoinColumn({ name: 'role_id' })
    role: RoleEntity;
}
