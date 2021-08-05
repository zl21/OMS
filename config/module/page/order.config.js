/*
 * @Author: your name
 * @Date: 2021-06-08 20:32:29
 * @LastEditTime: 2021-08-05 15:43:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /burgeon-project-logic/config/module/page/order.config.js
 */
import i18n from '@burgeon/internationalization/i18n'; // 国际化
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
    labelName: i18n.t('panel_label.retail_shipping_order')
  },
  OC_B_RETURN_ORDER: {
    component: () => import('allpages/orderCenter/orderManager/orderManager.vue'),
    labelName: i18n.t('panel_label.a1')
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
    labelName: i18n.t('panel_label.retailInvoice_details'), //零售发货单详情
  },
  // 订单中心-退换货单详情
  RETURNGOOD: {
    component: () => import('allpages/orderCenter/returngood/returngoodmanagement.vue'),
    // component: returnGood,
    labelName: i18n.t('menu.b7'), //退货单详情
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
    // labelName: '已发货退款单编辑',
    labelName: i18n.t('menu.aw'),
  },
  EXTRAREFUND: {
    component: () => import('allpages/orderCenter/returngood/refundAfterShipment.vue'),
    // component: refundAfterShipment,
    // labelName: '额外退款编辑',
    labelName: i18n.t('menu.ax'),
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
    // labelName: 'JIT配货单-换吊牌',
    labelName: i18n.t('menu.ay'),
  },
  //退货入库半定制
  MATCHINGDETAILS: { //_/views/pages/orderCenter/matchingDetails.vue
    component: () => import('allpages/orderCenter/matchingDetails.vue'),
  },
  // 退换货单新增
  OC_B_RETURN_ORDER_VIRTUAL_TABLE: {
    component: () => import('allpages/orderCenter/returnOrder/returnOrderAdd.vue'),
    // labelName: '退换货新增',
    labelName: i18n.t('menu.az'),
  },
  // 额外退款单
  E_PRODUCT_DETAILS:{
    component: () => import('allpages/orderCenter/extraRefund/productDetails.vue'),
  },
  // 发货前退款单
  OC_B_REFUND_ORDER_SENT:{
    component: () => import('allpages/orderCenter/returngood/returnGoods.vue'),
  },
  OC_B_REFUND_ORDER:{
    component: () => import('allpages/orderCenter/returngood/returnGoods.vue'),
  }
};
