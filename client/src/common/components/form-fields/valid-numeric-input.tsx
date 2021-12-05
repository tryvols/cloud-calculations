import React, { FC } from "react";
import { useObserver } from 'mobx-react';
import { TextField, OutlinedTextFieldProps } from "@material-ui/core";
import { WithValidDataStore } from "../../dataset/types";

type ValidNumericInputProps = Partial<OutlinedTextFieldProps> & Readonly<WithValidDataStore<number | undefined>>;

export const ValidNumericInput: FC<ValidNumericInputProps> = ({ validDataStore, ...props }) =>{
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    validDataStore.set(Number.parseInt(event.target.value, 10));
  }

  return useObserver(() => (
    <TextField
      variant="outlined"
      margin="normal"
      type="number"
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
