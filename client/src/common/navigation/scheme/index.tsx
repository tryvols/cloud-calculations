import React, { FC } from "react";
import { Switch, Redirect } from "react-router-dom";
import { SignInPage } from "../../../pages/auth/signin";
import { SignUpPage } from "../../../pages/auth/signup";
import { AuthRoute, PrivateRoute } from '../route';
import { SearchPage } from "../../../pages/search";
import { MyQueuesPage } from "../../../pages/my-queues";
import { AdminPage } from "../../../pages/admin";
import { QueuePage } from "../../../pages/queue";

export const NavigationScheme: FC = () => {
  return (
    <Switch>
      <AuthRoute exact name="signin" path="/signin" component={SignInPage} />
      <AuthRoute exact name="signup" path="/signup" component={SignUpPage} />
      <PrivateRoute exact name="search" path="/search" component={SearchPage} />
      <PrivateRoute exact name="my-queues" path="/my-queues" component={MyQueuesPage} />
      <PrivateRoute exact name="admin" path="/admin" component={AdminPage} />
      <PrivateRoute exact name="queue" path="/queue/:id" component={QueuePage} />
      <Redirect exact from="/" to="/signin" />
    </Switch>
  );
}