import i from 'immutable';

import { theReducer } from '../../src/store';
import { SET_CURRENT_USER } from '../../src/actions';


describe('combined reducer "theReducer"', function() {

  it('is should not throw any error when action SET_CURRENT_USER and action.user equals null', function() {
    theReducer(i.Map({}), {type: SET_CURRENT_USER, user: null});
  });

});
