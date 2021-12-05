import React, { FC } from "react";
import { IconButton, useTheme } from "@material-ui/core";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeftOutlined';
import ChevronRightIcon from '@material-ui/icons/ChevronRightOutlined';

type PageToolbarProps = Readonly<{
  closeDrawer: () => void;
  className: string;
}>;

export const PageToolbar: FC<PageToolbarProps> = ({ closeDrawer, className }) => {
  const theme = useTheme();

  return (
    <div className={className}>
      <IconButton onClick={closeDrawer}>
        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
      </IconButton>
    </div>
  );
}