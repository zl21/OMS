/*
 * @Author: your name
 * @Date: 2021-11-01 15:32:39
 * @LastEditTime: 2022-01-20 19:18:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /burgeon-business-components/src/index.js
 */
let comJS = require.context('burgeonComponents/common/js/', false, /\.js$/)

const Utils = {}
comJS.keys().forEach(key => {
  if (key == './utils.js') {
    Utils.CM = comJS(key).default
  } else {
    const obj = comJS(key).default
    Object.assign(Utils, obj)
  }
})
// Utils.unZip = require('./src/common/js/zip/index').default

const context = require.context('burgeonComponents/view/', false, /\.vue$/)
const Components = Utils.CM.exportModules(context)

const contextR3Cps = require.context('burgeonComponents/r3.components/src/components/', true, /\.vue$/)
const R3Components = Utils.CM.exportModules(contextR3Cps)

let directiveFiles = require.context('burgeonComponents/directive/', false, /\.js$/)
const Directives = Utils.CM.exportModules(directiveFiles)

const install = function (Vue, opts = {}) {
  context.keys().forEach(key => {
    const component = context(key).default
    Vue.component(component.name, component)
  })

  Object.keys(Directives).forEach(key => {
    Vue.directive(key, Directives[key])
  })

  window.$utils = Utils.CM
  Vue.prototype.$utils = Utils.CM
}
const install2 = function (Vue, opts = {}) {
  console.log(999,contextR3Cps);
  contextR3Cps.keys().forEach(key => {
    const cname = 'R3'+ contextR3Cps(key).default.name
    contextR3Cps(key).default.name = cname
    const component = contextR3Cps(key).default
    Vue.component(cname, component)
  })

  Object.keys(Directives).forEach(key => {
    Vue.directive(key, Directives[key])
  })

  window.$utils = Utils.CM
  Vue.prototype.$utils = Utils.CM
}

const BC = {
  install,
  install2,
  Components,
  R3Components,
  Utils,
  name: '@burgeon/business-components',
  version: require('./package.json').version
}

// auto install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
  install2(window.Vue)
}

export default BC
