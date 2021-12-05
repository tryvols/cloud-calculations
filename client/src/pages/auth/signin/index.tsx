import React, { FC } from 'react';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { AuthPage } from '../../common/auth-page';
import { LoginDataset, LoginDataset$ } from './login-dataset';
import { DatasetUtils } from '../../../common/dataset';
import { SigninForm } from './signin-form';
import { ApiUtils } from '../../../common/api/utils';
import { Token } from '../../../common/auth/token';
import { useInject } from '../../../common/ioc/ioc-provider';
import { UserApi } from '../../../common/api/entities/user-api';
import { UserStore } from '../../../common/auth/user.store';
import { useHistory } from 'react-router-dom';

export const SignInPage: FC = () => {
  const dataset = useInject<LoginDataset>(LoginDataset$);
  const userApi = useInject(UserApi);
  const userStore = useInject(UserStore);
  const history = useHistory();

  const onSubmitForm = (): void => {
    ApiUtils.processRequest(dataset, async () => {
      const tokenData = await userApi.login(DatasetUtils.serialize(dataset));
      Token.set(tokenData);
      await userStore.load();
      history.push('/search');
    });
  }

  return (
    <AuthPage
      title="Sign in"
      icon={LockOutlinedIcon}
      form={SigninForm}
      submitButtonLabel="Sign in"
      link={{
        label: 'Sign up',
        url: '/signup'
      }}
      onSubmit={onSubmitForm}
    />
  );
}
