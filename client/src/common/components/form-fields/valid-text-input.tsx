import React, { FC } from "react";
import { useObserver } from 'mobx-react';
import { TextField, OutlinedTextFieldProps } from "@material-ui/core";
import { WithValidDataStore } from "../../dataset/types";

type ValidTextInputProps = Partial<OutlinedTextFieldProps> & Readonly<WithValidDataStore<string>>;

export const ValidTextInput: FC<ValidTextInputProps> = ({ validDataStore, ...props }) =>{
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    validDataStore.set(event.target.value);
  }

  return useObserver(() => (
    <TextField
      variant="outlined"
      margin="normal"
      required
      fullWidth
      autoComplete="off"
      {...props}
      error={!validDataStore.valid}
      helperText={validDataStore.error || props.helperText}
      onChange={onChange}
    />
  ));
}
