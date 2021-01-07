// 财务中心
export default {
  // 唯品会进度账单 唯品会月结账单列表 (下载账单)
  DOWNLOADVIPBILL: {
    component: () => import('@/views/modal/financeCenter/downLoadVipBill.vue'),
  },
  // 唯品会进度账单聚合表列表 唯品会月结账单聚合表列表 (生成销售单)
  GENERATESALESORDER: {
    component: () => import('@/views/modal/financeCenter/generateSalesOrder.vue'),
  },
  // 支付宝下载账单
  DOWNLOADALIPAYBILL: {
    component: () => import('@/views/modal/financeCenter/downLoadAlipayBill.vue'),
  }
};
