import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FeedbacksService } from './feedbacks.service';
import { FeedbacksController } from './feedbacks.controller';

import { Feedback } from './entities/feedback.entity';
import { User } from '../users/entities/user.entity';
import { RequestOffice } from '../request_offices/entities/request_office.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Feedback, User, RequestOffice])],
  controllers: [FeedbacksController],
  providers: [FeedbacksService],
})
export class FeedbacksModule {}
