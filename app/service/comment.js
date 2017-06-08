/**
 * 企业培训评论和点赞服务
 */
module.exports = app => {
    class Comment extends app.Service {
        /*
         * 获取评论列表 点赞数 子评论
         * 分为课程评论 总评论与子评论
         * */
        * getSpCommentList(_param) {
            let {id, sp_id, order} = _param
            let _scope = [];
            if (id) {
                const commentList = yield this.ctx.model.Comment.findById(id, {

                    include: [
                        {
                            model: this.ctx.model.Comment, as: 'subcomment', required: false, attributes: {
                            include: [[app.Sequelize.fn(
                                "COUNT",
                                app.Sequelize.fn(
                                    "DISTINCT",
                                    app.Sequelize.col("subcomment.top.id")
                                )
                            ),
                                "top_num"]]
                        }, include: [{
                            model: this.ctx.model.Top,
                            as: "top",
                            required: false,
                            attributes: []
                        }]
                        }, {
                            model: this.ctx.model.Top, as: 'top', required: false,
                        }
                    ],
                    group: ["subcomment.id", "top.id"],
                    order: order === 'hot' ? [[app.Sequelize.fn(
                        "COUNT",
                        app.Sequelize.fn(
                            "DISTINCT",
                            app.Sequelize.col("subcomment.top.id")
                        )
                    ), 'DESC']] : 'subcomment.createdAt DESC'
                })
                return commentList
            }
            if (sp_id) {
                _scope.push({
                    method: ["spidWhere", sp_id]
                })
                const commentList = yield this.ctx.model.Comment.scope(_scope).findAll({
                    attributes: {
                        include: [
                            [
                                app.Sequelize.fn(
                                    "COUNT",
                                    app.Sequelize.fn(
                                        "DISTINCT",
                                        app.Sequelize.col("subcomment.id")
                                    )
                                ),
                                "comment_num"
                            ],
                            [
                                app.Sequelize.fn(
                                    "COUNT",
                                    app.Sequelize.fn(
                                        "DISTINCT",
                                        app.Sequelize.col("top.id")
                                    )
                                ),
                                "top_num"
                            ],
                        ]
                    },
                    include: [
                        {
                            model: this.ctx.model.Comment,
                            as: "subcomment",
                            required: false
                        }, {
                            model: this.ctx.model.Top,
                            as: "top",
                            required: false
                        }
                    ],
                    where: {
                        parentid: 0
                    },
                    group: 'Comment.id',
                    order: order === 'hot' ? [[app.Sequelize.fn(
                        "COUNT",
                        app.Sequelize.fn(
                            "DISTINCT",
                            app.Sequelize.col("top.id")
                        )
                    ), 'DESC']] : 'Comment.createdAt DESC'
                })
                return commentList
            }

        }
        /*
         * 条件查询评论
         * userid : 被点评人userid
         * custno : 点评人id
         * */
        * getCommentListByWhere(_param) {
            let {userid, custno, parentid, id, sp_id} = _param
            let _scope = [];
            if (parentid) {
                _scope.push({
                    method: ["parentidWhere", parentid]
                })
            }
            if (sp_id) {
                _scope.push({
                    method: ["spidWhere", sp_id]
                })
            }
            if (id) {
                _scope.push({
                    method: ["idWhere", id]
                })
            }
            if (userid) {
                _scope.push({
                    method: ["useridWhere", userid]
                })
            }
            if (custno) {
                _scope.push({
                    method: ["custnoWhere", custno]
                })
            }
            const commentList = yield this.ctx.model.Comment.scope(_scope).findAll({
                order: "createdAt desc"
            });
            return commentList;
        }

        /*
         * 条件查询收藏
         * userid : 收藏人
         * custno : 被收藏人
         * */
        * getLoveListByWhere(_param) {
            let {userid, custno, sp_id} = _param
            let _scope = []
            if (userid) {
                _scope.push({
                    method: ['useridWhere', userid]
                })
            }
            if (custno) {
                _scope.push({
                    methode: ['custnoWhere', custno]
                })
            }
            if (sp_id) {
                _scope.push({
                    method: ['spidWhere', sp_id]
                })
            }
            const loveList = yield this.ctx.model.Love.scope(_scope).findAll({})
            return loveList
        }
        /*
         * 条件查询点赞
         * */
        * getTopListByWhere(_param) {
            let {userid, custno} = _param
            let _scope = [];
            if (userid) {
                _scope.push({
                    method: ["useridWhere", userid]
                })
            }
            if (custno) {
                _scope.push({
                    method: ["custnoWhere", custno]
                })
            }
            const TopList = yield this.ctx.model.Top.scope(_scope).findAll({
                order: "createdAt desc"
            });
            return TopList;
        }
    }
    return Comment
}
