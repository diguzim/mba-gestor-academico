import {
  Injectable,
  ConflictException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from './user.entity';
import { HashService } from 'src/crypto/hash.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly hashService: HashService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const { email, password, name } = createUserDto;

    const userExists = await this.usersRepository.findOne({ where: { email } });
    if (userExists) {
      throw new ConflictException('Email is already registered');
    }

    const hashedPassword = await this.hashService.hash(password);

    const user = this.usersRepository.create({
      email,
      name,
      password: hashedPassword,
    });

    const savedUser = await this.usersRepository.save(user);

    return {
      message: 'User successfully registered',
      user: {
        id: savedUser.id,
        name: savedUser.name,
        email: savedUser.email,
      },
    };
  }

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    const user = await this.usersRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const passwordMatches = await this.hashService.compare(
      password,
      user.password,
    );
    if (!passwordMatches) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return {
      message: 'Login successful',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }
}
