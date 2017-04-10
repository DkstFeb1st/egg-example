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
                    {model: this.ctx.model.Comment, as: 'subcomment', required: false}
                ]
            })
            return commentList
        }
    }
    return Comment
}
