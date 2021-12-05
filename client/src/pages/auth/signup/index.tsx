import React, { FC } from 'react';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { AuthPage } from '../../common/auth-page';
import { RegistrationDataset$, RegistrationDataset } from './registration-dataset';
import { DatasetUtils } from '../../../common/dataset';
import { ApiUtils } from '../../../common/api/utils';
import { Notification } from '../../../common/modals/notification';
import { SignupForm } from './signup-form';
import { useInject } from '../../../common/ioc/ioc-provider';
import { UserApi } from '../../../common/api/entities/user-api';
import { useHistory } from 'react-router-dom';

export const SignUpPage: FC = () => {
  const dataset = useInject<RegistrationDataset>(RegistrationDataset$);
  const userApi = useInject(UserApi);
  const history = useHistory();

  const onSubmitForm = (): void => {
    ApiUtils.processRequest(dataset, async () => {
      await userApi.registration(DatasetUtils.serialize(dataset));
      Notification.success('You successfully registered!');
      history.push('/signin');
    });
  }

  return (
    <AuthPage
      title="Sign up"
      icon={LockOutlinedIcon}
      form={SignupForm}
      submitButtonLabel="Sign up"
      link={{
        label: 'Sign in',
        url: '/signin'
      }}
      onSubmit={onSubmitForm}
    />
  );
}
