import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { Queue } from './queue.entity';
import { Repository, LessThan } from 'typeorm';
import { QueueItemService } from 'src/queue-item/queue-item.service';
import { User } from 'src/users/user.entity';
import { QueueItem } from 'src/queue-item/queue-item.entity';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class QueueService extends TypeOrmCrudService<Queue> {
  constructor(
    @InjectRepository(Queue) queueRepository: Repository<Queue>,
    private readonly queueItemService: QueueItemService,
  ) {
    super(queueRepository);
    this.initQueues();
  }

  async initQueues(): Promise<void> {
    const queues = this.repo.create([{
      name: 'queue 1',
      address: 'street 1',
      ownerId: 1,
      expiresAt: new Date().toISOString(),
    }, {
      name: 'queue 2',
      address: 'street 2',
      ownerId: 2,
    }, {
      name: 'queue 3',
      address: 'street 3',
      ownerId: 3,
    }]);
    await this.repo.save(queues);
  }

  @Cron('45 * * * * *')
  async disactiveQueues() {
    const queues = await this.repo.find({
      where: {
        expiresAt: LessThan(new Date().toISOString()),
        isActive: true,
      }
    });
    queues.forEach(queue => queue.isActive = false);
    await this.repo.save(queues);
  }

  async clearQueueItems(queue: Queue): Promise<void> {
    await this.queueItemService.clearAllByQueue(queue);
  }

  async addUser(queue: Queue, user: User): Promise<QueueItem> {
    if (!queue.isActive) {
      throw new BadRequestException('You can`t enter into intactive queue.');
    }
    if (await this.queueItemService.exists(queue, user)) {
      throw new BadRequestException('User already exists in queue.');
    }
    const count = await this.queueItemService.count({ queue });
    if (queue.maxVolume && count >= queue.maxVolume) {
      throw new BadRequestException('Queue is full.');
    }
    return await this.queueItemService.addItem(queue, user);
  }

  async removeUser(queue: Queue, user: User): Promise<QueueItem> {
    if (!queue.isActive) {
      throw new BadRequestException('You can`t enter into intactive queue.');
    }
    if (await this.queueItemService.exists(queue, user)) {
      return await this.queueItemService.removeItem(queue, user);
    }
    throw new BadRequestException('User didn`t already register');
  }
}
