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
