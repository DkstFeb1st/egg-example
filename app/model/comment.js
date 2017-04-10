/*
 * 学习评论模型
 * */
module.exports = app => {
    const {STRING, INTEGER, DATE, TEXT} = app.Sequelize
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
        createdAt: DATE
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