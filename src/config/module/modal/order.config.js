export default {
  //JIT配货单修改仓库测试弹框
  modifyWarehouse: {
    component: () => import("@/views/modal/orderCenter/modifyWarehouse.vue"),
  },
  // 零售订单 批量导入
  salesOrderBatchImport: {
    component: () => import("@/views/modal/orderCenter/sendOutBatchImport.vue"),
  },
  // 销售单 打印
  salesSlipPrinting: {
    component: () =>
      import("@/views/modal/orderCenter/OmniListChannelPrinting.vue"),
  },
  // 采购订单/采购退货单 批量导入
  purchasebatchImport: {
    component: () => import("@/views/modal/orderCenter/batchImport.vue"),
  },
};
