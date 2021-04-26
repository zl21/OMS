export default {
  // 弹框配置 修改物流
  modifyLogisticsConfig: {
    confirmTitle: "修改物流",
    titleAlign: "center", //设置标题是否居中 center left
    width: "400",
    scrollable: false, //是否可以滚动
    closable: true, //是否可以按esc关闭
    draggable: true, //是否可以拖动
    mask: true, //是否显示遮罩层
    maskClosable: false, //是否可以点击蒙层关闭
    transfer: true, //是否将弹层放在body内
    name: "modifyLogistics", //组件名称
    url: "modal/orderCenter/modifyLogistics",
    keepAlive: true,
    componentData: {},
    quit: function () {
      this.closeConfirm()
    }
  },

  // 弹框配置 记录发票
  makeOutInvoiceConfig: {
    confirmTitle: "记录发票",
    titleAlign: "center", //设置标题是否居中 center left
    width: "600",
    scrollable: false, //是否可以滚动
    closable: true, //是否可以按esc关闭
    draggable: true, //是否可以拖动
    mask: true, //是否显示遮罩层
    maskClosable: false, //是否可以点击蒙层关闭
    transfer: true, //是否将弹层放在body内
    name: "makeOutInvoice", //组件名称
    url: "modal/orderCenter/makeOutInvoice",
    keepAlive: true,
    componentData: {},
    quit: function () {
      this.closeConfirm()
    }
  },

  // 弹框配置 添加赠品
  addGiftsConfig: {
    confirmTitle: "添加赠品",
    titleAlign: "center", //设置标题是否居中 center left
    width: "700",
    scrollable: false, //是否可以滚动
    closable: true, //是否可以按esc关闭
    draggable: true, //是否可以拖动
    mask: true, //是否显示遮罩层
    maskClosable: false, //是否可以点击蒙层关闭
    transfer: true, //是否将弹层放在body内
    name: "addGifts", //组件名称
    keepAlive: true,
    url: "modal/orderCenter/addGifts",
    componentData: {},
    quit: function () {
      this.closeConfirm()
    },
  },

  // 弹框配置 修改备注
  changeRemarkConfig: {
    confirmTitle: "修改卖家备注",
    titleAlign: "center", //设置标题是否居中 center left
    width: "480",
    scrollable: false, //是否可以滚动
    closable: true, //是否可以按esc关闭
    draggable: true, //是否可以拖动
    mask: true, //是否显示遮罩层
    maskClosable: false, //是否可以点击蒙层关闭
    transfer: true, //是否将弹层放在body内
    name: "changeRemark", //组件名称
    url: "modal/orderCenter/changeRemark",
    keepAlive: true,
    componentData: {},
    quit: function () {
      this.closeConfirm()
    }
  },

  // 弹框配置 拖拽排序
  dropSortConfig: {
    confirmTitle: "排序表单",
    titleAlign: "center", //设置标题是否居中 center left
    width: "300",
    scrollable: false, //是否可以滚动
    closable: true, //是否可以按esc关闭
    draggable: true, //是否可以拖动
    mask: true, //是否显示遮罩层
    maskClosable: false, //是否可以点击蒙层关闭
    transfer: true, //是否将弹层放在body内
    name: "setFormDrag", //组件名称
    url: "modal/orderCenter/setFormDrag",
    keepAlive: true,
    componentData: {},
    quit: function () {
      this.$children[0].$children[1].saveDragData()
      this.closeConfirm()
    }
  },
  // 订单明细 弹框
  goodsDetailConfig: {
    confirmTitle: "订单明细",
    titleAlign: "center", //设置标题是否居中 center left
    width: "900",
    scrollable: false, //是否可以滚动
    closable: true, //是否可以按esc关闭
    draggable: true, //是否可以拖动
    mask: true, //是否显示遮罩层
    maskClosable: false, //是否可以点击蒙层关闭
    transfer: true, //是否将弹层放在body内
    name: "goodsDetail", //组件名称
    url: "modal/orderCenter/goodsDetail",
    keepAlive: true,
    componentData: {},
    quit: function () {
      this.closeConfirm()
    },
  },
  // 修改仓库
  changeWarehouseConfig: {
    confirmTitle: "修改仓库",
    titleAlign: "center", //设置标题是否居中 center left
    width: "400",
    scrollable: false, //是否可以滚动
    closable: true, //是否可以按esc关闭
    draggable: true, //是否可以拖动
    mask: true, //是否显示遮罩层
    maskClosable: false, //是否可以点击蒙层关闭
    transfer: true, //是否将弹层放在body内
    name: "changeWarehouse", //组件名称
    url: "modal/orderCenter/changeWarehouse",
    keepAlive: true,
    componentData: {},
    quit: function () {
      this.closeConfirm()
    }
  },
  // 收货信息
  receivingInformationConfig: {
    confirmTitle: "修改地址",
    titleAlign: "center", //设置标题是否居中 center left
    width: "800",
    scrollable: false, //是否可以滚动
    closable: true, //是否可以按esc关闭
    draggable: true, //是否可以拖动
    mask: true, //是否显示遮罩层
    maskClosable: false, //是否可以点击蒙层关闭
    transfer: true, //是否将弹层放在body内
    name: "resolveAddress", //组件名称
    url: "modal/order/resolveAddress",
    keepAlive: true,
    componentData: {},
    quit: function () {
      this.closeConfirm()
    }
  },
  // 弹窗配置 定金预售提前发货
  depositPresaleConfig: {
    confirmTitle: "定金预售提前发货打标",
    titleAlign: "center", //设置标题是否居中 center left
    width: "800",
    scrollable: false, //是否可以滚动
    closable: true, //是否可以按esc关闭
    draggable: true, //是否可以拖动
    mask: true, //是否显示遮罩层
    maskClosable: false, //是否可以点击蒙层关闭
    transfer: true, //是否将弹层放在body内
    name: "manualMarking", //组件名称
    url: "modal/orderCenter/manualMarking",
    keepAlive: true,
    componentData: {
      type: '0'
    },
    quit: function () {
      this.closeConfirm()
    }
  },
  // 弹窗配置 会员加急发货
  vipSpeedDispatchConfig: {
    confirmTitle: "会员加急发货打标",
    titleAlign: "center", //设置标题是否居中 center left
    width: "400",
    scrollable: false, //是否可以滚动
    closable: true, //是否可以按esc关闭
    draggable: true, //是否可以拖动
    mask: true, //是否显示遮罩层
    maskClosable: false, //是否可以点击蒙层关闭
    transfer: true, //是否将弹层放在body内
    name: "manualMarking", //组件名称
    url: "modal/orderCenter/manualMarking",
    keepAlive: true,
    componentData: {},
    quit: function () {
      this.closeConfirm()
    }
  },
  // 弹框配置 替换商品
  replaceConfig: {
    confirmTitle: "批量替换商品",
    titleAlign: "center", //设置标题是否居中 center left
    width: "1000",
    scrollable: false, //是否可以滚动
    closable: true, //是否可以按esc关闭
    draggable: true, //是否可以拖动
    mask: true, //是否显示遮罩层
    maskClosable: false, //是否可以点击蒙层关闭
    transfer: true, //是否将弹层放在body内
    name: "replaceTheGoods", //组件名称
    url: "modal/orderCenter/changeProduct",
    keepAlive: true,
    componentData: {},
    quit: function () {
      this.closeConfirm()
    },
  },
  pushProduceConfig: {
    confirmTitle: "批量添加赠品",
    titleAlign: "center", //设置标题是否居中 center left
    width: "900",
    scrollable: false, //是否可以滚动
    closable: true, //是否可以按esc关闭
    draggable: true, //是否可以拖动
    mask: true, //是否显示遮罩层
    maskClosable: false, //是否可以点击蒙层关闭
    transfer: true, //是否将弹层放在body内
    name: "pushProduce", //组件名称
    url: "modal/orderCenter/pushProduce",
    keepAlive: true,
    componentData: {},
    quit: function () {
      this.closeConfirm()
    },
  },
  itemDeleteConfig: {
    confirmTitle: "批量删除赠品",
    titleAlign: "center", //设置标题是否居中 center left
    width: "800",
    scrollable: false, //是否可以滚动
    closable: true, //是否可以按esc关闭
    draggable: true, //是否可以拖动
    mask: true, //是否显示遮罩层
    maskClosable: false, //是否可以点击蒙层关闭
    transfer: true, //是否将弹层放在body内
    name: "itemDelete", //组件名称
    url: "modal/orderCenter/itemDelete",
    keepAlive: true,
    componentData: {},
    quit: function () {
      this.closeConfirm()
    }
  },
  specifyGoodsAssignConfig: {
    confirmTitle: "指定商品拆单",
    titleAlign: "center", //设置标题是否居中 center left
    width: "700",
    scrollable: false, //是否可以滚动
    closable: true, //是否可以按esc关闭
    draggable: true, //是否可以拖动
    mask: true, //是否显示遮罩层
    maskClosable: false, //是否可以点击蒙层关闭
    transfer: true, //是否将弹层放在body内
    name: "specifyGoodsAssign", //组件名称
    url: "modal/orderCenter/specifyGoodsAssign",
    keepAlive: true,
    componentData: {},
    quit: function () {
      this.closeConfirm()
    },
  },
  //弹框配置 零售发货单详情界面替换商品弹框
  replaceGoodsDetailConfig: {
    confirmTitle: "替换商品",
    titleAlign: "center", //设置标题是否居中 center left
    width: "700",
    scrollable: false, //是否可以滚动
    closable: true, //是否可以按esc关闭
    draggable: true, //是否可以拖动
    mask: true, //是否显示遮罩层
    maskClosable: false, //是否可以点击蒙层关闭
    transfer: true, //是否将弹层放在body内
    name: "replaceGoodsDetail", //组件名称
    url: "pages/orderCenter/orderManager/replaceGoodsDetail",
    keepAlive: true,
    componentData: {},
    quit: function () {
      this.closeConfirm()
    }
  },
  // Hold单
  holdOrderConfig: {
    confirmTitle: "Hold单",
    titleAlign: "center", //设置标题是否居中 center left
    width: "500",
    scrollable: false, //是否可以滚动
    closable: true, //是否可以按esc关闭
    draggable: true, //是否可以拖动
    mask: true, //是否显示遮罩层
    maskClosable: false, //是否可以点击蒙层关闭
    transfer: true, //是否将弹层放在body内
    name: "holdOrderDialog", //组件名称
    url: "modal/orderCenter/holdOrderDialog",
    keepAlive: true,
    componentData: {},
    quit: function () {
      this.closeConfirm()
    },
  }
}
