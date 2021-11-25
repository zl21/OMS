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
    component: () => import(
      /* webpackChunkName: 'StrategyCenterModal' */
      '@/views/modal/strategyPlatform/delaySet.vue'
    ), // 延期
  },
  POSTPONECONFIRM: {
    component: () => import(
      /* webpackChunkName: 'StrategyCenterModal' */
      '@/views/modal/strategyPlatform/postponeConfirm.vue'
    ), // 延期
  },
  ENDTIMEUPDATEDIALOG: {
    component: () => import(
      /* webpackChunkName: 'StrategyCenterModal' */
      '@/views/modal/strategyPlatform/endTimeUpdateDialog.vue'
    ), // 修改结束时间
  },
  STRATEGYTIMEDIALOG: {
    component: () => import(
      /* webpackChunkName: 'StrategyCenterModal' */
      '@/views/modal/strategyPlatform/strategyTimeDialog.vue'
    ), // 修改结束时间
  },
  BATCHMODIFY: { //店铺策略》批量修改
    component: () => import(
      /* webpackChunkName: 'StrategyCenterModal' */
      '@/views/modal/strategyPlatform/batchModify.vue'
    ), // 店铺同步库存策略-（导入-同步策略明细
  },
  TABLELIST_COPY: { //复制
    component: () => import(
      /* webpackChunkName: 'StrategyCenterModal' */
      '@/views/modal/strategyPlatform/tablelist_copy.vue'
    ), // 复制
  },
};
