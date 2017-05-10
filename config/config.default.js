"use strict";
const path = require("path");
/*默认的配置文件,所有环境都会加载这个配置文件，一般也会作为开发环境的默认配置文件。*/
module.exports = appInfo => {
  const config = {};

    config.keys = "jcx,xcj";

    config.middleware = ["errorHandler"];

  //404 page
    (config.notfound = {
        pageUrl: "/public/404.html"
    }), (config.errorHandler = {
        // 非 `/api/` 路径不在这里做错误处理，留给默认的 onerror 插件统一处理
        match: "/api"
    });

  config.logger = {
      level: "DEBUG"
  };

    config.bodyParser = {
        jsonLimit: "5000mb",
        formLimit: "5000mb"
    };
    config.multipart = {
        fileSize: "500mb",
        fileExtensions: [".doc", ".docx", ".pdf", ".ppt", ".pptx", ".xls", ".xlsx", '.zip', '.rar']
    };
    //模板配置
    config.view = {
        defaultExt: ".html",
        mapping: {
            ".ejs": "ejs",
            ".html": "ejs"
        }
    };


    return config;
};
