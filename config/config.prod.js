'use strict';
const path = require('path');
/*默认的配置文件,所有环境都会加载这个配置文件，一般也会作为开发环境的默认配置文件。*/
module.exports = appInfo => {
    const config = {};

    //生产数据库配置
    //数据库配置
    config.sequelize = {
        dialect: 'mysql', // support: mysql, mariadb, postgres, mssql
        database: 'wxdb',
        host: '172.16.30.2',
        port: '3306',
        username: 'rarcwx',
        password: 'password!66Rarcwx',
        timezone: '+08:00'
    };
    config.helper = {
        shtml: {
            "domainWhiteList": ['app.rarcbank.com'],
            "whiteList": {"iframe": [], "source": []}
        }
    }
    return config;
};




