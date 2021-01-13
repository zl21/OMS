const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const projectConfig = require('./project.config');

const target = projectConfig.target; // 框架研发网关开启环境
const proxyLists = projectConfig.burgeonProxy;
const indexProHtml = path.posix.join('/', 'index.pro.html');
const indexHtml = path.posix.join('/', 'index.html');
const envFlag = Boolean(process.env && process.env.production);
// const devtoolFlag = envFlag ? 'source-map' : 'cheap-module-eval-source-map';
const burgeonPlugins = [
  new MiniCssExtractPlugin({
    filename: 'r3.css'
  }),
  new CleanWebpackPlugin([process.env && process.env.production ? 'dist' : 'devDist']),
  new VueLoaderPlugin(),
  new HtmlWebpackPlugin({
    chunksSortMode: 'none',
    title: process.env && process.env.production ? projectConfig.projectsTitle : `Debug:${projectConfig.projectsTitle}`,
    template: process.env && process.env.production ? './index.pro.html' : './index.html',
    inject: true,
    favicon: projectConfig.projectIconPath
  }),
  new CopyWebpackPlugin([
    {
      from: path.resolve(__dirname, './static'),
      to: 'static',
      ignore: ['.*']
    }
  ]),
  new webpack.DefinePlugin({
    omsSkinTheme: JSON.stringify(projectConfig.omsTheme)
  }),

  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
    jquery: 'jquery',
    'window.jQuery': 'jquery'
  })
];

if (projectConfig.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
  burgeonPlugins.push(new BundleAnalyzerPlugin());
}

module.exports = () => ({
  entry: {
    index: './index.js'
  },
  externals: {
    vue: 'Vue',
    vuex: 'Vuex',
    'vue-router': 'VueRouter',
    axios: 'axios',
    // 'ag-grid': 'agGrid',
    'ark-ui': 'Ark',
    ztree: 'ztree',
    jquery: '$'
  },
  devServer: {
    compress: true,
    port: 8080,
    host: 'localhost',
    open: true,
    historyApiFallback: {
      rewrites: [
        {
          from: /.*/,
          to: envFlag ? indexProHtml : indexHtml
        }
      ]
    },
    publicPath: '/',
    proxy: [
      {
        context: proxyLists,
        target,
        changeOrigin: true
      },
      {
        '/yapi': 'http://yapi.dev.syman.cn/mock/624',
        changeOrigin: true
      }
    ]
  },
  target: 'web',
  devtool: 'cheap-module-source-map',
  // devtool: devtoolFlag,
  output: {
    filename: '[name].js',
    chunkFilename: '[name].js',
    path: path.join(__dirname, './dist'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader'
          }
        ]
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(sa|sc|c|le)ss$/,
        // include: [path.resolve('./node_modules/@burgeon/oms-theme/')],
        use: [
          {
            loader: envFlag ? MiniCssExtractPlugin.loader : 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: '[path][name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
              context: 'src'
            }
          }
        ]
      },
      {
        test: /\.(mp3)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          name: 'audios/[name].[ext]',
          limit: 10
        }
      }
    ]
  },
  plugins: burgeonPlugins,
  mode: envFlag ? 'production' : 'development',
  resolve: {
    extensions: ['.js', '.json', '.vue', '.css'],
    fallback: { timers: require.resolve('timers-browserify') },
    alias: {
      '@': path.resolve(__dirname, 'src'),
      libs: path.resolve(__dirname, 'node_modules'),
      allpages: path.resolve(__dirname, 'src/views/pages'),
      burgeonConfig: path.resolve(__dirname, 'src/config'),
      framework: path.resolve(__dirname, 'node_modules/@syman/burgeon-r3-components/r3.publish/src'),
      professionalComponents: path.resolve(__dirname, 'node_modules/@burgeon/business-components'),
      omsTheme: path.resolve(__dirname, '/node_modules/@burgeon/oms-theme/skin')
    }
  },
  optimization: {
    minimizer: [
      new TerserJSPlugin({
        sourceMap: true,
        terserOptions: {
          compress: {
            pure_funcs: ['console.log']
          }
        }
      }),
      new OptimizeCSSAssetsPlugin({})
    ],
    splitChunks: {
      chunks: 'all'
    }
  }
});
