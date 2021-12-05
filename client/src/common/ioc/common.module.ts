import { ContainerModule } from "inversify";
import { AxiosInstance } from "axios";
import { api, API$ } from "../api";
import { history, History$ } from "../navigation/history";
import { UserStore } from "../auth/user.store";
import { QueryParams } from "../navigation/query-params";
import { Pagination } from "../navigation/pagination";
import { UserApi } from "../api/entities/user-api";
import { QueueApi } from "../api/entities/queue-api";

export const commonModule = new ContainerModule(bind => {
  bind<AxiosInstance>(API$).toConstantValue(api);
  bind(History$).toConstantValue(history);
  bind(UserStore).toSelf().inSingletonScope();
  bind(QueryParams).toSelf().inSingletonScope();
  bind(Pagination).toSelf().inSingletonScope();
  bind(UserApi).toSelf().inSingletonScope();
  bind(QueueApi).toSelf().inSingletonScope();
});
