import { RoleEnum } from 'src/utils/role.enum';
import { Base } from 'src/interfaces/Base';
import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToMany,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { ClientEntity } from '../client/client.entity';
import { ProfessionalEntity } from '../professional/professional.entity';

@Entity('roles')
export class RoleEntity implements Base {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;

    @Column({ type: 'enum', enum: RoleEnum, unique: true })
    name: RoleEnum;

    @OneToMany(() => UserEntity, (user) => user.role)
    users: UserEntity[];

    @OneToMany(() => ClientEntity, (client) => client.role)
    clients: ClientEntity[];

    @OneToMany(() => ProfessionalEntity, (professional) => professional.role)
    professionals: ProfessionalEntity[];
}
