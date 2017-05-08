/*
 * 学习资料服务
 * */
module.exports = app => {
    class Study extends app.Service {
        /*
         * 获取必修课列表业务逻辑
         * _job 1 用户岗位值
         * */
        *getObligatoryList(_job) {
            const obligatoryList = yield this.ctx.model.Study.findAll({
                attributes: {
                    include: [
                        [
                            app.Sequelize.fn(
                                "COUNT",
                                app.Sequelize.fn("DISTINCT", app.Sequelize.col("comments.id"))
                            ),
                            "comment_num"
                        ],
                        [
                            app.Sequelize.fn(
                                "COUNT",
                                app.Sequelize.fn("DISTINCT", app.Sequelize.col("views.id"))
                            ),
                            "view_num"
                        ]
                    ]
                },
                include: [
                    {
                        model: this.ctx.model.Comment,
                        as: "comments",
                        required: false,
                        attributes: [],
                        where: {parentid: {$not: 0}}
                    },
                    {
                        model: this.ctx.model.Viewlog,
                        as: "views",
                        required: false,
                        attributes: []
                    }
                ],
                where: {
                    obligatory: {
                        $like: `%${_job}%`
                    },
                    state: "3"
                },
                group: ["Study.id"]
            });
            return obligatoryList;
        }

        /*
         * 获取选修课列表业务逻辑
         * _job 1 用户岗位值
         * */
        *getElectiveList(_job) {
            if (_job === "4,") {
                //非客户经理、科员、柜面，可查看除兴趣课之外的全部课程
                const electiveList = yield this.ctx.model.Study.findAll({
                    attributes: {
                        include: [
                            [
                                app.Sequelize.fn(
                                    "COUNT",
                                    app.Sequelize.fn("DISTINCT", app.Sequelize.col("comments.id"))
                                ),
                                "comment_num"
                            ],
                            [
                                app.Sequelize.fn(
                                    "COUNT",
                                    app.Sequelize.fn("DISTINCT", app.Sequelize.col("views.id"))
                                ),
                                "view_num"
                            ]
                        ]
                    },
                    include: [
                        {
                            model: this.ctx.model.Comment,
                            as: "comments",
                            required: false,
                            attributes: [],
                            where: {parentid: {$not: 0}}
                        },
                        {
                            model: this.ctx.model.Viewlog,
                            as: "views",
                            required: false,
                            attributes: []
                        }
                    ],
                    where: {
                        interest: "0",
                        state: "3"
                    },
                    group: ["Study.id"]
                });
                return electiveList;
            } else {
                const electiveList = yield this.ctx.model.Study.findAll({
                    attributes: {
                        include: [
                            [
                                app.Sequelize.fn(
                                    "COUNT",
                                    app.Sequelize.fn("DISTINCT", app.Sequelize.col("comments.id"))
                                ),
                                "comment_num"
                            ],
                            [
                                app.Sequelize.fn(
                                    "COUNT",
                                    app.Sequelize.fn("DISTINCT", app.Sequelize.col("views.id"))
                                ),
                                "view_num"
                            ]
                        ]
                    },
                    include: [
                        {
                            model: this.ctx.model.Comment,
                            as: "comments",
                            required: false,
                            attributes: [],
                            where: {parentid: {$not: 0}}
                        },
                        {
                            model: this.ctx.model.Viewlog,
                            as: "views",
                            required: false,
                            attributes: []
                        }
                    ],
                    where: {
                        elective: {
                            $like: `%${_job}%`
                        },
                        state: "3"
                    },
                    group: ["Study.id"]
                });
                return electiveList;
            }

            return electiveList;
        }

        /*获取兴趣课列表业务逻辑*/
        *getInterestList() {
            const interestList = yield this.ctx.model.Study.findAll({
                attributes: {
                    include: [
                        [
                            app.Sequelize.fn(
                                "COUNT",
                                app.Sequelize.fn("DISTINCT", app.Sequelize.col("comments.id"))
                            ),
                            "comment_num"
                        ],
                        [
                            app.Sequelize.fn(
                                "COUNT",
                                app.Sequelize.fn("DISTINCT", app.Sequelize.col("views.id"))
                            ),
                            "view_num"
                        ]
                    ]
                },
                include: [
                    {
                        model: this.ctx.model.Comment,
                        as: "comments",
                        required: false,
                        attributes: [],
                        where: {parentid: {$not: 0}}
                    },
                    {
                        model: this.ctx.model.Viewlog,
                        as: "views",
                        required: false,
                        attributes: []
                    }
                ],
                where: {
                    interest: "1"
                },
                group: ["Study.id"]
            });
            return interestList;
        }

        /*
         * 获取资料详情
         * */
        *getStudyDetail(_id) {
            const spdetail = yield this.ctx.model.Study.findById(_id, {
                attributes: {
                    include: [
                        [app.Sequelize.fn("AVG", app.Sequelize.col("rates.rate")), "rate"]
                    ]
                },
                include: [
                    {
                        model: this.ctx.model.Comment,
                        as: "comments",
                        required: false,
                        where: {parentid: 0},
                        attributes: {
                            include: [
                                [
                                    app.Sequelize.fn(
                                        "COUNT",
                                        app.Sequelize.fn(
                                            "DISTINCT",
                                            app.Sequelize.col("comments.subcomment.id")
                                        )
                                    ),
                                    "comment_num"
                                ]
                            ]
                        },
                        include: [
                            {
                                model: this.ctx.model.Comment,
                                as: "subcomment",
                                required: false,
                                attributes: []
                            }
                        ]
                    },
                    {
                        model: this.ctx.model.Rate,
                        as: "rates",
                        required: false
                    }
                ],
                group: ["comments.id"]
            });
            return spdetail;
        }

        /*
         * 根据相应条件查询列表
         * state 状态
         * title 标题
         * authorcustno 上传柜员号
         * */
        *getSpList(_param) {
            let {title, authorcustno, department, state} = _param;
            let _scope = [];
            if (state) {
                _scope.push({
                    method: ["stateWhere", state]
                });
            }
            if (authorcustno) {
                _scope.push({
                    method: ["authorcustnoWhere", authorcustno]
                });
            }
            if (title) {
                _scope.push({
                    method: ["titleWhere", title]
                });
            }
            if (department) {
                _scope.push({
                    method: ["departmentWhere", department]
                });
            }
            console.log(_param);
            const spList = yield this.ctx.model.Study.scope(_scope).findAll({

                include: [
                    {

                        model: this.ctx.model.Rate,
                        as: "rates",
                        required: false,
                        group: ['rates.sp_id']
                    }
                ],
                order: "createdAt desc"
            });
            return spList;
        }

        /*
         * 修改学习资料逻辑
         * */
        *updateSp(_param) {
            return yield this.ctx.model.Study
                .update(_param, {
                    where: {
                        id: _param.id
                    }
                })
                .then(function (affectedCount) {
                    console.log(affectedCount[0]);
                    if (affectedCount[0] > 0) {
                        return true;
                    } else {
                        return false;
                    }
                });
        }

        /*
         * 创建学习资料逻辑
         * */
        *createSp(_param) {
            return yield this.ctx.model.Study.create(_param).then(function (sp) {
                if (sp) {
                    return sp;
                } else {
                    return false;
        }
            });
    }
    }
    return Study;
};
