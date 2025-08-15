import { Injectable, Inject } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtUser } from '../interfaces/jwt-user.interface';
import { envConfigRegistration, EnvConfig } from 'src/config/env.config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject(envConfigRegistration.KEY) config: EnvConfig) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.jwt.secret,
    });
  }

  async validate(payload: any): Promise<JwtUser> {
    return { id: payload.sub, email: payload.email, role: payload.role };
  }
}
