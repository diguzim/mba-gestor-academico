// src/crypto/crypto.module.ts
import { Module } from '@nestjs/common';
import { HashService } from './hash.service';
import { BcryptHashStrategy } from './strategies/bcrypt-hash.service';

@Module({
  providers: [
    HashService,
    {
      provide: 'HASH_STRATEGY',
      useClass: BcryptHashStrategy,
    },
  ],
  exports: [HashService],
})
export class CryptoModule {}
