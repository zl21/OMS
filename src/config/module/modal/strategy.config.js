// 策略平台
export default {
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
    component: () => import('@/views/modal/strategyPlatform/syncStockStrategyImport.vue'), // 导入
  }
};
