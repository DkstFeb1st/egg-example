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
    }
    return Comment
}
