import bluebird from 'bluebird';
import React from 'react'
import ReactDOM from 'react-dom'
import { createHistory } from 'history'
import { Router } from 'react-router';
import { Provider } from 'react-redux';
import { syncReduxAndRouter } from 'redux-simple-router';

import { getRoutes } from '../routing'
import { AuthHandler, FetchHandler } from '../utils/loader';
import { API_HOST } from '../config';
import ApiClient from '../api/client';
import { initState } from '../store'

bluebird.longStackTraces();
window.Promise = bluebird;

let store = initState(window.state);

let history = createHistory();
let authHandler = new AuthHandler(store);
let fetchHandler = new FetchHandler(store, new ApiClient(API_HOST));

syncReduxAndRouter(history, store, state => state.get('routing'));

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      {getRoutes(authHandler.handle, fetchHandler.handle)}
    </Router>
  </Provider>,
  document.getElementById('content')
);
