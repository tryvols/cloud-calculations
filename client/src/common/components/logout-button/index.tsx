import React, { FC } from "react";
import { Button } from "@material-ui/core";
import { Token } from "../../auth/token";
import { useHistory } from "react-router-dom";

export const LogoutButton: FC = () => {
  const history = useHistory();

  const logout = () => {
    Token.clear();
    history.push('/signin');
  }

  return (
    <Button
      color="inherit"
      onClick={logout}
    >
      Log out
    </Button>
  );
}
