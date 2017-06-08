/**
 * Created by 1 on 2017/5/30.
 * 系列课程目录模型
 */

var moment = require('moment')
module.exports = app => {
    const {STRING, INTEGER, DATE} = app.Sequelize
    return app.model.define('Category', {
        id: {
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        sp_id: INTEGER,
        name: STRING(64),
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
                return moment(this.getDataValue('updatedAt')).locale('zh-cn').utcOffset(8).format('YYYY-MM-DD HH:mm:ss');
            },
        }
    }, {
        classMethods: {
            associate() {
                app.model.Category.hasMany(app.model.Study, {
                    as: 'courses',
                    foreignKey: 'category_id',
                    sourceKey: 'id'
                });
            }
        },
        tableName: 'rl_sp_category'
    })
}