'use strict';
const path = require('path');
/*默认的配置文件,所有环境都会加载这个配置文件，一般也会作为开发环境的默认配置文件。*/
module.exports = appInfo => {
    const config = {};

    //数据库配置
    config.mysql = {
        // 单数据库信息配置
        client: {
            // host
            host: 'qdm105632177.my3w.com',
            // 端口号
            port: '3306',
            // 用户名
            user: 'qdm105632177',
            // 密码
            password: 'jin123654789',
            // 数据库名
            database: 'qdm105632177_db',
        },
        // 是否加载到 app 上，默认开启
        app: true,
        // 是否加载到 agent 上，默认关闭
        agent: false,
    };

    return config;
};




