import fetch from 'node-fetch';
import { parse as parseCookie } from 'cookie';


/**
 * Exchange login/password for session-id
 *
 * @param {String} username
 * @param {String} password
 * @return {String} session-id
 */
export async function login(username, password) {
  let res = await fetch(
    'http://127.0.0.1:8000/api/v1/session',
    {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    }
  );

  if (res.status !== 200) {
    throw new Error(`Server response code: ${res.status}`);
  }

  let cookieLines = res.headers.getAll('set-cookie');
  for (let line of cookieLines) {
    let cookies = parseCookie(line);

    if ('connect.sid' in cookies) {
      return cookies['connect.sid'];
    }
  }

  throw new Error('no session-cookie in response');
}
