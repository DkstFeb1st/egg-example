const path = require('path')
const vueConfig = require('./vue-loader.config.js')
const vuxLoader = require('vux-loader')
const webpackConfig = {
    devtool: false,
  entry: {
      rlstudy: './rl-study/src/entry-client.js',
    vendor: [
      'vue',
      'vue-router',
      'vuex',
        'vuex-router-sync',
        'vux'
    ]
  },
  output: {
      path: path.resolve(__dirname, "../app/public"),
      publicPath: "public",
    filename: '[name].[chunkhash].js'
  },
  resolve: {
    alias: {
        'components': path.resolve(__dirname, '../rl-study/src/components'),
        'apis': path.resolve(__dirname, '../rl-study/src/apis'),
        'assets': path.resolve(__dirname, '../rl-study/src/assets'),
        'mixins': path.resolve(__dirname, '../rl-study/src/mixins'),
        'filters': path.resolve(__dirname, '../rl-study/src/filters')

    },
      extensions: ['.js', '.vue', '.json']
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
          test: /\.css$/,
          loader: "css-loader"
      },
        {
            test: /\.less$/,
            loader: 'css-loader!less-loader'
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

module.exports = vuxLoader.merge(webpackConfig, {
    options: {},
    plugins: [
        'vux-ui', 'duplicate-style',
    ]
})
//module.exports = webpackConfig
