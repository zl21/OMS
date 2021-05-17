// 订单中心
import qs from 'qs'
import port from '@/config/config/orderDetailConnector.js'
export default {
  /**
   * 零售发货单
   */

  saveOrderByPro: (params) =>
    $network.post('/p/cs/oc/b/oms/v1/ocborder/saveOrderByPro', params), // 添加订单商品信息-确定添加
  replaceOrderByPro: (params) =>
    $network.post('/p/cs/oc/b/oms/v1/ocborder/replaceOrderByPro', params), // 替换订单商品-确认按钮

  deleteOrderGoods: (params) =>
    $network.post('/p/cs/oc/b/oms/v1/ocborder/deleteOrderGoods', params), // 批量删除商品信息-删除按钮
  parseOrderList: (params) =>
    $network.post('/p/cs/oc/b/oms/v1/ocborder/parseOrderList', params), // 批量解析组合商品-确定解析
  auditOrder: (params) => $network.post('/p/cs/oc/oms/v1/auditOrder', params), // 审核
  getSeniorQueryCondition: (params) =>
    $network.post('/api/cs/oc/oms/v1/getSeniorQueryCondition', params), // 高级搜索项
  reallocateLogistics: (params) =>
    $network.post('/api/cs/oc/oms/v1/reallocateLogistics', params), // 配送物流
  reallocateWarehouse: (params) =>
    $network.post('/api/cs/oc/oms/v1/reallocateWarehouse', params), // 配送仓库
  getOrderList: (params) =>
    $network.post('/api/cs/oc/oms/v1/getOrderList', params),
  doBatchReturnOrder: (params) =>
    $network.post('/api/cs/oc/oms/v1/doBatchReturnOrder', params), // 批量退单
  exportOcBOrder: (params) =>
    $network.post('/api/cs/oc/oms/v1/exportOcBOrder', params), // 导出
  auditOrderReserve: (params) =>
    $network.post('/p/cs/oc/oms/v1/auditOrderReserve', params), // 反审核
  checkAddOrderInvoicing: (params) =>
    $network.post('/api/cs/oc/oms/v1/checkAddOrderInvoicing', params),
  checkRecordInvoicing: (params) =>
    $network.post('/api/cs/oc/oms/v1/checkRecordInvoicing', params), // 开票通知
  cancelOrder: (params) => $network.post('/p/cs/oc/oms/v1/cancelOrder', params), // 订单取消
  orderInterception: (params) =>
    $network.post('/api/cs/oc/oms/v1/orderInterception', params), // 订单拦截
  queryshortagSearchOrder: (params) =>
    $network.post('/api/cs/oc/oms/v1/queryshortagSearchOrder', params), // 缺货重新占单
  queryFortuneBagShortage: (params) =>
    $network.post('/api/cs/oc/oms/v1/queryFortuneBagShortage', params), // 福袋缺货重新占单
  doManualDeliveryOrder: (params) =>
    $network.post('/api/cs/oc/oms/v1/doManualDeliveryOrder', params), // 更改为平台发货
  releaseInventory: (params) => $network.post('/p/cs/releaseInventory', params), // 释放库存
  checkOrderBeforeLogistics: (params) =>
    $network.post(
      '/p/cs/oc/b/oms/v1/ocborder/checkOrderBeforeLogistics',
      params
    ), // 订单列表-修改物流前校验
  checkOrderBeforeWarehouse: (params) =>
    $network.post(
      '/p/cs/oc/b/oms/v1/ocborder/checkOrderBeforeWarehouse',
      params
    ), // 订单列表-修改仓库前校验
  splitOrder: (params) => $network.post('/api/cs/oc/oms/v1/splitOrder', params), // 缺货拆单
  manualUnHoldOrder: (params) =>
    $network.post('/p/cs/oc/oms/v2/order/batch/hold/cancel', params), // 零售发货单-取消HOLD单
  mergeOrderOne: (params) =>
    $network.post('/p/cs/oc/oms/v1/mergeOrder', params), // 合并订单
  cancelMergeOrder: (params) =>
    $network.post('/p/cs/oc/oms/v1/cancelMergeOrder', params), // 取消合并订单
  batchAddGoods: (params) =>
    $network.post('/api/cs/oc/oms/v1/batchAddGoods', params), // 零售发货单详情 - 添加赠品
  addGit: (params) => $network.post('/api/cs/oc/oms/v1/addGit', params),
  bathChangeGoods: (params) =>
    $network.post('/api/cs/oc/oms/v1/bathChangeGoods', params), // 零售发货单详情 - 替换商品
  deleteGit: (params) => $network.post('/api/cs/oc/oms/v1/deleteGit', params),
  checkGit: (params) => $network.post('/api/cs/oc/oms/v1/checkGit', params),
  markrefund: (params) => $network.post('/api/cs/oc/oms/v1/markrefund', params),

  markRefundCancel: (params) =>
    $network.post('/api/cs/oc/oms/v1/markRefundCancel', params),
  modifygoodscheck: (params) =>
    $network.post('/api/cs/oc/oms/v1/modifygoodscheck', params),
  saveStandards: (params) =>
    $network.post('/api/cs/oc/oms/v1/saveStandards', params),
  updateIsLackstock: (params) =>
    $network.post('/api/cs/oc/oms/v1/updateIsLackstock', params),
  saveAppointSplitOrderInfo: (params) =>
    $network.post('/api/cs/oc/oms/v1/saveAppointSplitOrderInfo', params),
  saveSplitOrderInfo: (params) =>
    $network.post('/p/cs/oc/oms/v1/saveSplitOrderInfo', params),
  getSingleObjectPermission: (params) =>
    $network.post('/api/cs/oc/oms/v1/getSingleObjectPermission', params),
  /**
   * 零售发货单 - 详情
   */
  billCopy: (params) => $network.post('/api/cs/oc/oms/v1/billCopy', params), // 丢单赋值或复制订单赋值
  queryObject: (params) => $network.post('/p/cs/oc/oms/v1/queryObject', params), // 获取订单详情
  delOrderItem: (params) => $network.post('/p/cs/delOrderItem', params), // 删除明细
  queryResionByName: (params) => $network.post('/api/cs/oc/oms/v1/queryResionByName', params), // 获取省份id
  cancelInterception: (params) => $network.post('/api/cs/oc/oms/v1/cancelInterception', params), // 取消拦截
  batchDeleteGoods: (params) => $network.post('/api/cs/oc/oms/v1/batchDeleteGoods', params), // 取消拦截
  selectLimitGroups: (params) => $network.post('/p/cs/selectLimitGroups', params), // 取消拦截
  initObject: (params) => $network.post('/p/cs/oc/oms/v1/initObject', params), // 订单详情明细表头
  updateOrderAddr: (params) => $network.post('/p/cs/oc/oms/v1/updateOrderAddr', params), // 订单详情 - 修改地址
  markCancel: (params) => $network.post('/p/cs/oc/oms/v1/markCancel', params), // 订单详情 - 修改地址
 
  /**
   * 扫描入库
   */
  getCurrentBatch: (params) =>
    $network.post('/api/cs/oc/oms/v1/getCurrentBatch', params), // 获取退货批次数据
  getOneRefundItem: (params) =>
    $network.post('/api/cs/oc/oms/v1/getOneRefundItem', params), // 获取退换货单号
  cpStoreInfo: (params) =>
    $network.post('/api/cs/oc/oms/v1/cpStoreInfo', params), // 获取销退入库仓以及批次类型方法
  getScanIncomingInfo: (params) =>
    $network.post('/api/cs/oc/oms/v1/getScanIncomingInfo', params), // 物流单号，原单单号查询方法
  saveScanIncoming: (params) =>
    $network.post('/api/cs/oc/oms/v1/saveScanIncoming', params), // 保存 - 扫描
  /**
   * 额外退款新增/编辑、已发货退款编辑
   */
  saveAfterDeliver: (params) =>
    $network.post('/api/cs/oc/oms/v1/saveAfterDeliver', params), // 保存
  saveAfterDeliverItem: (params) =>
    $network.post('/api/cs/oc/oms/v1/saveAfterDeliverItem', params), // 复制页面
  deleteAfterDeliverItem: (params) =>
    $network.post('/api/cs/oc/oms/v1/deleteAfterDeliverItem', params), // 编辑状态,删除明细
  copyAfterDeliver: (params) =>
    $network.post('/api/cs/oc/oms/v1/copyAfterDeliver', params), // 详情 复制查询方法
  /**
   * 额外退款、已发货退款列表
   */
  DynamicList: (params) =>
    $network.post('/api/cs/oc/oms/v1/DynamicList', params), // 获取高级查询&表头
  querySalesReturn: (params) =>
    $network.post('/api/cs/oc/oms/v1/querySalesReturn', params), // 获取列表数据
  virtualWarehouseStorage: (params) =>
    $network.post('/api/cs/oc/oms/v1/virtualWarehouseStorage', params), // 虚拟仓库入库
  cancelautorefund: (params) =>
    $network.post('/api/cs/oc/oms/v1/cancelautorefund', params), // 取消自动退款
  updateReturnBOrder: (params) =>
    $network.post('/api/cs/oc/oms/v1/updateReturnBOrder', params), // 批量原退
  orderReturnRecallFromWms: (params) =>
    $network.post('/p/cs/orderReturnRecallFromWms', params), // 从wms撤回
  retransmissionWms: (params) =>
    $network.post('/api/cs/oc/oms/v1/retransmissionWms', params), // 重传wms
  forcedCompletion: (params) =>
    $network.post('/api/cs/oc/oms/v1/forcedCompletion', params), // 强制完成
  exportReturnOrder: (params) =>
    $network.post('/api/cs/oc/oms/v1/exportReturnOrder', params), // 导出
  findDetail: (params) => $network.post('/api/cs/oc/oms/v1/findDetail', params), // 获取详情数据
  manualMatchingCheck: (params) =>
    $network.post('/api/cs/oc/oms/v1/manualMatchingCheck', params), // 验证是否能够进入手工匹配界面
  returnCancel: (params) =>
    $network.post('/api/cs/oc/oms/v1/returnCancel', params),
  ReturnStorageList: (params) =>
    $network.post('/api/cs/oc/oms/v1/ReturnStorageList', params),
  exportOcBRefundIn: (params) =>
    $network.post('/api/cs/oc/oms/v1/exportOcBRefundIn', params),
  ReturnStorageSave: (params) =>
    $network.post('/api/cs/oc/oms/v1/ReturnStorageSave', params),
  searchButtonsInDetail: (params) =>
    $network.post('/api/cs/oc/oms/v1/searchButtonsInDetail', params),
  getDetail: (params) => $network.post('/api/cs/oc/oms/v1/getDetail', params),
  export: (params) => $network.post('/p/outpro/export', params),
  amendBody: (tableName, params) =>
    $network.post(port[tableName].amendBody, params),
  objectAdd: (params) => $network.post('/p/cs/objectAdd', params),
  prodel: (params) => $network.post('/p/cs/prodel', params),
  orderDeliveryUrgent: (params) =>
    $network.get('/api/cs/oc/oms/v1/orderDeliveryUrgent', params),
  updateDicunot: (params) =>
    $network.post('/p/cs/oc/v1/sale/updateDicunot', params),
  updateLogisticsBeforePacking: (params) =>
    $network.post(
      '/api/cs/vip/distribution/Logistics/v1/updateLogisticsBeforePacking',
      params
    ),
  sendWmsPick: (params) =>
    $network.post('/api/cs/vip/distribution//add/sendWmsPick', params),
    checkManualSplit: (params) =>
    $network.post('/p/cs/oc/oms/v1/checkManualSplit', params), // 提前判断下该单据是否可拆单
    queryManualSplit: (params) =>
    $network.post('/p/cs/oc/oms/v1/queryManualSplit' , params), //手工拆单商品查询
  updateLogistics: (params) =>
    $network.post('/p/cs/oc/b/oms/v1/ocborder/updateLogistics', params), // 零售发货单列表-改物流
  manualMatchingList: (params) =>
    $network.post('/api/cs/oc/oms/v1/manualMatchingList', params), // 获取退货批次数据
  distributionFindBydistributionId: (params) =>
    $network.post(
      '/api/cs/vip/distributionItem/v1/findBydistributionId',
      params
    ), // 根据配货单id查询配货单明细
  distributionChangeTag: (params) =>
    $network.post('/api/cs/vip/distribution/v1/changeTag', params), // 配货单换吊牌的保存
  managementOrderHold: (params) =>
    $network.post('/p/cs/oc/oms/v2/order/batch/hold', params), // 零售发货单-HOLD单
  returnTypeItemquery: (params) =>
    $network.post('/p/cs/objectTableItem', params), // 退款分类-退款分类描述
  extraReturnTableLogQuery: (params) =>
    $network.get(
      `/api/cs/oc/oms/v1/getOcBReturnAfSendLog?${qs.stringify(params)}`
    ), // 额外退款单-额外退款单日志
  modifyReturnOrderWarehouse: (params) =>
    $network.post('/api/cs/oc/oms/v1/modifyReturnOrderWarehouse', params), // 退换货单修改退回仓库
  checkCancelParams: (params) =>
    $network.post('/api/cs/oc/oms/v1/checkCancelParams', params), // 检查接口
  checkBeforeCreateVipDelivery: (params) =>
    $network.post(
      '/api/cs/vip/distribution/v1/checkBeforeCreateVipDelivery',
      params
    ), // 创建出仓单初始化接口
  getDeliveryMethod: (params) =>
    $network.post('/api/cs/vip/distribution/v1/getDeliveryMethod', params), // 创建出仓单获取运输方式
  distributionCreateDelivery: (params) =>
    $network.post(
      '/api/cs/vip/distribution/v1/distributionCreateDelivery',
      params
    ), // 创建出仓单接口
  deliveryV1List: (params) =>
    $network.get(`/api/cs/vip/delivery/v1/list?${qs.stringify(params)}`),
  refund2Exchange: (params) =>
    $network.post('/api/cs/oc/oms/v1/refund2Exchange', params), // 退货转换货
  refund2ExchangeValidate: (params) =>
    $network.post('/api/cs/oc/oms/v1/refund2Exchange/before/validate', params), // 退货转换货校验
  getOrderId: (params) => $network.post('/api/cs/oc/oms/v1/getOrderId', params), // 根据平台单号,查询零售发货单id
  examineTheRefundAfterDelivery: (params) =>
    $network.post('/api/cs/oc/oms/v1/examineTheRefundAfterDelivery', params), // 额外退款审核
  refuseToPayOcBReturnAfSend: (params) =>
    $network.post('/api/cs/oc/oms/v1/refuseToPayOcBReturnAfSend', params), // 拒绝打款
  pickOrderExport: (params) =>
    $network.post('/api/cs/vip/pick/v1/export', params),
  // 半定制弹框
  updateWarehouse: (params) =>
    $network.post('/p/cs/oc/b/oms/v1/ocborder/updateWarehouse', params), // 订单管理列表-改仓库
  getQueryList: (params) =>
    $network.post('/api/cs/oc/oms/v1/getQueryList', params),
  reRemarkUpdate: (params) =>
    $network.post('/api/cs/oc/oms/v1/reRemarkUpdate', params),
  modifyReturnSellerRemark: (params) =>
    $network.post('/api/cs/oc/oms/v1/modifyReturnSellerRemark', params),
  shortageNotice: (params) =>
    $network.post('/api/cs/oc/oms/v1/shortageNotice', params),
  validateRefundChange: (params) =>
    $network.post('/api/cs/oc/oms/v1/validateRefundChange', params), // 退换货单列表效验能否重新生成订单接口

  matchingDelivery: (params) =>
    $network.post('/api/cs/vip/distribution/v1/matchingDelivery', params),
  generateOutOrder: (params) =>
    $network.post('/api/cs/vip/delivery/v1/generateOutOrder', params), // JIT仓库管理-生成出仓单
  recordInvoicing: (params) =>
    $network.post('/api/cs/oc/oms/v1/recordInvoicing', params), // 订单管理-记录发票
  skuListQuery: (params) => $network.post('/p/cs/skuListQuery', params), // 矩阵录入
  updateBeforeWarehouse: (params) =>
    $network.post('/api/cs/vip/distribution/v1/updateBeforeWarehouse', params), // 修改仓库
  saveOrder: (params) => $network.post('/api/cs/oc/oms/v1/saveOrder', params), // 修改收货地址
  // 订单管理 - 设置icon
  saveQueryListConfig: (params) =>
    $network.post('/api/cs/oc/oms/v1/saveQueryListConfig', params),
  queryListConfig: (params) =>
    $network.post('/api/cs/oc/oms/v1/queryListConfig', params),
  downloadPick: (params) => $network.post('/p/cs/vip/v2/pick/download', params), // JIT拣货单 (创建拣货单)
  // JIT配货单(手工占单)
  distributionOccupy: (params) =>
    $network.post('/api/cs/vip/distribution/v1/distributionOccupy', params),
  vipcomMergeDistribution: (params) =>
    $network.post(
      '/api/cs/vip/distribution/v1/vipcomMergeDistribution',
      params
    ),
  generatePoOrder: (params) =>
    $network.post('/api/cs/vip/po/v1/generatePoOrder', params), // JIT PO单(下载PO单),
  querySgBOutPickorder: (params) =>
    $network.post(
      '/p/cs/sg/v1/warehouse/sgBOutPickorder/querySgBOutPickorder',
      params
    ), // JIT PO单(下载PO单), // 出库拣货单查询方法
  saveOutPickOrder: (params) =>
    $network.post('/p/cs/sg/saveOutPickOrder', params), // 保存
  auditOutPickOrder: (params) =>
    $network.post('/p/cs/sg/auditOutPickOrder', params), // 审核

  querySgBInPickorder: (params) =>
    $network.post(
      '/p/cs/sg/v1/warehouse/sgBInPickorder/querySgBInPickorder',
      params
    ),
  saveInPickOrder: (params) =>
    $network.post(
      '/p/cs/sg/v1/warehouse/sgBInPickorder/saveInPickOrder',
      params
    ),
  auditInPickOrder: (params) =>
    $network.post(
      '/p/cs/sg/v1/warehouse/sgBInPickorder/auditInPickOrder',
      params
    ), // 审核

  markSureButton: (params) =>
    $network.post('/api/cs/oc/oms/v1/markSureButton', params), // 手工匹配保存
  forcedMatching: (params) =>
    $network.post('/api/cs/oc/oms/v1/forcedMatching', params), // 错发强制匹配保存
  seachForced: (params) =>
    $network.post('/api/cs/oc/oms/v1/seachForced', params), // 错发强制匹配保存
  manualMatchingConfirmationButton: (params) =>
    $network.post('/api/cs/oc/oms/v1/manualMatchingConfirmationButton', params), // 手工匹配确定
  downloadPO: (params) => $network.post('/p/cs/vip/v2/po/download', params), // PO单-下载PO单

  /* 2.0: */
  remarkUpdate: (params) =>
    $network.post('/p/cs/oc/b/oms/v1/ocborder/remarkUpdate', params), // 零售发货单 - 修改备注
  initList: (params) => $network.post('/p/cs/oc/oms/v1/initList', params), // 零售发货单初始化列表接口
  changeTagQuery: (params) =>
    $network.post('/p/cs/vip/v2/distribution/item/query', params), // 换吊牌-初始化
  changeTagSave: (params) =>
    $network.post('/p/cs/vip/v2/distribution/change/tag', params), // 换吊牌-保存
  stockGet: (params) =>
    $network.post('/p/cs/vip/v2/project/stock/in/item/get', params), // 创建入库单-初始化
  stockSave: (params) =>
    $network.post('/p/cs/vip/v2/distribution/create/delivery/order', params), // 创建入库单-保存
  matchSave: (params) =>
    $network.post('/p/cs/vip/v2/distribution/match/delivery', params), // 匹配入库单-保存
  customSettings: (params) =>
    $network.post('/p/cs/oc/oms/v1/customSettings', params), // 排序组件接口汇总
  getStockInDetail: (params) =>
    $network.post('/p/cs/vip/v2/project/stock/in/item/get', params), // 创建入库单初始化
  stockInSave: (params) =>
    $network.post('/p/cs/vip/v2/distribution/create/delivery/order', params), // 创建入库单保存
  getMatchDetail: (params) =>
    $network.post('/p/cs/vip/v2/distribution/get/delivery', params), // 手动匹配入库单初始化
  matchStockInSave: (params) =>
    $network.post('/p/cs/vip/v2/distribution/match/delivery', params), // 手动匹配入库单保存
  queryList: (params) => $network.post('/p/cs/oc/oms/v1/queryList', params), // 查询列表
  queryStatistics: (params) =>
    $network.post('/p/cs/oc/oms/v1/queryStatistics', params), // 查询异常数量(tabs标头显示数量)
  getOcBOrderExceptions: (params) =>
    $network.post('/p/cs/oc/oms/v1/ocborder/getOcBOrderExceptions', params), // 异常数据列表查询
  batchSaveOcBOrderException: (params) =>
    $network.post(
      '/p/cs/oc/oms/v1/ocborder/batchSaveOcBOrderException',
      params
    ), // 异常数据处理
  billOcBOrderCopy: (params) =>
    $network.post('/p/cs/oc/oms/v1/billOcBOrderCopy', params), // 零售发货单-复制-初始化主表信息
  billOcBOrderItemCopy: (params) =>
    $network.post('/p/cs/oc/oms/v1/billOcBOrderItemCopy', params), // 零售发货单-复制-初始化子表信息
  // queryResionByNames: params => $network.post('/r3-cp/p/cs/cp/v1/region/v1/queryRegionByName', params), // 零售发货单-新增/复制-智能地址赋值-查询省市区
  queryResionByNames: (params) =>
    $network.post('/p/cs/cp/v1/region/v1/queryRegionByName', params, {
      serviceId: 'r3-cp',
    }), // 零售发货单-新增/复制-智能地址赋值-查询省市区
  saveBill: (params) =>
    $network.post('/p/cs/oc/b/oms/v1/ocborder/saveBill', params), // 零售发货单-新增/复制-保存
  backAudit: (params) => $network.post('/p/cs/oc/oms/v1/backAudit', params), // 零售发货单反审核
  audit: (params) => $network.post('/p/cs/oc/oms/v1/audit', params), // 零售发货单审核
  // queryPhyWareHouseList: params => $network.post('/p/cs/cp/v1/phyWarehouse/queryPhyWareHouseList', params), // 零售发货单-初始化发货仓库options
  queryPhyWareHouseList: (params) =>
    $network.post('/p/cs/cp/v1/phyWarehouse/queryPhyWareHouseList', params, {
      serviceId: 'r3-cp',
    }), // 零售发货单-初始化发货仓库options
  getOcBOrderItemBySkuECode: (params) =>
    $network.post('/p/cs/oc/oms/v1/getOcBOrderItemBySkuECode', params), // 零售发货单-新增/复制-根据sku编码新增订单明细
  initObjectList: (params) =>
    $network.post('/p/cs/oc/oms/v1/initObject', params), // 零售发货单列表(包裹详情,商品详情表头查询)
  queryObjectList: (params) =>
    $network.post('/p/cs/oc/oms/v1/queryObject', params), // 零售发货单列表(包裹详情,商品详情明细查询)
}
