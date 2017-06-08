/**
 * 浏览记录模型
 */
var moment = require('moment')
module.exports = app => {
    const {STRING, INTEGER, DATE} = app.Sequelize
    return app.model.define('Viewlog', {
        id: {
            type: INTEGER,
            primaryKey: true
        },
        sp_id: INTEGER,
        custno: STRING(7),
        serial: STRING(16),
        fsp_id: INTEGER,
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
            fspidWhere: function (fsp_id) {
                return {
                    where: {
                        fsp_id: fsp_id
                    }
                }
            },
            spidWhere: function (sp_id) {
                return {
                    where: {
                        sp_id: sp_id
                    }
                }
            },
            custnoWhere: function (custno) {
                return {
                    where: {
                        custno: custno
                    }
                }
            }
        },
        getterMethods: {
            coursenum: function () {
                return parseFloat(this.getDataValue('coursenum')).toFixed(2);
            },
            progress: function () {
                return parseFloat(this.getDataValue('progress')).toFixed(2) * 100;
            },
            view_num: function () {
                return this.getDataValue('view_num')
            }
        },
        setterMethods: {
            progress: function (value) {
                return this.setDataValue('progress', value);
            }
        },
        classMethods: {
            associate() {
                app.model.Viewlog.belongsTo(app.model.Study, {
                    as: 'study',
                    foreignKey: 'sp_id'
                });
            }
        },
        tableName: 'rl_spv_list'
    })
}
