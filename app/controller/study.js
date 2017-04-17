/*
 * 学习资料逻辑类
 * */
'use strict';
const moment = require('moment')
module.exports = app => {
    class StudyController extends app.Controller {
        * getObligatoryList() {
            //获取必修课
            const _job = this.ctx.session.userinfo.position
            const obligatoryList = yield this.ctx.service.study.getObligatoryList(_job)
            this.ctx.body = {status: 200, obligatoryList: obligatoryList}
            this.ctx.status = 200;
        }

        * getElectiveList() {
            //获取选修课
            const _job = this.ctx.session.userinfo.position
            const electiveList = yield this.ctx.service.study.getElectiveList(_job)
            this.ctx.body = {status: 200, electiveList: electiveList}
            this.ctx.status = 200;
        }

        * getInterestList() {
            //获取兴趣课
            const _job = '1'
            const interestList = yield this.ctx.service.study.getInterestList()
            this.ctx.body = {status: 200, interestList: interestList}
            this.ctx.status = 200
        }

        /**
         * 实时返回详情记录
         * 增加学习资料访问次数
         * */
        * getSpDetail() {
            const zhNow = moment().locale('zh-cn').utcOffset(8).format('YYYY-MM-DD HH:mm:ss');
            let {id} = this.ctx.request.body
            let spdetail = yield this.ctx.service.study.getStudyDetail(id)
            let score = 0;
            if (spdetail.comments.length === 0) {
                spdetail.rate = score
            } else {
                spdetail.comments.map((obj, index) => {
                    score = score + obj.rate
                })
                spdetail.rate = (score / spdetail.comments.length).toFixed(1)
            }
            this.ctx.body = {status: 200, spdetail: spdetail}
            //增加浏览次数
            let that = this
            let view_log = {
                sp_id: id,
                custno: this.ctx.session.userinfo.userid,
                createdAt: zhNow
            }
            yield this.ctx.model.Viewlog.create(view_log, {
                isNewRecord: true
            }).then(function (viewlog) {
                if (viewlog) {
                    that.ctx.status = 200
                }
            })
        }

        /*admin*/
        /*根据条件筛选学习资料*/
        * getSpList() {
            app.logger.info('后台查询操作')
            let spList = yield this.ctx.service.study.getSpList(this.ctx.query)
            this.ctx.body = {status: 200, spList: spList}
            this.ctx.status = 200
        }

        /*修改操作*/
        * doUpdate() {
            app.logger.info('后台修改操作')
            const result = yield this.ctx.service.study.updateSp(this.ctx.request.body)
            if (result) {
                this.ctx.body = {status: 200, msg: '修改成功'}
                this.ctx.status = 200
            } else {
                this.ctx.body = {status: 205, msg: '修改异常'}
                this.ctx.status = 200
            }
        }
    }
    return StudyController;
};
