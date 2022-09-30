const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { ModuleFederationPlugin } = require('webpack').container

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: './main_[hash].js'
  },
  mode: 'production',
  plugins: [
    new ModuleFederationPlugin({
      // 作为输出的模块名，使用的时通过 ${name}/${expose} 的方式使用
      name: 'app01',
      // 构建输出的文件名，eg.成功后可访问（http://localhost:8081/remoteEntry.js）
      filename: 'remoteEntry.js',
      // 作为 Host(消费者) 时，去消费哪些 Remote(提供者) ，如下消费other应用
      /* remotes: {
        other: 'other@http://localhost:9002/remoteEntry.js'
      }, */
      // 作为 Remote 时，export 哪些属性被消费，如下Herder 被提供
      exposes: {
        './Header': './src/header.js'
      },
      // 可以提供的依赖，优先使用HOST的
      // shared: ['vue']
    }),
    new HtmlWebpackPlugin({
      template: './index.html',
      favicon: './favicon.ico'
    })
  ],
  devServer: {
    port: 8081,
    open: true,
    hot: true
  }
}
