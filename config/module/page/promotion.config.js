
/**
 * 营销中心
 *  */
// ----------仓间调拨明细tab

export default {
  PROMACTIQUERYLIST: {
    component: () => import('allpages/promotionCenter/promotionlist.vue')
    // labelName: '促销活动',
  },
  ADDOREDITACTI: {
    component: () => import('allpages/promotionCenter/addOrEditActi.vue')
  },
  BATCHACTIVITY: {
    component: () => import('allpages/promotionCenter/batchActivity.vue')
  },
  SIMULATION: {
    component: () => import('allpages/promotionCenter/simulation.vue')
  },
  // ORDERDETAIL2: {
  //   component: orderDetail2
  // }
};
