/**
 * Created by 1 on 2017/5/2.
 * 日志逻辑类
 */
module.exports = app => {
    class Log extends app.Service {
        /*
         * 日志创建
         * */
        * doCreate(_param) {
            const result = yield this.ctx.model.Log.create(_param, function (log) {
                if (log) {
                    return true
                } else {
                    return false
                }
            })
            return result
        }
    }
    return Log
}
