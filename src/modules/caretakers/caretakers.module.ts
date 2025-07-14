import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CaretakersService } from './caretakers.service';
import { CaretakersController } from './caretakers.controller';
import { Caretaker } from './entities/caretakers.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Caretaker])],
  controllers: [CaretakersController],
  providers: [CaretakersService],
})
export class CaretakersModule { }
