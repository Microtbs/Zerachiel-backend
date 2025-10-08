import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DigitalFlower } from './entities/digital_flower.entity';
import { DigitalFlowersService } from './digital_flowers.service';
import { DigitalFlowersController } from './digital_flowers.controller';

@Module({
  imports: [TypeOrmModule.forFeature([DigitalFlower])],
  providers: [DigitalFlowersService],
  controllers: [DigitalFlowersController],
})
export class DigitalFlowersModule {}
