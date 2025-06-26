import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DigitalFlowers } from './entities/digital-flowers.entity';
import { DigitalFlowersService } from './digital-flowers.service';
import { DigitalFlowersController } from './digital-flowers.controller';

@Module({
  imports: [TypeOrmModule.forFeature([DigitalFlowers])],
  providers: [DigitalFlowersService],
  controllers: [DigitalFlowersController],
})
export class DigitalFlowersModule {}
