'use strict';
const path = require('path');
/*默认的配置文件,所有环境都会加载这个配置文件，一般也会作为开发环境的默认配置文件。*/
module.exports = appInfo => {
  const config = {};

  config.keys = 'jcx,xcj';

  //视图模板
  // config.view = {
  //   extname: 'js',
  //   dir: path.join(appInfo.baseDir, 'app/view'),
  // };

  //404 page
  config.notfound = {
    pageUrl: '/public/404.html',
  },

  //error page
  config.onerror = {
    errorPageUrl: '/public/500.html',
  }

  config.logger = {
    level : 'DEBUG',
  }

  config.bodyParser = {
    jsonLimit: '1m',
    formLimit: '1m',
  }



  return config;
};



