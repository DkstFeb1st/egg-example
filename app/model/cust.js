/**
 * Created by 1 on 2017/4/6.
 * 管理者表
 */
var moment = require('moment')
module.exports = app => {
    const {STRING, INTEGER, DATE, TEXT} = app.Sequelize
    return app.model.define('Cust', {
        account: {
            type: STRING(16),
            primaryKey: true,
        },
        pwd: STRING(255),
        name: STRING(16),
        department: STRING(8),
        role: STRING(16),
        state: STRING(8),
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
        tableName: 'rl_sp_cust'
    })
}

