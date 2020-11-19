import scanIn from 'allpages/OrderCenter/scanIn/scanIn.vue';
import orderManager from 'allpages/OrderCenter/orderManager/orderManager.vue'; // 零售发货单
// 零售发货单-新增
import orderManageAdd from 'allpages/OrderCenter/orderManageAdd/orderManageAdd.vue';
import orderManageDetail from 'allpages/OrderCenter/orderManageDetail/orderManageDetail.vue'; // 零售发货单-详情
import splitOrder from 'allpages/OrderCenter/orderManager/splitOrder.vue';
import returnGoodManagementList from 'allpages/OrderCenter/returngood/returngoodmanagementList.vue'; // 订单中心-退换货单
import returnGood from 'allpages/OrderCenter/returngood/returngoodmanagement.vue'; // 订单中心-退换货单详情
import returnStorageList from 'allpages/OrderCenter/returngood/returnStoreage/returnStoreageList.vue'; // 退货入库-列表
import returnTreasuryAdd from 'allpages/OrderCenter/returngood/returnStoreage/returnTreasuryAdd.vue'; // 退货入库-新增 退货入库-新增
import refundAfterShipment from 'allpages/OrderCenter/returngood/refundAfterShipment.vue'; // 订单中心-已发货退款单-编辑 额外退款
import distributionOrderList from 'allpages/OrderCenter/vipJit/distributionOrderList.vue';

export default {
  // 订单中心-扫描入库
  SCANIN: {
    component: scanIn,
  },
  // 订单中心-列表
  ORDERMANAGER: {
    component: orderManager,
  },
  // 订单中心-列表-拆分订单
  SPLITORDER: {
    component: splitOrder,
  },
  // 订单中心-新增
  ORDERMANAGEADD: {
    component: orderManageAdd,
  },
  // 订单中心-详情
  ORDERMANAGEDETAIL: {
    component: orderManageDetail
  },
  // 订单中心-退换货单详情
  RETURNGOOD: {
    component: returnGood,
  },
  // 订单中心-退换货单
  RETURNGOODLIST: {
    component: returnGoodManagementList,
  },
  // // 订单中心-退货入库-列表
  RETURNSTOREAGELIST: {
    component: returnStorageList,
  },
  // // 订单中心-退货入库-新增 订单中心-退货入库-详情
  RETURNTREASURYADD: {
    component: returnTreasuryAdd,
  },
  REFUNDAFTERSHIPMENT: {
    component: refundAfterShipment,
    labelName: '已发货退款单编辑',
  },
  EXTRAREFUND: {
    component: refundAfterShipment,
    labelName: '额外退款编辑',
  },
  MANUALMATCHING: {
    // 退货入库-手工匹配
    component: () => import('@/views/pages/OrderCenter/returngood/returnStoreage/manualMatching.vue')
  },
  DISTRIBUTIONORDERLIST: {
    component: distributionOrderList
  }
};
