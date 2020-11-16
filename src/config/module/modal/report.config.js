// 报表中心
export default {
  // 订单导出报表-（订单导出
  RCORDERREPORTEXPORT: {
    component: () => import('@/views/modal/reportCenter/rcOrderReportExport.vue'),
  },
  // 退货入库导出报表-（退货入库导出
  RCREFUNDINEXPORT: {
    // component: () => import('@/views/modal/reportCenter/rcRefundInExport.vue'),
  },
  // 配货单导出报表-（配货单导出
  RCVIPCOMDISTRIBUTIONEXPORT: {
    // component: () => import('@/views/modal/reportCenter/rcVipcomDistributionExport.vue'),
  },
  // 出库通知单导出报表-（明细导出、出库通知单导出
  RCPHYOUTNOTICESREPORTEXPORT: {
    // component: () => import('@/views/modal/reportCenter/rcPhyOutNoticesReportExport.vue'),
  },
  // 零售导出报表-（零售导出
  RCRETAILREPORTEXPORT: {
    // component: () => import('@/views/modal/reportCenter/rcRetailReportExport.vue'),
  },
};
