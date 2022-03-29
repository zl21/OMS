// 财务中心
import R3 from '@syman/burgeon-r3';

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
  // 请求赔付类型
  getCompensationType: params => network.post('/p/cs/getCompensationType', params),
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
  // 对账单导出
  settleAccountExport: params => network.post('/p/cs/ac/v1/settleAccountExport', params),
  qgsettleAccountExport: params => network.post('/p/cs/ac/v1/qgSettleAccountExport', params),
  // 支付宝账单原始数据
  triggerAlipayBill: params => network.post(' /p/cs/ac/v1/triggerAlipayBill', params),
  // O2O轻供-店铺扣款登记表
  batchAuditByQueryConditions: params => network.post('/p/cs/ac/v1/batchAuditByQueryConditions', params),
  // 批量修改截止时间
  batchUpdateEndTime: params => network.post('/p/cs/ac/v1/batchUpdateEndTime', params),
  // 对账单导出(新老品)
  settleAccountNewProExport: params => network.post('/p/cs/ac/v1/settleAccountNewProExport', params),

};
