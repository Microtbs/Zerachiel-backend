import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MunicipalityContact } from './entities/mucipality_contacts.entity';
import { MunicipalityContactsService } from './municipality_contacts.service';
import { MunicipalityContactsController } from './municipality_contacts.controller';

@Module({
  imports: [TypeOrmModule.forFeature([MunicipalityContact])],
  providers: [MunicipalityContactsService],
  controllers: [MunicipalityContactsController],
})
export class MunicipalityContactsModule { }
