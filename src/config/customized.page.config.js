// import promactiquerylist from '../customize/customizedModal/customizePateFor1.3/promotion/promactiquerylist.vue';
// import promotion from '../customize/customizedModal/customizePateFor1.3/promotion/promotion.vue';
import RETURNSTOREAGELIST from '../customize/customizedModal/customizePateFor1.3/returngood/returnStoreage/returnStoreageList.vue';
import RETURNTREASURYADD from '../customize/customizedModal/customizePateFor1.3/returngood/returnStoreage/returnTreasuryAdd.vue';
import MANUALMATCHING from '../customize/customizedModal/customizePateFor1.3/returngood/returnStoreage/manualMatching.vue';
import halfOrderDetail from '../views/pages/common/orderDetail/halfOrderDetail.vue';

const customizedPage = require('./customized.page').default;

export default {
  // 列表配置双击跳转定制界面，需在文档里维护对应的labelName属性
  // promactiquerylist: {
  //   component: promactiquerylist,
  // },
  // promotion: {
  //   component: promotion
  // }, // 促销活动编辑 乔丹线上
  RETURNSTOREAGELIST: {
    component: RETURNSTOREAGELIST
  }, // 退货入库
  RETURNTREASURYADD: {
    component: RETURNTREASURYADD
  }, // 退货入库新增
  MANUALMATCHING: {
    component: MANUALMATCHING
  }, // 退货入库-手工匹配
  orderDetail2: {
    component: halfOrderDetail
  },
  // 以上为1.3定制界面配置
  ...customizedPage
};
