
module.exports = {
  preserveWhitespace: false,
  postcss: [
    require('autoprefixer')({
        browsers: ['iOS >= 7', 'Android >= 4.1']
    })
  ]
}