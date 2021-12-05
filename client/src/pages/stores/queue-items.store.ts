import { injectable, inject } from "inversify";
import { observable, computed, action } from "mobx";
import { QueueItem } from "../../common/api/types";
import { Pagination } from "../../common/navigation/pagination";
import { QueueApi } from "../../common/api/entities/queue-api";
import { QueryParams } from "../../common/navigation/query-params";

@injectable()
export class QueueItemsStore {
  @inject(Pagination)
  private readonly pagination!: Pagination;
  @inject(QueueApi)
  private readonly queueApi!: QueueApi;
  @inject(QueryParams)
  private readonly queryParams!: QueryParams;

  @observable
  private _items: QueueItem[] = [];
  @observable
  private _count?: number;

  @computed
  get items(): QueueItem[] {
    return this._items;
  }

  get count(): number | undefined {
    return this._count;
  }

  @action
  reset = async (queueId: number): Promise<void> => {
    this.pagination.reset();
    this._items = [];
    await this.load(queueId);
  }

  load = async (queueId: number): Promise<void> => {
    const request = this.pagination.paginate('', async (page) => {
      const data = await this.queueApi.getQueueItems(queueId, page);
      this.setItems(data.data);
      this.setCount(data.total);
      return data;
    });
    await request();
  }

  @action
  private setItems(items: QueueItem[]): void {
    console.log(items);
    this._items = this.queryParams.page.get() !== '1'
     ? this._items.concat(items)
     : items;
  }

  @action
  private setCount(count: number): void {
    this._count = count;
  }
}
