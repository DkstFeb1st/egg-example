/**
 * Created by 1 on 2017/4/10.
 */

module.exports = options => {
    return function* loginHandler(next) {
        /*
         * 校验是否登录 session里是否存在userinfo
         * */
        //console.log(this.session.userinfo)

        if (this.session.userinfo) {
            yield next
        } else {
            this.body = 'token失效'
            this.status = 201
        }

    }
}
