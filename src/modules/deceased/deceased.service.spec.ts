import { Test, TestingModule } from '@nestjs/testing';
import { DeceasedService } from './deceased.service';

describe('DeceasedService', () => {
  let service: DeceasedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeceasedService],
    }).compile();

    service = module.get<DeceasedService>(DeceasedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
