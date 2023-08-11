import { Test, TestingModule } from '@nestjs/testing';
import { BreedService } from './breed.service';

describe('BreedService', () => {
  let service: BreedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BreedService],
    }).compile();

    service = module.get<BreedService>(BreedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
