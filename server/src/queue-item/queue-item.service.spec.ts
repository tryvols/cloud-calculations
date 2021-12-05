import { Test, TestingModule } from '@nestjs/testing';
import { QueueItemService } from './queue-item.service';

describe('QueueItemService', () => {
  let service: QueueItemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QueueItemService],
    }).compile();

    service = module.get<QueueItemService>(QueueItemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
