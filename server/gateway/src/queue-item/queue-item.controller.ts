import { Controller } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { Authorization } from 'src/common/decorators/authorization.decorator';
import { QueueItem } from './queue-item.entity';
import { QueueItemService } from './queue-item.service';

@Crud({
  model: {
    type: QueueItem,
  },
  query: {
    join: {
      user: {
        eager: false,
      },
      queue: {
        eager: false,
      },
    },
    sort: [
      {
        field: 'priority',
        order: 'ASC',
      },
    ],
    alwaysPaginate: true,
    limit: 25,
    maxLimit: 25,
  },
  routes: {
    only: ['getManyBase'],
  },
})
@Authorization(true)
@Controller('queue-items')
export class QueueItemController {
  constructor(public readonly service: QueueItemService) {}
}
