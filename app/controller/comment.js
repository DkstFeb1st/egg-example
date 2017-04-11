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
            this.ctx.body = {status: 200, commentList: commentList}
            this.ctx.status = 200
        }

        /*
         * 创建评论
         * */
        * create() {
            let that = this
            let _param = this.ctx.request.body
            let {name, userid, avatar} = this.ctx.session.userinfo
            if (_param.content === '') {
                this.ctx.body = {status: 201, msg: '请填写评论内容'}
                this.ctx.status = 200
                return
            } else if (_param.parentid === '0' && _param.rate === 0) {
                this.ctx.body = {status: 201, msg: '亲，请为我打分'}
                this.ctx.status = 200
                return
            }
            _param = Object.assign({}, _param, {
                name: name,
                avator: avatar,
                custno: userid,
            })
            console.log(_param);
            yield this.ctx.model.Comment.create(_param, {
                isNewRecord: true
            }).then(function (comment) {
                if (comment) {
                    that.ctx.body = {status: 200}
                    that.ctx.status = 200
                } else {
                    that.ctx.body = {status: 202, msg: '插入异常'}
                    that.ctx.status = 200
                }
            })
        }
    }
    return CommentController
}