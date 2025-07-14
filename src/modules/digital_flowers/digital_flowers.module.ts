import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DigitalFlowers } from './entities/digital_flower.entity';
import { DigitalFlowersService } from './digital_flowers.service';
import { DigitalFlowersController } from './digital_flowers.controller';

@Module({
  imports: [TypeOrmModule.forFeature([DigitalFlowers])],
  providers: [DigitalFlowersService],
  controllers: [DigitalFlowersController],
})
export class DigitalFlowersModule {}
