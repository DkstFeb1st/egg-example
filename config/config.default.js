'use strict';
const path = require('path');
/*默认的配置文件,所有环境都会加载这个配置文件，一般也会作为开发环境的默认配置文件。*/
module.exports = appInfo => {
  const config = {};

  config.keys = 'jcx,xcj';

    config.middleware = ['errorHandler', 'loginHandler']

  //404 page
  config.notfound = {
    pageUrl: '/public/404.html',
  },

      config.errorHandler = {
          // 非 `/api/` 路径不在这里做错误处理，留给默认的 onerror 插件统一处理
          match: '/api',
  }

  config.logger = {
    level : 'DEBUG',
  }

    // config.bodyParser = {
    //   jsonLimit: '1m',
    //   formLimit: '1m',
    // }

    //模板配置
    config.view = {
        defaultExt: '.html',
        mapping: {
            '.ejs': 'ejs',
            '.html': 'ejs',
        }
    }
    config.security = {
        csrf: {
            ignoreJSON: true// 默认为 false，当设置为 true 时，将会放过所有 content-type 为 `application/json` 的请求
        }
    }

  return config;
};



