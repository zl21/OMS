let requireAll = require.context('@/commonPages/layout', false, /\.vue$/);
const modules = requireAll.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  modules[moduleName] = requireAll(modulePath).default
  return modules
}, {});

export default modules;