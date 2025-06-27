import { Course } from 'src/courses/course.entity';
import { User } from 'src/users/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Enrollment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.enrollments, { eager: true })
  student: User;

  @ManyToOne(() => Course, (course) => course.enrollments, { eager: true })
  course: Course;

  @CreateDateColumn()
  createdAt: Date;
}
