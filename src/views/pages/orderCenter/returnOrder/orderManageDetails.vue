<!--
 * @Author: your name
 * @Date: 2021-07-07 16:19:54
 * @LastEditTime: 2021-08-06 15:19:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /project-logic/views/pages/orderCenter/returnOrder/orderManageDetails.vue
-->
<template>
  <div class="customized-detail orderManageDetails" v-loading="pageLoad">
    <div class="obj-btn">
      <OmsButton :btn-config="btnConfig" />
    </div>
    <div class="obj-main">
      <!-- <div class="Step-Box">
        <Steps class="steps-content">
          <Step
            v-for="(item, index) in steps"
            :key="index"
            :title="item.name"
            :icon="item.iconfont"
            :content="item.data ? item.data : item.content"
            :status="item.status"
          />
        </Steps>
      </div> -->
      <div class="customized-detail-label">
        <OmsLabel
          :label-default-value="labelDefaultValue"
          :label-list="labelList"
          @labelClick="labelClick"
        />
      </div>
      <template>
        <!-- 主表界面 - 基本信息 -->
        <EssentialInfo
          v-show="labelDefaultValue === 'OC_B_ORDER_ITEM'"
          :component-data="baseInfoTab"
          @freshLoad="freshLoad"
        />
        <!-- 子表 -->
        <div class="obj-table">
          <OrderItem
            v-show="labelDefaultValue !== 'OC_B_ORDER_ITEM'"
            class="custom-table"
            :component-data="otherInfoTab"
          />
        </div>
      </template>
      <!--单据状态图片展示 -->
      <WaterMark
        v-if="statusName !== ''"
        :text="statusName"
      />
    </div>
    <!--错误弹框-->
    <Modal v-model="modal" title="Title" @on-ok="asyncOK">
      <p>error_tip</p>
    </Modal>
  </div>
</template>
<script>
import buttonPermissionsMixin from '@/assets/js/mixins/buttonPermissions';
import EssentialInfo from 'allpages/orderCenter/orderManageDetail/details/essentialInfo.vue';
import OrderItem from 'allpages/orderCenter/orderManageDetail/details/orderItem.vue';
import DropDownConfig from 'burgeonConfig/config/dropDown.config';
import BtnConfig from 'burgeonConfig/config/funBtn.config';
import BurgeonEvent from 'burgeonConfig/config/event.config';

export default {
  name: 'OrderManageDetail',
  components: {
    EssentialInfo,
    OrderItem,
  },
  mixins: [buttonPermissionsMixin],
  data() {
    return {
      pageLoad: false,
      publicBouncedConfig: {},
      statusName: '', // 水印标识
      // 订单状态对应的状态码‘ORDER_STATUS’ => ['未确认', '已审核-3', '配货中-4', '仓库发货-5', '平台发货-6', '已确认收货', '已取消-7', '系统作废-8', '交易完成-12', '预售待发货', '预售缺货', '缺货-2', '待审核-1'];
      // * 后端(孙继东)给的：1,待审核 2,缺货 3,已审核 4,配货中 5,仓库发货 6,平台发货 7,已取消 8,系统作废 9,预售 10,代发 11,物流已送达 12,交易完成 13,未付款 21,传wms中 50,待分配,0,新增订单暂存草稿状态
      orderStatus: '', // 订单状态 - 水印标识码
      objId: -1,
      labelDefaultValue: 'OC_B_ORDER_ITEM',
      labelList: [
        {
          label: $it('com.baseInformation'), // 基本信息
          value: 'OC_B_ORDER_ITEM'
        },
        {
          label: $it('fL.preferential_info'), // 优惠信息
          value: 'OC_B_ORDER_PROMOTION'
        },
        {
          label: $it('fL.shipping_info'), // 发货信息
          value: 'OC_B_ORDER_DELIVERY'
        },
        {
          label: $it('pL.operationLog'), // 操作日志
          value: 'OC_B_ORDER_LOG'
        }
      ],
      baseInfoTab: {
        order: {},
        sub_item: {}
      },
      otherInfoTab: {
        tablename: '',
        objid: ''
      },
      // 状态条数据
      steps: [],
      modal: false, // 模态框
      error_type: '', // 错误类型【审核错误】
      error_tip: '', // 错误提示
      dialogs: {},
      btnConfig: {
        typeAll: 'default', // 按钮统一风格样式
        loading: false, // 按钮加载
        buttons: [],
      },
      // btnConfig: BtnConfig.config(),
      //
      returnBtn: {
        btnsite: 'right', // 按钮对齐方式
        typeAll: 'default',
        buttons: [
          {
            text: $it('com.return'), // 返回
            btnclick: () => {
              $omsUtils.tabCloseAppoint(this);
              this.$store.commit('global/tabOpen', {
                url: '/CUSTOMIZED/ORDERMANAGER/2307?isBack=true',
                type: 'C',
                dynamicRoutingForCustomizePage: true,
                label: $it('pL.retail_shipping_order'),//'零售发货单',
              });
              // $omsUtils.tabJump(0, '2307', 1, 'ORDERMANAGER', { i8n: 0, tip: `${$it('pL.retail_shipping_order')}` }, {}, 1, 1)
              /* this.$store.commit('customize/TabOpen', {
                id: '2307',
                type: 'action',
                name: 'ORDERMANAGER',
                label: $it('pL.retail_shipping_order'),//'零售发货单',
                back: true,
              }); */
            }
          },
          {
            text: $it('btn.refresh'),
            btnclick: async () => {
              // 区分子表
              if (this.labelDefaultValue === 'OC_B_ORDER_ITEM') {
                await this.getDetailsData();
              } else {
                this.otherInfoTab = { objid: this.objId, tabValue: this.labelDefaultValue };
              }
            }
          }
        ]
      },
      extendBtn: [
        {
          webname: 'orderDetentionRelease', // 卡单释放
          btnclick: () => {
            const ids = [this.tab1.order.ID];
            this.btnConfig.loading = true;
            this.service.orderCenter
            .orderDetentionRelease({ ids })
            .then(res => {
              this.btnConfig.loading = false;
              const { code, message } = res.data;
              // eslint-disable-next-line no-unused-expressions
              code == '0' ? this.$Message.success(message) : this.$Message.error(message);
            });
          }
        },
        {
          webname: 'To examine', // 审核
          btnclick: () => {
            const self = this;
            // 是否还存在可合并的JIT订单
            const ids = [];
            ids.push(self.tab1.order.ID);
            const fromdata = new FormData();
            const param = {
              ids
            };
            fromdata.append('param', JSON.stringify(param));
            self.service.orderCenter
            .checkOtherMergeOrder(fromdata)
            .then(res => {
              self.pageLoad = false;
              if (res.data.code == 0) {
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
                      self.$Message.error(res.data.message);
                    }
                  }
                });
              } else if (res.data.code === -3) {
                this.$Modal.info({
                  title: $it('mT.tips'), // 提示
                  content: res.data.message, // 零售发货单/JIT订单中间表存在可合并的订单还未参与合并，仍要继续次操作吗？
                  mask: true,
                  showCancel: true,
                  okText: $it('com.determine'), // 确定
                  cancelText: $it('com.cancel'), // 取消
                  onOk: () => {
                    self.auditOrder();
                  },
                  onCancel: ()=> {
                    self.$emit('closeActionDialog', false);
                  }
                });
              } else if (res.data.code === -1) {
                self.$Message.error(res.data.message);
              }
            })
            .catch(() => {
              self.pageLoad = false;
            });
          } // 按钮点击事件
        },
        {
          webname: 'Counter-audit', // 反审核
          btnclick: () => {
            const self = this;
            const ids = [];
            ids[0] = this.$route.params.customizedModuleId;
            this.$Modal.info({
              title: $it('mT.tips'), // 提示
              content: $it('tip.g7'), // 是否确定反审核订单？
              mask: true,
              showCancel: true,
              okText: $it('com.determine'), // 确定
              cancelText: $it('com.cancel'), // 取消
              onOk: () => {
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
                        title: $it('mT.tips'), // 提示
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
              },
              onCancel: ()=> {
                this.$emit('closeActionDialog', false);
              }
            });
          }
        },
        {
          webname: 'holdOrder2', // Hold单
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
          webname: 'lockStockAndReOccupyStock', // 冻结并重新寻源
          btnclick: () => {
            this.$Modal.info({
              title: $it('mT.tips'), // 提示,
              content: '请确认订单是否冻结库存并重新寻源？', // 请确认订单是否冻结库存并重新寻源？
              mask: true,
              showCancel: true,
              okText: $it('com.determine'), // 确定
              cancelText: $it('com.cancel'), // 取消
              onOk: () => {
                this.handleEvent('lockStockAndReOccupyStock');
              }
            });
          } // 按钮点击事件
        },
        {
          webname: 'jitxOrderResetShip', // JITX重置发货
          btnclick: () => {
            this.handleEvent('jitxOrderResetShip');
          } // 按钮点击事件
        },
        {
          webname: 'cancelHoldOrder2', // 取消Hold
          btnclick: () => {
            const self = this;
            const ids = [];
            ids.push(self.tab1.order.ID);
            const data = {
              ids,
            };
            this.$Modal.info({
              title: $it('mT.tips'), // 提示,
              content: $it('tip.e1'), // 是否确定取消Hold？
              mask: true,
              showCancel: true,
              okText: $it('com.determine'), // 确定
              cancelText: $it('com.cancel'), // 取消
              onOk: () => {
                self.btnConfig.loading = true;
                self.service.orderCenter.manualUnHoldOrder(data)
                  .then((res) => {
                    if (res.data.code === 0) {
                      self.$Message.success(res.data.message);
                      self.autoRefresh();
                    } else {
                      self.$Message.warning(res.data.message || $it('tip.d6')); // 服务器请求失败
                    }
                  });
              },
              onCancel: ()=> {
                this.$emit('closeActionDialog', false);
              }
            });
          }, // 按钮点击事件
        },
        {
          webname: 'againOccupyStock',
          btnclick: () => {
            this.$Modal.info({
              title: '提示',
              content: '是否确定重新寻源？',
              mask: true,
              showCancel: true,
              okText: '确定',
              onOk: () => {
                this.service.orderCenter.againOccupyStock({ ids: [this.$route.params.customizedModuleId] }).then(res => {
                  if (res.data.code === 0) {
                    this.$Message.success({
                      content: res.data.message
                    });
                    this.load();
                  }
                });
              }
            });
          }
        }, // 重新寻源 
        {
          webname: 'Split the order', // 拆分订单
          btnclick: () => {
            const self = this;
            // this.service.orderCenter.querySkuListAndStorageInfo({ orderId: self.$route.params.customizedModuleId }).then(res => {
              // 提前判断下该单据是否可拆单
              // if (res.data.code !== 0) {
              //   this.$Message.warning(res.data.message);
              // } else {
                const data = self.tab1.order;
            if ((data.PLATFORM === 4 && data.PAY_TYPE === 2) || data.PLATFORM === 7) {
              self.$Message.warning({
                content: $it('tip.b1'), // 交易平台为当当，唯品会jitx，京东（货到付款）的订单不允许拆单
                duration: 5,
                top: 80
              });
              return;
            }
            if (data.PLATFORM == 19 && !data.MERGED_CODE) {
              self.$Message.warning({
                content: '该JITX订单不是门店JITX订单，不允许拆单！', // 非唯品会订单且合包码为空，不允许拆单！
                duration: 5,
                top: 80
              });
              return;
            }
            if (data.IS_INRETURNING === 1 || data.IS_INTERECEPT === 1) {
              self.$Message.warning({
                content: $it('tip.b2'), // 拦截、退款中的订单不允许拆单！
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
                label: $it('pL.orderSplit'), // 订单拆分
                query: {
                  id: self.$route.params.customizedModuleId,
                  tabTitle: $it('pL.orderSplit') // 订单拆分
                }
              });
            } else {
              self.$Message.warning({
                content: $it('tip.b3'), // 只允许拆分待审核和缺货状态的订单！
                duration: 5,
                top: 80
              });
            }
              // }
            // });
          }
        },
        {
          webname: 'Revisinguupdate', // 修改物流
          btnclick: () => {
            const self = this;
            const ids = [];
            ids[0] = self.$route.params.customizedModuleId;
            const CP_C_PHY_WAREHOUSE_ID = [];
            CP_C_PHY_WAREHOUSE_ID[0] = self.tab1.order.CP_C_PHY_WAREHOUSE_ID;
            // const plat = self.tab1.order.PLATFORM_NAME;
            // if (plat == '唯品会JITX') {
            //   self.$Message.warning('该订单为唯品会JITX订单,不允许修改物流！');
            //   return;
            // }
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
          }
        },
        {
          webname: 'UpdateInsideRemark', // 修改内部备注
          btnclick: () => {
            const ids = this.$route.params.customizedModuleId;
            const ORDER_STATUS = this.tab1.order.ORDER_STATUS;
            this.changeInternalRemarksConfig.componentData = {
              ids,
              status: ORDER_STATUS
            };
            this.$children.find(item => item.name === 'changeInternalRemarks').openConfirm();
          }
        },
        {
          webname: 'updatestore', // 修改仓库
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
                  const { shopId, skuIds } = res.data.data;
                  self.publicBouncedConfig = publicDialogConfig.changeWarehouseConfig;
                  self.publicBouncedConfig.componentData = {
                    ids,
                    CP_C_SHOP_ID: CP_C_SHOP_ID[0],
                    shopId,
                    skuIdList: skuIds
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
          }
        },
        {
          webname: 'updateremark', // 修改备注
          btnclick: () => {
            const self = this;
            const ids = [];
            ids[0] = self.$route.params.customizedModuleId;
            const ORDER_STATUS = [];
            ORDER_STATUS[0] = self.tab1.order.ORDER_STATUS;
            self.publicBouncedConfig = publicDialogConfig.changeRemarkConfig;
            self.publicBouncedConfig.confirmTitle = self.btnConfig.buttons.find(item => item.webname === 'updateremark').text;
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
          webname: 'Out-of-stock reopening', // 缺货重新占单
          btnclick: () => {
            const self = this;
            if (self.tab1.order.ID > 0) {
              const ids = [];
              ids.push(self.tab1.order.ID);
              self.service.orderCenter
                .queryshortagSearchOrder({ ids })
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
          webname: 'FortuneBag-Out-of-stock reopening', // 福袋缺货重新占单
          btnclick: () => {
            const self = this;
            if (self.tab1.order.ID > 0) {
              const ids = [];
              ids.push(self.tab1.order.ID);
              self.service.orderCenter
                .queryFortuneBagShortage({ ids })
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
          webname: 'order_update_addrr', // 修改地址
          btnclick: () => {
            // 判断条件是否符合
            const self = this;
            const status = self.tab1.order.ORDER_STATUS || '';
            if (status === 3) {
              self.$Message.warning($it('tip.g8')); // 订单状态已审核，建议反审核再修改地址
              return;
            }
            if (![1, 2, 3, 4].includes(status)) {
              self.$Message.warning($it('tip.g9')); // "订单状态非未确认、缺货、已审核、配货中，不允许修改地址"
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
                this.$message.error($it('tip.h0')); // 地址信息获取失败
              }
            });
          } // 按钮点击事件
        },
        {
          text: $it('btn.orderBlocking'), // 订单拦截
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
          text: $it('btn.cancelBlocking'), // 取消拦截
          btnclick: () => {
            const self = this;
            const id = self.tab1.order.ID || -1;
            self.service.orderCenter
              .cancelInterception({ ids: [id] })
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
          text: $it('mT.blacklist'), // 加入黑名单
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
          text: $it('btn.new_workOrder'), // 新增工单
          btnclick: () => {} // 按钮点击事件
        },
        {
          webname: 'refund_price', // 额外退款
          btnclick: () => {
            // if 仓库发货 或 平台发货
            if (this.orderStatus === 5 || this.orderStatus === 6) {
              this.$store.commit('customize/TabOpen', {
                id: -1,
                type: 'action',
                name: 'EXTRAREFUND',
                label: $it('pL.extraRefundEdit'), // 额外退款编辑
                query: Object.assign({
                  oid: this.$route.params.customizedModuleId,
                  tabTitle: $it('pL.extraRefundEdit'), // 额外退款编辑
                  fromOrder: true,
                  new: true
                })
              });
            } else {
              this.$Message.warning($it('tip.h1')); // "只有仓库发货或者平台发货的订单才能操作!"
            }
          } // 按钮点击事件
        },
        {
          webname: 'New refund receipt', // 新增退单
          btnclick: () => {
            const orderDetails = this.tab1.order;
            // “仓库发货”、“平台发货”
            if (![5, 6].includes(orderDetails.ORDER_STATUS)) {
              this.$Message.warning($it('tip.h2')); // "订单状态为仓库发货和平台发货才能新增退单!"
              return;
            }
            this.$store.commit('customize/TabOpen', {
              id: -1,
              type: 'action',
              name: 'returngood',
              label: $it('pL.addReturnOrder'), // 退换货单新增
              query: {
                id: -1,
                orderHrefReturnid: orderDetails.ID,
                isOrderHrefReturn: 'order',
                tabTitle: $it('pL.addReturnOrder') // 退换货单新增
              }
            });
          }
        },
        {
          webname: 'order_refreceing', // 刷新
          btnclick: () => {
            this.autoRefresh();
          } // 按钮点击事件
        },
        {
          webname: 'order_fund', // 返回
          btnclick: () => {
            comUtils.tabCloseAppoint(this);
            this.$store.commit('customize/TabHref', {
              id: 2627,
              type: 'action',
              name: 'orderManager',
              label: $it('pL.retail_shipping_order'), // label: '零售发货单',
              back: true,
              query: Object.assign({
                id: 2627,
                tabTitle: $it('pL.retail_shipping_order'), // tabTitle: '零售发货单'
              })
            });
          } // 按钮点击事件
        },
        /* {
          text: $it('btn.copyOrder') // 复制订单
        }, */
        {
          // text: $it('btn.orderCancel'), //
          webname: 'Order Cancellation', // 订单取消
          btnclick: () => {
            const self = this;
            console.log('self.$refs', self.$route);
            self.btnConfig.loading = true;
            const ids = [];
            const id = self.$route.params.customizedModuleId; // 此id为订单编号
            ids.push(id);
            this.$Modal.info({
              title: $it('mT.tips'), // 提示
              content: $it('tip.e0'), // 是否确定取消订单？
              mask: true,
              showCancel: true,
              okText: $it('com.determine'), // 确定
              cancelText: $it('com.cancel'), // 取消
              onOk: () => {
                self.service.orderCenter
                  .cancelOrder({ ids, type: '1' })
                  .then(res => {
                    if (res.data.code === 0) {
                      self.$Message.success(res.data.message);
                      this.load();
                    } else {
                      self.$Modal.error({
                        title: $it('mT.tips'), // 提示
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
          webname: 'Drop-out copy', // 丢单复制
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
          webname: 'orderUnDeliveryUrgent', // 取消加急
          btnclick: () => {
            this.btnConfig.loading = true;
            const ids = [];
            const id = this.$route.params.customizedModuleId;
            ids.push(id);
            this.$Modal.info({
              title: '提示', // 提示
              content: '是否确定取消加急?', // 是否确定取消加急?
              mask: true,
              showCancel: true,
              onOk: () => {
                this.service.orderCenter
                  .orderUnDeliveryUrgent({ ids })
                  .then(res => {
                    if (res.data.code === 0) {
                      this.$Message.success(res.data.message);
                      this.load();
                    } else {
                      this.$Modal.error({
                        title: '提示', // 提示
                        content: res.data.message,
                        cancelType: true,
                        titleAlign: 'left',
                        mask: true,
                        draggable: true,
                      });
                    }
                    this.btnConfig.loading = false;
                  });
              },
              onCancel: () => {
                this.btnConfig.loading = false;
              }
            });
          }
        }
      ],
      enumerationList: {}
    };
  },
  watch: {
    // 复制
    // $route(to) {
    //   if (to.path !== '/CUSTOMIZED/ORDERMANAGEDETAIL') {
    //     return;
    //   }
    //   const id = this.$route.params ? this.$route.params.customizedModuleId : -1;
    //   this.objId = id;
    //   this.getDetailsData();
    // }
  },
  activated() {
    const self = this;
    this.$OMS2.BtnConfig.target = self;
    BurgeonEvent.target = self;
  },
  mounted() {
    // 页面加载完在赋值 （取不到值就会赋默认值）
    // this.dialogs = DialogConfig.config();
  },
  methods: {
    dropDownClickChange(val) {
      DropDownConfig.target = this;
      DropDownConfig.configHandler(val, 1);
    },
    labelClick(item) {
      this.labelDefaultValue = item.value;
      if (item.value === 'OC_B_ORDER_ITEM') return;
      this.otherInfoTab = { objid: this.objId, tabValue: item.value };
      // this.otherInfoTab = { tablename: this.labelDefaultValue, objid: this.objId, tabValue: item.value };
    },
    freshLoad(val) {
      this.getDetailsData(val);
    },
    async getDetailsData(val) {
      this.loading = true;
      let params = {
        ID: this.objId,
        TABLE: 'OC_B_ORDER',
        SUB_TABLE: 'OC_B_ORDER_ITEM',
        index: 1,
        PT_SKU: true, //true平台 false商品
        REFRESH: true
      };
      // 是否隐藏
      if (val) params = Object.assign(params, val);
      try {
        const { data: { data } } = await this.service.orderCenter.queryObject(params);
        this.steps = data.DATA.PROCESSING;
        this.baseInfoTab.order = data.DATA.ITEM;
        this.baseInfoTab.sub_item = data.DATA.SUB_ITEM;
        this.loading = false;
        console.log('1111', data.DATA.ITEM);
        // const statusList = ['未确认', '已审核', '配货中', '仓库发货', '平台发货', '已确认收货', '已取消', '系统作废', '交易完成', '预售待发货', '预售缺货', '缺货', '待审核'];
        this.statusName = ['未确认', '已审核', '配货中', '仓库发货', '平台发货', '已确认收货', '已取消', '系统作废', '交易完成', '预售待发货', '预售缺货', '缺货', '待审核'].includes(data.DATA.ITEM.ORDER_STATUS) ? data.DATA.ITEM.ORDER_STATUS : '';
      } catch (error) {
        console.log(error);
      }
    },
    asyncOK() {
      const self = this;
      const ids = [];
      ids.push(this.baseInfoTab.order.ID);
      if (this.error_type === 'auditing') {
        self.service.orderCenter.auditOrder({ ids, type: '2', isCheck: 1 }).then(res => {
          self.$Message.info(res.data.message);
          self.modal = false;
        });
      }
    }
  },
  async created() {
    const id = this.$route.params.customizedModuleId ?? -1;
    this.objId = id;
    BtnConfig.target = this;
    BtnConfig.singleType = 1;

    this.btnConfig.buttons = []; // 清空按钮缓存,防止重复叠加按钮
    const buttons = this.$OMS2.BtnConfig.config();
    this.btnConfig.buttons = [...buttons.buttons, ...this.extendBtn];
    // this.getPermissions('btnConfig', 'orderManager');
    await this.getDetailsData();
  },
};
</script>
<style lang="less" scoped>
@import "~omsTheme/public.less";
.orderManageDetails {
  background: #fff;
}
.Step-Box {
  margin: @base-mr @base-mr 0;
  /deep/
    .steps-content.ark-steps
    .ark-steps-item
    .ark-steps-head
    .ark-steps-head-inner {
    height: 21px;
    line-height: 1;
    & > .ark-steps-icon.ark-icon {
      font-size: 24px;
    }
  }
}
.customized-detail-label {
  border-bottom: 1px solid #f4f5f9;
  .jordan-label-box {
    // margin: 0 @base-mr;
    /deep/ .jordan-label {
      height: 48px;
      line-height: 48px;
      border: none;
      color: #292f43;
      &.colorStyle {
        color: #4855af;
        border-bottom: 2px solid #4855af;
      }
    }
    /deep/ .underline-flex {
      border: none;
    }
  }
}
.order-item {
  padding: 0;
}
</style>
