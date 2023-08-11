import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_FILTER } from '@nestjs/core';
import { ErrorInterceptor } from './interceptor/error.interceptor';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { BreedModule } from './modules/breed/breed.module';
import { UserModule } from './modules/user/user.module';
import { ClientModule } from './modules/client/client.module';
import { PetModule } from './modules/pet/pet.module';
import { ProfessionalModule } from './modules/professional/professional.module';
import { ScheduleModule } from './modules/schedule/schedule.module';
import { EstablishmentModule } from './modules/establishment/establishment.module';
import { AddressModule } from './modules/address/address.module';
import { TreatmentRecordModule } from './modules/treatment-record/treatment-record.module';
@Module({
    imports: [
        ConfigModule.forRoot({}),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            database: 'pet',
            username: 'postgres',
            password: 'postgres',
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
            synchronize: true,
        }),
        UserModule,
        AuthModule,
        BreedModule,
        ClientModule,
        PetModule,
        ProfessionalModule,
        ScheduleModule,
        EstablishmentModule,
        AddressModule,
        TreatmentRecordModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_FILTER,
            useClass: ErrorInterceptor,
        },
    ],
})
export class AppModule {}
