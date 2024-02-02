import { Module } from '@nestjs/common';
import { JWTAdminGuard } from './admin.guard';
import { JWTGuard } from './auth.guard';
import { JWTStrategy } from './auth.strategy';

@Module({
  imports: [],
  providers: [JWTGuard, JWTAdminGuard, JWTStrategy],
})
export class AuthModule {}
