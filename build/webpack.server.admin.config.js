const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const srcDir = path.resolve(__dirname, '../app');

const config = merge({}, {
    target: 'node',
    entry: {
        server: path.resolve(__dirname, '../admin/server.js'),
    },
    output: {
        path: path.resolve(__dirname, "../app/public"),
        publicPath: "public",
        filename: 'server.js',
        libraryTarget: "commonjs2"
    },
    resolve: {
        alias: {
            'components': path.resolve(__dirname, '../admin/component'),
            css: path.resolve(__dirname, '../admin/css'),
            img: "../admin/images",
            'reducers': path.resolve(__dirname, '../admin/store/reducer'),
            'apis': path.resolve(__dirname, '../admin/store/api'),
            'store': path.resolve(__dirname, '../admin/store'),
            'containers': path.resolve(__dirname, '../admin/container'),
        },
        extensions: ['.js', '.json']
    },
    plugins: [
        //Enables Hot Modules Replacement
        //new webpack.HotModuleReplacementPlugin(),
        // strip dev-only code in Vue source
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        // new webpack.optimize.UglifyJsPlugin({
        //     comments: false,
        //     // 最紧凑的输出
        //     beautify: false,
        //     compress: {
        //         //supresses warnings, usually from modules minification
        //         warnings: false,
        //         // 删除所有的 `console` 语句// 还可以兼容ie浏览器
        //         drop_console: true,
        //         // 内嵌定义了但是只用到一次的变量
        //         collapse_vars: true,
        //         // 提取出出现多次但是没有定义成变量去引用的静态值
        //         reduce_vars: true,
        //     },
        // }),
    ],
    module: {
        noParse: /es6-promise\.js$/, // avoid webpack shimming process
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    "presets": ["es2015", "react"],
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
})

//vux2必须配合vux-loader使用, 请在build/webpack.base.conf.js里参照如下代码进行配置：
module.exports = config
