let excludes = ['./index.js']
let requireMixin = require.context('@/config/minxin', true, /\.js$/);

const exportModules = requireMixin
  .keys()
  .filter(url => { return excludes.indexOf(url) === -1})
  .reduce((exportModules, modulePath) => {
    let moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
    exportModules[moduleName] = requireMixin(modulePath).default
    return exportModules
  }, {});

export default exportModules;