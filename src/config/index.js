const exportModules = (requireFiles) => requireFiles.keys().reduce((exportModules, modulePath) => {
  let moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  // 文件名转驼峰
  moduleName = moduleName.split('.').map((i,index) => {
    return index === 0 ? i : i.charAt(0).toUpperCase() + i.slice(1)
  }).join('')
  exportModules[moduleName] = requireFiles(modulePath).default || requireFiles(modulePath)
  return exportModules
}, {});

let requireConfig = require.context('@/config/config', false, /\.js$/);

let requireMixin = require.context('@/config/minxin', true, /\.js$/);

export default {
  config: exportModules(requireConfig),
  mixins: exportModules(requireMixin)
};