/* eslint-disable */
const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const copyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const config = {
  entry: {
    index: './index.js'
  },
  output: {
    filename: 'businessComponents.min.js',
    path: path.join(__dirname, './burgeon.publish'),
    globalObject: 'this',
    library: 'Burgeon',
    libraryTarget: 'umd',
    umdNamedDefine: true,
    clean: true,
    publicPath: './'
  },
  devtool: 'eval-cheap-module-source-map',
  externals: {
    vue: {
      commonjs: 'vue',
      commonjs2: 'vue',
      amd: 'vue',
      root: 'Vue'
    },
    vuex: {
      commonjs: 'vuex',
      commonjs2: 'vuex',
      amd: 'vuex',
      root: 'Vuex'
    },
    'vue-router': {
      commonjs: 'vue-router',
      commonjs2: 'vue-router',
      amd: 'vue-router',
      root: 'VueRouter'
    },
  },
  module: {
    exprContextCritical: false,
    rules: [{
      test: /\.vue$/,
      use: [{
        loader: 'vue-loader',
      },],
    },
    {
      test: /\.m?js$/,
      use: {
        loader: 'babel-loader'
      },
    },
    {
      test: /\.css$/,
      use: [{
        loader: 'style-loader',
      }, {
        loader: 'css-loader',
      }],
    },
    {
      test: /\.(sa|sc|le)ss$/,
      use: [{
        loader: MiniCssExtractPlugin.loader,
      }, {
        loader: 'css-loader',
      }, {
        loader: 'less-loader',
        // options: {
        //   javascriptEnabled: true
        // }
      }],
    },
    {
      test: /\.(png|jpg|gif|svg)$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 1000000,
          name: '[path][name].[ext]'
        }
      }]
    },
    {
      test: /\.(woff|woff2|eot|ttf|otf)$/,
      use: [{
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
          context: 'src',
        },
      },],
    },
    ],
  },
  devServer: {
    compress: true,
    hot: true,
    // port: 8080,
    host: '0.0.0.0',
    open: true,
    static: './burgeon.publish',
  },
  plugins: [
    new BundleAnalyzerPlugin(),
    new webpack.DefinePlugin({
      'process.env.BUILD_ENV': JSON.stringify(process.env.BUILD_ENV)
    }),
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: 'businessComponents.min.css',
    }),
    // new CleanWebpackPlugin(['burgeon.publish']),
    // new CleanWebpackPlugin(),
    new VueLoaderPlugin(),
    new copyWebpackPlugin({
      patterns: [
        /* {
          from: path.resolve(__dirname, "./src/static"),
          to: path.resolve(__dirname, "./burgeon.publish/static")
        }, */
        {
          from: path.resolve(__dirname, "./src/common/css"),
          to: path.resolve(__dirname, "./burgeon.publish/common/css")
        },
      ],
    })
  ],
  mode: 'production',
  resolve: {
    extensions: ['.js', '.json', '.vue', '.css'],
    fallback: {
      path: require.resolve('path-browserify'),
    },
    alias: {
      // 'burgeonComponents': path.resolve(__dirname, './src/view'),
      burgeonComponents: path.resolve(__dirname, './src/'),
      framework: path.resolve(__dirname, 'node_modules/@syman/burgeon-r3-components/r3.publish/src'),
      omsTheme: path.resolve(__dirname, 'node_modules/@burgeon/oms-theme/skin'),
    }
  },
  optimization: {
    minimizer: [new TerserJSPlugin({
      parallel: true,
      terserOptions: {
        compress: {
          // pure_funcs: ['console.log']
        }
      }
    }), new CssMinimizerPlugin()],
  },
}

module.exports = () => config;