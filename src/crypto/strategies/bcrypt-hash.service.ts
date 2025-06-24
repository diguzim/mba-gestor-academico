import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { HashStrategy } from '../../crypto/interfaces/hash-strategy.interface';

@Injectable()
export class BcryptHashStrategy implements HashStrategy {
  private readonly saltRounds = 10;

  async hash(payload: string): Promise<string> {
    const salt = await bcrypt.genSalt(this.saltRounds);
    return bcrypt.hash(payload, salt);
  }

  async compare(raw: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(raw, hashed);
  }
}
