import { Module } from '@nestjs/common';
import { QueueItemService } from './queue-item.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QueueItem } from './queue-item.entity';
import { QueueItemController } from './queue-item.controller';

@Module({
  imports: [TypeOrmModule.forFeature([QueueItem])],
  providers: [QueueItemService],
  exports: [QueueItemService],
  controllers: [QueueItemController],
})
export class QueueItemModule {}
