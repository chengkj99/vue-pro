# 项目实践记录

目的：练习render
背景：一直使用vue-cli搭建vue工程，虽然vue全家桶在实际项目中应用的还过得去，以及之前也学习和练习了webpack的用法，但是在实践项目中没有使用太多，而且vue的前端工程化学习到的感觉是空中楼阁，对于未来的工程问题，仅仅使用vue-cli时不能够灵活的进行解决的，于是产生重新开始学习vue结合webpack搭建web工程的想法。

## 开始
新建文件夹 vue-pro
在vue-pro下新建文件夹 build
在vue-pro下新建文件夹 src
在vue-pro目录下执行`npm init`,初始化package.json
在vue-pro目录下执行`npm install vue --save-dev`,安装vue

在src下新建 index.html main.js App.vue 分别作为实例挂载点、实例挂载入口文件、和vue单页模版根文件
在build文件夹下创建dev-server.js 用于配置本地项目的启动文件

## 初始化这个项目
下一步： 安装webpack、并配置，跑起来这个项目
安装vue-loader
安装webpack，查看版本号为1.14，应升级2.33 npm install -g webpack@2.3.3
刚开始执行webpack build/webpack/config.js错误，是没找到webpack.config.js这个文件
后来cd build 后执行 webpack webpack.config.js 报错

缺少`vue-template-compiler`，继续安装此模块
缺少`css-loader`，继续安装此模块

执行`webpack webpack.config.js`成功 双击index.html

报错`You are using the runtime-only build of Vue where the template compiler is not available.`
[找到了一篇文章](https://zhuanlan.zhihu.com/p/22115243)
`package.json 中的 main 属性决定了，当项目被引入时，输出的是哪个文件，而 vue 的 package.json 中的 main 指向的是 dist/vue.common.js。`
 擦，并不太懂是什么鬼，就是把

 ```
 // import Vue from 'Vue'
 import Vue from 'vue/dist/vue.js'
 ```
 替换就好了。

 但是渲染出来没有内容，我目前猜可能是需要服务器渲染的问题》》》

 不是服务器渲染的问题

 ```
 render: h => h(App)
 // component: {
 //   App
 // }
 ```

 这么替换，就完成了页面的渲染。



 问题：

 1. 为什么在build外执行`webpack build/webpack/config.js` 报错？
  我发现，entry的入口路径参考的是你执行webpack的当前文件夹，　如果我我在webpack.config.js文件下执行webpack，那么这个时候，配置文件的入口地址，可以被找到，因为webpack的执行目录和配置文件所在目录是一致的，当我到上一层执行webpack构建时，就会出现问题，此时可以将entry的入口文件改为绝对地址就没有问题了。
```
// entry: '../src/main.js',
entry: path.resolve(__dirname, '../src/main.js'),
```
但是我执行`webpack build/webpack/config.js`时还是不行，报错：
```
No configuration file found and no entry configured via CLI option.
When using the CLI you need to provide at least two arguments: entry and output.
A configuration file could be named 'webpack.config.js' in the current directory.
Use --help to display the CLI options.
```
当我执行`webpack --config build/webpack.config.js --progress`就可以成功。

这两者有什么区别呢？

原来，这和progress没关系，Webpack 在执行的时候，除了在命令行传入参数，还可以通过指定的配置文件来执行。默认情况下，会搜索当前目录的 webpack.config.js 文件，这个文件是一个 node.js 模块，返回一个 json 格式的配置信息对象，或者通过 --config 选项来指定配置文件。

soga！！

 2. // import Vue from 'Vue' 和 import Vue from 'vue/dist/vue.js' 什么区别？

 这个问题还需要从vue的构建方式来看，vue的构建方式有两种`独立构建` 和`运行时构建`，其中`独立构建= 编译 + 运行时构建`，
 Vue.js 的运行过程实际上包含两步。第一步，编译器将字符串模板（template）编译为渲染函数（render），称之为编译过程；第二步，运行时实际调用编译的渲染函数，称之为运行过程。

 vue默认的是运行时构建，如果想使用独立构建需要在webpack配置中加入下面这段：
 ```
 resolve: {
   alias: {
     'vue$': vue/dist/vue.esm.js  // 'vue/dist/vue.common.js' for webpack 1
   }
 }

 ```
 但是如何区分运行时构建和独立构建？以及怎么分别实现运行时构建和独立构建？

 至此，如果想使用template写模版，需要使用独立构建，如果使用render函数渲染模版使用运行时构建。

独立构建

```
import Vue from 'vue/dist/vue.js' //独立构建
// import Vue from 'vue/dist/vue.esm.js' //独立构建
import App from './App.vue'
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
}).$mount('#app')

```
运行时构建

```
import Vue from 'Vue' //运行时构建
import App from './App.vue'

new Vue({
  el: '#app',
  render: h => h(App)
})

```
