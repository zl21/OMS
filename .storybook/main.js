// 入口文件，配置插件，webpack等

const path = require('path');

module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-notes/register",
    {
      name: "@storybook/addon-storysource",
      options: {
        rule: {
          // test: [/\.stories\.jsx?$/], This is default
          include: [path.resolve(__dirname, "../src/**/*.stories.@(js|jsx|ts|tsx)")], // 找到自己存放stories的文件夹
        },
        loaderOptions: {
          /**
           * 默认配置：
            {
              printWidth: 100,
              tabWidth: 2,
              bracketSpacing: true,
              trailingComma: 'es5',
              singleQuote: true,
            }
           */
          prettierConfig: { printWidth: 80, singleQuote: false },
        },
      },
    }
  ],
  "webpackFinal": async (config, { configType }) => {
    config.module.rules.push({
      test: /\.less$/,
      use: ['style-loader', 'css-loader', 'less-loader'],
      include: path.resolve(__dirname, '../'),
    });
    config.module.rules.push({
      test: /\.m?js$/,
      use: {
        loader: 'babel-loader'
      },
    })
    config.resolve.alias = {
      ...config.resolve.alias,
      burgeonComponents: path.resolve(__dirname, '../src/'),
      framework: path.resolve(__dirname, '../node_modules/@syman/burgeon-r3-components/r3.publish/src'),
      omsTheme: path.resolve(__dirname, '../node_modules/@burgeon/oms-theme/skin'),
    }
    config.externals = {
      ...config.externals,
      '@syman/ark-ui-bcl': '$Bcl',
      'ark-ui': 'Ark',
      vue: 'Vue',
      jquery: '$',
      VueI18n: 'VueI18n',
      'element-ui': 'ELEMENT',
      lodash: {
        commonjs: 'lodash',
        commonjs2: 'lodash',
        amd: 'lodash',
        root: '_'
      },
    }
    return config;
  },
}