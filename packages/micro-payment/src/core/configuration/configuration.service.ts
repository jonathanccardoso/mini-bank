import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ConfigurationService {
  constructor(readonly configService: ConfigService) {}

  get(key: string) {
    return this.configService.get(key);
  }
}
