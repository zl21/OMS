/** 
 * 共用方法
*/

/**
 * 适用于前端分页
 * @method 分页初始化方法
 * @param {Array} sumData 总数据
 * @param {Object} config 分页的配置（含有current（页数）、pageSize（每页个数））
 * @returns {Object} data: 当前页数据；config: 分页的配置
*/
export const pagingInit = (sumData, config) => {
  let sumTableData = JSON.parse(JSON.stringify(sumData)) // 所有数据
  let listData = []
  let dataConfig = Object.assign({}, config)
  let pageSize = dataConfig.pageSize
  let start = (dataConfig.current - 1) * pageSize
  let end = start + pageSize
  let dialogTableConfigData = sumTableData.slice(start, end)
  if (dialogTableConfigData.length === 0) {
    // 当前页都被删除
    if (dataConfig.current === 1) {
      // 当前页为第一页
      listData = []
    } else {
      // 当前页不为第一页
      listData = sumTableData.slice(start - pageSize, end - pageSize)
      dataConfig.current--
    }
  } else {
    listData = dialogTableConfigData
  }
  return {
    data: listData,
    config: dataConfig
  }
}

/**
 * 日期 format
 * @method 日期转换
 * @param {Date} newDate {Object Date}
 * @param {String} format {String} 示例: yyyy-MM-dd hh:mm:ss
 */
const dateFormat = (newDate, format) => {
  var e = {
    'M+': newDate.getMonth() + 1,
    'd+': newDate.getDate(),
    'h+': newDate.getHours(),
    'm+': newDate.getMinutes(),
    's+': newDate.getSeconds()
  };
  /(y+)/.test(format) && (format = format.replace(RegExp.$1, (newDate.getFullYear() + '').substr(4 - RegExp.$1.length)))
  for (var n in e) new RegExp('(' + n + ')').test(format) && (format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? e[n] : ('00' + e[n]).substr(('' + e[n]).length)))
  return format
}

export default {
  pagingInit,
  dateFormat
}