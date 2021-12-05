import React, { FC, ReactNode } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@material-ui/core";

export type BaseDialogProps = Readonly<{
  title: string;
  submitLabel: string;
  open: boolean;
  content: ReactNode;
  onCancel: () => void;
  onSubmit: () => void;
}>;

export const BaseDialog: FC<BaseDialogProps> = (
  { open, content, onCancel, onSubmit, submitLabel, title },
) => {
  return (
    <Dialog onClose={onCancel} open={open}>
      <DialogTitle>{ title }</DialogTitle>
      <DialogContent>
        {content}
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="primary">
          Cancel
        </Button>
        <Button onClick={onSubmit} color="primary">
          {submitLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
