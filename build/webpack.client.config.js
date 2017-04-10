const webpack = require('webpack')
const merge = require('webpack-merge')
const base = require('./webpack.base.config.js')
const vueConfig = require('./vue-loader.config.js')
const HTMLPlugin = require('html-webpack-plugin')
//const SWPrecachePlugin = require('sw-precache-webpack-plugin')

const config = merge(base, {
  plugins: [
    // strip dev-only code in Vue source
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"client"'
    }),
    // extract vendor chunks for better caching
    new webpack.optimize.CommonsChunkPlugin({
        name: ['vendor', 'manifest']
    }),
    // generate output HTML
    new HTMLPlugin({
        template: 'rl-study/src/index.template.html'
    })
  ]
})

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(
    // minify JS
    new webpack.optimize.UglifyJsPlugin({
        comments: false,
        // 最紧凑的输出
        beautify: false,
      compress: {
          //supresses warnings, usually from modules minification
          warnings: false,
          // 删除所有的 `console` 语句// 还可以兼容ie浏览器
          drop_console: true,
          // 内嵌定义了但是只用到一次的变量
          collapse_vars: true,
          // 提取出出现多次但是没有定义成变量去引用的静态值
          reduce_vars: true,
      },
    })
    // auto generate service worker
    // new SWPrecachePlugin({
    //   cacheId: 'vue-hn',
    //   filename: 'service-worker.js',
    //   dontCacheBustUrlsMatching: /./,
    //   staticFileGlobsIgnorePatterns: [/index\.html$/, /\.map$/]
    // })
  )
}

module.exports = config
