import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { ProfessionalService } from '../professional/professional.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfessionalEntity } from '../professional/professional.entity';
import { RoleEntity } from '../role/role.entity';

@Module({
    imports: [TypeOrmModule.forFeature([ProfessionalEntity, RoleEntity])],
    providers: [EmailService, ProfessionalService],
    controllers: [EmailController],
})
export class EmailModule {}
