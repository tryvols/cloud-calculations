import { injectable, inject } from "inversify";
import { History$ } from "./history";
import { History } from "history";
import { QueryParamProvider } from "./query-param-provider";

type Params = 'page' | 'pageCount' | 'search';

@injectable()
export class QueryParams {
  @inject(History$)
  private readonly history!: History;

  private readonly query: URLSearchParams;

  private readonly _page: QueryParamProvider;
  private readonly _pageCount: QueryParamProvider;
  private readonly _search: QueryParamProvider;

  constructor() {
    this.query = new URLSearchParams();
    this._page = new QueryParamProvider('page', this.query, '0');
    this._pageCount = new QueryParamProvider('pageCount', this.query, '1');
    this._search = new QueryParamProvider('s', this.query, '');
  }

  get page(): QueryParamProvider {
    return this._page;
  }

  get pageCount(): QueryParamProvider {
    return this._pageCount;
  }

  get search(): QueryParamProvider {
    return this._search;
  }

  save(): void {
    this.history.push({
      pathname: this.history.location.pathname,
      search: this.query.toString(),
    });
  }

  reset(paramsList: Params[]): void {
    paramsList.forEach(param => this[param].reset());
    this.save();
  }
}