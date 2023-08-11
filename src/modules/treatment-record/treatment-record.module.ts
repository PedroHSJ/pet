import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TreatmentRecordController } from './treatment-record.controller';
import { TreatmentRecordService } from './treatment-record.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TreatmentRecordEntity } from './treatment-record.entity';
import { TreatmentRecordMiddleware } from './treatment-record.middleware';
import { AnamnesisEntity } from './anamnese/anamnesis.entity';
import { ScheduleEntity } from '../schedule/schedule.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            TreatmentRecordEntity,
            AnamnesisEntity,
            ScheduleEntity,
        ]),
    ],
    controllers: [TreatmentRecordController],
    providers: [TreatmentRecordService],
})
export class TreatmentRecordModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(TreatmentRecordMiddleware).forRoutes({
            path: 'treatment-record',
            method: RequestMethod.POST,
        });
    }
}
