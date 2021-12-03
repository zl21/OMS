/*
 * @Author: your name
 * @Date: 2021-06-02 11:41:04
 * @LastEditTime: 2021-07-14 19:39:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /project-logic/config/module/page/promotion.config.js
 */

/**
 * 营销中心
 *  */
// ----------仓间调拨明细tab
export default {
  PROMACTIQUERYLIST: {
    component: () => import(
      /* webpackChunkName: 'PromotionCenterPage' */
      'allpages/promotionCenter/onlinePromotion/promotionlist.vue'
    ),
    // labelName: '促销活动',
    labelName: $it('menu.ad'),
  },
  PM_C_PROM_ACTI: {
    component: () => import(
      /* webpackChunkName: 'PromotionCenterPage' */
      'allpages/promotionCenter/onlinePromotion/addOrEditActi.vue'
    )
  },
  PM_C_PROM_ACTI_BATCH_ADD: {
    component: () => import(
      /* webpackChunkName: 'PromotionCenterPage' */
      'allpages/promotionCenter/onlinePromotion/batchActivity.vue'
    )
  },
  PM_C_PROM_PRE_TEST: {
    component: () => import(
      /* webpackChunkName: 'PromotionCenterPage' */
      'allpages/promotionCenter/onlinePromotion/simulation.vue'
    )
  },
  // ORDERDETAIL2: {
  //   component: orderDetail2
  // }
};
