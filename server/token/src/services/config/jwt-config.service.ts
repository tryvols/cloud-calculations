import { JwtOptionsFactory, JwtModuleOptions } from '@nestjs/jwt';
import { randomBytes } from 'crypto';

export class JwtConfigService implements JwtOptionsFactory {
  createJwtOptions(): JwtModuleOptions {
    return {
      secret: randomBytes(256).toString('base64')
    };
  }
}
