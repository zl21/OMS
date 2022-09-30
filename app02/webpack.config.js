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
      name: 'app02',
      remotes: {
        app01: "app01@http://localhost:8081/remoteEntry.js"
      }
    }),
    new HtmlWebpackPlugin({
      template: './index.html',
      favicon: './favicon.ico'
    })
  ],
  devServer: {
    port: 8082,
    open: true,
    hot: true,
  }
}
