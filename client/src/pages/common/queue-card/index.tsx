import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import { UpdateQueue } from '../queues/update-queue';
import { DeleteQueue } from '../queues/delete-queue';
import moment from 'moment';
import { Chip, Grid } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
    minWidth: 250,
  },
  content: {
    cursor: 'pointer',
  },
  name: {
    textOverflow: 'ellipsis',
  },
  expiresAt: {
    marginTop: 2,
    fontSize: 12,
    marginBottom: 10,
  },
  actions: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nonVisible: {
    visibility: 'hidden',
  },
  hide: {
    display: 'none',
  },
  chip: {
    height: 20,
    fontSize: 12,
    marginLeft: 10
  },
  activeChip: {
    borderColor: green[600],
    color: green[600],
  }
});

export type QueueCardProps = Readonly<{
  id: number;
  name: string;
  address: string;
  isActive: boolean;
  maxVolume?: number;
  expiresAt?: string;
  editable?: boolean;
  onReset: () => void;
}>;

export const QueueCard: FC<QueueCardProps> = (props) => {
  const history = useHistory();
  const classes = useStyles();
  const { id, name, address, expiresAt, editable = false, isActive, maxVolume } = props;

  const goToQueue = (): void => {
    history.push(`/queue/${id}`);
  }

  return (
    <Card className={classes.root}>
      <CardContent
        className={classes.content}
        onClick={goToQueue}
      >
        <Typography
          variant="h6"
          component="h2"
          noWrap
          className={classes.name}
        >
          { name }
        </Typography>
        <Grid container justify={'space-between'}>
          <Grid item>
            <Typography
              color="textSecondary"
              className={clsx(classes.expiresAt, {
                [classes.nonVisible]: !expiresAt,
              })}
            >
              Expires at: { moment(expiresAt).format('DD.MM.YYYY') }
            </Typography>
          </Grid>
          <Grid item>
            {maxVolume && (
              <Chip
                className={clsx(classes.chip)}
                label={maxVolume}
                variant="outlined"
                color="secondary"
                size="small"
              />
            )}
            {editable && (
              isActive ? (
                <Chip
                  className={clsx(classes.chip, classes.activeChip)}
                  label="Active"
                  variant="outlined"
                  size="small"
                />
              ) : (
                <Chip
                  className={classes.chip}
                  label="Inactive"
                  variant="outlined"
                  color="secondary"
                  size="small"
                />
              )
            )}
          </Grid>
        </Grid>
        <Typography
          variant="body2"
          component="p"
        >
          { address }
        </Typography>
      </CardContent>
      <CardActions className={classes.actions}>
        <Button size="small" onClick={goToQueue}>Come in</Button>
        <div className={clsx({
          [classes.hide]: !editable
        })}>
          <UpdateQueue queue={props} onReset={props.onReset} />
          <DeleteQueue id={id} onReset={props.onReset} />
        </div>
      </CardActions>
    </Card>
  );
}