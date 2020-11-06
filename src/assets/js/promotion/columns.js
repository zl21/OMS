let tablecols = {
  infoColumns: [
    {
      slot: "ECODE",
      key: "ECODE",
      title: "SKU编码"
    },
    {
      key: "ENAME",
      title: "商品名称"
    },
    {
      key: "OPERATE",
      title: "操作",
      fun: ""
    }
  ],
  infoColumnsxt: [
    {
      slot: "ECODE",
      key: "ECODE",
      title: "商品编码"
    },
    {
      key: "ENAME",
      title: "商品名称"
    },
    {
      key: "OPERATE",
      title: "操作",
      fun: ""
    }
  ],
  infoColumnspt: [
    {
      slot: "ECODE",
      key: "ECODE",
      title: "商品数据编号"
    },
    {
      key: "ENAME",
      title: "商品标题"
    },
    {
      key: "OPERATE",
      title: "操作",
      fun: ""
    }
  ],
  giftAllColumns: [
    {
      slot: "ECODE",
      key: "ECODE",
      title: "SKU编码"
    },
    {
      key: "ENAME",
      title: "商品名称"
    },
    {
      key: "NUM",
      title: "每次赠送数量",
    },
    {
      key: "SUM",
      title: "赠送总计数量",
    },
    {
      key: "SUM_QTY",
      title: "剩余可送",
    },
    {
      key: "SEND_QTY",
      title: "已送数量"
    },
    {
      key: "OPERATE",
      title: "操作",
      fun: ""
    }
  ],
  giftNoSumColumns: [
    {
      slot: "ECODE",
      key: "ECODE",
      title: "SKU编码"
    },
    {
      key: "ENAME",
      title: "商品名称"
    },
    {
      key: "NUM",
      title: "每次赠送数量",
    },
    // {
    //     key: "SUM",
    //     title: "赠送总计数量",
    // },
    // {
    //     key: "SUM_QTY",
    //     title: "剩余可送",
    // },
    {
      key: "SEND_QTY",
      title: "已送数量"
    },
    {
      key: "OPERATE",
      title: "操作",
      fun: ""
    }
  ],
  giftInCreaseColumns: [
    {
      slot: "ECODE",
      key: "ECODE",
      title: "SKU编码"
    },
    {
      key: "ENAME",
      title: "商品名称"
    },
    {
      key: "NUM",
      title: "每次赠送数量",
    },
    {
      key: "SUM",
      title: "赠送总计数量",
    },
    {
      key: "SUM_QTY",
      title: "剩余可送",
    },
    {
      key: "SEND_QTY",
      title: "已送数量"
    },
    {
      key: "ORDER",
      title: "顺序号",
    },
    {
      key: "OPERATE",
      title: "操作",
      fun: ""
    }
  ],
  giftInCreaseNoSUMColumns: [
    {
      slot: "ECODE",
      key: "ECODE",
      title: "SKU编码"
    },
    {
      key: "ENAME",
      title: "商品名称"
    },
    {
      key: "NUM",
      title: "每次赠送数量",
    },
    // {
    //     key: "SUM",
    //     title: "赠送总计数量",
    // },
    // {
    //     key: "SUM_QTY",
    //     title: "剩余可送",
    // },
    {
      key: "SEND_QTY",
      title: "已送数量"
    },
    {
      key: "ORDER",
      title: "顺序号",
    },
    {
      key: "OPERATE",
      title: "操作",
      fun: ""
    }
  ],
  productsColumns: [//批量新增商品列表
    {
      slot: "ECODE",
      key: "ECODE",
      title: "SKU编码"
    },
    {
      key: "ENAME",
      title: "商品名称"
    },
    {
      slot: "NUM",
      key: "NUM",
      title: "数量"
    },
    {
      slot: "OPERATE",
      key: "OPERATE",
      title: "操作",
      fun: ""
    }
  ],
  productsColumnsxt: [//批量新增商品列表
    {
      slot: "ECODE",
      key: "ECODE",
      title: "商品编码"
    },
    {
      key: "ENAME",
      title: "商品名称"
    },
    {
      slot: "NUM",
      key: "NUM",
      title: "数量"
    },
    {
      slot: "OPERATE",
      key: "OPERATE",
      title: "操作",
      fun: ""
    }
  ],
  productsColumnspt: [//批量新增商品列表
    {
      slot: "ECODE",
      key: "ECODE",
      title: "商品数据编号"
    },
    {
      key: "ENAME",
      title: "商品标题"
    },
    {
      slot: "NUM",
      key: "NUM",
      title: "数量"
    },
    {
      slot: "OPERATE",
      key: "OPERATE",
      title: "操作",
      fun: ""
    }
  ],
  giftColumns: [//批量新增赠品列表
    {
      slot: "ECODE",
      key: "ECODE",
      title: "SKU编码"
    },
    {
      key: "ENAME",
      title: "商品名称"
    },
    {
      slot: "NUM",
      key: "NUM",
      title: "每次赠送数量",
    },
    {
      slot: "SUM",
      key: "SUM",
      title: "赠送总计数量",
    },
    {
      key: "SUM_QTY",
      title: "剩余可送",
    },
    {
      key: "SEND_QTY",
      title: "已送数量"
    },
    {
      slot: "OPERATE",
      key: "OPERATE",
      title: "操作",
      fun: ""
    }
  ],
  products_columns: [//模拟仿真商品列表
    {
      align: 'center',
      slot: "ECODE",
      key: "ECODE",
      title: "SKU编码"
    },
    {
      align: 'center',
      key: "PRO_ECODE",
      title: "商品编码"
    },
    {
      align: 'center',
      key: "ENAME",
      title: "商品名称"
    },
    {
      align: 'center',
      key: "SG_PRO_ID",
      title: "平台款号ID"
    },
    {
      align: 'center',
      key: "SKU_ID",
      title: "平台条码ID"
    },
    {
      align: 'center',
      key: "NUM",
      title: "数量"
    },
    {
      align: 'center',
      key: "SUM",
      title: "成交单价"
    },
    {
      align: 'center',
      key: "ALLSUM",
      title: "成交金额"
    },
    {
      align: 'center',
      key: "OPERATE",
      title: "操作",
      fun: ""
    }
  ],
  result_columns: [//模拟仿真试算列表
    {
      key: "actiName",
      title: "促销名称"
    },
    {
      key: "ECODE",
      title: "赠品商品编码"
    },
    {
      key: "ENAME",
      title: "赠送商品名称"
    },
    {
      key: "NUM",
      title: "数量"
    }
  ],
  set_commodity: [
    {
      // slot: "ECODE",
      key: "ECODE",
      title: "SKU编码",
      hideSku: true
    },
    {
      key: "ENAME",
      title: "商品名称"
    },
    {
      slot: "SUM",
      key: "SUM",
      title: "赠送总计数量",
    },
    {
      key: "SUM_QTY",
      title: "剩余可送",
    }
  ]

}

export default tablecols;