import { Test, TestingModule } from '@nestjs/testing';
import { MunicipalityContactsController } from './municipality_contacts.controller';

describe('MunicipalityContactsController', () => {
  let controller: MunicipalityContactsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MunicipalityContactsController],
    }).compile();

    controller = module.get<MunicipalityContactsController>(MunicipalityContactsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
