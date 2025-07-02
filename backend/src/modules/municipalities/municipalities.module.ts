import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Municipality } from './entities/municipality.entity';
import { MunicipalitiesService } from './municipalities.service';
import { MunicipalitiesController } from './municipalities.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Municipality])],
  providers: [MunicipalitiesService],
  controllers: [MunicipalitiesController],
})
export class MunicipalitiesModule {}
