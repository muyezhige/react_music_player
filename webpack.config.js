// webpack的2.x 版本。需要require('path"), 否则报错： The provided value "./dist/js" is not an absolute path!
// webpack要全局安装, webpack命令才可以使用。否则报错：'webpack' 不是内部或外部命令

var path = require("path");
var webpack = require("webpack");
var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	entry: [
		'webpack-dev-server/client?http://localhost:3000',
        'webpack/hot/only-dev-server',
        'react-hot-loader/patch',
        path.resolve(__dirname, "./app/index.js")
	],
	output: {
		path: path.resolve(__dirname, "./dist"),
		filename: "[name].js",
		publicPath: "/"
	},
	plugins: [
		// 生成 HTML文件，在body元素中，使用script来引入bundles.js
		new HtmlWebpackPlugin({
          template: './index.tpl.html',
          inject: 'body',
          filename: './index.html'
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(), //增加：webpack热替换插件
        new webpack.NoEmitOnErrorsPlugin(), //允许错误不打断程序
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify('development')
        })
	],
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: "babel-loader",
				query: {
					presets: ["react", "es2015"]
				}
			},
			{
				test: /\.css$/,
				loader: "style!css"
			},
			{
				test: /\.less/,
				loader: "style-loader!css-loader!less-loader"
			}
		]
	}
}