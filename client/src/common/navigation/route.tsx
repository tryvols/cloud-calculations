import React, { FC } from 'react';
import { Route, Redirect, RouteProps } from "react-router-dom";
import { Token } from '../auth/token';

const routeHOC = (
  validator: () => boolean,
  redirect: string
): FC<RouteProps & { name: string }> => {
  return ({ component: Component, ...rest }) => {
    return <Route
      {...rest}
      render={props => validator()
        // @ts-ignore
        ? <Component {...props} />
        : <Redirect to={redirect} />
      }
    />;
  }
}

export const AuthRoute = routeHOC(() => !Token.isValid(), '/search');
export const PrivateRoute = routeHOC(() => Token.isValid(), '/signin');
