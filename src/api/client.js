import request from 'superagent';

export default class ApiClient
{
  host;
  serverReq = null;

  constructor(host, serverReq=null) {
    this.host = host;
    this.serverReq = serverReq;
  }

  apiUrl(relativeUrl) {
    return `${this.host}${relativeUrl}`;
  }

  async get(relativeUrl, query = {}) {
    let req = request
      .get(this.apiUrl(relativeUrl))
      .query(query);

    if (this.serverReq !== null && 'cookie' in this.serverReq.headers) {
      req = req.set('Cookie', this.serverReq.headers['cookie']);
    }

    return Promise.resolve(req);
  }

  async del(relativeUrl) {
    let req = request.del(this.apiUrl(relativeUrl));

    if (this.serverReq !== null && 'cookie' in this.serverReq.headers) {
      req = req.set('Cookie', this.serverReq.headers['cookie']);
    }

    return Promise.resolve(req);
  }

  async updateUser(user) {
    let response = await this.postJSON(`/api/v1/user`, user);
    return response.body;
  }

  async changePassword(old_password, new_password) {
    let response = await this.postJSON(`/api/v1/user/password`, {old_password, new_password});
    return response.body;
  }

  async resetPassword(email) {
    let response = await this.postJSON(`/api/v1/resetpassword`, {email});

    return response.body;
  }

  async newPassword(hash, password, password_repeat) {
    let response = await this.postJSON(`/api/v1/newpassword/${hash}`, {password, password_repeat});
    return response.body;
  }

  async registerUser(userData) {
    let response = await this.post(`/api/v1/users`, userData);
    return response.body;
  }

  async login(loginData) {
    let response = await this.post(`/api/v1/session`, loginData);
    return response.body;
  }
}
