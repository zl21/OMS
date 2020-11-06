const port = {
  stock: '/p/cs/stock/200000244070', // 获取库存在用的公共接口
  matrix: '/p/cs/matrix', // 获取颜色尺寸的公共接口
  judgePro: '/p/cs/judgePro', // 判断是商品编码还是条码
  DL_B_PUR_ORDER: {
    getBody: '/p/cs/getMatrixData', // 获取商品编码各个SKU数量（用于修改）
    amendBody: '/p/cs/objectSave', // 保存修改的商品编码各个SKU数量
    singleCode: '/p/cs/barcodeSave', // 单条码数量保存
    tableName: 'DL_B_PUR_ORDER_ITEM', // 子表表名
    queryObjSave: 'DL_B_PUR_ORDER_ITEM', // 左边列表保存字段名
    virtualName: 'DL_B_PUR_ORDER_ITEM_MATRIX', // 虚表表名
    hasMatch: false, // 是否有匹配矩阵
    matchData: {},
    isDeleteBtn: true, // 是否有删除明细按钮
    hasStock: false, // 不获取库存接口
    inputList: [{
      name: '数量',
      colname: 'QTY_BILL',
      defnum: 1
    }], // 配的数量字段名集合
    matrixInput: false, // 是否显示数量框
  }, // 采购订单
  DL_B_PUR_REQ: {
    getBody: '/p/cs/getMatrixData', // 获取商品编码各个SKU数量（用于修改）
    amendBody: '/p/cs/objectSave', // 保存修改的商品编码各个SKU数量
    singleCode: '/p/cs/barcodeSave', // 单条码数量保存
    tableName: 'DL_B_PUR_REQ_ITEM', // 子表表名
    queryObjSave: 'DL_B_PUR_REQ_ITEM', // 左边列表保存字段名
    virtualName: 'DL_B_PUR_REQ_ITEM_V', // 虚表表名
    hasMatch: false, // 是否有匹配矩阵
    matchData: {},
    isDeleteBtn: true, // 是否有删除明细按钮
    hasStock: false, // 不获取库存接口
    inputList: [{
      name: '数量',
      colname: 'QTY_BILL',
      defnum: 1
    }], // 配的数量字段名集合
    matrixInput: false, // 是否显示数量框
  }, // 采购需求
  DL_B_PUR_IN: {
    getBody: '/p/cs/getMatrixData', // 获取商品编码各个SKU数量（用于修改）
    amendBody: '/p/cs/objectSave', // 保存修改的商品编码各个SKU数量
    singleCode: '/p/cs/barcodeSave', // 单条码数量保存
    queryObjSave: 'PRICE_ACTUAL_LIST', // 左边列表保存字段名
    tableName: 'DL_B_PUR_IN_ITEM', // 子表表名
    virtualName: 'DL_B_PUR_IN_ITEM_MATRIX', // 虚表表名
    hasStock: true, // 获取库存接口
    matchData: {},
    hasMatch: false, // 是否有匹配矩阵
    isDeleteBtn: true, // 是否有删除明细按钮
    isStock: true, // 配置默认显示在库的还是可用的
    inputList: [{
      name: '数量',
      colname: 'QTY_BILL',
      defnum: 1
    }], // 配的数量字段名集合
    matrixInput: false, // 是否显示数量框
  }, // 采购入库
  DL_B_TRAN_OUT_POS: {
    getBody: '/p/cs/getMatrixData', // 获取商品编码各个SKU数量（用于修改）
    amendBody: '/p/cs/objectSave', // 保存修改的商品编码各个SKU数量
    singleCode: '/p/cs/barcodeSave', // 单条码数量保存
    tableName: 'DL_B_TRAN_OUT_V_ITEM_PRO_POS', // 子表表名
    queryObjSave: 'DL_B_TRAN_OUT_V_ITEM_PRO_POS', // 左边列表保存字段名
    virtualName: 'DL_B_TRAN_OUT_V_ITEM_PRO_POS', // 虚表表名
    special: 'DL_B_TRAN_OUT_V_ITEM_SKU', // 特殊情况
    secondTab: 'DL_B_TRAN_OUT_V_ITEM_SKU', // input为配置时单条码和矩阵的保存fixcolumn里面的表名key
    matchData: {
      data: [{
        label: '发货店仓',
        value: 'qty_stock_able',
        port: 1, // 表示第一个接口
      },
      {
        label: '收货店仓',
        value: 'qty_stock_able',
        port: 2, // 表示第二个接口
      },
      ],
    }, // 匹配的一些参数
    hasMatch: true, // 是否有匹配矩阵
    hasStock: true, // 获取库存接口
    isStock: false, // 配置默认显示在库的还是可用的
    isDeleteBtn: true, // 是否有删除明细按钮
    inputList: [{
      name: '数量',
      colname: 'QTY_BILL',
      defnum: 1
    }], // 配的数量字段名集合
    matrixInput: false, // 是否显示数量框
  }, // pos端调拨出库单
  DL_B_TRAN_OUT: {
    getBody: '/p/cs/getMatrixData', // 获取商品编码各个SKU数量（用于修改）
    amendBody: '/p/cs/objectSave', // 保存修改的商品编码各个SKU数量
    singleCode: '/p/cs/barcodeSave', // 单条码数量保存
    tableName: 'DL_B_TRAN_OUT_V_ITEM_PRO', // 子表表名
    queryObjSave: 'DL_B_TRAN_OUT_V_ITEM_PRO', // 左边列表保存字段名
    virtualName: 'DL_B_TRAN_OUT_V_ITEM_PRO', // 虚表表名
    special: 'DL_B_TRAN_OUT_V_ITEM_SKU', // 特殊情况
    secondTab: 'DL_B_TRAN_OUT_V_ITEM_SKU', // input为配置时单条码和矩阵的保存fixcolumn里面的表名key
    matchData: {
      data: [{
        label: '发货店仓',
        value: 'qty_stock_able',
        port: 1, // 表示第一个接口
      },
      {
        label: '收货店仓',
        value: 'qty_stock_able',
        port: 2, // 表示第二个接口
      },
      ],
    }, // 匹配的一些参数
    hasMatch: true, // 是否有匹配矩阵
    hasStock: true, // 获取库存接口
    hasReceiving: true, // 显示收货在库和可用
    isStock: false, // 配置默认显示在库的还是可用的
    isDeleteBtn: true, // 是否有删除明细按钮
    inputList: [{
      name: '数量',
      colname: 'QTY_BILL',
      defnum: 1
    }], // 配的数量字段名集合
    matrixInput: false, // 是否显示数量框
  }, // 调拨出库单(这个页面情况复杂)
  DL_B_TRAN_IN_CHANGE: {
    getBody: '/p/cs/getMatrixData', // 获取商品编码各个SKU数量（用于修改）
    amendBody: '/p/cs/objectSave', // 保存修改的商品编码各个SKU数量
    singleCode: '/p/cs/barcodeSave', // 单条码数量保存
    tableName: 'DL_B_TRAN_IN_V_ITEM_SKU_CHANGE', // 子表表名
    virtualName: 'DL_B_TRAN_IN_V_ITEM_SKU_CHANGE', // 虚表表名
    hasMatch: false, // 是否有匹配矩阵
    matchData: {},
    isDeleteBtn: false, // 是否有删除明细按钮
    hasStock: true, // 获取库存接口
    isStock: true, // 配置默认显示在库的还是可用的
    inputList: [{
      name: '数量',
      colname: 'QTY_BILL',
      defnum: 1
    }], // 配的数量字段名集合
    matrixInput: false, // 是否显示数量框
  }, // 调拨入库单改单
  DL_B_INV_ADJ: {
    getBody: '/p/cs/getMatrixData', // 获取商品编码各个SKU数量（用于修改）
    amendBody: '/p/cs/objectSave', // 保存修改的商品编码各个SKU数量
    singleCode: '/p/cs/barcodeSave', // 单条码数量保存
    tableName: 'DL_B_INV_ADJ_ITEM', // 子表表名
    queryObjSave: 'DL_B_INV_ADJ_ITEM', // 左边列表保存字段名
    virtualName: 'DL_B_INV_ADJ_ITEM_PRO', // 虚表表名
    matchData: {
      data: [{
        label: '在库库存',
        value: 'qty_stock', // 字段名
        port: 1, // 表示第一个接口
      },
      {
        label: '可用库存',
        value: 'qty_stock_able', // 字段名
        port: 1, // 表示第一个接口
      },
      ],
    }, // 匹配的一些参数
    hasMatch: true, // 是否有匹配矩阵
    isDeleteBtn: true, // 是否有删除明细按钮
    hasStock: true, // 获取库存接口
    isStock: true, // 配置默认显示在库的还是可用的
    inputList: [{
      name: '数量',
      colname: 'QTY_BILL',
      defnum: 1
    }], // 配的数量字段名集合
    matrixInput: false, // 是否显示数量框
  }, // 库存调整单
  DL_B_PFT_LOS: {
    getBody: '/p/cs/getMatrixData', // 获取商品编码各个SKU数量（用于修改）
    amendBody: '/p/cs/objectSave', // 保存修改的商品编码各个SKU数量
    singleCode: '/p/cs/barcodeSave', // 单条码数量保存
    tableName: 'DL_B_PFT_LOS_ITEM', // 子表表名
    queryObjSave: 'DL_B_PFT_LOS_ITEM', // 左边列表保存字段名
    virtualName: 'DL_B_PFT_LOSS_DETAIL', // 虚表表名
    hasMatch: false, // 是否有匹配矩阵
    isDeleteBtn: false, // 是否有删除明细按钮
    matchData: {},
    hasStock: false, // 获取库存接口
    inputList: [{
      name: '数量',
      colname: 'QTY_BILL',
      defnum: 1
    }], // 配的数量字段名集合
    matrixInput: false, // 是否显示数量框
  },
  /* 盈亏单 */
  DL_B_INV_ADJ_WORK_PICK: {
    getBody: '/p/cs/getMatrixData', // 获取商品编码各个SKU数量（用于修改）
    amendBody: '/p/cs/objectSave', // 保存修改的商品编码各个SKU数量
    singleCode: '/p/cs/barcodeSave', // 单条码数量保存
    tableName: 'DL_B_INV_ADJ_ITEM', // 子表表名
    queryObjSave: 'DL_B_INV_ADJ_ITEM', // 左边列表保存字段名
    virtualName: 'DL_B_INV_ADJ_ITEM_PRO', // 虚表表名
    hasMatch: false, // 是否有匹配矩阵
    isDeleteBtn: true, // 是否有删除明细按钮
    matchData: {},
    hasStock: true, // 获取库存接口
    isStock: true, // 配置默认显示在库的还是可用的
    inputList: [{
      name: '数量',
      colname: 'QTY_BILL',
      defnum: 1
    }], // 配的数量字段名集合
    matrixInput: false, // 是否显示数量框
  }, // 商品出库单
  DL_B_INV_ADJ_WORK_PICK_POS: {
    getBody: '/p/cs/getMatrixData', // 获取商品编码各个SKU数量（用于修改）
    amendBody: '/p/cs/objectSave', // 保存修改的商品编码各个SKU数量
    singleCode: '/p/cs/barcodeSave', // 单条码数量保存
    tableName: 'DL_B_INV_ADJ_ITEM', // 子表表名
    queryObjSave: 'DL_B_INV_ADJ_ITEM', // 左边列表保存字段名
    virtualName: 'DL_B_INV_ADJ_ITEM_PRO', // 虚表表名
    hasMatch: false, // 是否有匹配矩阵
    isDeleteBtn: false, // 是否有删除明细按钮
    matchData: {},
    hasStock: true, // 获取库存接口
    isStock: true, // 配置默认显示在库的还是可用的
    inputList: [{
      name: '数量',
      colname: 'QTY_BILL',
      defnum: 1
    }], // 配的数量字段名集合
    matrixInput: false, // 是否显示数量框
  }, // 门店工衣领用单
  DL_B_TRAN_OUT_CHANGE: {
    getBody: '/p/cs/getMatrixData', // 获取商品编码各个SKU数量（用于修改）
    amendBody: '/p/cs/objectSave', // 保存修改的商品编码各个SKU数量
    singleCode: '/p/cs/barcodeSave', // 单条码数量保存
    tableName: 'DL_B_TRAN_OUT_V_ITEM_SKU_CHANGE', // 子表表名
    queryObjSave: 'DL_B_TRAN_OUT_V_ITEM_SKU_CHANGE', // 左边列表保存字段名
    virtualName: 'DL_B_TRAN_OUT_V_ITEM_SKU_CHANGE', // 虚表表名
    hasMatch: false, // 是否有匹配矩阵
    matchData: {},
    isDeleteBtn: false, // 是否有删除明细按钮
    hasStock: true, // 获取库存接口
    isStock: true, // 配置默认显示在库的还是可用的
    inputList: [{
      name: '数量',
      colname: 'QTY_BILL',
      defnum: 1
    }], // 配的数量字段名集合
    matrixInput: false, // 是否显示数量框
  }, // 出库单改单
  DL_B_TRAN_BOX_CHANGE: {
    getBody: '/p/cs/getMatrixData', // 获取商品编码各个SKU数量（用于修改）
    amendBody: '/p/cs/objectSave', // 保存修改的商品编码各个SKU数量
    singleCode: '/p/cs/barcodeSave', // 单条码数量保存
    tableName: 'DL_B_TRAN_BOX_CHANGE', // 子表表名
    queryObjSave: 'DL_B_TRAN_BOX_CHANGE', // 左边列表保存字段名
    virtualName: 'DL_B_TRAN_OUT_V_ITEM_SKU_CHANGE', // 虚表表名
    hasMatch: false, // 是否有匹配矩阵
    matchData: {},
    isDeleteBtn: false, // 是否有删除明细按钮
    hasStock: true, // 获取库存接口
    isStock: true, // 配置默认显示在库的还是可用的
    inputList: [{
      name: '数量',
      colname: 'QTY_BILL',
      defnum: 1
    }], // 配的数量字段名集合
    matrixInput: false, // 是否显示数量框
  }, // 拣货装箱改单
  DL_B_PUR_RET: {
    getBody: '/p/cs/getMatrixData', // 获取商品编码各个SKU数量（用于修改）
    amendBody: '/p/cs/objectSave', // 保存修改的商品编码各个SKU数量
    singleCode: '/p/cs/barcodeSave', // 单条码数量保存
    tableName: 'DL_B_PUR_RET_ITEM', // 子表表名
    queryObjSave: 'DL_B_PUR_RET_ITEM', // 左边列表保存字段名
    virtualName: 'DL_B_PUR_RET_ITEM_MATRIX', // 虚表表名
    matchData: {
      data: [{
        label: '退货店仓可用',
        value: 'qty_stock_able',
        port: 1, // 表示第一个接口
      },
      {
        label: '退货店仓在库',
        value: 'qty_stock',
        port: 1, // 表示第一个接口
      },
      ],
    }, // 匹配的一些参数
    hasMatch: true, // 是否有匹配矩阵
    hasStock: true, // 获取库存接口
    isStock: false, // 配置默认显示在库的还是可用的
    isDeleteBtn: true, // 是否有删除明细按钮
    inputList: [{
      name: '数量',
      colname: 'QTY_BILL',
      defnum: 1
    }], // 配的数量字段名集合
    matrixInput: false, // 是否显示数量框
  }, // 采购退货
  DL_B_RETAIL: {
    getBody: '/p/cs/getMatrixData', // 获取商品编码各个SKU数量（用于修改）
    amendBody: '/p/cs/objectSave', // 保存修改的商品编码各个SKU数量
    singleCode: '/p/cs/barcodeSave', // 单条码数量保存
    tableName: 'DL_B_RETAIL_ITEM', // 子表表名
    queryObjSave: 'DL_B_RETAIL_ITEM', // 左边列表保存字段名
    virtualName: 'DL_B_PUR_REQ_ITEM_V', // 虚表表名
    isDeleteBtn: true, // 是否有删除明细按钮
    hasMatch: false, // 是否有匹配矩阵
    deletePort: 'p/cs/retailitemdel', // 删除明细接口
    matchData: {},
    hasStock: true, // 获取库存接口
    isStock: true, // 配置默认显示在库的还是可用的
    inputList: [{
      name: '数量',
      colname: 'QTY_BILL',
      defnum: 1
    }], // 配的数量字段名集合
    matrixInput: false, // 是否显示数量框
  }, // 零售单
  DL_B_PAND: {
    getBody: '/p/cs/getMatrixData', // 获取商品编码各个SKU数量（用于修改）
    amendBody: '/p/cs/objectSave', // 保存修改的商品编码各个SKU数量
    singleCode: '/p/cs/barcodeSave', // 单条码数量保存
    tableName: 'DL_B_PAND_ITEM', // 子表表名
    queryObjSave: 'DL_B_PAND_ITEM', // 左边列表保存字段名
    virtualName: 'DL_B_PAND_ITEM_PRO', // 实表表名
    hasMatch: true, // 是否有匹配矩阵
    matchData: {
      data: [{
        label: '在库库存',
        value: 'qty_stock', // 字段名
        port: 1, // 表示第一个接口
      },
      {
        label: '可用库存',
        value: 'qty_stock_able', // 字段名
        port: 1, // 表示第一个接口
      },
      ],
    },
    hasStock: true, // 获取库存接口
    isStock: true, // 配置默认显示在库的还是可用的
    isDeleteBtn: true, // 是否有删除明细按钮
    inputList: [{
      name: '数量',
      colname: 'QTY_BILL',
      defnum: 1
    }], // 配的数量字段名集合
    matrixInput: false, // 是否显示数量框
  }, // 盘点单
  DL_B_TRAN_PLAN: {
    getBody: '/p/cs/getMatrixData', // 获取商品编码各个SKU数量（用于修改）
    amendBody: '/p/cs/objectSave', // 保存修改的商品编码各个SKU数量
    singleCode: '/p/cs/barcodeSave', // 单条码数量保存
    tableName: 'DL_B_TRAN_PLAN_ITEM', // 子表表名
    queryObjSave: 'DL_B_TRAN_PLAN_ITEM', // 左边列表保存字段名
    virtualName: 'DL_B_TRAN_PLAN_V_ITEM', // 虚表表名
    isDeleteBtn: false, // 是否有删除明细按钮
    matchData: {},
    hasMatch: false, // 是否有匹配矩阵
    hasStock: true, // 不获取库存接口
    isStock: false, // 配置默认显示在库的还是可用的
    inputList: [{
      name: '数量',
      colname: 'QTY_EXEC_PLAN',
      defnum: 1
    }], // 配的数量字段名集合
    matrixInput: false, // 是否显示数量框
  }, // 调拨计划单新增
  DL_B_PUR_TMPIN: {
    getBody: '/p/cs/getMatrixData', // 获取商品编码各个SKU数量（用于修改）
    amendBody: '/p/cs/objectSave', // 保存修改的商品编码各个SKU数量
    singleCode: '/p/cs/barcodeSave', // 单条码数量保存
    tableName: 'DL_B_PUR_TMPIN_ITEM', // 子表表名
    queryObjSave: 'DL_B_PUR_TMPIN_ITEM', // 左边列表保存字段名
    virtualName: 'DL_B_PUR_TMPIN_ITEM_MATRIX', // 虚表表名
    isDeleteBtn: true, // 是否有删除明细按钮
    matchData: {},
    hasMatch: false, // 是否有匹配矩阵
    hasStock: true, // 获取库存接口
    isStock: true, // 配置默认显示在库的还是可用的
    inputList: [{
      name: '数量',
      colname: 'QTY_BILL',
      defnum: 1
    }], // 配的数量字段名集合
    matrixInput: false, // 是否显示数量框
  }, // 货品暂收
  OC_B_RETURN_ORDER: {
    getBody: '/p/cs/getMatrixData', // 获取商品编码各个SKU数量（用于修改）
    amendBody: '/p/cs/objectSave', // 保存修改的商品编码各个SKU数量
    singleCode: '/p/cs/barcodeSave', // 单条码数量保存
    tableName: 'OC_B_RETURN_ORDER_REFUND', // 子表表名
    queryObjSave: 'OC_B_RETURN_ORDER_REFUND', // 左边列表保存字段名
    virtualName: 'OC_B_RETURN_ORDER_REFUND', // 虚表表名
    isDeleteBtn: true, // 是否有删除明细按钮
    matchData: {},
    hasMatch: false, // 是否有匹配矩阵
    hasStock: true, // 获取库存接口
    isStock: true, // 配置默认显示在库的还是可用的
    inputList: [{
      name: '数量',
      colname: 'QTY_BILL',
      defnum: 1
    }], // 配的数量字段名集合
    matrixInput: false, // 是否显示数量框
  }, // 退换货订单
  OC_B_SALE: {
    getBody: '/p/cs/getMatrixData', // 获取商品编码各个SKU数量（用于修改）
    amendBody: '/p/cs/objectSave', // 保存修改的商品编码各个SKU数量
    singleCode: '/p/cs/barcodeSave', // 单条码数量保存
    tableName: 'OC_B_SALE_ITEM', // 子表表名
    queryObjSave: 'OC_B_SALE_ITEM', // 左边列表保存字段名
    virtualName: 'OC_B_SALE_ITEM_V', // 虚表表名
    isDeleteBtn: true, // 是否有删除明细按钮
    isUpdateDiscountBtn: false, // 是否有修改折扣按钮
    matchData: {},
    hasMatch: false, // 是否有匹配矩阵
    noZeroShwoFlag: true,
    hasStock: true, // 获取库存接口
    isStock: false, // 配置默认显示在库的还是可用的
    inputList: [{
      name: '数量',
      colname: 'QTY',
      defnum: 1
    }], // 配的数量字段名集合
    matrixInput: false, // 是否显示数量框
    hasReceiving: true,
    hasQtyPrein: true,
    hasRetail: true
  }, // 销售单
  OC_B_PURCHASE: {
    getBody: '/p/cs/getMatrixData', // 获取商品编码各个SKU数量（用于修改）
    amendBody: '/p/cs/objectSave', // 保存修改的商品编码各个SKU数量
    singleCode: '/p/cs/barcodeSave', // 单条码数量保存
    tableName: 'OC_B_PURCHASE_ITEM', // 子表表名
    queryObjSave: 'OC_B_PURCHASE_ITEM', // 左边列表保存字段名
    virtualName: 'OC_B_PURCHASE_ITEM_V', // 虚表表名
    isDeleteBtn: true, // 是否有删除明细按钮
    matchData: {},
    hasMatch: false, // 是否有匹配矩阵
    hasStock: true, // 获取库存接口
    isStock: true, // 配置默认显示在库的还是可用的
    inputList: [{
      name: '数量',
      colname: 'QTY',
      defnum: 1
    }], // 配的数量字段名集合
    matrixInput: false, // 是否显示数量框
    hasReceiving: false
  }, // 采购单
  SC_B_TRANSFER: {
    getBody: '/p/cs/getMatrixData', // 获取商品编码各个SKU数量（用于修改）
    amendBody: '/p/cs/objectSave', // 保存修改的商品编码各个SKU数量
    singleCode: '/p/cs/barcodeSave', // 单条码数量保存
    tableName: 'SC_B_TRANSFER_ITEM', // 子表表名
    queryObjSave: 'SC_B_TRANSFER_ITEM', // 左边列表保存字段名
    virtualName: 'SC_B_TRANSFER_ITEM_V', // 虚表表名
    isDeleteBtn: true, // 是否有删除明细按钮
    matchData: {},
    hasMatch: false, // 是否有匹配矩阵
    hasStock: true, // 获取库存接口
    noZeroShwoFlag: true, // 不展示0
    isStock: false, // 配置默认显示在库的还是可用的
    inputList: [{
      name: '数量',
      colname: 'QTY',
      defnum: 1
    }], // 配的数量字段名集合
    matrixInput: false, // 是否显示数量框
    hasReceiving: true,
    hasQtyPrein: true,
    hasRetail: true
  },
  V_SC_B_TRANSFER_BETWEEN: { // 仓间调拨
    getBody: '/p/cs/getMatrixData', // 获取商品编码各个SKU数量（用于修改）
    amendBody: '/p/cs/objectSave', // 保存修改的商品编码各个SKU数量
    singleCode: '/p/cs/barcodeSave', // 单条码数量保存
    tableName: 'V_SC_B_TRANSFER_BETWEEN_ITEM', // 子表表名
    queryObjSave: 'SC_B_TRANSFER_ITEM', // 左边列表保存字段名
    virtualName: 'V_SC_B_TRANSFER_ITEM_BETWEEN_V', // 虚表表名
    isDeleteBtn: true, // 是否有删除明细按钮
    matchData: {},
    hasMatch: false, // 是否有匹配矩阵
    hasStock: true, // 获取库存接口
    noZeroShwoFlag: true, // 不展示0
    isStock: false, // 配置默认显示在库的还是可用的
    inputList: [{
      name: '数量',
      colname: 'QTY',
      defnum: 1
    }], // 配的数量字段名集合
    matrixInput: false, // 是否显示数量框
    hasReceiving: true,
    hasQtyPrein: true,
    hasRetail: true
  },
  V_SC_B_TRANSFER_WITHIN: { // 仓内调拨
    getBody: '/p/cs/getMatrixData', // 获取商品编码各个SKU数量（用于修改）
    amendBody: '/p/cs/objectSave', // 保存修改的商品编码各个SKU数量
    singleCode: '/p/cs/barcodeSave', // 单条码数量保存
    tableName: 'V_SC_B_TRANSFER_WITHIN_ITEM', // 子表表名
    queryObjSave: 'SC_B_TRANSFER_ITEM', // 左边列表保存字段名
    virtualName: 'V_SC_B_TRANSFER_ITEM_WITHIN_V', // 虚表表名
    isDeleteBtn: true, // 是否有删除明细按钮
    matchData: {},
    hasMatch: false, // 是否有匹配矩阵
    hasStock: true, // 获取库存接口
    noZeroShwoFlag: true, // 不展示0
    isStock: false, // 配置默认显示在库的还是可用的
    inputList: [{
      name: '数量',
      colname: 'QTY',
      defnum: 1
    }], // 配的数量字段名集合
    matrixInput: false, // 是否显示数量框
    hasReceiving: true,
    hasQtyPrein: true,
    hasRetail: true
  },
  OC_B_ORDER: {
    getBody: '/p/cs/getMatrixData', // 获取商品编码各个SKU数量（用于修改）
    amendBody: '/p/cs/objectSave', // 保存修改的商品编码各个SKU数量
    singleCode: '/p/cs/barcodeSave', // 单条码数量保存
    tableName: 'OC_B_ORDER_ITEM', // 子表表名
    queryObjSave: 'OC_B_ORDER_ITEM', // 左边列表保存字段名
    virtualName: 'OC_B_ORDER_ITEM_V', // 虚表表名
    isDeleteBtn: true, // 是否有删除明细按钮
    matchData: {},
    hasMatch: false, // 是否有匹配矩阵
    hasStock: false, // 获取库存接口
    isStock: true, // 配置默认显示在库的还是可用的
    inputList: [{
      name: '数量',
      colname: 'QTY',
      defnum: 1
    }], // 配的数量字段名集合
    matrixInput: false, // 是否显示数量框
    hasReceiving: false
  },
  SC_B_OUT: {
    getBody: '/p/cs/getMatrixData', // 获取商品编码各个SKU数量（用于修改）
    amendBody: '/p/cs/objectSave', // 保存修改的商品编码各个SKU数量
    singleCode: '/p/cs/barcodeSave', // 单条码数量保存
    tableName: 'SC_B_OUT_ITEM', // 子表表名
    queryObjSave: 'SC_B_OUT_ITEM', // 左边列表保存字段名
    virtualName: 'SC_B_OUT_ITEM_V', // 虚表表名
    isDeleteBtn: true, // 是否有删除明细按钮
    matchData: {},
    hasMatch: false, // 是否有匹配矩阵
    hasStock: true, // 获取库存接口
    isStock: true, // 配置默认显示在库的还是可用的
    inputList: [{
      name: '数量',
      colname: 'QTY',
      defnum: 1
    }], // 配的数量字段名集合
    matrixInput: false, // 是否显示数量框
    hasReceiving: false
  }, // 出库单
  OC_B_SEND_OUT: {
    getBody: '/p/cs/getMatrixData', // 获取商品编码各个SKU数量（用于修改）
    amendBody: '/p/cs/objectSave', // 保存修改的商品编码各个SKU数量
    singleCode: '/p/cs/barcodeSave', // 单条码数量保存
    tableName: 'OC_B_SEND_OUT_ITEM', // 子表表名
    queryObjSave: 'OC_B_SEND_OUT_ITEM', // 左边列表保存字段名
    virtualName: 'OC_B_SEND_OUT_ITEM_V', // 虚表表名
    isDeleteBtn: true, // 是否有删除明细按钮
    matchData: {},
    hasMatch: false, // 是否有匹配矩阵
    hasStock: true, // 获取库存接口
    isStock: true, // 配置默认显示在库的还是可用的
    inputList: [{
      name: '数量',
      colname: 'QTY',
      defnum: 1
    }], // 配的数量字段名集合
    matrixInput: false, // 是否显示数量框
    hasReceiving: false
  }, // 发货订单

  OC_B_REFUND_SALE: {
    getBody: '/p/cs/getMatrixData', // 获取商品编码各个SKU数量（用于修改）
    amendBody: '/p/cs/objectSave', // 保存修改的商品编码各个SKU数量
    singleCode: '/p/cs/barcodeSave', // 单条码数量保存
    tableName: 'OC_B_REFUND_SALE_ITEM', // 子表表名
    queryObjSave: 'OC_B_REFUND_SALE_ITEM', // 左边列表保存字段名
    virtualName: 'OC_B_REFUND_SALE_ITEM_V', // 虚表表名
    isDeleteBtn: true, // 是否有删除明细按钮
    isUpdateDiscountBtn: false, // 是否有修改折扣明细按钮
    matchData: {},
    hasMatch: false, // 是否有匹配矩阵
    hasStock: true, // 获取库存接口
    isStock: true, // 配置默认显示在库的还是可用的
    inputList: [{
      name: '数量',
      colname: 'QTY',
      defnum: 1
    }], // 配的数量字段名集合
    matrixInput: false, // 是否显示数量框
    hasReceiving: false
  },
  OC_B_REFUND_PURCHASE: {
    getBody: '/p/cs/getMatrixData', // 获取商品编码各个SKU数量（用于修改）
    amendBody: '/p/cs/objectSave', // 保存修改的商品编码各个SKU数量
    singleCode: '/p/cs/barcodeSave', // 单条码数量保存
    tableName: 'OC_B_REFUND_PURCHASE_ITEM', // 子表表名
    queryObjSave: 'OC_B_REFUND_PURCHASE_ITEM', // 左边列表保存字段名
    virtualName: 'OC_B_REFUND_PURCHASE_ITEM_V', // 虚表表名
    isDeleteBtn: true, // 是否有删除明细按钮
    matchData: {},
    hasMatch: false, // 是否有匹配矩阵
    hasStock: true, // 获取库存接口
    isStock: true, // 配置默认显示在库的还是可用的
    inputList: [{
      name: '数量',
      colname: 'QTY',
      defnum: 1
    }], // 配的数量字段名集合
    matrixInput: false, // 是否显示数量框
    hasReceiving: false
  }, // 采购退货单

  SC_B_INVENTORY: {
    getBody: '/p/cs/getMatrixData', // 获取商品编码各个SKU数量（用于修改）
    amendBody: '/p/cs/objectSave', // 保存修改的商品编码各个SKU数量
    singleCode: '/p/cs/barcodeSave', // 单条码数量保存
    tableName: 'SC_B_INVENTORY_ITEM', // 子表表名
    queryObjSave: 'SC_B_INVENTORY_ITEM', // 左边列表保存字段名
    virtualName: 'SC_B_INVENTORY_ITEM_V', // 虚表表名
    isDeleteBtn: true, // 是否有删除明细按钮
    matchData: {},
    hasMatch: false, // 是否有匹配矩阵
    hasStock: true, // 获取库存接口
    isStock: true, // 配置默认显示在库的还是可用的
    inputList: [{
      name: '数量',
      colname: 'QTY',
      defnum: 1
    }], // 配的数量字段名集合
    matrixInput: false, // 是否显示数量框
    hasReceiving: false
  }, // 盘点单


  SC_B_STORAGE_ADJUST: {
    getBody: '/p/cs/getMatrixData', // 获取商品编码各个SKU数量（用于修改）
    amendBody: '/p/cs/objectSave', // 保存修改的商品编码各个SKU数量
    singleCode: '/p/cs/barcodeSave', // 单条码数量保存
    tableName: 'SC_B_STORAGE_ADJUST_ITEM', // 子表表名
    queryObjSave: 'SC_B_STORAGE_ADJUST_ITEM', // 左边列表保存字段名
    virtualName: 'SC_B_STORAGE_ADJUST_ITEM_V', // 虚表表名
    isDeleteBtn: true, // 是否有删除明细按钮
    matchData: {},
    hasMatch: false, // 是否有匹配矩阵
    hasStock: true, // 获取库存接口
    isStock: true, // 配置默认显示在库的还是可用的
    inputList: [{
      name: '数量',
      colname: 'QTY',
      defnum: 1
    }], // 配的数量字段名集合
    matrixInput: false, // 是否显示数量框
    hasReceiving: false
  }, // 库存调整单
  SG_B_PHY_ADJUST: {
    getBody: '/p/cs/getMatrixData', // 获取商品编码各个SKU数量（用于修改）
    amendBody: '/p/cs/objectSave', // 保存修改的商品编码各个SKU数量
    singleCode: '/p/cs/barcodeSave', // 单条码数量保存
    tableName: 'SG_B_PHY_ADJUST_ITEM', // 子表表名
    queryObjSave: 'SG_B_PHY_ADJUST_ITEM', // 左边列表保存字段名
    virtualName: 'SG_B_PHY_ADJUST_ITEM_V', // 虚表表名
    isDeleteBtn: true, // 是否有删除明细按钮
    matchData: {},
    hasMatch: false, // 是否有匹配矩阵
    hasStock: true, // 获取库存接口
    isStock: true, // 配置默认显示在库的还是可用的
    inputList: [{
      name: '数量',
      colname: 'QTY',
      defnum: 1
    }], // 配的数量字段名集合
    matrixInput: false, // 是否显示数量框
    hasReceiving: false
  }, // 库存调整单

  OC_B_PURCHASE_ORDER: {
    getBody: '/p/cs/getMatrixData', // 获取商品编码各个SKU数量（用于修改）
    amendBody: '/p/cs/objectSave', // 保存修改的商品编码各个SKU数量
    singleCode: '/p/cs/barcodeSave', // 单条码数量保存
    tableName: 'OC_B_PURCHASE_ORDER_ITEM', // 子表表名
    queryObjSave: 'OC_B_PURCHASE_ORDER_ITEM', // 左边列表保存字段名
    virtualName: 'OC_B_PURCHASE_ORDER_ITEM_V', // 虚表表名
    isDeleteBtn: true, // 是否有删除明细按钮
    matchData: {},
    hasMatch: false, // 是否有匹配矩阵
    hasStock: true, // 获取库存接口
    isStock: true, // 配置默认显示在库的还是可用的
    inputList: [{
      name: '数量',
      colname: 'QTY',
      defnum: 1
    }], // 配的数量字段名集合
    matrixInput: false, // 是否显示数量框
    hasReceiving: false
  }, // 采购订单商品明细
  SG_B_PHY_IN_NOTICES_POS: {
    getBody: '/p/cs/posGetMatrixData', // 获取商品编码各个SKU数量（用于修改）
    amendBody: '/p/cs/objectSave', // 保存修改的商品编码各个SKU数量
    singleCode: '/p/cs/barcodeSave', // 单条码数量保存
    tableName: 'SG_B_PHY_IN_NOTICES_POS_ITEM', // 子表表名
    queryObjSave: 'SG_B_PHY_IN_NOTICES_POS_ITEM', // 左边列表保存字段名
    virtualName: 'SG_B_PHY_IN_NOTICES_POS_ITEM_V', // 虚表表名
    isDeleteBtn: false, // 是否有删除明细按钮
    matchData: {},
    hasMatch: false, // 是否有匹配矩阵
    hasStock: true, // 获取库存接口
    isStock: true, // 配置默认显示在库的还是可用的
    inputList: [{
      name: '数量',
      colname: 'QTY',
      defnum: 1
    }], // 配的数量字段名集合
    matrixInput: false, // 是否显示数量框
    hasReceiving: false
  }, // POS入库单
  POS_SC_B_TRANSFER: {
    getBody: '/p/cs/posGetMatrixData', // 获取商品编码各个SKU数量（用于修改）
    amendBody: '/p/cs/objectSave', // 保存修改的商品编码各个SKU数量
    singleCode: '/p/cs/barcodeSave', // 单条码数量保存
    tableName: 'POS_SC_B_TRANSFER_ITEM', // 子表表名
    queryObjSave: 'POS_SC_B_TRANSFER_ITEM', // 左边列表保存字段名
    virtualName: 'POS_SC_B_TRANSFER_ITEM_V', // 虚表表名
    isDeleteBtn: true, // 是否有删除明细按钮
    matchData: {},
    hasMatch: false, // 是否有匹配矩阵
    hasStock: true, // 获取库存接口
    isStock: true, // 配置默认显示在库的还是可用的
    inputList: [{
      name: '数量',
      colname: 'QTY',
      defnum: 1
    }], // 配的数量字段名集合
    matrixInput: false, // 是否显示数量框
    hasReceiving: false
  }, // POS出库单
  SG_B_PHY_OUT_NOTICES_POS: {
    getBody: '/p/cs/posGetMatrixData', // 获取商品编码各个SKU数量（用于修改）
    amendBody: '/p/cs/objectSave', // 保存修改的商品编码各个SKU数量
    singleCode: '/p/cs/barcodeSave', // 单条码数量保存
    tableName: 'SG_B_PHY_OUT_NOTICES_POS_ITEM', // 子表表名
    queryObjSave: 'SG_B_PHY_OUT_NOTICES_POS_ITEM', // 左边列表保存字段名
    virtualName: 'SG_B_PHY_OUT_NOTICES_POS_ITEM', // 虚表表名
    isDeleteBtn: true, // 是否有删除明细按钮
    matchData: {},
    hasMatch: false, // 是否有匹配矩阵
    hasStock: true, // 获取库存接口
    isStock: true, // 配置默认显示在库的还是可用的
    inputList: [{
      name: '数量',
      colname: 'QTY',
      defnum: 1
    }], // 配的数量字段名集合
    matrixInput: false, // 是否显示数量框
    hasReceiving: false
  }, // 全渠道发货单
  OC_B_MULTI_STORE_DISTRIBUTION: {
    getBody: '/p/cs/oc/v1/sale/matrix', // 获取商品编码各个SKU数量（用于修改）
    amendBody: '/p/cs/objectSave', // 保存修改的商品编码各个SKU数量
    tableName: 'OC_B_MULTI_STORE_DISTRIBUTION_ITEM', // 子表表名
    queryObjSave: 'OC_B_MULTI_STORE_DISTRIBUTION_ITEM',
  }, // 多店配货获取矩阵
  SG_B_PHY_OUT_NOTICES_ALL_PICK: {
    getBody: '/p/cs/posGetMatrixData', // 获取商品编码各个SKU数量（用于修改）
    amendBody: '/p/cs/objectSave', // 保存修改的商品编码各个SKU数量
    singleCode: '/p/cs/barcodeSave', // 单条码数量保存
    tableName: 'SG_B_PHY_OUT_NOTICES_ALL_PICK_ITEM', // 子表表名
    queryObjSave: 'SG_B_PHY_OUT_NOTICES_ALL_PICK_ITEM', // 左边列表保存字段名
    virtualName: 'SG_B_PHY_OUT_NOTICES_ALL_PICK_ITEM', // 虚表表名
    isDeleteBtn: true, // 是否有删除明细按钮
    matchData: {},
    hasMatch: false, // 是否有匹配矩阵
    hasStock: true, // 获取库存接口
    isStock: true, // 配置默认显示在库的还是可用的
    inputList: [{
      name: '数量',
      colname: 'QTY',
      defnum: 1
    }], // 配的数量字段名集合
    matrixInput: false, // 是否显示数量框
    hasReceiving: false
  }, // 全渠道自提单
  OC_B_DIRECT: {
    getBody: '/p/cs/getMatrixData', // 获取商品编码各个SKU数量（用于修改）
    amendBody: '/p/cs/objectSave', // 保存修改的商品编码各个SKU数量
    singleCode: '/p/cs/barcodeSave', // 单条码数量保存
    tableName: 'OC_B_DIRECT_ITEM', // 子表表名
    queryObjSave: 'OC_B_DIRECT_ITEM', // 左边列表保存字段名
    virtualName: 'OC_B_DIRECT_ITEM', // 虚表表名
    isDeleteBtn: true, // 是否有删除明细按钮
    matchData: {},
    hasMatch: false, // 是否有匹配矩阵
    hasStock: true, // 获取库存接口
    isStock: true, // 配置默认显示在库的还是可用的
    inputList: [{
      name: '数量',
      colname: 'QTY',
      defnum: 1
    }], // 配的数量字段名集合
    matrixInput: false, // 是否显示数量框
    hasReceiving: false
  }, // 直发单
  SC_B_TRANSFER_ENQUIRY: { // 要货调拨单
    getBody: '/p/cs/getMatrixData', // 获取商品编码各个SKU数量（用于修改）
    amendBody: '/p/cs/objectSave', // 保存修改的商品编码各个SKU数量
    singleCode: '/p/cs/barcodeSave', // 单条码数量保存
    tableName: 'SC_B_TRANSFER_ENQUIRY_ITEM', // 子表表名
    queryObjSave: 'SC_B_TRANSFER_ENQUIRY_ITEM', // 左边列表保存字段名
    virtualName: 'SC_B_TRANSFER_ENQUIRY_ITEM', // 虚表表名
    isDeleteBtn: true, // 是否有删除明细按钮
    matchData: {},
    hasMatch: false, // 是否有匹配矩阵
    hasStock: true, // 获取库存接口
    isStock: true, // 配置默认显示在库的还是可用的
    inputList: [{
      name: '数量',
      colname: 'QTY',
      defnum: 1
    }], // 配的数量字段名集合
    matrixInput: false, // 是否显示数量框
    hasReceiving: false
  }, // 要货调拨单
  OC_B_STORE_ENQUIRY: { //  门店要货单
    getBody: '/p/cs/getMatrixData', // 获取商品编码各个SKU数量（用于修改）
    amendBody: '/p/cs/objectSave', // 保存修改的商品编码各个SKU数量
    singleCode: '/p/cs/barcodeSave', // 单条码数量保存
    tableName: 'OC_B_STORE_ENQUIRY_ITEM', // 子表表名
    queryObjSave: 'OC_B_STORE_ENQUIRY_ITEM', // 左边列表保存字段名
    virtualName: 'OC_B_STORE_ENQUIRY_ITEM_V', // 虚表表名
    isDeleteBtn: true, // 是否有删除明细按钮
    matchData: {},
    hasMatch: false, // 是否有匹配矩阵
    hasStock: true, // 获取库存接口
    isStock: true, // 配置默认显示在库的还是可用的
    inputList: [{
      name: '数量',
      colname: 'QTY',
      defnum: 1
    }], // 配的数量字段名集合
    matrixInput: false, // 是否显示数量框
    hasReceiving: true
  }, //  门店要货单
  OC_B_CUSTOMER_CARGO: {
    getBody: '/p/cs/getMatrixData', // 获取商品编码各个SKU数量（用于修改）
    amendBody: '/p/cs/objectSave', // 保存修改的商品编码各个SKU数量
    singleCode: '/p/cs/barcodeSave', // 单条码数量保存
    tableName: 'OC_B_CUSTOMER_CARGO_ITEM', // 子表表名
    queryObjSave: 'OC_B_CUSTOMER_CARGO_ITEM', // 左边列表保存字段名
    virtualName: 'OC_B_CUSTOMER_CARGO_ITEM_V', // 虚表表名
    isDeleteBtn: true, // 是否有删除明细按钮
    matchData: {},
    hasMatch: false, // 是否有匹配矩阵
    hasStock: true, // 获取库存接口
    isStock: true, // 配置默认显示在库的还是可用的
    inputList: [{
      name: '数量',
      colname: 'QTY',
      defnum: 1
    }], // 配的数量字段名集合
    matrixInput: false, // 是否显示数量框
    hasReceiving: false
  }, //  经销商调货单
  SG_B_GROUP_MANIFEST: {
    tableName: 'SG_B_GROUP_MANIFEST_ITEM',
    singleCode: '/p/cs/barcodeSave', // 单条码数量保存
    virtualName: 'SG_B_GROUP_MANIFEST_ITEM_V', // 虚表表名
    hasStock: false, // 获取库存接口
    isStoreId: true, // 是否传参 店仓/逻辑仓ID
    isMatchSize: 0,
    getBody: '/p/cs/getMatrixData', // 获取商品编码各个SKU数量（用于修改）
    amendBody: '/p/cs/objectSave' // 保存修改的商品编码各个SKU数量
  }
};
export default port;
