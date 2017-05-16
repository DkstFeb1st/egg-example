const ExtractTextPlugin = require('extract-text-webpack-plugin')
module.exports = {
  preserveWhitespace: false,
  postcss: [
    require('autoprefixer')({
        browsers: ['iOS >= 7', 'Android >= 4.1']
    })
  ],
    loaders: {
        less: ExtractTextPlugin.extract('css-loader!less-loader'),
    }
}
