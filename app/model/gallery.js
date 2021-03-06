/**
 * 图库模型
 */
var moment = require('moment')
module.exports = app => {
    const {STRING, INTEGER, DATE, FLOAT} = app.Sequelize
    return app.model.define('Gallery', {
        id: {
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: STRING(32),
        jpgurl: STRING(255),
        webpurl: STRING(255),
        userid: STRING(7),
        hw: FLOAT(4, 2),
        createdAt: {
            type: DATE,
            get: function () {
                // 'this' allows you to access attributes of the instance
                return moment(this.getDataValue('createdAt')).locale('zh-cn').utcOffset(8).format('YYYY-MM-DD HH:mm:ss');
            },
        },
        updatedAt: {
            type: DATE,
            get: function () {
                // 'this' allows you to access attributes of the instance
                return moment(this.getDataValue('updateAt')).locale('zh-cn').utcOffset(8).format('YYYY-MM-DD HH:mm:ss');
            },
        }
    }, {
        tableName: 'rl_sp_gallery'
    })
}
