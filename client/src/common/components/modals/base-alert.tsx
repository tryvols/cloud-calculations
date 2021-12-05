import React, { FC } from "react";
import { BaseDialog, BaseDialogProps } from "./base-dialog";
import { DialogContentText } from "@material-ui/core";

export type BaseAlertProps = Omit<BaseDialogProps, 'submitLabel' | 'content'> & Readonly<{
  description: string;
}>;

export const BaseAlert: FC<BaseAlertProps> = ({ description, ...props }) => {
  return (
    <BaseDialog
      submitLabel="Confirm"
      content={<DialogContentText>{description}</DialogContentText>}
      {...props}
    />
  );
}