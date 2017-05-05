const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const vueConfig = require('./vue-loader.config.js')
const vuxLoader = require('vux-loader')

const config = merge({}, {
  entry: {
      rlstudy: path.resolve(__dirname, '../rl-study/src/app.js'),
      vendor: [
          'vue',
          'vue-router',
          'vuex',
          'vuex-router-sync',
      ]
  },
  output: {
    filename: '[name].js'
  },
  resolve: {
    alias: {
        'components': path.resolve(__dirname, '../rl-study/src/components'),
        'apis': path.resolve(__dirname, '../rl-study/src/apis'),
        'assets': path.resolve(__dirname, '../rl-study/src/assets'),
        'public': path.resolve(__dirname, '../rl-study/public'),
        'assets': path.resolve(__dirname, '../rl-study/src/assets'),
        'mixins': path.resolve(__dirname, '../rl-study/src/mixins'),
        'filters': path.resolve(__dirname, '../rl-study/src/filters'),
        'vue$': 'vue/dist/vue.js'
    },
      extensions: ['.js', '.vue', '.json']
  },
  devServer:{
    contentBase: 'public',  //Relative directory for base of server
    hot:true,//Live-reload
    inline:true,
    port:3001,//Port Number
      host: '0.0.0.0',//Change to '0.0.0.0' for external facing server
      proxy: {
          '/api/sp/*': {
              target: 'http://127.0.0.1:7001',
              changeOrigin: true
          }
      }
  },
  plugins: [
    //Enables Hot Modules Replacement
    new webpack.HotModuleReplacementPlugin(),
    // strip dev-only code in Vue source
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"client"'
    }),
    // extract vendor chunks for better caching
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),
  ],
  module: {
    noParse: /es6-promise\.js$/, // avoid webpack shimming process
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueConfig
      },
      {
        test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/
      },
      {
          test: /\.css$/,
          loader: "style-loader!css-loader"
      },
        {
            test: /\.less$/,
            loader: 'style-loader!css-loader!less-loader'
        },
        {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
})

//vux2必须配合vux-loader使用, 请在build/webpack.base.conf.js里参照如下代码进行配置：
module.exports = vuxLoader.merge(config, {
    options: {},
    plugins: [
        'vux-ui', 'duplicate-style',
    ]
})
