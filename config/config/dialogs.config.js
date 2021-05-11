//定制弹窗配置类
class DialogConfig {
  constructor() {}

  static config() {
    return (this.customConfig = Object.fromEntries(
      Object.entries(this.customConfig).map(([key, value]) => {
        // (如果目标对象与源对象有同名属性，或多个) ==> 源对象有同名属性，则后面的属性会覆盖前面的属性
        // return [key, Object.assign(this.baseObj, value)];
        return [
          key,
          Object.fromEntries(
            Object.entries(this.baseObj).concat(Object.entries(value))
          ),
        ]
      })
    ))
  }
}

DialogConfig.target
DialogConfig.baseObj = {
  titleAlign: 'center',
  data: {},
  keepAlive: true,
  footerHide: true,
  maskClosable: true,
}

DialogConfig.customConfig = {
  // 零售发货单详情
  address: {
    title: window.vmI18n.t('modalTitle.modify_shipping_address'),
    // title: '修改收货地址',
    width: 650,
    url: 'modal/orderCenter/resolveAddress',
    name: 'addressDialog',
    excludeString: 'addressDialog',
  },
  blacklist: {
    title: window.vmI18n.t('modalTitle.blacklist'),
    // title: '加入黑名单',
    width: 400,
    url: 'order/joinBlackList',
    name: 'blackListDialog',
    excludeString: 'blackListDialog',
  },
  addGift: {
    title: window.vmI18n.t('btn.addGift'),
    // title: '添加赠品',
    width: 1000,
    url: 'modal/orderCenter/addGiftItem',
    name: 'addGiftDialog',
    excludeString: 'addGiftDialog',
  },
  changeSku: {
    title: window.vmI18n.t('btn.replaceGoods'),
    // title: '替换商品',
    width: 800,
    url: 'modal/orderCenter/replaceGoodsDetail',
    name: 'changeSkuDialog',
    excludeString: 'changeSkuDialog',
  },
  modifyRemark: {
    title: window.vmI18n.t('btn.modifyRemarks'),
    // title: '修改备注',
    width: 480,
    url: 'modal/orderCenter/changeRemark',
    name: 'modifyRemarkDialog',
    excludeString: 'modifyRemarkDialog',
  },
  // 弹框配置 修改物流
  modifyLogisticsConfig: {
    title: '修改物流',
    width: '400',
    name: 'modifyLogistics', //组件名称
    url: 'modal/orderCenter/modifyLogistics',
    excludeString: 'modifyLogistics',
  },
  // 弹框配置 记录发票
  makeOutInvoiceConfig: {
    title: '记录发票',
    width: '600',
    name: 'makeOutInvoice', //组件名称
    url: 'modal/orderCenter/makeOutInvoice',
    excludeString: 'makeOutInvoice',
  },
  // 弹框配置 添加赠品
  addGiftsConfig: {
    title: '添加赠品',
    width: '700',
    name: 'addGifts', //组件名称
    url: 'modal/orderCenter/addGifts',
    excludeString: 'addGifts',
  },
  // 弹框配置 修改备注
  changeRemarkConfig: {
    title: '修改卖家备注',
    width: '480',
    name: 'changeRemark', //组件名称
    url: 'modal/orderCenter/changeRemark',
    excludeString: 'changeRemark',
  },

  // 弹框配置 拖拽排序
  dropSortConfig: {
    title: '排序表单',
    width: '300',
    name: 'setFormDrag', //组件名称
    url: 'modal/orderCenter/setFormDrag',
    excludeString: 'setFormDrag',
  },

  // 订单明细 弹框
  goodsDetailConfig: {
    title: '订单明细',
    width: '900',
    name: 'goodsDetail', //组件名称
    url: 'modal/orderCenter/goodsDetail',
    excludeString: 'goodsDetail',
  },

  // 修改仓库
  changeWarehouseConfig: {
    title: '修改仓库',
    width: '400',
    name: 'changeWarehouse', //组件名称
    url: 'modal/orderCenter/changeWarehouse',
    excludeString: 'changeWarehouse',
  },
  // 收货信息
  receivingInformationConfig: {
    title: '修改地址',
    width: '800',
    name: 'resolveAddress', //组件名称
    url: 'modal/order/resolveAddress',
    excludeString: 'resolveAddress',
  },
  // 弹窗配置 定金预售提前发货
  depositPresaleConfig: {
    title: '定金预售提前发货打标',
    width: '800',
    name: 'manualMarking', //组件名称
    url: 'modal/orderCenter/manualMarking',
    excludeString: 'manualMarking',
  },

  // 弹框配置 替换商品
  replaceConfig: {
    title: '批量替换商品',
    width: '1000',
    name: 'replaceTheGoods', //组件名称
    url: 'modal/orderCenter/changeProduct',
    excludeString: 'replaceTheGoods',
  },
  pushProduceConfig: {
    title: '批量添加赠品',
    width: '900',
    name: 'pushProduce', //组件名称
    url: 'modal/orderCenter/pushProduce',
    excludeString: 'pushProduce',
  },
  itemDeleteConfig: {
    title: '批量删除赠品',
    width: '800',
    name: 'itemDelete', //组件名称
    url: 'modal/orderCenter/itemDelete',
    excludeString: 'itemDelete',
  },
  specifyGoodsAssignConfig: {
    title: '指定商品拆单',
    width: '700',
    name: 'specifyGoodsAssign', //组件名称
    url: 'modal/orderCenter/specifyGoodsAssign',
    excludeString: 'specifyGoodsAssign',
  },
  //弹框配置 零售发货单详情界面替换商品弹框
  replaceGoodsDetailConfig: {
    title: '替换商品',
    width: '700',
    name: 'replaceGoodsDetail', //组件名称
    url: 'pages/orderCenter/orderManager/replaceGoodsDetail',
    excludeString: 'replaceGoodsDetail',
  },
  // Hold单
  holdOrderConfig: {
    title: 'Hold单',
    width: '500',
    name: 'holdOrderDialog', //组件名称
    url: 'modal/orderCenter/holdOrderDialog',
    excludeString: 'holdOrderDialog',
  },
}

export default DialogConfig
