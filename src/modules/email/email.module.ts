import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { ProfessionalService } from '../professional/professional.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfessionalEntity } from '../professional/professional.entity';
import { RoleEntity } from '../role/role.entity';
import { ClientEntity } from '../client/client.entity';
import { ClientService } from '../client/client.service';
import { AddressEntity } from '../address/address.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            ProfessionalEntity,
            RoleEntity,
            ClientEntity,
            AddressEntity,
        ]),
    ],
    providers: [EmailService, ProfessionalService, ClientService],
    controllers: [EmailController],
})
export class EmailModule {}
