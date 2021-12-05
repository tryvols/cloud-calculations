import React, { FC } from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

export const Copyright: FC = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://localhost:3000/">
        TryVols
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}