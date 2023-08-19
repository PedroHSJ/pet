import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/user.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { RoleEntity } from '../role/role.entity';
import { JwtService } from '@nestjs/jwt';
import { ProfessionalService } from '../professional/professional.service';
import { ProfessionalEntity } from '../professional/professional.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity, RoleEntity, ProfessionalEntity]),
    ],
    controllers: [AuthController],
    providers: [AuthService, UserService, ProfessionalService],
})
export class AuthModule {}
