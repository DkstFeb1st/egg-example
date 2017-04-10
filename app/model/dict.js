/**
 * Created by 1 on 2017/4/6.
 * 公用字典模型
 */

module.exports = app => {
    const {STRING, INTEGER, DATE, TEXT} = app.Sequelize
    return app.model.define('Dict', {
        value: {
            type: STRING(8),
            primaryKey: true,
        },
        label: STRING(32),
        type: {
            type: STRING(8),
            primaryKey: true,
        },
        state: STRING(8)
    }, {
        tableName: 'rl_sp_dict'
    })

}

