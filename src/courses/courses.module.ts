import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Course } from './course.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Course])],
  providers: [CoursesService],
  controllers: [CoursesController],
})
export class CoursesModule {}
