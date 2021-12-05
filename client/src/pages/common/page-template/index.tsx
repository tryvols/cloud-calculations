import React, { FC } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { PageDrawer } from './drawer';
import { useDrawerState } from './drawer/use-drawer-state';
import { PageToolbar } from './toolbar';
import { Menu } from './menu';
import { PageHeader } from './header';
import { getPageTitle } from '../page-title';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    hide: {
      display: 'none',
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  }),
);

type PageTemplateProps = Readonly<{
  title: string;
}>;

export const PageTemplate: FC<PageTemplateProps> = (props) => {
  const classes = useStyles();
  const { isDrawerOpen, openDrawer, closeDrawer } = useDrawerState();

  document.title = getPageTitle(props.title);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <PageHeader
        drawerWidth={drawerWidth}
        isDrawerOpen={isDrawerOpen}
        openDrawer={openDrawer}
      />
      <PageDrawer
        open={isDrawerOpen}
        width={drawerWidth}
      >
        <PageToolbar
          className={classes.toolbar}
          closeDrawer={closeDrawer}
        />
        <Menu />
      </PageDrawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {props.children}
      </main>
    </div>
  );
}