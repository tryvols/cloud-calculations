import { Module } from '@nestjs/common';
import { QueueController } from './queue.controller';
import { QueueService } from './queue.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Queue } from './queue.entity';
import { UsersModule } from 'src/users/users.module';
import { QueueItemModule } from 'src/queue-item/queue-item.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Queue]),
    UsersModule,
    QueueItemModule
  ],
  controllers: [QueueController],
  providers: [QueueService],
  exports: [QueueService],
})
export class QueueModule {}
