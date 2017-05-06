const path = require('path');
const webpack = require('webpack')
let HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {

  entry: {
    app: path.resolve(__dirname, '../src/main.js'),
  },
  output: {
    path: path.resolve(__dirname, '../dist'), //打包文件的输出地址
    filename: '[name].[hash].js',
    publicPath: "/"
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.common.js'
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            'scss': 'vue-style-loader!css-loader!sass-loader',
            'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader', // file-loader 都是用于打包文件和图片
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(), //支持热替换
    new HtmlWebpackPlugin({
      template: 'src/index.html' //指定处理模版
    })
  ],
  // devServer: {
  //   colors: true,
  // },
  devServer: {
    historyApiFallback: true, //不跳转
    contentBase: path.join(__dirname, "../src"), //默认访问的本地静态文件的地址目录，建议最好是绝对路径
    compress: true, // 启动gzip 压缩 Enable gzip compression
    inline: true, //时时刷新
    hot: true, //支持热更新
    port: 9999
  }
}
