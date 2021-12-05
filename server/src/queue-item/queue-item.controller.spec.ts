import { Test, TestingModule } from '@nestjs/testing';
import { QueueItemController } from './queue-item.controller';

describe('QueueItem Controller', () => {
  let controller: QueueItemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QueueItemController],
    }).compile();

    controller = module.get<QueueItemController>(QueueItemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
