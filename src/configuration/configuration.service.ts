import { Injectable } from '@nestjs/common';
import IORedis from 'ioredis';

@Injectable()
export class ConfigurationService {
  get redis(): IORedis {
    const redis = new IORedis({
      host: 'localhost',
      port: '6379',
      password: '',
    } as any) as any;

    return redis;
  }
}
