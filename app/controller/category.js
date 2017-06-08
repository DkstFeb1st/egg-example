/**
 * Created by 1 on 2017/5/30.
 * 目录接口提供
 */

module.exports = app => {
    class CategoryController extends app.Controller {
        /*
         * 创建系列课程目录
         * */
        * addCategory() {
            app.logger.info('系列课程目录创建或更改')
            let _request = this.ctx.request.body
            if (!_request.name) {
                this.ctx.body = {status: 200, msg: '目录名称不能为空'}
                this.ctx.status = 201
            }
            if (_request.id) //更新
                var result = yield this.ctx.service.category.doUpdate(_request)
            else
                var result = yield this.ctx.service.category.doCreate(_request)
            if (result) {
                this.ctx.body = {status: 200, category: result, msg: '目录创建成功'}
                this.ctx.status = 200
            } else {
                this.ctx.body = {status: 202, msg: '目录创建异常'}
                this.ctx.status = 200
            }
        }

        * updateCategory() {
            app.logger.info('系列课程目录修改')
            let _request = this.ctx.request.body
            if (!_request.name) {
                this.ctx.body = {status: 200, msg: '目录名称不能为空'}
                this.ctx.status = 201
            }
            const result = yield this.ctx.service.category.doUpdate(_request)
            if (result) {
                this.ctx.body = {status: 200, msg: '目录修改成功'}
                this.ctx.status = 200
            } else {
                this.ctx.body = {status: 202, msg: '目录创建异常'}
                this.ctx.status = 200
            }
        }

        *deleteCategory() {
            app.logger.info('系列课程目录删除')
            let _request = this.ctx.request.body
            const result = yield this.ctx.service.category.doDelete(_request)
            if (result) {
                this.ctx.body = {status: 200, msg: '目录删除成功'}
                this.ctx.status = 200
            } else {
                this.ctx.body = {status: 202, msg: '目录创建异常'}
                this.ctx.status = 200
            }
        }
    }
    return CategoryController
}

