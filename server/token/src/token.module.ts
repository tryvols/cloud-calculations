import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenController } from './token.controller';
import { TokenService } from './services/token.service';
import { JwtConfigService } from './services/config/jwt-config.service';
import { TypeOrmConfigService } from './services/config/typeorm-config.service';
import { Token } from './entities/token.entity';

@Module({
  imports: [
    JwtModule.registerAsync({
      useClass: JwtConfigService,
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService
    }),
    TypeOrmModule.forFeature([Token])
  ],
  controllers: [TokenController],
  providers: [TokenService],
})
export class TokenModule {}
