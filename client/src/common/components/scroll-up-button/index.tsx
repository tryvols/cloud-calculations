import React, { FC } from "react";
import { makeStyles, Theme, createStyles, Zoom, Fab } from "@material-ui/core";
import UpIcon from '@material-ui/icons/KeyboardArrowUp';
import { useScrollState } from "../../scroll/use-scroll-state";

type StyleProps = Readonly<{
  bottom?: number;
  right?: number;
}>;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: ({ bottom, right }: StyleProps) => ({
      position: 'fixed',
      bottom: bottom ?? theme.spacing(10),
      right: right ?? theme.spacing(2),
    }),
  })
);

type ScrollUpButtonProps = Readonly<{
  position?: StyleProps;
}>;

export const ScrollUpButton: FC<ScrollUpButtonProps> = (props) => {
  const classes = useStyles(props.position || {});
  const { isScrollDown, scrollToTop } = useScrollState();

  return (
    <Zoom in={isScrollDown}>
      <Fab
        color="primary"
        aria-label="Expand"
        className={classes.button}
        onClick={scrollToTop}
      >
        <UpIcon />
      </Fab>
    </Zoom>
  );
}
