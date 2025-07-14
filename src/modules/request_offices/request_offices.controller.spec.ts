import { Test, TestingModule } from '@nestjs/testing';
import { RequestOfficesController } from './request_offices.controller';
import { RequestOfficesService } from './request_offices.service';

describe('RequestOfficesController', () => {
  let controller: RequestOfficesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RequestOfficesController],
      providers: [RequestOfficesService],
    }).compile();

    controller = module.get<RequestOfficesController>(RequestOfficesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
