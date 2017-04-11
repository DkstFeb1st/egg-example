/**
 * 浏览记录模型
 */
module.exports = app => {
    const {STRING, INTEGER, DATE, TEXT} = app.Sequelize
    return app.model.define('Viewlog', {
        id: {
            type: INTEGER,
            primaryKey: true
        },
        sp_id: INTEGER,
        custno: STRING(7),
        createdAt: DATE
    }, {
        tableName: 'rl_spv_list'
    })
}
