// import scanIn from 'allpages/orderCenter/scanIn/scanIn.vue';
// import orderManager from 'allpages/orderCenter/orderManager/orderManager.vue'; // 零售发货单
// 零售发货单-新增
// import orderManageAdd from 'allpages/orderCenter/orderManageAdd/orderManageAdd.vue';
// import orderManageDetail from 'allpages/orderCenter/orderManageDetail/orderManageDetail.vue'; // 零售发货单-详情
// import splitOrder from 'allpages/orderCenter/orderManager/splitOrder.vue';
// import returnGoodManagementList from 'allpages/orderCenter/returngood/returngoodmanagementList.vue'; // 订单中心-退换货单
// import returnGood from 'allpages/orderCenter/returngood/returngoodmanagement.vue'; // 订单中心-退换货单详情
// import returnStorageList from 'allpages/orderCenter/returngood/returnStoreage/returnStoreageList.vue'; // 退货入库-列表
// import returnTreasuryAdd from 'allpages/orderCenter/returngood/returnStoreage/returnTreasuryAdd.vue'; // 退货入库-新增 退货入库-新增
// import refundAfterShipment from 'allpages/orderCenter/returngood/refundAfterShipment.vue'; // 订单中心-已发货退款单-编辑 额外退款
// import distributionOrderList from 'allpages/orderCenter/vipJit/distributionOrderList.vue';

export default {
  // 订单中心-扫描入库
  SCANIN: {
    component: () => import('allpages/orderCenter/scanIn/scanIn.vue'),
    // component: scanIn,
  },
  // 订单中心-列表
  ORDERMANAGER: {
    component: () => import('allpages/orderCenter/orderManager/orderManager.vue'),
    // component: orderManager,
  },
  // 订单中心-列表-拆分订单
  MANUAL_SPLIT: {
    component: () => import('allpages/orderCenter/orderManager/splitOrder.vue'),
    // component: splitOrder,
  },
  // 订单中心-新增
  ORDERMANAGEADD: {
    component: () => import('allpages/orderCenter/orderManageAdd/orderManageAdd.vue'),
    // component: orderManageAdd,
  },
  // 订单中心-详情
  ORDERMANAGEDETAIL: {
    component: () => import('allpages/orderCenter/orderManageDetail/orderManageDetail.vue'),
    // component: orderManageDetail
  },
  // 订单中心-退换货单详情
  RETURNGOOD: {
    component: () => import('allpages/orderCenter/returngood/returngoodmanagement.vue'),
    // component: returnGood,
  },
  // 订单中心-退换货单
  RETURNGOODLIST: {
    component: () => import('allpages/orderCenter/returngood/returngoodmanagementList.vue'),
    // component: returnGoodManagementList,
  },
  // // 订单中心-退货入库-列表
  RETURNSTOREAGELIST: {
    component: () => import('allpages/orderCenter/returngood/returnStoreage/returnStoreageList.vue'),
    // component: returnStorageList,
  },
  // // 订单中心-退货入库-新增 订单中心-退货入库-详情
  RETURNTREASURYADD: {
    component: () => import('allpages/orderCenter/returngood/returnStoreage/returnTreasuryAdd.vue'),
    // component: returnTreasuryAdd,
  },
  REFUNDAFTERSHIPMENT: {
    component: () => import('allpages/orderCenter/returngood/refundAfterShipment.vue'),
    // component: refundAfterShipment,
    labelName: '已发货退款单编辑',
  },
  EXTRAREFUND: {
    component: () => import('allpages/orderCenter/returngood/refundAfterShipment.vue'),
    // component: refundAfterShipment,
    labelName: '额外退款编辑',
  },
  MANUALMATCHING: {
    // 退货入库-手工匹配
    component: () => import('allpages/orderCenter/returngood/returnStoreage/manualMatching.vue'),
  },
  WARNSENDMATCHING: {
    // 退货入库-错发匹配
    component: () => import('allpages/orderCenter/returngood/returnStoreage/manualMatching.vue'),
  },
  DISTRIBUTIONORDERLIST: {
    // component: distributionOrderList,
    component: () => import('allpages/orderCenter/returngood/returnStoreage/manualMatching.vue'),
  },
  SPLITDISTRIBUTIONORDER: {
    // JIT配货单-换吊牌
    component: () => import('allpages/orderCenter/distribution/splitDistributionOrder.vue'),
    labelName: 'JIT配货单-换吊牌',
  },
};
