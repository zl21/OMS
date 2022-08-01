const path = require('path')

module.exports = {
  devtool: false,
  mode: 'development',
  context: path.resolve(__dirname, ''), // 指定打包项目的起点 即 根目录
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve('dist')
  }
}
