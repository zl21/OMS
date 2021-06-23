// 公共的接口
import qs from "qs";
import importApiArr from "@/config/config/importApiArr";

export default {
  /* 框架标准公共接口： */
  fuzzyquerybyak: (params, serviceId = { serviceId: "r3-cp" }) => $network.post("/p/cs/fuzzyquerybyak", params, serviceId),
  QueryList: (params, serviceId = { serviceId: "r3-cp" }) => $network.post("/p/cs/QueryList", params, serviceId),
  getTableQuery: (params, serviceId = { serviceId: "r3-cp" }) => $network.post("/p/cs/getTableQuery", params, serviceId),
  skuQuery: (params, serviceId = { serviceId: "r3-cp" }) => $network.post("/p/cs/skuQuery", params, serviceId),
  selSku: (params, serviceId = { serviceId: "r3-ps" }) => $network.post('/p/cs/ps/sku/v1/selSku' , params , serviceId), //根据sku编码查询sku商品信息
  // 获取页面title
  getAppTitle: () => $network.get("/p/c/getAppTitle"),
  //登录
  getCaptcha: (params,serviceId = { serviceId: "r3-cp" }) => $network.get("/p/c/getCaptcha", params,serviceId),
  globalLogin: (params, serviceId = { serviceId: "r3-cp" }) => $network.post("/p/c/login", params, serviceId),
  // 矩阵
  queryCommonStorageByPro: (params) =>
    $network.post("/p/cs/sg/storage/queryCommonStorageByPro", params),

  // 详情页数据查询接口。共用于：inventoryCenter、orderCenter
  getObject: (params) => $network.post("/p/cs/getObject", params),
  queryPhyWareHouseList: (params) =>
    $network.post("/p/cs/queryPhyWareHouseList", params),
  objectTableItem: (params) => $network.post("/p/cs/objectTableItem", params),
  getWarehouseLogisticsTree: (params) =>
    $network.post("/p/cs/getWarehouseLogisticsTree", params),
  getLogisticsRankResultTable: (params) =>
    $network.post("/p/cs/getLogisticsRankResultTable", params),
  getWarehouseLogisticsInfo: (params) =>
    $network.post("/p/cs/getWarehouseLogisticsInfo", params),
  delWarehouseLogistics: (params) =>
    $network.post("/p/cs/delWarehouseLogistics", params),
  fetchActionsInCustomizePage: (params, serviceId = { serviceId: "r3-cp" }) => $network.post("/p/cs/oc/oms/v1/queryActions", params, serviceId),
  manualJdMatchingCheck: (params) =>
    $network.post("/p/cs/manualJdMatchingCheck", params),
  jdReturnStorageSave: (params) =>
    $network.get("/p/cs/jdReturnStorageSave", params),
  manualJdMatchingList: (params) =>
    $network.post("/p/cs/manualJdMatchingList", params),
  screenresult: (params) => $network.post("/p/cs/screenresult", params),
  addToFavorite: (params) => $network.post("/p/cs/addToFavorite", params),
  groupTreeload: (params) => $network.post("/p/cs/groupTreeload", params),
  removeFromFavorite: (params) =>
    $network.post("/p/cs/removeFromFavorite", params),
  itemDownload: (params) => $network.post("/p/cs/itemDownload", params),
  getUserConfig: (params) => $network.post("/p/cs/getUserConfig", params),
  SgOutNoticePrint: (params) => $network.post("/p/cs/SgOutNoticePrint", params),
  cgroupcolumnquery: (params) =>
    $network.get(`/p/cs/cgroupcolumnquery?${qs.stringify(params)}`),
  queryShopPermission: (params) =>
    $network.get("/p/cs/queryShopPermission", params),
  screenresultcheck: (params) =>
    $network.post("/p/cs/screenresultcheck", params),
  searchButtonsInJdDetail: (params) =>
    $network.post("/p/cs/searchButtonsInJdDetail", params),
  objectSave: (params) => $network.post("/p/cs/objectSave", params),
  getWarehourseByShopId: (params) =>
    $network.post("/p/cs/getWarehourseByShopId", params),
  voidPayableAdjustment: (params) =>
    $network.post("/p/cs/voidPayableAdjustment", params),
  regionBySelect: (params) => $network.post("/p/cs/regionBySelect", params),
  exeAction: (params) => $network.post("/p/cs/exeAction", params),
  menuimport: (params) => $network.post("/p/cs/menuimport", params),
  queryOcBOrder: (params) =>
    $network.post("/api/cs/oc/oms/v1/queryOcBOrder", params),
  returnOrderquery: (params) =>
    $network.post("/api/cs/oc/oms/v1/returnOrderquery", params),
  returnSkuDb: (params) => $network.post("/p/cs/returnSkuDb", params),
  checkAllStroreStock: (params) =>
    $network.post("/api/cs/oc/oms/v1/checkAllStroreStock", params),
  returnOrder: (params) =>
    $network.post("/api/cs/oc/oms/v1/returnOrder", params),
  chargebackcheck: (params) =>
    $network.post("/api/cs/oc/oms/v1/chargebackcheck", params),
  OcCancelChangingOrRefund: (params) =>
    $network.post("/api/cs/oc/oms/v1/OcCancelChangingOrRefund", params), // 取消退单
  updateVirtualLibrary: (params) =>
    $network.post("/p/cs/oc/b/oms/v1/ocbreturnorder/updateOrderVirtual", params),
  SelectLog: (params) => $network.post("/p/cs/selectlog", params),
  getOrderList: (params) => $network.post("/p/cs/getOrderList", params),
  extInfoQuery: (params) => $network.post("/p/cs/extInfoQuery", params),
  manualJdMatchingConfirmationButton: (params) =>
    $network.post("/p/cs/manualJdMatchingConfirmationButton", params),
  seachJdForced: (params) => $network.post("/p/cs/seachJdForced", params),
  getJdScanIncomingInfo: (params) =>
    $network.post("/p/cs/getJdScanIncomingInfo", params),
  saveJdScanIncoming: (params) =>
    $network.post("/p/cs/saveJdScanIncoming", params),
  groupQueryName: (params) => $network.post("/p/cs/groupQueryName", params),
  cuserspro: (params) => $network.post("/p/cs/cuserspro", params),
  objectDelete: (params) => $network.post("/p/cs/objectDelete", params),
  cprolikequery: (params) => $network.post("/p/cs/cprolikequery", params),
  cgroupsquery: (params) =>
    $network.get(`/p/cs/cgroupsquery?${qs.stringify(params)}`),
  getCopyTargetGroups: (params) =>
    $network.get(`/p/cs/getCopyTargetGroups?${qs.stringify(params)}`),
  // 导出接口。共用于：financeCenter、inventoryCenter
  exportPayableAdjustment: (params) =>
    $network.post("/p/cs/exportPayableAdjustment", params),
  // 查询接口。共用于：financeCenter、orderCenter
  queryOrderList: (params) =>
    $network.post("/api/cs/oc/oms/v1/queryOrderList", params),

  // tree结构请求接口：
  cpCHrorgTree: (params) => $network.post("/p/c/cpCHrorgTree", params),
  // queryClassifyTree: params => network.post('/p/cs/ps/pro/classify/v1/queryClassifyTree', params), // 商品分类-列表-树结构
  // selectTree: params => network.post('/p/cs/cp/v1/region/v1/selectTree', params), // 国家省市区-列表-树结构

  // 通用接口下载
  /**
   * 经销订单下载 分销商订单下载 /p/cs/orderDownload
   * 分销商品下载 /p/cs/itemDownload
   * 通用商品下载 /p/cs/stdp/item/get
   * 分销退单下载 /p/cs/refundDownload
   * "/p/cs/stdp/order/get
   */

  /**
   *
   * @param {*} url
   * @param {*} params
   * @publicUrlParamsG 有params的 get请求方法
   * @publicUrlParams 有params的 post请求方法
   * @publicNoParams 无params的 post请求方法
   * @getImportDialogHeader 自定义header请求头的post请求方法
   */

  publicUrlParamsGet: (url, params) => $network.get(url, params),
  publicUrlParams: (url, params) => $network.post(url, params),
  publicNoParams: (url) => $network.post(url),
  getImportDialogHeader: (url, params, header) =>
    $network.post(url, params, header),

  // 导入 / 下载模版 - 接口
  importApiArr: importApiArr,
};
