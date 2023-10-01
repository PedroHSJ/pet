import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { RoleService } from './modules/role/role.service';
import { RoleEntity } from './modules/role/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './enums/role';
import { UserEntity } from './modules/user/user.entity';
import { UserDTO } from './modules/user/user.dto';
import { hash } from 'bcrypt';

@Injectable()
export class AppService implements OnApplicationBootstrap {
    constructor(
        @InjectRepository(RoleEntity)
        private roleRepository: Repository<RoleEntity>,
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
    ) {}
    getHello(): string {
        return 'Hello World!';
    }

    async onApplicationBootstrap() {
        try {
            this.createRoles();
            this.createAdmin();
        } catch (error) {
            console.log(error);
        }
    }

    async createRoles() {
        // ADMIN = 'ADMIN',
        // CLIENT = 'CLIENT',
        // EMPLOYEE = 'EMPLOYEE',
        // VETERINARIAN = 'VETERINARIAN',
        //verify if exist roles in database
        const roleAdminExist = await this.roleRepository.findOneBy({
            name: Role.ADMIN,
        });
        if (!roleAdminExist)
            await this.roleRepository.save({ name: Role.ADMIN });
        const roleClientExist = await this.roleRepository.findOneBy({
            name: Role.CLIENT,
        });
        if (!roleClientExist)
            await this.roleRepository.save({ name: Role.CLIENT });
        const roleVeterinaryExist = await this.roleRepository.findOneBy({
            name: Role.VETERINARIAN,
        });
        if (!roleVeterinaryExist)
            await this.roleRepository.save({ name: Role.VETERINARIAN });
        const roleEmployeeExist = await this.roleRepository.findOneBy({
            name: Role.EMPLOYEE,
        });
        if (!roleEmployeeExist)
            await this.roleRepository.save({ name: Role.EMPLOYEE });
    }

    async createAdmin() {
        const roleAdmin = await this.roleRepository.findOneBy({
            name: Role.ADMIN,
        });
        if (!roleAdmin) throw new Error('Role Admin not found');
        const admin: UserDTO = {
            name: 'Admin',
            email: 'email@email.com',
            password: await hash('123456', 10),
            role: roleAdmin,
        };
        const userExist = await this.userRepository.findOneBy({
            email: admin.email,
        });
        if (userExist) throw new Error('User already exists');
        await this.userRepository.save(this.userRepository.create(admin));
    }
}
