/**
 * 浏览记录模型
 */
module.exports = app => {
    const {STRING, INTEGER, DATE, TEXT} = app.Sequelize
    return app.model.define('Viewlog', {
        sp_id: {
            type: INTEGER,
            primaryKey: true
        },
        custno: {
            type: STRING(7),
            primaryKey: true
        },
        createdAt: {
            type: DATE,
            primaryKey: true
        }
    }, {
        tableName: 'rl_spv_list'
    })
}
