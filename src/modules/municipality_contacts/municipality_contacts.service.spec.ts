import { Test, TestingModule } from '@nestjs/testing';
import { MunicipalityContactsService } from './municipality_contacts.service';

describe('MunicipalityContactsService', () => {
  let service: MunicipalityContactsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MunicipalityContactsService],
    }).compile();

    service = module.get<MunicipalityContactsService>(MunicipalityContactsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
