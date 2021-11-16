let excludes = ['./index.js']
let requireFiles = require.context('@/config/config', false, /\.js$/);

const exportModules = requireFiles
  .keys()
  .filter( url => { return excludes.indexOf(url) === -1})
  .reduce((exportModules, modulePath) => {
    let moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
    // 文件名转驼峰 customized.page.config => customizedPageConfig
    moduleName = moduleName.split('.').map((i,index) => {
      return index === 0 ? i : i.charAt(0).toUpperCase() + i.slice(1)
    }).join('')
    exportModules[moduleName] = requireFiles(modulePath).default
    return exportModules
  }, {});

export default exportModules;