/*
 * @Author: your name
 * @Date: 2021-06-07 20:40:40
 * @LastEditTime: 2021-06-21 15:03:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /burgeon-project-logic/config/module/modal/strategy.config.js
 */
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
    component: () => import('@/views/modal/strategyPlatform/syncStockStrategyImport.vue'), // 店铺同步库存策略-（导入-同步策略明细
  },
  PRODUCTSTRATEGYSHOPSCALEIMPORT: {
    // 店铺商品特殊设置-编辑-多店铺比例-明细导入
    component: () => import('@/views/modal/strategyPlatform/productStrategyShopScaleImport.vue'),
  },
  BATCHMODIFY: { //店铺策略》批量修改
    component: () => import('@/views/modal/strategyPlatform/batchModify.vue'), // 店铺同步库存策略-（导入-同步策略明细
  },
  TABLELIST_COPY: { //复制
    component: () => import('@/views/modal/strategyPlatform/tablelist_copy.vue'), // 复制
  },
};
