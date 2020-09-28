<!--
date:2019-03-01
author:wdq
feature : 订单中心-零售发货单详情
-->
<template>
  <div class="order" v-loading="pageLoad">
    <div class="order-btn">
      <jordanButton :btnConfig="btnConfig" @dropDownClick="dropDownClickChange"></jordanButton>
    </div>
    <div class="order-header">
      <jordanLabel
        :labelList="labelList"
        :labelDefaultValue="labelDefaultValue"
        @labelClick="labelClick"
      ></jordanLabel>
    </div>
    <div class="order-content" v-if="refresh">
      <EssentialInfo
        :componentData="tab1"
        @freshLoad="freshLoad"
        v-show="labelDefaultValue==='OC_B_ORDER'"
      ></EssentialInfo>
      <OrderItem v-show="labelDefaultValue!=='OC_B_ORDER'" :componentData="tab2"></OrderItem>
    </div>
    <!--单据状态图片展示 -->
    <jordanStatusFlag class="statusFlag" :statusName="statusName"></jordanStatusFlag>
    <!--错误弹框-->
    <Modal v-model="modal" title="Title" @on-ok="asyncOK">
      <p>error_tip</p>
    </Modal>

    <JDialog
      v-for="(list, index) in dialogs"
      :key="index"
      :ref="list.name"
      :url="list.url"
      :title="list.title"
      :name="list.name"
      :keepAlive="list.keepAlive||true"
      :width="list.width||''"
      :excludeString="list.excludeString"
      :componentData="list.data"
      :footerHide="list.footerHide"
      :quit="list.quit"
      :confirm="list.confirm"
      :maskClosable="list.maskClosable === false ? false : true"
    ></JDialog>
    <!-- 公共弹框 -->
    <JDialog
      :title="publicBouncedConfig.confirmTitle"
      :titleAlign="publicBouncedConfig.titleAlign"
      :width="publicBouncedConfig.width"
      :scrollable="publicBouncedConfig.scrollable"
      :closable="publicBouncedConfig.closable"
      :draggable="publicBouncedConfig.draggable"
      :mask="publicBouncedConfig.mask"
      :mask-closable="publicBouncedConfig.maskClosable"
      :transfer="publicBouncedConfig.transfer"
      :name="publicBouncedConfig.name"
      :url="publicBouncedConfig.url"
      :batchClosed="publicBouncedConfig.batchClosed"
      :keepAlive="publicBouncedConfig.keepAlive"
      :excludeString="publicBouncedConfig.excludeString"
      :componentData="publicBouncedConfig.componentData"
      :quit="publicBouncedConfig.quit"
    ></JDialog>
  </div>
</template>

<script>
import jordanButton from "professionalComponents/jordanButton";
import jordanForm from "professionalComponents/jordanForm";
import jordanTable from "professionalComponents/jordanTable.vue";
import jordanLabel from "professionalComponents/jordanLabel";
import myInput from "framework/components/element/input.vue";
import OrderItem from "./details/orderItem";
import EssentialInfo from "./details/essentialInfo";
// import dictionary from "../../../assets/zh-CN.js";
import axios from "axios";
import jordanStatusFlag from "professionalComponents/jordanStatusFlag";
import JDialog from "professionalComponents/JDialog";
import { buttonPermissionsMixin } from "@/assets/js/mixins/buttonPermissions";
import publicDialogConfig from "../orderManager/publicConfig/publicDialog.js";

export default {
  name: 'orderManageDetail',
  components: {
    jordanButton,
    jordanForm,
    jordanTable,
    jordanLabel,
    myInput,
    EssentialInfo,
    OrderItem,
    jordanStatusFlag,
    JDialog
  },
  mixins: [buttonPermissionsMixin],
  data() {
    return {
      pageLoad: false,
      publicBouncedConfig: {},
      statusName: '', // 水印标识
      objId: -1,
      labelDefaultValue: "OC_B_ORDER",
      labelList: [
        {
          label: "基本信息",
          value: "OC_B_ORDER"
        },
        {
          label: "优惠信息",
          value: "OC_B_ORDER_PROMOTION"
        },
        {
          label: "支付信息",
          value: "OC_B_ORDER_PAYMENT"
        },
        {
          label: "发货信息",
          value: "OC_B_ORDER_DELIVERY"
        },
        {
          label: "工单",
          value: "5",
          isShow: false
        },
        {
          label: "仓内状态",
          value: "OC_B_ORDER_WMS_STATUS",
          isShow: false
        },
        {
          label: "路由信息",
          value: "OC_B_ORDER_ROUTE",
          isShow: false
        },
        {
          label: "操作日志",
          value: "OC_B_ORDER_LOG"
        }
      ],
      tab1: {},
      tab1_default: {
        order: {
          ADJUST_AMT: "",
          BILL_NO: "",
          COD_AMT: "",
          CONSIGN_AMT: 0,
          CONSIGN_SHIP_AMT: "",
          CP_C_LOGISTICS_ENAME: "",
          CP_C_PHY_WAREHOUSE_ID: "",
          CP_C_REGION_AREA_ENAME: "",
          CP_C_REGION_CITY_ENAME: "",
          CP_C_REGION_PROVINCE_ENAME: "",
          CP_C_SHOP_TITLE: "",
          EXPRESSCODE: "",
          INSIDE_REMARK: "",
          LOGISTICS_COST: "",
          OPERATE_AMT: "",
          ORDER_AMT: "",
          ORDER_DATE: "",
          ORDER_DISCOUNT_AMT: "",
          ORIG_RETURN_ORDER_ID: "",
          PAY_TYPE: "",
          PLATFORM: "",
          PRODUCT_AMT: 0,
          PRODUCT_DISCOUNT_AMT: "",
          RECEIVED_AMT: "",
          RECEIVER_ADDRESS: "",
          RECEIVER_MOBILE: "",
          RECEIVER_NAME: "",
          RECEIVER_PHONE: "",
          RECEIVER_ZIP: "",
          SYSREMARK: "",
          SHIP_AMT: "",
          SOURCE_CODE: "",
          SYSREMARK: "",
          USER_NICK: "",
          WEIGHT: "",
          CP_C_PHY_WAREHOUSE_ENAME: ""
        }
      },
      tab2: {
        tablename: "",
        objid: ""
      },
      refresh: true,
      modal: false, //模态框
      error_type: "", //错误类型【审核错误】
      error_tip: "", //错误提示
      dialogs: {
        address: {
          title: "修改收货地址",
          titleAlign: "center",
          data: {},
          width: 650,
          keepAlive: true,
          url: "order/resolveAddress",
          name: "addressDialog",
          excludeString: "addressDialog",
          footerHide: true,
          maskClosable: false
        },
        blacklist: {
          title: "加入黑名单",
          titleAlign: "center",
          width: 400,
          data: {},
          keepAlive: true,
          url: "order/joinBlackList",
          name: "blackListDialog",
          footerHide: true
        },
      },
      btnConfig: {
        typeAll: "error",
        buttons: [
          {
            text: "审核", //按钮文本
            btnclick: () => {
              let self = this;
              let ids = [];
              ids.push(self.tab1.order.ID);
              axios({
                url: "/api/cs/oc/oms/v1/auditOrder",
                method: "post",
                data: { ids: ids, type: "1" }
              }).then(function (res) {
                if (res.data.code === 0) {
                  self.$Message.info(res.data.message);
                  self.autoRefresh();
                } else {
                  let data = res.data.data || {};
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
            } //按钮点击事件
          },
          {
            text: '反审核',
            btnclick: () => {
              let self = this;
              let ids = [];
              ids[0] = this.$route.query.id;
              this.$Modal.info({
                title: '提示',
                content: '是否确定反审核订单？',
                mask: true,
                showCancel: true,
                okText: '取消',
                cancelText: '确定',
                onCancel: () => {
                  axios({
                    url: "/api/cs/oc/oms/v1/auditOrderReserve",
                    method: "post",
                    cancelToken: true,
                    data: { ids: ids, type: "1" }
                  }).then(res => {
                    if (res.data.code === 0) {
                      self.$Message.success(res.data.message);
                      self.load();
                    } else {
                      self.$Modal.error({
                        title: "提示",
                        content: res.data.message,
                        cancelType: true,
                        titleAlign: "left",
                        mask: true,
                        draggable: true,
                        keyDown: event => {
                          if (event.keyCode == 27 || event.keyCode == 13) {
                            self.$Modal.remove();
                          }
                        }
                      });
                    }
                  })
                }
              })
            }
          },
          {
            text: '订单取消',
            btnclick: () => {
              let self = this;
              let ids = [];
              ids[0] = this.$route.query.id;
              this.$Modal.info({
                title: '提示',
                content: '是否确定取消订单？',
                mask: true,
                showCancel: true,
                okText: '取消',
                cancelText: '确定',
                onCancel: () => {
                  axios({
                    url: "/api/cs/oc/oms/v1/cancelOrder",
                    method: "post",
                    cancelToken: true,
                    data: { ids: ids, type: "1" }
                  }).then(function (res) {
                    if (res.data.code === 0) {
                      self.$Message.success(res.data.message);
                      self.load();
                      self.selection = [];
                    } else {
                      self.$Modal.error({
                        title: "提示",
                        content: res.data.message,
                        cancelType: true,
                        titleAlign: "left",
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
              });
            }
          },
          {
            text: 'Hold单',
            btnclick: () => {
              let self = this;
              let ids = self.$route.query.id;
              let publicBouncedConfig = JSON.parse(JSON.stringify(publicDialogConfig.holdOrderConfig))
              publicBouncedConfig.componentData = {
                ids
              };
              self.publicBouncedConfig = publicBouncedConfig;
              this.$nextTick(() => {
                self.$children
                  .find(item => item.name === "holdOrderDialog")
                  .openConfirm();
              })
            }
          },
          {
            text: '拆分订单',
            btnclick: () => {
              let self = this;
              let data = self.tab1.order
              if (
                (data.PLATFORM === 4 &&
                  data.PAY_TYPE === 2) ||
                data.PLATFORM === 7 ||
                data.PLATFORM === 50
              ) {
                self.$Message.warning({
                  content:
                    "交易平台为当当，唯品会jitx，京东（货到付款）的订单不允许拆单！",
                  duration: 5,
                  top: 80
                });
                return;
              }
              if (
                data.IS_INRETURNING === 1 ||
                data.IS_INTERECEPT === 1
              ) {
                self.$Message.warning({
                  content: "拦截、退款中的订单不允许拆单！",
                  duration: 5,
                  top: 80
                });
                return;
              }
              if (
                data.ORDER_STATUS ===
                1 ||
                data.ORDER_STATUS === 2
              ) {
                self.$store.commit("customize/TabHref", {
                  id: self.$route.query.id,
                  type: "action",
                  name: "splitOrder",
                  label: "订单拆分",
                  query: {
                    id: self.$route.query.id,
                    tabTitle: "订单拆分"
                  }
                });
              } else {
                self.$Message.warning({
                  content: "只允许拆分待审核和缺货状态的订单！",
                  duration: 5,
                  top: 80
                });
              }
            }
          },
          {
            text: '修改物流',
            btnclick: () => {
              let self = this;
              let ids = [];
              ids[0] = self.$route.query.id;
              let CP_C_PHY_WAREHOUSE_ID = [];
              CP_C_PHY_WAREHOUSE_ID[0] = self.tab1.order.CP_C_PHY_WAREHOUSE_ID;
              let fromdata = new FormData();
              fromdata.append("ids", ids);
              axios({
                url: "/api/cs/oc/oms/v1/checkOrderBeforeLogistics",
                method: "post",
                cancelToken: true,
                data: fromdata
              }).then(function (res) {
                if (res.data.code === 0) {
                  self.publicBouncedConfig =
                    publicDialogConfig.modifyLogisticsConfig;
                  self.publicBouncedConfig.componentData = {
                    ids: ids,
                    cLogisticsId: 0,
                    platform: self.tab1.order.PLATFORM,
                    CP_C_PHY_WAREHOUSE_ID: CP_C_PHY_WAREHOUSE_ID[0]
                  };
                  setTimeout(() => {
                    self.$children
                      .find(item => item.name === "modifyLogistics")
                      .openConfirm();
                  }, 100);
                } else {
                  self.$Modal.error({
                    title: "提示",
                    content: res.data.message,
                    cancelType: true,
                    titleAlign: "left",
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
            text: '修改仓库',
            btnclick: () => {
              let self = this;
              let ids = [];
              ids[0] = self.$route.query.id;
              let CP_C_SHOP_ID = [];
              CP_C_SHOP_ID[0] = self.tab1.order.CP_C_SHOP_ID;
              let fromdata = new FormData();
              fromdata.append("ids", ids);
              axios({
                url: "/api/cs/oc/oms/v1/checkOrderBeforeWarehouse",
                method: "post",
                cancelToken: true,
                data: fromdata
              }).then(function (res) {
                if (res.data.code === 0) {
                  self.publicBouncedConfig =
                    publicDialogConfig.changeWarehouseConfig;
                  self.publicBouncedConfig.componentData = {
                    ids: ids,
                    CP_C_SHOP_ID: CP_C_SHOP_ID[0]
                  };
                  setTimeout(() => {
                    self.$children
                      .find(item => item.name === "changeWarehouse")
                      .openConfirm();
                  }, 100);
                } else {
                  self.$Modal.error({
                    title: "提示",
                    content: res.data.message,
                    cancelType: true,
                    titleAlign: "left",
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
            text: '修改备注',
            btnclick: () => {
              let self = this;
              let ids = [];
              ids[0] = self.$route.query.id;
              let ORDER_STATUS = [];
              ORDER_STATUS[0] = self.tab1.order.ORDER_STATUS;
              self.publicBouncedConfig =
                publicDialogConfig.changeRemarkConfig;
              self.publicBouncedConfig.componentData = {
                ids: ids,
                status: ORDER_STATUS
              };
              setTimeout(() => {
                self.$children
                  .find(item => item.name === "changeRemark")
                  .openConfirm();
              }, 100);
            }
          },
          {
            text: "缺货重新占单", //按钮文本
            btnclick: () => {
              let self = this;
              if (self.tab1.order.ID > 0) {
                let ids = [];
                ids.push(self.tab1.order.ID);
                axios({
                  url: "/api/cs/oc/oms/v1/queryshortagSearchOrder",
                  method: "post",
                  data: { ids: ids }
                }).then(function (res) {
                  if (res.data.code === 0) {
                    self.$Message.success(res.data.message);
                    self.autoRefresh();
                  } else {
                    self.$Message.warning(res.data.message);
                  }
                });
              }
            } //按钮点击事件
          },
          {
            text: "福袋缺货重新占单", //按钮文本
            btnclick: () => {
              let self = this;
              if (self.tab1.order.ID > 0) {
                let ids = [];
                ids.push(self.tab1.order.ID);
                axios({
                  url: "/api/cs/oc/oms/v1/queryFortuneBagShortage",
                  method: "post",
                  data: { ids: ids }
                }).then(function (res) {
                  if (res.data.code === 0) {
                    self.$Message.success(res.data.message);
                    self.autoRefresh();
                  } else {
                    self.$Message.warning(res.data.message);
                  }
                });
              }
            } //按钮点击事件
          },
          {
            text: "修改地址", //按钮文本
            btnclick: () => {
              //判断条件是否符合
              let self = this;
              let status = self.tab1.order.ORDER_STATUS || '';
              if (status === 3) {
                self.$Message.warning("订单状态已审核，建议反审核再修改地址");
                return;
              }
              if (![1, 2, 3, 4].includes(status)) {
                self.$Message.warning("订单状态非未确认、缺货、已审核、配货中，不允许修改地址");
                return;
              }
              self.getWritData().then(res => {
                if (res.data && res.data.code === 0) {
                  let order = res.data.data;
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
                  if (self.$refs.addressDialog)
                    self.$refs.addressDialog[0].openConfirm();
                } else {
                  this.tab1 = this.tab1_default;
                  this.$message.error("地址信息获取失败!");
                }
              });
            } //按钮点击事件
          },
          {
            text: "订单拦截", //按钮文本
            btnclick: () => {
              let self = this;
              let id = self.tab1.order.ID || -1;
              let ids = [];
              ids.push(id);
              axios({
                url: "/api/cs/oc/oms/v1/orderInterception",
                method: "post",
                data: { ids: ids }
              }).then(function (res) {
                if (res.data.code === 0) {
                  self.$Message.success(res.data.message);
                  self.autoRefresh();
                } else {
                  self.$Message.error(res.data.message);
                }
              });

            } //按钮点击事件
          },
          {
            text: "取消拦截", //按钮文本
            btnclick: () => {
              let self = this;
              let id = self.tab1.order.ID || -1;
              axios({
                url: "/api/cs/oc/oms/v1/cancelInterception",
                method: "post",
                data: { ids: [id] }
              }).then(function (res) {
                if (res.data.code === 0) {
                  self.$Message.success(res.data.message);
                  self.autoRefresh();
                } else {
                  self.$Message.error(res.data.message);
                }
              });
            } //按钮点击事件
          },
          {
            text: "加入黑名单", //按钮文本
            btnclick: () => {
              this.dialogs.blacklist.data = {
                ID: this.tab1.order.ID || -1,
              }
              if (this.$refs.blackListDialog)
                this.$refs.blackListDialog[0].openConfirm();
            } //按钮点击事件
          },
          {
            text: "新增工单", //按钮文本
            btnclick: () => { } //按钮点击事件
          },
          {
            text: "额外退款", //按钮文本
            btnclick: () => {
              if (this.statusName === '仓库发货' || this.statusName === '平台发货') {
                this.$store.commit("customize/TabOpen", {
                  id: -1,
                  type: "action",
                  name: "refundAfterShipment",
                  label: "额外退款编辑",
                  query: Object.assign({
                    oid: this.$route.query.id,
                    tabTitle: "额外退款编辑",
                    fromOrder: true,
                    new: true
                  })
                });
              } else {
                this.$Message.warning('只有仓库发货或者平台发货的订单才能操作!');
              }

            } //按钮点击事件
          },
          {
            text: "新增退单", //按钮文本
            btnclick: () => {
              let orderDetails = this.tab1.order
              // “仓库发货”、“平台发货”
              if (![5, 6].includes(orderDetails.ORDER_STATUS)) {
                this.$Message.warning('订单状态为仓库发货和平台发货才能新增退单!')
                return
              }
              this.$store.commit("customize/TabOpen", {
                id: -1,
                type: "action",
                name: "returngood",
                label: "退换货单新增",
                query: {
                  id: -1,
                  orderHrefReturnid: orderDetails.ID,
                  isOrderHrefReturn: "order",
                  tabTitle: "退换货单新增"
                }
              });
            }
          },
          {
            text: "刷新", //按钮文本
            btnclick: () => {
              this.autoRefresh();
            } //按钮点击事件
          },
          {
            text: "返回", //按钮文本
            btnclick: () => {
              this.$store.commit("customize/TabHref", {
                id: 2627,
                type: "action",
                name: "orderManager",
                label: "零售发货单",
                back: true,
                query: Object.assign({
                  id: 2627,
                  tabTitle: "零售发货单"
                })
              });
            } //按钮点击事件
          },
          {
            text: "丢单复制"
          },
          {
            text: '错发复制'
          },
          {
            text: '漏发复制'
          },
          {
            text: '赠品出库复制'
          },
          {
            text: '原单无效复制'
          }
        ]
      },
      enumerationList: {}
    };
  },
  watch: {
    $route(to, from) {
      if (to.path !== "/m/action/orderManageDetail") {
        return;
      }
      let id = this.$route.query ? this.$route.query.id : -1;
      this.objId = id;
      this.load();
    }
  },
  methods: {
    dropDownClickChange(val) {
      let self = this;
      switch (val) {
        case '丢单复制': {
          this.copyRouteChange(val)
          break;
        }
        case '错发复制': {
          this.copyRouteChange(val)
          break
        }
        case '漏发复制': {
          this.copyRouteChange(val)
          break
        }
        case '赠品出库复制': {
          this.copyRouteChange(val)
          break
        }
        case '原单无效复制': {
          this.copyRouteChange(val)
          break
        }
      }
    },
    // 丢单复制、错发复制、漏发复制、赠品出库复制
    copyRouteChange(type) {
      let self = this
      let selectItem = this.tab1.order
      let ORDERSTATUSNAME = selectItem.ORDER_STATUS_NAME
      if (selectItem.COPY_REASON) {
        self.$Message.warning('订单只能是原单才能复制!');
        return;
      }
      if (type === '原单无效复制') {
        if (ORDERSTATUSNAME !== '已取消' && ORDERSTATUSNAME !== '系统作废') {
          self.$Message.error('非已取消订单，不允许复制');
          return;
        }
      } else {
        if (ORDERSTATUSNAME !== '仓库发货' && ORDERSTATUSNAME !== '平台发货') {
          self.$Message.error('只能对【仓库发货，平台发货】订单状态的原单进行复制操作');
          return;
        }
      }
      // 默认是丢单复制的query
      let query = {
        id: self.$route.query.id,
        pageTitle: type
      }
      if (type === '丢单复制') {
        query.orderCopy = true
      } else {
        query.copyOrder = true
      }
      self.$store.commit("customize/TabHref", {
        id: -1,
        type: "action",
        name: "orderManageAdd",
        label: "零售发货单新增",
        query: query
      });
    },
    labelClick(item, index) {
      this.labelDefaultValue = item.value;
      if (item.value === "OC_B_ORDER") return;
      this.tab2 = {
        tablename: this.labelDefaultValue,
        objid: this.objId
      };
    },
    autoRefresh() {
      let self = this;
      this.refresh = false;
      self.$nextTick(function () {
        this.load();
        this.refresh = true;
      });
    },
    freshLoad(val) {
      this.load(val)
    },
    load(val) {
      let data = { ID: this.objId };
      if (val) {
        data['isShowPii'] = true;
      }
      this.pageLoad = true
      axios({
        url: "/api/cs/oc/oms/v1/getDetail",
        method: "post",
        data: data
      }).then(res => {
        this.pageLoad = false
        if (res.data && res.data.code === 0) {
          let resData = res.data.data;
          resData.TO_SETTLE_STATUS_TAG = data.RESERVE_BIGINT02 === null ? '否' : '是'
          let TO_SETTLE_STATUS_NAME = (this.enumerationList['UPLOAD_SAP_STATUS'].find(val => val.value === resData.TO_SETTLE_STATUS) || {}).label
          resData.TO_SETTLE_STATUS_NAME = TO_SETTLE_STATUS_NAME || ''
          this.tab1.order = resData;
          let statusList = ['未确认', '已审核', '配货中', '仓库发货', '平台发货', '已确认收货', '已取消', '系统作废', '交易完成', '预售待发货', '预售缺货', '缺货'];
          if (statusList.includes(res.data.data.ORDER_STATUS_NAME)) {
            this.statusName = res.data.data.ORDER_STATUS_NAME;
          } else {
            this.statusName = "";
          }
        } else {
          this.tab1 = this.tab1_default;
          this.$message.error("订单详情获取失败");
        }
      }).catch(() => {
        this.pageLoad = false
      });
    },
    getWritData() {
      let data = { ID: this.objId, isShowPii: true };
      return axios({
        url: "/api/cs/oc/oms/v1/getDetail",
        method: "post",
        data: data
      })
    },
    asyncOK() {
      let self = this;
      let ids = [];
      ids.push(this.tab1.order.ID);
      if (this.error_type === "auditing") {
        axios({
          url: "/api/cs/oc/oms/v1/auditOrder",
          method: "post",
          data: { ids: ids, type: "2", isCheck: 1 }
        }).then(res => {
          self.$Message.info(res.data.message);
          self.modal = false;
        });
      }
    },
  },
  created() {
    let id = this.$route.query ? this.$route.query.id : -1;
    this.objId = id;
    this.tab1 = {
      order: {
        ADJUST_AMT: "",
        BILL_NO: "",
        COD_AMT: "",
        CONSIGN_AMT: 0,
        CONSIGN_SHIP_AMT: "",
        CP_C_LOGISTICS_ENAME: "",
        CP_C_PHY_WAREHOUSE_ID: "",
        CP_C_REGION_AREA_ENAME: "",
        CP_C_REGION_CITY_ENAME: "",
        CP_C_REGION_PROVINCE_ENAME: "",
        CP_C_SHOP_TITLE: "",
        EXPRESSCODE: "",
        INSIDE_REMARK: "",
        LOGISTICS_COST: "",
        OPERATE_AMT: "",
        ORDER_AMT: "",
        ORDER_DATE: "",
        ORDER_DISCOUNT_AMT: "",
        ORIG_RETURN_ORDER_ID: "",
        PAY_TYPE: "",
        PLATFORM: "",
        PRODUCT_AMT: 0,
        PRODUCT_DISCOUNT_AMT: "",
        RECEIVED_AMT: "",
        RECEIVER_ADDRESS: "",
        RECEIVER_MOBILE: "",
        RECEIVER_NAME: "",
        RECEIVER_PHONE: "",
        RECEIVER_ZIP: "",
        SYSREMARK: "",
        SHIP_AMT: "",
        SOURCE_CODE: "",
        SYSREMARK: "",
        USER_NICK: "",
        WEIGHT: "",
        CP_C_PHY_WAREHOUSE_ENAME: ""
      }
    };
    this.pageLoad = true
    axios({
      url: this.$httpApi.public.selectLimitGroups,
      method: 'post',
      data: ["UPLOAD_SAP_STATUS"]
    }).then(res => {
      if (Array.isArray(res.data)) {
        res.data.forEach(item => {
          this.enumerationList[item.name] = item.adLimitvalues.map(val => ({
            label: val.description,
            value: Number(val.value)
          }))
        })
      } else {
        this.enumerationList['UPLOAD_SAP_STATUS'] = []
      }
      this.$nextTick(() => {
        this.pageLoad = false
        this.load();
        this.getPermissions("btnConfig", "orderManager");
      })
    }).catch(() => {
      this.pageLoad = false
    });
  }/* ,
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        this.load();
        this.getPermissions("btnConfig", "orderManager");
      }, 30)
    });
  } */
};
</script>
<style lang="less" scoped>
.order {
  .order-btn {
    // padding: 10px 10px 0px 10px;
    padding-top: 10px;
    width: calc(100% - 190px);
    z-index: 1000;
    position: fixed;
    top: 84px;
    background: #fff;
  }
  .order-header {
    position: fixed;
    z-index: 999;
    top: 128px;
    width: 100%;
    background: #fff;
  }
  .order-content {
    margin-top: 88px;
  }
  .statusFlag {
    position: fixed !important;
    right: 60px !important;
    top: 120px !important;
  }
}
</style>
