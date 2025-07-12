import { Module } from '@nestjs/common';
import { EnrollmentsService } from './enrollments.service';
import { EnrollmentsController } from './enrollments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Course } from 'src/courses/course.entity';
import { Enrollment } from './enrollment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Course, Enrollment])],
  providers: [EnrollmentsService],
  controllers: [EnrollmentsController],
})
export class EnrollmentsModule {}
