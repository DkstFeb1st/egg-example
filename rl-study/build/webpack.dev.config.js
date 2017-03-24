const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const base = require('./webpack.base.config')
const vueConfig = require('./vue-loader.config')

const config = merge({}, {
  entry: {
    rlstudy : path.resolve(__dirname,'../src/app.js'),
    vendor: [
      'vue',
      'vue-router',
      'vuex',
      'vuex-router-sync'
    ]
  },
  output: {
    filename: '[name].js'
  },
  resolve: {
    alias: {
      'components':path.resolve(__dirname,'../src/components'),
      'public': path.resolve(__dirname, '../public'),
      'vue': 'vue/dist/vue.js'
    }
  },
  devServer:{
    contentBase: 'public',  //Relative directory for base of server
    hot:true,//Live-reload
    inline:true,
    port:3001,//Port Number
    host:'0.0.0.0'//Change to '0.0.0.0' for external facing server
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
        loader: 'buble-loader',
        exclude: /node_modules/,
        options: {
          objectAssign: 'Object.assign'
        }
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

module.exports = config
