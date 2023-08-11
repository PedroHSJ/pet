import { BadRequestException, Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { UserDTO } from './user.dto';
import { hash } from 'bcrypt';
import { RoleEntity } from '../role/role.entity';
import { Sort } from 'src/utils/sort.type';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
        @InjectRepository(RoleEntity)
        private roleRepository: Repository<RoleEntity>,
    ) {}

    async findAll(
        skip: number,
        take: number,
        sort: Sort,
    ): Promise<UserEntity[]> {
        return await this.userRepository
            .createQueryBuilder('user')
            .leftJoin('user.role', 'role')
            .addSelect(['role.name'])
            .take(take)
            .orderBy('user.name', sort)
            .getMany();
    }

    async findOne(id: string): Promise<UserEntity> {
        return await this.userRepository
            .createQueryBuilder('user')
            .leftJoin('user.role', 'role')
            .addSelect(['role.name'])
            .where('user.id = :id', { id })
            .getOne();
    }

    async findByEmail(email: string): Promise<UserEntity> {
        return await this.userRepository
            .createQueryBuilder('user')
            .select(['user.id', 'user.email', 'user.password'])
            .leftJoin('user.role', 'role')
            .addSelect(['role.name'])
            .where('user.email = :email', { email })
            .getOne();
    }

    async create(user: UserDTO): Promise<UserEntity> {
        try {
            user.password = await hash(user.password, 10);
            const userEntity = await this.userRepository.create(user);
            const roleEntity = await this.roleRepository.findOneBy({
                name: user.role.name,
            });
            if (roleEntity == null)
                throw new BadRequestException('Role not found');
            userEntity.role = roleEntity;

            return await this.userRepository.save(userEntity);
        } catch (error) {
            if (error instanceof QueryFailedError) {
                if (
                    error.message.includes(
                        'duplicate key value violates unique constraint',
                    )
                ) {
                    throw new BadRequestException('Email already exists');
                }
                if (
                    error.message.includes(
                        'invalid input value for enum roles_name_enum',
                    )
                ) {
                    throw new BadRequestException('Role not found');
                }
            }
        }
    }
}
