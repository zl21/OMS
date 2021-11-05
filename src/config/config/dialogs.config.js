
//定制弹窗配置类
class DialogConfig {
  static target;
  constructor() { }
  static baseObj = {
    titleAlign: 'left',
    data: {},
    keepAlive: true,
    footerHide: true,
    maskClosable: false,
  }

  static customConfig = {
    OC_ORDER_SEND_TIME: {
      title: '修改预计发货时间',
      width: 400,
      // url: 'modal/orderCenter/modifyPreDate',
      url: require('@/views/modal/orderCenter/modifyPreDate.vue').default,
      name: 'modifyPreDate',
      excludeString: 'modifyPreDate',
    },
    ModifyRemarks: {
      title: '修改单据备注', // 修改单据备注
      width: 650,
      // url: 'modal/orderCenter/returngood/rturngoodModifyRemarks',
      url: require('@/views/modal/orderCenter/returngood/rturngoodModifyRemarks.vue').default,
      name: 'rturngoodModifyRemarks',
      excludeString: 'rturngoodModifyRemarks',
    },
    // 零售发货单详情
    address: {
      title: $i18n.t('modalTitle.modify_shipping_address'), // 修改收货地址
      width: 650,
      // url: 'modal/orderCenter/resolveAddress',
      url: require('@/views/modal/orderCenter/resolveAddress.vue').default,
      name: 'addressDialog',
      excludeString: 'addressDialog',
    },
    blacklist: {
      title: $i18n.t('modalTitle.blacklist'), // 加入黑名单
      width: 400,
      // url: 'order/joinBlackList',
      url: require('@/views/modal/orderCenter/resolveAddress.vue').default,
      name: 'blackListDialog',
      excludeString: 'blackListDialog',
    },
    addGift: {
      title: $i18n.t('btn.addGift'), // 添加赠品
      width: 1000,
      // url: 'modal/orderCenter/addGiftItem',
      url: require('@/views/modal/orderCenter/addGiftItem.vue').default,
      name: 'addGiftDialog',
      excludeString: 'addGiftDialog',
    },
    changeSku: {
      title: $i18n.t('btn.replaceGoods'), // 替换商品
      width: 800,
      // url: 'modal/orderCenter/replaceGoodsDetail',
      url: require('@/views/modal/orderCenter/replaceGoodsDetail.vue').default,
      name: 'changeSkuDialog',
      excludeString: 'changeSkuDialog',
    },
    modifyRemark: {
      title: $i18n.t('btn.modifyRemarks'), // 修改备注
      width: 480,
      // url: 'modal/orderCenter/changeRemark',
      url: require('@/views/modal/orderCenter/changeRemark.vue').default,
      name: 'modifyRemarkDialog',
      excludeString: 'modifyRemarkDialog',
    },
    modifyLogisticsConfig: {
      title: $i18n.t('btn.batchModify_logistics'), // 批量修改物流
      width: '400',
      name: 'modifyLogistics',
      // url: 'modal/orderCenter/modifyLogistics',
      url: require('@/views/modal/orderCenter/modifyLogistics.vue').default,
      excludeString: 'modifyLogistics',
    },
    makeOutInvoiceConfig: {
      title: $i18n.t('btn.recordInvoice'), // 记录发票
      width: '600',
      name: 'makeOutInvoice',
      // url: 'modal/orderCenter/makeOutInvoice',
      url: require('@/views/modal/orderCenter/makeOutInvoice.vue').default,
      excludeString: 'makeOutInvoice',
    },
    addGiftsConfig: {
      title: $i18n.t('btn.addGift'), // 添加赠品
      width: '700',
      name: 'addGifts',
      // url: 'modal/orderCenter/addGifts',
      url: require('@/views/modal/orderCenter/addGifts.vue').default,
      excludeString: 'addGifts',
    },
    changeRemarkConfig: {
      title: $i18n.t('btn.modify_sellerNotes'), // 修改卖家备注
      width: '480',
      name: 'changeRemark',
      // url: 'modal/orderCenter/changeRemark',
      url: require('@/views/modal/orderCenter/changeRemark.vue').default,
      excludeString: 'changeRemark',
    },

    // 弹框配置 拖拽排序
    dropSortConfig: {
      title: $i18n.t('btn.sortForm'), // 排序表单
      width: '300',
      name: 'setFormDrag',
      // url: 'modal/orderCenter/setFormDrag',
      url: require('@/views/modal/orderCenter/setFormDrag.vue').default,
      excludeString: 'setFormDrag',
    },
    goodsDetailConfig: {
      title: $i18n.t('btn.order_detailed'), // 订单明细
      width: '900',
      name: 'goodsDetail',
      // url: 'modal/orderCenter/goodsDetail',
      url: require('@/views/modal/orderCenter/goodsDetail.vue').default,
      excludeString: 'goodsDetail',
    },
    changeWarehouseConfig: {
      title: $i18n.t('btn.batchModify_warehouse'), // 批量修改仓库
      width: '400',
      name: 'changeWarehouse',
      // url: 'modal/orderCenter/changeWarehouse',
      url: require('@/views/modal/orderCenter/changeWarehouse.vue').default,
      excludeString: 'changeWarehouse',
    },
    depositPresaleConfig: {
      title: $i18n.t('btn.preSaleAdvanceDeliveryMarking'), // 定金预售提前发货打标
      width: '800',
      name: 'manualMarking',
      // url: 'modal/orderCenter/manualMarking',
      url: require('@/views/modal/orderCenter/manualMarking.vue').default,
      excludeString: 'manualMarking',
    },
    replaceConfig: {
      title: $i18n.t('btn.batch_replaceGoods'), // 批量替换商品
      width: '1000',
      name: 'replaceTheGoods',
      // url: 'modal/orderCenter/changeProduct',
      url: require('@/views/modal/orderCenter/changeProduct.vue').default,
      excludeString: 'replaceTheGoods',
    },
    pushProduceConfig: {
      title: $i18n.t('btn.batch_addGift'), // 批量添加赠品
      width: '900',
      name: 'pushProduce',
      // url: 'modal/orderCenter/pushProduce',
      url: require('@/views/modal/orderCenter/pushProduce.vue').default,
      excludeString: 'pushProduce',
    },
    itemDeleteConfig: {
      title: $i18n.t('btn.batch_deleteGift'), // 批量删除赠品
      width: '800',
      name: 'itemDelete',
      // url: 'modal/orderCenter/itemDelete',
      url: require('@/views/modal/orderCenter/itemDelete.vue').default,
      excludeString: 'itemDelete',
    },
    specifyGoodsAssignConfig: {
      title: $i18n.t('btn.appointGoods_splitOrder'), // 指定商品拆单
      width: '700',
      name: 'specifyGoodsAssign',
      // url: 'modal/orderCenter/specifyGoodsAssign',
      url: require('@/views/modal/orderCenter/specifyGoodsAssign.vue').default,
      excludeString: 'specifyGoodsAssign',
    },
    //弹框配置 零售发货单详情界面替换商品弹框
    replaceGoodsDetailConfig: {
      title: $i18n.t('btn.replaceGoods'), // 替换商品
      width: '700',
      name: 'replaceGoodsDetail',
      // url: 'pages/orderCenter/orderManager/replaceGoodsDetail',
      url: require('@/views/modal/orderCenter/replaceGoodsDetail.vue').default,
      excludeString: 'replaceGoodsDetail',
    },
    holdOrderConfig: {
      title: $i18n.t('btn.holdOrder'), // Hold单
      width: '500',
      name: 'holdOrderDialog',
      // url: 'modal/orderCenter/holdOrderDialog',
      url: require('@/views/modal/orderCenter/holdOrderDialog.vue').default,
      excludeString: 'holdOrderDialog',
    },
    scheduleFormConfig: {
      title: '入库单', // 入库单、拣货单
      width: '800',
      name: 'scheduleFormDialog',
      // url: 'modal/strategyPlatform/scheduleFormDialog',
      url: require('@/views/modal/strategyPlatform/scheduleFormDialog.vue').default,
      excludeString: 'scheduleFormDialog',
    },
    copyPermissionConfig: {
      title: '复制权限', // 复制权限
      width: 400,
      name: 'copyPermission',
      // url: 'modal/systemConfig/copyPermission',
      url: require('@/views/modal/systemConfig/copyPermission.vue').default,
      excludeString: 'copyPermission',
    }
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
