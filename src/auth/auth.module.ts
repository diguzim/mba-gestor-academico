// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { CryptoModule } from 'src/crypto/crypto.module';
import { ConfigModule } from '@nestjs/config';
import { envConfigRegistration, EnvConfig } from 'src/config/env.config';

@Module({
  imports: [
    UsersModule,
    CryptoModule,
    PassportModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [envConfigRegistration.KEY],
      useFactory: (config: EnvConfig) => ({
        secret: config.jwt.secret,
        signOptions: { expiresIn: '1h' },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
