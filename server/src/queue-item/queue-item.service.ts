import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { QueueItem } from './queue-item.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Queue } from '../queue/queue.entity';
import { User } from '../users/user.entity';

@Injectable()
export class QueueItemService extends TypeOrmCrudService<QueueItem> {
  constructor(
    @InjectRepository(QueueItem) queueItemsRepository: Repository<QueueItem>,
  ) {
    super(queueItemsRepository);
  }

  async clearAllByQueue(queue: Queue): Promise<void> {
    this.repo.delete({ queue });
  }
  
  async addItem(queue: Queue, user: User): Promise<QueueItem> {
    const lastItem = await this.lastItem(queue);
    const priority = (lastItem?.priority || 0) + 1;
    const item = await this.repo.create({ queue, user, priority });
    return await this.repo.save(item);
  }

  async removeItem(queue: Queue, user: User): Promise<QueueItem> {
    const item = await this.repo.findOne({ queue, user });
    return await this.repo.remove(item);
  }

  async lastItem(queue: Queue): Promise<QueueItem> {
    return await this.repo.createQueryBuilder('queue_item')
      .leftJoinAndSelect('queue_item.queue', 'queue')
      .select('MAX(queue_item.priority)', 'max')
      .where('queue.id = :id', { id: queue.id })
      .getRawOne() as QueueItem;
  }

  async exists(queue: Queue, user: User): Promise<boolean> {
    return !!(await this.repo.findOne({ queue, user }));
  }
}
