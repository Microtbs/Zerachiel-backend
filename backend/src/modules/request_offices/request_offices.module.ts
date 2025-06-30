import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestOffice } from './entities/request_office.entity';
import { RequestOfficesService } from './request_offices.service';
import { RequestOfficesController } from './request_offices.controller';

import { Grave } from '../graves/entities/graves.entity';
import { Municipalities } from '../municipalities/entities/municipalities.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RequestOffice, Grave, Municipalities])],
  controllers: [RequestOfficesController],
  providers: [RequestOfficesService],
})
export class RequestOfficesModule {}
