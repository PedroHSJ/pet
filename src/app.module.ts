import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ErrorInterceptor } from './interceptor/error.interceptor';
import { ConfigModule } from '@nestjs/config';
import { BreedModule } from './modules/breed/breed.module';
import { UserModule } from './modules/user/user.module';
import { ClientModule } from './modules/client/client.module';
import { PetModule } from './modules/pet/pet.module';
import { ProfessionalModule } from './modules/professional/professional.module';
import { ScheduleModule } from './modules/schedule/schedule.module';
import { EstablishmentModule } from './modules/establishment/establishment.module';
import { AddressModule } from './modules/address/address.module';
import { TreatmentRecordModule } from './modules/treatment-record/treatment-record.module';
import { LoggingInterceptor } from './interceptor/logging/logging.interceptor';
import { LogEntity } from './interceptor/logging/logging.entity';
import { RoleModule } from './modules/role/role.module';
import { AuthModule } from './modules/auth/auth.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthGuard } from './modules/auth/auth.guard';
@Module({
    imports: [
        ConfigModule.forRoot({}),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.DB_HOST,
            port: +process.env.DB_PORT,
            database: process.env.DB_NAME,
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
            synchronize: true,
        }),
        TypeOrmModule.forFeature([LogEntity]),
        UserModule,
        BreedModule,
        ClientModule,
        PetModule,
        ProfessionalModule,
        ScheduleModule,
        EstablishmentModule,
        AddressModule,
        TreatmentRecordModule,
        RoleModule,
        AuthModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        JwtService,
        {
            provide: APP_FILTER,
            useClass: ErrorInterceptor,
        },
        {
            provide: APP_INTERCEPTOR,
            useClass: LoggingInterceptor,
        },
        {
            provide: APP_GUARD,
            useClass: AuthGuard,
        },
    ],
})
export class AppModule {}
