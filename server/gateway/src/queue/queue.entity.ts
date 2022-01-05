import { Entity, Column, OneToMany } from "typeorm";
import { BaseEntity } from "../common/entities/base.entity";
import { QueueItem } from "../queue-item/queue-item.entity";

@Entity()
export class Queue extends BaseEntity {
  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  ownerId: number;

  @Column({ type: 'timestamp', nullable: true })
  expiresAt: Date;

  @Column({ nullable: true })
  maxVolume: number;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(type => QueueItem, item => item.queue)
  items: QueueItem[];
}