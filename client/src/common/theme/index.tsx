import React, { FC } from "react";
import { createTheme } from '@material-ui/core/styles'
import { blue } from "@material-ui/core/colors";
import { ThemeProvider } from '@material-ui/styles';

const appTheme = createTheme({
  palette: {
    primary: {
      main: blue[500],
    },
  },
});

export const AppThemeProvider: FC = (props) => {
  return (
    <ThemeProvider theme={appTheme}>
      {props.children}
    </ThemeProvider>
  );
}
