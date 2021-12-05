import React, { FC } from "react";
import { makeStyles, Theme, createStyles, Fab } from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      position: 'fixed',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
      color: theme.palette.common.white,
      backgroundColor: green[500],
      '&:hover': {
        backgroundColor: green[600],
      },
    },
  }),
);

type AddButtonProps = Readonly<{
  onClick: () => void;
}>;

export const AddFloatingButton: FC<AddButtonProps> = ({ onClick }) => {
  const classes = useStyles();

  return (
    <Fab
      aria-label="Add"
      className={classes.button}
      onClick={onClick}
    >
      <AddIcon />
    </Fab>
  );
}