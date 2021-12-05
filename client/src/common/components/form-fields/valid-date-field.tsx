import React, { FC } from "react";
import moment from 'moment';
import { useObserver } from 'mobx-react';
import { WithValidDataStore } from "../../dataset/types";
import { KeyboardDatePicker, KeyboardDatePickerProps } from '@material-ui/pickers';
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";

type ValidDateField = Partial<KeyboardDatePickerProps> & Readonly<WithValidDataStore<Date | undefined>>;

export const ValidDateField: FC<ValidDateField> = ({ validDataStore, ...props }) => {
  const onChange = (date: MaterialUiPickersDate) => {
    validDataStore.set(date?.toDate());
  }

  const formatter = () => validDataStore.value
    ? moment(validDataStore.value).format(props.format ?? 'DD.MM.YYYY')
    : '';

  return useObserver(() => (
    <KeyboardDatePicker
      id="date-picker-inline"
      autoOk
      disableToolbar
      variant="inline"
      inputVariant="outlined"
      fullWidth
      margin="normal"
      format="DD.MM.YYYY"
      KeyboardButtonProps={{
        'aria-label': 'change date',
      }}
      {...props}
      value={validDataStore.value}
      labelFunc={formatter}
      onChange={onChange}
      error={!validDataStore.valid}
      helperText={validDataStore.error || props.helperText}
    />
  ));
}
