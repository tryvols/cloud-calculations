import React, { FC, ReactNode, Fragment } from "react";
import { Grid, Button, makeStyles, Box, useTheme } from "@material-ui/core";
import { QueueCard, QueueCardProps } from "../queue-card";
import LoopOutlinedIcon from '@material-ui/icons/LoopOutlined';
import { ScrollUpButton } from "../../../common/components/scroll-up-button";
import { CreateQueue } from '../queues/create-queue';
import clsx from 'clsx';

const useStyles = makeStyles({
  loadMoreContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  loadMoreButton: {
    display: 'none',
    marginTop: 50,
    marginBottom: 70,
  },
  search: {
    minWidth: 300,
    maxWidth: 600,
  },
  show: {
    display: 'flex',
  },
});

type QueuesPageProps = Readonly<{
  queues: ReadonlyArray<Omit<QueueCardProps, 'editable' | 'onReset'>>;
  search?: ReactNode;
  editable?: boolean;
  availableLoadMore?: boolean;
  onResetQueues: () => void;
  onLoadMore?: () => void;
}>;

export const QueuesPage: FC<QueuesPageProps> = (
  { queues, onLoadMore, editable = false, search, availableLoadMore, onResetQueues }
) => {
  const classes = useStyles();
  const theme = useTheme();
  const scrollUpBottomMargin = theme.spacing(editable ? 10 : 2);

  return (
    <Fragment>
      <Grid container spacing={3}>
        {/* Search field slot */}
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Box className={classes.search} mx="auto">
            {search}
          </Box>
        </Grid>

        {queues.map(({ name, address, id, expiresAt, isActive, maxVolume }) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={id}>
            <QueueCard
              id={id}
              name={name}
              isActive={isActive}
              address={address}
              maxVolume={maxVolume}
              expiresAt={expiresAt}
              editable={editable}
              onReset={onResetQueues}
            />
          </Grid>
        ))}

        {/* Load more button */}
        <Grid
          item xs={12} sm={12} md={12} lg={12}
          className={classes.loadMoreContainer}
        >
          <Button
            className={clsx(classes.loadMoreButton, {
              [classes.show]: availableLoadMore,
            })}
            onClick={onLoadMore}
            variant="outlined"
            size="large"
            startIcon={<LoopOutlinedIcon />}
          >
            Load more
          </Button>
        </Grid>
      </Grid>
      <ScrollUpButton position={{
        bottom: scrollUpBottomMargin,
      }} />
      {editable && <CreateQueue onReset={onResetQueues} />}
    </Fragment>
  );
}