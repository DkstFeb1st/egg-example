/*
 * 学习资料model
 * */
const moment = require('moment')
module.exports = app => {
    const {STRING, INTEGER, DATE, TEXT} = app.Sequelize
    return app.model.define('Study', {
        id: {
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: STRING(64),
        avator: STRING(8),
        fhtml: TEXT,
        authorcustno: STRING(7),
        authorname: STRING(16),
        authoravator: STRING(255),
        department: STRING(7),
        obligatory: STRING(32),
        elective: STRING(32),
        interest: STRING(8),
        state: STRING(8),
        type: STRING(8),
        desc: STRING(255),
        suit: STRING(64),
        category_id: INTEGER,
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
            createdWhere: function (dateparams) {
                return {
                    where: {
                        createdAt: {
                            $between: dateparams
                        }
                    }
                }
            },
            typeWhere: function (type) {
                return {
                    where: {
                        type: type
                    }
                }
            },
            stateWhere: function (state) {
                return {
                    where: {
                        state: state
                    }
                }
            },
            authorcustnoWhere: function (authorcustno) {
                return {
                    where: {
                        authorcustno: authorcustno
                    }
                }
            },
            titleWhere: function (title) {
                return {
                    where: {
                        title: {
                            $like: `%${title}%`
                        }
                    }
                }
            },
            departmentWhere: function (department) {
                return {
                    where: {
                        department: department
                    }
                }
            }
        },
        setterMethods: {//自定义属性
            rate: function (value) {
                this.setDataValue('rate', value);
            },
            progress: function (value) {
                return this.setDataValue('progress', value);
            }
        },
        getterMethods: {
            rate: function () {
                return parseFloat(this.getDataValue('rate')).toFixed(1);
            }
        },
        classMethods: {
            associate() {
                app.model.Study.hasMany(app.model.Comment, {
                    as: 'comments',
                    foreignKey: 'sp_id',
                    sourceKey: 'id'
                });
                app.model.Study.hasMany(app.model.Rate, {
                    as: 'rates',
                    foreignKey: 'sp_id',
                    sourceKey: 'id'
                })
                app.model.Study.hasMany(app.model.Viewlog, {
                    as: 'views',
                    foreignKey: 'sp_id',
                    sourceKey: 'id'
                })
                app.model.Study.hasMany(app.model.Love, {
                    as: 'loves',
                    foreignKey: 'sp_id',
                    sourceKey: 'id'
                })
                app.model.Study.hasMany(app.model.Top, {
                    as: 'tops',
                    foreignKey: 'sp_id',
                    sourceKey: 'id'
                })
                app.model.Study.hasMany(app.model.Category, {
                    as: 'categorys',
                    foreignKey: 'sp_id'
                })
            }
        },
        tableName: 'rl_sp_list',
    })
}
