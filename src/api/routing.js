import express from 'express';
import multer from 'multer';

import ApiController from './controller';

let upload = multer({storage: multer.memoryStorage()});

export function initApi(bookshelf) {
  let controller = new ApiController(bookshelf);

  let wrap =
    (handler) =>
      (req, res, next) =>
        handler(req, res, next)
          .catch((e) => {
            console.log(`an error was thrown from url-handler of ${req.originalUrl}:\n`, e);  // eslint-disable-line no-console

            res.status(500);
            res.send({error: 'Internal Server Error'});
          });

  let api = express.Router();

  api.get('/test', wrap(controller.test));
  api.post('/users', wrap(controller.registerUser.bind(controller)));
  api.post('/session', wrap(controller.login.bind(controller)));

  api.get('/user/:username', wrap(controller.getUser.bind(controller)));

  api.post('/user/', wrap(controller.updateUser.bind(controller)));
  api.post('/user/password', wrap(controller.changePassword.bind(controller)));
  api.post('/user/verify/:hash', wrap(controller.verifyEmail.bind(controller)));

  api.post('/resetpassword', wrap(controller.resetPassword.bind(controller)));
  api.post('/newpassword/:hash', wrap(controller.newPassword.bind(controller)));

  api.post('/logout', wrap(controller.logout.bind(controller)));

  return api;
}
