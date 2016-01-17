import i from 'immutable';
import { compose, createStore } from 'redux';
import { combineReducers } from 'redux-immutablejs'
import { routeReducer } from 'redux-simple-router';

import current_user from './current-user';
import users from './users';
import ui from './ui';

let store;

export const theReducer = combineReducers(i.Map({
  routing: routeReducer,
  current_user,
  users,
  ui
}));

const initialState = i.Map({
  current_user: i.Map({
    id: null,
    tags: i.List([]),
    followed_tags: i.Map({}),
    followed_schools: i.Map({})
  })
});

const browserHasDevTools = typeof window === 'object' && typeof window.devToolsExtension !== 'undefined';
const finalCreateStore = compose(
   browserHasDevTools ? window.devToolsExtension() : f => f
)(createStore);


export function initState(state=initialState) {
  store = finalCreateStore(theReducer, i.fromJS(state));
  return store;
}
