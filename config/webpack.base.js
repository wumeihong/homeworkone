

let path = require('path')
let dir = process.cwd()//获取当前程序运行的目录
//dev:启服务，不用进行压缩
//build:不用启服务，要进行压缩，代码分离
let webpack = require('webpack')
let UglifyPlugin =webpack.optimize.UglifyJsPlugin;
let baseConfig ={
    entry:{
        "bundle":dir+"/src/main"
    },
    output:{
        "filename":"[name].js",
        "path":dir+"/dist"
    },
    module:{
        rules:[
            {
                test:/\.(js|jsx)$/,
                use:["babel-loader"]
            },
            {
                test:/\.css$/,
                use:["style-loader","css-loader"]
            },
            {
                test:/.(eot|svg|ttf|woff)$/,
                use:["url-loader"]
            },
            {
                test:/.(jpg|png|gif|jpeg)$/,
                use:["url-loader"]
            },
            {
                test:/\.less$/,
                use:['style-loader','css-loader','less-loader'],
            }
        ]
    },
    plugins:[],  
    resolve:{
        extensions:[".js",".jsx"]
    }
}
module.exports = baseConfig


