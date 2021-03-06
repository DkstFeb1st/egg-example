/**
 * Created by 1 on 2017/4/9.
 * 评论点赞模块
 */

module.exports = app => {
    class CommentController extends app.Controller {
        /*
         * 获取评论与子评论
         * */
        * getCommentList() {
            const {id, order, sp_id} = this.ctx.query
            if (sp_id) {
                var commentList = yield this.ctx.service.comment.getSpCommentList({sp_id: sp_id, order: order})
            }
            if (id) {
                var commentList = yield this.ctx.service.comment.getSpCommentList({id: id, order: order})
            }
            let tops_rs = yield app.model.Top.findAll({
                where: {
                    userid: this.ctx.session.userinfo.userid
                }
            })
            let tops = [];
            tops_rs.map((obj, index) => {
                tops.push(obj.c_id)
            })
            this.ctx.body = {status: 200, commentList: commentList, tops: tops}
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
            //添加xss防护
            _param = Object.assign({}, _param, {
                name: name,
                avator: avatar,
                userid: userid,
                content: this.ctx.helper.escape(this.ctx.request.body.content)
            })
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

        /*
         * 创建文章点赞
         * */
        * createTop() {
            let that = this
            let _param = this.ctx.request.body
            let {name, userid, avatar, gender} = this.ctx.session.userinfo

            //添加评论用户信息
            _param = Object.assign({}, _param, {
                userid: userid,
                avatar: avatar,
                name: name,
                gender: gender,
                custno: _param.userid
            })
            let _top = yield this.ctx.model.Top.findOne({
                where: {
                    userid: userid,
                    sp_id: _param.sp_id
                }
            })
            if (_top) {
                that.ctx.body = {status: 202, msg: '您已经赞过了'}
                that.ctx.status = 200
            } else {
                yield this.ctx.model.Top.create(_param, {
                    isNewRecord: true
                }).then(function (top) {
                    if (top) {
                        that.ctx.body = {status: 200, msg: '点赞成功'}
                        that.ctx.status = 200
                    } else {
                        that.ctx.body = {status: 202, msg: '操作异常'}
                        that.ctx.status = 200
                    }
                })
            }
        }
        /*
         * 创建点赞
         * */
        * addTop() {
            let that = this
            let _param = this.ctx.request.body
            let {name, userid, avatar, gender} = this.ctx.session.userinfo

            //添加评论用户信息
            _param = Object.assign({}, _param, {
                custno: _param.userid,
                avatar: avatar,
                name: name,
                gender: gender
            })
            let _top = yield this.ctx.model.Top.findOne({
                where: {
                    userid: userid,
                    c_id: _param.c_id
                }
            })
            if (_top) {
                that.ctx.body = {status: 202, msg: '您已经赞过了'}
                that.ctx.status = 200
            } else {
                yield this.ctx.model.Top.create(_param, {
                    isNewRecord: true
                }).then(function (top) {
                    if (top) {
                        that.ctx.body = {status: 200, msg: '点赞成功'}
                        that.ctx.status = 200
                    } else {
                        that.ctx.body = {status: 202, msg: '操作异常'}
                        that.ctx.status = 200
                    }
                })
            }
        }

        /*
         * 创建或取消收藏
         * */
        * addOrDeleteLove() {
            let _param = this.ctx.request.body
            let {name, userid, avatar, gender} = this.ctx.session.userinfo

            //添加评论用户信息
            _param = Object.assign({}, _param, {
                userid: userid
            })
            let _love = yield this.ctx.model.Love.findOne({
                where: {
                    userid: userid,
                    sp_id: _param.sp_id
                }
            })
            let that = this
            if (_love) {//取消收藏
                const result = yield this.ctx.model.Love.destroy({
                    where: {
                        userid: userid,
                        sp_id: _param.sp_id
                    }
                })
                if (result > 0) {
                    this.ctx.body = {status: 200, msg: '取消收藏成功'}
                    this.ctx.status = 200
                } else {
                    this.ctx.body = {status: 202, msg: '操作异常'}
                    this.ctx.status = 200
                }
            } else {//添加收藏
                yield this.ctx.model.Love.create(_param, {
                    isNewRecord: true
                }).then(function (love) {
                    if (love) {
                        that.ctx.body = {status: 200, msg: '添加收藏成功'}
                        that.ctx.status = 200
                    } else {
                        that.ctx.body = {status: 202, msg: '操作异常'}
                        that.ctx.status = 200
                    }
                })
            }
        }
        /*
         * 获取评论点赞列表
         * param id 评论id
         * */
        * getTopList() {
            let {c_id} = this.ctx.query
            const topList = yield this.ctx.model.Top.findAll({
                where: {
                    c_id: c_id
                }
            })
            this.ctx.body = {status: 200, topList: topList}
            this.ctx.status = 200
        }

        /*
         * 获取用户获评数量
         * */

        * getCommentedList(userid) {
            yield this.ctx.model.Comment.count({
                where: {}
            })
        }
    }
    return CommentController
}