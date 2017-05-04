/*
 * 学习评论模型
 * */
var moment = require('moment')
module.exports = app => {
    const {STRING, INTEGER, DATE} = app.Sequelize
    return app.model.define('Comment', {
        id: {
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        custno: STRING(7),
        name: STRING(16),
        avator: STRING(255),
        rate: INTEGER,
        sp_id: INTEGER,
        state: {
            type: STRING(8),
            defaultValue: '1'
        },
        content: STRING(255),
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
        classMethods: {
            associate() {
                app.model.Comment.hasMany(app.model.Comment, {
                    as: 'subcomment',
                    foreignKey: 'parentid',
                    sourceKey: 'id'
                });
            }
        },
        tableName: 'rl_spc_list'
    })
}