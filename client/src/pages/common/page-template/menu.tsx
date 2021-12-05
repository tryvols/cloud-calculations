import React, { FC, ReactNode } from 'react';
import { List, ListItem, ListItemIcon, ListItemText, Divider } from '@material-ui/core';
import SupervisorAccountOutlinedIcon from '@material-ui/icons/SupervisorAccountOutlined';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import BookmarkBorderOutlinedIcon from '@material-ui/icons/BookmarkBorderOutlined';
import { useHistory } from 'react-router-dom';

type MenuItem = {
  label: string;
  path: string;
  icon: ReactNode;
}

const menuItems: ReadonlyArray<MenuItem> = [{
  label: 'Search',
  path: '/search',
  icon: <SearchOutlinedIcon />,
}, {
  label: 'My queues',
  path: '/my-queues',
  icon: <BookmarkBorderOutlinedIcon />,
}, {
  label: 'Admin',
  path: '/admin',
  icon: <SupervisorAccountOutlinedIcon />,
}];

export const Menu: FC = () => {
  const history = useHistory();

  const goTo = (path: string) => () => history.push(path);

  return (
    <>
      <List>
        {menuItems.map(({ label, path, icon }) => (
          <ListItem
            button
            key={label}
            onClick={goTo(path)}
          >
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={label} />
          </ListItem>
        ))}
      </List>
      <Divider />
    </>
  );
}