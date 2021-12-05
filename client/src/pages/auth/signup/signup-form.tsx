import React, { Fragment, FC } from "react";
import { RegistrationDataset$, RegistrationDataset } from "./registration-dataset";
import { ValidTextInput } from "../../../common/components/form-fields/valid-text-input";
import { useInject } from "../../../common/ioc/ioc-provider";

export const SignupForm: FC = () => {
  const { username, firstName, lastName, password, passwordConfirmation } =
    useInject<RegistrationDataset>(RegistrationDataset$);

  return (
    <Fragment>
      <ValidTextInput
        label="Username"
        autoFocus
        validDataStore={username}
      />
      <ValidTextInput
        label="First name"
        validDataStore={firstName}
      />
      <ValidTextInput
        label="Last name"
        name="last-name"
        validDataStore={lastName}
      />
      <ValidTextInput
        label="Password"
        type="password"
        validDataStore={password}
      />
      <ValidTextInput
        label="Confirm password"
        type="password"
        validDataStore={passwordConfirmation}
      />
    </Fragment>
  );
}