import { Test, TestingModule } from '@nestjs/testing';
import { RequestOfficesService } from './request_offices.service';

describe('RequestOfficesService', () => {
  let service: RequestOfficesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RequestOfficesService],
    }).compile();

    service = module.get<RequestOfficesService>(RequestOfficesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
