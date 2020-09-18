export default {
  // 调拨单审核
  transferOrderAudit: {
    component: () => import("@/views/modal/InventoryCenter/requisition.vue"),
  },
  // 调拨单导出
  transferOrderImport: {
    component: () =>
      import("@/views/modal/InventoryCenter/sgTransferImport.vue"),
  },
  // 盘点单新增
  inventorylistAdd: {
    component: () =>
      import("@/views/modal/InventoryCenter/inventoryInsert.vue"),
  },
  // 出库结果单 导入
  outResultImport: {
    component: () =>
      import("@/views/modal/InventoryCenter/outResultImport.vue"),
  },
  // 出库通知单- 生成拣货单汇总
  creatPickOrder: {
    component: () => import("@/views/modal/InventoryCenter/creatPickOrder.vue"),
  },
  // 出库通知单- 打印电子面单
  printElectronicBill: {
    component: () =>
      import("@/views/modal/InventoryCenter/electronicSheetPrinting.vue"),
  },
  // 入库通知单- 生成拣货单
  creatPickOrderIn: {
    component: () =>
      import("@/views/modal/InventoryCenter/creatPickOrderIn.vue"),
  },
};
