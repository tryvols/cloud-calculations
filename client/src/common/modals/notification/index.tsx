import React, { FC } from 'react';
import ReactDOM from 'react-dom';
import { SnackbarProvider, useSnackbar, VariantType, SnackbarKey } from 'notistack';
import { IconButton } from '@material-ui/core';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';

// add a <div> child to body under which to mount the snackbars
const mountPoint = document.createElement('div');
document.body.appendChild(mountPoint);

export class Notification {
  static success(msg: string) {
    Notification.show(msg, 'success');
  }

  static warning(msg: string) {
    Notification.show(msg, 'warning');
  }

  static info(msg: string) {
    Notification.show(msg, 'info');
  }

  static error(msg: string) {
    Notification.show(msg, 'error');
  }

  static show(msg: string, variant: VariantType = 'default'): void {
    const ShowSnackbar: FC<{ message: string }> = ({ message }) => {
      const { enqueueSnackbar } = useSnackbar();
      enqueueSnackbar(message, { variant });
      return null;
    };

    const notistackRef: any = React.createRef();

    const onClickDismiss = (key: SnackbarKey) => () => { 
      notistackRef.current.closeSnackbar(key);
    }

    ReactDOM.render(
      <SnackbarProvider
        ref={notistackRef}
        maxSnack={3}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
        action={(key) => (
          <IconButton size="small" onClick={onClickDismiss(key)}>
            <CloseOutlinedIcon fontSize="small" />
          </IconButton>
        )}
      >
        <ShowSnackbar message={msg} />
      </SnackbarProvider>,
      mountPoint
    );
  }
}