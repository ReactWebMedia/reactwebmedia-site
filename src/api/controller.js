import _ from 'lodash'
import bcrypt from 'bcrypt'
import bb from 'bluebird'
import { countBreaks } from 'grapheme-breaker';
import uuid from 'uuid'
import request from 'superagent';
import crypto from 'crypto'

import config from '../../config';


let bcryptAsync = bb.promisifyAll(bcrypt);

export default class ApiController {
  constructor (bookshelf) {
    this.bookshelf = bookshelf;
  }

  async test(req, res) {
    res.send({hello: 'world'});
  }

  async registerUser(req, res) {
    let requiredFields = ['username', 'password', 'email'];
    let optionalFields = ['firstName', 'lastName'];

    for (let fieldName of requiredFields) {
      if (!(fieldName in req.body)) {
        res.status(400);
        res.send({error: 'Bad Request'});
        return
      }
    }

    let User = this.bookshelf.model('User');

    {
      let check = await User.where({username: req.body.username}).fetch({require: false});
      if (check) {
        res.status(409);
        res.send({error: 'User with this username is already registered'});
        return;
      }
    }

    {
      let check = await User.where({email: req.body.email}).fetch({require: false});
      if (check) {
        res.status(409);
        res.send({error: 'User with this email is already registered'});
        return;
      }
    }

    let moreData = {};
    for (let fieldName of optionalFields) {
      if (fieldName in req.body) {
        moreData[fieldName] = req.body[fieldName];
      }
    }

    moreData.first_login = true;

    let user;

    try {
      user = await User.create(req.body.username, req.body.password, req.body.email, moreData);
    } catch (e) {
      if (e.code == 23505) {
        res.status(401);
        res.send({error: 'User already exists'});
        return;
      }

      throw e;
    }

    if (req.session) {
      req.session.user = user.id;
    }

    createJob('register-user-email', {
      username: user.get('username'),
      email: user.get('email'),
      hash: user.get('email_check_hash')
    });

    res.send({success: true, user: user});
  }

  async login(req, res) {
    if (!req.session) {
      res.status(500);
      res.send({error: 'Internal Server Error'});
      console.error('Session engine is not available, have you started redis service?');  // eslint-disable-line no-console
      return;
    }

    let requiredFields = ['username', 'password'];

    for (let fieldName of requiredFields) {
      if (!(fieldName in req.body)) {
        res.status(400);
        res.send({error: 'Bad Request'});
        return;
      }
    }

    let User = this.bookshelf.model('User');

    let user;

    try {
      user = await new User({username: req.body.username}).fetch({require: true});
    } catch (e) {
      console.warn('Someone tried to log in as ' + req.body.username + ', but there\'s no such user');  // eslint-disable-line no-console
      res.status(401);
      res.send({success: false});
      return
    }

    let passwordIsValid = await bcryptAsync.compareAsync(req.body.password, user.get('hashed_password'));

    if (!passwordIsValid) {
      console.warn('Someone tried to log in as ' + req.body.username + ', but used wrong pasword');  // eslint-disable-line no-console
      res.status(401);
      res.send({success: false});
      return
    }

    req.session.user = user.id;
    user = await User.where({id: req.session.user}).fetch({require: true});

    res.send({ success: true, user });
  }

  async verifyEmail(req, res) {
    let User = this.bookshelf.model('User');

    let user;

    try {
      user = await new User({email_check_hash: req.params.hash}).fetch({require: true});
    } catch (e) {
      console.warn('Someone tried to verify email, but used invalid hash');  // eslint-disable-line no-console
      res.status(401);
      res.send({success: false});
      return;
    }

    user.set('email_check_hash', '');
    await user.save(null, {method: 'update'});

    res.redirect('/');
  }

  /**
   * Looks users record by submitted email, saves user random SHA1 hash.
   * If user is authorized. Show error message.
   *
   * If no user found send status 401.
   *
   * When user saved successfully, send message (publich event?) to user with
   * Reset password end-point url like: http://reactwebmedia.co/resetpasswordfrom?code={generatedcode}
   */
  async resetPassword(req, res) {

    if (req.session && req.session.user) {
      res.status(403);
      res.send({error: 'Please use profile change password feature.'});
      return;
    }

    for (let fieldName of ['email']) {
      if (!(fieldName in req.body)) {
        res.status(400);
        res.send({error: 'Bad Request'});
        return;
      }
    }

    let User = this.bookshelf.model('User');

    let user;

    try {
      user = await new User({email: req.body.email}).fetch({require: true});
    } catch (e) {
      // we do not show any error if we do not have user.
      // To prevent disclosure information about registered emails.
      res.status(200);
      res.send({success: true});
      return;
    }

    let random = Math.random().toString();
    let sha1 = crypto.createHash('sha1').update(user.email + random).digest('hex');

    if (!user.get('reset_password_hash')) {
      user.set('reset_password_hash', sha1);
      await user.save(null, {method: 'update'});
    }

    createJob('reset-password-email', {
      username: user.get('username'),
      email: req.body.email,
      hash: user.get('reset_password_hash')
    });

    res.status(200);
    res.send({success: true});
  }

  /**
   * New password form action.
   * Validates new password form with password/password repeat values.
   * Saves new password to User model.
   */
  async newPassword(req, res) {

    if (req.session && req.session.user) {
      res.redirect('/');
    }

    let User = this.bookshelf.model('User');

    let user;

    try {
      user = await new User({reset_password_hash: req.params.hash}).fetch({require: true});
    } catch (e) {
      console.warn('Someone tried to reset password using unknown reset-hash');  // eslint-disable-line no-console
      res.status(401);
      res.send({success: false});
      return;
    }

    if (!('password' in req.body) || !('password_repeat' in req.body)) {
      res.status(400);
      res.send({error: '"password" or "password_repeat" parameter is not provided'});
      return;
    }

    if (req.body.password !== req.body.password_repeat) {
      res.status(400);
      res.send({error: '"password" and "password_repeat" do not exact match.'});
      return;
    }

    let hashedPassword = await bcryptAsync.hashAsync(req.body.password, 10);

    user.set('hashed_password', hashedPassword);
    user.set('reset_password_hash', '');

    await user.save(null, {method: 'update'});
    res.send({success: true});

  }

  async logout(req, res) {
    if (req.session && req.session.user) {
      req.session.destroy();
    }
    res.redirect('/');
  }

  async getUser(req, res) {
    let User = this.bookshelf.model('User');
    let u = await User
      .where({username: req.params.username})
      .fetch({
        require: true
      });

    res.send(u.toJSON());
  }

  async updateUser(req, res) {
    if (!req.session || !req.session.user) {
      res.status(403);
      res.send({error: 'You are not authorized'});
      return;
    }

    let User = this.bookshelf.model('User');

    try {
      let user = await User.where({id: req.session.user}).fetch({require: true});

      if(!_.isEmpty(req.body.more)) {
        let properties = _.extend(user.get('more'), req.body.more);
        user.set('more', properties);
      }

      await user.save(null, {method: 'update'});

      res.send({user});
    } catch(e) {
      res.status(500);
      res.send({error: 'Update failed'});
      return;
    }
  }

  async changePassword(req, res) {
    if (!req.session || !req.session.user) {
      res.status(403);
      res.send({error: 'You are not authorized'});
      return;
    }

    if (!('old_password' in req.body) || !('new_password' in req.body)) {
      res.status(400);
      res.send({error: '"old_password" or "new_password" parameter is not provided'});
      return;
    }

    let User = this.bookshelf.model('User');

    try {
      let user = await User.where({id: req.session.user}).fetch({require: true});

      let passwordIsValid = await bcryptAsync.compareAsync(req.body.old_password, user.get('hashed_password'));

      if (!passwordIsValid) {
        res.status(401);
        res.send({error: 'old password is incorrect'});
        return
      }

      let hashedPassword = await bcryptAsync.hashAsync(req.body.new_password, 10);

      user.set('hashed_password', hashedPassword);

      await user.save(null, {method: 'update'});

      res.send({success: true});
    } catch(e) {
      res.status(500);
      res.send({error: 'Update failed'});
      return;
    }
  }
}
