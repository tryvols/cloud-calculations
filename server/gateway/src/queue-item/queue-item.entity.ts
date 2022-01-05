import { BaseEntity } from "../common/entities/base.entity";
import { Entity, Column, ManyToOne } from "typeorm";
import { User } from "../users/user.entity";
import { Queue } from "../queue/queue.entity";

@Entity()
export class QueueItem extends BaseEntity {
  @Column()
  priority: number;

  @ManyToOne(type => User, user => user.queueItems)
  user: User;

  @ManyToOne(type => Queue, queue => queue.items)
  queue: Queue;
}