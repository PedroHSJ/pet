import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('logs')
export class LogEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({
        type: 'varchar',
        length: 10,
    })
    method: string;
    @Column({
        type: 'varchar',
        length: 100,
    })
    route: string;
    @Column({
        type: 'varchar',
        length: 10,
    })
    action: string;
    @Column({
        type: 'varchar',
        length: 100,
        name: 'table_name',
    })
    tableName: string;
    @Column({
        type: 'varchar',
        length: 100,
        name: 'user_id',
        nullable: true,
    })
    user?: string;

    @Column({
        type: 'varchar',
        length: 10,
        name: 'response_time',
    })
    responseTime: string;
}
