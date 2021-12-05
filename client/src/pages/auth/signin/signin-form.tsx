import React, { Fragment, FC } from "react";
import { LoginDataset$, LoginDataset } from "./login-dataset";
import { ValidTextInput } from "../../../common/components/form-fields/valid-text-input";
import { FormControlLabel, Checkbox } from "@material-ui/core";
import { useInject } from "../../../common/ioc/ioc-provider";

export const SigninForm: FC = () => {
  const { username, password } = useInject<LoginDataset>(LoginDataset$);

  return (
    <Fragment>
      <ValidTextInput
        label="Login"
        autoFocus
        validDataStore={username}
      />
      <ValidTextInput
        label="Password"
        type="password"
        validDataStore={password}
      />
      <FormControlLabel
        control={<Checkbox value="remember" color="primary" />}
        label="Remember me"
      />
    </Fragment>
  );
}