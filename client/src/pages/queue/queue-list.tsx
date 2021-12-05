import React, { FC } from "react";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  List,
  makeStyles,
  Theme,
  createStyles,
  Typography,
  Paper,
  Grid,
} from "@material-ui/core";
import { QueueItem } from "../../common/api/types";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
    itemId: {
      minWidth: 30,
    },
    itemText: {
      paddingLeft: 10,
    },
    emptyLabel: {
      marginTop: 30,
      marginBottom: 50,
    },
  }),
);

type QueueListProps = Readonly<{
  queueItems: ReadonlyArray<QueueItem>;
}>;

export const QueueList: FC<QueueListProps> = ({ queueItems }) => {
  const classes = useStyles();

  if (!queueItems.length) {
    return (
      <Grid
        className={classes.emptyLabel}
        container
        justifyContent="center"
      >
        <Typography
          variant="h5"
          component="h2"
        >
          Queue is empty, get up first ;)
        </Typography>
      </Grid>
    );
  }

  return (
    <Paper>
      <List className={classes.root}>
        {queueItems.map(({ id, user }, i, arr) => (
          <ListItem key={id} role={undefined} dense divider={arr.length > i + 1}>
            <ListItemIcon className={classes.itemId}>
              {i + 1}.
            </ListItemIcon>
            <ListItemText className={classes.itemText} primary={`${user.firstName} ${user.lastName}`} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}