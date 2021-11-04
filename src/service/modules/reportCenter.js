// 报表中心
export default {
  rcOrderReportExportApiObj: () => {
    const obj = {
      V_OC_B_VIPCOM_DISTRIBUTION: {
        table: 'V_OC_B_VIPCOM_DISTRIBUTION',
        url: '/p/cs/exportVipcomDistribution',
        filename: '配货单导出报表',
        menu: '配货单导出报表',
        type: ''
      },
      ORDEREXPORTVIEW: {
        table: 'ORDEREXPORTVIEW',
        url: '/p/cs/exportOrderReport',
        filename: '订单导出报表',
        menu: '订单导出报表'
      },
      V_SG_B_PHY_OUT_NOTICES: {
        table: 'V_SG_B_PHY_OUT_NOTICES',
        url: '/p/cs/exportPhyOutNoticesReport',
        filename: '出库通知单导出报表',
        menu: '出库通知单导出报表',
        type: ''
      },
      REFUND_IN_EXPORTVIEW: {
        table: 'REFUND_IN_EXPORTVIEW',
        url: '/p/cs/exportRefIn',
        filename: '退货入库导出报表',
        menu: '退货入库导出报表'
      },
      V_RETAIL_REPORT: {
        table: 'V_RETAIL_REPORT',
        url: '/p/cs/exportRetailReport',
        filename: '零售导出报表',
        menu: '零售导出报表'
      }
    };
    return obj;
  },
};
