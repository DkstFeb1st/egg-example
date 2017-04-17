/**
 * Created by 1 on 2017/4/6.
 * 管理者表
 */

module.exports = app => {
    const {STRING, INTEGER, DATE, TEXT} = app.Sequelize
    return app.model.define('Cust', {
        account: {
            type: STRING(16),
            primaryKey: true,
        },
        pwd: STRING(255),
        name: STRING(16),
        department: STRING(8),
        role: STRING(16),
        state: STRING(8)
    }, {
        tableName: 'rl_sp_cust'
    })
}

