/**
 * 学习资料评论服务
 */
module.exports = app => {
    class Comment extends app.Service {
        /*
         * 获取评论以及子评论
         * */
        * getCommentList(_id) {
            const commentList = yield this.ctx.model.Comment.findById(_id, {

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
                order: "subcomment.createdAt DESC"
            })
            return commentList
        }

        /*
         * 条件查询评论
         * userid : 被点评人userid
         * custno : 点评人id
         * */
        * getCommentListByWhere(_param) {
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
            const commentList = yield this.ctx.model.Comment.scope(_scope).findAll({
                order: "createdAt desc"
            });
            return commentList;
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
