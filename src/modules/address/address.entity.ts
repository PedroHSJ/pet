import { Base } from 'src/interfaces/Base';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { EstablishmentEntity } from '../establishment/establishment.entity';
import { ClientEntity } from '../client/client.entity';

@Entity('addresses')
export class AddressEntity implements Base {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @Column({ type: 'varchar', length: 255, nullable: false })
    street: string;
    @Column({ type: 'varchar', length: 10, nullable: false })
    number: string;
    @Column({ type: 'varchar', length: 255, nullable: false })
    complement: string;
    @Column({ type: 'varchar', length: 255, nullable: false })
    neighborhood: string;
    @Column({ type: 'varchar', length: 255, nullable: false })
    city: string;
    @Column({ type: 'varchar', length: 255, nullable: false })
    state: string;

    @Column({
        type: 'varchar',
        length: 8,
        nullable: false,
        name: 'postal_code',
    })
    postalCode: string;

    @OneToOne(
        () => EstablishmentEntity,
        (establishment) => establishment.address,
    )
    establishment: EstablishmentEntity;

    @OneToMany(() => ClientEntity, (client) => client.address)
    client?: ClientEntity;
}
