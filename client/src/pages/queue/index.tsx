import React, { FC } from "react";
import { PageTemplate } from "../common/page-template";
import { QueueList } from "./queue-list";
import { makeStyles } from "@material-ui/core";
import { QueueActions } from "./queue-actions";
import { useInject } from "../../common/ioc/ioc-provider";
import { useParams } from "react-router-dom";
import { usePagination } from "../../common/navigation/use-pagination";
import { useOnMount } from "../../common/hooks/use-on-mount";
import { QueueStore } from "../stores/queue.store";
import { QueueItemsStore } from "../stores/queue-items.store";
import { useObserver } from "mobx-react";

const useStyles = makeStyles({
  wrapper: {
    width: '100%',
    maxWidth: 500,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  paper: {
    width: '100%',
    overflow: 'hidden',
  }
});

export const QueuePage: FC = () => {
  const queueStore = useInject(QueueStore);
  const queueItemsStore = useInject(QueueItemsStore);
  const pagination = usePagination();
  const { id } = useParams();
  const classes = useStyles();

  useOnMount(async () => {
    queueItemsStore.reset(id);
    queueStore.load(id);
  });

  return useObserver(() => {
    const title = queueStore.queue ? `- ${queueStore.queue?.name}` : '';

    return (
      <PageTemplate title={`Queue ${title}`}>
        <div className={classes.wrapper}>
          <QueueList queueItems={queueItemsStore.items} />
          <QueueActions
            loadMore={pagination.hasMorePages()}
            onLoadMore={() => queueItemsStore.load(id)}
          />
        </div>
      </PageTemplate>
    )
  });
}
