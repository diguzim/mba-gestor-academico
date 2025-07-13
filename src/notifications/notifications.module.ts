import { Module } from '@nestjs/common';
import { EnrollmentCreatedListener } from './enrollment-created.listener';

@Module({
  providers: [EnrollmentCreatedListener],
})
export class NotificationsModule {}
