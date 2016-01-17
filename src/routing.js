import {Route, IndexRoute} from 'react-router';
import React from 'react';

import { combineHandlers, combineHandlersAsync } from './utils/loader';

import App from './pages/app';
import Auth from './pages/auth';
import NewPassword from './pages/new-password';
import PasswordReset from './pages/password-reset';
import UserPage from './pages/user';
import Home from './pages/home';

export function getRoutes(authHandler, fetchHandler) {
  let withoutAuth = fetchHandler;
  let withAuth;

  if (authHandler.length >= 3 || fetchHandler.length >= 3) {
    withAuth = combineHandlersAsync(authHandler, fetchHandler);
  } else {
    withAuth = combineHandlers(authHandler, fetchHandler);
  }

  return (
    <Route component={App}>
      <Route component={Home} path="/" onEnter={withoutAuth} />
      <Route component={Auth} path="/auth" onEnter={withoutAuth} />
      <Route path="/user/:username">
        <IndexRoute component={UserPage} onEnter={withoutAuth} />
      </Route>
      <Route component={PasswordReset} path="/resetpassword" onEnter={withoutAuth} />
      <Route component={NewPassword} path="/newpassword/:hash" onEnter={withoutAuth} />
    </Route>
  );
}
