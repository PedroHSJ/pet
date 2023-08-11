import { Module } from '@nestjs/common';
import { TreatmentRecordController } from './treatment-record.controller';
import { TreatmentRecordService } from './treatment-record.service';

@Module({
  controllers: [TreatmentRecordController],
  providers: [TreatmentRecordService]
})
export class TreatmentRecordModule {}
