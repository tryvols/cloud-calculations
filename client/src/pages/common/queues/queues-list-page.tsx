import React, { FC } from "react";
import { SearchField } from "../../../common/components/form-fields/search-field";
import { PageTemplate } from "../page-template";
import { QueuesPage } from "../queues-page";
import { QueryParams } from "../../../common/navigation/query-params";
import { useInject } from "../../../common/ioc/ioc-provider";
import { useOnMount } from "../../../common/hooks/use-on-mount";
import { usePagination } from "../../../common/navigation/use-pagination";
import { QueuesStore } from "../../stores/queues.store";
import { useObserver } from "mobx-react";
import { QueuePayload, PaginationWrapper } from "../../../common/api/types";

export type QueuesListCallback = (
  searchString: string,
  page: number,
) => Promise<PaginationWrapper<QueuePayload>>;

type QueuesListProps = Readonly<{
  title: string;
  query: QueuesListCallback;
  editable?: boolean;
}>;

export const QueuesListPage: FC<QueuesListProps> = ({ query, editable, title }) => {
  const queuesStore = useInject(QueuesStore);
  const params = useInject(QueryParams);
  const pagination = usePagination();
  const searchString = params.search.get();

  const loadQueues = (searchString: string): void => {
    queuesStore.processRequest(searchString, async (page) => {
      return await query(searchString, page);
    });
  }

  const resetQueues = (search?: string): void => {
    const s = search == null ? searchString : search;
    queuesStore.reset(() => loadQueues(s));
  }

  useOnMount(resetQueues);

  const search = (
    <SearchField
      defaultValue={searchString}
      onSubmit={resetQueues}
    />
  );

  return useObserver(() =>(
    <PageTemplate title={title}>
      <QueuesPage
        search={search}
        queues={queuesStore.queues}
        editable={editable}
        onResetQueues={resetQueues}
        onLoadMore={() => loadQueues(searchString)}
        availableLoadMore={pagination.hasMorePages()}
      />
    </PageTemplate>
  ));
}
