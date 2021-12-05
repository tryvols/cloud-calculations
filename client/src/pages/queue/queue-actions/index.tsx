import React, { FC } from "react";
import { makeStyles, Grid } from "@material-ui/core";
import { ShowMoreAction } from "./show-more-action";
import { ComeInAction } from "./come-in-action";
import { ComeOutAction } from "./come-out-action";
import { useInject } from "../../../common/ioc/ioc-provider";
import { QueueStore } from "../../stores/queue.store";
import { useObserver } from "mobx-react";
import { QueueItemsStore } from "../../stores/queue-items.store";

const useStyles = makeStyles({
  container: {
    marginTop: 15,
  },
  button: {
    width: '100%',
  },
});

type QueueActionsProps = Readonly<{
  loadMore: boolean;
  onLoadMore(): void;
}>;

export const QueueActions: FC<QueueActionsProps> = ({ loadMore, onLoadMore }) => {
  const { hasUser, queue } = useInject(QueueStore);
  const { count } = useInject(QueueItemsStore);
  const classes = useStyles();

  return useObserver(() => {
    let showAction = queue?.isActive;
    if (queue?.maxVolume && count && !hasUser) {
      showAction = showAction && queue.maxVolume > count;
    }
  
    const InOutButton = hasUser ? ComeOutAction : ComeInAction;

    return (
      <Grid
        container
        className={classes.container}
        spacing={1}
        justifyContent="center"
      >
        {loadMore && (
          <Grid item xs={12} sm={6}>
            <ShowMoreAction className={classes.button} loadMore={onLoadMore} />
          </Grid>
        )}
        {showAction && (
          <Grid item xs={12} sm={6}>
            <InOutButton className={classes.button} />
          </Grid>
        )}
      </Grid>
    );
  });
}