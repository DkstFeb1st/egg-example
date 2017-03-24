'use strict';

const fs = require('fs')
const bundle = require('../../rl-study/public/vue-ssr-bundle.json')
//const template = fs.readFileSync('app/public/rlstudy/index.html', 'utf-8')
//const bundle = require('../public/rlstudy/vue-ssr-bundle.json')
const template = fs.readFileSync('app/public/rlstudy/index.html', 'utf-8')

module.exports = app => {
  class HomeController extends app.Controller {
    * index() {
      //字符串renderer模式
      //stream与cache还没有实现
      this.ctx.logger.info('人力学习平台开始渲染')
      const renderer = app.createRenderer(bundle, template)
      console.log(template);
      var that = this
      renderer.renderToString({url : this.ctx.url},(err,html) => {
        that.ctx.body = html
      })
    }
  }
  return HomeController;
};
