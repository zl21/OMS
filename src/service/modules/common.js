// 公共的接口
import R3 from '@syman/burgeon-r3';

const {network} = R3;

export default {
  getObject: (params) => network.post('/p/cs/getObject', params),
  queryPhyWareHouseList: (params) => network.post('/p/cs/queryPhyWareHouseList', params),
  selectLimitGroups: (params) => network.post('/p/cs/selectLimitGroups', params),
  objectTableItem: (params) => network.post('/p/cs/objectTableItem', params),
  saveWarehouseLogistics: (params) => network.post('/p/cs/saveWarehouseLogistics', params),
  getWarehouseLogisticsTree: (params) => network.post('/p/cs/getWarehouseLogisticsTree', params),
  getLogisticsRankResultTable: (params) => network.post('/p/cs/getLogisticsRankResultTable', params),
  getLogisticsLikeRankResultTable: (params) => network.post('/p/cs/getLogisticsLikeRankResultTable', params),
  voidWarehouseLogistics: (params) => network.post('/p/cs/voidWarehouseLogistics', params),
  exportWarehouseLogisticsRank: (params) => network.post('/p/cs/exportWarehouseLogisticsRank', params),
  getPromField: (params) => network.get('/p/cs/getPromField', params),
  getWarehouseLogisticsInfo: (params) => network.post('/p/cs/getWarehouseLogisticsInfo', params),
  delWarehouseLogistics: (params) => network.post('/p/cs/delWarehouseLogistics', params),
  saveCompensate: (params) => network.post('/p/cs/saveCompensate', params),
  delCompenstate: (params) => network.post('/p/cs/delCompenstate', params),
  selectCompenstateLogistic: (params) => network.post('/p/cs/selectCompenstateLogistic', params),
  expressAreaSaveCmd: (params) => network.post('/p/cs/expressAreaSaveCmd', params),
  getExpressAreaTree: (params) => network.post('/p/cs/getExpressAreaTree', params),
  getExpressAreaItemLikeTable: (params) => network.post('/p/cs/getExpressAreaItemLikeTable', params),
  getExpressAreaItemTable: (params) => network.post('/p/cs/getExpressAreaItemTable', params),
  exportExpressAreaItem: (params) => network.post('/p/cs/exportExpressAreaItem', params),
  skuQuery: (params) => network.post('/p/cs/skuQuery', params),
  fetchActionsInCustomizePage: (params) => network.get('/p/cs/v2/fetchActionsInCustomizePage', params),
  manualJdMatchingCheck: (params) => network.post('/p/cs/manualJdMatchingCheck', params),
  jdReturnStorageSave: (params) => network.get('/p/cs/jdReturnStorageSave', params),
  manualJdMatchingList: (params) => network.post('/p/cs/manualJdMatchingList', params),
  screenresult: (params) => network.post('/p/cs/screenresult', params),
  cpCHrorgTree: (params) => network.post('/p/cs/cpCHrorgTree', params),
  downLoadVipCancelTimeOrder: (params) => network.post('/p/cs/downLoadVipCancelTimeOrder', params),
  downLoadVipOrderRefund: (params) => network.post('/p/cs/downLoadVipOrderRefund', params),
  addToFavorite: (params) => network.post('/p/cs/addToFavorite', params),
  exchangeDownload: (params) => network.post('/p/cs/exchangeDownload', params),
  groupTreeload: (params) => network.post('/p/cs/groupTreeload', params),
  removeFromFavorite: (params) => network.post('/p/cs/removeFromFavorite', params),
  refundDownload: (params) => network.post('/p/cs/refundDownload', params),
  itemDownload: (params) => network.post('/p/cs/itemDownload', params),
  downLoadVipTimeOrder: (params) => network.post('/p/cs/downLoadVipTimeOrder', params),
  orderDownload: (params) => network.post('/p/cs/orderDownload', params),
  downLoadVipDelivery: (params) => network.post('/p/cs/downLoadVipDelivery', params),
  getUserConfig: (params) => network.post('/p/cs/getUserConfig', params),
  QueryList: (params) => network.post('/p/cs/QueryList', params),
  SgOutNoticePrint: (params) => network.post('/p/cs/SgOutNoticePrint', params),
  fuzzyquerybyak: (params) => network.post('/p/cs/fuzzyquerybyak', params),
  cgroupcolumnquery: (params) => network.post('/p/cs/cgroupcolumnquery', params),
  queryShopPermission: (params) => network.get('/p/cs/queryShopPermission', params),
  screenresultcheck: (params) => network.post('/p/cs/screenresultcheck', params),
  searchButtonsInJdDetail: (params) => network.post('/p/cs/searchButtonsInJdDetail', params),
  objectSave: (params) => network.post('/p/cs/objectSave', params),
  expressAreaVoidCmd: (params) => network.post('/p/cs/expressAreaVoidCmd', params),
  cpromLogQuery: (params) => network.post('/p/cs/cpromLogQuery', params),
  getweekdate: (params) => network.post('/p/cs/getweekdate', params),
  getWarehourseByShopId: (params) => network.post('/p/cs/getWarehourseByShopId', params),
  voidPayableAdjustment: (params) => network.post('/p/cs/voidPayableAdjustment', params),
  // 通用接口下载
  /**
   * 经销订单下载 分销商订单下载 /p/cs/orderDownload
   * 分销商品下载 /p/cs/itemDownload
   * 通用商品下载 /p/cs/stdp/item/get
   * 分销退单下载 /p/cs/refundDownload
   * "/p/cs/stdp/order/get
   */
  publicOrderDownload: (url,params) => network.post(url, params),
}

























