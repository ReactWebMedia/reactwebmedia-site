import {
  addError, 
  addMessage, 
  removeAllMessages,
  addUser,
  submitResetPassword, 
  submitNewPassword, 
  removeMessage
} from '../actions';


export class ActionsTrigger {
  client;
  dispatch;

  constructor(client, dispatch) {
    this.client = client;
    this.dispatch = dispatch;
  }

  updateUserInfo = async (user) => {
    try {
      let res = await this.client.updateUser(user);

      if ('user' in res) {
        this.dispatch(addMessage('Saved successfully'));
        this.dispatch(addUser(res.user));
      }
    } catch (e) {
      this.dispatch(addError(e.message));
    }
  };

  changePassword = async (old_password, new_password1, new_password2) => {
    if (old_password.trim() == '' || new_password1.trim() == '' || new_password2.trim() == '') {
      this.dispatch(addError('some of the fields are empty'));
      return;
    }

    if (new_password1 !== new_password2) {
      this.dispatch(addError('passwords do not match'));
      return;
    }

    try {
      let res = await this.client.changePassword(old_password, new_password1);

      if ('success' in res && res.success === true) {
        this.dispatch(addMessage('Password is changed successfully'));
      }
    } catch (e) {
      if (('body' in e.response) && ('error' in e.response.body)) {
        this.dispatch(addError(e.response.body.error));
      } else {
        this.dispatch(addError(e.message));
      }
    }
  };

  login = async (username, password) => {
    this.dispatch(removeAllMessages());

    try {
      let result = await this.client.login({username, password});

      if (result.success) {
        let user = result.user;
        this.dispatch(setCurrentUser(user));
        this.dispatch(setLikes(user.id, user.liked_posts.map(like => like.id)));
        this.dispatch(setFavourites(user.id, user.favourited_posts.map(fav => fav.id)));
      } else {
        this.dispatch(setCurrentUser(null));
        this.dispatch(addError('Invalid username or password'));
      }
    } catch (e) {
      this.dispatch(setCurrentUser(null));
      this.dispatch(addError('Invalid username or password'));
    }
  };

  resetPassword = async (email) => {
    try {
      await this.client.resetPassword(email);
      this.dispatch(submitResetPassword());
    } catch (e) {
      this.dispatch(addError('Invalid username or password'));
    }
  };

  newPassword = async (hash, password, password_repeat) => {
    try {
      await this.client.newPassword(hash, password, password_repeat);
      this.dispatch(submitNewPassword());
    } catch (e) {
      if (('body' in e.response) && ('error' in e.response.body)) {
        this.dispatch(addError(e.response.body.error));
      } else {
        this.dispatch(addError(e.message));
      }
    }
  };

  registerUser = async (username, password, email, firstName, lastName) => {
    this.dispatch(removeAllMessages());

    // FIXME: disable form
    try {
      let result = await this.client.registerUser({username, password, email, firstName, lastName});

      if (result.success) {
        let user = result.user;

        this.dispatch(setCurrentUser(user));

        return user;
      }

      // FIXME: enable form again
      this.dispatch(addError(result.error));
    } catch (e) {
      // FIXME: enable form again

      if (e.response && ('error' in e.response.body)) {
        // FIXME: enable form again
        this.dispatch(addError(e.response.body.error));
      } else {
        this.dispatch(addError('Server seems to have problems. Retry later, please'));
      }
    }
  };

  removeMessage = (id) => {
    this.dispatch(removeMessage(id))
  };
}

