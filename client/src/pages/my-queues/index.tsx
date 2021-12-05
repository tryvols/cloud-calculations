import React, { FC } from "react";
import { QueuesListPage } from "../common/queues/queues-list-page";
import { useInject } from "../../common/ioc/ioc-provider";
import { QueueApi } from "../../common/api/entities/queue-api";

export const MyQueuesPage: FC = () => {
  const queueApi = useInject(QueueApi);

  return (
    <QueuesListPage
      title="My queues"
      query={queueApi.getInWhichUserIsStanding}
    />
  );
}
