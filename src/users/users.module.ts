import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { HashService } from 'src/common/services/hash.service';
import { BcryptHashStrategy } from 'src/common/strategies/bcrypt-hash.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    UsersService,
    HashService,
    {
      provide: 'HASH_STRATEGY',
      useClass: BcryptHashStrategy,
    },
  ],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
