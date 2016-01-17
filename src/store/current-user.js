import i from 'immutable';
import _ from 'lodash';

import * as a from '../actions';


const initialState = i.Map({
  id: null,
  tags: i.List([])
});

export default function reducer(state=initialState, action) {
  switch (action.type) {
    case a.SET_CURRENT_USER:
    {
      const oldUid = state.get('id');

      if (!action.user || oldUid === action.user.id) {

        break;
      }

      state = state.withMutations(function (state) {
        state
          .set('id', action.user.id)
          .set('tags', i.List([]))
          .set('followed_tags', i.Map({}));
      });

      break;
    }
  }

  return state;
}
