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
import i18n from '@burgeon/internationalization/i18n'; // 国际化
export default {
  PROMACTIQUERYLIST: {
    component: () => import(
      /* webpackChunkName: 'PromotionCenterPage' */
      'allpages/promotionCenter/promotionlist.vue'
    ),
    // labelName: '促销活动',
    labelName: i18n.t('menu.ad'),
  },
  PM_C_PROM_ACTI: {
    component: () => import(
      /* webpackChunkName: 'PromotionCenterPage' */
      'allpages/promotionCenter/addOrEditActi.vue'
    )
  },
  PM_C_PROM_ACTI_BATCH_ADD: {
    component: () => import(
      /* webpackChunkName: 'PromotionCenterPage' */
      'allpages/promotionCenter/batchActivity.vue'
    )
  },
  PM_C_PROM_PRE_TEST: {
    component: () => import(
      /* webpackChunkName: 'PromotionCenterPage' */
      'allpages/promotionCenter/simulation.vue'
    )
  },
  // ORDERDETAIL2: {
  //   component: orderDetail2
  // }
};
