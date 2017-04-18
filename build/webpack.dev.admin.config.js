const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const srcDir = path.resolve(__dirname, '../app');
console.log(srcDir)
const config = merge({}, {
    entry: {
        admin: path.resolve(__dirname, '../admin/app.js'),
        vendor: [
            'react',
            'react-dom'
        ]
    },
    output: {
        filename: '[name].js'
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
        extensions: ['web.js', '.js', '.json']
    },
    devServer: {
        contentBase: 'public/admin',  //Relative directory for base of server
        hot: true,//Live-reload
        inline: true,
        port: 3001,//Port Number
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
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    "presets": ["es2015", "react"],
                    "plugins": [
                        ["import", [{"libraryName": "antd", "style": true}]]
                    ]
                }
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
module.exports = config
