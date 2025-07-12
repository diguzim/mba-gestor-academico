import { Controller, Param, Post, Req, UseGuards } from '@nestjs/common';
import { EnrollmentsService } from './enrollments.service';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserRole } from 'src/users/enums/role.enum';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('enrollments')
export class EnrollmentsController {
  constructor(private readonly enrollmentsService: EnrollmentsService) {}

  @Post(':courseId')
  @UseGuards(JwtAuthGuard)
  @Roles(UserRole.Student)
  async enroll(@Param('courseId') courseId: string, @Req() req: any) {
    const user = req.user;
    return this.enrollmentsService.enroll(courseId, user.userId);
  }
}
