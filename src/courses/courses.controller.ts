import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateCourseDto } from './dto/create-course.dto';
import { CoursesService } from './courses.service';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserRole } from 'src/users/enums/role.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('courses')
export class CoursesController {
  constructor(private readonly courseService: CoursesService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.Admin)
  @Post()
  create(@Body() dto: CreateCourseDto, @Req() req) {
    return this.courseService.create(dto, req.user);
  }
}
