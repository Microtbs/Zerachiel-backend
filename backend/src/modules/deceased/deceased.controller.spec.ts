import { Test, TestingModule } from '@nestjs/testing';
import { DeceasedController } from './deceased.controller';
import { DeceasedService } from './deceased.service';

describe('DeceasedController', () => {
  let controller: DeceasedController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeceasedController],
      providers: [DeceasedService],
    }).compile();

    controller = module.get<DeceasedController>(DeceasedController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
