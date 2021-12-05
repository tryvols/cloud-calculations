import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormConfig } from './config';
import { UniqueValidator } from './common/validators/unique.validator';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { QueueModule } from './queue/queue.module';
import { QueueItemModule } from './queue-item/queue-item.module';
import { ScheduleModule } from '@nestjs/schedule';

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
        UniqueValidator,
    ],
})
export class AppModule {}
