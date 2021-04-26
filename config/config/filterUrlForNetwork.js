// 此文件用于筛选不需要框架根据code为-1，-2报错提示框架的接口，return false为不弹出框架报错提示框，需自定义界面或者弹框自行处理
export default data => {
  // url: response.config.url,当前url
  // router: router.currentRoute当前表路由信息
  // config:filterUrlForNetwork配置
  if (data.router.params) {
    if (data.router.params.tableName && data.config().configPage[data.router.params.tableName] && data.config().configPage[data.router.params.tableName].filter(u => u === data.url).length > 0) {
      // 筛选出配置界面不需要根据框架code报错提示框的接口
      return false;
    }
    if (data.router.params.customizedModuleName && data.router.meta.routePrefix === '/CUSTOMIZED' && data.config().customizePage.filter(r => data.router.params.customizedModuleName.toLocaleLowerCase() === r.toLocaleLowerCase()).length > 0) {
      // 筛选出定制界面不需要根据框架code报错提示框的接口
      return false;
    }
  }
  return true;
};
