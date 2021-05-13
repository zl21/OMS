
//定制弹窗配置类
class DialogConfig {
  static target;
  constructor() { }
  static baseObj = {
    titleAlign: 'center',
    data: {},
    keepAlive: true,
    footerHide: true,
    maskClosable: false,
  }

  static customConfig = {
    // 零售发货单详情
    address: {
      title: $i18n.t('modalTitle.modify_shipping_address'), // 修改收货地址
      width: 650,
      url: 'modal/orderCenter/resolveAddress',
      name: 'addressDialog',
      excludeString: 'addressDialog',
    },
    blacklist: {
      title: $i18n.t('modalTitle.blacklist'), // 加入黑名单
      width: 400,
      url: 'order/joinBlackList',
      name: 'blackListDialog',
      excludeString: 'blackListDialog',
    },
    addGift: {
      title: $i18n.t('btn.addGift'), // 添加赠品
      width: 1000,
      url: 'modal/orderCenter/addGiftItem',
      name: 'addGiftDialog',
      excludeString: 'addGiftDialog',
    },
    changeSku: {
      title: $i18n.t('btn.replaceGoods'), // 替换商品
      width: 800,
      url: 'modal/orderCenter/replaceGoodsDetail',
      name: 'changeSkuDialog',
      excludeString: 'changeSkuDialog',
    },
    modifyRemark: {
      title: $i18n.t('btn.modifyRemarks'), // 修改备注
      width: 480,
      url: 'modal/orderCenter/changeRemark',
      name: 'modifyRemarkDialog',
      excludeString: 'modifyRemarkDialog',
    },
    modifyLogisticsConfig: {
    title: $i18n.t('btn.batchModify_logistics'), // 批量修改物流
    width: '400',
    name: 'modifyLogistics',
    url: 'modal/orderCenter/modifyLogistics',
    excludeString: 'modifyLogistics',
  },
  makeOutInvoiceConfig: {
    title: $i18n.t('btn.recordInvoice'), // 记录发票
    width: '600',
    name: 'makeOutInvoice',
    url: 'modal/orderCenter/makeOutInvoice',
    excludeString: 'makeOutInvoice',
  },
  addGiftsConfig: {
    title: $i18n.t('btn.addGift'), // 添加赠品
    width: '700',
    name: 'addGifts',
    url: 'modal/orderCenter/addGifts',
    excludeString: 'addGifts',
  },
  changeRemarkConfig: {
    title: $i18n.t('btn.modify_sellerNotes'), // 修改卖家备注
    width: '480',
    name: 'changeRemark',
    url: 'modal/orderCenter/changeRemark',
    excludeString: 'changeRemark',
  },

  // 弹框配置 拖拽排序
  dropSortConfig: {
    title: $i18n.t('btn.sortForm'), // 排序表单
    width: '300',
    name: 'setFormDrag',
    url: 'modal/orderCenter/setFormDrag',
    excludeString: 'setFormDrag',
  },
  goodsDetailConfig: {
    title: $i18n.t('btn.order_detailed'), // 订单明细
    width: '900',
    name: 'goodsDetail',
    url: 'modal/orderCenter/goodsDetail',
    excludeString: 'goodsDetail',
  },
  changeWarehouseConfig: {
    title: $i18n.t('btn.batchModify_warehouse'), // 批量修改仓库
    width: '400',
    name: 'changeWarehouse',
    url: 'modal/orderCenter/changeWarehouse',
    excludeString: 'changeWarehouse',
  },
  depositPresaleConfig: {
    title: $i18n.t('btn.preSaleAdvanceDeliveryMarking'), // 定金预售提前发货打标
    width: '800',
    name: 'manualMarking',
    url: 'modal/orderCenter/manualMarking',
    excludeString: 'manualMarking',
  },
  replaceConfig: {
    title: $i18n.t('btn.batch_replaceGoods'), // 批量替换商品
    width: '1000',
    name: 'replaceTheGoods',
    url: 'modal/orderCenter/changeProduct',
    excludeString: 'replaceTheGoods',
  },
  pushProduceConfig: {
    title: $i18n.t('btn.batch_addGift'), // 批量添加赠品
    width: '900',
    name: 'pushProduce',
    url: 'modal/orderCenter/pushProduce',
    excludeString: 'pushProduce',
  },
  itemDeleteConfig: {
    title: $i18n.t('btn.batch_deleteGift'), // 批量删除赠品
    width: '800',
    name: 'itemDelete',
    url: 'modal/orderCenter/itemDelete',
    excludeString: 'itemDelete',
  },
  specifyGoodsAssignConfig: {
    title: $i18n.t('btn.appointGoods_splitOrder'), // 指定商品拆单
    width: '700',
    name: 'specifyGoodsAssign',
    url: 'modal/orderCenter/specifyGoodsAssign',
    excludeString: 'specifyGoodsAssign',
  },
  //弹框配置 零售发货单详情界面替换商品弹框
  replaceGoodsDetailConfig: {
    title: $i18n.t('btn.replaceGoods'), // 替换商品
    width: '700',
    name: 'replaceGoodsDetail',
    url: 'pages/orderCenter/orderManager/replaceGoodsDetail',
    excludeString: 'replaceGoodsDetail',
  },
  holdOrderConfig: {
    title: $i18n.t('btn.holdOrder'), // Hold单
    width: '500',
    name: 'holdOrderDialog',
    url: 'modal/orderCenter/holdOrderDialog',
    excludeString: 'holdOrderDialog',
  },
  }
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

export default DialogConfig
