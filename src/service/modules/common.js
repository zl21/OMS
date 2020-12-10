// 公共的接口
import R3 from '@syman/burgeon-r3';
import qs from 'qs';

const { network } = R3;

export default {
  getObject: params => network.post('/p/cs/getObject', params),
  queryPhyWareHouseList: params => network.post('/p/cs/queryPhyWareHouseList', params),
  selectLimitGroups: params => network.post('/p/cs/selectLimitGroups', params),
  objectTableItem: params => network.post('/p/cs/objectTableItem', params),
  saveWarehouseLogistics: params => network.post('/p/cs/saveWarehouseLogistics', params),
  // getWarehouseLogisticsTree: params => network.post('/p/cs/getWarehourseByShopId', params),
  getWarehouseLogisticsTree: params => network.post('/p/cs/getWarehouseLogisticsTree', params),
  getLogisticsRankResultTable: params => network.post('/p/cs/getLogisticsRankResultTable', params),
  getLogisticsLikeRankResultTable: params => network.post('/p/cs/getLogisticsLikeRankResultTable', params),
  voidWarehouseLogistics: params => network.post('/p/cs/voidWarehouseLogistics', params),
  exportWarehouseLogisticsRank: params => network.post('/p/cs/exportWarehouseLogisticsRank', params),
  getPromField: params => network.get('/p/cs/getPromField', params),
  getWarehouseLogisticsInfo: params => network.post('/p/cs/getWarehouseLogisticsInfo', params),
  delWarehouseLogistics: params => network.post('/p/cs/delWarehouseLogistics', params),
  selectCompenstateLogistic: params => network.post('/p/cs/selectCompenstateLogistic', params),
  expressAreaSaveCmd: params => network.post('/p/cs/expressAreaSaveCmd', params),
  getExpressAreaTree: params => network.post('/p/cs/getExpressAreaTree', params),
  getExpressAreaItemLikeTable: params => network.post('/p/cs/getExpressAreaItemLikeTable', params),
  getExpressAreaItemTable: params => network.post('/p/cs/getExpressAreaItemTable', params),
  exportExpressAreaItem: params => network.post('/p/cs/exportExpressAreaItem', params),
  skuQuery: params => network.post('/p/cs/skuQuery', params),
  fetchActionsInCustomizePage: params => network.get(`/p/cs/v2/fetchActionsInCustomizePage?${qs.stringify(params)}`),
  manualJdMatchingCheck: params => network.post('/p/cs/manualJdMatchingCheck', params),
  jdReturnStorageSave: params => network.get('/p/cs/jdReturnStorageSave', params),
  manualJdMatchingList: params => network.post('/p/cs/manualJdMatchingList', params),
  screenresult: params => network.post('/p/cs/screenresult', params),
  cpCHrorgTree: params => network.post('/p/c/cpCHrorgTree', params),
  addToFavorite: params => network.post('/p/cs/addToFavorite', params),
  groupTreeload: params => network.post('/p/cs/groupTreeload', params),
  removeFromFavorite: params => network.post('/p/cs/removeFromFavorite', params),
  itemDownload: params => network.post('/p/cs/itemDownload', params),
  getUserConfig: params => network.post('/p/cs/getUserConfig', params),
  QueryList: params => network.post('/p/cs/QueryList', params),
  SgOutNoticePrint: params => network.post('/p/cs/SgOutNoticePrint', params),
  fuzzyquerybyak: params => network.post('/p/cs/fuzzyquerybyak', params),
  cgroupcolumnquery: params => network.get(`/p/cs/cgroupcolumnquery?${qs.stringify(params)}`),
  queryShopPermission: params => network.get('/p/cs/queryShopPermission', params),
  screenresultcheck: params => network.post('/p/cs/screenresultcheck', params),
  searchButtonsInJdDetail: params => network.post('/p/cs/searchButtonsInJdDetail', params),
  objectSave: params => network.post('/p/cs/objectSave', params),
  expressAreaVoidCmd: params => network.post('/p/cs/expressAreaVoidCmd', params),
  cpromLogQuery: params => network.post('/p/cs/cpromLogQuery', params),
  getweekdate: params => network.post('/p/cs/getweekdate', params),
  getWarehourseByShopId: params => network.post('/p/cs/getWarehourseByShopId', params),
  voidPayableAdjustment: params => network.post('/p/cs/voidPayableAdjustment', params),
  regionBySelect: params => network.post('/p/cs/regionBySelect', params),
  prodel: params => network.post('/p/cs/prodel', params),
  exeAction: params => network.post('/p/cs/exeAction', params),
  menuimport: params => network.post('/p/cs/menuimport', params),
  queryOcBOrder: params => network.post('/api/cs/oc/oms/v1/queryOcBOrder', params),
  billCopy: params => network.post('/p/cs/billCopy', params),
  getOrderDetailList: params => network.post('/p/cs/getOrderDetailList', params),
  returnOrderquery: params => network.post('/api/cs/oc/oms/v1/returnOrderquery', params),
  returnSkuDb: params => network.post('/p/cs/returnSkuDb', params),
  checkAllStroreStock: params => network.post('/api/cs/oc/oms/v1/checkAllStroreStock', params),
  returnOrder: params => network.post('/api/cs/oc/oms/v1/returnOrder', params),
  chargebackcheck: params => network.post('/api/cs/oc/oms/v1/chargebackcheck', params),
  OcCancelChangingOrRefund: params => network.post('/api/cs/oc/oms/v1/OcCancelChangingOrRefund', params),
  updateVirtualLibrary: params => network.post('/api/cs/oc/oms/v1/updateVirtualLibrary', params),
  cancelautorefund: params => network.post('/api/cs/oc/oms/v1/cancelautorefund', params),
  queryResionByName: params => network.post('/p/cs/queryResionByName', params),
  getOrderList: params => network.post('/p/cs/getOrderList', params),
  extInfoQuery: params => network.post('/p/cs/extInfoQuery', params),
  manualJdMatchingConfirmationButton: params => network.post('/p/cs/manualJdMatchingConfirmationButton', params),
  seachJdForced: params => network.post('/p/cs/seachJdForced', params),
  getJdScanIncomingInfo: params => network.post('/p/cs/getJdScanIncomingInfo', params),
  saveJdScanIncoming: params => network.post('/p/cs/saveJdScanIncoming', params),
  getTableQuery: params => network.post('/p/cs/getTableQuery', params),
  groupQueryName: params => network.post('/p/cs/groupQueryName', params),
  cuserspro: params => network.post('/p/cs/cuserspro', params),
  objectDelete: params => network.post('/p/cs/objectDelete', params),
  cprolikequery: params => network.post('/p/cs/cprolikequery', params),
  cgroupsquery: params => network.get(`/p/cs/cgroupsquery?${qs.stringify(params)}`),
  getCopyTargetGroups: params => network.get(`/p/cs/getCopyTargetGroups?${qs.stringify(params)}`),
  // 导出接口。共用于：financeCenter、inventoryCenter
  exportPayableAdjustment: params => network.post('/p/cs/exportPayableAdjustment', params),
  // 查询接口。共用于：financeCenter、orderCenter
  queryOrderList: params => network.post('/api/cs/oc/oms/v1/queryOrderList', params),

  // 通用接口下载
  /**
   * 经销订单下载 分销商订单下载 /p/cs/orderDownload
   * 分销商品下载 /p/cs/itemDownload
   * 通用商品下载 /p/cs/stdp/item/get
   * 分销退单下载 /p/cs/refundDownload
   * "/p/cs/stdp/order/get
   */
  publicOrderDownload: (url, params) => network.post(url, params),
};
