export default {
  clonePopUp: {
    component: () => import('../component/ModalOne.vue'),
  },
  /**
   * 库存中心
   */
  // 调拨单审核---不要
  transferOrderAudit: {
    component: () => import('@/views/modal/InventoryCenter/requisition.vue'),
  },
  // 调拨单导出---不要
  transferOrderImport: {
    component: () => import('@/views/modal/InventoryCenter/sgTransferImport.vue'),
  },
  // 盘点单新增---暂隐
  inventorylistAdd: {
    component: () => import('@/views/modal/InventoryCenter/inventoryInsert.vue'),
  },
  // 出库结果单 导入
  outResultImport: {
    component: () => import('@/views/modal/InventoryCenter/outResultImport.vue'),
  },
  // 出库通知单- 生成拣货单汇总 ---不要
  creatPickOrder: {
    component: () => import('@/views/modal/InventoryCenter/creatPickOrder.vue'),
  },
  // 出库通知单- 打印电子面单
  printElectronicBill: {
    component: () => import('@/views/modal/InventoryCenter/electronicSheetPrinting.vue'),
  },
  // 入库通知单- 生成拣货单 ---不要
  creatPickOrderIn: {
    component: () => import('@/views/modal/InventoryCenter/creatPickOrderIn.vue'),
  },

  /**
   * 订单中心
   */
  // 零售订单 批量导入
  salesOrderBatchImport: {
    component: () => import('@/views/modal/orderCenter/sendOutBatchImport.vue'),
  },
  // 销售单 打印
  salesSlipPrinting: {
    component: () => import('@/views/modal/orderCenter/OmniListChannelPrinting.vue'),
  },
  // 采购订单/采购退货单 批量导入
  purchasebatchImport: {
    component: () => import('@/views/modal/orderCenter/batchImport.vue'),
  },
  // 

  modifyWarehouse: {
    component: () => import('@/views/modal/orderCenter/modifyWarehouse.vue')
  }, //JIT配货单修改仓库测试弹框

};