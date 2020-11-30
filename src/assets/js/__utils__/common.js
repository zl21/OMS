/** 
 * 共用对象
*/
const pageConfig = {
  // 设置总条数
  total: 0,
  // 条数
  pageSize: 50,
  // 页数
  current: 1,
  pageSizeOpts: [50, 200, 500, 2000]
};
/**
 * 适用于前端分页
 * @method 分页初始化方法
 * @param {Array} sumData 总数据
 * @param {Object} config 分页的配置（含有current（页数）、pageSize（每页个数））
 * @returns {Object} data: 当前页数据；config: 分页的配置
*/
export const pagingInit = (sumData, config) => {
  const sumTableData = JSON.parse(JSON.stringify(sumData)); // 所有数据
  let listData = [];
  const dataConfig = Object.assign({}, config);
  const pageSize = dataConfig.pageSize;
  const start = (dataConfig.current - 1) * pageSize;
  const end = start + pageSize;
  const dialogTableConfigData = sumTableData.slice(start, end);
  if (dialogTableConfigData.length === 0) {
    // 当前页都被删除
    if (dataConfig.current === 1) {
      // 当前页为第一页
      listData = [];
    } else {
      // 当前页不为第一页
      listData = sumTableData.slice(start - pageSize, end - pageSize);
      dataConfig.current--;
    }
  } else {
    listData = dialogTableConfigData;
  }
  return {
    data: listData,
    config: dataConfig
  };
};

/**
 * 日期 format
 * @method 日期转换
 * @param {Date} newDate {Object Date}
 * @param {String} format {String} 示例: yyyy-MM-dd hh:mm:ss
 */
const dateFormat = (newDate, format) => {
  const e = {
    'M+': newDate.getMonth() + 1,
    'd+': newDate.getDate(),
    'h+': newDate.getHours(),
    'm+': newDate.getMinutes(),
    's+': newDate.getSeconds()
  };
  /(y+)/.test(format) && (format = format.replace(RegExp.$1, (`${newDate.getFullYear()}`).substr(4 - RegExp.$1.length)));
  for (const n in e) new RegExp(`(${n})`).test(format) && (format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? e[n] : (`00${e[n]}`).substr((`${e[n]}`).length)));
  return format;
};

/**
 * 关闭当前tab
 * @param _self 指向当前this
 */
const tabCloseAppoint = (_self) => {
  const { fullPath } = _self.$route;
  const { keepAliveModuleName, tableName } = _self.$store.state.global.activeTab;
    R3.store.commit('global/tabCloseAppoint',{
    routeFullPath: fullPath,
    stopRouterPush: true,
    keepAliveModuleName,
    tableName,
  });
};

/**
 * 关闭当前tab
 * @param _self 指向当前this
 * @param defaultHeight 指向当前this
 * 获取agTable高度
 * 通过 totalHeight 节点
 */
const setTableHeight = (_self, defaultHeight) => {
  const contentHeight = document.getElementById('content').clientHeight;
  // 获取需要除了agTable之外的节点
  const arr = document.getElementsByClassName('totalHeight');
  let sumHeight = 34 + defaultHeight;
  Object.getOwnPropertyNames(arr).forEach((item) => {
    sumHeight += parseInt(arr[item].clientHeight);
  });
  _self.agTableConfig.tableHeight = `${contentHeight - sumHeight}px`;
};

export default {
  pagingInit,
  dateFormat,
  tabCloseAppoint,
  setTableHeight,
  pageConfig
};
