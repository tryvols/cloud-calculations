import { ContainerModule } from "inversify";
import { QueueStore } from "./queue.store";
import { QueuesStore } from "./queues.store";
import { QueueItemsStore } from "./queue-items.store";

export const pagesStoresModule = new ContainerModule(bind => {
  bind(QueueStore).toSelf().inSingletonScope();
  bind(QueuesStore).toSelf().inSingletonScope();
  bind(QueueItemsStore).toSelf().inSingletonScope();
});