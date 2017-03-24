'use strict';

// npm run dev DO NOT read this file
//部署文件
require('egg').startCluster({
  baseDir: __dirname,
  port:7001, // default to 7001
});
