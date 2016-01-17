// Put here things you want to send to a client.

export const API_HOST = process.env.API_HOST ? process.env.API_HOST : 'http://localhost:8000';
export const API_URL_PREFIX = `${API_HOST}/api/v1`;

export const API_URL_NAMES = {
  USERS: `USERS`,
  SESSION: `SESSION`
};

export const API_URL = {
  [API_URL_NAMES.USERS]: `${API_URL_PREFIX}/users`,
  [API_URL_NAMES.SESSION]: `${API_URL_PREFIX}/session`
};

export const URL_NAMES = {
  HOME: `HOME`,
  AUTH: `AUTH`,
  USER: `USER`,
  CHANGE_PASSWORD: `CHANGE_PASSWORD`,
  SCHOOL: 'SCHOOL'
};

export const URL = {
  [URL_NAMES.HOME]: '/',
  [URL_NAMES.AUTH]: '/auth',
  [URL_NAMES.USER]: '/user/:username'
};
