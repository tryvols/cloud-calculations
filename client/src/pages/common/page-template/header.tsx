import React, { FC } from 'react';
import clsx from 'clsx';
import { AppBar, Toolbar, IconButton, Theme, makeStyles, createStyles, Typography, Grid } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/MenuOutlined';
import { LogoutButton } from '../../../common/components/logout-button';

type WithDrawerWidth = Readonly<{ drawerWidth: number }>;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    flexRow: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: (props: WithDrawerWidth) => ({
      marginLeft: props.drawerWidth,
      width: `calc(100% - ${props.drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
    menuButton: {
      marginRight: 36,
    },
    hide: {
      display: 'none',
    },
  }),
);

export type PageHeaderProps = Readonly<{
  isDrawerOpen: boolean;
  openDrawer: () => void;
}> & WithDrawerWidth;

export const PageHeader: FC<PageHeaderProps> = (props) => {
  const classes = useStyles(props);
  const { isDrawerOpen, openDrawer } = props;

  return (
    <AppBar
      position="fixed"
      className={clsx(classes.appBar, {
        [classes.appBarShift]: isDrawerOpen,
      })}
    >
      <Toolbar>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <div className={classes.flexRow}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={openDrawer}
              edge="start"
              className={clsx(classes.menuButton, {
                [classes.hide]: isDrawerOpen,
              })}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              { document.title }
            </Typography>
          </div>
          <LogoutButton />
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
