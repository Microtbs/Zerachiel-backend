import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Municipalities } from './entities/municipalities.entity';
import { MunicipalitiesService } from './municipality.service';
import { MunicipalitiesController } from './municipality.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Municipalities])],
  providers: [MunicipalitiesService],
  controllers: [MunicipalitiesController],
})
export class MunicipalityModule {}
