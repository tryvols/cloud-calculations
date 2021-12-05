import React, { ComponentType, FormEvent, FC } from "react";
import {
  Container,
  CssBaseline,
  Avatar,
  makeStyles,
  Typography,
  Button,
  Grid,
  Link,
  Box,
  SvgIconTypeMap,
} from "@material-ui/core";
import { Copyright } from "../../../common/components/copyright";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import { getPageTitle } from "../page-title";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

type AuthPageTemplateProps = Readonly<{
  title: string;
  icon: OverridableComponent<SvgIconTypeMap>;
  form: ComponentType;
  link: {
    label: string;
    url: string;
  };
  submitButtonLabel: string;
  onSubmit?: () => void;
}>;


const disableRequest = (callback?: () => void) => (e: FormEvent<HTMLFormElement>): void => {
  e.preventDefault();
  callback?.();
}

export const AuthPage: FC<AuthPageTemplateProps> = ({
  title,
  icon: Icon,
  form: Form,
  link,
  onSubmit,
  submitButtonLabel,
}) => {
  const classes = useStyles();
  document.title = getPageTitle(title);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <Icon />
        </Avatar>
        <Typography component="h1" variant="h5">
          { title }
        </Typography>
        <form className={classes.form} noValidate onSubmit={disableRequest(onSubmit)}>
          <Form />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {submitButtonLabel}
          </Button>
          <Grid container>
            <Grid item xs />
            <Grid item>
              <Link href={link.url} variant="body2">
                {link.label}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
