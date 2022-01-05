import { Module } from '@nestjs/common';
import { ClientProxyFactory } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { ConfigService } from 'src/config/config.service';

@Module({
  imports: [UsersModule],
  providers: [
    ConfigService,
    AuthService,
    {
      provide: 'TOKEN_SERVICE',
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create(configService.get('tokenService'));
      },
      inject: [ConfigService],
    }
  ],
  exports: [],
  controllers: [AuthController],
})
export class AuthModule {}
