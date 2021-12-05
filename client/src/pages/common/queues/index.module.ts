import { ContainerModule } from 'inversify';
import { CreateQueueDataset$, createQueueDataset } from './create-queue/create-queue-dataset';
import { UpdateQueueDataset$, updateQueueDataset } from './update-queue/update-queue-dataset';

export const queuesModule = new ContainerModule(bind => {
  bind(CreateQueueDataset$).toConstantValue(createQueueDataset);
  bind(UpdateQueueDataset$).toConstantValue(updateQueueDataset);
});
