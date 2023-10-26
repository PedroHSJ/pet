import { Test, TestingModule } from '@nestjs/testing';
import { PetClassService } from './pet-class.service';

describe('PetClassService', () => {
  let service: PetClassService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PetClassService],
    }).compile();

    service = module.get<PetClassService>(PetClassService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
