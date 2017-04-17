/*
 * 学习资料model
 * */

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
        // createdAt: {
        //     type : STRING,
        //     get  : function()  {
        //         let createdAt = this.getDataValue('createdAt')
        //         console.log(createdAt)
        //         return createdAt.replace('T', ' ').slice(0, 19)
        //     },
        // }
    }, {
        scopes: {
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
            }
        },
        classMethods: {
            associate() {
                app.model.Study.hasMany(app.model.Comment, {
                    as: 'comments',
                    foreignKey: 'sp_id',
                    sourceKey: 'id'
                });
                app.model.Study.hasMany(app.model.Viewlog, {
                    as: 'views',
                    foreignKey: 'sp_id',
                    sourceKey: 'id'
                })
            }
        },
        tableName: 'rl_sp_list',
    })
}
