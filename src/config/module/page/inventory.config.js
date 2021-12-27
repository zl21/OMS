// 库存中心定制界面
export default {
  // 出库通知单==>生成出库拣货单==>出库拣货单
  OUTBOUNDPICKORDER: {
    component: () => import('allpages/orderCenter/scanIn/outboundPickOrder.vue'),
  },
  // 库存同步队列表
  SGCHANNELSYNSTOCKQUERY: {
    component: () => import('allpages/inventoryCenter/sgChannelSynstockQuery.vue'),
  },
  // 库存计算缓存池/库存策略计算缓存池
  SGCHANNELSTORAGEBUFFER: {
    component: () => import('allpages/inventoryCenter/sgChannelStorageBuffer.vue'),
  },
  // 平台店铺库存变动流水
  SGSTORAGECHANGEFTPQUERY: {
    component: () => import('allpages/inventoryCenter/sgStorageChangeFtpQuery.vue'),
  },
  // 库存计算缓存池/库存策略计算缓存池
  SGCHANNELSTORAGEBUFFERPROCEDURE: {
    component: () => import('allpages/inventoryCenter/sgChannelStorageBuffer.vue'),
  },
  // 共享池库存梯度策略-单对象
  SYNCGRADIENTSTRATEGY: {
    component: () => import('allpages/inventoryCenter/syncGradientStrategy/syncGradientStrategy.vue'),
    labelName: '共享池库存梯度策略'
  },
  // 配销仓库存梯度策略-单对象
  SYNCGRADIENTSTRATEGYSA: {
    component: () => import('allpages/inventoryCenter/syncGradientStrategySA/syncGradientStrategySA.vue'),
    labelName: '配销仓库存梯度策略'
  },
  // 寻源策略表-单对象
  SOURCSTRATEGYDETAIL: {
    component: () => import('allpages/inventoryCenter/sourcstrategy/sourcstrategyAdd.vue'),
    labelName: '寻源策略表'
  },
  // 特殊条码按比例同步策略-单对象
  CHANNELSKUSTRATEGY: {
    component: () => import('allpages/inventoryCenter/channelSkuStrategy.vue'),
    labelName: '特殊条码按比例同步策略'
  },
  // 比例同步策略-单对象
  CHANNELRATIOSTRATEGY: {
    component: () => import('allpages/inventoryCenter/channelRatioStrategy.vue'),
    labelName: '按比例同步策略'
  },
  // 店仓评分 - 列表
  STORESCORESTRATEGY: {
    component: () => import('allpages/inventoryCenter/storeScoreStrategy/storeScoreStrategy.vue'),
    labelName: '店仓评分设置表'
  },
  // 店仓评分 - 详情
  STORESCORESTRATEGYDETAIL: {
    component: () => import('allpages/inventoryCenter/storeScoreStrategy/storeScoreStrategyAdd.vue'),
    labelName: '店仓评分设置表'
  },
  // 渠道库存管理
  CHANNELSTOCKCONTROL: {
    component: () => import('allpages/inventoryCenter/channelStockControl/channelStockControl.vue'),
    labelName: '渠道库存管理'
  },
// 配销仓调拨单 - 商品明细Tab
  SHARESATRANSFER: {
    component: () => import('allpages/inventoryCenter/logicalTransferOrder/logicalTransferOrderDetail.vue'),
  },
  // 分货退货单 - 商品明细Tab
  SHAREALLOCATIONRETURN: {
    component: () => import('allpages/inventoryCenter/logicalTransferOrder/logicalTransferOrderDetail.vue'),
  },
  // 分货单 - 商品明细Tab
  SHAREALLOCATION: {
    component: () => import('allpages/inventoryCenter/logicalTransferOrder/logicalTransferOrderDetail.vue'),
  },
  // 逻辑解冻单 - 商品明细Tab
  STOUNFREEZE: {
    component: () => import('allpages/inventoryCenter/logicalTransferOrder/logicalTransferOrderDetail.vue'),
    labelName: '逻辑解冻单'
  },
  // 库存调整单 - 商品明细Tab
  STOADJUST: {
    component: () => import('allpages/inventoryCenter/logicalTransferOrder/logicalTransferOrderDetail.vue'),
  },
  // 共享调整单 - 商品明细Tab
  SHAREADJUST: {
    component: () => import('allpages/inventoryCenter/logicalTransferOrder/logicalTransferOrderDetail.vue'),
  },
  // 门店预售活动 - 商品明细Tab
  STOREPRESALE: {
    component: () => import('allpages/inventoryCenter/logicalTransferOrder/logicalTransferOrderDetail.vue'),
  },
  // 逻辑冻结单 - 商品明细Tab
  STOFREEZE: {
    component: () => import('allpages/inventoryCenter/logicalTransferOrder/logicalTransferOrderDetail.vue'),
  },
  // 逻辑调拨单批量导入 - 动作定义 （单对象的提交按钮）
  TRANSFER_SUBMIT: {
    component: () => import('allpages/inventoryCenter/transferSubmit.vue'),
  },
  // 配销仓调拨单批量导入 - 动作定义 （单对象的提交按钮）
  SHARE_SA_BATCH_TRANSFER_SUBMIT: {
    component: () => import('allpages/inventoryCenter/shareSaBatchTransferSubmit.vue'),
  },
  // 逻辑调拨单
  LOGICALTRANSFER: {
    component: () => import('allpages/inventoryCenter/logicalTransferOrder/logicalTransferOrderDetail.vue')
  },
  // 寻源策略表 - 列表
  SOURCSTRATEGY: {
    component: () => import('allpages/inventoryCenter/sourcstrategy/sourcstrategy'),
    labelName: '寻源策略表'
  },

};
