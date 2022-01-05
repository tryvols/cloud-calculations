import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormConfig } from './config';
import { UniqueValidator } from './common/validators/unique.validator';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { QueueModule } from './queue/queue.module';
import { QueueItemModule } from './queue-item/queue-item.module';
import { ScheduleModule } from '@nestjs/schedule';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './common/guards/authorization.guard';
import { ConfigService } from './config/config.service';
import { ClientProxyFactory } from "@nestjs/microservices";

@Module({
    imports: [
        TypeOrmModule.forRoot(ormConfig),
        ScheduleModule.forRoot(),
        UsersModule,
        AuthModule,
        QueueModule,
        QueueItemModule,
    ],
    providers: [
        ConfigService,
        UniqueValidator,
        {
            provide: 'TOKEN_SERVICE',
            useFactory: (configService: ConfigService) => {
                const tokenServiceOptions = configService.get('tokenService');
                return ClientProxyFactory.create(tokenServiceOptions);
            },
            inject: [ConfigService],
        },
        {
            provide: APP_GUARD,
            useClass: AuthGuard,
        }
    ]
})
export class AppModule {}
