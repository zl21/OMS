// 库存中心
export default {
  // 平台店铺商品表(商品按查询条件同步)
  CHANNELINVENTORY: {
    component: () => import('@/views/modal/InventoryCenter/channelInventory.vue'),
  },
  QUERYCONDITIONRETRANSMISSIONWMS: {
    component: () => import('@/views/modal/InventoryCenter/queryConditionRetransmissionWms.vue')
  }
};
