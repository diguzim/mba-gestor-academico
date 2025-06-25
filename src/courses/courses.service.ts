import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './course.entity';
import { JwtUser } from 'src/auth/interfaces/jwt-user.interface';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) {}

  async create(createCourseDto: CreateCourseDto, jwtUser: JwtUser) {
    const course = this.courseRepository.create({
      ...createCourseDto,
      createdBy: { id: jwtUser.id },
    });
    return this.courseRepository.save(course);
  }
}
