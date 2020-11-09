module.exports = {
  extends: ['airbnb-base', 'plugin:vue/recommended'],
  plugins: ['vue', 'jsx'],
  settings: {
    'import/resolver': {
      webpack: {
        config: './webpack.config.js'
      }
      // alias: {
      //   map: [
      //     ["@framework", "node_modules/@syman/burgeon-r3-components/r3.publish/src"]
      //   ]
      // }
    }
  },
  globals: {
    jquery: true,
    jQuery: true,
    $: true,
    R3: true,
    'window.jQuery': true,
    customizedModuleName: true,
    customizedModuleId: true
  },
  env: {
    browser: true,
    node: true
  },
  rules: {
    'no-trailing-spaces': 'off',
    'linebreak-style': 'off',
    'import/no-cycle': 'off',
    'max-len': 'off',
    indent: 'off',
    // 'no-const-assign': 0, //禁止修改const声明的变量
    'arrow-parens': 0, // 箭头函数用小括号括起来
    'arrow-spacing': 0, // =>的前/后括号
    'no-console': 0, // 禁止使用console
    'no-octal-escape': 0, // 禁止使用八进制转义序列
    'prefer-const ': 0,
    'default-case': 0,
    'vue/no-parsing-error': [2, { 'x-invalid-end-tag': false }],
    eqeqeq: ['off'],
    'no-useless-escape': 0, // 转义字符, 这里设置为0则可通过检查
    // quotes: [1, "single"],
    radix: 'off',
    'no-plusplus': 'off',
    'prefer-destructuring': 'off',
    'global-require': 'off',
    'comma-dangle': 'off',
    'no-underscore-dangle': 'off',
    'guard-for-in': 'off',
    'no-restricted-syntax': 'off',
    'no-param-reassign': 'off',
    'vue/script-indent': ['error', 2, { baseIndent: 1 }],
    'vue/order-in-components': 'off',
    'no-extend-native': 'off',
    'no-eval': 'off',
    'no-shadow': 'off'
  },
  // overrides: [
  //   {
  //     files: ['*.vue'],
  //     rules: {
  //       indent: 'off'
  //     }
  //   }
  // ],
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module',
    ecmaVersion: 2017
  }
};
