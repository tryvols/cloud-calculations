import {
  Controller,
  Post,
  Param,
  BadRequestException,
  Req
} from '@nestjs/common';
import { Crud, CrudRequest, CrudController, Override, ParsedRequest, ParsedBody } from '@nestjsx/crud';
import { Queue } from './queue.entity';
import { QueueService } from './queue.service';
import { CreateQueueDto } from './dto/create-queue.dto';
import { UpdateQueueDto } from './dto/update-queue.dto';
import { ReplaceQueueDto } from './dto/replace-queue.dto';
import { Authorization } from 'src/common/decorators/authorization.decorator';

@Crud({
  model: {
    type: Queue,
  },
  query: {
    join: {
      items: {
        eager: false,
      },
      ['items.user']: {
        eager: false,
      },
    },
    alwaysPaginate: true,
    limit: 25,
    maxLimit: 25,
  },
  dto: {
    create: CreateQueueDto,
    update: UpdateQueueDto,
    replace: ReplaceQueueDto,
  },
})
@Authorization(true)
@Controller('queues')
export class QueueController implements CrudController<Queue> {
  constructor(public readonly service: QueueService) {}

  get base(): CrudController<Queue> {
    return this;
  }

  @Override()
  createOne(
    @Req() req: any,
    @ParsedRequest() crudReq: CrudRequest,
    @ParsedBody() dto: CreateQueueDto & { ownerId?: number },
  ) {
    dto.ownerId = req.user.id;
    // @ts-ignore
    return this.base.createOneBase(crudReq, dto);
  }

  @Override()
  async updateOne(
    @Req() req: any,
    @Param('id') queueId: number,
    @ParsedRequest() crudReq: CrudRequest,
    @ParsedBody() dto: UpdateQueueDto,
  ) {
    const queue = await this.service.findOne(queueId);
    if (!queue) {
      throw new BadRequestException(`Queue with ${queueId} does not exists.`);
    }
    if (req.user.id !== queue.ownerId) {
      throw new BadRequestException(`You must be owner of the queue to update it.`);
    }
    // @ts-ignore
    return this.base.updateOneBase(crudReq, dto);
  }

  @Override()
  async deleteOne(
    @Req() req: any,
    @Param('id') queueId: number,
    @ParsedRequest() crudReq: CrudRequest,
  ) {
    const queue = await this.service.findOne(queueId);
    if (!queue) {
      throw new BadRequestException(`Queue with ${queueId} does not exists.`);
    }
    if (req.user.id !== queue.ownerId) {
      throw new BadRequestException(`You must be owner of the queue to delete it.`);
    }
    this.service.clearQueueItems(queue);
    // @ts-ignore
    return this.base.deleteOneBase(crudReq);
  }

  @Post(':queueId/enter')
  async enterQueue(
    @Param('queueId') queueId: number,
    @Req() req,
  ) {
    const queue = await this.service.findOne(queueId);
    if (!queue) {
      throw new BadRequestException(`Queue with ${queueId} does not exists.`);
    }

    return await this.service.addUser(queue, req.user);
  }

  @Post(':queueId/leave')
  async leaveQueue(
    @Param('queueId') queueId: number,
    @Req() req,
  ) {
    const queue = await this.service.findOne(queueId);
    if (!queue) {
      throw new BadRequestException(`Queue with ${queueId} does not exists.`);
    }

    return await this.service.removeUser(queue, req.user);
  }
}
