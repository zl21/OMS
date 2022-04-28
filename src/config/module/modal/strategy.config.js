// 策略平台
export default {
  EXPRESSSTRATEGYTIMEDIALOG: {
    component: () => import('@/views/modal/strategyPlatform/expressStrategyTimeDialog.vue'), // 延长结案时间
  },
  DELAYSET: {
    component: () => import('@/views/modal/strategyPlatform/delaySet.vue'), // 延期
  },
  POSTPONECONFIRM: {
    component: () => import('@/views/modal/strategyPlatform/postponeConfirm.vue'), // 延期
  },
  ENDTIMEUPDATEDIALOG: {
    component: () => import('@/views/modal/strategyPlatform/endTimeUpdateDialog.vue'), // 修改结束时间
  },
  STRATEGYTIMEDIALOG: {
    component: () => import('@/views/modal/strategyPlatform/strategyTimeDialog.vue'), // 修改结束时间
  },
  SYNCSTOCKSTRATEGYIMPORT: {
    component: () => import('@/views/modal/strategyPlatform/syncStockStrategyImport.vue'), // 店铺同步库存策略-（导入-同步策略明细
  },
  PRODUCTSTRATEGYSHOPSCALEIMPORT: {
    // 店铺商品特殊设置-编辑-多店铺比例-明细导入
    component: () => import('@/views/modal/strategyPlatform/productStrategyShopScaleImport.vue'),
  },
  BATCHUPDATEAUTOCHECK: {
    //订单自动审核列表->批量修改
    component: () => import('@/views/modal/strategyPlatform/batchUpdateAutocheck.vue')
  }
};
