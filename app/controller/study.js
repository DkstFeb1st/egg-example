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
            let {id} = this.ctx.request.body
            let spdetail = yield this.ctx.service.study.getStudyDetail(id)
            this.ctx.body = {status: 200, spdetail: spdetail}
            //增加浏览次数
            let that = this
            let view_log = {
                sp_id: id,
                custno: this.ctx.session.userinfo.userid
            }
            yield this.ctx.model.Viewlog.create(view_log, {
                isNewRecord: true
            }).then(function (viewlog) {
                if (viewlog) {
                    that.ctx.status = 200
                }
            })
        }

        /**
         * 实时预览接口
         * */
        * viewSpDetail() {
            let {id} = this.ctx.query
            let spdetail = yield this.ctx.service.study.getStudyDetail(id)
            this.ctx.body = {status: 200, spdetail: spdetail}
            this.ctx.status = 200
        }
        /*admin*/
        /*根据条件筛选学习资料*/
        * getSpList() {
            app.logger.info('后台查询操作')
            let spList = yield this.ctx.service.study.getSpList(this.ctx.query)
            for (let i = 0; i < spList.length; i++) {

                if (!spList[i].rates || spList[i].rates.length === 0) {
                    let score = 5;
                    spList[i].rate = score
                } else {
                    let score = 0;
                    spList[i].rates.map((obj, index) => {
                        score = score + obj.rate
                    })
                    spList[i].rate = (score / spList[i].rates.length).toFixed(1)
                }
            }
            this.ctx.body = {status: 200, spList: spList}
            this.ctx.status = 200
        }

        /*修改操作*/
        * doUpdate() {
            app.logger.info('学习资料修改操作')
            const result = yield this.ctx.service.study.updateSp(this.ctx.request.body)
            if (result) {
                let log = this.ctx.request.body.log
                const logresult = yield this.ctx.service.log.doCreate(log)
                if (logresult) {
                    this.ctx.body = {status: 200, msg: '修改成功'}
                    this.ctx.status = 200
                } else {
                    this.ctx.body = {status: 205, msg: '修改异常'}
                    this.ctx.status = 200
                }
            } else {
                this.ctx.body = {status: 205, msg: '修改异常'}
                this.ctx.status = 200
            }
        }

        /*创建操作*/
        * doCreate() {
            app.logger.info('学习资料创建操作')
            const userinfo = this.ctx.session.userinfo
            const _request = this.ctx.request.body
            const _param = Object.assign({}, _request, {
                authorcustno: userinfo.userid,
                authorname: userinfo.name,
                authoravator: userinfo.avatar,
                state: 1
            })
            for (let key in _param) {
                if (!_param[key]) {
                    this.ctx.body = {status: 201, msg: '参数错误'}
                    this.ctx.status = 200
                }
            }
            const result = yield this.ctx.service.study.createSp(_param)
            if (result) {
                let log = this.ctx.request.body.log
                log = Object.assign({}, log, {
                    sp_id: result.id
                })
                const logresult = yield this.ctx.service.log.doCreate(log)
                if (logresult) {
                    this.ctx.body = {status: 200, msg: '操作成功'}
                    this.ctx.status = 200
                } else {
                    this.ctx.body = {status: 202, msg: '插入异常'}
                    this.ctx.status = 200
                }
            } else {
                this.ctx.body = {status: 202, msg: '插入异常'}
                this.ctx.status = 200
            }
        }
    }
    return StudyController;
};
