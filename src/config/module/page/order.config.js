import scanIn from 'allpages/OrdersCenter/scanIn/scanIn.vue';
import orderManager from 'allpages/OrdersCenter/orderManager/orderManager.vue'; // 零售发货单
// 零售发货单-新增
import orderManageAdd from 'allpages/OrdersCenter/orderManageAdd/orderManageAdd';
import orderManageDetail from 'allpages/OrdersCenter/orderManageDetail/orderManageDetail.vue'; // 零售发货单-详情
import returnGoodManagementList from 'allpages/OrdersCenter/returngood/returngoodmanagementList.vue'; // 订单中心-退换货单
import returnGood from 'allpages/OrdersCenter/returngood/returngoodmanagement.vue'; // 订单中心-退换货单详情
import returnStorageList from 'allpages/OrdersCenter/returngood/returnStoreage/returnStoreageList.vue'; // 退货入库-列表
import returnTreasuryAdd from 'allpages/OrdersCenter/returngood/returnStoreage/returnTreasuryAdd.vue'; // 退货入库-新增 退货入库-新增
import refundAfterShipment from 'allpages/OrdersCenter/returngood/refundAfterShipment.vue';
// 订单中心-已发货退款单-编辑 额外退款
export default {
  // 订单中心-扫描入库
  SCANIN: {
    component: scanIn,
  },
  // 订单中心-列表
  ORDERMANAGER: {
    component: orderManager,
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
  }
};
