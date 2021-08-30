// 订单中心
import R3 from '@syman/burgeon-r3';
import port from '@/js/pages/common/orderDetail/connector';
import qs from 'qs';

const { network } = R3;
export default {
  /**
   * 零售发货单
   */
  auditOrder: params => network.post('/api/cs/oc/oms/v1/auditOrder', params), // 审核
  auditOrderForce: params => network.post('/api/cs/oc/oms/v1/auditOrderForce', params), // 强制审核
  getSupplyPrice: params => network.post('/api/cs/oc/oms/v1/getSupplyPrice', params), // 获取猫超供货价
  getSeniorQueryCondition: params => network.post('/api/cs/oc/oms/v1/getSeniorQueryCondition', params), // 高级搜索项
  QueryList: params => network.post('/p/cs/QueryList', params),
  reallocateLogistics: params => network.post('/api/cs/oc/oms/v1/reallocateLogistics', params), // 配送物流
  reallocateWarehouse: params => network.post('/api/cs/oc/oms/v1/reallocateWarehouse', params), // 配送仓库
  getOrderList: params => network.post('/api/cs/oc/oms/v1/getOrderList', params),
  doBatchReturnOrder: params => network.post('/api/cs/oc/oms/v1/doBatchReturnOrder', params), // 批量退单
  antiAuditReturnOrder: params => network.post('/api/cs/oc/oms/v1/batch/antiAudit', params), // 批量撤回
  exportOcBOrder: params => network.post('/api/cs/oc/oms/v1/exportOcBOrder', params), // 导出
  exportOcBOrderFilter: params => network.post('/api/cs/oc/oms/v1/exportOcBOrderFilter', params), // 导出（不含手机）
  auditOrderReserve: params => network.post('/api/cs/oc/oms/v1/auditOrderReserve', params), // 反审核
  checkAddOrderInvoicing: params => network.post('/api/cs/oc/oms/v1/checkAddOrderInvoicing', params),
  checkRecordInvoicing: params => network.post('/api/cs/oc/oms/v1/checkRecordInvoicing', params), // 开票通知
  cancelOrder: params => network.post('/api/cs/oc/oms/v1/cancelOrder', params), // 订单取消
  orderInterception: params => network.post('/api/cs/oc/oms/v1/orderInterception', params), // 订单拦截
  queryshortagSearchOrder: params => network.post('/api/cs/oc/oms/v1/queryshortagSearchOrder', params), // 缺货重新占单
  queryFortuneBagShortage: params => network.post('/api/cs/oc/oms/v1/queryFortuneBagShortage', params), // 福袋缺货重新占单
  doManualDeliveryOrder: params => network.post('/api/cs/oc/oms/v1/doManualDeliveryOrder', params), // 更改为平台发货
  releaseInventory: params => network.post('/p/cs/releaseInventory', params), // 释放库存
  checkOrderBeforeLogistics: params => network.post('/api/cs/oc/oms/v1/checkOrderBeforeLogistics', params), // 修改物流
  checkOrderBeforeWarehouse: params => network.post('/api/cs/oc/oms/v1/checkOrderBeforeWarehouse', params), // 修改仓库
  splitOrder: params => network.post('/api/cs/oc/oms/v1/splitOrder', params), // 缺货拆单
  manualUnHoldOrder: params => network.post('/api/cs/oc/oms/v1/manualUnHoldOrder', params), // 审核
  mergeOrderOne: params => network.post('/api/cs/oc/oms/v1/mergeOrderOne', params), // 合并订单
  cancelMergeOrder: params => network.post('/api/cs/oc/oms/v1/cancelMergeOrder', params), // 取消合并订单
  /**
   * 零售发货单 - 详情
   */
  billCopy: params => network.post('/api/cs/oc/oms/v1/billCopy', params), // 丢单赋值或复制订单赋值
  getOrderDetailList: params => network.post('/api/cs/oc/oms/v1/getOrderDetailList', params), // 获取订单详情
  saveBill: params => network.post('/api/cs/oc/oms/v1/saveBill', params), // 保存
  delOrderItem: params => network.post('/p/cs/delOrderItem', params), // 删除明细
  queryResionByName: params => network.post('/api/cs/oc/oms/v1/queryResionByName', params), // 获取省份id
  cancelInterception: params => network.post('/api/cs/oc/oms/v1/cancelInterception', params), // 取消拦截

  /**
   * 扫描入库
   */
  getCurrentBatch: params => network.post('/api/cs/oc/oms/v1/getCurrentBatch', params), // 获取退货批次数据
  getOneRefundItem: params => network.post('/api/cs/oc/oms/v1/getOneRefundItem', params), // 获取退换货单号
  cpStoreInfo: params => network.post('/api/cs/oc/oms/v1/cpStoreInfo', params), // 获取销退入库仓以及批次类型方法
  getScanIncomingInfo: params => network.post('/api/cs/oc/oms/v1/getScanIncomingInfo', params), // 物流单号，原单单号查询方法
  saveScanIncoming: params => network.post('/api/cs/oc/oms/v1/saveScanIncoming', params), // 保存 - 扫描
  /**
   * 额外退款新增/编辑、已发货退款编辑
   */
  saveAfterDeliver: params => network.post('/api/cs/oc/oms/v1/saveAfterDeliver', params), // 保存
  saveAfterDeliverItem: params => network.post('/api/cs/oc/oms/v1/saveAfterDeliverItem', params), // 复制页面
  deleteAfterDeliverItem: params => network.post('/api/cs/oc/oms/v1/deleteAfterDeliverItem', params), // 编辑状态,删除明细
  copyAfterDeliver: params => network.post('/api/cs/oc/oms/v1/copyAfterDeliver', params), // 详情 复制查询方法
  objectTableItem: params => network.post('/p/cs/objectTableItem', params), // 退款分类联动查询退描述
  /**
   * 额外退款、已发货退款列表
   */
  DynamicList: params => network.post('/api/cs/oc/oms/v1/DynamicList', params), // 获取高级查询&表头
  querySalesReturn: params => network.post('/api/cs/oc/oms/v1/querySalesReturn', params), // 获取列表数据
  OcCancelChangingOrRefund: params => network.post('/api/cs/oc/oms/v1/OcCancelChangingOrRefund', params), // 取消退单
  virtualWarehouseStorage: params => network.post('/api/cs/oc/oms/v1/virtualWarehouseStorage', params), // 虚拟仓库入库
  cancelautorefund: params => network.post('/api/cs/oc/oms/v1/cancelautorefund', params), // 取消自动退款
  updateReturnBOrder: params => network.post('/api/cs/oc/oms/v1/updateReturnBOrder', params), // 批量原退
  refundtoAgList: params => network.post('/api/cs/oc/oms/v1/refundtoAgList', params), // 批量ag退款
  orderReturnRecallFromWms: params => network.post('/p/cs/orderReturnRecallFromWms', params), // 从wms撤回
  retransmissionWms: params => network.post('/api/cs/oc/oms/v1/retransmissionWms', params), // 重传wms
  forcedCompletion: params => network.post('/api/cs/oc/oms/v1/forcedCompletion', params), // 强制完成
  exportReturnOrder: params => network.post('/api/cs/oc/oms/v1/exportReturnOrder', params), // 导出
  findDetail: params => network.post('/api/cs/oc/oms/v1/findDetail', params), // 获取详情数据
  manualMatchingCheck: params => network.post('/api/cs/oc/oms/v1/manualMatchingCheck', params), // 验证是否能够进入手工匹配界面
  returnCancel: params => network.post('/api/cs/oc/oms/v1/returnCancel', params),
  ReturnStorageList: params => network.post('/api/cs/oc/oms/v1/ReturnStorageList', params),
  exportOcBRefundIn: params => network.post('/api/cs/oc/oms/v1/exportOcBRefundIn', params),
  ReturnStorageSave: params => network.post('/api/cs/oc/oms/v1/ReturnStorageSave', params),
  searchButtonsInDetail: params => network.post('/api/cs/oc/oms/v1/searchButtonsInDetail', params),
  getDetail: params => network.post('/api/cs/oc/oms/v1/getDetail', params),
  getDecryptDetail: params => network.post('/api/cs/oc/oms/v1/getDecryptDetail', params),
  export: params => network.post('/p/outpro/export', params),
  amendBody: (tableName, params) => network.post(port[tableName].amendBody, params),
  objectAdd: params => network.post('/p/cs/objectAdd', params),
  prodel: params => network.post('/p/cs/prodel', params),
  updateDicunot: params => network.post('/p/cs/oc/v1/sale/updateDicunot', params),
  updateLogisticsBeforePacking: params => network.post('/api/cs/vip/distribution/Logistics/v1/updateLogisticsBeforePacking', params),
  sendWmsPick: params => network.post('/api/cs/vip/distribution//add/sendWmsPick', params),
  querySkuListAndStorageInfo: params => network.post('/api/cs/oc/oms/v1/querySkuListAndStorageInfo', params), // 提前判断下该单据是否可拆单
  updateLogistics: params => network.post('/api/cs/oc/oms/v1/updateLogistics', params),
  manualMatchingList: params => network.post('/api/cs/oc/oms/v1/manualMatchingList', params),
  distributionFindBydistributionId: params => network.post('/api/cs/vip/distributionItem/v1/findBydistributionId', params), // 根据配货单id查询配货单明细
  distributionChangeTag: params => network.post('/api/cs/vip/distribution/v1/changeTag', params), // 配货单换吊牌的保存
  managementOrderHold: params => network.post('/api/cs/oc/oms/v1/holdOrder', params), // 零售发货单-HOLD单
  returnTypeItemquery: params => network.post('/p/cs/objectTableItem', params), // 退款分类-退款分类描述
  extraReturnTableLogQuery: params => network.get(`/api/cs/oc/oms/v1/getOcBReturnAfSendLog?${qs.stringify(params)}`), // 额外退款单-额外退款单日志
  modifyReturnOrderWarehouse: params => network.post('/api/cs/oc/oms/v1/modifyReturnOrderWarehouse', params), // 退换货单修改退回仓库
  checkCancelParams: params => network.post('/api/cs/oc/oms/v1/checkCancelParams', params), // 检查接口
  checkBeforeCreateVipDelivery: params => network.post('/api/cs/vip/distribution/v1/checkBeforeCreateVipDelivery', params), // 创建出仓单初始化接口
  getDeliveryMethod: params => network.post('/api/cs/vip/distribution/v1/getDeliveryMethod', params), // 创建出仓单获取运输方式
  distributionCreateDelivery: params => network.post('/api/cs/vip/distribution/v1/distributionCreateDelivery', params), // 创建出仓单接口
  deliveryV1List: params => network.get(`/api/cs/vip/delivery/v1/list?${qs.stringify(params)}`),
  refund2Exchange: params => network.post('/api/cs/oc/oms/v1/refund2Exchange', params), // 退货转换货
  refund2ExchangeValidate: params => network.post('/api/cs/oc/oms/v1/refund2Exchange/before/validate', params), // 退货转换货校验
  getOrderId: params => network.post('/api/cs/oc/oms/v1/getOrderId', params), // 根据平台单号,查询零售发货单id
  examineTheRefundAfterDelivery: params => network.post('/api/cs/oc/oms/v1/examineTheRefundAfterDelivery', params), // 额外退款审核
  refuseToPayOcBReturnAfSend: params => network.post('/api/cs/oc/oms/v1/refuseToPayOcBReturnAfSend', params), // 拒绝打款
  pickOrderExport: params => network.post('/api/cs/vip/pick/v1/export', params),
  // 半定制弹框
  updateWarehouse: params => network.post('/api/cs/oc/oms/v1/updateWarehouse', params),
  getQueryList: params => network.post('/api/cs/oc/oms/v1/getQueryList', params),
  shortageNotice: params => network.post('/api/cs/oc/oms/v1/shortageNotice', params),
  validateRefundChange: params => network.post('/api/cs/oc/oms/v1/validateRefundChange', params), // 退换货单列表效验能否重新生成订单接口
};
