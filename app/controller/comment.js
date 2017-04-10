/**
 * Created by 1 on 2017/4/9.
 */

module.exports = app => {
    class CommentController extends app.Controller {
        /*
         * 获取评论与子评论
         * */
        * getCommentList() {
            const {id} = this.ctx.query
            const commentList = yield this.ctx.service.comment.getCommentList(id)
            this.ctx.body = {commentList: commentList}
            this.ctx.status = 200
        }

        /*
         * 创建评论
         * */
        * create() {
            let that = this
            const _param = this.ctx.request.body
            if (_param.content === '') {
                this.ctx.body = '请填写评论内容'
                this.ctx.status = 201
                return
            }
            yield this.ctx.model.Comment.create(_param, {
                isNewRecord: true
            }).then(function (comment) {
                if (comment) {
                    that.ctx.status = 200
                } else {
                    that.ctx.body = '插入异常'
                    that.ctx.status = 202
                }
            })
        }
    }
    return CommentController
}