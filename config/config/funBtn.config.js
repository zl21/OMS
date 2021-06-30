//定制按钮配置类
import commonUtils from './commonUtils'
import DialogConfig from 'burgeonConfig/config/dialogs.config'

class BtnConfig {
  static target;
  //是否单对象界面: 0否1是;
  static singleType = 0;
  static btnKey = '';
  constructor() { }

  customConfig = {
    typeAll: 'default', // 按钮统一风格样式
    loading: false, // 按钮加载
    buttons: [
      {
        webname: 'informWMSToCreateNew', // 退货单-通知WMS新建
        btnclick: () => this.btnMainHandler('wmsCreate'),
      },
      {
        webname: 'notifyWMSToWithdraw', // 退货单-通知WMS撤回
        btnclick: () => this.btnMainHandler('wmsWithdraw'),
      },
      {
        webname: 'manualReturnCreation', // 退货单-手工创建
      },
      {
        webname: 'returnModifyDocumentRemarks', // 退货单-修改单据备注
        btnclick: () => this.btnMainHandler('returnModifyDocumentRemarks'),
      },
      {
        webname: 'ORDER_DELETE_GOODS', // 删除赠品
      },
      {
        webname: 'ORDER_REPLACE_BELONGS_GOODS', // 批量替换下卦赠品
      },
      {
        webname: 'ORDER_COPY_CANCELED_ORDER', // 取消单复制
      },
      {
        webname: 'ORDER_COPY_AF_SALE', // 售后复制
      },
      {
        webname: 'manualCreation', // 手工创建
      },
      {
        webname: 'Newly added', // 新增
      },
      {
        webname: 'Revising Logistics', // 批量修改物流
      },
      {
        webname: 'Drop-out copy', // 丢单复制
      },
      {
        webname: 'holdOrder', // 批量Hold单
      },
      {
        webname: 'cancelHoldOrder', // 批量取消Hold
      },
      {
        webname: 'Modify warehouse', // 批量修改仓库
      },
      {
        webname: 'OrderDeliveryUrgent', // 加急发货
      },
      {
        webname: 'Amendment Notes', // 批量修改备注
      },
      {
        webname: 'OrderWrongCopy', // 错发复制
      },
      {
        webname: 'OrderMissSendCopy', // 漏发复制
      },
      {
        webname: 'OrderGiftsOutCopy', // 赠品出库复制
      },
      {
        webname: 'oriInvalidCopy', // 原单无效复制
      },
      {
        webname: 'order_gh', // 替换商品
      },
      {
        webname: 'ORDER_ADD_GOODS', // 替换赠品
      },
      {
        webname: 'Adding gifts', // 添加赠品
      },
      {
        webname: 'Delete_Merchandise', // 删除赠品
      },
      {
        webname: 'appointSplit', // 指定商品拆单
      },
      {
        webname: 'shortageSplit', // 缺货拆单
      },
      {
        webname: 'new_tuihuanhuo', // 退货换单 - 新增
        btnclick: () => {
          commonUtils.navigateMain('-1', 'TabHref', 'returngood', 'panel_label.addReturnOrder', { statusName: false })
        }, // 按钮点击事件
      },
      {
        webname: 'modify_yuihuanhuo', // 退货换单 - 修改
        btnclick: () => this.btnMainHandler('returnGoodsModify'),
      },
      {
        webname: 'VirtualWarehouseStorageCmd', // 虚拟仓库入库
        btnclick: () => this.btnMainHandler('virtualWarehouseLibraryWarn'),
      },
      {
        webname: 'shenhe_tuihuanhuo', // 退货换单 - 售后审核
        btnclick: () => this.btnMainHandler('afterAuditOrder'),
      },
      {
        webname: 'returnCancel', // 退货换单 - 取消
        btnclick: () => this.btnMainHandler('returnGoodsCancel'),
      },
      {
        webname: 'updateOrderVirtual', // 退货换单 - 虚拟入库
        btnclick: () => this.btnMainHandler('virtualStorage'),
      },
      {
        webname: 'OcChangingOrRefundingDetailCmd', // 退货换单 - 退换货单复制
        btnclick: () => () => this.btnMainHandler('returnGoodsCopy'),
      },
      {
        webname: 'beizhu_tuihuanh', // 退货换单 - 修改备注
        btnclick: () => this.btnMainHandler('modifyRemark'),
      },
      {
        webname: 'quxiaozidongtuikuan_tuihuanhuo', // 取消自动退款
        btnclick: () => this.btnMainHandler('cancelRefund'),
      },
      {
        webname: 'modifyReturnSellerRemark', // 退货换单 - 修改卖家备注
        btnclick: () => this.btnMainHandler('modifySellerRemark'),
      },
      {
        webname: 'refund_to_exchange', // 退货换单 - 退货转换货
        btnclick: () => this.btnMainHandler('returnGoodsOrder'),
      },
      {
        webname: 'refund_to_order', // 退货换单 - 重新生成订单
        btnclick: () => this.btnMainHandler('regenerateTheOrder'),
      },
      {
        webname: 'chuanwms_tuihuanhuo',
        btnclick: () => this.btnMainHandler('againWMS'),
      },
      {
        webname: 'qiaozhiwancheng_tuihuanhuo',
        btnclick: () => this.btnMainHandler('forcedCompletion'),
      },
      {
        webname: 'OcBOrderExportCmd',
        btnclick: () => this.btnMainHandler('exportClick'),
      },
      {
        webname: 'daochu_tuihuanhuo,export_tuihuoruku',
        btnclick: () => this.btnMainHandler('tuihuoExportClick'),
      },
      {
        webname: 'lookup_chongzhi',
        btnclick: () => BtnConfig.target.reset(),
      },
      {
        webname:
          'lookup_tuihuanhuo,lookup_kcjisuanhuancunchi,lookup_kucuntongbuduilie,lookup_qdkucunbiandongliushui,lookup_tuihuoruku',
        btnclick: () => BtnConfig.target.find(),
      },
      {
        webname: 'Newlyadded_tuihuoruku',
        btnclick: () => {
          commonUtils.navigateMain(
            '-1',
            'TabHref',
            'returnTreasuryAdd',
            'panel_label.returnTreasuryAdd'
          )
        },
      },
      {
        webname: 'ManualMatching_tuihuoruku',
        btnclick: () => this.btnMainHandler('manualMatch'),
      },
      {
        webname: 'Mismatchingmandatorymatching_cuofa',
        btnclick: () => this.btnMainHandler('forceMatch'),
      },
      {
        webname: 'refundInImport',
        btnclick: () => {
          BtnConfig.target.importTable.componentData = {
            tableName: 'OC_B_REFUND_IN',
          }
          BtnConfig.target.$children
            .find((item) => item.name === 'importTable')
            .openConfirm()
        },
      },
      {
        webname: 'in_tuihuanhuo',
        btnclick: () => this.btnMainHandler('scanIncoming'),
      },
      {
        webname: 'oc_b_return_order_batch',
        btnclick: () => this.btnMainHandler('batchOriginalReturn'),
      },
      {
        webname: 'To examine', // 审核
        btnclick: () => this.btnMainHandler('auditOrder'), // 按钮点击事件
      },
      {
        webname: 'auditingForce', // 强制审核
        btnclick: () => this.btnMainHandler('auditingForce'), // 按钮点击事件
      },
      {
        webname: 'Counter-audit', // 反审核
        btnclick: () => this.btnMainHandler('reverseAuditOrder'), // 按钮点击事件
      },
      {
        webname: 'shortageNotice', // 缺货回传
        btnclick: () => this.btnMainHandler('shortageNotice'), // 按钮点击事件
      },
      /* {
        webname: 'holdOrder2', // hold单
        btnclick: () => this.btnMainHandler('holdOrder'), // 按钮点击事件
      }, */
      /* {
        webname: 'cancelHoldOrder2', // 取消hold单
        btnclick: () => this.btnMainHandler('cancelHoldOrder'), // 按钮点击事件
      }, */
      /* {
        btnclick: () => this.btnMainHandler('invoiceNotice'), // 按钮点击事件
      }, */
      {
        webname: 'Record invoices',
        btnclick: () => this.btnMainHandler('invoiceRecord'),
      },
      {
        webname: 'Order Cancellation',
        btnclick: () => this.btnMainHandler('cancelOrder'), // 按钮点击事件
      },
      {
        text: $i18n.t('btn.orderBlocking'), // 订单拦截
        webname: 'orderBlocking',
        btnclick: () => this.btnMainHandler('interceptOrder'),
      },
      {
        webname: 'ORDER_MANUAL_SPLIT_ORDER',
        btnclick: () => this.btnMainHandler('splitOrder'),
      },
      {
        webname: 'New refund receipt', // 新增退单跳转页面
        btnclick: () => this.btnMainHandler('addReturnOrder'),
      },
      {
        webname: 'Out-of-stock reopening',
        btnclick: () => this.btnMainHandler('outOfStockReOpening'),
      },
      {
        webname: 'FortuneBag-Out-of-stock reopening',
        btnclick: () => this.btnMainHandler('fortuneBagReOpening'),
      },
      {
        webname: 'beizhudaoru',
        btnclick: () => this.noticeImport(), // 按钮点击事件
      },
      /* {
        btnclick: () => this.btnMainHandler('changeShipmentPlatform'),
      }, */
      {
        webname: 'batchReturnOrder',
        btnclick: () => this.btnMainHandler('batchReturnOrder'),
      },
      {
        text: $i18n.t('btn.release_inventory'), // 释放库存
        webname: 'release_inventory',
        btnclick: () => this.btnMainHandler('releaseInventory'),
      },
      {
        webname: 'mergeOrderOne',
        btnclick: () => this.btnMainHandler('mergeOrder'),
      },
      {
        webname: 'cancelMergeOrder',
        btnclick: () => this.btnMainHandler('cancelMergeOrder'),
      },
      {
        webname: 'order_refreceing', //刷新
        btnclick: () => BtnConfig.target.autoRefresh(),
      },
      {
        webname: 'refund_price', // 额外退款
        btnclick: () => this.btnMainHandler('refundPrice'),
      },
      {
        webname: 'cancelBlocking', // 取消订单拦截
        btnclick: () => this.btnMainHandler('cancelBlocking'),
      },
      {
        webname: 'OcBOrderImportCmd', // 导入
        webid: 3025,
      },
      {
        icon: 'iconfont iconbj_setup', // 按钮图标
        webname: 'iconbj_setup',
        btnclick: () => this.setupHandler(),
      },
      {
        icon: 'iconfont iconbj_col', // 收藏图标
        webname: 'isFavorite',
        name: $i18n.t('btn.collection'),
        btnclick: () => BtnConfig.target.setFavorite(),
      },
      //--------------------------------------------------单对象页面---------------------------------
      {
        webname: 'save_order_1', // 保存
        btnclick: () => BtnConfig.target.saveOrderManageAdd(),
      },
      {
        webname: 'refund_save', // 保存
        btnclick: () => BtnConfig.target.saveData(),
      },
      {
        webname: 'refund_return', // 退单返回
        btnclick: () => {
          this.back('returngoodList', 2661, 'panel_label.forcedStorage') // 销毁当前实例
          BtnConfig.target.$destroy()
        }
      },
      {
        webname: 'order_update_addrr', // 修改地址
        btnclick: () => this.btnMainHandler('orderUpdateAddress'),
      },
      {
        webname: 'updateremark', // 修改备注
        btnclick: () => this.btnMainHandler('updateRemark'),
      },
      {
        webname: 'updatestore', // 修改仓库
        btnclick: () => this.btnMainHandler('updateStore'),
      },
      {
        webname: 'Revisinguupdate', // 修改物流
        btnclick: () => this.btnMainHandler('revisingUpdate'),
      },
      {
        webname: 'order_fund', // 返回
        btnclick: () => {
          this.back('orderManager', 2627, 'panel_label.orderManager') // 销毁当前实例
          BtnConfig.target.$destroy()
        },
      },
      {
        webname: 'ManualMatching_save',
        btnclick: () => BtnConfig.target.saveData(),
      },
      {
        webname: 'Mismatchingmandatorymatching_return',
        btnclick: () => {
          this.back('returnStoreageList', 2809, 'panel_label.returnTreasury') // 销毁当前实例
          BtnConfig.target.$destroy()
        },
      },
    ],
  }

  static config() {
    return new BtnConfig().customConfig;
  }
  // 单对象直接调方法;

  /**
   * 1. singleType：=1，为单对象页面，不需要做判断当前是否选中数据等操作
   * 2. paramsType：=1，入参仅传ids--列表ID数组--json类型;
   * 3. paramsType：=2，入参仅传ids--列表ID数组--fromData类型;
   * 4. paramsType：=3，入参需将ids转成json字符串, 再转换成fromData;
   * 5. paramsType：=4，入参为选择的selection--rowsData;
   * 6. paramsType：=5，？
   * 7. paramsType：=6，导出, 可以跳转纪录选择逻辑;
   * 8. isSingle：当前操作按钮是否是单量操作，默认为false(可批量)
   *
   *
   * 1,2,3只取纪录ID属性, 其他传列表选择所有属性数组;
   * 3, 5, 7 批量纪录进行操作; 其他单条操作;
   * 6，导出, 可以跳转纪录选择逻辑;
   * 7 定制弹窗;
   */
  // 按钮处理程序类似
  btnMainHandler(type) {
    // 方法名 未选择提示 传参类型
    let funName, tips, paramsType
    let isSingle = false
    switch (type) {
      case 'returnModifyDocumentRemarks':
        funName = 'fnreturnModifyDocumentRemarks'
        tips = 'l0'
        paramsType = 7
      break
      case 'auditOrder':
      case 'auditingForce':
        funName = 'auditOrderHandler'
        tips = 'a6'
        paramsType = 1
        break
      case 'reverseAuditOrder':
        funName = 'reverseAuditOrderHandler'
        tips = 'ev'
        paramsType = 1
        break
      case 'shortageNotice':
        funName = 'shortageNoticeHandler'
        break
      case 'cancelBlocking':
        funName = 'cancelBlockingHandler'
        break
      case 'orderUpdateAddress':
        funName = 'orderUpdateAddressHandler'
        break
      case 'addReturnOrder':
        funName = 'addReturnOrderHandler'
        tips = 'b5'
        paramsType = 4
        break
      case 'cancelRefund':
      case 'scanIncoming':
      case 'afterAuditOrder':
      case 'virtualStorage':
      case 'returnGoodsOrder':
      case 'regenerateTheOrder':
      case 'manualMatch':
      case 'forceMatch':
      case 'returnGoodsCancel':
      case 'modifyRemark':
      case 'modifySellerRemark':
      case 'againWMS':
      case 'forcedCompletion':
      case 'batchOriginalReturn':
        funName = `${type}Handler`
        tips = 'l0'
        paramsType = 7
        break
      case 'holdOrder':
        funName = 'holdOrderHandler'
        tips = 'a8'
        paramsType = 1
        break
      case 'refundPrice':
      case 'updateRemark':
      case 'updateStore':
      case 'revisingUpdate':
        funName = `${type}Handler`
        paramsType = 5
        break
      case 'cancelHoldOrder':
        funName = 'cancelHoldOrderHandler'
        tips = 'a8'
        break
      case 'invoiceNotice':
        funName = 'invoiceNoticeHandler'
        tips = 'a7'
        paramsType = 2
        break
      case 'invoiceRecord':
        funName = 'invoiceRecordHandler'
        tips = 'a8'
        paramsType = 3
        break
      case 'cancelOrder':
        funName = 'cancelOrderHandler'
        tips = 'a9'
        paramsType = 1
        break
      case 'interceptOrder':
        funName = 'interceptOrderHandler'
        tips = 'b1'
        paramsType = 1
        break
      case 'outOfStockReOpening':
        funName = 'outOfStockReOpeningHandler'
        tips = 'b9'
        paramsType = 1
        break
      case 'fortuneBagReOpening':
        funName = 'fortuneBagReOpeningHandler'
        tips = 'c0'
        paramsType = 1
        break
      case 'changeShipmentPlatform':
        funName = 'changeShipmentPlatformHandler'
        tips = 'c1'
        paramsType = 1
        break
      case 'mergeOrder':
        funName = 'mergeOrderHandler'
        tips = 'd7'
        paramsType = 4
        break
      case 'cancelMergeOrder':
        funName = 'cancelMergeOrderHandler'
        tips = 'd8'
        paramsType = 4
        break
      case 'releaseInventory':
        funName = 'releaseInventoryHandler'
        tips = 'c'
        paramsType = 1
        break
      case 'batchReturnOrder':
        funName = 'batchReturnOrderHandler'
        tips = 'c2'
        paramsType = 4
        break
      case 'splitOrder':
        funName = 'splitOrderHandler'
        tips = 'i7'
        paramsType = 5
        break
      case 'exportClick':
      case 'tuihuoExportClick':
        funName = `${type}Handler`
        tips = ''
        paramsType = 6
        break
      case 'returnGoodsModify':
      case 'returnGoodsCopy':
      case 'virtualWarehouseLibraryWarn':
      case 'wmsWithdraw':
        funName = `${type}Handler`
        tips = 'l0'
        paramsType = 1
        break

      case 'wmsCreate':
        funName = `${type}Handler`
        tips = 'ga'
        paramsType = 7
        break
    }
    const self = BtnConfig.target
    BtnConfig.btnKey = type

    if (BtnConfig.singleType == 1) {
      // 单对象界面
      let ids
      if (self.tab1) {
        ids = [paramsType == 5 ? self.tab1.order : self.tab1.order.ID]
      } else {
        ids = self.$route.query.id
      }
      this[funName](self, ids)
    } else {
      // 非单对象界面
      if(!self.vueAgTable){
        self.selection = self.$refs.agGridChild.AGTABLE.getSelect();
      }
      if (self.selection.length > 0) {
        if (isSingle && self.selection.length > 1) {
          commonUtils.msgTips(self, 'warning', '不支持批量操作！', 2)
          return
        }
        self.btnConfig.loading = true
        let ids = []
        let myData
        ids = commonUtils.sonList(self.selection, 'ID')
        if (paramsType == 1) {
          myData = ids
        } else if (paramsType == 2 || paramsType == 3) {
          const fromdata = new FormData()
          let tempdata = paramsType == 2 ? { IDS: ids } : { ID: ids.join() }
          fromdata.append('param', JSON.stringify(tempdata))
          myData = fromdata
        } else {
          myData = self.selection
        }
        this[funName](self, myData)
        self.btnConfig.loading = false
        /* 
      if (self.selection.length !== 1 && ![3, 5, 7].includes(paramsType)) {
        commonUtils.msgTips(self, 'warning', tips);
        self.btnConfig.loading = false;
      } else {
        this[funName](self, myData);
      } 
      */
      } else if (paramsType != 6) {
        commonUtils.msgTips(self, 'warning', tips)
        self.btnConfig.loading = false
      } else {
        this[funName](self, [])
      }
    }
  }
  // 订单状态
  orderStatusRule(self, params) {
    // 匹配禁止操作状态是否存在
    let matchingState = true
    let ids = []
    let statusName = 'RETURN_STATUS'
    if (params.statusName) {
      statusName = params.statusName
    }
    if (params.statusCode) {
      console.log(self.selection)
      for (var item of self.selection) {
        if (!params.statusCode.includes(item[`${statusName}`])) {
          matchingState = false
          break
        }
      }
    }
    if (params.type === 'check') {
      // （PS:多选，有状态判断）
      if (self.selection.length === 1 && !matchingState) {
        commonUtils.msgTips(self, 'warning', params.statusTips)
        ids = commonUtils.sonList(self.selection, 'ID')
      } else {
        for (let i = 0; i < self.selection.length; i++) {
          if (!matchingState) {
            commonUtils.msgTips(self, 'warning', params.statusTips)
            ids = []
            break
          } else {
            ids.push(self.selection[i].ID)
          }
        }
      }
    } else if (
      (params.type === 'radio' && self.selection.length != 1) ||
      !matchingState
    ) {
      // （PS:单选，有状态判断）
      self.selection.length != 1
        ? commonUtils.msgTips(self, 'warning', 'k3')
        : commonUtils.msgTips(self, 'warning', params.statusTips)
    } else {
      ids = commonUtils.sonList(self.selection, 'ID')
    }
    // 如果不符合条件 返回false
    if (
      (params.type === 'check' &&
        self.selection.length === 1 &&
        !matchingState) ||
      (params.type === 'radio' && self.selection.length != 1) ||
      !matchingState
    ) {
      return false
    }
    // 校验通过返回ids
    return ids
  }
  // 修改
  returnGoodsModifyHandler(self, id) {
    commonUtils.navigateMain(id[0], 'TabOpen', 'returngood', 'panel_label.addReturnOrder', { statusName: true })
  }
  // 退换货单复制
  returnGoodsCopyHandler() {
    commonUtils.navigateMain(-1, 'TabOpen', 'returngood', 'panel_label.addReturnOrder', { cloneReturnGoodId: true, statusName: false })
  }
  // 错发强制匹配
  forceMatchHandler(self, id) {
    if (BtnConfig.singleType) {
      commonUtils.serviceHandler(
        self,
        'orderCenter.manualMatchingCheck',
        { id: id },
        'all',
        function (res) {
          if (res.data.code === 0) {
            commonUtils.navigateMain(
              id,
              'TabOpen',
              'WARNSENDMATCHING',
              'panel_label.return_warehousing_wrong_delivery_forced_matching',
              { source: 3, form: 'list' }
            )
          }
        }
      )
    } else {
      let ids = this.orderStatusRule(self, {
        type: 'radio',
        statusCode: '0',
        statusTips: 'q6',
        statusName: 'IS_OFF_MATCH',
      })
      if (ids) {
        commonUtils.serviceHandler(
          self,
          'orderCenter.manualMatchingCheck',
          { id: id },
          'all',
          function (res) {
            if (res.data.code === 0) {
              commonUtils.navigateMain(
                id,
                'TabOpen',
                'WARNSENDMATCHING',
                'panel_label.return_warehousing_wrong_delivery_forced_matching',
                { source: 3, form: 'list' }
              )
            }
          }
        )
      }
    }
  }
  // 手工匹配
  manualMatchHandler(self, id) {
    if (BtnConfig.singleType) {
      commonUtils.serviceHandler(
        self,
        'orderCenter.manualMatchingCheck',
        { id: id },
        'all',
        function (res) {
          if (res.data.code === 0) {
            commonUtils.navigateMain(
              id,
              'TabOpen',
              'manualMatching',
              'panel_label.return_warehousing_manual_matching',
              { source: 2, form: 'list' }
            )
          }
        }
      )
    } else {
      let ids = this.orderStatusRule(self, {
        type: 'radio',
        statusCode: '0',
        statusTips: 'q6',
        statusName: 'IS_OFF_MATCH',
      })
      if (ids) {
        commonUtils.serviceHandler(
          self,
          'orderCenter.manualMatchingCheck',
          { id: id },
          'all',
          function (res) {
            if (res.data.code === 0) {
              commonUtils.navigateMain(
                id,
                'TabOpen',
                'manualMatching',
                'panel_label.return_warehousing_manual_matching',
                { source: 2, form: 'list' }
              )
            }
          }
        )
      }
    }
  }
  fnreturnModifyDocumentRemarks(self,ids){ //修改单据备注
    const publicBouncedConfig = JSON.parse(
      JSON.stringify(DialogConfig.config().ModifyRemarks)
    )
    publicBouncedConfig.componentData = {
      ids,
    }
    self.publicBouncedConfig = publicBouncedConfig
    self.$nextTick(() => {
      self.$children
        .find((item) => item.name === 'rturngoodModifyRemarks')
        .openConfirm()
    })
    self.btnConfig.loading = false
  }
  // 批量原退
  batchOriginalReturnHandler(self) {
    let ids = this.orderStatusRule(self, {
      type: 'check',
      statusCode: '',
      statusTips: '',
    })
    if (ids) {
      commonUtils.modalShow(self, 'm3', 'orderCenter.forcedCompletion', { ids, })
    }
  }
  // 强制完成
  forcedCompletionHandler(self) {
    let ids = this.orderStatusRule(self, {
      type: 'check',
      statusCode: '30',
      statusTips: 'm8',
    })
    if (ids) {
      commonUtils.modalShow(self, 'm9', 'orderCenter.updateReturnBOrder', {
        ids,
      })
    }
  }
  // 重传wms
  againWMSHandler(self) {
    let ids = this.orderStatusRule(self, {
      type: 'check',
      statusCode: '',
      statusTips: '',
    })
    if (ids) {
      commonUtils.serviceHandler(self, 'orderCenter.retransmissionWms', {
        returnOrderIds: ids.join(','),
      })
    }
  }
  // 重新生成订单
  async regenerateTheOrderHandler(self) {
    let ids = this.orderStatusRule(self, {
      type: 'radio',
      statusCode: '',
      statusTips: '',
    })
    if (ids) {
      const { data } = await self.service.orderCenter.validateRefundChange({
        objid: ids[0],
      })
      if (data.code === 0) {
        commonUtils.navigateMain(
          id,
          'TabOpen',
          'RETURNGOOD',
          'panel_label.ReturnOrderDetails',
          { statusName: true, flag: 'RefundToExchange' }
        )
      } else {
        self.$Message.error(data.message ? data.message : '错误！')
      }
    }
  }
  //取消自动退款处理
  async cancelRefundHandler(self, id) {
    const { data } = await commonUtils.serviceHandler(
      self,
      'orderCenter.cancelautorefund',
      { ID: id }
    )
    if (data.code === 0) {
      BtnConfig.target.getList(BtnConfig.target.statusTab)
    }
  }
  // 退货转换货校验
  async returnGoodsOrderHandler(self) {
    let ids = this.orderStatusRule(self, {
      type: 'radio',
      statusCode: '',
      statusTips: '',
    })
    if (ids) {
      const { data } = await self.service.orderCenter.refund2ExchangeValidate({
        ids: ids,
      })
      if (data.code === 0) {
        commonUtils.navigateMain(
          ids[0],
          'TabHref',
          'RETURNGOOD',
          'panel_label.ReturnOrderDetails',
          { statusName: true, flag: 'RefundToExchange' }
        )
      } else {
        this.$Message.error(data.message ?? '错误！')
      }
    }
  }
  // 修改备注
  modifyRemarkHandler(self, id) {
    self.changeRemarkConfig.componentData = {
      ids: id,
      status: self.statusTab,
      type: 1,
    }
    if (BtnConfig.singleType) {
      commonUtils.importTable(self, 'changeRemarkConfig', 'rturngoodModifyRemarks', 'btn.modifyRemarks')
    } else {
      let ids = this.orderStatusRule(self, { type: 'check', statusCode: '20,30,40,50', statusTips: 'm2', })
      if (ids) {
        self.changeRemarkConfig.componentData.ids = ids.join(',')
        commonUtils.importTable(self, 'changeRemarkConfig', 'rturngoodModifyRemarks', 'btn.modifyRemarks')
      }
    }
  }
  // 卖家备注
  modifySellerRemarkHandler(self) {
    let ids = this.orderStatusRule(self, {
      type: 'check',
      statusCode: '20,30,40,50',
      statusTips: 'ds',
    })
    if (ids) {
      self.changeRemarkConfig.componentData = {
        ids: ids.join(','),
        status: self.statusTab,
        type: 2,
      }
      commonUtils.importTable(
        self,
        'changeRemarkConfig',
        'rturngoodModifyRemarks',
        'modalTitle.modify_sellerNotes'
      )
    }
  }
  // 虚拟入库
  virtualStorageHandler(self, id) {
    if (BtnConfig.singleType) {
      if (self.$route.query.id == '-1') return;
      if (self.status !== 20) {
        commonUtils.msgTips(self, 'warning', 'l6');// 此退换单状态不允许虚拟入库!
        return;
      }
      commonUtils.modalShow(self, 'l7', 'common.updateVirtualLibrary', { ID: id, }, 'part',
        function (res) {
          if (res.data.code === 0) {
            self.$Message.success(res.data.message)
            self.getList()
          } else {
            self.$Message.error(res.data.message)
          }
        });
    } else {
      id = this.orderStatusRule(self , {
        statusName:'BILL_TYPE',
        type: 'radio',
        statusCode: '1',
        statusTips: 'l6',
      })
      if (id) {
        let formdata = new FormData();
        formdata.append('id' , id[0]);
        commonUtils.modalShow(self, 'l7', 'common.updateVirtualLibrary', formdata)
      }
    }
  }
  // 取消退单
  returnGoodsCancelHandler(self, id) {
    if (BtnConfig.singleType) {
      commonUtils.serviceHandler(self, 'orderCenter.checkCancelParams', { ID: [id] }, 'all',
        function (res) {
          if (res.data.code == 0 || res.data.code == 1) {
            let msg = res.data.code === 0 ? 'l3' : 'fp'; // 是否确定取消退单？
            commonUtils.modalShow(self, msg, 'orderCenter.OcCancelChangingOrRefund', { ID: id }, 'part',
              function (res) {
                if (res.data.code === 0) {
                  self.$Message.success(res.data.message)
                  self.getList()
                } else {
                  self.$Message.error(res.data.message)
                }
              }
            );
          }
        })
    } else {
      // let ids = this.orderStatusRule(self, {
      //   type: 'check',
      //   statusCode: '待退货入库',
      //   statusTips: 'l2',
      // })
      const id = self.selection.map(item => {return {id:item.ID , bill_no:item.BILL_NO}});
      const callbackType = 'all';
      const callbackFun = (res)=>{
        console.log(res);
        if(res.data.code == 0){
          commonUtils.msgTips(self ,'success', '取消成功', 0)
        }else {
          commonUtils.tipShow(
            'confirm',
            self,
            res,
            res.data.message,
            function (h) {
              //因为后端复用列列表详情界面的取消接口,需要区分
              return h('Table', {
                props: {
                  columns: [
                    {
                      title: '失败原因',
                      key: 'message',
                    },
                  ],
                  data: res.data.data,
                },
              })
            }
          )
        }
      }
      if (id) {
        commonUtils.modalShow(self, 'l3', 'orderCenter.cancelParams', id , callbackType, callbackFun);
        // commonUtils.serviceHandler(self, 'orderCenter.checkCancelParams', {
        //   ids,
        // })
      }
    }
  }
  //售后审核
  afterAuditOrderHandler(self, id) {
    if (BtnConfig.singleType) {
      if (id === '-1') return;
      const checkData = self.refundDtoList.data;
      let unMatchFlag = false;
      checkData.forEach((item) => {
        if (item.QTY_REFUND !== item.QTY_IN) unMatchFlag = true;
      });
      commonUtils.modalShow(self, unMatchFlag ? 'av' : 'k7', 'common.chargebackcheck', { ID: id }, 'part',
        function (res) {
          if (res.data.code === 0) {
            self.$Message.success(res.data.message)
            self.getList()
          } else {
            self.$Message.error(res.data.message)
          }
        }
      );
    } else {
      // 判断是否选中或状态是否正确
      let ids = this.orderStatusRule(self, { type: 'check', statusCode: '30', statusTips: 'dt', })
      if (ids) {
        let params = { ID: ids.join(',') }
        commonUtils.serviceHandler(self, 'common.chargebackcheck', params, 'part',
          function (res) {
            if (res.data.code === 0) {
              self.$Message.success(res.data.message)
              self.getList()
            } else {
              self.$Message.error(res.data.message)
            }
          }
        )
      }
    }
  }
  //审核订单处理
  auditOrderHandler(self, ids) {
    if (BtnConfig.singleType == 1) {
      let requestPath = `orderCenter.${BtnConfig.btnKey}`
      commonUtils.serviceHandler(
        self,
        requestPath,
        { ids, type: '1' },
        'all',
        function (res) {
          if (res.data.code === 0) {
            self.$Message.success(res.data.message)
            self.autoRefresh()
          } else {
            if (res.data.data?.message) {
              self.error_type = 'auditing'
              self.error_tip = res.data.data.message
              self.modal = true
              self.autoRefresh()
            } else {
              self.$Message.error(res.data.message)
            }
          }
        }
      )
    } else {
      commonUtils.serviceHandler(self, 'orderCenter.auditOrder', {
        ids,
        type: '1',
        isCheck: 0,
      })
    }
  }
  //反向审核订单处理
  reverseAuditOrderHandler(self, ids) {
    let params = { ids, type: '1' }
    if (BtnConfig.singleType == 1) {
      commonUtils.modalShow(
        self,
        'g7',
        'orderCenter.auditOrderReserve',
        params,
        'all',
        function (res) {
          if (res.data.code === 0) {
            commonUtils.msgTips(self, 'sucess', res.data.message)
            self.load()
          }
        }
      )
    } else {
      commonUtils.serviceHandler(self, 'orderCenter.auditOrderReserve', params)
    }
  }
  //缺货回传
  shortageNoticeHandler(self, ids) {
    if (self.orderStatus !== 2)
      return commonUtils.msgTips(self, 'warning', 'fe')
    commonUtils.modalShow(
      self,
      'ff',
      'orderCenter.shortageNotice',
      { ids },
      'all',
      function (res) {
        if (res.data.code === 0) {
          commonUtils.msgTips(self, 'sucess', res.data.message)
          self.load()
        }
      }
    )
  }
  //hold单处理
  holdOrderHandler(self, ids) {
    const publicBouncedConfig = JSON.parse(
      JSON.stringify(DialogConfig.config().holdOrderConfig)
    )
    publicBouncedConfig.componentData = {
      ids,
    }
    self.publicBouncedConfig = publicBouncedConfig
    self.$nextTick(() => {
      self.$children
        .find((item) => item.name === 'holdOrderDialog')
        .openConfirm()
    })
    self.btnConfig.loading = false
  }
  //取消hold单处理
  cancelHoldOrderHandler(self, ids) {
    let idArr = []
    idArr = idArr.concat(ids.map((it) => it.ID))
    commonUtils.modalShow(
      self,
      'e1',
      'orderCenter.manualUnHoldOrder',
      { ids: idArr },
      'all',
      function (res) {
        if (res.data.code === 0) {
          commonUtils.msgTips(self, 'sucess', res.data.message)
          self.autoRefresh()
        }
      }
    )
    self.btnConfig.loading = false
  }

  //开票通知处理
  invoiceNoticeHandler(self, fromdata) {
    self.service.orderCenter.checkAddOrderInvoicing(fromdata).then((res) => {
      if (res.data.code === 0) {
        let extendObj = {
          highSearchData: JSON.stringify({
            type: 'Input',
            queryName: 'ID',
            value: res.data.data.join(),
          }),
          isOrder: 'ture',
        }
        commonUtils.navigateMain(
          -1,
          'TabOpen',
          'invoiceNoticetAdd',
          'panel_label.billingNoticeEdit',
          extendObj
        )
      } else {
        self.$Message.warning(res.data.message)
      }
      self.btnConfig.loading = false
    })
  }
  //发票记录处理
  invoiceRecordHandler(self, fromdata) {
    self.service.orderCenter.checkRecordInvoicing(fromdata).then((res) => {
      if (res.data.code === 0) {
        self.publicBouncedConfig = Object.assign(
          DialogConfig.config().makeOutInvoiceConfig,
          { componentData: res.data.data }
        )
        setTimeout(() => {
          self.$children
            .find((item) => item.name === 'makeOutInvoice')
            .openConfirm()
        }, 100)
      } else {
        self.$Message.warning(res.data.message)
      }
      self.btnConfig.loading = false
    })
  }
  //取消订单处理
  cancelOrderHandler(self, ids) {
    let params = { ids, type: '1' }
    if (BtnConfig.singleType == 1) {
      commonUtils.modalShow(
        self,
        'e0',
        'orderCenter.cancelOrder',
        params,
        'all',
        function (res) {
          if (res.data.code === 0) {
            commonUtils.msgTips(self, 'sucess', res.data.message)
            self.load()
          }
        }
      )
    } else {
      commonUtils.modalShow(self, 'e0', 'orderCenter.cancelOrder', params)
    }
  }
  //订单拦截处理
  interceptOrderHandler(self, ids) {
    if (BtnConfig.singleType == 1) {
      commonUtils.serviceHandler(
        self,
        'orderCenter.orderInterception',
        { ids },
        'all',
        function (res) {
          if (res.data.code === 0) {
            self.$Message.success(res.data.message)
            self.autoRefresh()
          }
        }
      )
    } else {
      commonUtils.serviceHandler(self, 'orderCenter.orderInterception', { ids })
    }
  }
  //取消订单拦截
  cancelInterceptionHandler(self, ids) {
    commonUtils.serviceHandler(
      self,
      'orderCenter.cancelInterception',
      { ids: ids },
      'all',
      function (res) {
        if (res.data.code === 0) {
          self.$Message.success(res.data.message)
          self.autoRefresh()
        }
      }
    )
  }
  //扫描入库处理
  scanIncomingHandler(self, ids) {
    commonUtils.serviceHandler(
      self,
      'orderCenter.getScanIncomingInfo',
      { ids: ids },
      'all',
      function (res) {
        if (res.data.code === 0) {
          commonUtils.navigateMain(
            -1,
            'TabOpen',
            'scanIn',
            'panel_label.scannAndWarehous',
            { returnId: recordID, isOrderHrefReturn: 'order' }
          )
        } else {
          commonUtils.msgTips(self, 'warning', 'k4') // "此退换单状态不允许扫描入库,请重新选择!"
        }
      }
    )
  }
  //订单拆分处理
  splitOrderHandler(self, selection) {
    if(selection.length>1){
      commonUtils.msgTips(self, 'warning' ,'b4');
      return;
    }
    let selectItem = selection[0]
    self.service.orderCenter
      .checkManualSplit({ orderId: selectItem.ID })
      .then((res) => {
        console.log(res);
        if(res.data.code == 0){
          commonUtils.navigateMain(selectItem.ID,'TabOpen','MANUAL_SPLIT','panel_label.orderSplit')
        };
      })
  }
  // 合并订单  (不要动！！！)
  mergeOrderHandler(self, selection) {
    // 判断勾选订单信息是否一致
    const selectionOne = selection[0];
    const agreement = selection.every(item => item.CP_C_PHY_WAREHOUSE_ENAME === selectionOne.CP_C_PHY_WAREHOUSE_ENAME
      && item.ORDER_TYPE === selectionOne.ORDER_TYPE // 订单类型
      && item.CP_C_SHOP_TITLE === selectionOne.CP_C_SHOP_TITLE //店铺
      && item.PAY_TYPE === selectionOne.PAY_TYPE //支付方式
      && item.RECEIVER_ADDRESS_UNION === selectionOne.RECEIVER_ADDRESS_UNION) //收货人信息
    if (!agreement) {
      commonUtils.msgTips(self, 'warning', 'fs'); // 订单信息不一致,不允许合并!
      return;
    }
    // 状态判断提示
    let tips;
    for (let index = 0; index < selection.length; index++) {
      const item = selection[index];
      if (item.ORDER_STATUS !== 1) { // 要合并的单据的订单状态只能为待审核
        tips = 'e7';
        break;
      }
      if (item.ORDER_TAG.some(item => item.text === "hold")) {// '订单已经被HOLD，不允许合并！'
        tips = 'ft';
        break;
      }
      if (item.ORDER_TAG.some(item => item.text === "时")) {// '订单为时效订单，不允许进行合并！'
        tips = 'fu';
        break;
      }
      if (item.ORDER_TYPE !== '预售订单' && item.PAY_STATUS !== '全部付款') {  // '非预售' && '预售尾款已付'
        tips = 'fw';
        break;
      }
      if (selection.length > 50) {// '合并订单最大支持合并50单!'
        tips = 'fv';
      }
    }
    if (tips) {
      commonUtils.msgTips(self, 'warning', tips);
      return;
    }
    const param = {
      IDS: selection.map(val => val.ID)
    }
    // 确认将选中的订单合并吗？
    commonUtils.modalShow(self, 'fz', 'orderCenter.mergeOrderOne', param, 'all', function (res) {
      let { data } = res;
      if (data.code === 0) {
        self.$Message.success(data.message || '成功！');
        self.query();
      }
    })
  }
  // 取消合并订单 (不要动！！！)
  cancelMergeOrderHandler(self, selection) {
    console.log('selection.length:',selection.length);
    if(selection.length === 1){
      for (const item of self.selection) {
        //判断合单状态
        if (!item.IS_MERGE) {
          // 未合并的订单不允许进行取消合并!
          commonUtils.msgTips(self, 'warning', 'fx');
          self.btnConfig.loading = false
          return
        }
        // ['缺货', '待审核', '已审核']
        // 待审核：1；PRD上：仅限制非'待审核'的单据
        // if (!['缺货', '待审核', '已审核'].includes(item.ORDER_STATUS)) {
        if (![1].includes(item.ORDER_STATUS)) {
          // 当前状态异常，不允许操作！
          // commonUtils.msgTips(self, 'warning', 'd9')
          self.$Message.warning('只允许待审核的订单进行取消合并！')
          self.btnConfig.loading = false
          return
        }
      }
    }
    const param = {
      ID_AND_BILL_NO_LIST:selection.map((item)=>({ID:item.ID,BILL_NO:item.BILL_NO}))
    }
    // 确认将选中的订单取消合并吗？
    commonUtils.modalShow(self, 'fy', 'orderCenter.cancelMergeOrder', param, 'all', function (res) {
      let { data } = res;
      console.log(data);
      if(data.code === 0){
        self.$Message.success(data.message || '成功！');
        self.query();
      }else{
        commonUtils.tipShow('confirm' , self , res ,data.message, function(h){
          return h('Table' , {
            props:{
              columns:[
                {
                  title: 'ID',
                  key: 'objid',
                },{
                  title: '单据编号',
                  key: 'objno',
                },{
                  title: '详细信息',
                  key: 'message',
                }
              ],
              data:data.data
            }
          })
        })
      }
    })
  }
  //新增退单处理
  addReturnOrderHandler(self, selection) {
    if (selection.length > 1) {
      commonUtils.msgTips(self, 'warning', 'b6')
    } else {
      let orderDetails = selection[0]
      // 已取消，系统作废, // “待分配”、“待审核”、“缺货”、“已审核”、“传WMS中”、“配货中
      if ([7, 8, 1, 2, 3, 4, 50, 21].includes(orderDetails.ORDER_STATUS)) {
        let tips = [7, 8].includes(orderDetails.ORDER_STATUS) ? 'b7' : 'b8'
        let fixTips = `${orderDetails.ID}${$i18n.t(`modalTips.${tips}`)}`
        commonUtils.msgTips(self, 'warning', fixTips, 2)
      } else if ([5, 6].includes(orderDetails.ORDER_STATUS)) {
        commonUtils.msgTips(self, 'warning', 'h2') // "订单状态为仓库发货和平台发货才能新增退单!"
      } else {
        let extendObj = {
          orderHrefReturnid: orderDetails.ID,
          isOrderHrefReturn: 'order',
        }
        commonUtils.navigateMain(
          -1,
          'TabOpen',
          'returngood',
          'panel_label.addReturnOrder',
          extendObj
        )
      }
    }
  }
  //缺货重新占单处理
  outOfStockReOpeningHandler(self, ids) {
    if (BtnConfig.singleType) {
      commonUtils.serviceHandler(
        self,
        'orderCenter.queryshortagSearchOrder',
        { ids },
        'all',
        function (res) {
          if (res.data.code === 0) {
            self.$Message.success(res.data.message)
            self.autoRefresh()
          }
        }
      )
    } else {
      commonUtils.serviceHandler(self, 'orderCenter.queryshortagSearchOrder', {
        ids,
      })
    }
  }

  //福袋缺货重新占单处理
  fortuneBagReOpeningHandler(self, ids) {
    if (BtnConfig.singleType) {
      commonUtils.serviceHandler(
        self,
        'orderCenter.queryFortuneBagShortage',
        { ids },
        'all',
        function (res) {
          if (res.data.code === 0) {
            self.$Message.success(res.data.message)
            self.autoRefresh()
          }
        }
      )
    } else {
      commonUtils.serviceHandler(self, 'orderCenter.queryFortuneBagShortage', {
        ids,
      })
    }
  }
  //备注导入处理
  noticeImport() {
    const _this = BtnConfig.target
    _this.importTable.componentData = {
      tableName: 'OUT_OF_STOCK_MEMO',
    }
    _this.importTable.confirmTitle = $i18n.t('btn.note_import')
    _this.$children.find((item) => item.name === 'importTable').openConfirm()
  }
  //变更发货平台处理
  changeShipmentPlatformHandler(self, ids) {
    commonUtils.serviceHandler(self, 'orderCenter.doManualDeliveryOrder', {
      ids,
    })
  }
  //批量退单处理
  batchReturnOrderHandler(self, selection) {
    let tips = selection.length > 80 ? 'f5' : ''
    tips = selection.map((item) => {
      if (![5, 6].includes(item.ORDER_STATUS)) {
        return 'ew'
      }
    })
    if (tips.length) {
      commonUtils.msgTips(self, 'warning', tips)
    }
  }
  //手动入库处理;
  virtualWarehouseLibraryWarnHandler(self, ids) {
    commonUtils.modalShow(
      self,
      'k2',
      'orderCenter.virtualWarehouseStorage',
      { ids },
      'all',
      function (res) {
        if (res.data.code === 0) {
          commonUtils.msgTips(self, 'sucess', res.data.message)
          self.getList(self.statusTab)
        } else {
          const err = res.data.message || $i18n.t('modalTips.l9') // 虚拟仓库入库失败！
          let renderInfo = {
            props: {
              columns: [
                {
                  title: 'id',
                  key: 'objid',
                },
                {
                  title: '报错信息',
                  key: 'message',
                },
              ],
              data: res.data.data,
            },
          }
          this.$Modal.confirm({
            title: err,
            render: (h) => h('Table', renderInfo),
          })
        }
      }
    )
  }
  //释放库存处理
  releaseInventoryHandler(self, ids) {
    self.selection.forEach((item) => {
      if (item.ORDER_STATUS != 1) {
        commonUtils.msgTips(self, 'warning', 'c3')
        return
      }
    })
    self.btnConfig.loading = true
    let params = { ids }
    commonUtils.modalShow(self, 'c4', 'releaseInventory', params)
  }
  //额外退款处理
  refundPriceHandler(self, data) {
    if ([5, 6].includes(data.orderStatus)) {
      let extendObj = { oid: data.ID, fromOrder: true, new: true }
      commonUtils.navigateMain(
        -1,
        'TabOpen',
        'EXTRAREFUND',
        'panel_label.extraRefundEdit',
        extendObj
      )
    } else {
      commonUtils.msgTips(self, 'warning', 'h1') // "只有仓库发货或者平台发货的订单才能操作!"
    }
  }
  //修改地址
  orderUpdateAddressHandler(self, selection) {
    let tips = ''
    if (selection.ORDER_STATUS === 3) {
      tips = 'g8' // 订单状态已审核，建议反审核再修改地址
    } else if (![1, 2, 3, 4].includes(selection.ORDER_STATUS)) {
      tips = 'g9' // "订单状态非未确认、缺货、已审核、配货中，不允许修改地址"
    }

    if (tips) {
      commonUtils.msgTips(self, 'warning', tips)
      return
    }
    let params = { ID: self.objId, isShowPii: true }
    commonUtils.serviceHandler(
      self, 'orderCenter.getDetail', params, 'all',
      function (res) {
        if (res.data && res.data.code === 0) {
          const order = res.data.data
          let tempObj = (({
            BUYER_MESSAGE,
            SELLER_MEMO,
            SYSREMARK,
            CP_C_REGION_PROVINCE_ID,
            CP_C_REGION_CITY_ID,
            CP_C_REGION_AREA_ID,
            RECEIVER_ADDRESS,
            RECEIVER_NAME,
            RECEIVER_MOBILE,
            RECEIVER_PHONE,
            RECEIVER_ZIP,
          }) => ({
            BUYER_MESSAGE,
            SELLER_MEMO,
            SYSREMARK,
            CP_C_REGION_PROVINCE_ID,
            CP_C_REGION_CITY_ID,
            CP_C_REGION_AREA_ID,
            RECEIVER_ADDRESS,
            RECEIVER_NAME,
            RECEIVER_MOBILE,
            RECEIVER_PHONE,
            RECEIVER_ZIP,
          }))(order)

          self.dialogs.address.data = {
            ID: self.tab1.order.ID || -1,
            OLDRECEIVERADDRESS: order.ORDER_ADDRESS,
            CALLBACK: '',
            ck: order.PLATFORM,
            ...tempObj,
          }
          if (self.$refs.addressDialog) {
            self.$refs.addressDialog[0].openConfirm()
          }
        } else {
          self.tab1 = self.tab1_default
          commonUtils.msgTips(self, 'error', 'h0') // 地址信息获取失败
        }
      }
    )
  }

  // 导出校验
  exportClickHandler(self, selection) {
    let list = selection.length > 0 ? selection : self.agTableConfig.rowData
    this.exportChange(self, list)
  }

  // 导出
  exportChange(self, list = []) {
    if (self.isExport) {
      // 有一项导出正在进行中
      commonUtils.msgTips(self, 'warning', 'f8')
    } else {
      self.isExport = true
      const fromdata = new FormData()
      if (list.length) {
        const idList = { idList: list.map((item) => item.ID) }
        fromdata.append('param', JSON.stringify(idList))
      } else {
        const param = {
          page: {
            pageSize: 999999,
            pageNum: 1,
          },
          label: self.labelData, // 标签
          queryInfo: self.queryInfoData, // 普通搜索
          status: self.statusData,
          highSearch: self.highSearchData,
          sort: self.sort,
        }
        // 零售发货单列表tab 区分审核失败/多次缺货类型订单查询
        // '审核失败'
        if (self.statusData.label == $i18n.t('other.auditError')) {
          param.status = { label: '待审核', value: '1', isShow: true }
          // '多次缺货'
        } else if (
          this.statusData.label == $i18n.t('other.multipleOutOfStock')
        ) {
          param.status = { label: '缺货', value: '2', isShow: true }
        }
        param.lackstockOrAudit = self.statusData.value
        fromdata.append('param', JSON.stringify(param))
      }
      commonUtils.serviceHandler(self, 'orderCenter.exportOcBOrder', fromdata, 'part',
        function (res) {
          DialogConfig.config().downloadUrlFile(res.data.data)
        }
      )
      self.isExport = false
    }
  }
  //退货导出
  tuihuoExportClickHandler(self, list = []) {
    if (self.isExport) {
      // 有一项导出正在进行中
      commonUtils.msgTips(self, 'warning', 'f8')
    } else {
      self.isExport = true
      const fromdata = new FormData()
      if (list.length) {
        const idList = { idList: list.map((item) => item.ID) }
        fromdata.append('param', JSON.stringify(idList))
      } else {
        const param = {
          start: self.agTableConfig.pagenation.current,
          count: 999999,
          RETURN_STATUS: self.status ?? '',
        }
        const fromdata = new FormData()
        fromdata.append('param', JSON.stringify(param))
      }
      commonUtils.serviceHandler(
        self,
        'orderCenter.exportReturnOrder',
        fromdata,
        'part',
        function (res) {
          DialogConfig.config().downloadUrlFile(res.data.data)
        }
      )
      self.isExport = false
    }
  }
  //修改备注;
  updateRemarkHandler(self, data) {
    let ids = [data.ID]
    self.publicBouncedConfig = DialogConfig.config().changeRemarkConfig
    self.publicBouncedConfig.confirmTitle = self.btnConfig.buttons.find(
      (item) => item.webname === 'updateremark'
    ).text
    self.publicBouncedConfig.componentData = { ids, status: data.ORDER_STATUS }
    setTimeout(() => {
      self.$children.find((item) => item.name === 'changeRemark').openConfirm()
    }, 100)
  }
  //修改仓库;
  updateStoreHandler(self, data) {
    let tempObj = { ids: [data.ID], CP_C_SHOP_ID: data.CP_C_SHOP_ID }
    const fromdata = new FormData()
    fromdata.append('ids', tempObj.ids)
    commonUtils.serviceHandler(
      self,
      'orderCenter.checkOrderBeforeWarehouse',
      fromdata,
      'all',
      function (res) {
        if (res.data.code === 0) {
          self.publicBouncedConfig = DialogConfig.config().changeWarehouseConfig
          self.publicBouncedConfig.componentData = tempObj
          setTimeout(() => {
            self.$children
              .find((item) => item.name === 'changeWarehouse')
              .openConfirm()
          }, 100)
        } else {
          commonUtils.tipShow('error', self, res)
        }
      }
    )
  }
  //修改物流
  revisingUpdateHandler(self, data) {
    let tempObj = {
      ids: [data.ID],
      cLogisticsId: 0,
      platform: data.PLATFORM,
      CP_C_PHY_WAREHOUSE_ID: data.CP_C_PHY_WAREHOUSE_ID,
    }
    const fromdata = new FormData()
    fromdata.append('ids', tempObj.ids)
    commonUtils.serviceHandler(
      self,
      'orderCenter.checkOrderBeforeLogistics',
      fromdata,
      'all',
      function (res) {
        if (res.data.code === 0) {
          self.publicBouncedConfig = DialogConfig.config().modifyLogisticsConfig
          self.publicBouncedConfig.componentData = tempObj
          setTimeout(() => {
            self.$children
              .find((item) => item.name === 'modifyLogistics')
              .openConfirm()
          }, 100)
        } else {
          commonUtils.tipShow('error', self, res)
        }
      }
    )
  }

  // 返回
  back(moduleName, id, labelName) {
    const self = BtnConfig.target
    self.$comUtils.tabCloseAppoint(self)
    commonUtils.navigateMain(id, 'TabHref', moduleName, labelName)
  }

  //设置处理
  setupHandler() {
    const self = BtnConfig.target
    self.modal = true //最新筛选排序组件
  }

  // 手工 重传WMS
  wmsCreateHandler(self, data) {
    let ids = Array.isArray(data) ? data.map(i => i.ID) : data
    let result = ids.length > 1 ? { IDS: ids } : { ID: ids[0] }
    commonUtils.modalShow(
      self,
      'gb',
      'orderCenter.createReturnOrderToWms',
      result,
      'all',
      function (res) {
        if (res.data.code === 0) {
          self.$Message.success(res.data.message)
          self.selection = []
          self.query()
        } else {
          if (res.data.data) {
            let tabData = res.data.data.map((row, index) => {
              row.INDEX = ++index
              row.BILL_NO = row.billNo
              row.RESULT_MSG = row.message
              return row
            })
            commonUtils.tipShow(
              'confirm',
              self,
              res,
              res.data.message,
              function (h) {
                return h('Table', {
                  props: {
                    columns: [
                      {
                        title: '序号',
                        key: 'INDEX',
                      },
                      {
                        title: '单据编号',
                        key: 'BILL_NO',
                      },
                      {
                        title: '失败原因',
                        key: 'RESULT_MSG',
                      },
                    ],
                    data: tabData,
                  },
                })
              }
            )
          }
        }
      });
  }
  
  // 手工 WMS撤回重做
  wmsWithdrawHandler(self, id) {
    if (id.length > 1) {
      commonUtils.msgTips(self, 'warning', '只支持单个退货单做WMS撤回重做操作！', 2)
      return
    }
    self.service.orderCenter.cancelReturnOrderFromWms({ ID: id[0] }).then((res) => {
      if (res.data.code === 0) {
        self.$store.commit('global/tabOpen', {
          type: 'V',
          tableName: 'OC_B_RETURN_ORDER_VIRTUAL_TABLE',
          tableId: 10728,
          id: id[0],
        })
      }
    })
  }
}

export default BtnConfig
