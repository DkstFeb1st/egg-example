const ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
  preserveWhitespace: false,
    loaders: {
        js: "babel-loader",
        less: ExtractTextPlugin.extract({
            use: "css-loader!less-loader",
            fallback: "vue-style-loader" // <- 这是vue-loader的依赖，所以如果使用npm3，则不需要显式安装
        })
    },
  postcss: [
      require("autoprefixer")({
          browsers: ["iOS >= 7", "Android >= 4.1"]
    })
  ]
};
