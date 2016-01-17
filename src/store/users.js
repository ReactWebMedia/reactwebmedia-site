import i from 'immutable';
import _ from 'lodash';

import * as a from '../actions';


const initialState = i.Map({});

const cleanUser = user => {
  let users = {};

  if (!user) {

    return users;
  }

  if (user.following) {
    for (let followed_user of user.following) {
      users[followed_user.id] = followed_user;
    }

    user = _.cloneDeep(user);
    delete user.following;
  }

  if (user.followers) {
    for (let follower of user.followers) {
      users[follower.id] = follower;
    }

    user = _.cloneDeep(user);
    delete user.following;
  }

  users[user.id] = user;

  return users;
};

export default function reducer(state=initialState, action) {
  switch (action.type) {
    case a.ADD_USER:
    case a.SET_CURRENT_USER:
    {
      state = state.merge(i.fromJS(cleanUser(action.user)));

      break;
    }
  }

  return state;
}
