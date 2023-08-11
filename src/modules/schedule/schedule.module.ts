import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ScheduleController } from './schedule.controller';
import { ScheduleService } from './schedule.service';
import { ScheduleMiddleware } from './schedule.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleEntity } from './schedule.entity';
import { ProfessionalEntity } from '../professional/professional.entity';
import { ClientEntity } from '../client/client.entity';
import { EstablishmentEntity } from '../establishment/establishment.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            ScheduleEntity,
            ProfessionalEntity,
            ClientEntity,
            EstablishmentEntity,
        ]),
    ],
    controllers: [ScheduleController],
    providers: [ScheduleService],
})
export class ScheduleModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(ScheduleMiddleware).forRoutes({
            path: 'schedule',
            method: RequestMethod.POST,
        });
    }
}
