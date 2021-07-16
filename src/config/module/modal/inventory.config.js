// 库存中心
export default {
  // 平台店铺商品表(商品按查询条件同步)
  CHANNELINVENTORY: {
    component: () => import('@/views/modal/InventoryCenter/channelInventory.vue'),
  },
  // 出库通知单-按查询条件重传WMS
  QUERYCONDITIONRETRANSMISSIONWMS: {
    component: () => import('@/views/modal/InventoryCenter/queryConditionRetransmissionWms.vue')
  },
  // 出库通知单-重传WMS(按条件)
  SGPHYOUTNOTICESSENDWMSAGAINCMD: {

  },
  // 出库结果单-(导入-出库结果单)
  OUTRESULTIMPORT: {
    component: () => import('@/views/modal/InventoryCenter/outResultImport.vue')
  },
  // 平台店铺商品表-商品按查询条件同步
  CHANNELINVENTORY: {
    component: () => import('@/views/modal/InventoryCenter/channelInventory.vue')
  },
  // 调拨管理-仓间调拨
  TRANSFERAUDIT: {
    component: () => import('@/views/modal/InventoryCenter/transferaudit.vue')
  }
};
