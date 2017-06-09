/**
 * Created by 1 on 2017/4/14.
 */
'use strict'
module.exports = app => {
    class UserController extends app.Controller {
        /*后台用户登录*/
        * loginByPwd() {
            const result = yield this.ctx.service.user.checkCust(this.ctx.request.body)
            if (result) {
                this.ctx.session.userinfo = result//用户信息存入session
                this.ctx.body = {status: 200, user: result}
                this.ctx.status = 200
            } else {
                this.ctx.body = {status: 203, msg: '账号或密码错误'}
                this.ctx.status = 200
            }
        }

        /*退出*/
        * loginout() {
            this.ctx.session.userinfo = null
            this.ctx.body = {status: 200, msg: '成功登出！'}
            this.ctx.status = 200
        }
        /*登录后系统权限及静态参数初始化*/
        * initial() {
            const custno = this.ctx.request.body
            //状态列表
            const stateList = yield this.ctx.model.Dict.findAll({
                where: {
                    type: 'state',
                    state: '1'
                }
            })
            const departmentList = yield this.ctx.model.Dict.findAll({
                where: {
                    type: 'department',
                    state: '1'
                }
            })
            const jobList = yield this.ctx.model.Dict.findAll({
                where: {
                    type: 'job',
                    state: '1'
                }
            })
            const courseTypeList = yield this.ctx.model.Dict.findAll({
                where: {
                    type: 'course',
                    state: '1'
                }
            })
            this.ctx.body = {
                status: 200,
                stateList: stateList,
                departmentList: departmentList,
                jobList: jobList,
                courseTypeList: courseTypeList
            }
            this.ctx.status = 200
        }

        /*前端用户tab页数据获取*/
        * getUserTab() {
            let user = this.ctx.session.userinfo
            console.log(user)
            //获取文章数目
            let sp_param = {state: '3', authorcustno: user.userid}
            const spListResult = yield this.ctx.service.study.getSpListByWhere(sp_param)
            //获取获评数目
            let cm_param = {custno: user.userid}
            const commentedListResult = yield  this.ctx.service.comment.getCommentListByWhere(cm_param)
            //获取获赞数目
            let tp_param = {custno: user.userid}
            const topedListResult = yield  this.ctx.service.comment.getTopListByWhere(tp_param)
            //获取被收藏数目
            let lv_param = {custno: user.userid}
            const lovedListResult = yield this.ctx.service.comment.getLoveListByWhere(lv_param)
            this.ctx.body = {
                status: 200,
                user: user,
                spList: spListResult,
                cmdList: commentedListResult,
                tpdList: topedListResult,
                lvList: lovedListResult
            }
            this.ctx.status = 200
        }

        /*
         * 获取我正在学习的课程列表接口
         * */
        *getStudyingList() {
            const result = yield this.ctx.service.study.getStudyByView({userid: this.ctx.session.userinfo.userid})
            const studyingList = [];
            for (let x of result) {
                const num = yield app.model.Viewlog.count({
                    where: {
                        fsp_id: x.sp_id
                    }
                });
                if (!x.study) {
                    continue
                }
                let progress = (num / x.coursenum).toFixed(2);
                x.study.progress = progress;
                if (progress < 100) studyingList.push(x.study);
            }
            this.ctx.body = {status: 200, studyingList: studyingList};
            this.ctx.status = 200;
        }

        /*
         *   获取收藏课程列表
         * */
        * getLoveStudyList() {
            let {userid} = this.ctx.session.userinfo
            const result = yield this.ctx.service.study.getStudyByLove({userid: this.ctx.session.userinfo.userid})
            let studylvList = []
            result && result.map((obj, index) => {
                studylvList.push(obj.study)
            })
            this.ctx.body = {status: 200, studylvList: studylvList}
            this.ctx.status = 200
        }
    }
    return UserController;
}