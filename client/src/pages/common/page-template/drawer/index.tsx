import React, { FC } from "react";
import clsx from 'clsx';
import { Drawer, makeStyles, Theme, createStyles } from "@material-ui/core";

type WithDrawerWidth = Readonly<{ width: number }>;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      flexShrink: 0,
      whiteSpace: 'nowrap',
    },
    drawerOpen: {
      width: (props: WithDrawerWidth) => props.width,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9) + 1,
      },
    },
  }),
);

export type PageDrawerProps = Readonly<{
  open: boolean;
}> & WithDrawerWidth;

export const PageDrawer: FC<PageDrawerProps> = (props) => {
  const classes = useStyles(props);
  const drawerStateClass = props.open ? classes.drawerOpen : classes.drawerClose;

  return (
    <Drawer
      variant="permanent"
      className={clsx(classes.drawer, drawerStateClass)}
      classes={{ paper: clsx(drawerStateClass) }}
    >
      {props.children}
    </Drawer>
  );
}
