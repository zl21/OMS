// 订单中心
import R3 from '@syman/burgeon-r3';
import port from '@/js/pages/common/orderDetail/connector';

const { network } = R3;
export default {
  auditOrder: params => network.post('/api/cs/oc/oms/v1/auditOrder', params),
  getSeniorQueryCondition: params => network.post('/api/cs/oc/oms/v1/getSeniorQueryCondition', params),
  QueryList: params => network.post('/p/cs/QueryList', params),
  reallocateLogistics: params => network.post('/api/cs/oc/oms/v1/reallocateLogistics', params),
  reallocateWarehouse: params => network.post('/api/cs/oc/oms/v1/reallocateWarehouse', params),
  getOrderList: params => network.post('/api/cs/oc/oms/v1/getOrderList', params),
  doBatchReturnOrder: params => network.post('/api/cs/oc/oms/v1/doBatchReturnOrder', params),
  queryOrderList: params => network.post('/api/cs/oc/oms/v1/queryOrderList', params),
  exportOcBOrder: params => network.post('/api/cs/oc/oms/v1/exportOcBOrder', params),
  auditOrderReserve: params => network.post('/api/cs/oc/oms/v1/auditOrderReserve', params),
  checkAddOrderInvoicing: params => network.post('/api/cs/oc/oms/v1/checkAddOrderInvoicing', params),
  checkRecordInvoicing: params => network.post('/api/cs/oc/oms/v1/checkRecordInvoicing', params),
  cancelOrder: params => network.post('/api/cs/oc/oms/v1/cancelOrder', params),
  orderInterception: params => network.post('/api/cs/oc/oms/v1/orderInterception', params),
  queryshortagSearchOrder: params => network.post('/api/cs/oc/oms/v1/queryshortagSearchOrder', params),
  queryFortuneBagShortage: params => network.post('/api/cs/oc/oms/v1/queryFortuneBagShortage', params),
  doManualDeliveryOrder: params => network.post('/api/cs/oc/oms/v1/doManualDeliveryOrder', params),
  releaseInventory: params => network.post('/p/cs/releaseInventory', params),
  checkOrderBeforeLogistics: params => network.post('/api/cs/oc/oms/v1/checkOrderBeforeLogistics', params),
  checkOrderBeforeWarehouse: params => network.post('/api/cs/oc/oms/v1/checkOrderBeforeWarehouse', params),
  splitOrder: params => network.post('/api/cs/oc/oms/v1/splitOrder', params),
  manualUnHoldOrder: params => network.post('/api/cs/oc/oms/v1/manualUnHoldOrder', params),
  mergeOrderOne: params => network.post('/api/cs/oc/oms/v1/mergeOrderOne', params),
  cancelMergeOrder: params => network.post('/api/cs/oc/oms/v1/cancelMergeOrder', params),
  screenresult: params => network.post('/p/cs/screenresult', params),
  getObject: params => network.post('/p/cs/getObject', params),
  billCopy: params => network.post('/api/cs/oc/oms/v1/billCopy', params),
  getOrderDetailList: params => network.post('/api/cs/oc/oms/v1/getOrderDetailList', params),
  saveBill: params => network.post('/api/cs/oc/oms/v1/saveBill', params),
  delOrderItem: params => network.post('/p/cs/delOrderItem', params),
  queryResionByName: params => network.post('/api/cs/oc/oms/v1/queryResionByName', params),
  getCurrentBatch: params => network.post('/api/cs/oc/oms/v1/getCurrentBatch', params),
  getOneRefundItem: params => network.post('/api/cs/oc/oms/v1/getOneRefundItem', params),
  cpStoreInfo: params => network.post('/api/cs/oc/oms/v1/cpStoreInfo', params),
  getScanIncomingInfo: params => network.post('/api/cs/oc/oms/v1/getScanIncomingInfo', params),
  saveScanIncoming: params => network.post('/api/cs/oc/oms/v1/saveScanIncoming', params),
  saveAfterDeliver: params => network.post('/api/cs/oc/oms/v1/saveAfterDeliver', params),
  saveAfterDeliverItem: params => network.post('/api/cs/oc/oms/v1/saveAfterDeliverItem', params),
  deleteAfterDeliverItem: params => network.post('/api/cs/oc/oms/v1/deleteAfterDeliverItem', params),
  copyAfterDeliver: params => network.post('/api/cs/oc/oms/v1/copyAfterDeliver', params),
  objectTableItem: params => network.post('/p/cs/objectTableItem', params),
  DynamicList: params => network.post('/api/cs/oc/oms/v1/DynamicList', params),
  querySalesReturn: params => network.post('/api/cs/oc/oms/v1/querySalesReturn', params),
  OcCancelChangingOrRefund: params => network.post('/api/cs/oc/oms/v1/OcCancelChangingOrRefund', params),
  virtualWarehouseStorage: params => network.post('/api/cs/oc/oms/v1/virtualWarehouseStorage', params),
  cancelautorefund: params => network.post('/api/cs/oc/oms/v1/cancelautorefund', params),
  updateReturnBOrder: params => network.post('/p/cs/updateReturnBOrder', params),
  orderReturnRecallFromWms: params => network.post('/p/cs/orderReturnRecallFromWms', params),
  retransmissionWms: params => network.post('/api/cs/oc/oms/v1/retransmissionWms', params),
  forcedCompletion: params => network.post('/api/cs/oc/oms/v1/forcedCompletion', params),
  exportReturnOrder: params => network.post('/api/cs/oc/oms/v1/exportReturnOrder', params),
  findDetail: params => network.post('/api/cs/oc/oms/v1/findDetail', params),
  manualMatchingCheck: params => network.post('/api/cs/oc/oms/v1/manualMatchingCheck', params),
  returnCancel: params => network.post('/api/cs/oc/oms/v1/returnCancel', params),
  ReturnStorageList: params => network.post('/api/cs/oc/oms/v1/ReturnStorageList', params),
  exportOcBRefundIn: params => network.post('/api/cs/oc/oms/v1/exportOcBRefundIn', params),
  ReturnStorageSave: params => network.post('/api/cs/oc/oms/v1/ReturnStorageSave', params),
  searchButtonsInDetail: params => network.post('/api/cs/oc/oms/v1/searchButtonsInDetail', params),
  getDetail: params => network.post('/api/cs/oc/oms/v1/getDetail', params),
  export: params => network.post('/p/outpro/export', params),
  amendBody: (tableName, params) => network.post(port[tableName].amendBody, params),
  objectAdd: params => ('/p/cs/objectAdd', params),
  prodel: params => network.post('/p/cs/prodel', params),
  updateDicunot: params => network.post('/p/cs/oc/v1/sale/updateDicunot', params),
  updateLogisticsBeforePacking: params => network.post('/api/cs/vip/distribution/Logistics/v1/updateLogisticsBeforePacking', params),
  sendWmsPick: params => network.post('/api/cs/vip/distribution//add/sendWmsPick', params),
  querySkuListAndStorageInfo: params => network.post('/api/cs/oc/oms/v1/querySkuListAndStorageInfo', params),
  updateLogistics: params => network.post('/api/cs/oc/oms/v1/updateLogistics', params),
  manualMatchingList: params => network.post('/api/cs/oc/oms/v1/manualMatchingList', params),
  distributionFindBydistributionId: params => network.post('/api/cs/vip/distributionItem/v1/findBydistributionId', params), // 根据配货单id查询配货单明细
  distributionChangeTag: params => network.post('/api/cs/vip/distribution/v1/changeTag', params), // 配货单换吊牌的保存
  managementOrderHold: params => network.post('/api/cs/oc/oms/v1/holdOrder', params), // 零售发货单-HOLD单
  returnTypeItemquery: params => network.post('/p/cs/objectTableItem', params), // 退款分类-退款分类描述
  extraReturnTableLogQuery: params => network.post('/api/cs/oc/oms/v1/getOcBReturnAfSendLog', params), // 额外退款单-额外退款单日志
  modifyReturnOrderWarehouse: params => network.post('/api/cs/oc/oms/v1/modifyReturnOrderWarehouse', params),  //退换货单修改退回仓库

  // 半定制弹框
  //
  updateWarehouse: params => network.post('/api/cs/oc/oms/v1/updateWarehouse', params),
  //
  getQueryList: params => network.post('/api/cs/oc/oms/v1/getQueryList', params)
};
