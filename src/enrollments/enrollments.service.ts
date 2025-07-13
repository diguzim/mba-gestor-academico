import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Enrollment } from './enrollment.entity';
import { Repository } from 'typeorm';
import { Course } from 'src/courses/course.entity';
import { User } from 'src/users/user.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { EnrollmentCreatedEvent } from './events/enrollment-created.event';

@Injectable()
export class EnrollmentsService {
  constructor(
    @InjectRepository(Enrollment)
    private enrollmentRepository: Repository<Enrollment>,
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private eventEmitter: EventEmitter2,
  ) {}

  async enroll(courseId: string, userId: string): Promise<Enrollment> {
    const course = await this.courseRepository.findOne({
      where: { id: courseId },
    });
    if (!course) throw new NotFoundException('Curso não encontrado');

    const student = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (!student) throw new NotFoundException('Usuário não encontrado');

    const existing = await this.enrollmentRepository.findOne({
      where: { course: { id: courseId }, student: { id: userId } },
    });

    if (existing)
      throw new ConflictException('Usuário já matriculado nesse curso');

    const enrollment = this.enrollmentRepository.create({
      course,
      student,
    });

    const savedEnrollment = await this.enrollmentRepository.save(enrollment);

    const enrollmentCreatedEvent = new EnrollmentCreatedEvent();
    enrollmentCreatedEvent.enrollmentId = savedEnrollment.id;
    enrollmentCreatedEvent.courseId = courseId;
    enrollmentCreatedEvent.studentId = userId;
    enrollmentCreatedEvent.createdAt = new Date();

    this.eventEmitter.emit('enrollment.created', enrollmentCreatedEvent);

    return savedEnrollment;
  }
}
