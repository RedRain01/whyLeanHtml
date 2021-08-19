const Path = require('path'); // 从node上导入path
const VueLoaderPlugin = require('vue-loader/lib/plugin');  // webpack 4版本之后加的，之前的版本不需要这个
const environment = process.env.NODE_ENV;
const Webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

let config = {
	target: 'web',
    entry: Path.resolve(__dirname, './src/index.js'), // 以join拼接path的形式配置绝对路径,相对路径打包后找不到会报错
    output: {
        filename: 'vendor.build.js',
        path: Path.join(__dirname, 'target')
    },
    externals: {
        'vue': 'Vue',
        'vuex': 'Vuex',
        'vue-router': 'VueRouter',
        'element-ui': 'ELEMENT',
        'axios': 'axios',
        'moment': 'moment',
        'echarts': 'echarts',
        'vCharts': 'VCharts'
    },
    resolve: {
        //extensions: ['.js', '.vue', '.json'], // import 引入文件省略后缀名配置
        alias: {
            '@': Path.resolve(__dirname, './src') ,
        }
    },
    module: {
        rules: [{
            test: /\.vue$/,
            loader: 'vue-loader'
        }, {
            test: /\.css$/,
            use: [
                'style-loader',
                'css-loader'
            ]
        }, {
            test: /\.scss$/,
            use: [
                'style-loader',
                'css-loader'
            ]
        }, {
            test: /\.(png|jpg|jpeg|gif)$/,
            use: {
                loader: 'url-loader',
                options: {
                    limit: 1024, // 判断图片的大小   如果小于1024就会转换成base64
                    name: '[name].[ext]' // 输出图片的名字  ext是扩展名
                }
            }
        },{
            test: /\.(eot|woff2?|ttf|svg)$/,
            use:{
                loader: "url-loader",
                options: {
                  name: "[name]-[hash:5].min.[ext]",
                  limit: 102400, // fonts file size <= 5KB, use 'base64'; else, output svg file
                }
              }
          }]
    },
    plugins: [
        new VueLoaderPlugin(),
		new HtmlWebpackPlugin({
			filename: 'index.html',
            template: './index.html',
            favicon: './favicon.ico'
		})
    ]
};
switch (environment) {
    case "development": {
        config.plugins.push(new Webpack.DefinePlugin({ // ------------------------------------------环境变量在此处添加  167.179.104.197
                               'process.env.API_ROOT': JSON.stringify("http://sdh.ysepay.com:8200"),
                              // 'process.env.API_ROOT': JSON.stringify("http://167.179.104.197:4545"),
                                'process.env.HOME_URL': JSON.stringify("http://c.ysepay.com:9098/sdh_manager/#/"),
                                'process.env.OCX_DOWNLOAD_URL': JSON.stringify("http://c.ysepay.com:7081/ocx/"),
                            }));
        config.devtool = '#cheap-module-eval-source-map';
        config.devServer = {
            hot: true,
            compress: true,
            port: 9097, // webpack服务需要监听的端口号
            host: '0.0.0.0', // 可以通过本机内网ip访问,这样别人也可以访问,手机也可访问,如果设置成localhost则不然
            disableHostCheck: true,
            overlay: {
                errors: true // 这个可有可无,webpack编译出现的错误会出现在网页中,便于更改
            },
            publicPath: '/sdh_manager/',
            historyApiFallback: true // 路由history模式支持
        };
        config.plugins.push(new Webpack.HotModuleReplacementPlugin());
    }
    break;
    case "test": {
        config.plugins.push(new Webpack.DefinePlugin({ // ------------------------------------------环境变量在此处添加
                                'process.env.API_ROOT': JSON.stringify(""),
                                'process.env.HOME_URL': JSON.stringify("http://c.ysepay.com:7081/sdh_manager/"),
                                'process.env.OCX_DOWNLOAD_URL': JSON.stringify("http://c.ysepay.com:7081/ocx/"),
                            }));
    }
    break;
    case "production": {
        config.plugins.push(new Webpack.DefinePlugin({ // ------------------------------------------环境变量在此处添加
                                'process.env.API_ROOT': JSON.stringify(""),
                                'process.env.HOME_URL': JSON.stringify("https://sdh.ysepay.com/sdh_manager/"),
                               // 'process.env.HOME_URL': JSON.stringify("https://167.179.104.197/sdh_manager/"),
                                'process.env.OCX_DOWNLOAD_URL': JSON.stringify("https://newportal.ysepay.com/agent/ocx/"),
                            }));
    }
    break;
    default: 
    break;
}
module.exports = config;