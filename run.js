// 引
const webpack = require('webpack')
const config = require('./webpack.config')

// 创建实例
const compiler = webpack(config)

// 调用，打包
compiler.run((err, status) => {
  console.log('run::', err, status)
})
