import { Module } from '@nestjs/common';
import { DeceasedService } from './deceased.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeceasedController } from './deceased.controller';
import { Deceased } from './entities/deceased.entity';

/**
 * Modulo dedicato alle anagrafiche dei defunti.
 */
@Module({
  imports: [TypeOrmModule.forFeature([Deceased])],
  controllers: [DeceasedController],
  providers: [DeceasedService],
})
export class DeceasedModule {}
