/**
 * Created by 1 on 2017/5/3.
 * 文件模型
 */
var moment = require('moment')
module.exports = app => {
    const {STRING, INTEGER, DATE, FLOAT} = app.Sequelize
    return app.model.define('Document', {
        id: {
            type: INTEGER,
            primaryKey: true
        },
        userid: STRING(7),
        name: STRING(32),
        url: STRING(255),
        type: STRING(64),
        size: FLOAT(5, 2),
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
        tableName: 'rl_sp_document'
    })
}
