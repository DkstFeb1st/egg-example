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
                //attributs : { include: [[app.Sequelize.fn('COUNT', app.Sequelize.col('comments')), 'comments_num']] },
                include: [
                    {model: this.ctx.model.Comment, as: 'comments', required: false, where: {rate: {$not: 0}}},
                    {model: this.ctx.model.Viewlog, as: 'views', required: false}
                ],
                where: {
                    obligatory: {
                        $like: `%${_job}%`,
                    }
                }
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
                    include: [
                        {model: this.ctx.model.Comment, as: 'comments', required: false, where: {rate: {$not: 0}}},
                        {model: this.ctx.model.Viewlog, as: 'views', required: false}
                    ],
                    where: {
                        interest: '0'
                    }
                })
                return electiveList
            } else {
                const electiveList = yield this.ctx.model.Study.findAll({
                    include: [
                        {model: this.ctx.model.Comment, as: 'comments', required: false, where: {rate: {$not: 0}}},
                        {model: this.ctx.model.Viewlog, as: 'views', required: false}
                    ],
                    where: {
                        elective: {
                            $like: `%${_job},%`,
                        }
                    }
                })
                return electiveList
            }

            return electiveList
        }

        /*获取兴趣课列表业务逻辑*/
        * getInterestList() {
            const interestList = yield this.ctx.model.Study.findAll({
                include: [
                    {model: this.ctx.model.Comment, as: 'comments', required: false, where: {rate: {$not: 0}}},
                    {model: this.ctx.model.Viewlog, as: 'views', required: false}
                ],
                where: {
                    interest: '1'
                }
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
                        where: {rate: {$not: 0}},
                        include: [
                            {model: this.ctx.model.Comment, as: 'subcomment', required: false}
                        ]
                    },
                    {model: this.ctx.model.Viewlog, as: 'views', required: false}
                ],
            })
            return spdetail
        }
    }
    return Study
}

