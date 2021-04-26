
/**
 * 营销中心
 *  */
 
import promactiquerylist from 'allpages/promotionCenter/promotionlist.vue'; // 促销活动列表界面
import addOrEditActi from 'allpages/promotionCenter/addOrEditActi.vue'; // 促销新增页面
import batchActivity from 'allpages/promotionCenter/batchActivity.vue'; // 促销批量新增界面
import simulation from 'allpages/promotionCenter/simulation.vue'; // 促销活动-模拟仿真
// import orderDetail2 from '@/component/common/detailTab/orderDetail';
// ----------仓间调拨明细tab

export default {
  PROMACTIQUERYLIST: {
    component: promactiquerylist,
    labelName: '促销活动',
  },
  ADDOREDITACTI: {
    component: addOrEditActi,
  },
  BATCHACTIVITY: {
    component: batchActivity,
  },
  SIMULATION: {
    component: simulation
  },
  // ORDERDETAIL2: {
  //   component: orderDetail2
  // }
};
