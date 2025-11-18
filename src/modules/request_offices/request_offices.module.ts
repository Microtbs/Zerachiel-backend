import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestOffice } from './entities/request_office.entity';
import { RequestOfficesService } from './request_offices.service';
import { RequestOfficesController } from './request_offices.controller';

import { Municipality } from '../municipalities/entities/municipality.entity';

/**
 * Modulo che mette a disposizione gli uffici comunali e gestisce le loro relazioni.
 */
@Module({
  imports: [TypeOrmModule.forFeature([RequestOffice, Municipality])],
  controllers: [RequestOfficesController],
  providers: [RequestOfficesService],
})
export class RequestOfficesModule {}
