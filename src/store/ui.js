import i from 'immutable';

import * as a from '../actions';

const initialState = i.Map({
});

export default function reducer(state=initialState, action) {

  switch (action.type) {
  case a.SUBMIT_RESET_PASSWORD:
    {
      state = state.set('submitResetPassword', true);
      break;
    }
  case a.SUBMIT_NEW_PASSWORD:
    {
      state = state.set('submitNewPassword', true);
      break;
    }
  }

  return state;
}
