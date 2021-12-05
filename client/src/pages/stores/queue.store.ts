import { injectable, inject } from "inversify";
import { QueuePayload } from "../../common/api/types";
import { observable, computed, action } from "mobx";
import { QueueApi } from "../../common/api/entities/queue-api";
import { UserStore } from "../../common/auth/user.store";

@injectable()
export class QueueStore {
  @inject(QueueApi)
  private readonly queueApi!: QueueApi;
  @inject(UserStore)
  private readonly userStore!: UserStore;

  @observable
  private _queue?: QueuePayload;

  @computed
  get queue(): QueuePayload | undefined {
    return this._queue;
  }
  
  @action
  async load(id: number): Promise<void> {
    this._queue = await this.queueApi.getQueue(id);
  }
  
  @computed
  get hasUser(): boolean {
    const userId = this.userStore?.user?.id || 0;
    return Boolean(this._queue?.items?.some(item => item.user.id === userId));
  }
}