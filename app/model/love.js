/**
 * Created by 1 on 2017/6/6.
 * 收藏模型
 */
const moment = require('moment')
module.exports = app => {
    const {STRING, INTEGER, DATE, TEXT} = app.Sequelize
    return app.model.define('Love', {
        id: {
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        sp_id: INTEGER,
        userid: STRING(7),
        custno: STRING(7),
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
            spidWhere: function (sp_id) {
                return {
                    where: {
                        sp_id: sp_id
                    }
                }
            }
        },
        classMethods: {
            associate() {
                app.model.Love.belongsTo(app.model.Study, {
                    as: 'study',
                    foreignKey: 'sp_id'
                });
            }
        },
        tableName: 'rl_spl_list'
    })
}
