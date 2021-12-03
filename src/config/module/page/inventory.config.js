
// 库存中心定制界面
// import outboundPickOrder from 'allpages/orderCenter/scanIn/outboundPickOrder.vue';
// import sgChannelSynstockQuery from 'allpages/inventoryCenter/sgChannelSynstockQuery.vue'; // 库存同步队列表
// import sgChannelStorageBuffer from 'allpages/inventoryCenter/sgChannelStorageBuffer.vue'; // 库存计算缓存池/库存策略计算缓存池
// import sgStorageChangeFtpQuery from 'allpages/inventoryCenter/sgStorageChangeFtpQuery.vue'; // 平台店铺库存变动流水
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
  },
  // 共享池库存梯度策略-单对象
  SYNCGRADIENTSTRATEGY: {
    component: () => import(
      /* webpackChunkName: 'InventoryCenterPage' */
      'allpages/inventoryCenter/syncGradientStrategy/syncGradientStrategy.vue'
    ),
  },
  // 配销仓库存梯度策略-单对象
  SYNCGRADIENTSTRATEGYSA: {
    component: () => import(
      /* webpackChunkName: 'InventoryCenterPage' */
      'allpages/inventoryCenter/syncGradientStrategySA/syncGradientStrategySA.vue'
    ),
  },
  // 寻源策略表-单对象
  SOURCSTRATEGYDETAIL: {
    component: () => import(
      /* webpackChunkName: 'InventoryCenterPage' */
      'allpages/inventoryCenter/sourcstrategy/sourcstrategyAdd.vue'
    ),
  },
  // 特殊条码按比例同步策略-单对象
  CHANNELSKUSTRATEGY: {
    component: () => import(
      /* webpackChunkName: 'InventoryCenterPage' */
      'allpages/inventoryCenter/channelSkuStrategy.vue'
    ),
  },
  // 比例同步策略-单对象
  CHANNELRATIOSTRATEGY: {
    component: () => import(
      /* webpackChunkName: 'InventoryCenterPage' */
      'allpages/inventoryCenter/channelRatioStrategy.vue'
    ),
  },
  // 店仓评分 - 列表
  STORESCORESTRATEGY: {
    component: () => import(
      /* webpackChunkName: 'InventoryCenterPage' */
      'allpages/inventoryCenter/storeScoreStrategy/storeScoreStrategy.vue'
    ),
  },
  // 店仓评分 - 详情
  STORESCORESTRATEGYDETAIL: {
    component: () => import(
      /* webpackChunkName: 'InventoryCenterPage' */
      'allpages/inventoryCenter/storeScoreStrategy/storeScoreStrategyAdd.vue'
    ),
  },
 // 渠道库存管理
 CHANNELSTOCKCONTROL: {
  component: () => import(
    /* webpackChunkName: 'InventoryCenterPage' */
    'allpages/inventoryCenter/channelStockControl/channelStockControl.vue'
  ),
  // 配销仓调拨单 - 商品明细Tab
   SHARESATRANSFER: {
    component: () => import(
      /* webpackChunkName: 'InventoryCenterPage' */
      'allpages/inventoryCenter/logicalTransferOrder/logicalTransferOrderDetail.vue'
    ),
  },
  // 分货退货单 - 商品明细Tab
  SHAREALLOCATIONRETURN: {
    component: () => import(
      /* webpackChunkName: 'InventoryCenterPage' */
      'allpages/inventoryCenter/logicalTransferOrder/logicalTransferOrderDetail.vue'
    ),
  },
  // 分货单 - 商品明细Tab
  SHAREALLOCATION: {
    component: () => import(
      /* webpackChunkName: 'InventoryCenterPage' */
      'allpages/inventoryCenter/logicalTransferOrder/logicalTransferOrderDetail.vue'
    ),
  },
  // 逻辑解冻单 - 商品明细Tab
  STOUNFREEZE: {
    component: () => import(
      /* webpackChunkName: 'InventoryCenterPage' */
      'allpages/inventoryCenter/logicalTransferOrder/logicalTransferOrderDetail.vue'
    ),
  },
  // 库存调整单 - 商品明细Tab
  STOADJUST: {
    component: () => import(
      /* webpackChunkName: 'InventoryCenterPage' */
      'allpages/inventoryCenter/logicalTransferOrder/logicalTransferOrderDetail.vue'
    ),
  },
  // 共享调整单 - 商品明细Tab
  SHAREADJUST: {
    component: () => import(
      /* webpackChunkName: 'InventoryCenterPage' */
      'allpages/inventoryCenter/logicalTransferOrder/logicalTransferOrderDetail.vue'
    ),
  },
  // 门店预售活动 - 商品明细Tab
  STOREPRESALE: {
    component: () => import(
      /* webpackChunkName: 'InventoryCenterPage' */
      'allpages/inventoryCenter/logicalTransferOrder/logicalTransferOrderDetail.vue'
    ),
  },
  // 逻辑冻结单 - 商品明细Tab
  STOFREEZE: {
    component: () => import(
      /* webpackChunkName: 'InventoryCenterPage' */
      'allpages/inventoryCenter/logicalTransferOrder/logicalTransferOrderDetail.vue'
    ),
  },
  // 逻辑调拨单批量导入 - 动作定义 （单对象的提交按钮）
   TRANSFER_SUBMIT: {
    component: () => import(
      /* webpackChunkName: 'InventoryCenterPage' */
      'allpages/inventoryCenter/transferSubmit.vue'
    ),
  },
  // 配销仓调拨单批量导入 - 动作定义 （单对象的提交按钮）
  SHARE_SA_BATCH_TRANSFER_SUBMIT: {
    component: () => import(
      /* webpackChunkName: 'InventoryCenterPage' */
      'allpages/inventoryCenter/shareSaBatchTransferSubmit.vue'
    ),
  },
},
  
};
