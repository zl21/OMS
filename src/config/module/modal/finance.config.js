// 财务中心
export default {
  // 唯品会进度账单 唯品会月结账单列表 (下载账单)
  DOWNLOADVIPBILL: {
    component: () => import('@/views/modal/financeCenter/downLoadVipBill.vue'),
  },
  // O2O对账结算汇总 对账单导出
  CUSTOMSTANDSETTLEACCOUNTEXPORT: {
    component: () => import('@/views/modal/financeCenter/customstandsettleaccountexport.vue'),
  },
  // 轻供结算 对账单导出
  CUSTOMSTANDQGSETTLEACCOUNTEXPORT: {
    component: () => import('@/views/modal/financeCenter/customstandqgsettleaccountexport.vue'),
  },
  // 唯品会进度账单聚合表列表 唯品会月结账单聚合表列表 (生成销售单)
  GENERATESALESORDER: {
    component: () => import('@/views/modal/financeCenter/generateSalesOrder.vue'),
  },
  // 支付宝下载账单
  DOWNLOADALIPAYBILL: {
    component: () => import('@/views/modal/financeCenter/downLoadAlipayBill.vue'),
  },
  // O2O对账结算策略
  CUSTOMSETTLESTRATEGYIMPORT: {
    component: () => import('@/views/modal/financeCenter/customsettlestrategyimport.vue'),
  }
};
