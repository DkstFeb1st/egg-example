/**
 * Created by 1 on 2017/5/11.
 * 评论点赞模型
 */
var moment = require('moment')
module.exports = app => {
    const {STRING, INTEGER, DATE} = app.Sequelize
    return app.model.define('Top', {
        id: {
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userid: STRING(7),
        avatar: STRING(255),
        c_id: INTEGER,
        sp_id: INTEGER,
        name: STRING(64),
        gender: INTEGER,
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
        tableName: 'rl_spt_list'
    })
}
