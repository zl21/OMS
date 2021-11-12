let layoutFiles = require.context('@/commonPages/layout/', false, /\.vue$/);
const layoutDirectionSlot = layoutFiles.keys().reduce((layoutDirectionSlot, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = layoutFiles(modulePath)
  layoutDirectionSlot[moduleName] = value.default
  return layoutDirectionSlot
}, {});

export default layoutDirectionSlot;