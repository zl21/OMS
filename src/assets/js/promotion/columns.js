let tablecols = {
  infoColumns: [{
      slot: "ECODE",
      key: "ECODE",
      // title: "SKU编码"
      // title: vmI18n.t('table_label.code_SKU'),
    },
    {
      key: "ENAME",
      title: "商品名称"
      // title: vmI18n.t('table_label.productName'),
    },
    {
      key: "OPERATE",
      // title: "操作",
      // title: vmI18n.t('table_label.operation'),
      fun: ""
    }
  ],
  infoColumnsxt: [{
      slot: "ECODE",
      key: "ECODE",
      title: "商品编码"
      // title: vmI18n.t('table_label.productNo'),
    },
    {
      key: "ENAME",
      title: "商品名称"
      // title: vmI18n.t('table_label.productName'),
    },
    {
      key: "OPERATE",
      title: "操作",
      // title: vmI18n.t('table_label.operation'),
      fun: ""
    }
  ],
  infoColumnspt: [{
      slot: "ECODE",
      key: "ECODE",
      title: "商品数据编号"
      // title: vmI18n.t('table_label.commodityDataNo'),
    },
    {
      key: "ENAME",
      title: "商品标题"
      // title: vmI18n.t('table_label.product_title'),
    },
    {
      key: "OPERATE",
      title: "操作",
      // title: vmI18n.t('table_label.operation'),
      fun: ""
    }
  ],
  giftAllColumns: [{
      slot: "ECODE",
      key: "ECODE",
      title: "SKU编码"
      // title: vmI18n.t('table_label.code_SKU'),
    },
    {
      key: "ENAME",
      title: "商品名称"
      // title: vmI18n.t('table_label.productName'),
    },
    {
      key: "NUM",
      title: "每次赠送数量",
      // title: vmI18n.t('table_label.per_given_quantit'),
    },
    {
      key: "SUM",
      title: "赠送总计数量",
      // title: vmI18n.t('table_label.given_total_quantit'),
    },
    {
      key: "SUM_QTY",
      title: "剩余可送",
      // title: vmI18n.t('table_label.rest_sent'),
    },
    {
      key: "SEND_QTY",
      title: "已送数量"
      // title: vmI18n.t('table_label.delivered_quantity'),
    },
    {
      key: "OPERATE",
      title: "操作",
      // title: vmI18n.t('table_label.operation'),
      fun: ""
    }
  ],
  giftInCreaseColumns: [{
      slot: "ECODE",
      key: "ECODE",
      title: "SKU编码"
      // title: vmI18n.t('table_label.code_SKU'),
    },
    {
      key: "ENAME",
      title: "商品名称"
      // title: vmI18n.t('table_label.productName'),
    },
    {
      key: "NUM",
      title: "每次赠送数量",
      // title: vmI18n.t('table_label.per_given_quantit'),
    },
    {
      key: "SUM",
      title: "赠送总计数量",
      // title: vmI18n.t('table_label.given_total_quantit'),
    },
    {
      key: "SUM_QTY",
      title: "剩余可送",
      // title: vmI18n.t('table_label.rest_sent'),
    },
    {
      key: "SEND_QTY",
      title: "已送数量"
      // title: vmI18n.t('table_label.delivered_quantity'),
    },
    {
      key: "ORDER",
      title: "顺序号",
      // title: vmI18n.t('table_label.aequenceNo'),
    },
    {
      key: "OPERATE",
      title: "操作",
      // title: vmI18n.t('table_label.operation'),
      fun: ""
    }
  ],
  productsColumns: [ //批量新增商品列表
    {
      slot: "ECODE",
      key: "ECODE",
      title: "SKU编码"
      // title: vmI18n.t('table_label.code_SKU'),
    },
    {
      key: "ENAME",
      title: "商品名称"
      // title: vmI18n.t('table_label.productName'),
    },
    {
      slot: "NUM",
      key: "NUM",
      title: "数量"
      // title: vmI18n.t('table_label.quantities'),
    },
    {
      slot: "OPERATE",
      key: "OPERATE",
      title: "操作",
      // title: vmI18n.t('table_label.operation'),
      fun: ""
    }
  ],
  productsColumnsxt: [ //批量新增商品列表
    {
      slot: "ECODE",
      key: "ECODE",
      title: "商品编码"
      // title: vmI18n.t('table_label.productNo'),
    },
    {
      key: "ENAME",
      title: "商品名称"
      // title: vmI18n.t('table_label.productName'),
    },
    {
      slot: "NUM",
      key: "NUM",
      title: "数量"
      // title: vmI18n.t('table_label.quantities'),
    },
    {
      slot: "OPERATE",
      key: "OPERATE",
      title: "操作",
      // title: vmI18n.t('table_label.operation'),
      fun: ""
    }
  ],
  productsColumnspt: [ //批量新增商品列表
    {
      slot: "ECODE",
      key: "ECODE",
      title: "商品数据编号"
      // title: vmI18n.t('table_label.commodityDataNo'),
    },
    {
      key: "ENAME",
      title: "商品标题"
      // title: vmI18n.t('table_label.product_title'),
    },
    {
      slot: "NUM",
      key: "NUM",
      title: "数量"
      // title: vmI18n.t('table_label.quantities'),
    },
    {
      slot: "OPERATE",
      key: "OPERATE",
      title: "操作",
      // title: vmI18n.t('table_label.operation'),
      fun: ""
    }
  ],
  giftColumns: [ //批量新增赠品列表
    {
      slot: "ECODE",
      key: "ECODE",
      title: "SKU编码"
      // title: vmI18n.t('table_label.code_SKU'),
    },
    {
      key: "ENAME",
      title: "商品名称"
      // title: vmI18n.t('table_label.productName'),
    },
    {
      slot: "NUM",
      key: "NUM",
      title: "每次赠送数量",
      // title: vmI18n.t('table_label.per_given_quantit'),
    },
    {
      slot: "SUM",
      key: "SUM",
      title: "赠送总计数量",
      // title: vmI18n.t('table_label.given_total_quantit'),
    },
    {
      key: "SUM_QTY",
      title: "剩余可送",
      // title: vmI18n.t('table_label.rest_sent'),
    },
    {
      key: "SEND_QTY",
      title: "已送数量"
      // title: vmI18n.t('table_label.delivered_quantity'),
    },
    {
      slot: "OPERATE",
      key: "OPERATE",
      title: "操作",
      // title: vmI18n.t('table_label.operation'),
      fun: ""
    }
  ],
  products_columns: [ //模拟仿真商品列表
    {
      align: 'center',
      slot: "ECODE",
      key: "ECODE",
      title: "SKU编码"
      // title: vmI18n.t('table_label.code_SKU'),
    },
    {
      align: 'center',
      key: "PRO_ECODE",
      title: "商品编码"
      // title: vmI18n.t('table_label.productNo'),
    },
    {
      align: 'center',
      key: "ENAME",
      title: "商品名称"
      // title: vmI18n.t('table_label.productName'),
    },
    {
      align: 'center',
      key: "SG_PRO_ID",
      title: "平台款号ID"
      // title: vmI18n.t('table_label.platform_model_ID'),
    },
    {
      align: 'center',
      key: "SKU_ID",
      title: "平台条码ID"
      // title: vmI18n.t('table_label.platform_barcode_ID'),
    },
    {
      align: 'center',
      key: "NUM",
      title: "数量"
      // title: vmI18n.t('table_label.quantities'),
    },
    {
      align: 'center',
      key: "SUM",
      title: "成交单价"
      // title: vmI18n.t('table_label.unitPrice'),
    },
    {
      align: 'center',
      key: "ALLSUM",
      title: "成交金额"
      // title: vmI18n.t('table_label.transactionAmount'),
    },
    {
      align: 'center',
      key: "OPERATE",
      title: "操作",
      // title: vmI18n.t('table_label.operation'),
      fun: ""
    }
  ],
  result_columns: [ //模拟仿真试算列表
    {
      key: "actiName",
      title: "促销名称"
      // title: vmI18n.t('table_label.promotionName'),
    },
    {
      key: "ECODE",
      title: "赠品商品编码"
      // title: vmI18n.t('table_label.giftItemCode'),
    },
    {
      key: "ENAME",
      title: "赠送商品名称"
      // title: vmI18n.t('table_label.giftItemName'),
    },
    {
      key: "NUM",
      title: "数量"
      // title: vmI18n.t('table_label.quantities'),
    }
  ],

}

export default tablecols;
