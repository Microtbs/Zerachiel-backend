import { Test, TestingModule } from '@nestjs/testing';
import { MucipalityContactsService } from './mucipality_contacts.service';

describe('MucipalityContactsService', () => {
  let service: MucipalityContactsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MucipalityContactsService],
    }).compile();

    service = module.get<MucipalityContactsService>(MucipalityContactsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
