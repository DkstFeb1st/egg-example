/*
 * 学习资料服务
 * */
module.exports = app => {
    class Study extends app.Service {
        /*
         * 获取必修课列表业务逻辑
         * _job 1 用户岗位值
         * */
        * getObligatoryList(_job) {
            const obligatoryList = yield this.ctx.model.Study.findAll({
                attributes: {include: [[app.Sequelize.fn('COUNT', app.Sequelize.fn('DISTINCT', app.Sequelize.col('comments.id'))), 'comment_num'], [app.Sequelize.fn('COUNT', app.Sequelize.fn('DISTINCT', app.Sequelize.col('views.id'))), 'view_num']]},
                include: [
                    {
                        model: this.ctx.model.Comment,
                        as: 'comments',
                        required: false,
                        attributes: [],
                        where: {parentid: {$not: 0}}
                    },
                    {model: this.ctx.model.Viewlog, as: 'views', required: false, attributes: []}
                ],
                where: {
                    obligatory: {
                        $like: `%${_job}%`,
                    }
                },
                group: ['Study.id'],
            })
            return obligatoryList
        }

        /*
         * 获取选修课列表业务逻辑
         * _job 1 用户岗位值
         * */
        * getElectiveList(_job) {
            if (_job === '4,') {//非客户经理、科员、柜面，可查看除兴趣课之外的全部课程
                const electiveList = yield this.ctx.model.Study.findAll({
                    attributes: {include: [[app.Sequelize.fn('COUNT', app.Sequelize.fn('DISTINCT', app.Sequelize.col('comments.id'))), 'comment_num'], [app.Sequelize.fn('COUNT', app.Sequelize.fn('DISTINCT', app.Sequelize.col('views.id'))), 'view_num']]},
                    include: [
                        {
                            model: this.ctx.model.Comment,
                            as: 'comments',
                            required: false,
                            attributes: [],
                            where: {parentid: {$not: 0}}
                        },
                        {model: this.ctx.model.Viewlog, as: 'views', required: false, attributes: []}
                    ],
                    where: {
                        interest: '0'
                    },
                    group: ['Study.id']
                })
                return electiveList
            } else {
                const electiveList = yield this.ctx.model.Study.findAll({
                    attributes: {include: [[app.Sequelize.fn('COUNT', app.Sequelize.fn('DISTINCT', app.Sequelize.col('comments.id'))), 'comment_num'], [app.Sequelize.fn('COUNT', app.Sequelize.fn('DISTINCT', app.Sequelize.col('views.id'))), 'view_num']]},
                    include: [
                        {
                            model: this.ctx.model.Comment,
                            as: 'comments',
                            required: false,
                            attributes: [],
                            where: {parentid: {$not: 0}}
                        },
                        {model: this.ctx.model.Viewlog, as: 'views', required: false, attributes: []}
                    ],
                    where: {
                        elective: {
                            $like: `%${_job}%`,
                        }
                    },
                    group: ['Study.id']
                })
                return electiveList
            }

            return electiveList
        }

        /*获取兴趣课列表业务逻辑*/
        * getInterestList() {
            const interestList = yield this.ctx.model.Study.findAll({
                attributes: {include: [[app.Sequelize.fn('COUNT', app.Sequelize.fn('DISTINCT', app.Sequelize.col('comments.id'))), 'comment_num'], [app.Sequelize.fn('COUNT', app.Sequelize.fn('DISTINCT', app.Sequelize.col('views.id'))), 'view_num']]},
                include: [
                    {
                        model: this.ctx.model.Comment,
                        as: 'comments',
                        required: false,
                        attributes: [],
                        where: {parentid: {$not: 0}}
                    },
                    {model: this.ctx.model.Viewlog, as: 'views', required: false, attributes: []}
                ],
                where: {
                    interest: '1'
                },
                group: ['Study.id']
            })
            return interestList
        }

        * getStudyDetail(_id) {
            const spdetail = yield this.ctx.model.Study.findById(_id, {
                include: [
                    {
                        model: this.ctx.model.Comment,
                        as: 'comments',
                        required: false,
                        where: {parentid: 0},
                        attributes: {include: [[app.Sequelize.fn('COUNT', app.Sequelize.fn('DISTINCT', app.Sequelize.col('comments.subcomment.id'))), 'comment_num']]},
                        include: [
                            {model: this.ctx.model.Comment, as: 'subcomment', required: false, attributes: []}
                        ],

                    }
                ],
                group: ['comments.id']
            })
            return spdetail
        }
    }
    return Study
}

