/**
 * Created by 1 on 2017/6/6.
 */

module.exports = app => {
    class Viewlog extends app.Service {
        * getViewlogListByWhere(_param) {
            let {fsp_id, sp_id, custno} = _param
            let _scope = []
            if (fsp_id) {
                _scope.push({
                    method: ['fspidWhere', fsp_id]
                })
            }
            if (sp_id) {
                _scope.push({
                    method: ['spidWhere', sp_id]
                })
            }
            if (custno) {
                _scope.push({
                    method: ['custnoWhere', custno]
                })
            }
            return yield this.ctx.model.Viewlog.scope(_scope).findAll({})
        }

        *getViewlogByStudy(_id, total) {
            const result = yield this.ctx.model.Viewlog.findAll({
                attributes: {
                    include: [
                        [
                            app.Sequelize.fn(
                                "COUNT",
                                app.Sequelize.fn("DISTINCT", app.Sequelize.col("sp_id"))
                            ),
                            "view_num"
                        ],
                    ]
                },
                where: {
                    fsp_id: _id,
                    $or: [
                        {
                            serial: ''
                        },
                        {
                            serial: null
                        }
                    ]
                },
                group: 'custno'
            })
            for (let i = 0; i < result.length; i++) {
                console.log(result[i].getDataValue('view_num') / total)
                result[i].progress = result[i].getDataValue('view_num') / total
            }
            return result
        }
    }
    return Viewlog
}
