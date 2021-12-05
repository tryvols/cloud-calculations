import { injectable, inject } from "inversify";
import { QueryParams } from "./query-params";

type PaginationData = Readonly<{
  page: number;
  pageCount: number;
}>;
type Request = (page: number, searchString?: string) => Promise<PaginationData>;
type Callback = () => Promise<void>;

@injectable()
export class Pagination {
  @inject(QueryParams)
  private readonly params!: QueryParams;

  reset(): void {
    this.params.reset(['page', 'pageCount']);
  }

  paginate(searchString: string, callback: Request): Callback {
    return async (): Promise<void> => {
      const { page, pageCount } = this.checkSearchString(searchString);
      const nextPage = page + 1;
      if (page < pageCount) {
        const paginationData = await callback(nextPage, searchString);
        this.set(paginationData);
        this.params.save();
      }
    }
  }

  hasMorePages(): boolean {
    const { page, pageCount } = this.get();
    return page < pageCount;
  }

  private set({ page, pageCount }: PaginationData): void {
    this.params.page.set(`${page}`);
    this.params.pageCount.set(`${pageCount}`);
  }

  private get(): PaginationData {
    return {
      page: +this.params.page.get(),
      pageCount: +this.params.pageCount.get(),
    };
  }

  private checkSearchString = (searchString: string): PaginationData => {
    if (searchString !== this.params.search.get()) {
      this.params.search.set(searchString);
      this.reset();
    }
    return this.get();
  }
}
