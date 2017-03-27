'use strict';

module.exports = app => {
  app.get('/', 'user.index');
  app.get('/getUserInfo','user.getUserInfo')
};
