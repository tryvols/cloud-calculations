import React, { FC } from "react";
import { QueueAction } from "./queue-action";
import { green } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core";
import clsx from 'clsx';
import { useInject } from "../../../common/ioc/ioc-provider";
import { useParams } from "react-router-dom";
import { Notification } from "../../../common/modals/notification";
import { ApiUtils } from "../../../common/api/utils";
import { QueueApi } from "../../../common/api/entities/queue-api";
import { QueueItemsStore } from "../../stores/queue-items.store";
import { QueueStore } from "../../stores/queue.store";

const useStyles = makeStyles({
  comeInButton: {
    fontStyle: 'bold',
    fontWeight: 600,
    color: green[400],
    '&:hover': {
      color: green[500],
    },
  }
});

type ComeInActionProps = Readonly<{
  className?: string;
}>;

export const ComeInAction: FC<ComeInActionProps> = ({ className }) => {
  const queueStore = useInject(QueueStore);
  const queueApi = useInject(QueueApi);
  const queueItemsApi = useInject(QueueItemsStore);
  const { id } = useParams();
  const classes = useStyles();

  const comeInQueue = (): void => {
    ApiUtils.processRequest(async () => {
      await queueApi.enterQueue(id);
      Notification.success('You successfully enter queue!');
      queueItemsApi.reset(id);
      queueStore.load(id);
    });
  };

  return (
    <QueueAction
      label="Come in"
      className={clsx(classes.comeInButton, className)}
      onClick={comeInQueue}
      color="inherit"
    />
  );
}
