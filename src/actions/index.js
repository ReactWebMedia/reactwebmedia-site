export const ADD_USER = 'ADD_USER';

export const ADD_ERROR = 'ADD_ERROR';
export const ADD_MESSAGE = 'ADD_MESSAGE';
export const REMOVE_MESSAGE = 'REMOVE_MESSAGE';
export const REMOVE_ALL_MESSAGES = 'REMOVE_ALL_MESSAGES';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const SET_CURRENT_USER = 'SET_CURRENT_USER';

export const SUBMIT_RESET_PASSWORD = 'SUBMIT_RESET_PASSWORD';
export const SUBMIT_NEW_PASSWORD = 'SUBMIT_NEW_PASSWORD';

export const SET_TAG_CLOUD = 'SET_TAG_CLOUD';

export function addUser(user) {
  return {
    type: ADD_USER,
    user
  }
}

export function addError(message) {
  return {
    type: ADD_ERROR,
    message
  }
}

export function addMessage(message) {
  return {
    type: ADD_MESSAGE,
    message
  }
}

export function removeMessage(index) {
  return {
    type: REMOVE_MESSAGE,
    index
  }
}

export function removeAllMessages() {
  return {
    type: REMOVE_ALL_MESSAGES
  }
}

export function loginSuccess() {
  return {
    type: LOGIN_SUCCESS
  }
}

export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user
  }
}

export function submitResetPassword() {
  return {
    type: SUBMIT_RESET_PASSWORD
  }
}

export function submitNewPassword() {
  return{
    type: SUBMIT_NEW_PASSWORD
  }
}
