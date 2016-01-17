import md5 from 'md5';
import Knex from 'knex';
import Bookshelf from 'bookshelf';
import uuid from 'uuid'
import _ from 'lodash'
import fileType from 'file-type';
import mime from 'mime';
import bb from 'bluebird';
import bcrypt from 'bcrypt';
import crypto from 'crypto'


let bcryptAsync = bb.promisifyAll(bcrypt);

export default function initBookshelf(config) {
  let knex = Knex(config);
  let bookshelf = Bookshelf(knex);

  bookshelf.plugin('registry');
  bookshelf.plugin('visibility');
  bookshelf.plugin('virtuals');

  let User;

  User = bookshelf.Model.extend({
    tableName: 'users',
    virtuals: {
      gravatarHash: function() {
        return md5(this.get('email'));
      }
    },
    hidden: ['hashed_password', 'email', 'email_check_hash', 'reset_password_hash'],  // exclude from json-exports
  });

  User.create = async function(username, password, email, moreData) {
    let hashed_password = await bcryptAsync.hashAsync(password, 10);

    let random = Math.random().toString();
    let email_check_hash = crypto.createHash('sha1').update(email + random).digest('hex');

    let obj = new User({
      id: uuid.v4(),
      username,
      hashed_password,
      email,
      email_check_hash
    });

    if (!_.isEmpty(moreData)) {
      obj.set('more', moreData);
    }

    await obj.save(null, {method: 'insert'});

    return obj;
  };

  // adding to registry
  bookshelf.model('User', User);

  return bookshelf;
}
