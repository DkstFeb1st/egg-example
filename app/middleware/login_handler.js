/**
 * Created by 1 on 2017/4/10.
 */

module.exports = () => {
    return function*(next) {
        /*
         * 校验是否登录 session里是否存在userinfo
         * */
        if (session.userinfo) {
            yield next
        } else {
            this.body = 'token失效'
            this.status = '403'
        }
    }
}
