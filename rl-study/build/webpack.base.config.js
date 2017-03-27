const path = require('path')
const vueConfig = require('./vue-loader.config')
module.exports = {
  devtool: '#source-map',
  entry: {
    rlstudy: './src/entry-client.js',
    vendor: [
      'vue',
      'vue-router',
      'vuex',
      'vuex-router-sync'
    ]
  },
  output: {
    path: path.resolve(__dirname,"../../app/public/rlstudy"),
    publicPath: "public/rlstudy",
    filename: '[name].[chunkhash].js'
  },
  resolve: {
    alias: {
      'components':path.resolve(__dirname,'../src/components'),
      'apis':path.resolve(__dirname,'../src/apis'),
    }
  },
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
  performance: {
    hints: process.env.NODE_ENV === 'production' ? 'warning' : false
  }
}
