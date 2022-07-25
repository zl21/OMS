# webpack5源码解析

## 目标
- 读源码的技巧
- webpack的打包流程
- compiler 与 compilation
- 抽象语法树 ast
- 手写简易版打包器、loader、plugin

## 源码解析
- 首先，当我们执行`npm install webpack webpack-cli`的时候，node 会在项目所在目录的`node_modules/.bin`目录下生成脚手架指定的指令对应的软链接
- 执行 `npm run build`，找到软连接 `node_modules/.bin/webpack` 即（node_modules/webpack/bin/webpack.js）

- 该文件中判断了是否已经安装必要的依赖包等操作，如果安装完成，则往下走`runCli(cli)`，该方法中`require`了一个文件，即`node_modules/webpack-cli/lib/webpack-cli.js`，总结如下：
```js
// node_modules/webpack/bin/webpack.js
runCli(cli) {
  require ('node_modules/webpack-cli/lib/webpack-cli.js')
}
```

- 接着：
```js
// webpack-cli/lib/webpack-cli.js
const runCLI = require("../lib/bootstrap");
runCLI(process.argv);

// ../lib/bootstrap.js
const WebpackCLI = require("./webpack-cli.js");
const cli = new WebpackCLI();
cli.run(args)

// ./webpack-cli.js
// 定义了一个 WebpackCLI 类，类里有 run 方法
```

- WebpackCLI 类
program = 引入了处理命令行参数的工具 commander，执行 new WebpackCLI() 时，触发program.action() 回调，action 中执行了：
> loadCommandByName -> makeCommand -> runWebpack
runWebpack 中执行了：
> createCompiler()
该方法内部调用了 `webpack(congif, cb)` 方法（`npm install webpack`的webpack方法），接收配置文件和回调，最终生成一个 compiler 对象，该对象会在上述的调用过程中被返回，它是 webpack 打包的第一核心要素
> 小结：使用 webpack 函数来接收config配置，然后调用run()方法，即可让 webpack 执行打包。

#### 测试Demo：
```js
/* src/index.js */

console.log('This is index.js');
```

```js
/* run.js */

// 1. 引
const webpack = require('webpack')
const config = require('./webpack.config')

// 2. 创建实例
const compiler = webpack(config)

// 3. 调用，打包
compiler.run((err, status) => {
  console.log('run::', err, status)
})
```
```js
/* webpack.config.js */

const path = require('path')

module.exports = {
  devtool: false,
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve('dist')
  }
}
```
```js
// 命令行执行：
node run.js
```
```js
// 执行结果：
/* dist/main.js */

/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
console.log('index.js');
/******/ })()
;
```

<!-- ```flow
st=>start: 执行 npm run build
op1=>operation: program（commander）
op2=>operation: action
op3=>operation: loadCommandByName -> makeCommand -> runWebpack
op=>operation: Your Operation
cond=>condition: Yes or No?
e=>end
st->op1->op2->op3->cond
cond(yes)->e
cond(no)->op
``` -->

### 读源码的技巧
1、代码篇幅较大时，运用vs的大纲/outline功能

## 语法
- path.dirname:
 path.dirname('/foo/bar/baz/asdf/quux') // '/foo/bar/baz/asdf'
- [path.resolve](https://wenku.baidu.com/view/505c0ce3b84cf7ec4afe04a1b0717fd5360cb2c6.html):
  相当于各个参数依次cd
- require.resolve:
  查询某个模块文件的带有完整绝对路径的文件名，即绝对路径

<!-- <font color='red' size='6px'>nihao</font> -->
