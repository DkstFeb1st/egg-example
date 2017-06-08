/*
 * 学习资料逻辑类
 * */
"use strict";
const moment = require("moment");
module.exports = app => {
    class StudyController extends app.Controller {
        *getObligatoryList() {
            //获取必修课
            const _job = this.ctx.session.userinfo.positions;
            const obligatoryList = yield this.ctx.service.study.getObligatoryList(
                _job
            );
            this.ctx.body = {status: 200, obligatoryList: obligatoryList};
            this.ctx.status = 200;
        }

        *getElectiveList() {
            //获取选修课
            const _job = this.ctx.session.userinfo.positions;
            const electiveList = yield this.ctx.service.study.getElectiveList(_job);
            this.ctx.body = {status: 200, electiveList: electiveList};
            this.ctx.status = 200;
        }

        *getInterestList() {
            //获取兴趣课
            const _job = "1";
            const interestList = yield this.ctx.service.study.getInterestList();
            this.ctx.body = {status: 200, interestList: interestList};
            this.ctx.status = 200;
        }

        /**
         * 获取课程详情
         * 分为系列课程 子课程 以及 图文课程
         * 只是作为初始化用 ，如内部需要异步显示请调用其他接口
         * 对阅读记录做插入更新操作
         * */
        *getSpDetail() {
            app.logger.info("查询课程明细");
            let {id, type, order, sp_id} = this.ctx.request.body;
            if (type === "1") {
                //系列课程 包括 详情 评分 目录 评论 点赞
                let spdetail = yield this.ctx.service.study.getStudyDetail(id);
                let spCommentList = yield this.ctx.service.comment.getSpCommentList({
                    sp_id: id,
                    order: order
                });
                let spCategoryList = yield this.ctx.service.category.getCategoryList(
                    id
                );
                let studyedList = yield this.ctx.service.viewlog.getViewlogListByWhere({
                    fsp_id: id
                });
                let loveList = yield this.ctx.service.comment.getLoveListByWhere({
                    sp_id: id
                });
                let studyedids = [];
                studyedList.map((obj, index) => {
                    studyedids.push(obj.sp_id);
                });
                if (spdetail.rate === "NaN") {
                    //无打分情况下
                    spdetail.rate = 5;
                }
                let tops_rs = yield app.model.Top.findAll({
                    where: {
                        userid: this.ctx.session.userinfo.userid,
                        sp_id: {
                            $eq: null
                        }
                    }
                });
                let tops = [];
                tops_rs.map((obj, index) => {
                    tops.push(obj.c_id);
                }); //我赞过的评论
                let sptops_rs = yield app.model.Top.findAll({
                    where: {
                        userid: this.ctx.session.userinfo.userid,
                        sp_id: id
                    }
                });
                const num = yield app.model.Viewlog.count({
                    where: {
                        sp_id: id,
                        custno: this.ctx.session.userinfo.userid
                    }
                });
                if (num === 0) {
                    //not study
                    let view_log = {
                        sp_id: id,
                        custno: this.ctx.session.userinfo.userid,
                        serial: "1" //系列课程标志
                    };
                    this.ctx.model.Viewlog
                        .create(view_log, {
                            isNewRecord: true
                        })
                        .then(function (viewlog) {
                            if (viewlog) {
                            }
                        });
                }
                this.ctx.body = {
                    status: 200,
                    spdetail: spdetail,
                    spCommentList: spCommentList,
                    spCategoryList: spCategoryList,
                    studyedids: studyedids,
                    sptoped: sptops_rs.length > 0,
                    sploved: loveList.length > 0,
                    tops: tops
                };
                this.ctx.status = 200;
            } else if (type === "2") {
                //图文课程 包括 详情 评分 评论 点赞
                let spdetail = yield this.ctx.service.study.getStudyDetail(id);
                let spCommentList = yield this.ctx.service.comment.getSpCommentList({
                    sp_id: id,
                    order: order
                });
                let loveList = yield this.ctx.service.comment.getLoveListByWhere({
                    sp_id: id
                });
                if (spdetail.rate === "NaN") {
                    //无打分情况下
                    spdetail.rate = 5;
                }
                let tops_rs = yield app.model.Top.findAll({
                    where: {
                        userid: this.ctx.session.userinfo.userid,
                        sp_id: {
                            $eq: null
                        }
                    }
                });
                let tops = [];
                tops_rs.map((obj, index) => {
                    tops.push(obj.c_id);
                }); //我赞过的评论
                let sptops_rs = yield app.model.Top.findAll({
                    where: {
                        userid: this.ctx.session.userinfo.userid,
                        sp_id: id
                    }
                });
                const num = yield app.model.Viewlog.count({
                    where: {
                        sp_id: id,
                        custno: this.ctx.session.userinfo.userid
                    }
                });
                if (num === 0) {
                    //not study
                    let view_log = {
                        sp_id: id,
                        fsp_id: id,
                        custno: this.ctx.session.userinfo.userid
                    };
                    this.ctx.model.Viewlog
                        .create(view_log, {
                            isNewRecord: true
                        })
                        .then(function (viewlog) {
                            if (viewlog) {
                            }
                        });
                }
                this.ctx.body = {
                    status: 200,
                    spdetail: spdetail,
                    spCommentList: spCommentList,
                    sptoped: sptops_rs.length > 0,
                    sploved: loveList.length > 0,
                    tops: tops
                };
                this.ctx.status = 200;
            } else {
                //子课程 包括课程详情
                let spdetail = yield this.ctx.service.study.getStudyDetail(id);
                const num = yield app.model.Viewlog.count({
                    where: {
                        sp_id: id,
                        custno: this.ctx.session.userinfo.userid
                    }
                });
                if (num === 0) {
                    //not study
                    let view_log = {
                        sp_id: id,
                        custno: this.ctx.session.userinfo.userid,
                        fsp_id: sp_id
                    };
                    this.ctx.model.Viewlog
                        .create(view_log, {
                            isNewRecord: true
                        })
                        .then(function (viewlog) {
                            if (viewlog) {
                            }
                        });
                }
                this.ctx.body = {status: 200, spdetail: spdetail};
                this.ctx.status = 200;
            }
        }

        /**
         * 预览课程详情
         * 分为系列课程 子课程 以及 图文课程
         * 只提供管理端的数据
         * */
        *viewSpDetail() {
            let {id, type} = this.ctx.query;
            if (type === "1") {
                //系列课程 包括 详情 目录 （评分  评论数 点赞数 收藏数） 学习人列表进度
                let spdetail = yield this.ctx.service.study.getStudyDetail(id);
                if (spdetail.rate === "NaN") {
                    //无打分情况下
                    spdetail.rate = 5;
                }
                let spCommentList = yield this.ctx.service.comment.getCommentListByWhere(
                    {
                        sp_id: id,
                        parentid: 0
                    }
                );
                let spCategoryList = yield this.ctx.service.category.getCategoryList(
                    id
                );
                let spTotal = 0
                for (let i = 0; i < spCategoryList.length; i++) {
                    spTotal += spCategoryList[i].courses.length
                }
                let spUserProgress = yield this.ctx.service.viewlog.getViewlogByStudy(id, spTotal);
                this.ctx.body = {
                    status: 200,
                    spdetail: spdetail,
                    spCommentList: spCommentList,
                    spCategoryList: spCategoryList,
                    spUserProgress: spUserProgress
                };
                this.ctx.status = 200;
            }
            if (type === "3" || type === "2") {
                let spdetail = yield this.ctx.service.study.getStudyDetail(id);
                if (spdetail.rate === "NaN") {
                    //无打分情况下
                    spdetail.rate = 5;
                }
                let spCommentList = yield this.ctx.service.comment.getCommentListByWhere(
                    {
                        sp_id: id,
                        parentid: 0
                    }
                );
                let spUserProgress = yield this.ctx.service.viewlog.getViewlogByStudy(id, 1);
                this.ctx.body = {
                    status: 200,
                    spdetail: spdetail,
                    spCommentList: spCommentList,
                    spUserProgress: spUserProgress
                };
                this.ctx.status = 200;
            }
        }

      /*admin*/
      /*
       * 分页查询我发布的课程
       * */
        *getSpList() {
            app.logger.info("查询课程列表");
            console.log(this.ctx.query);
            let result = yield this.ctx.service.study.getSpList(this.ctx.query);
            for (let i = 0; i < result.rows.length; i++) {
                if (!result.rows[i].rates || result.rows[i].rates.length === 0) {
                    let score = 5;
                    result.rows[i].rate = score;
                } else {
                    let score = 0;
                    result.rows[i].rates.map((obj, index) => {
                        score = score + obj.rate;
                    });
                    result.rows[i].rate = (score / result.rows[i].rates.length).toFixed(
                        1
                    );
                }
            }
            this.ctx.body = {
                status: 200,
                spList: result.rows,
                spTotal: result.count.length
            };
            this.ctx.status = 200;
        }

      /*修改操作*/
        *doUpdate() {
            app.logger.info("学习资料修改操作");
            //添加xss过滤
            let _param = this.ctx.request.body;
            let {title, fhtml} = this.ctx.request.body;
            if (title || fhtml) {
                let titleFilter = this.ctx.helper.escape(title);
                let fhtmlFilter = this.ctx.helper.shtml(fhtml);
                _param = Object.assign({}, this.ctx.request.body, {
                    title: titleFilter,
                    fhtml: fhtmlFilter
                });
            }
            const result = yield this.ctx.service.study.updateSp(_param);
            if (result) {
                let log = this.ctx.request.body.log;
                const logresult = yield this.ctx.service.log.doCreate(log);
                if (logresult) {
                    this.ctx.body = {status: 200, msg: "修改成功"};
                    this.ctx.status = 200;
                } else {
                    this.ctx.body = {status: 205, msg: "修改异常"};
                    this.ctx.status = 200;
                }
            } else {
                this.ctx.body = {status: 205, msg: "修改异常"};
                this.ctx.status = 200;
            }
        }

      /*创建操作*/
        *doCreate() {
            console.log(this.ctx.request.body);
            app.logger.info("培训创建操作");
            const userinfo = this.ctx.session.userinfo;
            const _request = this.ctx.request.body;
            const _param = Object.assign({}, _request, {
                authorcustno: userinfo.userid,
                authorname: userinfo.name,
                authoravator: userinfo.avatar,
                state: 1
            });
            for (let key in _param) {
                if (!_param[key]) {
                    this.ctx.body = {status: 201, msg: "参数错误"};
                    this.ctx.status = 200;
                }
            }
            const result = yield this.ctx.service.study.createSp(_param);
            if (result) {
                let log = this.ctx.request.body.log;
                log = Object.assign({}, log, {
                    sp_id: result.id
                });
                const logresult = yield this.ctx.service.log.doCreate(log);
                if (logresult) {
                    this.ctx.body = {status: 200, study: result, msg: "添加成功"};
                    this.ctx.status = 200;
                } else {
                    this.ctx.body = {status: 202, msg: "插入异常"};
                    this.ctx.status = 200;
                }
            } else {
                this.ctx.body = {status: 202, msg: "插入异常"};
                this.ctx.status = 200;
            }
        }
    }
    return StudyController;
};
