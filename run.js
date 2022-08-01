// 引
const webpack = require('webpack')
const config = require('./webpack.config')

// 创建实例
const compiler = webpack(config)

// 调用，打包
compiler.run((err, status) => {
  console.log('run::', err, status.toJson()) // 自带 toJson 方法
})

// 执行 node run.js