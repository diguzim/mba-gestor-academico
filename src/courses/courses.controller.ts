import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateCourseDto } from './dto/create-course.dto';
import { CoursesService } from './courses.service';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserRole } from 'src/users/enums/role.enum';

@Controller('courses')
export class CoursesController {
  constructor(private readonly courseService: CoursesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @Roles(UserRole.Admin)
  create(@Body() dto: CreateCourseDto, @Req() req) {
    console.log('🚀 ~ CoursesController ~ create ~ dto:', dto);
    console.log('🚀 ~ CoursesController ~ create ~ req.user:', req.user);

    // Tem algo de errado aqui
    // Da pra ver que o usuário está assim:

    // 🚀 ~ CoursesController ~ create ~ req.user: {
    //  userId: 'cf30c165-08f6-44d1-a344-fcc405190292',
    //  email: 'admin@gmail.com',
    //  role: 'admin'
    // }

    // sendo que a minha Entity é diferente (é id ao invés de userId, e está faltando o name)

    return this.courseService.create(dto, req.user);
  }
}
