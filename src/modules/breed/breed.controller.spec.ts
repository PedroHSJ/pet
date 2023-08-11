import { Test, TestingModule } from '@nestjs/testing';
import { BreedController } from './breed.controller';

describe('BreedController', () => {
  let controller: BreedController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BreedController],
    }).compile();

    controller = module.get<BreedController>(BreedController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
