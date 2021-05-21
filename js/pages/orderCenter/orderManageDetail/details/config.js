
const searchdata = {
  column_include_uicontroller: true,
  range: 10,
  fixedcolumns: {},
  startindex: 0
}

export const orderCenter = {
  OC_B_ORDER_PROMOTION: { // 优惠信息
    table: 'OC_B_ORDER_PROMOTION',
    objid: 97,
    refcolid: 168873,
    searchdata: {
      column_include_uicontroller: true,
      range: 10,
      orderby: [{ column: 'OC_B_ORDER_PROMOTION.ID', asc: true }],
      startindex: 0
    }
  },
  OC_B_RETURN_ORDER: { // 退货日志
    table: 'OC_B_RETURN_ORDER_LOG',
    objid: 2, // 表id
    refcolid: 171736,
    searchdata: {
      column_include_uicontroller: true,
      orderby: [{ column: 'OC_B_RETURN_ORDER_LOG.ID', asc: false }],
      range: 10,
      fixedcolumns: {},
      startindex: 0
    }
  },
  OC_B_REFUND_IN: { // 退货入库日志
    table: 'OC_B_REFUND_IN_LOG',
    objid: 11192, // 表id
    refcolid: 176192,
    searchdata: {
      column_include_uicontroller: true,
      orderby: [{ column: 'OC_B_REFUND_IN_LOG.ID', asc: false }],
      range: 10,
      fixedcolumns: {},
      startindex: 0
    }
  },
  OC_B_ORDER_PAYMENT: { // 支付信息
    table: 'OC_B_ORDER_PAYMENT',
    objid: 97,
    refcolid: 168874,
    searchdata: {
      column_include_uicontroller: true,
      range: 10,
      orderby: [{ column: 'OC_B_ORDER_PAYMENT.ID', asc: true }],
      startindex: 0
    }
  },
  OC_B_ORDER_DELIVERY: { // 发货信息
    table: 'OC_B_ORDER_DELIVERY',
    objid: 97,
    refcolid: 168912,
    searchdata: {
      column_include_uicontroller: true,
      range: 10,
      orderby: [{ column: 'OC_B_ORDER_DELIVERY.ID', asc: true }],
      startindex: 0
    }
  },
  OC_B_ORDER_LOG: { // 发货信息日志
    table: 'OC_B_ORDER_LOG',
    objid: 97,
    refcolid: 172890, // 关联表id
    searchdata: {
      column_include_uicontroller: true,
      range: 10,
      orderby: [{ column: 'OC_B_ORDER_LOG.ID', asc: false }],
      startindex: 0
    }
  },
  OC_B_ORDER_WMS_STATUS: { // 仓内状态
    table: 'OC_B_ORDER_WMS_STATUS',
    objid: 97,
    refcolid: 374206, // 关联表id
    searchdata: {
      column_include_uicontroller: true,
      range: 10,
      orderby: [{ column: 'OC_B_ORDER_WMS_STATUS.ID', asc: false }],
      startindex: 0
    }
  },
  OC_B_ORDER_ROUTE: { // 路由信息
    table: 'OC_B_ORDER_ROUTE',
    objid: 97,
    refcolid: 1700811304, // 关联表id
    searchdata: {
      column_include_uicontroller: true,
      range: 10,
      // "orderby": [{ "column": "OC_B_ORDER_ROUTE.ID", "asc": false }],
      startindex: 0
    }
  },
  OC_B_ORDER_ITEM: { // 訂單明細
    table: 'OC_B_ORDER_ITEM',
    objid: 97,
    refcolid: 169188, // 关联表id
    searchdata: {
      column_include_uicontroller: true,
      range: 10,
      orderby: [{ column: 'OC_B_ORDER_ITEM.ID', asc: true }],
      startindex: 0
    }
  },
  OC_B_JD_REFUND_IN: { // 京东退货入库日志
    table: 'OC_B_JD_REFUND_IN_LOG',
    objid: 11192, // 表id
    refcolid: 1700810384,
    searchdata: {
      column_include_uicontroller: true,
      orderby: [{ column: 'OC_B_JD_REFUND_IN_LOG.ID', asc: false }],
      range: 10,
      fixedcolumns: {},
      startindex: 0
    }
  },
};


// 云雀2.0
export const commodityCenter = {
  PS_C_ALTERNATE_SKU: { // 备用条码
    table: 'PS_C_ALTERNATE_SKU',
    refcolid: 165654,
    searchdata,
  },
  PS_C_CLASSIFY_LOG: { // 商品分类日志
    table: 'PS_C_CLASSIFY_LOG',
    refcolid: 179676,
    searchdata,
  },
  BS_EXTRA_ATTRIBUTE_DEF_LOG: { // 商品自定义属性日志
    table: 'BS_EXTRA_ATTRIBUTE_DEF_LOG',
    refcolid: 179704,
    searchdata,
  },
  PS_C_SKU_LOG: { // 商品sku日志
    table: 'PS_C_SKU_LOG',
    refcolid: 179760,
    searchdata,
  },
  PS_PRO_GROUP_LOG:{  //组合商品日志
    table: 'PS_PRO_GROUP_LOG',
    refcolid: 179732,
    searchdata
  },
  PS_C_PRO_LOG:{  //商品spu日志
    table: 'PS_C_PRO_LOG',
    refcolid: 179788,
    searchdata
  }
}

// 策略平台

export const strategyPlatform = {
  ST_HOLD_ORDER_STRATEGY_LOG: { // hold策略
    table: 'ST_HOLD_ORDER_STRATEGY_LOG',
    refcolid: 179448, //表-主键的字段ID
    searchdata,
  },
}

export const BILL_STATUS = {
  UNCONFIRMED: 1, // 未确认
  OUT_OF_STOCK: 2, // 缺货
  AUDITED: 3, // 已审核
  DISTRIBUTION: 4, // 配货中
  WAREHOUSE_DELIVERY: '', // 仓库发货
  PLATFORM_DELIVERY: 6, // 平台发货
  CANCELLED: '', // 已取消
  SYSTEM_INVALIDATION: '', // 系统作废
  ADVANCE_SALE: 9, // 预售
  SUBSTIIUTION: 10, // 代发
  LOGISTICS_DELIVERY: 11, // 物流已送达
  TRANSACTION_COMPLETED: 12, // 交易完成
  UNPAID: 13, // 未付款
  PAENDING_WMS: 21, // 待传WMS
  PAENDING_ALLOCATED: 50, // 待分配
  PRE_SALE_DELIVERY: 51, // 预售待发货
  ADVANCE_SHORTAGE: 52, // 预售缺货
};

export default {
  orderCenter,
  commodityCenter,
  strategyPlatform,
  BILL_STATUS
};
