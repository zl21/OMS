/**
 * 导出模块文件
 * @param {*} requireFiles require.context 导出的文件
 * @param {*} isCaml 是否需要将文件名处理成驼峰 cdn.config => cdnConfig
 * @param {*} isExclude 是否过滤文件夹中的 index.js
 * @returns 
 */
export function exportModules(requireFiles, isCaml, isExclude) {
  let excludes = ['./index.js']

  let exportModules =  requireFiles
  .keys()
  .filter(url => isExclude ? excludes.indexOf(url) === -1 : true)
  .reduce((exportModules, modulePath) => {
    let moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
    if (isCaml) {
      // 文件名转驼峰
      moduleName = moduleName.split('.').map((i,index) => {
        return index === 0 ? i : i.charAt(0).toUpperCase() + i.slice(1)
      }).join('')
    }
    exportModules[moduleName] = requireFiles(modulePath).default || requireFiles(modulePath)
    return exportModules
  }, {})
  console.log(exportModules);
  return exportModules
};