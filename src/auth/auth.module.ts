import { Module } from '@nestjs/common';
import { JWTGuard } from './auth.guard';
import { JWTStrategy } from './auth.strategy';

@Module({
  imports: [],
  providers: [JWTGuard, JWTStrategy],
})
export class AuthModule {}
