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
            }
            //添加评论用户信息
            _param = Object.assign({}, _param, {
                name: name,
                avator: avatar,
                custno: userid,
            })
            console.log(_param);
            yield this.ctx.model.Comment.create(_param, {
                isNewRecord: true
            }).then(function (comment) {
                console.log(comment);
                if (comment) {
                    that.ctx.body = {status: 200, msg: '评论成功'}
                    that.ctx.status = 200
                } else {
                    that.ctx.body = {status: 202, msg: '插入异常'}
                    that.ctx.status = 200
                }
            })
        }
        /*
         * 创建评分
         * */
        * addRate() {
            let that = this
            let _param = this.ctx.request.body
            let {name, userid, avatar} = this.ctx.session.userinfo
            if (_param.rate === 0) {
                this.ctx.body = {status: 201, msg: '亲，请为我打分'}
                this.ctx.status = 200
                return
            }
            //添加评论用户信息
            _param = Object.assign({}, _param, {
                userid: userid,
            })
            let _rate = yield this.ctx.model.Rate.findOne({
                where: {
                    userid: userid,
                    sp_id: _param.sp_id
                }
            })
            if (_rate) {
                that.ctx.body = {status: 202, msg: '不能重复评分'}
                that.ctx.status = 200
            } else {
                yield this.ctx.model.Rate.create(_param, {
                    isNewRecord: true
                }).then(function (comment) {
                    if (comment) {
                        that.ctx.body = {status: 200, msg: '评分成功'}
                        that.ctx.status = 200
                    } else {
                        that.ctx.body = {status: 202, msg: '插入异常'}
                        that.ctx.status = 200
                    }
                })
            }

        }
    }
    return CommentController
}