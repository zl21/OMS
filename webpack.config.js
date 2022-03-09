/* eslint-disable */
const path = require('path');
const webpack = require('webpack');
const copyWebpackPlugin = require('copy-webpack-plugin');

const burgeonPlugins = [
  new webpack.DefinePlugin({
    'process.env.BUILD_ENV': JSON.stringify(process.env.BUILD_ENV)
  }),
  new webpack.HotModuleReplacementPlugin(),
  new copyWebpackPlugin({
    patterns: [
      {
        from: path.resolve(__dirname, "./src/langs/zh_CN"),
        to: path.resolve(__dirname, "./dist/langs/zh_CN")
      },
    ],
  })
]
if (process.env.npm_config_report) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
  burgeonPlugins.push(new BundleAnalyzerPlugin());
}

module.exports = () => ({
  entry: './index.js',
  output: {
    filename: 'index.min.js',
    chunkFilename: 'i18n/[name].min.js',
    path: path.join(__dirname, './dist'),
    // globalObject: 'this',
    libraryExport: 'default',
    library: '$i18n',
    libraryTarget: 'umd',
    umdNamedDefine: true,
    clean: true,
  },
  devtool: 'eval-cheap-module-source-map',
  externals: {},
  module: {
    exprContextCritical: false,
    rules: [{
      test: /\.m?js$/,
      use: {
        loader: 'babel-loader'
      },
    },
    ],
  },
  devServer: {
    compress: true,
    hot: true,
    // port: 8080,
    host: '0.0.0.0',
    open: true,
    static: './dist',
  },
  plugins: burgeonPlugins,
  mode: 'production',
  resolve: {
    extensions: ['.js', '.json', '.vue', '.css'],
    fallback: {
      // path: require.resolve('path-browserify'),
      // timers: require.resolve('timers-browserify')
    },
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  optimization: {
    minimizer: [],
  },
});