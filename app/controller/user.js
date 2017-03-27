'use strict';

const fs = require('fs')
const bundle = require('../../rl-study/public/vue-ssr-bundle.json')
//const template = fs.readFileSync('app/public/rlstudy/index.html', 'utf-8')
//const bundle = require('../public/rlstudy/vue-ssr-bundle.json')
const template = fs.readFileSync('app/public/rlstudy/index.html', 'utf-8')

module.exports = app => {
  class UserController extends app.Controller {
    * index() {
        //字符串renderer模式
        //stream与cache还没有实现
        this.ctx.logger.info('人力学习平台开始渲染')
        const renderer = app.createRenderer(bundle, template)
        var that = this
        renderer.renderToString({url : this.ctx.url},(err,html) => {
          that.ctx.body = html
        })
    }

    * getUserInfo() {
        this.ctx.logger.info('获取用户信息')
        this.ctx.set("Access-Control-Allow-Origin","*")//设置响应头
        const userList = yield this.ctx.service.user.find()
        this.ctx.body = { userList: userList };
        this.ctx.status = 201;
    }
  }
  return UserController;
};
