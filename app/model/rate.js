/**
 * Created by 1 on 2017/5/8.
 * 评分模块
 */
const moment = require('moment')
module.exports = app => {
    const {STRING, INTEGER, DATE, TEXT} = app.Sequelize
    return app.model.define('Rate', {
        sp_id: {
            type: INTEGER,
            primaryKey: true,
        },
        userid: {
            type: STRING(7),
            primaryKey: true,
        },
        custno: STRING(7),
        rate: INTEGER,
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
        tableName: 'rl_sp_rate',
    })
}
