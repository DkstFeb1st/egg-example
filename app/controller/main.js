/**
 * Created by 1 on 2017/3/27.
 */

//onst fs = require('fs')
//const bundle = require('../public/vue-ssr-bundle.json')
var serverRender = require('../public/server.js')
//const serverRender = fs.readFileSync('app/public/server.js', 'utf-8')
module.exports = app => {
    class MainController extends app.Controller {//页面渲染
        //字符串renderer模式
        //stream与cache还没有实现
        * weixin() {
            // const renderer = app.createRenderer(bundle, template)
            // var that = this
            // renderer.renderToString({url : this.ctx.url},(err,html) => {
            //     console.log(err)
            //     console.log("error"+err)
            //     console.log("html"+html)
            //     that.ctx.body = html
            // })
            if (this.ctx.query.code) {
                const token = yield this.ctx.service.user.getToken()
                const userinfo = yield this.ctx.service.user.getUserInfo(token, this.ctx.query.code)
                let position_dict = yield this.ctx.service.user.getPositionFromDict(userinfo.position)
                if (position_dict) {
                    userinfo.position = `${position_dict.value},`
                } else {
                    userinfo.position = '4,'
                }
                this.ctx.session.userinfo = userinfo//用户信息存入session
            } else {
                const callback_url = 'https://app.rarcbank.com/study/weixin';
                const url = encodeURIComponent(callback_url)
                this.ctx.redirect(`https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx365326b3672b185c&redirect_uri=${url}&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect`)
            }
            yield  this.ctx.render('index')
        }

        * pc() {
            // if (this.ctx.query.auth_code) {//如果存在auth_code 则代表是扫码登陆
            //     const token = yield this.ctx.service.user.getToken()
            //     const userinfo = yield this.ctx.service.user.getUserInfo(token, this.ctx.query.auth_code)
            //     console.log(userinfo)
            // }
            // match({ routes, location : this.ctx.url },( err, redirectLocation, renderProps ) => {
            //     if(err) {
            //         this.ctx.body = { status : 500 }
            //         this.ctx.status = 500
            //     } else if (redirectLocation) {
            //         console.log(redirectLocation)
            //     } else if (renderProps){
            //         const store = configureStore()
            //         const state = store.getState()
            //         const html = renderToString(
            //             <Provider store = { store }>
            //                 <RoutingContext {...renderProps } />
            //             </Provider>
            //         )
            //     }
            console.log(require('../public/server.js'))
            yield serverRender.render();

        }
    }
    return MainController;
};