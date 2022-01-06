//定制下拉菜单按钮配置类
import commonUtils from './commonUtils'
// import publicDialogConfig from 'burgeonComponents/common/js/publicDialog'

import DialogConfig from 'burgeonConfig/config/dialogs.config';
class DropDownConfig {
  static target;
  //是否单对象界面: 0否1是;
  static singleType = 0;

  constructor() { }
  static configHandler(val, singleType = 0, eventList = []) {
    let self = DropDownConfig.target
    this.singleType = singleType
    let publicDialogConfig = _.cloneDeep(DialogConfig.config())
    switch (val) {
      /** ------ skx零售列表下拉按钮-start ------ */
      case 'Newly added': {
        // 新增
        R3.store.commit('global/tabOpen', {
          type: 'C',
          label: $it('pL.add_retail_shipping_order'), // 零售发货单新增
          customizedModuleName: 'orderManageAdd',
          customizedModuleId: '-1'
        });
        break;
      }
      case 'Drop-out copy': {
        // 丢单复制
        self.copyRouteChange(val);
        break;
      }
      case 'OcBOrderImportCmd': {
        // 导入
        self.importTable.componentData = { 
          tableName: 'OC_B_ORDER',
          okApi: '/api/cs/oc/oms/v1/importOcBOrder',
          tempApi: '/api/cs/oc/oms/v1/downloadOrderTemp'
        };
        self.$children.find(item => item.name === 'importTable').openConfirm();
        break;
      }
      case 'Revising Logistics': {
        if (self.selection.length > 0) {
          self.btnConfig.loading = true;
          const ids = [];
          const CP_C_PHY_WAREHOUSE_ID = [];
          self.selection.forEach((item, index) => {
            ids[index] = item.ID;
            CP_C_PHY_WAREHOUSE_ID[index] = item.CP_C_PHY_WAREHOUSE_ID;
          });
          const fromdata = new FormData();
          fromdata.append('ids', ids);
          self.service.orderCenter
            .checkOrderBeforeLogistics(fromdata)
            // self.$network
            //   .post('/api/cs/oc/oms/v1/checkOrderBeforeLogistics', fromdata)
            .then(res => {
              if (res.data.code === 0) {
                self.publicBouncedConfig = publicDialogConfig.modifyLogisticsConfig;
                self.publicBouncedConfig.componentData = {
                  ids,
                  cLogisticsId: 0,
                  platform: self.selection[0].PLATFORM,
                  CP_C_PHY_WAREHOUSE_ID: CP_C_PHY_WAREHOUSE_ID[0]
                };
                setTimeout(() => {
                  self.$children.find(item => item.name === 'modifyLogistics').openConfirm();
                }, 100);
              } else {
                self.$Modal.error({
                  title: $it('mT.tips'), // 提示,
                  content: res.data.message,
                  cancelType: true,
                  titleAlign: 'left',
                  mask: true,
                  draggable: true,
                  keyDown: event => {
                    if (event.keyCode == 27 || event.keyCode == 13) {
                      self.$Modal.remove();
                    }
                  }
                });
              }
              self.btnConfig.loading = false;
            });
        } else {
          self.$Message.warning({
            content: $it('tip.c6'), // 请选择需要修改物流记录！
            duration: 5,
            top: 80
          });
        }
        break;
      }
      case 'Modify warehouse': {
        if (self.selection.length > 0) {
          self.btnConfig.loading = true;
          const ids = [];
          const CP_C_SHOP_ID = [];
          self.selection.forEach((item, index) => {
            ids[index] = item.ID;
            CP_C_SHOP_ID[index] = item.CP_C_SHOP_ID;
          });
          const fromdata = new FormData();
          fromdata.append('ids', ids);
          self.service.orderCenter
            .checkOrderBeforeWarehouse(fromdata)
            // self.$network
            //   .post('/api/cs/oc/oms/v1/checkOrderBeforeWarehouse', fromdata)
            .then(res => {
              if (res.data.code === 0) {
                self.publicBouncedConfig = publicDialogConfig.changeWarehouseConfig;
                self.publicBouncedConfig.componentData = {
                  ids,
                  CP_C_SHOP_ID: CP_C_SHOP_ID[0]
                };
                setTimeout(() => {
                  self.$children.find(item => item.name === 'changeWarehouse').openConfirm();
                }, 100);
              } else {
                self.$Modal.error({
                  title: $it('mT.tips'), // 提示,
                  content: res.data.message,
                  cancelType: true,
                  titleAlign: 'left',
                  mask: true,
                  draggable: true,
                  keyDown: event => {
                    if (event.keyCode == 27 || event.keyCode == 13) {
                      self.$Modal.remove();
                    }
                  }
                });
              }
              self.btnConfig.loading = false;
            });
        } else {
          self.$Message.warning({
            content: $it('tip.c7'), // 请选择需要修改发货仓库记录！
            duration: 5,
            top: 80
          });
        }
        break;
      }
      case 'Amendment Notes': {
        if (self.selection.length > 0) {
          const ids = [];
          const ORDER_STATUS = [];
          self.selection.forEach((item, index) => {
            ids[index] = item.ID;
            ORDER_STATUS[index] = item.ORDER_STATUS;
          });
          self.publicBouncedConfig = publicDialogConfig.changeRemarkConfig;
          self.publicBouncedConfig.componentData = {
            ids,
            status: ORDER_STATUS
          };
          setTimeout(() => {
            self.$children.find(item => item.name === 'changeRemark').openConfirm();
          }, 100);
        } else {
          self.$Message.warning({
            content: $it('tip.c8'), // 请选择需要修改备注的记录！
            duration: 5,
            top: 80
          });
        }
        break;
      }
      case 'BacthUpdateInsideRemark': {
        // 批量修改内部备注
        if (self.selection.length === 0) {
          self.$Message.warning('请选择需要修改内部备注的记录!');
        } else {
          const ids = [];
          const ORDER_STATUS = [];
          self.selection.forEach((item, index) => {
            ids[index] = item.ID;
            ORDER_STATUS[index] = item.ORDER_STATUS;
          });
          self.changeInternalRemarksConfig.componentData = {
            ids,
            status: ORDER_STATUS
          };
          self.$children.find(item => item.name === 'changeInternalRemarks').openConfirm();
        }
        break;
      }
      case 'OrderDeliveryFirst': {
        // 定金预售提前发货
        if (self.selection.length === 0) {
          self.$Message.warning({
            content: $it('tip.c9'), // 请选择需要定金预售提前发货的记录！
            duration: 5,
            top: 80
          });
          return;
        }
        const ids = self.selection.map(item => item.ID);
        const publicBouncedConfig = JSON.parse(JSON.stringify(publicDialogConfig.depositPresaleConfig));
        publicBouncedConfig.componentData = {
          params: {
            ids
          },
          pageType: 'deposit'
        };
        self.publicBouncedConfig = publicBouncedConfig;
        self.$nextTick(() => {
          self.$children.find(item => item.name === 'manualMarking').openConfirm();
        });
        break;
      }
      case 'OrderDeliveryUrgent': {
        if (self.selection.length === 0) {
          self.$Message.warning({
            content: $it('tip.d0'), // 请选择需要加急发货的记录！
            duration: 5,
            top: 80
          });
          return;
        }
        const ids = self.selection.map(item => item.ID);
        const publicBouncedConfig = JSON.parse(JSON.stringify(publicDialogConfig.vipSpeedDispatchConfig));
        publicBouncedConfig.componentData = {
          params: {
            ids
          },
          pageType: 'vip'
        };
        self.publicBouncedConfig = publicBouncedConfig;
        self.$nextTick(() => {
          self.$children.find(item => item.name === 'manualMarking').openConfirm();
        });
        break;
      }
      case 'order_gh': {
        if (self.selection.length === 0) {
          self.$Message.warning({
            content: $it('tip.dq'), // 请选择需要替换商品的记录！
            duration: 5,
            top: 80
          });
          return;
        }
        self.publicBouncedConfig = publicDialogConfig.replaceConfig;
        // 表单筛选条件
        const param = {};
        param.page = {};
        param.page.pageSize = self.agTableConfig.pagenation.pageSize;
        param.page.pageNum = self.agTableConfig.pagenation.current;
        param.label = self.labelData; // 标签
        param.queryInfo = self.queryInfoData; // 普通搜索
        param.status = self.statusData;
        param.highSearch = self.highSearchData;
        // 列表勾选数据
        const ids = [];
        self.selection.forEach((item, index) => {
          ids[index] = item.ID;
        });

        self.publicBouncedConfig.componentData.a_1 = param;
        self.publicBouncedConfig.componentData.a_2 = ids;
        setTimeout(() => {
          self.$children.find(item => item.name === 'replaceTheGoods').openConfirm();
        }, 100);
        break;
      }
      case 'Adding gifts': {
        if (self.selection.length === 0) {
          self.$Message.warning({
            content: $it('tip.d2'), // 请选择需要添加赠品的记录！
            duration: 5,
            top: 80
          });
          return;
        }
        self.publicBouncedConfig = publicDialogConfig.addGiftsConfig;
        // 列表勾选数据
        const ids = [];
        self.selection.forEach((item, index) => {
          ids[index] = item.ID;
        });
        self.publicBouncedConfig.componentData = {
          objid: ids
        };
        setTimeout(() => {
          self.$children.find(item => item.name === 'addGifts').openConfirm();
        }, 100);
        break;
      }
      case 'Delete_Merchandise': {
        if (self.selection.length === 0) {
          self.$Message.warning({
            content: $it('tip.d3'), // 请选择需要删除赠品的记录！
            duration: 5,
            top: 80
          });
          return;
        }
        self.publicBouncedConfig = publicDialogConfig.itemDeleteConfig;
        // 表单筛选条件
        const param = {
          page: {
            pageSize: self.agTableConfig.pagenation.pageSize,
            pageNum: self.agTableConfig.pagenation.current
          },
          label: self.labelData, // 标签
          queryInfo: self.queryInfoData, // 普通搜索
          status: self.statusData,
          highSearch: self.highSearchData
        };

        // 列表勾选数据
        const ids = [];
        self.selection.forEach((item, index) => {
          ids[index] = item.ID;
        });
        self.publicBouncedConfig.componentData = {
          a_1: param,
          a_2: ids
        };
        setTimeout(() => {
          self.$children.find(item => item.name === 'itemDelete').openConfirm();
        }, 100);
        break;
      }
      case 'appointSplit': {
        self.sgto();
        break;
      }
      case 'shortageSplit': {
        if (self.selection.length > 0) {
          // self.btnConfig.loading = true;
          const ids = [];
          let noSplit = false;
          self.pageLoad = true;
          self.selection.forEach((item, index) => {
            ids[index] = item.ID;
            if (item.PLATFORM === 19) {
              noSplit = true;
            }
          });
          if (noSplit) {
            self.$Message.warning({
              content: 'JITX的订单不允许拆分！',
              duration: 5,
              top: 80
            });
            self.pageLoad = false;
            return;
          }
          self.service.orderCenter.splitOrder({ ids }).then(res => {
            self.pageLoad = false;
            if (res.data.code == 0) {
              self.$Message.success(res.data.message);
              self.selection = [];
              self.getData();
            } else {
              self.$Message.error(res.data.message);
            }
          });
        } else {
          self.pageLoad = false;
          self.$Message.warning({
            content: $it('tip.d4'), // 请选择需要拆单的记录！
            duration: 5,
            top: 80
          });
        }
        break;
      }
      case 'OrderWrongCopy': {
        self.copyRouteChange(val);
        break;
      }
      case 'OrderMissSendCopy': {
        self.copyRouteChange(val);
        break;
      }
      case 'OrderGiftsOutCopy': {
        self.copyRouteChange(val);
        break;
      }
      case 'oriInvalidCopy': {
        self.copyRouteChange(val);
        break;
      }
      case 'holdOrder': {
        if (self.selection.length === 0) {
          self.$Message.warning({
            content: $it('tip.e2'), // 请选择需要Hold单的记录！
            duration: 5,
            top: 80
          });
          return;
        }
        const ids = self.selection.map(item => item.ID);
        const publicBouncedConfig = JSON.parse(JSON.stringify(publicDialogConfig.holdOrderConfig));
        publicBouncedConfig.componentData = {
          ids
        };
        self.publicBouncedConfig = publicBouncedConfig;
        self.$nextTick(() => {
          self.$children.find(item => item.name === 'holdOrderDialog').openConfirm();
        });
        break;
      }
      case 'cancelHoldOrder': {
        if (self.selection.length === 0) {
          self.$Message.warning({
            content: $it('tip.d5'), // 请选择需要取消Hold单的记录！
            duration: 5,
            top: 80
          });
          return;
        }
        const data = {
          ids: self.selection.map(item => item.ID)
        };
        self.$Modal.info({
          title: $it('mT.tips'), // 提示,
          content: $it('tip.e1'), // 是否确定取消Hold？
          mask: true,
          showCancel: true,
          okText: $it('com.determine'), // 确定
          cancelText: $it('com.cancel'), // 取消
          onOk: () => {
            self.btnConfig.loading = true;
            self.service.orderCenter
              .manualUnHoldOrder(data)
              .then(res => {
                self.btnConfig.loading = false;
                if (res.data.code === 0) {
                  self.$Message.success(res.data.message);
                  self.getData();
                  self.selection = [];
                } else {
                  self.$Message.warning(res.data.message);
                }
              })
              .catch(() => {
                self.$Message.error($it('tip.d6')); // 服务器请求失败
                self.btnConfig.loading = false;
              });
          }
        });
        break;
      }
      /** ------ skx零售列表下拉按钮-end ------ */

      case 'OC_ORDER_SEND_TIME': { // 修改预计发货时间
        this.dropDownMainHandler('OC_ORDER_SEND_TIME')
        break
      }
      case 'manualReturnCreation': {
        // commonUtils.navigateMain(-1, 'TabOpen', 'OC_B_RETURN_ORDER_VIRTUAL_TABLE', 'pL.addReturnOrder')
        R3.store.commit('global/tabOpen', {
          type: 'C',
          label: $it('menu.b0'), // 退货单新增
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
      if (![1, 2].includes(it.ORDER_STATUS)) {
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
    if (!self.vueAgTable) {
      self.selection = self.$refs.agGridChild.AGTABLE.getSelect();
    }
    if (self.selection.length != 1) {
      $utils.msgTips(self, 'warning', 'jw'); // 请选择需要复制的单据
      return
    }
    const IDS = self.$utils.sonList(self.selection, 'ID')
    const { data: { code, data, message } } = await self.service.orderCenter.billOcBOrderCopy({
      IDS,
      TYPE: 1,
      COPY_REASON_TYPE: 0,
    })
    if (code == 0) {
      self.$store.commit('global/tabOpen', {
        url: `/CUSTOMIZED/OC_B_ORDER_VIRTUAL_TABLE/2307?copyType=1&sourceId=${self.selection[0].ID}`,
        type: 'C',
        label: $it('pL.add_retail_shipping_order'), // 零售发货单新增
      })
    } else {
      console.log(message)
    }
  }

  static ORDER_REPLACE_BELONGS_GOODS() {
    // 替换下挂赠品
    let self = DropDownConfig.target
    // self.publicBouncedConfig = JSON.parse(
    //   JSON.stringify(DialogConfig.config().pushProduceConfig)
    // )
    self.publicBouncedConfig = _.cloneDeep(DialogConfig.config().pushProduceConfig)
    if (!self.vueAgTable) {
      self.selection = self.$refs.agGridChild.AGTABLE.getSelect();
    }
    if (self.selection.length < 1) {
      $utils.msgTips(self, 'warning', 'd8')
      return
    }

    if (self.selection[0].ORDER_STATUS == 2 || self.selection[0].ORDER_STATUS == 1) {
      self.publicBouncedConfig.name = 'addGiftDialog'
      self.publicBouncedConfig.url = require('@/views/modal/orderCenter/addGiftItem.vue').default
      self.publicBouncedConfig.confirmTitle = $it('mT.ah') // 批量替换下挂商品
      self.publicBouncedConfig.componentData = {
        data: self.selection,
        type: 'replace',
      }
      self.publicBouncedConfig.width = 800

      setTimeout(() => {
        self.$children.find((item) => item.name === 'addGiftDialog').openConfirm()
      }, 100)
    } else {
      $utils.msgTips(self, 'warning', 'kf')
      return
    }

  }

  static ORDER_DELETE_GOODS() {
    //批量删除
    let self = DropDownConfig.target
    // self.publicBouncedConfig = JSON.parse(
    //   JSON.stringify(DialogConfig.config().pushProduceConfig)
    // )
    self.publicBouncedConfig = _.cloneDeep(DialogConfig.config().pushProduceConfig)
    if (!self.vueAgTable) {
      self.selection = self.$refs.agGridChild.AGTABLE.getSelect();
    }
    if (self.selection.length < 1) {
      $utils.msgTips(self, 'warning', 'd8')
      return
    }

    if (self.selection[0].ORDER_STATUS == 2 || self.selection[0].ORDER_STATUS == 1) {
      self.publicBouncedConfig.name = 'addGiftDialog'
      self.publicBouncedConfig.url = require('@/views/modal/orderCenter/addGiftItem.vue').default
      self.publicBouncedConfig.confirmTitle = $it('btn.deleteGift') // 删除赠品
      self.publicBouncedConfig.componentData = {
        data: self.selection,
        type: 'del',
      }
      self.publicBouncedConfig.width = 800

      setTimeout(() => {
        self.$children.find((item) => item.name === 'addGiftDialog').openConfirm()
      }, 100)
    } else {
      $utils.msgTips(self, 'warning', 'jx'); // 只允许缺货或待审核状态的订单进行添加！
      return
    }

  }

  static ORDER_ADD_GOODS() {
    //添加赠品
    let self = DropDownConfig.target
    // self.publicBouncedConfig = JSON.parse(
    //   JSON.stringify(DialogConfig.config().pushProduceConfig)
    // )
    self.publicBouncedConfig = _.cloneDeep(DialogConfig.config().pushProduceConfig)
    if (!self.vueAgTable) {
      self.selection = self.$refs.agGridChild.AGTABLE.getSelect();
    }
    if (self.selection.length < 1) { //
      $utils.msgTips(self, 'warning', 'd8')
      return
    }
    if (self.selection[0].ORDER_STATUS == 2 || self.selection[0].ORDER_STATUS == 1) { //
      self.publicBouncedConfig.name = 'addGiftDialog'
      self.publicBouncedConfig.url = require('@/views/modal/orderCenter/addGiftItem.vue').default
      self.publicBouncedConfig.confirmTitle = $it('btn.addGift') // 添加赠品

      self.publicBouncedConfig.componentData = {
        data: self.selection,
        type: 'add',
      }

      self.publicBouncedConfig.width = 800
      setTimeout(() => {
        self.$children.find((item) => item.name === 'addGiftDialog').openConfirm()
      }, 100)
    } else {
      $utils.msgTips(self, 'warning', 'kf')
      return
    }
  }

  static async afterSaleCopyHander() {
    let self = DropDownConfig.target
    if (!self.vueAgTable) {
      self.selection = self.$refs.agGridChild.AGTABLE.getSelect();
    }
    if (self.selection.length != 1) {
      $utils.msgTips(self, 'warning', 'jw')
      return
    }
    const IDS = self.$utils.sonList(self.selection, 'ID')
    const { data: { code, data, message } } = await self.service.orderCenter.billOcBOrderCopy({
      IDS,
      TYPE: 2,
      COPY_REASON_TYPE: 1,
      cause: '售后复制按钮点击校验',
    })
    if (code == 0) {
      self.publicBouncedConfig.name = 'ORDER_COPY_AF_SALE'
      // self.publicBouncedConfig.url = 'modal/orderCenter/afterSaleCopy'
      self.publicBouncedConfig.url = require('@/views/modal/orderCenter/afterSaleCopy.vue').default
      self.publicBouncedConfig.confirmTitle = $it('mT.ag') // 售后复制
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
      label: $it('pL.add_retail_shipping_order'), // 零售发货单新增
      customizedModuleId: 'New',
    })
  }
  //新增订单处理
  static newOrderHander() {
    R3.store.commit('global/tabOpen', {
      type: 'C',
      label: $it('pL.add_retail_shipping_order'), // 零售发货单新增
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
      const ids = $utils.sonList(self.selection, 'ID')
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
            if (item.PLATFORM === 19) {
              $utils.msgTips(self, 'warning', 'ex')
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
      $utils.msgTips(self, 'warning', tips)
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
          $utils.tipShow('error', self, res)
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
    self.publicBouncedConfig = _.cloneDeep(DialogConfig.config()[objName])
    // const curConfig = JSON.parse(
    //   JSON.stringify(DialogConfig.config()[objName])
    // )
    console.log(`组件配置:`, self.publicBouncedConfig);

    let componentDataObj = {}

    switch (componentDataType) {
      case 'CP_C_PHY_WAREHOUSE_ID':
      case 'CP_C_SHOP_ID':
        componentDataObj = ids
        break
      case 'ORDER_STATUS':
        componentDataObj = {
          ids,
          status: $utils.sonList(self.selection, componentDataType),
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
          console.log(`组件:${tableType}::`, item);
        }
        return item.name === tableType
      }).openConfirm()
      self.btnConfig.loading = false
    }, 100)
  }
  //修改物流;
  static modifyLogisticsHandler(rows) {
    let list = []
    const ids = $utils.sonList(rows, 'ID')
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
    const ids = $utils.sonList(rows, 'ID')
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
    if (ids[0].ORDER_STATUS == 1 || ids[0].ORDER_STATUS == 2) {
      this.successHandler(ids, 'replaceConfig', 'product', 'replaceTheGoods')
    } else {
      $utils.msgTips(self, 'warning', 'kf')
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
      ids = $utils.sonList(self.selection, 'ID');
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
        // $utils.msgTips(self, 'error', res.data.message, 0);
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
          $utils.msgTips(self, 'success', res.data.message, 2)
          self.selection = []
          self.query()
        } else if (res.data.code == 1 && res.data.data) {
          let tabData = res.data.data.map((row, index) => {
            row.INDEX = ++index
            row.BILL_NO = row.objid
            row.RESULT_MSG = row.message
            return row
          })
          $utils.tipShow(
            'confirm',
            self,
            res,
            res.data.message,
            function (h) {
              return h('Table', {
                props: {
                  columns: [
                    {
                      title: $it('tL.serialNo'), // 序号
                      key: 'INDEX',
                    },
                    {
                      title: $it('fL.billNo'), // 单据编号
                      key: 'BILL_NO',
                    },
                    {
                      title: $it('fL.e0'), // 失败原因
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
        $utils.msgTips(DropDownConfig.target, 'warning', 'a2')
      } else if (
        type === 'oriInvalidCopy' &&
        ![7, 8].includes(selectItem.ORDER_STATUS)
      ) {
        // 原单无效复制
        // 已取消
        // 非已取消或系统作废订单，不允许复制
        $utils.msgTips(DropDownConfig.target, 'error', 'a3')
        // 仓库发货
        // 平台发货
      } else if (![5, 6].includes(selectItem.ORDER_STATUS)) {
        // 只能对【仓库发货，平台发货】订单状态的原单进行复制操作
        $utils.msgTips(DropDownConfig.target, 'error', 'a4')
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
          'pL.add_retail_shipping_order',
          extendObj
        )
      }
    } else {
      $utils.msgTips(DropDownConfig.target, 'warning', 'a5')
    }
  }
}
export default DropDownConfig
