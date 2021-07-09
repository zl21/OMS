// 财务中心
import R3 from '../../../static/r3.publish/r3.min.js';

const { network } = R3;
export default {
  /**
   * 赔付单(列表)
   */
  // 列表 
  getPayableAdjustmentList: params => network.post('/p/cs/getPayableAdjustmentList', params),
  // 反客审 
  cancelAuditPayableAdjustment: params => network.post('/p/cs/cancelAuditPayableAdjustment', params),
  // 客审
  auditPayableAdjustment: params => network.post('/p/cs/auditPayableAdjustment', params),
  // 财审
  fiAuditPayableAdjustment: params => network.post('/p/cs/fiAuditPayableAdjustment', params),
  /**
   * 赔付单新增/编辑
   */
  // upload2:(params) => network.post('/p/cs/upload2',params),
  // 请求赔付原因
  getCompensationReason: params => network.post('/p/cs/getCompensationReason', params),
  // 计算应付金额
  getCompensate: params => network.post('/p/cs/getCompensate', params),
  // 保存 
  savePayableAdjustment: params => network.post('/p/cs/savePayableAdjustment', params),
  // 
  getPayableAdjustment: params => network.post('/p/cs/getPayableAdjustment', params),
  // 弹框 下载账单
  triggerVipBill: params => network.post('/p/cs/ac/v1/triggerVipBill', params),
  // 弹框 生成销售单
  getVendorCodeAndBillNumber: params => network.get('/p/cs/ac/v1/getVendorCodeAndBillNumber', params),
  generateVipSalesOrder: params => network.get('/p/cs/ac/v1/generateVipSalesOrder', params),
  // 支付宝账单原始数据
  triggerAlipayBill: params => network.post(' /p/cs/ac/v1/triggerAlipayBill', params),

};
