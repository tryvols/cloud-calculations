import React, { FC } from "react";
import { QueueAction } from "./queue-action";
import { ApiUtils } from "../../../common/api/utils";
import { Notification } from "../../../common/modals/notification";
import { useInject } from "../../../common/ioc/ioc-provider";
import { useParams } from "react-router-dom";
import { QueueApi } from "../../../common/api/entities/queue-api";
import { QueueItemsStore } from "../../stores/queue-items.store";
import { QueueStore } from "../../stores/queue.store";

type ComeOutActionProps = Readonly<{
  className?: string;
}>;

export const ComeOutAction: FC<ComeOutActionProps> = ({ className }) => {
  const queueStore = useInject(QueueStore);
  const queueApi = useInject(QueueApi);
  const queueItemsStore = useInject(QueueItemsStore);
  const { id } = useParams();

  const comeOutQueue = (): void => {
    ApiUtils.processRequest(async () => {
      await queueApi.leaveQueue(id);
      Notification.success('You successfully leave queue!');
      queueItemsStore.reset(id);
      queueStore.load(id);
    });
  };

  return (
    <QueueAction
      label="Come out"
      className={className}
      onClick={comeOutQueue}
      color="secondary"
    />
  );
}
