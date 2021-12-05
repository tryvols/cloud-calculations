import { injectable, inject } from "inversify";
import { API$ } from "..";
import { AxiosInstance } from "axios";
import { CreateQueueDataScheme } from "../../../pages/common/queues/create-queue/create-queue-dataset";
import { UpdateQueueDataScheme } from "../../../pages/common/queues/update-queue/update-queue-dataset";
import { PaginationWrapper, QueuePayload, QueueItem } from '../types';
import { UserStore } from "../../auth/user.store";

type QueuesListRequest = (search: string, page: number) => Promise<PaginationWrapper<QueuePayload>>;

@injectable()
export class QueueApi {
  @inject(API$)
  private readonly api!: AxiosInstance;
  @inject(UserStore)
  private readonly userStore!: UserStore;

  readonly getCreatedByUser: QueuesListRequest = async (search, page) => {
    const filter = [`ownerId||$eq||${await this.userId()}`];
    search && filter.push(`name||$cont||${search}`);

    const { data } = await this.api.get('queues', {
      params: { filter, page },
    });
    return data;
  }

  readonly getInWhichUserIsStanding: QueuesListRequest = async (search, page) => {
    const join = ['items', 'items.user'];
    const filter = [
      'isActive||$eq||true',
      `items.user.id||$eq||${await this.userId()}`,
    ];
    search && filter.push(`name||$cont||${search}`);

    const { data } = await this.api.get('queues', {
      params: { filter, page, join },
    });
    return data;
  }

  readonly getActiveQueues: QueuesListRequest = async (search, page) => {
    const filter = ['isActive||$eq||true'];
    search && filter.push(`name||$cont||${search}`);

    const { data } = await this.api.get('queues', {
      params: { filter, page },
    });

    return data;
  }

  readonly getQueue = async (queueId: number): Promise<QueuePayload> => {
    const join = ['items', 'items.user'];
    const { data } = await this.api.get(`queues/${queueId}`, {
      params: { join },
    });
    return data;
  }

  readonly enterQueue = async (queueId: number): Promise<void> => {
    await this.api.post(`queues/${queueId}/enter`);
  }

  readonly leaveQueue = async (queueId: number): Promise<void> => {
    await this.api.post(`queues/${queueId}/leave`);
  }

  readonly create = async (data: CreateQueueDataScheme): Promise<void> => {
    await this.api.post('queues', data);
  }

  readonly update = async (id: number, data: UpdateQueueDataScheme): Promise<void> => {
    await this.api.patch(`queues/${id}`, data);
  }

  readonly delete = async (id: number): Promise<void> => {
    await this.api.delete(`queues/${id}`);
  }

  // Queue items
  readonly getQueueItems = async (queueId: number, page: number): Promise<PaginationWrapper<QueueItem>> => {
    const join = ['user'];
    const filter = [`queue||$eq||${queueId}`];
    const { data } = await this.api.get(`queue-items`, {
      params: { join, filter, page },
    });
    return data;
  }

  private readonly userId = async (): Promise<number> => {
    return (await this.userStore.get()).id;
  }
}
