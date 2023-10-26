import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { RoleService } from './modules/role/role.service';
import { RoleEntity } from './modules/role/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './enums/role';
import { UserEntity } from './modules/user/user.entity';
import { UserDTO } from './modules/user/user.dto';
import { hash } from 'bcrypt';
import { PetClassEntity } from './modules/pet-class/pet-class.entity';
import { SpecieEntity } from './modules/specie/specie.entity';

@Injectable()
export class AppService implements OnApplicationBootstrap {
    constructor(
        @InjectRepository(RoleEntity)
        private roleRepository: Repository<RoleEntity>,
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
        @InjectRepository(PetClassEntity)
        private petClassRepository: Repository<PetClassEntity>,
        @InjectRepository(SpecieEntity)
        private specieRepository: Repository<SpecieEntity>,
    ) {}
    getHello(): string {
        return 'Hello World!';
    }

    async onApplicationBootstrap() {
        try {
            this.createRoles();
            this.createAdmin();
            this.createPetClass();
            this.createSpecie();
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
        if (!userExist)
            await this.userRepository.save(this.userRepository.create(admin));
    }

    async createPetClass() {
        const mamiferoExist = await this.petClassRepository.findOneBy({
            name: 'Mamífero',
        });

        if (!mamiferoExist)
            await this.petClassRepository.save(
                this.petClassRepository.create({
                    name: 'Mamífero',
                }),
            );

        const aveExist = await this.petClassRepository.findOneBy({
            name: 'Ave',
        });

        if (!aveExist)
            await this.petClassRepository.save(
                this.petClassRepository.create({
                    name: 'Ave',
                }),
            );

        const peixeExist = await this.petClassRepository.findOneBy({
            name: 'Peixe',
        });

        if (!peixeExist)
            await this.petClassRepository.save(
                this.petClassRepository.create({
                    name: 'Peixe',
                }),
            );

        const reptilExist = await this.petClassRepository.findOneBy({
            name: 'Réptil',
        });

        if (!reptilExist)
            await this.petClassRepository.save(
                this.petClassRepository.create({
                    name: 'Réptil',
                }),
            );

        const anfibioExist = await this.petClassRepository.findOneBy({
            name: 'Anfíbio',
        });

        if (!anfibioExist)
            await this.petClassRepository.save(
                this.petClassRepository.create({
                    name: 'Anfíbio',
                }),
            );
    }

    async createSpecie() {
        const petClassMamifero = await this.petClassRepository.findOneBy({
            name: 'Mamífero',
        });

        if (!petClassMamifero) throw new Error('PetClass Mamífero not found');

        const caoExist = await this.specieRepository.findOneBy({
            name: 'Cão',
        });

        if (!caoExist)
            await this.specieRepository.save(
                this.specieRepository.create({
                    name: 'Cão',
                    petClass: petClassMamifero,
                }),
            );

        const gatoExist = await this.specieRepository.findOneBy({
            name: 'Gato',
        });

        if (!gatoExist)
            await this.specieRepository.save(
                this.specieRepository.create({
                    name: 'Gato',
                    petClass: petClassMamifero,
                }),
            );
    }
}
