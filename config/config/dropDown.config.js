//定制下拉菜单按钮配置类
import commonUtils from './commonUtils'
// import publicDialogConfig from 'professionalComponents/common/js/publicDialog'

import DialogConfig from 'burgeonConfig/config/dialogs.config';
class DropDownConfig {
  static target;
  //是否单对象界面: 0否1是;
  static singleType = 0;

  constructor() { }
  static configHandler(val, singleType = 0, eventList = []) {
    let self = DropDownConfig.target
    this.singleType = singleType
    switch (val) {
      case 'OC_ORDER_SEND_TIME': { // 修改预计发货时间
        this.dropDownMainHandler('OC_ORDER_SEND_TIME')
        break
      }
      case 'manualReturnCreation': {
        // commonUtils.navigateMain(-1, 'TabOpen', 'OC_B_RETURN_ORDER_VIRTUAL_TABLE', 'panel_label.addReturnOrder')
        R3.store.commit('global/tabOpen', {
          type: 'C',
          label: $i18n.t('menu.b0'), // 退货单新增
          customizedModuleName: 'OC_B_RETURN_ORDER_VIRTUAL_TABLE',
          customizedModuleId: 'New',
        })
        break
      }
      case 'ORDER_COPY_CANCELED_ORDER': {
        this.canceledOrderCopyHander()
        break
      }
      case 'ORDER_COPY_AF_SALE': {
        this.afterSaleCopyHander()
        break
      }
      case 'manualCreation': {
        this.manualCreationHander()
        break
      }
      case 'Newly added': {
        this.newOrderHander()
        break
      }

      case 'OcBOrderImportCmd': {
        this.cmdOrderImportHandler()
        break
      }
      case 'Revising Logistics': {
        this.dropDownMainHandler('modifyLogistics')
        break
      }
      case 'Modify warehouse': {
        this.dropDownMainHandler('modifyWarehouse')
        break
      }
      case 'Amendment Notes': {
        this.dropDownMainHandler('modifyNotes')
        break
      }
      case 'OrderDeliveryFirst': {
        // 定金预售提前发货
        this.dropDownMainHandler('orderDelivery')
        break
      }
      case 'OrderDeliveryUrgent': {
        this.dropDownMainHandler('orderDeliveryUrgent')
        break
      }
      case 'order_gh': {
        this.dropDownMainHandler('replaceProduct')
        break
      }
      case 'ORDER_ADD_GOODS': {
        //添加商品
        this.ORDER_ADD_GOODS()
        break
      }
      case 'ORDER_DELETE_GOODS': {
        //删除赠品
        this.ORDER_DELETE_GOODS()
        break
      }
      case 'ORDER_REPLACE_BELONGS_GOODS': {
        //批量替换下卦赠品
        this.ORDER_REPLACE_BELONGS_GOODS()
        break
      }
      case 'Adding gifts': {
        this.dropDownMainHandler('addGifts')
        break
      }
      case 'Delete_Merchandise': {
        this.dropDownMainHandler('deleteProduct')
        break
      }
      case 'appointSplit': {
        this.appointSplitHandler()
        break
      }
      case 'shortageSplit': {
        this.dropDownMainHandler('shortageSplit')
        break
      }
      case 'Drop-out copy':
      case 'OrderWrongCopy':
      case 'OrderMissSendCopy':
      case 'OrderGiftsOutCopy':
      case 'oriInvalidCopy': {
        this.dropDownMainHandler(val, singleType)
        break
      }
      case 'holdOrder': {
        this.dropDownMainHandler('holdOrder')
        break
      }
      case 'cancelHoldOrder': {
        this.dropDownMainHandler('cancelHoldOrder')
        break
      }

      default:
        eventList.some((item) => {
          item.webname == val && eval(item.btnclick)()
          // if(item.webname==val){
          //   ;
          //   return true;
          // }
        })
        break
    }
  }

  static modifyPreDate(selectData, type) {
    let self = DropDownConfig.target
    let flag = false;
    for (const it of selectData) {
      if (![1,2].includes(it.ORDER_STATUS)) {
        flag = true;
        break
      }
    }
    if (flag) {
      self.$Message.warning('非缺货、待审核订单不允许修改预计发货时间！');
      self.btnConfig.loading = false
      return
    } else {
      const IDS = selectData.map((item) => item.ID);
      this.successHandler(IDS, type, '', 'modifyPreDate')
    }
  }

  static async canceledOrderCopyHander() {
    let self = DropDownConfig.target
    if(!self.vueAgTable){
      self.selection = self.$refs.agGridChild.AGTABLE.getSelect();
    }
    if (self.selection.length != 1) {
      self.$OMS2.omsUtils.msgTips(self, 'warning', 'jw'); // 请选择需要复制的单据
      return
    }
    const IDS = self.$OMS2.omsUtils.sonList(self.selection, 'ID')
    const { data: { code, data, message } } = await self.service.orderCenter.billOcBOrderCopy({
      IDS,
      TYPE: 1,
      COPY_REASON_TYPE: 0,
    })
    if (code == 0) {
      self.$store.commit('customize/TabOpen', {
        id: 2307,
        type: 'action',
        name: 'OC_B_ORDER_VIRTUAL_TABLE',
        label: $i18n.t('panel_label.add_retail_shipping_order'), // 零售发货单新增
        query: Object.assign({
          copyType: 1,
          sourceId: self.selection[0].ID,
        }),
      })
    } else {
      console.log(message)
    }
  }

  static ORDER_REPLACE_BELONGS_GOODS() {
    // 替换下挂赠品
    let self = DropDownConfig.target
    self.publicBouncedConfig = JSON.parse(
      JSON.stringify(DialogConfig.config().pushProduceConfig)
    )
    if(!self.vueAgTable){
      self.selection = self.$refs.agGridChild.AGTABLE.getSelect();
    }
    if (self.selection.length < 1) {
      self.$OMS2.omsUtils.msgTips(self, 'warning', 'd8')
      return
    }

    if (self.selection[0].ORDER_STATUS == 2 || self.selection[0].ORDER_STATUS == 1) { 
      self.publicBouncedConfig.name = 'addGiftDialog'
      self.publicBouncedConfig.url = 'modal/orderCenter/addGiftItem'
      self.publicBouncedConfig.confirmTitle = $i18n.t('modalTitle.ah') // 批量替换下挂商品
      self.publicBouncedConfig.componentData = {
        data: self.selection,
        type: 'replace',
      }
      self.publicBouncedConfig.width = 800
  
      setTimeout(() => {
        self.$children.find((item) => item.name === 'addGiftDialog').openConfirm()
      }, 100)
    }else{
     self.$OMS2.omsUtils.msgTips(self, 'warning', 'kf')
      return
    }
  
  }

  static ORDER_DELETE_GOODS() {
    //批量删除
    let self = DropDownConfig.target
    self.publicBouncedConfig = JSON.parse(
      JSON.stringify(DialogConfig.config().pushProduceConfig)
    )
    if(!self.vueAgTable){
      self.selection = self.$refs.agGridChild.AGTABLE.getSelect();
    }
    if (self.selection.length < 1) {
      self.$OMS2.omsUtils.msgTips(self, 'warning', 'd8')
      return
    }

    if (self.selection[0].ORDER_STATUS == 2 || self.selection[0].ORDER_STATUS == 1) { 
      self.publicBouncedConfig.name = 'addGiftDialog'
      self.publicBouncedConfig.url = 'modal/orderCenter/addGiftItem'
      self.publicBouncedConfig.confirmTitle = $i18n.t('btn.deleteGift') // 删除赠品
      self.publicBouncedConfig.componentData = {
        data: self.selection,
        type: 'del',
      }
      self.publicBouncedConfig.width = 800
  
      setTimeout(() => {
        self.$children.find((item) => item.name === 'addGiftDialog').openConfirm()
      }, 100)
    }else{
      self.$OMS2.omsUtils.msgTips(self, 'warning', 'jx'); // 只允许缺货或待审核状态的订单进行添加！
      return
    }
   
  }

  static ORDER_ADD_GOODS() {
    //添加赠品
    let self = DropDownConfig.target
    self.publicBouncedConfig = JSON.parse(
      JSON.stringify(DialogConfig.config().pushProduceConfig)
    )

    if(!self.vueAgTable){
      self.selection = self.$refs.agGridChild.AGTABLE.getSelect();
    }
    if (self.selection.length < 1) { //
      self.$OMS2.omsUtils.msgTips(self, 'warning', 'd8')
      return
    }
    if (self.selection[0].ORDER_STATUS == 2 || self.selection[0].ORDER_STATUS == 1) { //
      self.publicBouncedConfig.name = 'addGiftDialog'
    self.publicBouncedConfig.url = 'modal/orderCenter/addGiftItem'
    self.publicBouncedConfig.confirmTitle = $i18n.t('btn.addGift') // 添加赠品

    self.publicBouncedConfig.componentData = {
      data: self.selection,
      type: 'add',
    }

    self.publicBouncedConfig.width = 800
    setTimeout(() => {
      self.$children.find((item) => item.name === 'addGiftDialog').openConfirm()
    }, 100)
    }else{
      self.$OMS2.omsUtils.msgTips(self, 'warning', 'kf')
      return
    }
  }

  static async afterSaleCopyHander() {
    let self = DropDownConfig.target
    if(!self.vueAgTable){
      self.selection = self.$refs.agGridChild.AGTABLE.getSelect();
    }
    if (self.selection.length != 1) {
      self.$OMS2.omsUtils.msgTips(self, 'warning', 'jw')
      return
    }
    const IDS = self.$OMS2.omsUtils.sonList(self.selection, 'ID')
    const { data: { code, data, message } } = await self.service.orderCenter.billOcBOrderCopy({
      IDS,
      TYPE: 2,
      COPY_REASON_TYPE: 1,
      cause: '售后复制按钮点击校验',
    })
    if (code == 0) {
      self.publicBouncedConfig.name = 'ORDER_COPY_AF_SALE'
      self.publicBouncedConfig.url = 'modal/orderCenter/afterSaleCopy'
      self.publicBouncedConfig.confirmTitle = $i18n.t('modalTitle.ag') // 售后复制
      self.publicBouncedConfig.componentData = { id: self.selection[0].ID }
      self.publicBouncedConfig.width = 400
      setTimeout(() => {
        self.$children
          .find((item) => item.name === 'ORDER_COPY_AF_SALE')
          .openConfirm()
      }, 100)
    } else {
      console.log(message)
    }
  }

  static manualCreationHander() {
    let self = DropDownConfig.target
    self.$store.commit('global/tabOpen', {
      type: 'C',
      customizedModuleName: 'OC_B_ORDER_VIRTUAL_TABLE',
      label: $i18n.t('panel_label.add_retail_shipping_order'), // 零售发货单新增
      customizedModuleId: 'New',
    })
  }
  //新增订单处理
  static newOrderHander() {
    R3.store.commit('global/tabOpen', {
      type: 'C',
      label: $i18n.t('panel_label.add_retail_shipping_order'), // 零售发货单新增
      customizedModuleName: 'orderManageAdd',
      customizedModuleId: '-1',
    })
  }

  //框架导入处理
  static cmdOrderImportHandler() {
    let self = DropDownConfig.target
    self.$children.find((item) => item.name === 'importTable').openConfirm()
  }

  static dropDownMainHandler(type, ...singleType) {
    /**
     * 1、根据传入的type判断具体走那个方法以及传入什么参数
     * 2、switch case 结束后统一做 当前是否有选中行的判断
     * 3、根据paramsType统一处理入参：
     *    1. paramsType：=1，入参仅传ids数组（eg.[9528,12]）
     *    2. paramsType：=2，入参为FormData格式类型的ids
     *    3. paramsType：=3，？
     *    4. paramsType：=4，入参为选中的数据的所有信息
     */
    let funName, tips, paramsType
    switch (type) {
      case 'OC_ORDER_SEND_TIME':
        funName = 'modifyPreDate'
        tips = 'd8'
        paramsType = 4
        break
      case 'modifyLogistics':
        funName = 'modifyLogisticsHandler'
        tips = 'c6'
        paramsType = 4
        break
      case 'modifyWarehouse':
        funName = 'modifyWarehouseHandler'
        tips = 'c7'
        paramsType = 4
        break
      case 'modifyNotes':
        funName = 'modifyNotesHandler'
        tips = 'c8'
        paramsType = 1
        break
      case 'orderDelivery':
        funName = 'orderDeliveryHandler'
        tips = 'c9'
        paramsType = 1
        break

      case 'Drop-out copy':
      case 'OrderWrongCopy':
      case 'OrderMissSendCopy':
      case 'OrderGiftsOutCopy':
      case 'oriInvalidCopy': {
        funName = 'copyRouteChangeHandler'
        tips = 'a1'
        paramsType = 4
        break
      }
      case 'orderDeliveryUrgent':
        funName = 'orderDeliveryUrgentHandler'
        tips = 'd0'
        paramsType = 1
        break
      case 'replaceProduct':
        funName = 'replaceProductHandler'
        tips = 'dq'
        paramsType = 4
        break
      case 'addGifts':
        funName = 'addGiftsHandler'
        tips = 'd2'
        paramsType = 1
        break
      case 'deleteProduct':
        funName = 'deleteProductHandler'
        tips = 'd3'
        paramsType = 1
        break
      case 'holdOrder':
        funName = 'holdOrderHandler'
        tips = 'e2'
        paramsType = 4
        break

      case 'shortageSplit':
        funName = 'shortageSplitHandler'
        tips = 'd4'
        paramsType = 3
        break
      case 'cancelHoldOrder':
        funName = 'cancelHoldOrderHandler'
        tips = 'd5'
        paramsType = 4
        break
    }
    const self = DropDownConfig.target
    if (self.selection.length > 0) {
      self.btnConfig.loading = true
      const ids = commonUtils.sonList(self.selection, 'ID')
      let myData
      switch (paramsType) {
        case 1:
          myData = ids
          break
        case 2:
          const fromdata = new FormData()
          fromdata.append('ids', ids)
          myData = fromdata
          break
        case 3:
          self.selection.forEach((item, index) => {
            if (item.PLATFORM === 50) {
              commonUtils.msgTips(self, 'warning', 'ex')
              self.btnConfig.loading = false
            }
          })
          break
        case 4:
          myData = self.selection
          break
      }
      this[funName](myData, type)
    } /* else if (singleObjType) {
      //是否新增或详情界面
      myData = this.tab1.order;
      this[funName](myData, type);
    } */ else {
      commonUtils.msgTips(self, 'warning', tips)
      self.btnConfig.loading = false
    }
  }

  /**
   * 请求主体处理
   * @funName {String} 方法名/service下对应的key
   * @params {*} params 接口入参
   * @tableType {String} 组件名
   */
  static serviceHandler(funName, params, tableType) {
    let self = DropDownConfig.target
    self.service.orderCenter[funName](params)
      .then((res) => {
        if (res.data.code === 0) {
          let objName, propertyName
          switch (tableType) {
            case 'modifyLogistics':
              objName = 'modifyLogisticsConfig'
              propertyName = 'CP_C_PHY_WAREHOUSE_ID'
              params.CP_C_PHY_WAREHOUSE_ID = res.data.data
              break
            case 'changeWarehouse':
              objName = 'changeWarehouseConfig'
              propertyName = 'CP_C_SHOP_ID'
              // 接口返回店铺ID，用于查询可选的仓库列表
              params.CP_C_SHOP_ID = res.data.data
              break
          }
          this.successHandler(params, objName, propertyName, tableType)
        } else {
          commonUtils.tipShow('error', self, res)
        }
      })
      .finally(() => {
        self.btnConfig.loading = false
      })
  }

  /**
   * 打开弹窗处理（主要是处理一下要传给弹窗的数据）
   * @param {Array } ids 
   * @param {String} objName （burgeon-business-components/common/js/publicDialog.js）dialogs.config.js下对应的key
   * @param {String} componentDataType 用于判断要填充给什么子组件（弹窗里的哪个组件）的componentData
   * @param {String} tableType 组件名
   */
  static successHandler(ids, objName, componentDataType, tableType) {
    let self = DropDownConfig.target
    self.publicBouncedConfig = JSON.parse(
      JSON.stringify(DialogConfig.config()[objName])
    )
    let componentDataObj = {}

    switch (componentDataType) {
      case 'CP_C_PHY_WAREHOUSE_ID':
      case 'CP_C_SHOP_ID':
        componentDataObj = ids
        break
      case 'ORDER_STATUS':
        componentDataObj = {
          ids,
          status: commonUtils.sonList(self.selection, componentDataType),
        }
        break
      case 'deposit':
      case 'vip':
        componentDataObj = {
          params: {
            ids,
          },
          pageType: componentDataType,
        }
        break
      case 'product':
        const data = typeof self.queryData == 'function' ? self.queryData() : {}; // 零售发货单-指定商品拆
        let param = {
          page: {
            pageSize: self.agTableConfig.pagenation.pageSize,
            pageNum: self.agTableConfig.pagenation.current,
          },
          label: self.labelData, // 标签
          queryInfo: self.queryInfoData, // 普通搜索
          status: self.statusData,
          highSearch: self.highSearchData,
        }
        componentDataObj = {
          a_1: param,
          a_2: ids,
          data,
        }
        break
    
      default:
        componentDataObj = {
          ids,
        }
    }

    // 表单筛选条件
    self.publicBouncedConfig.componentData = componentDataObj
    self.$nextTick(() => {
      self.$children.find((item) => {
        if (item.name === tableType) {
          console.log(item);
        }
        return item.name === tableType
      }).openConfirm()
      self.btnConfig.loading = false
    }, 100)
  }
  //修改物流;
  static modifyLogisticsHandler(rows) {
    let list = []
    const ids = commonUtils.sonList(rows, 'ID')
    list = rows.map((it) => ({ ID: it.ID, BILL_NO: it.BILL_NO }))
    this.serviceHandler(
      'checkOrderBeforeLogistics',
      { IDS: ids, ID_AND_BILL_NO_LIST: list },
      'modifyLogistics'
    )
  }
  //修改仓库
  static modifyWarehouseHandler(rows) {
    let list = []
    const ids = commonUtils.sonList(rows, 'ID')
    list = rows.map((it) => ({ ID: it.ID, BILL_NO: it.BILL_NO }))
    this.serviceHandler(
      'checkOrderBeforeWarehouse',
      { IDS: ids, ID_AND_BILL_NO_LIST: list },
      'changeWarehouse'
    )
  }
  //修改备注
  static modifyNotesHandler(ids) {
    this.successHandler(
      ids,
      'changeRemarkConfig',
      'ORDER_STATUS',
      'changeRemark'
    )
  }
  //现金预售提前发货
  static orderDeliveryHandler(ids) {
    this.successHandler(ids, 'depositPresaleConfig', 'deposit', 'manualMarking')
  }

  //现金预售紧急发货
  static orderDeliveryUrgentHandler(ids) {
    this.successHandler(ids, 'vipSpeedDispatchConfig', 'vip', 'manualMarking')
  }
  //替换商品
  static replaceProductHandler(ids) {
    let self = DropDownConfig.target
    if (ids[0].ORDER_STATUS == 1||ids[0].ORDER_STATUS == 2) {
      this.successHandler(ids, 'replaceConfig', 'product', 'replaceTheGoods')
    }else{
     self.$OMS2.omsUtils.msgTips(self, 'warning', 'kf')
      self.btnConfig.loading = false
      return
    }
    
  }
 
  //删除商品
  static deleteProductHandler(ids) {
    this.successHandler(ids, 'itemDeleteConfig', 'product', 'itemDelete')
  }
  //缺货拆分
  static shortageSplitHandler(ids) {
    let self = DropDownConfig.target
    commonUtils.serviceHandler(self, 'orderCenter.splitOrder', { ids })
  }
  // 指定商品拆单
  static appointSplitHandler() {
    let self = DropDownConfig.target
    let ids;
    if (self.selection.length > 0) {
      // self.btnConfig.loading = true
      ids = commonUtils.sonList(self.selection, 'ID');
    } else {
      ids = [];
    }
    self.service.orderCenter.splitCheckOrder({ orderIds: ids }).then(res => {
      console.log(res);
      if (res.data.code == 0) {
        this.successHandler(
          ids,
          'specifyGoodsAssignConfig',
          'product',
          'specifyGoodsAssign'
        )
      } else {
        // commonUtils.msgTips(self, 'error', res.data.message, 0);
      }
    })

  }
  //hold单处理
  static holdOrderHandler(rows) {
    this.successHandler(rows, 'holdOrderConfig', 'holdOrder', 'holdOrderDialog')
  }
  //取消hold单处理
  static cancelHoldOrderHandler(rows) {
    let self = DropDownConfig.target
    let list = []
    list = rows.map((it) => ({ ID: it.ID, BILL_NO: it.BILL_NO }))
    commonUtils.modalShow(
      self,
      'e1',
      'orderCenter.manualUnHoldOrder',
      { ID_AND_BILL_NO_LIST: list },
      'all',
      function (res) {
        if (res.data.code === 0) {
          commonUtils.msgTips(self, 'success', res.data.message, 2)
          self.selection = []
          self.query()
        } else if (res.data.code == 1 && res.data.data) {
          let tabData = res.data.data.map((row, index) => {
            row.INDEX = ++index
            row.BILL_NO = row.objid
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
                      title: $i18n.t('table_label.serialNo'), // 序号
                      key: 'INDEX',
                    },
                    {
                      title: $i18n.t('form_label.billNo'), // 单据编号
                      key: 'BILL_NO',
                    },
                    {
                      title: $i18n.t('form_label.e0'), // 失败原因
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
    )
    self.btnConfig.loading = false
  }

  // 丢单复制、错发复制、漏发复制、赠品出库复制
  static copyRouteChangeHandler(ids, type = '') {
    const selectItem = Array.isArray(ids) ? ids[0] : ids
    if (ids.length === 1) {
      if (selectItem.COPY_REASON) {
        // 订单只能是原单才能复制
        commonUtils.msgTips(DropDownConfig.target, 'warning', 'a2')
      } else if (
        type === 'oriInvalidCopy' &&
        ![7, 8].includes(selectItem.ORDER_STATUS)
      ) {
        // 原单无效复制
        // 已取消
        // 非已取消或系统作废订单，不允许复制
        commonUtils.msgTips(DropDownConfig.target, 'error', 'a3')
        // 仓库发货
        // 平台发货
      } else if (![5, 6].includes(selectItem.ORDER_STATUS)) {
        // 只能对【仓库发货，平台发货】订单状态的原单进行复制操作
        commonUtils.msgTips(DropDownConfig.target, 'error', 'a4')
      } else {
        // 默认是丢单复制的query
        const query = {
          id: selectItem.ID,
          pageTitle: type,
        }
        // 丢单复制
        let tempParams = type === 'Drop-out copy' ? 'orderCopy' : 'orderCopy'
        let extendObj = {}
        extendObj[tempParams] = true
        commonUtils.navigateMain(
          selectItem.ID,
          'TabOpen',
          type,
          'panel_label.add_retail_shipping_order',
          extendObj
        )
      }
    } else {
      commonUtils.msgTips(DropDownConfig.target, 'warning', 'a5')
    }
  }
}
export default DropDownConfig
