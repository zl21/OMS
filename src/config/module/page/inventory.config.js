
// 库存中心定制界面
import outboundPickOrder from '@/views/pages/OrderCenter/scanIn/outboundPickOrder.vue';
import sgChannelSynstockQuery from '@/views/pages/InventoryCenter/sgChannelSynstockQuery.vue'; // 库存同步队列表
import sgChannelStorageBuffer from '@/views/pages/InventoryCenter/sgChannelStorageBuffer.vue'; // 库存计算缓存池
import sgStorageChangeFtpQuery from '@/views/pages/InventoryCenter/sgStorageChangeFtpQuery.vue';
// 平台店铺库存变动流水
export default {
  // 出库通知单==>生成出库拣货单==>出库拣货单
  OUTBOUNDPICKORDER: {
    component: outboundPickOrder,
  },
  SGCHANNELSYNSTOCKQUERY: {
    component: sgChannelSynstockQuery
  },
  SGCHANNELSTORAGEBUFFER: {
    component: sgChannelStorageBuffer
  },
  SGSTORAGECHANGEFTPQUERY: {
    component: sgStorageChangeFtpQuery
  },

};
