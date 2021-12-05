import { injectable, inject } from "inversify";
import { observable, computed, action } from "mobx";
import { QueuePayload, PaginationWrapper } from "../../common/api/types";
import { QueryParams } from "../../common/navigation/query-params";
import { ApiUtils } from '../../common/api/utils';
import { Pagination } from '../../common/navigation/pagination';

type ItemsRequest = (page: number) => Promise<PaginationWrapper<QueuePayload>>;

@injectable()
export class QueuesStore {
  @inject(QueryParams)
  private readonly params!: QueryParams;
  @inject(Pagination)
  private readonly pagination!: Pagination;

  @observable
  private _queues: QueuePayload[] = [];

  @computed
  get queues(): QueuePayload[] {
    return this._queues;
  }

  processRequest = (search: string, request: ItemsRequest): void => {
    ApiUtils.processRequest(this.pagination.paginate(search, async (page) => {
      const data = await request(page);
      this.setQueues(data.data);
      return data;
    }));
  }

  @action
  reset = async (request: () => void): Promise<void> => {
    this.pagination.reset();
    this._queues = [];
    await request();
  }

  @action
  private setQueues(queues: QueuePayload[]): void {
    this._queues = this.params.page.get() !== '1'
     ? this._queues.concat(queues)
     : queues;
  }
}