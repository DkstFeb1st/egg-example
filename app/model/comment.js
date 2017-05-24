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
        sp_id: INTEGER,
        userid: STRING(7),
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
        scopes: {
            useridWhere: function (userid) {
                return {
                    where: {
                        userid: userid
                    }
                }
            },
            custnoWhere: function (custno) {
                return {
                    where: {
                        custno: custno
                    }
                }
            },
        },
        classMethods: {
            associate() {
                app.model.Comment.hasMany(app.model.Comment, {
                    as: 'subcomment',
                    foreignKey: 'parentid',
                    sourceKey: 'id'
                });
                app.model.Comment.hasMany(app.model.Top, {
                    as: 'top',
                    foreignKey: 'c_id',
                    sourceKey: 'id'
                })
            }
        },
        tableName: 'rl_spc_list'
    })
}