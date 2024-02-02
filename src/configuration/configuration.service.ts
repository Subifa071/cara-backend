import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import IORedis from 'ioredis';

@Injectable()
export class ConfigurationService {
  constructor(private readonly configService: ConfigService) {}
  get redis(): IORedis {
    const redis = new IORedis({
      host: 'localhost',
      port: '6379',
      password: '',
    } as any) as any;

    return redis;
  }

  get encryptedKey(): string {
    return this.configService.get<string>('ENCRYPT_KEY');
  }

  get mailgunCreds(): Record<string, string> {
    return {
      username: this.configService.get<string>('MAILGUN_USERNAME'),
      key: this.configService.get<string>('MAILGUN_KEY'),
      from: this.configService.get<string>('MAILGUN_FROM'),
    };
  }
}
