import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RequestsService } from './requests.service';
import { RequestsController } from './requests.controller';

import { Request } from './entities/request.entity';
import { User } from '../users/entities/user.entity';
import { RequestOffice } from '../request_offices/entities/request_office.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Request, User, RequestOffice])],
  controllers: [RequestsController],
  providers: [RequestsService],
})
export class RequestsModule {}
