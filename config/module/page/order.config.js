/*
 * @Author: your name
 * @Date: 2021-06-08 20:32:29
 * @LastEditTime: 2021-06-16 14:28:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /burgeon-project-logic/config/module/page/order.config.js
 */

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
  //退货入库半定制
  MATCHINGDETAILS: { //_/views/pages/orderCenter/matchingDetails.vue
    component: () => import('allpages/orderCenter/matchingDetails.vue'),
  },
};
