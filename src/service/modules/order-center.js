// 订单中心
import R3 from '@syman/burgeon-r3';

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
  skuQuery: params => network.post('/p/cs/skuQuery', params),
  getObject: params => network.post('/p/cs/getObject', params),
  billCopy: params => network.post('/p/cs/billCopy', params),
  getOrderDetailList: params => network.post('/p/cs/getOrderDetailList', params),
  saveBill: params => network.post('p/cs/saveBill', params),
  delOrderItem: params => network.post('/p/cs/delOrderItem', params),
  queryResionByName: params => network.post('/p/cs/queryResionByName', params)
};
