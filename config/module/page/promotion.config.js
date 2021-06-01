
/**
 * 营销中心
 *  */
// ----------仓间调拨明细tab

export default {
  PROMACTIQUERYLIST: {
    component: () => import('allpages/promotionCenter/promotionlist.vue'),
    labelName: '促销活动',
  },
  PM_C_PROM_ACTI: {
    component: () => import('allpages/promotionCenter/addOrEditActi.vue')
  },
  PM_C_PROM_ACTI_BATCH_ADD: {
    component: () => import('allpages/promotionCenter/batchActivity.vue')
  },
  PM_C_PROM_PRE_TEST: {
    component: () => import('allpages/promotionCenter/simulation.vue')
  },
  // ORDERDETAIL2: {
  //   component: orderDetail2
  // }
};
