import businessButton from 'professionalComponents/businessButton';
import businessLabel from 'professionalComponents/businessLabel';
import businessStatusFlag from 'professionalComponents/businessStatusFlag';
import businessDialog from 'professionalComponents/businessDialog';
import { buttonPermissionsMixin } from '@/assets/js/mixins/buttonPermissions';
import EssentialInfo from '@/views/pages/OrderCenter/orderManageDetail/details/essentialInfo';
import OrderItem from '@/views/pages/OrderCenter/orderManageDetail/details/orderItem';
import publicDialogConfig from 'professionalComponents/common/js/publicDialog.js';
import loading from '@/component/loading.vue';
import comUtils from '@/assets/js/__utils__/common';

export default {
  name: 'OrderManageDetail',
  components: {
    businessButton,
    businessLabel,
    EssentialInfo,
    OrderItem,
    businessStatusFlag,
    businessDialog,
    loading
  },
  mixins: [buttonPermissionsMixin],
  data() {
    return {
      vmI18n: window.vmI18n,
      pageLoad: false,
      publicBouncedConfig: {},
      statusName: '', // 水印标识
      objId: -1,
      labelDefaultValue: 'OC_B_ORDER',
      labelList: [
        {
          label: window.vmI18n.t('common.baseInformation'), // 基本信息
          value: 'OC_B_ORDER'
        },
        {
          label: window.vmI18n.t('form_label.preferential_info'), // 优惠信息
          value: 'OC_B_ORDER_PROMOTION'
        },
        {
          label: window.vmI18n.t('form_label.payment_info'), // 支付信息
          value: 'OC_B_ORDER_PAYMENT'
        },
        {
          label: window.vmI18n.t('form_label.shipping_info'), // 发货信息
          value: 'OC_B_ORDER_DELIVERY'
        },
        {
          label: window.vmI18n.t('form_label.workOrder'), // 工单
          value: '5',
          isShow: false
        },
        {
          label: window.vmI18n.t('form_label.status_in_warehouse'), // 仓内状态
          value: 'OC_B_ORDER_WMS_STATUS',
          isShow: false
        },
        {
          label: window.vmI18n.t('form_label.routing_info'), // 路由信息
          value: 'OC_B_ORDER_ROUTE',
          isShow: false
        },
        {
          label: window.vmI18n.t('panel_label.operationLog'), // 操作日志
          value: 'OC_B_ORDER_LOG'
        }
      ],
      tab1: {},
      tab1_default: {
        order: {
          ADJUST_AMT: '',
          BILL_NO: '',
          COD_AMT: '',
          CONSIGN_AMT: 0,
          CONSIGN_SHIP_AMT: '',
          CP_C_LOGISTICS_ENAME: '',
          CP_C_PHY_WAREHOUSE_ID: '',
          CP_C_REGION_AREA_ENAME: '',
          CP_C_REGION_CITY_ENAME: '',
          CP_C_REGION_PROVINCE_ENAME: '',
          CP_C_SHOP_TITLE: '',
          EXPRESSCODE: '',
          INSIDE_REMARK: '',
          LOGISTICS_COST: '',
          OPERATE_AMT: '',
          ORDER_AMT: '',
          ORDER_DATE: '',
          ORDER_DISCOUNT_AMT: '',
          ORIG_RETURN_ORDER_ID: '',
          PAY_TYPE: '',
          PLATFORM: '',
          PRODUCT_AMT: 0,
          PRODUCT_DISCOUNT_AMT: '',
          RECEIVED_AMT: '',
          RECEIVER_ADDRESS: '',
          RECEIVER_MOBILE: '',
          RECEIVER_NAME: '',
          RECEIVER_PHONE: '',
          RECEIVER_ZIP: '',
          SYSREMARK: '',
          SHIP_AMT: '',
          SOURCE_CODE: '',
          USER_NICK: '',
          WEIGHT: '',
          CP_C_PHY_WAREHOUSE_ENAME: ''
        }
      },
      tab2: {
        tablename: '',
        objid: ''
      },
      refresh: true,
      modal: false, // 模态框
      error_type: '', // 错误类型【审核错误】
      error_tip: '', // 错误提示
      dialogs: {
        address: {
          title: window.vmI18n.t('modalTitle.modify_shipping_address'), // 修改收货地址
          titleAlign: 'center',
          data: {},
          width: 650,
          keepAlive: true,
          url: 'modal/orderCenter/resolveAddress',
          name: 'addressDialog',
          excludeString: 'addressDialog',
          footerHide: true,
          maskClosable: false
        },
        blacklist: {
          title: window.vmI18n.t('modalTitle.blacklist'), // 加入黑名单
          titleAlign: 'center',
          width: 400,
          data: {},
          keepAlive: true,
          url: 'order/joinBlackList',
          name: 'blackListDialog',
          footerHide: true
        }
      },
      btnConfig: {
        typeAll: 'error',
        buttons: [
          {
            text: window.vmI18n.t('btn.audit'), // 审核
            btnclick: () => {
              const self = this;
              const ids = [];
              ids.push(self.tab1.order.ID);
              self.service.orderCenter.auditOrder({ ids, type: '1' }).then(res => {
                if (res.data.code === 0) {
                  self.$Message.success(res.data.message);
                  self.autoRefresh();
                } else {
                  const data = res.data.data || {};
                  if (res.data.data && res.data.data.message) {
                    self.error_type = 'auditing';
                    self.error_tip = data.message;
                    self.modal = true;
                    self.autoRefresh();
                  } else {
                    // self.$Message.error(res.data.message);
                    console.log('审核失败');
                  }
                }
              });
            } // 按钮点击事件
          },
          {
            text: window.vmI18n.t('btn.deAudit'), // 反审核
            btnclick: () => {
              const self = this;
              const ids = [];
              ids[0] = this.$route.params.customizedModuleId;
              this.$Modal.info({
                title: self.vmI18n.t('modalTitle.tips'), // 提示
                content: window.vmI18n.t('modalTips.g7'), // 是否确定反审核订单？
                mask: true,
                showCancel: true,
                okText: self.vmI18n.t('common.cancel'), // 取消
                cancelText: self.vmI18n.t('common.determine'), // 确定
                onCancel: () => {
                  this.service.orderCenter.auditOrderReserve({
                      ids,
                      type: '1'
                    })
                    .then(res => {
                      if (res.data.code === 0) {
                        self.$Message.success(res.data.message);
                        self.load();
                      } else {
                        self.$Modal.error({
                          title: self.vmI18n.t('modalTitle.tips'), // 提示
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
                    });
                }
              });
            }
          },
          {
            text: window.vmI18n.t('btn.holdOrder'), // Hold单
            btnclick: () => {
              const self = this;
              const ids = self.$route.params.customizedModuleId;
              const publicBouncedConfig = JSON.parse(JSON.stringify(publicDialogConfig.holdOrderConfig));
              publicBouncedConfig.componentData = {
                ids
              };
              self.publicBouncedConfig = publicBouncedConfig;
              this.$nextTick(() => {
                self.$children.find(item => item.name === 'holdOrderDialog').openConfirm();
              });
            }
          },
          {
            text: window.vmI18n.t('btn.cancelHold'), // 取消Hold
            btnclick: () => {
              const self = this;
              const ids = [];
              ids.push(self.tab1.order.ID);
              const data = {
                ids,
              };
              this.$Modal.info({
                title: self.vmI18n.t('modalTitle.tips'), // 提示,
                content: self.vmI18n.t('modalTips.e1'), // 是否确定取消Hold？
                mask: true,
                showCancel: true,
                okText: self.vmI18n.t('common.cancel'), // 取消
                cancelText: self.vmI18n.t('common.determine'), // 确定
                onCancel: () => {
                  self.btnConfig.loading = true;
                  self.service.orderCenter.manualUnHoldOrder(data)
                  // self.$network
                  //   .post('/api/cs/oc/oms/v1/manualUnHoldOrder', data)
                    .then((res) => {
                      if (res.data.code === 0) {
                        self.$Message.success(res.data.message);
                        self.autoRefresh();
                      } else {
                        self.$Message.warning(res.data.message);
                      }
                    });
                },
              });
            }, // 按钮点击事件
          },
          {
            text: window.vmI18n.t('btn.splitOrder'), // 拆分订单
            btnclick: () => {
              const self = this;
              const data = self.tab1.order;
              if ((data.PLATFORM === 4 && data.PAY_TYPE === 2) || data.PLATFORM === 7 || data.PLATFORM === 50) {
                self.$Message.warning({
                  content: self.vmI18n.t('modalTips.b1'), // 交易平台为当当，唯品会jitx，京东（货到付款）的订单不允许拆单
                  duration: 5,
                  top: 80
                });
                return;
              }
              if (data.IS_INRETURNING === 1 || data.IS_INTERECEPT === 1) {
                self.$Message.warning({
                  content: self.vmI18n.t('modalTips.b2'), // 拦截、退款中的订单不允许拆单！
                  duration: 5,
                  top: 80
                });
                return;
              }
              if (data.ORDER_STATUS === 1 || data.ORDER_STATUS === 2) {
                self.$store.commit('customize/TabHref', {
                  id: self.$route.params.customizedModuleId,
                  type: 'action',
                  name: 'splitOrder',
                  label: self.vmI18n.t('panel_label.orderSplit'), // 订单拆分
                  query: {
                    id: self.$route.params.customizedModuleId,
                    tabTitle: self.vmI18n.t('panel_label.orderSplit') // 订单拆分
                  }
                });
              } else {
                self.$Message.warning({
                  content: self.vmI18n.t('modalTips.b3'), // 只允许拆分待审核和缺货状态的订单！
                  duration: 5,
                  top: 80
                });
              }
            }
          },
          {
            text: window.vmI18n.t('btn.modify_logistics'), // 修改物流
            btnclick: () => {
              const self = this;
              const ids = [];
              ids[0] = self.$route.params.customizedModuleId;
              const CP_C_PHY_WAREHOUSE_ID = [];
              CP_C_PHY_WAREHOUSE_ID[0] = self.tab1.order.CP_C_PHY_WAREHOUSE_ID;
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
                      platform: self.tab1.order.PLATFORM,
                      CP_C_PHY_WAREHOUSE_ID: CP_C_PHY_WAREHOUSE_ID[0]
                    };
                    setTimeout(() => {
                      self.$children.find(item => item.name === 'modifyLogistics').openConfirm();
                    }, 100);
                  } else {
                    self.$Modal.error({
                      title: self.vmI18n.t('modalTitle.tips'), // 提示,
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
            }
          },
          {
            text: window.vmI18n.t('btn.modifyWarehouse'), // 修改仓库
            btnclick: () => {
              const self = this;
              const ids = [];
              ids[0] = self.$route.params.customizedModuleId;
              const CP_C_SHOP_ID = [];
              CP_C_SHOP_ID[0] = self.tab1.order.CP_C_SHOP_ID;
              const fromdata = new FormData();
              fromdata.append('ids', ids);
              self.service.orderCenter
                .checkOrderBeforeWarehouse(fromdata)
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
                      title: self.vmI18n.t('modalTitle.tips'), // 提示,
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
            }
          },
          {
            text: window.vmI18n.t('btn.modifyRemarks'), // 修改备注
            btnclick: () => {
              const self = this;
              const ids = [];
              ids[0] = self.$route.params.customizedModuleId;
              const ORDER_STATUS = [];
              ORDER_STATUS[0] = self.tab1.order.ORDER_STATUS;
              self.publicBouncedConfig = publicDialogConfig.changeRemarkConfig;
              self.publicBouncedConfig.componentData = {
                ids,
                status: ORDER_STATUS
              };
              setTimeout(() => {
                self.$children.find(item => item.name === 'changeRemark').openConfirm();
              }, 100);
            }
          },
          {
            text: window.vmI18n.t('btn.beOut_of_stock'), // 缺货重新占单
            btnclick: () => {
              const self = this;
              if (self.tab1.order.ID > 0) {
                const ids = [];
                ids.push(self.tab1.order.ID);
                self.service.orderCenter
                  .queryshortagSearchOrder({ ids })
                  // self.$network
                  //   .post('/api/cs/oc/oms/v1/queryshortagSearchOrder', { ids })
                  .then(res => {
                    if (res.data.code === 0) {
                      self.$Message.success(res.data.message);
                      self.autoRefresh();
                    } else {
                      self.$Message.warning(res.data.message);
                    }
                  });
              }
            } // 按钮点击事件
          },
          {
            text: window.vmI18n.t('btn.fubaoOut_of_stock'), // 福袋缺货重新占单text: "福袋缺货重新占单", // 按钮文本
            btnclick: () => {
              const self = this;
              if (self.tab1.order.ID > 0) {
                const ids = [];
                ids.push(self.tab1.order.ID);
                self.service.orderCenter
                  .queryFortuneBagShortage({ ids })
                  // self.$network
                  //   .post('/api/cs/oc/oms/v1/queryFortuneBagShortage', { ids })
                  .then(res => {
                    if (res.data.code === 0) {
                      self.$Message.success(res.data.message);
                      self.autoRefresh();
                    } else {
                      self.$Message.warning(res.data.message);
                    }
                  });
              }
            } // 按钮点击事件
          },
          {
            text: window.vmI18n.t('btn.changeAddress'), // 修改地址
            btnclick: () => {
              // 判断条件是否符合
              const self = this;
              const status = self.tab1.order.ORDER_STATUS || '';
              if (status === 3) {
                self.$Message.warning(window.vmI18n.t('modalTips.g8')); // 订单状态已审核，建议反审核再修改地址
                return;
              }
              if (![1, 2, 3, 4].includes(status)) {
                self.$Message.warning(window.vmI18n.t('modalTips.g9')); // "订单状态非未确认、缺货、已审核、配货中，不允许修改地址"
                return;
              }
              this.service.orderCenter.getDetail({ ID: this.objId, isShowPii: true }).then(res => {
                if (res.data && res.data.code === 0) {
                  const order = res.data.data;
                  self.dialogs.address.data = {
                    ID: self.tab1.order.ID || -1,
                    OLDRECEIVERADDRESS: order.ORDER_ADDRESS,
                    BUYER_MESSAGE: order.BUYER_MESSAGE,
                    SELLER_MEMO: order.SELLER_MEMO,
                    SYSREMARK: order.SYSREMARK,
                    CP_C_REGION_PROVINCE_ID: order.CP_C_REGION_PROVINCE_ID,
                    CP_C_REGION_CITY_ID: order.CP_C_REGION_CITY_ID,
                    CP_C_REGION_AREA_ID: order.CP_C_REGION_AREA_ID,
                    RECEIVER_ADDRESS: order.RECEIVER_ADDRESS,
                    RECEIVER_NAME: order.RECEIVER_NAME,
                    RECEIVER_MOBILE: order.RECEIVER_MOBILE,
                    RECEIVER_PHONE: order.RECEIVER_PHONE,
                    RECEIVER_ZIP: order.RECEIVER_ZIP,
                    CALLBACK: '',
                    ck: order.PLATFORM
                  };
                  if (self.$refs.addressDialog) {
                    self.$refs.addressDialog[0].openConfirm();
                  }
                } else {
                  this.tab1 = this.tab1_default;
                  this.$message.error(window.vmI18n.t('modalTips.h0')); // 地址信息获取失败
                }
              });
            } // 按钮点击事件
          },
          {
            text: window.vmI18n.t('btn.orderBlocking'), // 订单拦截
            btnclick: () => {
              const self = this;
              const id = self.tab1.order.ID || -1;
              const ids = [];
              ids.push(id);
              self.service.orderCenter
                .orderInterception({ ids })
                // self.$network
                //   .post('/api/cs/oc/oms/v1/orderInterception', { ids })
                .then(res => {
                  if (res.data.code === 0) {
                    self.$Message.success(res.data.message);
                    self.autoRefresh();
                  } else {
                    self.$Message.error(res.data.message);
                  }
                });
            } // 按钮点击事件
          },
          {
            text: window.vmI18n.t('btn.cancelBlocking'), // 取消拦截
            btnclick: () => {
              const self = this;
              const id = self.tab1.order.ID || -1;
              self.$network.post('/api/cs/oc/oms/v1/cancelInterception', { ids: [id] }).then(res => {
                if (res.data.code === 0) {
                  self.$Message.success(res.data.message);
                  self.autoRefresh();
                } else {
                  self.$Message.error(res.data.message);
                }
              });
            } // 按钮点击事件
          },
          {
            text: window.vmI18n.t('modalTitle.blacklist'), // 加入黑名单
            btnclick: () => {
              this.dialogs.blacklist.data = {
                ID: this.tab1.order.ID || -1
              };
              if (this.$refs.blackListDialog) {
                this.$refs.blackListDialog[0].openConfirm();
              }
            } // 按钮点击事件
          },
          {
            text: window.vmI18n.t('btn.new_workOrder'), // 新增工单
            btnclick: () => {} // 按钮点击事件
          },
          {
            text: window.vmI18n.t('btn.additionalRefund'), // 额外退款
            btnclick: () => {
              if (this.statusName === this.vmI18n.t('other.warehouseDelivery') || this.statusName === this.vmI18n.t('other.platformDelivery')) {
                this.$store.commit('customize/TabOpen', {
                  id: -1,
                  type: 'action',
                  name: 'refundAfterShipment',
                  label: window.vmI18n.t('panel_label.extraRefundEdit'), // 额外退款编辑
                  query: Object.assign({
                    oid: this.$route.params.customizedModuleId,
                    tabTitle: window.vmI18n.t('panel_label.extraRefundEdit'), // 额外退款编辑
                    fromOrder: true,
                    new: true
                  })
                });
              } else {
                this.$Message.warning(window.vmI18n.t('modalTips.h1')); // "只有仓库发货或者平台发货的订单才能操作!"
              }
            } // 按钮点击事件
          },
          {
            text: window.vmI18n.t('btn.new_chargeback'), // 新增退单
            btnclick: () => {
              const orderDetails = this.tab1.order;
              // “仓库发货”、“平台发货”
              if (![5, 6].includes(orderDetails.ORDER_STATUS)) {
                this.$Message.warning(window.vmI18n.t('modalTips.h2')); // "订单状态为仓库发货和平台发货才能新增退单!"
                return;
              }
              this.$store.commit('customize/TabOpen', {
                id: -1,
                type: 'action',
                name: 'returngood',
                label: window.vmI18n.t('panel_label.addReturnOrder'), // 退换货单新增
                query: {
                  id: -1,
                  orderHrefReturnid: orderDetails.ID,
                  isOrderHrefReturn: 'order',
                  tabTitle: window.vmI18n.t('panel_label.addReturnOrder') // 退换货单新增
                }
              });
            }
          },
          {
            text: window.vmI18n.t('btn.refresh'), // 刷新 按钮文本
            btnclick: () => {
              this.autoRefresh();
            } // 按钮点击事件
          },
          {
            text: window.vmI18n.t('btn.back'), // 返回 按钮文本
            btnclick: () => {
              comUtils.tabCloseAppoint(this);
              this.$store.commit('customize/TabHref', {
                id: 2627,
                type: 'action',
                name: 'orderManager',
                label: window.vmI18n.t('panel_label.retail_shipping_order'), // label: '零售发货单',
                back: true,
                query: Object.assign({
                  id: 2627,
                  tabTitle: window.vmI18n.t('panel_label.retail_shipping_order'), // tabTitle: '零售发货单'
                })
              });
            } // 按钮点击事件
          },
          {
            text: window.vmI18n.t('btn.copyOrder') // 复制订单
          },
          {
            text: window.vmI18n.t('btn.orderCancel'), // 订单取消
            btnclick: () => {
              const self = this;
              console.log('self.$refs',self.$route);
              self.btnConfig.loading = true;
              const ids = [];
              const id = self.$route.params.customizedModuleId; // 此id为订单编号
              ids.push(id);
              this.$Modal.info({
                title: self.vmI18n.t('modalTitle.tips'), // 提示
                content: self.vmI18n.t('modalTips.e0'), // 是否确定取消订单？
                mask: true,
                showCancel: true,
                okText: self.vmI18n.t('common.determine'), // 取消
                cancelText: self.vmI18n.t('common.cancel'), // 确定
                onOk: () => {
                  self.service.orderCenter
                    .cancelOrder({ ids, type: '1' })
                    .then(res => {
                      if (res.data.code === 0) {
                        self.$Message.success(res.data.message);
                        this.load();
                      } else {
                        self.$Modal.error({
                          title: self.vmI18n.t('modalTitle.tips'), // 提示
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
                },
                onCancel: () => {
                  self.btnConfig.loading = false;
                }
              });
            } // 按钮点击事件
          },
          {
            text: window.vmI18n.t('btn.lostOrder_copy') // 丢单复制
          },
          {
            text: window.vmI18n.t('btn.wrongCopy') // 错发复制
          },
          {
            text: window.vmI18n.t('btn.missedCopy') // 漏发复制
          },
          {
            text: window.vmI18n.t('btn.giftDelivery_copy') // 赠品出库复制
          },
          {
            text: window.vmI18n.t('btn.original_single_null_and_void_copy') // 原单无效复制
          }
        ]
      },
      enumerationList: {}
    };
  },
  watch: {
    $route(to) {
      if (to.path !== '/CUSTOMIZED/ORDERMANAGEDETAIL') {
        return;
      }
      const id = this.$route.params ? this.$route.params.customizedModuleId : -1;
      this.objId = id;
      this.load();
    }
  },
  methods: {
    dropDownClickChange(val) {
      switch (val) {
        case '丢单复制': {
          this.copyRouteChange(val);
          break;
        }
        case '错发复制': {
          this.copyRouteChange(val);
          break;
        }
        case '漏发复制': {
          this.copyRouteChange(val);
          break;
        }
        case '赠品出库复制': {
          this.copyRouteChange(val);
          break;
        }
        case '原单无效复制': {
          this.copyRouteChange(val);
          break;
        }
        default: {
          console.log(val);
        }
      }
    },
    // 丢单复制、错发复制、漏发复制、赠品出库复制
    copyRouteChange(type) {
      const self = this;
      const selectItem = this.tab1.order;
      const ORDERSTATUSNAME = selectItem.ORDER_STATUS_NAME;
      if (selectItem.COPY_REASON) {
        // 订单只能是原单才能复制!
        self.$Message.warning(this.vmI18n.t('modalTips.a2'));
        return;
      }
      if (type === this.vmI18n.t('btn.original_single_null_and_void_copy')) {
        // 已取消  系统作废
        if (selectItem.ORDER_STATUS != 7 && selectItem.ORDER_STATUS != 8) {
          self.$Message.error(this.vmI18n.t('modalTips.a3'));
          return;
        }
        // 仓库发货&&平台发货
      } else if (ORDERSTATUSNAME !== this.vmI18n.t('other.warehouseDelivery') && ORDERSTATUSNAME !== this.vmI18n.t('other.platformDelivery')) {
        // 只能对【仓库发货，平台发货】订单状态的原单进行复制操作
        self.$Message.error(this.vmI18n.t('modalTips.a4'));
        return;
      }
      // 默认是丢单复制的query
      const query = {
        id: self.$route.params.customizedModuleId,
        pageTitle: type
      };
      // 丢单复制
      if (type === this.vmI18n.t('btn.lostOrder_copy')) {
        query.orderCopy = true;
      } else {
        query.copyOrder = true;
      }
      self.$store.commit('customize/TabHref', {
        id: -1,
        type: 'action',
        name: 'orderManageAdd',
        label: window.vmI18n.t('panel_label.add_retail_shipping_order'), // 零售发货单新增
        query
      });
    },
    labelClick(item) {
      this.labelDefaultValue = item.value;
      if (item.value === 'OC_B_ORDER') return;
      this.tab2 = {
        tablename: this.labelDefaultValue,
        objid: this.objId
      };
    },
    autoRefresh() {
      const self = this;
      this.refresh = false;
      self.$nextTick(() => {
        this.load();
        this.refresh = true;
      });
    },
    freshLoad(val) {
      this.load(val);
    },
    load(val) {
      const data = { ID: this.objId };
      if (val) {
        data.isShowPii = true;
      }
      this.pageLoad = true;
      this.service.orderCenter
        .getDetail(data)
        .then(res => {
          this.pageLoad = false;
          if (res.data && res.data.code === 0) {
            const resData = res.data.data;
            resData.TO_SETTLE_STATUS_TAG = data.RESERVE_BIGINT02 === null ? this.vmI18n.t('common.no') : this.vmI18n.t('common.yes');
            const TO_SETTLE_STATUS_NAME = (this.enumerationList.UPLOAD_SAP_STATUS.find(val => val.value === resData.TO_SAP_STATUS) || {}).label;
            resData.TO_SETTLE_STATUS_NAME = TO_SETTLE_STATUS_NAME || '';
            this.tab1.order = resData;
            const statusList = ['未确认', '已审核', '配货中', '仓库发货', '平台发货', '已确认收货', '已取消', '系统作废', '交易完成', '预售待发货', '预售缺货', '缺货'];
            if (statusList.includes(res.data.data.ORDER_STATUS_NAME)) {
              this.statusName = res.data.data.ORDER_STATUS_NAME;
            } else {
              this.statusName = '';
            }
          } else {
            this.tab1 = this.tab1_default;
            // 订单详情获取失败
            this.$message.error(this.vmI18n.t('modalTips.h3'));
          }
        })
        .catch(() => {
          this.pageLoad = false;
        });
    },
    asyncOK() {
      const self = this;
      const ids = [];
      ids.push(this.tab1.order.ID);
      if (this.error_type === 'auditing') {
        self.service.orderCenter.auditOrder({ ids, type: '2', isCheck: 1 }).then(res => {
          self.$Message.info(res.data.message);
          self.modal = false;
        });
      }
    }
  },
  async created() {
    this.getPermissions('btnConfig', 'orderManager');
    const id = this.$route.params.customizedModuleId ? this.$route.params.customizedModuleId : -1;
    this.objId = id;
    this.tab1 = {
      order: {
        ADJUST_AMT: '',
        BILL_NO: '',
        COD_AMT: '',
        CONSIGN_AMT: 0,
        CONSIGN_SHIP_AMT: '',
        CP_C_LOGISTICS_ENAME: '',
        CP_C_PHY_WAREHOUSE_ID: '',
        CP_C_REGION_AREA_ENAME: '',
        CP_C_REGION_CITY_ENAME: '',
        CP_C_REGION_PROVINCE_ENAME: '',
        CP_C_SHOP_TITLE: '',
        EXPRESSCODE: '',
        INSIDE_REMARK: '',
        LOGISTICS_COST: '',
        OPERATE_AMT: '',
        ORDER_AMT: '',
        ORDER_DATE: '',
        ORDER_DISCOUNT_AMT: '',
        ORIG_RETURN_ORDER_ID: '',
        PAY_TYPE: '',
        PLATFORM: '',
        PRODUCT_AMT: 0,
        PRODUCT_DISCOUNT_AMT: '',
        RECEIVED_AMT: '',
        RECEIVER_ADDRESS: '',
        RECEIVER_MOBILE: '',
        RECEIVER_NAME: '',
        RECEIVER_PHONE: '',
        RECEIVER_ZIP: '',
        SYSREMARK: '',
        SHIP_AMT: '',
        SOURCE_CODE: '',
        USER_NICK: '',
        WEIGHT: '',
        CP_C_PHY_WAREHOUSE_ENAME: ''
      }
    };
    this.pageLoad = true;
    await this.service.common
      .selectLimitGroups(['UPLOAD_SAP_STATUS'])
      .then(res => {
        if (Array.isArray(res.data)) {
          res.data.forEach(item => {
            this.enumerationList[item.name] = item.adLimitvalues.map(val => ({
              label: val.description,
              value: Number(val.value)
            }));
          });
        } else {
          this.enumerationList.UPLOAD_SAP_STATUS = [];
        }
      })
      .catch(() => {
        this.pageLoad = false;
      });
    await this.load();
  }
};
