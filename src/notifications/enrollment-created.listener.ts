import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { EnrollmentCreatedEvent } from 'src/enrollments/events/enrollment-created.event';

@Injectable()
export class EnrollmentCreatedListener {
  @OnEvent('enrollment.created')
  async handleEnrollmentCreatedEvent(
    event: EnrollmentCreatedEvent,
  ): Promise<void> {
    const { enrollmentId, studentId, courseId } = event;

    // This could be replaced with actual email notification logic
    console.log(
      `Usuário ${studentId} se matriculou no curso ${courseId}. Notificando o professor...`,
    );
  }
}
