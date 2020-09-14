const presets = [
  [
    '@babel/env',
    {
      targets: {
        chrome: '57'
      }
    }
  ]
];

const plugins = [
  '@babel/plugin-syntax-dynamic-import',
  'transform-vue-jsx',
  '@babel/plugin-proposal-optional-chaining',
  '@babel/plugin-proposal-nullish-coalescing-operator'
];

module.exports = { presets, plugins };
