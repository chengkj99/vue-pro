
# [Development](https://webpack.js.org/guides/development/)

On this page we'll explain how to get started with developing and how to choose one of three tools to develop. It is assumed you already have a webpack configuration file.

>  Never use any of these tools in production. Ever.

## Adjusting Your Text Editor
Some text editors have a "safe write" feature and enable this by default. As a result, saving a file will not always result in a recompile.

- Each editor has a different way of disabling this. For the most common ones:

- Sublime Text 3 - Add "atomic_save": false to your user preferences.
- IntelliJ - use search in the preferences to find "safe write" and disable it.
- Vim - add :set backupcopy=yes in your settings.
- WebStorm - uncheck Use "safe write" in Preferences > Appearance & Behavior > System Settings



## Source Maps
When a JavaScript exception occurs, you'll often want to know what file and line is generating this error. Since webpack outputs files into one or more bundles, it can be inconvenient to trace the file.

Source maps intend to fix this problem. There are a lot of different options - each with their own advantages and disadvantages. To get started, we'll use this one:

`devtool: "cheap-eval-source-map"`

## Choosing a Tool
webpack can be used with watch mode. In this mode webpack will watch your files, and recompile when they change. webpack-dev-server provides an easy to use development server with fast live reloading. If you already have a development server and want full flexibility, webpack-dev-middleware can be used as middleware.

webpack-dev-server and webpack-dev-middleware use in-memory compilation, meaning that the bundle will not be saved to disk. This makes compiling faster and results in less mess on your file system.

In most cases you'll want to use webpack-dev-server, since it's the easiest to get started with and offers much functionality out-of-the-box.

从watch mode模式和webpack-dev-server以及webpack-dev-middleware三者选择一项作为开发文件变化的检测方式；
其中使用watch的时候需要自己提供服务器，webpack会检测到变化的文件进行重新编译，但是需要手动刷新浏览器查看结果。
webpack-dev-server提供一个开发服务器和热重载，但是如果你已经有了自己的开发服务器，webpack-dev-middleware就是一个很好的选择。
webpack-dev-server以及webpack-dev-middleware编译文件输出到了内存中，这意味着，磁盘中看不见打包文件，不会改变你的源文件环境。
在多数情况下，一般使用webpack-dev-server，因为他简单够用。

webpack Watch Mode
webpack's watch mode watches files for changes. If any change is detected, it'll run the compilation again.

We also want a nice progress bar while it's compiling. Let's run the command:

`webpack --progress --watch`
Make a change in one of your files and hit save. You should see that it's recompiling.

Watch mode makes no assumptions about a server, so you will need to provide your own. An easy server to use is serve. After installing (npm i --save-dev serve), you can run it in the directory where the outputted files are:

``npm bin`/serve``
You may find it more convenient to run serve using npm scripts. You can do so by first creating a start script in package.json as follows:

```
...
"scripts": {
  "start": "serve"
}
...
```
You can then start the server by running npm start from within your project directory. After each compilation, you will need to manually refresh your browser to see the changes.
以上时mode模式的使用介绍，需要手动刷新浏览器是一个缺点。


## Watch Mode with Chrome DevTools Workspaces
If you set up Chrome to persist changes when saving from the Sources panel so you don't have to refresh the page, you will have to setup webpack to use

`devtool: "inline-source-map"`
to continue editing and saving your changes from Chrome or source files.

There are some gotchas about using workspaces with watch:

- Large chunks (such as a common chunk that is over 1MB) that are rebuilt could cause the page to blank, which will force you to refresh the browser.
- Smaller chunks will be faster to build than larger chunks since inline-source-map is slower due to having to base64 encode the original source code.

以上提供一个不用手动刷新浏览器的方法，但是这个方法也会产生一些问题，比如大的chunks文件会导致浏览器的卡顿和空白页，这个时候还是需要手动刷新浏览器。



## devServer.inline - CLI only

Toggle between the dev-server's two different modes. By default the application will be served with inline mode enabled. This means that a script will be inserted in your bundle to take care of live reloading, and build messages will appear in the browser console.

It is also possible to use iframe mode, which uses an <iframe> under a notification bar with messages about the build. To switch to iframe mode:

inline: false
 > Inline mode is recommended when using Hot Module Replacement.

inline是inline-mode和iframe-mode两种模式的开关，默认的模式是inline模式，如果使用了热重载，建议使用inline模式。
