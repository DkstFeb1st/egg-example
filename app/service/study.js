/*
 * 学习资料服务
 * */
const moment = require('moment')
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
                        where: {parentid: 0}
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
                    state: "3",
                    type: {
                        $ne: '3'
                    }
                },
                group: ["Study.id"],
                order: 'createdAt DESC'
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
                            where: {parentid: 0}
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
                        state: "3",
                        type: {
                            $ne: '3'
                        }
                    },
                    group: ["Study.id"],
                    order: 'createdAt DESC'
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
                            where: {parentid: 0}
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
                        state: "3",
                        type: {
                            $ne: '3'
                        }
                    },
                    group: ["Study.id"],
                    order: 'createdAt DESC'
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
                        where: {parentid: 0}
                    },
                    {
                        model: this.ctx.model.Viewlog,
                        as: "views",
                        required: false,
                        attributes: []
                    },

                ],
                where: {
                    interest: "1",
                    state: "3",
                    type: {
                        $ne: '3'
                    }
                },
                group: ["Study.id"],
                order: 'createdAt DESC'
            });
            return interestList;
        }

        /*
         * 获取课程详情 包括 评分 点赞次数 学习人数
         * */
        *getStudyDetail(_id) {
            const spdetail = yield this.ctx.model.Study.findById(_id, {
                attributes: {
                    include: [
                        [app.Sequelize.fn("AVG", app.Sequelize.col("rates.rate")), "rate"],
                        [app.Sequelize.fn("COUNT", app.Sequelize.fn("DISTINCT", app.Sequelize.col("tops.id"))), "topnum"],
                        [app.Sequelize.fn("COUNT", app.Sequelize.fn("DISTINCT", app.Sequelize.col("views.id"))), "viewnum"]
                    ]
                },
                include: [
                    {
                        model: this.ctx.model.Rate,
                        as: "rates",
                        required: false
                    },
                    {
                        model: this.ctx.model.Top,
                        as: "tops",
                        required: false
                    },
                    {
                        model: this.ctx.model.Viewlog,
                        as: "views",
                        required: false
                    }
                ],

            });
            return spdetail;
        }

        /*
         * 根据相应条件查询列表及总数
         * state 状态
         * title 标题
         * authorcustno 上传柜员号
         * type 课程类型
         * pageSize 页面大小
         * current 当前页面
         * */
        *getSpList(_param) {
            let {title, authorcustno, department, state, type, pageSize, current, createdAt} = _param;
            let offset = (current - 1) * pageSize;
            let _scope = [];
            if (createdAt) {
                let dateparams = createdAt.split(",")
                _scope.push({
                    method: ["createdWhere", dateparams]
                })
            }
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
            if (type) {
                _scope.push({
                    method: ["typeWhere", type]
                })
            }
            const spList = yield this.ctx.model.Study.scope(_scope).findAndCountAll({
                include: [
                    {
                        model: this.ctx.model.Rate,
                        as: "rates",
                        required: false
                    },
                    {
                        model: this.ctx.model.Comment,
                        as: "comments",
                        required: false,
                        where: {
                            parentid: 0,
                        },

                    },
                    {
                        model: this.ctx.model.Top,
                        as: "tops",
                        required: false,

                    },
                    {
                        model: this.ctx.model.Viewlog,
                        as: "views",
                        required: false,

                    }
                ],
                offset: offset,
                limit: parseInt(pageSize),
                group: ["Study.id"],
                order: "createdAt desc"
            });
            return spList;
        }

        *getSpListByWhere(_param) {
            let {title, authorcustno, department, state, type, pageSize, current, createdAt} = _param;
            let _scope = [];
            if (createdAt) {
                let dateparams = createdAt.split(",")
                _scope.push({
                    method: ["createdWhere", dateparams]
                })
            }
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
            if (type) {
                _scope.push({
                    method: ["typeWhere", type]
                })
            }
            return yield this.ctx.model.Study.scope(_scope).findAll({})
        }

        /*
         * 根据浏览获取课程列表
         * */
        * getStudyByView(_param) {
            let {userid} = _param
            return yield app.model.Viewlog.findAll({
                attributes: {
                    include: [
                        [
                            app.Sequelize.fn(
                                "COUNT",
                                app.Sequelize.fn(
                                    "DISTINCT",
                                    app.Sequelize.col("study.categorys.courses.id")
                                )
                            ),
                            "coursenum"
                        ]
                    ]
                },
                include: [
                    {
                        model: this.ctx.model.Study,
                        as: "study",
                        required: false,
                        include: [
                            {
                                model: this.ctx.model.Category,
                                as: "categorys",
                                required: false,
                                attributes: [],
                                include: [
                                    {
                                        model: this.ctx.model.Study,
                                        as: "courses",
                                        required: false,
                                        attributes: []
                                    }
                                ]
                            }
                        ]
                    }
                ],
                where: {
                    custno: userid,
                    serial: "1"
                },
                group: "study.id"
            });
        }

        /*
         * 根据收藏获取课程列表
         * */
        *getStudyByLove(_param) {
            let {userid} = _param
            return yield this.ctx.model.Love.findAll({
                include: [
                    {
                        model: this.ctx.model.Study,
                        as: "study",
                        required: false,
                    }
                ],
                where: {
                    userid: userid
                }
            })
        }

        /*
         * 获取课程各个人员学习进度
         * */
        *getStudyProgress(_id) {
            let result = yield this.ctx.model.Study.findById(_id, {
                include: [
                    {
                        model: this.ctx.model.Viewlog,
                        as: "views",
                        required: false,
                        where: {
                            serial: {
                                $ne: '1'
                            }
                        }
                    }
                ],
            })
            return result
        }
        /*
         * 修改学习资料逻辑
         * */
        *updateSp(_param) {
            const t = yield this.ctx.model.transaction();
            try {
                const result = yield this.ctx.model.Study
                    .update(_param, {
                        where: {
                            id: _param.id
                        }
                    }, {transaction: t})
                let log = Object.assign({}, _param.log, {
                    sp_id: _param.log.sp_id
                });
                const logresult = yield this.ctx.model.Log.create(log, {transaction: t})
                yield t.commit()
                return true
            } catch (err) {
                console.log(err)
                yield t.rollback
                return false
            }
        }

        /*
         * 创建学习资料逻辑
         * */
        *createSp(_param) {
            const t = yield this.ctx.model.transaction();
            try {
                const sp = yield this.ctx.model.Study.create(_param).then(function (sp) {
                    if (sp) {
                        return sp;
                    } else {
                        return false;
                    }
                });
                let log = Object.assign({}, _param.log, {
                    sp_id: sp.id
                });
                const logresult = yield this.ctx.model.Log.create(log, {transaction: t})
                yield t.commit()
                return sp
            } catch (err) {
                yield t.rollback
                return false
            }

    }
    }
    return Study;
};
