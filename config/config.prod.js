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
        timezone: '+08.00'
    };
    return config;
};




