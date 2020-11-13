import axios from 'axios';
import businessForm from 'professionalComponents/businessForm';
import jordanBtn from 'professionalComponents/businessButton';
import businessActionTable from 'professionalComponents/businessActionTable';
import jordanModal from 'professionalComponents/businessDialog';
import publicDialogConfig from 'professionalComponents/common/js/publicDialog.js';
import { listeningToKeydownMixin } from '@/assets/js/mixins/listeningToKeydown.js';

export default {
  components: {
    businessForm,
    jordanBtn,
    businessActionTable,
    jordanModal,
  },
  props: {
    componentData: {
      type: Object,
      default: {},
    },
  },
  mixins: [listeningToKeydownMixin],
  watch: {
    publicBouncedConfig(newvalue, oldvalue) {
      console.log(newvalue);
      this.publicBouncedIndex = newvalue;
      console.log(this.publicBouncedIndex);
    },
  },
  // computed:{
  //   publicBouncedConfig(){

  //   }
  // },
  data() {
    return {
      vmI18n: window.vmI18n,
      // 暂存选中数据
      selection: [],
      // 公共弹框
      publicBouncedConfig: {},
      publicBouncedIndex: {
        name: 'testModal', // 组件名称
      },
      islackstock: [
        {
          // label: "是",
          label: window.vmI18n.t('common.yes'),
          value: '1',
        },
        {
          // label: "否",
          label: window.vmI18n.t('common.no'),
          value: '0',
        },
      ],
      // 表格
      jordanTableConfig: {
        jordanBtnConfig: {
          typeAll: 'error', // 按钮统一风格样式
          btnsite: 'left', // 按钮位置 (right , center , left)
          buttons: [
            {
              type: '', // 按钮类型
              // text: "删除赠品", //按钮文本
              text: window.vmI18n.t('btn.deleteGift'), // 按钮文本
              icon: '', // 按钮图标
              size: 'small', // 按钮大小
              disabled: false, // 按钮禁用控制
              btnclick: () => {
                const self = this;
                const ids = this.selection.map(row => row.ID);
                if (ids.length === 0)
                // return self.$Message.error("至少选择一条订单明细");
                { return self.$Message.error(window.vmI18n.t('modalTips.zk')); }
                const param = {
                  orderId: self.componentData.id,
                  ids,
                };
                axios({
                  url: '/api/cs/oc/oms/v1/deleteGit',
                  method: 'post',
                  data: param,
                }).then((res) => {
                  if (res.data.code === 0) {
                    self.getData();
                    self.$parent.$parent.$parent.getData();
                    self.$Message.success(res.data.message);
                  } else {
                    self.$Message.error(res.data.message);
                  }
                });
              }, // 按钮点击事件
            },
            {
              type: '', // 按钮类型
              // text: "添加赠品", //按钮文本
              text: window.vmI18n.t('btn.addGift'), // 按钮文本
              icon: '', // 按钮图标
              size: 'small', // 按钮大小
              disabled: false, // 按钮禁用控制
              btnclick: () => {
                const self = this;
                const ids = [];
                self.selection.map((item, index) => {
                  ids[index] = item.ID;
                });

                const arr = [];
                arr.push(self.componentData.id);
                const param = {
                  ids: arr,
                };

                axios({
                  url: '/api/cs/oc/oms/v1/checkGit',
                  method: 'post',
                  data: param,
                }).then((res) => {
                  if (res.data.code === 0) {
                    self.publicBouncedConfig = publicDialogConfig.addGiftsConfig;
                    self.publicBouncedIndex = publicDialogConfig.addGiftsConfig;
                    self.$nextTick(() => {
                      self.$set(
                        self.publicBouncedConfig.componentData,
                        'ocBorderDtoItemID',
                        ids
                      );
                      self.$set(
                        self.publicBouncedConfig.componentData,
                        'ocBorderDtoID',
                        self.componentData.id
                      );
                      self.$set(
                        self.publicBouncedConfig.componentData,
                        'objid',
                        self.componentData.objid
                      );
                    });
                    // self.publicBouncedConfig.componentData = {
                    //   ocBorderDtoItemID: ids,
                    //   ocBorderDtoID: self.componentData.id,
                    //   objid: ids
                    // };
                    setTimeout(() => {
                      self.$children
                        .find(item => item.name === 'addGifts')
                        .openConfirm();
                    }, 100);
                  } else {
                    self.$Message.warning({
                      content: res.data.message,
                      duration: 5,
                      top: 80,
                    });
                  }
                });
              }, // 按钮点击事件
            },
            {
              // text: "标记退款完成", //按钮文本
              text: window.vmI18n.t('btn.rark_refundComplete'), // 按钮文本
              btnclick: () => {
                const self = this;
                const ids = this.selection.map(row => row.ID);
                if (ids.length === 0)
                // return self.$Message.error("至少选择一条订单明细");
                { return self.$Message.error(window.vmI18n.t('modalTips.zk')); }
                const param = {
                  IDS: ids.join(','),
                };
                axios({
                  url: '/api/cs/oc/oms/v1/markrefund',
                  method: 'post',
                  data: param,
                }).then((res) => {
                  if (res.data.code === 0) {
                    self.$parent.$parent.$parent.getData();
                    self.$Message.success(res.data.message);
                  } else {
                    self.$Message.warning({
                      content: res.data.message,
                      duration: 5,
                      top: 80,
                    });
                  }
                });
              }, // 按钮点击事件
            },
            {
              type: '', // 按钮类型
              // text: "更换商品", //按钮文本
              text: window.vmI18n.t('btn.replaceGoods'), // 按钮文本
              icon: '', // 按钮图标
              size: 'small', // 按钮大小
              disabled: false, // 按钮禁用控制
              btnclick: () => {
                const self = this;
                const ids = this.selection.map(row => row.ID);
                if (ids.length === 0) {
                  self.$Message.warning({
                    // content: "请选中其中一条记录",
                    content: window.vmI18n.t('modalTips.al'),
                    duration: 5,
                    top: 80,
                  });
                  return false;
                } if (ids.length > 1) {
                  self.$Message.warning({
                    // content: "请选中一条记录",
                    content: window.vmI18n.t('modalTips.am'),
                    duration: 5,
                    top: 80,
                  });
                  return false;
                }

                const param = {
                  ID: ids.join(','),
                };
                axios({
                  url: '/api/cs/oc/oms/v1/modifygoodscheck',
                  method: 'post',
                  data: param,
                }).then((res) => {
                  if (res.data.code === 0) {
                    self.publicBouncedConfig = publicDialogConfig.replaceConfig;
                    self.publicBouncedIndex = publicDialogConfig.replaceConfig;
                    self.publicBouncedConfig.componentData = {
                      ocBorderDtoItemID: ids,
                      ocBorderDtoID: self.componentData.id,
                      id: ids,
                      PS_C_SKU_ID: self.selection[0].PS_C_SKU_ID,

                      itemobjid: ids[0],
                      itemskuid: self.selection[0].PS_C_SKU_ID,
                      objid: self.componentData.id || -1,
                    };

                    // let itemobjid = rows[0].ID;
                    // let itemskuid = rows[0].SKU_ID;

                    setTimeout(() => {
                      self.$children
                        .find(item => item.name === 'replaceTheGoods')
                        .openConfirm();
                    }, 100);
                  } else {
                    self.$Message.warning({
                      content: res.data.message,
                      duration: 5,
                      top: 80,
                    });
                  }
                });
              }, // 按钮点击事件
            },
          ],
        }, // 按钮配置
        // 设置总条数
        total: 0,
        // 条数
        pageSize: 20,
        // 页数
        current: 1,
        // 表格搜索框
        // 加载中
        loading: false,
        // 是否存在操作列
        isShowAction: false,
        // 是否存在序号列
        indexColumn: true,
        // 是否存在多选框
        isShowSelection: true,
        // 是否修改搜索框为select
        isSearchText: true,
        // isSearchText为false的情况下使用 搜索框list
        searchSelectList: [],
        pageShow: false, // 控制分页是否显示
        isShowDeleteDetailBtn: false, // 控制是否显示删除明细
        isShowImportBtn: false, // 控制是否显示导入
        isShowExportBtn: false, // 控制是否显示导出

        searchInputShow: false, // 控制搜索框是否显示
        width: '', // 表格宽度
        height: 300, // 表格高度
        border: false, // 是否显示纵向边框
        pageSizeOpts: [20, 40, 60, 80], // 每页条数切换的配置
        columns: [
          {
            key: 'PS_C_PRO_ECODE',
            // title: "商品编码",
            title: window.vmI18n.t('table_label.productNo'),
          },
          {
            // title: "颜色",
            title: window.vmI18n.t('other.color'),
            key: 'PS_C_CLR_ENAME',
            width: 80,
            render: (h, params) => {
              const self = this;
              const list = params.row.CLR_LIST;
              if (!self.componentData.order || list === null) return h('span', {}, params.row.PS_C_CLR_ENAME);
              const status = self.componentData.order.ORDER_STATUS || '';
              const wms_cancel_status = self.componentData.order.WMS_CANCEL_STATUS || '';
              // 订单状态非未确认、缺货、配货中且WMS撤回状态为已撤回
              if (
                ![1, 2].includes(status)
                && !(status === 4 && wms_cancel_status === 1)
              ) {
                return h('span', {}, params.row.PS_C_CLR_ENAME);
              }
              return h(
                'Select',
                {
                  attrs: {
                    transfer: true,
                  },
                  style: {
                    width: '70px',
                  },
                  props: {
                    value: params.row.PS_C_CLR_ID,
                  },
                  on: {
                    'on-change': (value, ev) => {
                      if (value) {
                        const colorObj = list.find(
                          item => item.COLOR_ID === value
                        );
                        self.jordanTableConfig.data[
                          params.index
                        ].PS_C_CLR_ECODE = colorObj.COLOR_CODE;
                        self.jordanTableConfig.data[
                          params.index
                        ].PS_C_CLR_ENAME = colorObj.COLOR_NAME;
                        self.jordanTableConfig.data[params.index].PS_C_CLR_ID = colorObj.COLOR_ID;
                        if (
                          self.jordanTableConfig.data[params.index]
                            .PS_C_SIZE_ENAME
                        ) {
                          self.saveStandards(
                            self.jordanTableConfig.data[params.index]
                          );
                        }
                      }
                    },
                  },
                },
                list.map(item => h('Option', {
                  props: {
                    value: item.COLOR_ID || '',
                    label: item.COLOR_NAME || '',
                  },
                }))
              );
            },
          },
          // 尺寸
          {
            // title: "尺寸",
            title: window.vmI18n.t('other.sizes'),
            key: 'PS_C_SIZE_ENAME',
            width: 80,
            render: (h, params) => {
              const self = this;
              const list = params.row.SIZE_LIST;
              if (!self.componentData.order || list === null) return h('span', {}, params.row.PS_C_SIZE_ENAME);
              const status = self.componentData.order.ORDER_STATUS || '';
              const wms_cancel_status = self.componentData.order.WMS_CANCEL_STATUS || '';
              // 订单状态非未确认、缺货、配货中且WMS撤回状态为已撤回
              if (
                ![1, 2].includes(status)
                && !(status === 4 && wms_cancel_status === 1)
              ) {
                return h('span', {}, params.row.PS_C_SIZE_ENAME);
              }
              return h(
                'Select',
                {
                  attrs: {
                    transfer: true,
                  },
                  style: {
                    width: '70px',
                  },
                  props: {
                    value: params.row.PS_C_SIZE_ID,
                  },
                  on: {
                    'on-change': (value, ev) => {
                      if (value) {
                        const sizeObj = list.find(
                          item => item.SIZE_ID === value
                        );
                        self.jordanTableConfig.data[
                          params.index
                        ].PS_C_SIZE_ECODE = sizeObj.SIZE_CODE;
                        self.jordanTableConfig.data[
                          params.index
                        ].PS_C_SIZE_ENAME = sizeObj.SIZE_NAME;
                        self.jordanTableConfig.data[params.index].PS_C_SIZE_ID = sizeObj.SIZE_ID;
                        if (
                          self.jordanTableConfig.data[params.index]
                            .PS_C_CLR_ENAME
                        ) {
                          self.saveStandards(
                            self.jordanTableConfig.data[params.index]
                          );
                        }
                      }
                    },
                  },
                },
                list.map(item => h('Option', {
                  props: {
                    value: item.SIZE_ID || '',
                    label: item.SIZE_NAME || '',
                  },
                }))
              );
            },
          },
          {
            key: 'PS_C_SKU_ECODE',
            // title: "条码",
            title: window.vmI18n.t('form_label.barCode'),
          },
          {
            key: 'PS_C_PRO_ENAME',
            // title: "商品名称",
            title: window.vmI18n.t('table_label.productName'),
            width: 200,
            ellipsis: true,
          },
          // 性别
          // {
          //   title: "性别",
          //   key: "SEX_NAME"
          // },
          {
            key: 'QTY',
            // title: "数量",
            title: window.vmI18n.t('table_label.quantities'),
          },
          // 缺货数量
          {
            key: 'QTY_LOST',
            // title: "缺货数量",
            title: window.vmI18n.t('table_label.outOfStock_quantit'),
          },
          {
            key: 'STOCK',
            // title: "库存",
            title: window.vmI18n.t('table_label.stock'),
          },
          {
            key: 'IS_LACKSTOCK',
            // title: "实物报缺",
            title: window.vmI18n.t('table_label.materialShortage'),
            width: 80,
            render: (h, params) => {
              // 订单状态为未确认或者缺货状态时,实物报缺为可修改
              const self = this;
              if ([1, 2].includes(self.componentData.order.ORDER_STATUS)) {
                return h(
                  'Select',
                  {
                    style: {
                      width: '70px',
                      color:
                        params.row.IS_LACKSTOCK == 1 ? '#fd6442' : '#575757',
                    },
                    attrs: {
                      disabled: false,
                    },
                    props: {
                      value: String(params.row.IS_LACKSTOCK),
                      transfer: true,
                    },
                    on: {
                      'on-change': (value, ev) => {
                        self.jordanTableConfig.data[
                          params.index
                        ].IS_LACKSTOCK = Number(value);
                        const obj = {
                          itemId: params.row.ID,
                          orderId: self.componentData.objid.join(),
                          isLackstock: value,
                        };
                        self.saveLackStock(obj);
                      },
                    },
                  },
                  self.islackstock.map(item => h('Option', {
                    props: {
                      value: item.value,
                      label: item.label,
                    },
                  }))
                );
              } 
              const IS_LACKSTOCK = params.row.IS_LACKSTOCK === 1 ? '是' : '否';
              return h(
                'span',
                {
                  style: {
                    color:
                        params.row.IS_LACKSTOCK === 1 ? '#fd8368' : '#575757',
                  },
                },
                IS_LACKSTOCK
              );
            },
          },
          {
            key: 'IS_GIFT',
            // title: "是否赠品",
            title: window.vmI18n.t('table_label.whetherGift'),
            render: (h, params) => {
              const IS_GIFT = params.row.IS_GIFT === 1 ? '是' : '否';
              return h('span', {}, IS_GIFT);
            },
          },
          {
            key: 'PRICE_LIST',
            // title: "吊牌价",
            title: window.vmI18n.t('table_label.tagPrice'),
          },
          {
            key: 'PRICE_ACTUAL',
            // title: "成交单价",
            title: window.vmI18n.t('table_label.unitPrice'),
          },
          {
            key: 'REAL_AMT',
            // title: "成交金额",
            title: window.vmI18n.t('table_label.transactionAmount'),
          },
          {
            key: 'PRICE_SETTLE',
            // title: "结算单价",
            title: window.vmI18n.t('table_label.unitPriceSettlement'),
          },
          {
            key: 'TOT_PRICE_SETTLE',
            // title: "结算总额",
            title: window.vmI18n.t('table_label.totalSettlement'),
          },
          {
            key: 'AMT_DISCOUNT',
            // title: "优惠金额",
            title: window.vmI18n.t('table_label.preferential_amount'),
          },
          {
            key: 'ADJUST_AMT',
            // title: "调整金额",
            title: window.vmI18n.t('table_label.adjustment_amount'),
          },
          {
            key: 'ORDER_SPLIT_AMT',
            // title: "平摊金额",
            title: window.vmI18n.t('table_label.equal_amount'),
            render: (h, params) => h('span', {}, Number(params.row.ORDER_SPLIT_AMT).toFixed(2)),
          },
          {
            key: 'REFUND_STATUS_EXT',
            // title: "退款状态",
            title: window.vmI18n.t('table_label.refund_status'),
          },
          {
            key: 'DISTRIBUTION_PRICE',
            // title: "分销金额",
            title: window.vmI18n.t('table_label.distribution_amount'),
          },
        ],
        data: [],
      },
    };
  },
  methods: {
    onKeyDown(e) {
      if (e.keyCode == 27) {
        // console.log(this);
        if (this.publicBouncedIndex.name === 'testModal') {
          this.$parent.$parent.closeConfirm();
        }
      }
    },
    /** 保存规格 /ps/c/saveStandards */
    saveStandards(data) {
      const self = this;
      let obj = {};
      let isExit = false;
      data.STANDARDS_LIST.map((item) => {
        if (
          item.COLOR_ID === data.PS_C_CLR_ID
          && item.SIZE_ID === data.PS_C_SIZE_ID
        ) {
          obj = item;
          isExit = true;
        }
      });
      if (!isExit) {
        this.$Message.warning('此商品中不存在该颜色和尺寸');
        return;
      }
      const oc_b_order_item_id = data.ID || -1;
      let param = {
        oc_b_order_item_id, // 行ID
        oc_b_order_id: self.objid, // 订单ID
      };
      param = Object.assign(param, obj);
      axios({
        url: '/api/cs/oc/oms/v1/saveStandards',
        method: 'post',
        data: param,
      }).then((res) => {
        if (res.data.code === 0) {
          self.$Message.info(res.data.message);
          self.getData();
        } else {
          self.$Message.error(res.data.message);
        }
      });
    },
    // 实物报缺保存
    saveLackStock(param) {
      const self = this;
      axios({
        url: '/api/cs/oc/oms/v1/updateIsLackstock',
        method: 'post',
        data: param,
      }).then((res) => {
        if (res.data.code === 0) {
          self.$Message.success(res.data.message);
          self.getData();
        } else {
          self.$Message.error(res.data.message);
        }
      });
    },
    searchSkuId(spec, list) {
      const o = list.find(item => item.SPEC === spec);
      return o;
    },
    // 获取数据
    getData() {
      const self = this;
      self.jordanTableConfig.loading = true;
      axios({
        url: '/api/cs/oc/oms/v1/getOrderDetailList',
        method: 'post',
        data: {
          id: self.componentData.id,
          currentPage: 1,
          pageSize: 1000,
        },
      }).then((res) => {
        self.jordanTableConfig.loading = false;
        self.jordanTableConfig.data = res.data.data.records;
        self.jordanTableConfig.total = res.data.data.total;

        self.jordanTableConfig.data.forEach((item) => {
          if (item.REFUND_STATUS_EXT === '退款成功') {
            item.isGray = true;
          } else {
            item.isGray = false;
          }
        });
      });
    },
    // 分页change 事件
    pageChange(val) {
      const self = this;
      self.jordanTableConfig.current = val;
      self.getData();
    },
    // 切换分页条数
    pageSizeChange(val) {
      const self = this;
      self.jordanTableConfig.pageSize = val;
      self.getData();
    },
    // 选中某一项时触发
    onSelect(selection, row) {
      this.selection = selection;
    },
    // 取消选中某一项时触发
    onSelectCancel(selection, row) {
      this.selection = selection;
    },
    // 点击全选时触发
    onSelectAll(selection) {
      this.selection = selection;
    },

    // 点击取消全选时触发
    onSelectAllCancel(selection) {
      this.selection = selection;
    },
  },
};
