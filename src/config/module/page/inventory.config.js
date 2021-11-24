
// 库存中心定制界面
// import outboundPickOrder from 'allpages/orderCenter/scanIn/outboundPickOrder.vue';
// import sgChannelSynstockQuery from 'allpages/inventoryCenter/sgChannelSynstockQuery.vue'; // 库存同步队列表
// import sgChannelStorageBuffer from 'allpages/inventoryCenter/sgChannelStorageBuffer.vue'; // 库存计算缓存池/库存策略计算缓存池
// import sgStorageChangeFtpQuery from 'allpages/inventoryCenter/sgStorageChangeFtpQuery.vue'; // 平台店铺库存变动流水
import i18n from '@burgeon/internationalization/i18n'; // 国际化
export default {
  // 出库通知单==>生成出库拣货单==>出库拣货单
  OUTBOUNDPICKORDER: {
    component: () => import(
      /* webpackChunkName: 'InventoryCenterPage' */
      'allpages/orderCenter/scanIn/outboundPickOrder.vue'
    ),
    // component: outboundPickOrder,
  },
  SGCHANNELSYNSTOCKQUERY: {
    component: () => import(
      /* webpackChunkName: 'InventoryCenterPage' */
      'allpages/inventoryCenter/sgChannelSynstockQuery.vue'
    ),
    // component: sgChannelSynstockQuery
  },
  SGCHANNELSTORAGEBUFFER: {
    component: () => import(
      /* webpackChunkName: 'InventoryCenterPage' */
      'allpages/inventoryCenter/sgChannelStorageBuffer.vue'
    ),
    // component: sgChannelStorageBuffer
  },
  SGSTORAGECHANGEFTPQUERY: {
    component: () => import(
      /* webpackChunkName: 'InventoryCenterPage' */
      'allpages/inventoryCenter/sgStorageChangeFtpQuery.vue'
    ),
    // component: sgStorageChangeFtpQuery
  },
  SGCHANNELSTORAGEBUFFERPROCEDURE: {
    component: () => import(
      /* webpackChunkName: 'InventoryCenterPage' */
      'allpages/inventoryCenter/sgChannelStorageBuffer.vue'
    ),
    // component: sgChannelStorageBuffer // 库存策略计算缓存池
  }

};
