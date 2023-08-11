import { Test, TestingModule } from '@nestjs/testing';
import { TreatmentRecordController } from './treatment-record.controller';

describe('TreatmentRecordController', () => {
  let controller: TreatmentRecordController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TreatmentRecordController],
    }).compile();

    controller = module.get<TreatmentRecordController>(TreatmentRecordController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
