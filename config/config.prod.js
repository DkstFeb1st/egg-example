'use strict';
const path = require('path');
/*默认的配置文件,所有环境都会加载这个配置文件，一般也会作为开发环境的默认配置文件。*/
module.exports = appInfo => {
    const config = {};

    //生产数据库配置
    //数据库配置
    config.sequelize = {
        dialect: 'mysql', // support: mysql, mariadb, postgres, mssql
        database: 'qdm105632177_db',
        host: 'qdm105632177.my3w.com',
        port: '3306',
        username: 'qdm105632177',
        password: 'jin123654789',
    };
    // config.mysql = {
    //     // 单数据库信息配置
    //     client: {
    //         // host
    //         host: '172.16.1.121',
    //         // 端口号
    //         port: '3306',
    //         // 用户名
    //         user: 'rarcwx',
    //         // 密码
    //         password: 'password!66Rarcwx',
    //         // 数据库名
    //         database: 'wxdb',
    //     },
    //     // 是否加载到 app 上，默认开启
    //     app: true,
    //     // 是否加载到 agent 上，默认关闭
    //     agent: false,
    // };

    return config;
};




