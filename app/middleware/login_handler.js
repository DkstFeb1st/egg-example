/**
 * Created by 1 on 2017/4/10.
 */
const debug = process.env.NODE_ENV !== 'production'
module.exports = options => {
    return function* loginHandler(next) {
        /*
         * 校验是否登录 session里是否存在userinfo
         * */
        if (this.session.userinfo) {
            yield next
        } else {
            if (debug) {
                let userinfo = {
                    name: '金朝祥测试',
                    userid: '8581234',
                    avatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1490763917931&di=ef14ff0cf7523b9ba64c6e338be4178f&imgtype=0&src=http%3A%2F%2Fimg01.taopic.com%2F161007%2F240373-16100FR12449.jpg',
                    position: '3,',
                    gender: 1,
                }
                this.session.userinfo = userinfo
                yield next
            } else {
                this.body = {status: 203, msg: '用户token失效'}
                this.status = 200
            }
        }

    }
}
