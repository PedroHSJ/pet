import { Test, TestingModule } from '@nestjs/testing';
import { TreatmentRecordService } from './treatment-record.service';

describe('TreatmentRecordService', () => {
  let service: TreatmentRecordService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TreatmentRecordService],
    }).compile();

    service = module.get<TreatmentRecordService>(TreatmentRecordService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
