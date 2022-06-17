# webpack5源码解析

## 目标
· 读源码的技巧
· webpack的打包流程
· compiler 与 compilation
· 抽象语法树 ast
· 手写简易版打包器、loader、plugin

## 源码解析
· 执行 npm run build，node_modules/.bin/webpack 即（node_modules/webpack/bin/webpack.js）
· 走走走，找到(node_modules/webpack-cli/lib/webpack-cli.js)下的类WebpackCLI，该类下的run()，
1、打包入口

### 读源码的技巧
1、代码篇幅较大时，运用vs的大纲/outline功能

## 语法
path.dirname:
 path.dirname('/foo/bar/baz/asdf/quux') // '/foo/bar/baz/asdf'
path.resolve:
  相当于各个参数依次cd，https://wenku.baidu.com/view/505c0ce3b84cf7ec4afe04a1b0717fd5360cb2c6.html
require.resolve:
  查询某个模块文件的带有完整绝对路径的文件名，即绝对路径
