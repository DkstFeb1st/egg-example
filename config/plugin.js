'use strict';

// had enabled by egg
// exports.static = true;

// config/plugin.js
exports.mysql = {
    enable: true,
    package: 'egg-mysql',
};
exports.sequelize = {
    enable: true,
    package: 'egg-sequelize'
}
exports.validate = {
    enable: true,
    package: 'egg-validate',
}

exports.ejs = {
    enable: true,
    package: 'egg-view-ejs',
};
