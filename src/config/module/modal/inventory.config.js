// 库存中心
export default {
  // 平台店铺商品表(商品按查询条件同步)
  CHANNELINVENTORY: {
    component: () => import(
      /* webpackChunkName: 'InventoryCenterModal' */
      '@/views/modal/inventoryCenter/channelInventory.vue'
    ),
  },
  // 出库通知单-按查询条件重传WMS
  QUERYCONDITIONRETRANSMISSIONWMS: {
    component: () => import(
      /* webpackChunkName: 'InventoryCenterModal' */
      '@/views/modal/inventoryCenter/queryConditionRetransmissionWms.vue'
    )
  },
  // 出库通知单-重传WMS(按条件)
  SGPHYOUTNOTICESSENDWMSAGAINCMD: {

  },
  // 出库结果单-(导入-出库结果单)
  OUTRESULTIMPORT: {
    component: () => import(
      /* webpackChunkName: 'InventoryCenterModal' */
      '@/views/modal/inventoryCenter/outResultImport.vue'
    )
  },
  // 逻辑调拨单批量导入 - 动作定义 （单对象的提交按钮）
  TRANSFER_SUBMIT: {
    component: () => import(
      /* webpackChunkName: 'InventoryCenterModal' */
      '@/views/modal/inventoryCenter/transferSubmit.vue'
    )
  },
  // 配销仓调拨单批量导入 - 动作定义 （单对象的提交按钮）
  SHARE_SA_BATCH_TRANSFER_SUBMIT: {
    component: () => import(
      /* webpackChunkName: 'InventoryCenterModal' */
      '@/views/modal/inventoryCenter/shareSaBatchTransferSubmit.vue'
    )
  },
  //平台店铺商品表>店铺商品绑定
  CHANNEL_SKU_BAND: {
    component: () => import(
      /* webpackChunkName: 'InventoryCenterModal' */
      '@/views/modal/inventoryCenter/channelSkuBand.vue'
    )
  },
};
