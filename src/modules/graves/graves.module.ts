import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Grave } from './entities/grave.entity';
import { GravesController } from './graves.controller';
import { GravesService } from './graves.service';

/**
 * Modulo che aggrega controller e servizio legati alle tombe.
 */
@Module({
  imports: [TypeOrmModule.forFeature([Grave])],
  controllers: [GravesController],
  providers: [GravesService],
})
export class GravesModule {}
