import { Inject, Injectable } from '@nestjs/common';
import { HashStrategy } from './interfaces/hash-strategy.interface';

@Injectable()
export class HashService {
  constructor(
    @Inject('HASH_STRATEGY')
    private readonly hashStrategy: HashStrategy,
  ) {}

  hash(payload: string): Promise<string> {
    return this.hashStrategy.hash(payload);
  }

  compare(raw: string, hashed: string): Promise<boolean> {
    return this.hashStrategy.compare(raw, hashed);
  }
}
