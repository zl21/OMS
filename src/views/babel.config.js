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
  '@babel/plugin-syntax-class-properties',
  'transform-vue-jsx',
  '@babel/plugin-proposal-optional-chaining',
  '@babel/plugin-proposal-nullish-coalescing-operator',
  '@babel/plugin-proposal-class-properties',
];

module.exports = { presets, plugins };
