/**
 * Created by 1 on 2017/3/27.
 */

//const fs = require('fs')
//const bundle = require('../public/vue-ssr-bundle.json')
//const template = fs.readFileSync('app/public/index.html', 'utf-8')

module.exports = app => {
    class MainController extends app.Controller {//页面渲染
        //字符串renderer模式
        //stream与cache还没有实现
        * index() {
            // const renderer = app.createRenderer(bundle, template)
            // var that = this
            // renderer.renderToString({url : this.ctx.url},(err,html) => {
            //     console.log(err)
            //     console.log("error"+err)
            //     console.log("html"+html)
            //     that.ctx.body = html
            // })
            yield  this.ctx.render('index')
        }
    }
    return MainController;
};