# 项目实践记录

## 配置webpack.config.js文件
- 支持http dev
- 支持热替换
- 支持es6
- 支持sass
- 打包的js文件自动插入到index.html模版中
### 安装dev-server

```
# 安装
$ npm install webpack-dev-server -g

# 运行
$ webpack-dev-server --progress

```

注意的是以上的安装方式除了要安装全局，还要本地安装。

执行` webpack-dev-server --progress `命令，报错显示没有找到配置文件，原来是需要`--config`来指定配置文件。

使用`webpack-dev-server --config build/webpack.config.js  --inline --hot`完成服务的启动。

也可以使用 ` webpack  --config build/webpack.config.js  --progress --watch` //这条命令可以启动watch观察者模式。

```
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 9000
  }

```

服务启动的文件如上所示，但是问题又来了，当我访问浏览器localhost:9000时，没有找到资源文件，说明还是有配置没有搞好，主要是路径配置的问题，搞这需要搞明白contentBase、path、publicPath...这些参数的含义。

### 搞好配置文件，实现可以正常访问项目

```
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



```

如上配置文件，执行`webpack-dev-server --config build/webpack.config.js  --inline --hot`完成dev-server启动操作。

### 支持热替换

其实 --hot 已经支持了热替换

但是另我不明白的是如果在CLI中不使用`--line --hot`，但是在devServer的配置中添加了指令，`webpack-dev-server --config build/webpack.config.js`执行时，热替换没有生效。

```
devServer: {
  historyApiFallback: true, //不跳转
  contentBase: path.join(__dirname, "../src"), //默认访问的本地静态文件的地址目录，建议最好是绝对路径
  compress: true, // 启动gzip 压缩 Enable gzip compression
  inline: true, //时时刷新
  hot: true, //支持热更新
  port: 9999
}
```
直到我添加下面的这个插件，解决了这个问题。**至于原因至今未知。**
```
plugins: [
  new webpack.HotModuleReplacementPlugin(),//支持热替换
],
```


在package.json 加上以下这段，就支持了使用`npm run start`启动项目了。
```
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1",
  "start": "webpack-dev-server --config build/webpack.config.js  --inline --hot"
},

```


### 支持es6 支持sass

到这时，我在想，需要安装些loader，css-loader、sass-loader、style-loader、babel-loader、file-loader(用于打包文件和图片),
在这里连续安装了

```
npm install sass-loader scss-loader --save-dev
```
在启动时，提示我需要安装`node-sass`,node-sass查了一下，简单说，就是将sass编译成css的一个工具，没有深究。

```
npm install sass-loader scss-loader --save-dev

```

装完之后

```
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
}
```
就直接ok了。


下一步，支持es6，


```
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

```



执行`npm run start`,提示安装babel-loader和babel-core，并依次安装


### 执行编译，自动引入到html文档中，使用`html-webpack-plugin`这个插件

安装`npm install html-webpack-plugin --save-dev`
添加此配置，其中template是指定处理的模版文件

```
plugins: [
  new HtmlWebpackPlugin({
    template: 'src/index.html' //指定处理模版
  })
]

```
另外有一点需要注意的是
```
output: {
  path: path.resolve(__dirname, '../dist'), //打包文件的输出地址
  filename: '[name].[hash].js',
  publicPath: "/"
}

```

`html-webpack-plugin`插件是根据输出文件的路径配置进行对index.html进行处理的，将js文件插入到index.html中，需要保证此配置正确。
其中“path”仅仅告诉Webpack结果存储在哪里，然而“publicPath”项则被许多Webpack的插件用于在生产模式下更新内嵌到css、html文件里的url值。
