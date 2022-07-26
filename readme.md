# webpack5源码阅读
*node版本14.17.x*
## 目标
- 读源码的技巧
- webpack的打包流程
- compiler 与 compilation
- 抽象语法树 ast
- 手写简易版打包器、loader、plugin

## 源码解析
#### ==. 首先：==
- 当我们执行`npm install webpack webpack-cli`的时候，node 会在项目所在目录的`node_modules/.bin`目录下生成脚手架指定的指令对应的软链接
- 执行 `npm run build`，找到软连接 `node_modules/.bin/webpack` 即（node_modules/webpack/bin/webpack.js）

- 该文件中判断了是否已经安装必要的依赖包等操作，如果安装完成，则往下走`runCli(cli)`，该方法中`require`了一个文件，即`node_modules/webpack-cli/lib/webpack-cli.js`，总结如下：
```js
/* node_modules/webpack/bin/webpack.js */

runCli(cli) {
  require ('node_modules/webpack-cli/lib/webpack-cli.js')
}
```
#### ==. 接着：==
```js
/* webpack-cli/lib/webpack-cli.js */

const runCLI = require("../lib/bootstrap");
runCLI(process.argv);


/* ../lib/bootstrap.js */

const WebpackCLI = require("./webpack-cli.js");
const cli = new WebpackCLI();
cli.run(args)


/* ./webpack-cli.js */

// 定义了一个 WebpackCLI 类，类里有 run 方法
class WebpackCLI {
  constructor() {}
  async run(args, parseOptions) {}
}
```
![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ae2c82d746464df2b7822595db1cc06a~tplv-k3u1fbpfcp-watermark.image?)

- WebpackCLI 类
program = 引入了处理命令行参数的工具 commander，执行 `new WebpackCLI()` 时，触发 `program.action()` 回调，action 中执行了：
> loadCommandByName -> makeCommand -> runWebpack

runWebpack 中执行了：
> `compiler = await this.createCompiler(options, callback);`
>>该方法内部调用了 `webpack(config.options, cb)` 方法，即是`npm install webpack`的 webpack 方法，接收配置文件和回调，最终生成一个 compiler 对象，该对象会在上述的调用过程中被返回，它是 webpack 打包的第一核心要素。

```js
/* node_modules/webpack-cli/lib/webpack-cli.js */

async createCompiler(options, callback) {
  try {
    compiler = this.webpack(config.options,callback);
  } catch (error) { }
  return compiler
}
```

```js
/* node_modules/webpack/lib/webpack.js */

const webpack = (options, callback) => {
    compiler = createCompiler(webpackOptions);
  if (callback) {
    // 调用 run 方法
    compiler.run((err, stats) => {});
  }
}
```

> **小结**：使用 webpack 函数来接收config配置，然后调用 `run()` 方法，即可让 webpack 执行打包。

<font color='red' size=4>测试Demo：</font>
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

#### ==. 紧接着：==
- 进入`npm install webpack`的 webpack 方法 (`node_modules/webpack/lib/webpack.js`)，需要明确：
  1. webpack 首先是一个函数
  0. 关于 webpack 函数，无论我们是否传入 callback，都将会调用 `create()`，最终返回一个 compiler 实例
  0. compiler 是由 `createCompiler(options)` 创建而来，该方法中除了 `new Compiler(options.context)` 之外，还有其它关键操作，代码如下代码：
```js
/**
 * @param {WebpackOptions} rawOptions options object
 * @returns {Compiler} a compiler
 */
const createCompiler = rawOptions => {
  const options = getNormalizedWebpackOptions(rawOptions);
  applyWebpackOptionsBaseDefaults(options);
  // 创建 Compiler 实例
  const compiler = new Compiler(options.context, options);
  // 挂载插件
  new NodeEnvironmentPlugin({
    infrastructureLogging: options.infrastructureLogging
  }).apply(compiler);
  if (Array.isArray(options.plugins)) {
    for (const plugin of options.plugins) {
      if (typeof plugin === "function") {
        plugin.call(compiler, compiler);
      } else {
        plugin.apply(compiler);
      }
    }
  }
  applyWebpackOptionsDefaults(options);
  compiler.hooks.environment.call();
  compiler.hooks.afterEnvironment.call();
  // 根据传入的配置文件加载相应的插件，如externals、entry（EntryOptionPlugin）、devtool……
  new WebpackOptionsApply().process(options, compiler);
  compiler.hooks.initialize.call();
  return compiler;
};
```
  4. webpack 打包过程中，插件是在 compiler 声明之后挂载的（并不代表执行了）。

#### ==. 然后：==
> <strong>`compiler.run((err, stats) => {});`</strong>

```js
/* node_modules/webpack/lib/Compiler.js */

class Compiler {
  constructor() { ... }

  // 这个 run 方法在外部会被 Compiler 实例调用，compiler.run()
  run(callback) {
    if (this.running) {
      return callback(new ConcurrentCompilationError());
    }
    let logger;
    // 最终的回调
    const finalCallback = (err, stats) => { ... };
    const startTime = Date.now();
    this.running = true;
    // 在 compile 完成之后调用的回调
    const onCompiled = (err, compilation) => { ... };
    // 在 run 的内部，又定义了一个 run 方法
    const run = () => {
      this.hooks.beforeRun.callAsync(this, err => {
        if (err) return finalCallback(err);
        this.hooks.run.callAsync(this, err => {
          if (err) return finalCallback(err);
          this.readRecords(err => {
            if (err) return finalCallback(err);
            // 调用 compile
            this.compile(onCompiled);
          });
        });
      });
    };
    // 执行 run 方法
    run();
  }
}

```

> <strong>`this.compile(onCompiled);`</strong>
```js
/* node_modules/webpack/lib/Compiler.js */

// 包含了一个相对完整的打包流程，beforeCompile -> compile -> make -> finishMake -> afterCompile
compile(callback) {
  const params = this.newCompilationParams();
  this.hooks.beforeCompile.callAsync(params, err => {
    if (err) return callback(err);

    this.hooks.compile.call(params);
    // 关键点1: 声明了一个 compilation
    const compilation = this.newCompilation(params);
    const logger = compilation.getLogger("webpack.Compiler");
    logger.time("make hook");
    // 踩地雷。具体的模块打包阶段.make
    // 此处只是触发了一个事件的监听，重点是找到 make 这个钩子的注册 （call -> tap）
    /**
     * 找 make 钩子的定义：
     *  webpack 打包一定需要先明确入口，`new Compiler()` 之后有做插件挂载
     *  option.entry 这个属性在挂载插件的时候就被处理了
     *  由上定位到了 `new WebpackOptionsApply().process(options, compiler)` 方法调用的模块中的 `EntryOptionPlugin.apply()`
     *  该 apply 方法的回调中执行了一个静态方法，该静态方法中最终执行了 `new EntryPlugin()`
     *  在 EntryPlugin 插件内部，可以找到 `compiler.hooks.make.tapAsync`，它定义了相应的回调
     */
    /* 
    // node_modules/webpack/lib/EntryPlugin.js
    
    apply(compiler) {
      compiler.hooks.make.tapAsync("EntryPlugin", (compilation, callback) => {
        compilation.addEntry(context, dep, options, err => {
          callback(err);
        });
      });
    }
    */
    this.hooks.make.callAsync(compilation, err => {
      logger.timeEnd("make hook");
      if (err) return callback(err);

      logger.time("finish make hook");
      this.hooks.finishMake.callAsync(compilation, err => {
        logger.timeEnd("finish make hook");
        if (err) return callback(err);

        process.nextTick(() => {
          logger.time("finish compilation");
          compilation.finish(err => {
            logger.timeEnd("finish compilation");
            if (err) return callback(err);

            logger.time("seal compilation");
            // 将处理好的内容写入磁盘文件
            compilation.seal(err => {
              logger.timeEnd("seal compilation");
              if (err) return callback(err);

              logger.time("afterCompile hook");
              this.hooks.afterCompile.callAsync(compilation, err => {
                logger.timeEnd("afterCompile hook");
                if (err) return callback(err);

                return callback(null, compilation);
              });
            });
          });
        });
      });
    });
  });
}
```
#### ==. 最后：==

compilation.seal 方法，将打包好的内容写入磁盘。

## 读源码的技巧
1. 代码篇幅较大时，运用vs的大纲/outline功能
0. 大胆的猜测
0. 多关注try而非catch
0. 利用 vs 的打标签/书签 功能


## 语法
- path.dirname:
 `path.dirname('/foo/bar/baz/asdf/quux') // '/foo/bar/baz/asdf'`
- [path.resolve](https://wenku.baidu.com/view/505c0ce3b84cf7ec4afe04a1b0717fd5360cb2c6.html):
  相当于各个参数依次cd
- __dirname:
  指的是当前文件所在文件夹的绝对路径。
- require.resolve:
  查询某个模块文件的带有完整绝对路径的文件名，即绝对路径

<!-- <font color='red' size='6px'>nihao</font> -->
