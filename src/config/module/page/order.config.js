/*
 * @Author: your name
 * @Date: 2021-06-08 20:32:29
 * @LastEditTime: 2021-11-10 11:39:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /burgeon-project-logic/config/module/page/order.config.js
 */
import i18n from '@burgeon/internationalization/i18n'; // 国际化
export default {
  OC_B_ORDER_VIRTUAL_TABLE: {
    component: () => import(
      /* webpackChunkName: 'OrderCenterPage' */
      'allpages/orderCenter/orderManager/orderAddOrCopy.vue'
    ),
    labelName: '订单新增',
    isList: false,
  },
  OC_B_ORDER: {
    component: () => import(
      /* webpackChunkName: 'OrderCenterPage' */
      'allpages/orderCenter/returnOrder/orderManageDetails.vue'
    ),
    labelName: '订单详情',
    isList: false
  },
  RETURNDETAILS: {
    component: () => import(
      /* webpackChunkName: 'OrderCenterPage' */
      'allpages/orderCenter/returnOrder/returnGoodsOrderDetails.vue'
    ),
  },
  // 订单中心-扫描入库
  SCANIN: {
    component: () => import(
      /* webpackChunkName: 'OrderCenterPage' */
      'allpages/orderCenter/scanIn/scanIn.vue'
    ),
    // component: scanIn,
  },
  // 订单中心-列表
  ORDERMANAGER: {
    component: () => import(
      /* webpackChunkName: 'OrderCenterPage' */
      // 'allpages/orderCenter/orderManager/orderManager.vue'
      'allpages/inventoryCenter/sourcstrategy/sourcstrategy.vue'
    ),
    // component: orderManager,
    labelName: i18n.t('panel_label.retail_shipping_order')
  },
  OC_B_RETURN_ORDER: {
    component: () => import(
      /* webpackChunkName: 'OrderCenterPage' */
      'allpages/orderCenter/orderManager/orderManager.vue'
    ),
    labelName: i18n.t('panel_label.a1')
  },
  // 订单中心-列表-拆分订单
  MANUAL_SPLIT: {
    component: () => import(
      /* webpackChunkName: 'OrderCenterPage' */
      'allpages/orderCenter/orderManager/splitOrder.vue'
    ),
    // component: splitOrder,
  },
  // 订单中心-新增
  ORDERMANAGEADD: {
    component: () => import(
      /* webpackChunkName: 'OrderCenterPage' */
      'allpages/orderCenter/orderManageAdd/orderManageAdd.vue'
    ),
    // component: orderManageAdd,
  },
  // 订单中心-退换货单详情
  RETURNGOOD: {
    component: () => import(
      /* webpackChunkName: 'OrderCenterPage' */
      'allpages/orderCenter/returngood/returngoodmanagement.vue'
    ),
    // component: returnGood,
    labelName: i18n.t('menu.b7'), //退货单详情
  },
  // 订单中心-退换货单
  RETURNGOODLIST: {
    component: () => import(
      /* webpackChunkName: 'OrderCenterPage' */
      'allpages/orderCenter/returngood/returngoodmanagementList.vue'
    ),
    // component: returnGoodManagementList,
  },
  // // 订单中心-退货入库-列表
  RETURNSTOREAGELIST: {
    component: () => import(
      /* webpackChunkName: 'OrderCenterPage' */
      'allpages/orderCenter/returngood/returnStoreage/returnStoreageList.vue'
    ),
    // component: returnStorageList,
  },
  // // 订单中心-退货入库-新增 订单中心-退货入库-详情
  RETURNTREASURYADD: {
    component: () => import(
      /* webpackChunkName: 'OrderCenterPage' */
      'allpages/orderCenter/returngood/returnStoreage/returnTreasuryAdd.vue'
    ),
    // component: returnTreasuryAdd,
  },
  REFUNDAFTERSHIPMENT: {
    component: () => import(
      /* webpackChunkName: 'OrderCenterPage' */
      'allpages/orderCenter/returngood/refundAfterShipment.vue'
    ),
    // component: refundAfterShipment,
    labelName: i18n.t('menu.aw'), // 已发货退款单编辑
  },
  EXTRAREFUND: {
    component: () => import(
      /* webpackChunkName: 'OrderCenterPage' */
      'allpages/orderCenter/returngood/refundAfterShipment.vue'
    ),
    // component: refundAfterShipment,
    labelName: i18n.t('menu.ax'), // 额外退款编辑
  },
  MANUALMATCHING: {
    // 退货入库-手工匹配
    component: () => import(
      /* webpackChunkName: 'OrderCenterPage' */
      'allpages/orderCenter/returngood/returnStoreage/manualMatching.vue'
    ),
  },
  WARNSENDMATCHING: {
    // 退货入库-错发匹配
    component: () => import(
      /* webpackChunkName: 'OrderCenterPage' */
      'allpages/orderCenter/returngood/returnStoreage/manualMatching.vue'
    ),
  },
  DISTRIBUTIONORDERLIST: {
    // component: distributionOrderList,
    component: () => import(
      /* webpackChunkName: 'OrderCenterPage' */
      'allpages/orderCenter/returngood/returnStoreage/manualMatching.vue'
    ),
  },
  SPLITDISTRIBUTIONORDER: {
    // JIT配货单-换吊牌
    component: () => import(
      /* webpackChunkName: 'OrderCenterPage' */
      'allpages/orderCenter/distribution/splitDistributionOrder.vue'
    ),
    labelName: i18n.t('menu.ay'), // JIT配货单-换吊牌
  },
  //退货入库半定制
  MATCHINGDETAILS: { //_/views/pages/orderCenter/matchingDetails.vue
    component: () => import(
      /* webpackChunkName: 'OrderCenterPage' */
      'allpages/orderCenter/matchingDetails.vue'
    ),
  },
  // 退换货单新增
  OC_B_RETURN_ORDER_VIRTUAL_TABLE: {
    component: () => import(
      /* webpackChunkName: 'OrderCenterPage' */
      'allpages/orderCenter/returnOrder/returnOrderAdd.vue'
    ),
    labelName: i18n.t('menu.az'), // 退换货新增
  },
  // 额外退款单
  E_PRODUCT_DETAILS: {
    component: () => import(
      /* webpackChunkName: 'OrderCenterPage' */
      'allpages/orderCenter/extraRefund/productDetails.vue'
    ),
  },
  // 发货前退款单
  OC_B_REFUND_ORDER_SENT: {
    component: () => import(
      /* webpackChunkName: 'OrderCenterPage' */
      'allpages/orderCenter/returngood/returnGoods.vue'
    ),
  },
  OC_B_REFUND_ORDER: {
    component: () => import(
      /* webpackChunkName: 'OrderCenterPage' */
      'allpages/orderCenter/returngood/returnGoods.vue'
    ),
  },
  ORDERDETAIL2: {
    component: () => import(
      /* webpackChunkName: 'OrderCenterPage' */
      'allpages/orderCenter/orderManageDetail/orderDetail/halfOrderDetail.vue'
    )
  }
};
