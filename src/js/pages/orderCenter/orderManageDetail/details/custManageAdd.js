// 零售发货单-详情-订单明细
import publicMethodsUtil from '@/assets/js/public/publicMethods';
import buttonPermissionsMixin from '@/assets/js/mixins/buttonPermissions';
import dataAccessMixin  from '@/assets/js/mixins/dataAccess';
import dateUtil from '@/assets/js/__utils__/date';

export default {
  data() {
    return {
      vmI18n: window.vmI18n,
      isCombination: 1, // 1:组合商品 2:组合商品下挂商品
      tableItemUrl: '/api/cs/oc/oms/v1/getOrderDetailList',
      tableConfig: {
        businessButtonConfig: {
          typeAll: 'error', // 按钮统一风格样式
          btnsite: 'left', // 按钮位置 (right , center , left)
          buttons: [
            {
              type: '', // 按钮类型
              text: '删除赠品', // 按钮文本
              isShow: true,
              btnclick: () => {
                this.deleteItem();
              } // 按钮点击事件
            },
            {
              type: '', // 按钮类型
              text: '添加赠品', // 按钮文本
              isShow: true,
              btnclick: () => {
                // 判断条件是否符合
                const self = this;
                const status = self.componentData.order.ORDER_STATUS || '';
                if (status === 3) {
                  this.$Message.error(
                      '订单已审核，不允许添加赠品记录，建议反审核再进行修改！'
                  );
                  return;
                }
                if (![1, 2].includes(status)) {
                  this.$Message.error('当前状态异常，不允许添加赠品！');
                  return;
                }
                if (self.componentData.order.PLATFORM === 19) {
                  this.$Message.error('该订单为JITX订单, 不允许添加赠品！');
                  return;
                }

                this.BtnClickEvent({ name: 'ADDGIFT' });
              } // 按钮点击事件
            },
            // {
            //   type: '', // 按钮类型
            //   text: '标记退款完成', // 按钮文本
            //   isShow: true,
            //   btnclick: () => {
            //     this.returnAccount();
            //   } // 按钮点击事件
            // },
            {
              type: '', // 按钮类型
              text: '替换商品', // 按钮文本
              isShow: true,
              btnclick: () => {
                // 是否可以更换商品
                // this.modifyGoodsCheck();
                this.replaceGoodsDetail();
              } // 按钮点击事件
            },
            // {
            //   text: '标记取消退款',
            //   isShow: true,
            //   btnclick: () => {
            //     this.flagCalcelRefund();
            //   }
            // }
          ]
        }, // 按钮配置
        isShowSelection: true,
        loading: false,
        indexColumn: true,
        columns: [],
        data: [],
        pageShow: false, // 控制分页是否显示
        btnsShow: true, // 控制操作按钮是否显示
        searchInputShow: false, // 控制搜索框是否显示
        width: '', // 表格宽度
        height: '', // 表格高度
        border: true, // 是否显示纵向边框
        total: 0, // 设置总条数
        pageSizeOpts: [10, 20, 30], // 每页条数切换的配置
        pageSize: 1000, // 每页条数
        totalData: [] // 总计
      },
      selection: [],
      checkSelection: [],
      objid: '',
      options: {}, // 自定义属性（选填）
      islackstock: [
        {
          label: '是',
          value: '1'
        },
        {
          label: '否',
          value: '0'
        }
      ],
      livePlatformArr: [],
      giftTypeArr: [],
    };
  },
  mixins: [buttonPermissionsMixin, dataAccessMixin],
  components: {
  },
  props: {
    componentData: {},
    isQh: {
      type: Boolean
    }
  },
  watch: {
    componentData: {
      handler(newVal) {
        this.request(newVal);
      },
      deep: true
    },
    isQh() {
      this.tableConfig.businessButtonConfig.buttons.forEach((item) => {
        item.isShow = this.isQh;
      });
    }
  },
  async created() {
    const { data } = await this.service.orderCenter.selectLimitGroups(['LIVE_PLATFORM', 'GIFT_TYPE']);
    if (Array.isArray(data)) {

      data.forEach((item) => {
        if (item.name === 'LIVE_PLATFORM') {
          this.livePlatformArr = item.adLimitvalues.map(val => ({
            label: val.description,
            value: val.value
          }));
        } else {
          this.giftTypeArr = item.adLimitvalues.map(val => ({
            label: val.description,
            value: val.value
          }));
        }
      });
    }
    this.$nextTick(() => {
      this.getPermissions('tableConfig.businessButtonConfig', 'orderManager');
    });
  },
  methods: {
    // 切换组合商品下拉
    checkCombination() {
      this.isCombination == 1 ? this.isCombination = 2 : this.isCombination = 1;
      this.request(this.componentData);
    },
    async deleteItem() {
      const self = this;
      const itemId = this.checkSelection.map(row => row.ID);
      // const changeGoodsSKu = this.checkSelection.map(row => row.PS_C_PRO_ECODE);
      // 至少选择一条订单明细
      if (itemId.length === 0) return self.$Message.error($it('tip.zk'));
      const param = {
        ids: [self.objid],
        itemId,
        detail: 'Y'
      };
      const { data: { code, message } } = await this.service.orderCenter.batchDeleteGoods(param);
      if (code === 0) {
        self.$Message.success(message || $it('tip.ay'));
        self.$parent.$parent.autoRefresh();
      } else {
        self.$Message.error(message || $it('tip.z3'));
      }
    },
    // 标记退款
    async returnAccount() {
      const self = this;
      const ids = this.checkSelection.map(row => row.ID);
      if (ids.length === 0) {
        // 至少选择一条订单明细
        self.$Message.error($it('tip.zk'));
        return;
      }
      const { data: { code, message } } = await this.service.orderCenter.markrefund({ id: this.$route.params.customizedModuleId, itemIds: ids, ISJITX: 50 });
      if (code === 0) {
        self.$parent.$parent.load();
        self.$Message.success(message);
      } else {
        self.$Message.error($it('tip.z3'));
      }
    },
    // 标记取消退款
    async flagCalcelRefund() {
      const self = this;
      const ids = this.checkSelection.map(row => row.ID);
      if (ids.length === 0) {
        // 至少选择一条订单明细
        self.$Message.error($it('tip.z3'));
        return;
      }
      const { data: { data: { code, message } } } = await this.service.orderCenter.markRefundCancel({ itemIds: ids.join(','), orderId: this.$route.params.customizedModuleId });
      if (code === 0) {
        self.$parent.$parent.load();
        self.$Message.success(message);
      } else {
        self.$Message.error(message);
      }
    },
    // 替换商品
    replaceGoodsDetail() {
      if (this.checkSelection.length !== 1) {
        // 请选择一条需要替换的明细!
        this.$Message.warning($it('tip.dv'));
        return;
      }
      this.$emit('replaceGoodsDetail', this.checkSelection);
    },
    async modifyGoodsCheck() {
      const self = this;
      // self.BtnClickEvent({ name: "CHANGESKU" });
      const rows = this.selection.map(row => ({ ID: row.ID, SKU_ID: row.PS_C_SKU_ID }));
      if (rows.length === 0) {
        // 请选择一条订单明细
        self.$Message.error($it('tip.dw'));
        return;
      }
      if (rows.length > 1) {
        // 只能一条订单明细
        self.$Message.error($it('tip.dz'));
        return;
      }
      const { data: { code, message } } = await this.service.orderCenter.modifygoodscheck({ ID: rows[0].ID });
      if (code === 0) {
        self.BtnClickEvent({ name: 'CHANGESKU', rows });
      } else {
        self.$Message.error(message || $it('tip.z3'));
      }
    },
    // 选中某一项时触发
    onSelect(selection) {
      this.checkSelection = selection;
    },
    // 取消选中某一项时触发
    onSelectCancel(selection) {
      this.checkSelection = selection;
    },
    // 点击全选时触发
    onSelectAll(selection) {
      this.checkSelection = selection;
    },
    // 点击取消全选时触发
    onSelectAllCancel(selection) {
      this.checkSelection = selection;
    },
    // 单击某一行时触发
    onRowClick(row) {
      this.selection = [];
      this.selection.push(row);
    },
    // 单击某二行时触发
    onRowDblclick(row) {
      this.selection = [];
      this.selection.push(row);
    },
    // 分页change 事件
    pageChange(val) {
      this.tableConfig.current = val;
      this.request(this.componentData);
    },
    // 切换分页条数
    pageSizeChange(val) {
      this.tableConfig.pageSize = val;
      this.request(this.componentData);
    },
    tableDeleteDetail() { },
    async request(req) {
      const self = this;
      self.objid = req.objid < 0 ? self.$route.params.customizedModuleId : req.objid;
      // if (self.objid === -1) return;
      const param = {
        id: parseInt(self.objid),
        currentPage: this.tableConfig.current || 1, // 当前页
        pageSize: this.tableConfig.pageSize || 10, // 分页条数
        type: 1,
        isCombination: this.isCombination
      };
      self.tableConfig.loading = true;
      // getOrderDetailList
      const { data: { code, data } } = await this.service.orderCenter.getOrderDetailList(param);
      if (code === 0) {
        const lists = data.records || [];
        self.tableConfig.loading = false;
        lists.forEach((item) => {
          if (item.PRO_TYPE == 1 || item.PRO_TYPE == 2) {
            self.$emit('isQhMethod', true);
          }
          if (item.REFUND_STATUS == 6) {
            item.isGray = true;
          } else {
            item.isGray = false;
          }
          if (item.QTY_LOST > 0) {
            item.isOutOfStock = true;
          } else {
            item.isOutOfStock = false;
          }
        });
        self.showTable(lists);
      } else {
        self.tableConfig.loading = false;
        // 数据加载失败
        this.$Message.error($it('tip.dx'));
      }
    },
    async getColumns() {
      const columns = [
        {
          key: 'PS_C_PRO_ECODE',
          title: '商品款号',
          dataAcessKey: 'PS_C_PRO_ECODE'
        },
        // 颜色
        {
          title: '颜色',
          key: 'PS_C_CLR_ENAME',
          dataAcessKey: 'PS_C_CLR_ENAME',
          width: 130,
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
                    transfer: true
                  },
                  style: {
                    // width: '120px'
                  },
                  props: {
                    value: params.row.PS_C_CLR_ID
                  },
                  on: {
                    'on-change': (value, ev) => {
                      if (value) {
                        const colorObj = list.find(item => item.COLOR_ID === value);
                        self.tableConfig.data[params.index].PS_C_CLR_ECODE = colorObj.COLOR_CODE;
                        self.tableConfig.data[params.index].PS_C_CLR_ENAME = colorObj.COLOR_NAME;
                        self.tableConfig.data[params.index].PS_C_CLR_ID = colorObj.COLOR_ID;
                        if (self.tableConfig.data[params.index].PS_C_SIZE_ENAME) {
                          self.saveStandards(self.tableConfig.data[params.index]);
                        }
                      }
                    }
                  }
                },
                list.map(item => h('Option', {
                  props: {
                    value: item.COLOR_ID || '',
                    label: item.COLOR_NAME || ''
                  }
                }))
            );
          }
        },
        // 尺寸
        {
          title: '尺寸',
          key: 'PS_C_SIZE_ENAME',
          dataAcessKey: 'PS_C_SIZE_ENAME',
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
                    transfer: true
                  },
                  style: {
                    // width: '70px'
                  },
                  props: {
                    value: params.row.PS_C_SIZE_ID
                  },
                  on: {
                    'on-change': (value) => {
                      if (value) {
                        const sizeObj = list.find(item => item.SIZE_ID === value);
                        self.tableConfig.data[params.index].PS_C_SIZE_ECODE = sizeObj.SIZE_CODE;
                        self.tableConfig.data[params.index].PS_C_SIZE_ENAME = sizeObj.SIZE_NAME;
                        self.tableConfig.data[params.index].PS_C_SIZE_ID = sizeObj.SIZE_ID;
                        if (self.tableConfig.data[params.index].PS_C_CLR_ENAME) {
                          self.saveStandards(self.tableConfig.data[params.index]);
                        }
                      }
                    }
                  }
                },
                list.map(item => h('Option', {
                  props: {
                    value: item.SIZE_ID || '',
                    label: item.SIZE_NAME || ''
                  }
                }))
            );
          }
        },
        {
          key: 'PS_C_SKU_ECODE',
          title: '商品SKU',
          dataAcessKey: 'PS_C_SKU_ECODE'
        },
        {
          key: 'PS_C_PRO_ENAME',
          title: '商品名称',
          dataAcessKey: 'PS_C_PRO_ENAME',
          width: 100,
          render: (h, params) => h('span', [
            h(
                'Poptip',
                {
                  props: {
                    placement: 'bottom',
                    transfer: true,
                    trigger: 'hover'
                  }
                },
                [
                  h(
                      'span',
                      {
                        style: {
                          width: '100px',
                          'white-space': 'nowrap',
                          'text-overflow': 'ellipsis',
                          overflow: 'hidden'
                        }
                      },
                      params.row.PS_C_PRO_ENAME
                  ),
                  h(
                      'span',
                      {
                        slot: 'content'
                      },
                      params.row.PS_C_PRO_ENAME
                  )
                ]
            )
          ])
        },
        // 性别
        {
          title: '商品重量(KG)',
          key: 'STANDARD_WEIGHT',
        },
        {
          title: '性别',
          key: 'SEX_NAME',
          dataAcessKey: 'SEX'
        },
        {
          key: 'QTY',
          title: '数量',
          dataAcessKey: 'QTY'
        },
        // 缺货数量
        {
          key: 'QTY_LOST',
          title: '缺货数量',
          dataAcessKey: 'QTY_LOST'
        },
        // {
        //   key: 'STOCK',
        //   title: '可用库存',
        //   dataAcessKey: 'STOCK'
        // },
        // {
        //   key: "IS_LACKSTOCK",
        //   title: "实物报缺",
        //   dataAcessKey: "IS_LACKSTOCK",
        //   width: 80,
        //   render: (h, params) => {
        //     // 订单状态为未确认或者缺货状态时,实物报缺为可修改
        //     let self = this;
        //     if ([1, 2].includes(self.componentData.order.ORDER_STATUS)) {
        //       return h(
        //         "Select",
        //         {
        //           style: {
        //             width: "70px",
        //             color: params.row.IS_LACKSTOCK == 1 ? "#fd6442" : "#575757"
        //           },
        //           attrs: {
        //             disabled: false
        //           },
        //           props: {
        //             value: String(params.row.IS_LACKSTOCK),
        //             transfer: true
        //           },
        //           on: {
        //             "on-change": (value, ev) => {
        //               let self = this;
        //               self.tableConfig.data[params.index].IS_LACKSTOCK = Number(
        //                 value
        //               );
        //               let obj = {
        //                 itemId: params.row.ID,
        //                 orderId: self.componentData.objid,
        //                 isLackstock: value
        //               };
        //               self.saveLackStock(obj);
        //             }
        //           }
        //         },
        //         this.islackstock.map(item =>
        //           h("Option", {
        //             props: {
        //               value: item.value,
        //               label: item.label
        //             }
        //           })
        //         )
        //       );
        //     } else {
        //       let IS_LACKSTOCK = params.row.IS_LACKSTOCK === 1 ? "是" : "否";
        //       return h(
        //         "span",
        //         {
        //           style: {
        //             color: params.row.IS_LACKSTOCK === 1 ? "#fd8368" : "#575757"
        //           }
        //         },
        //         IS_LACKSTOCK
        //       );
        //     }
        //   }
        // },
        {
          key: 'IS_GIFT',
          title: '是否赠品',
          dataAcessKey: 'IS_GIFT',
          render: (h, params) => {
            const IS_GIFT = params.row.IS_GIFT === 1 ? '是' : '否';
            return h('span', {}, IS_GIFT);
          }
        },
        {
          key: 'GIFT_RELATION',
          title: '赠品挂靠关系',
          dataAcessKey: 'GIFT_RELATION',
        },
        {
          key: 'GIFT_TYPE',
          title: '赠品类型',
          dataAcessKey: 'GIFT_TYPE',
          render: (h, params) => {
            const self = this;
            const list = self.giftTypeArr;
            return h(
                'Select',
                {
                  attrs: {
                    disabled: true,
                    placeholder: ''
                  },
                  style: {
                    width: '100px'
                  },
                  props: {
                    value: params.row.GIFT_TYPE
                  }
                },
                list.map(item => h('Option', {
                  props: item
                }))
            );
          }
        },
        {
          key: 'PRICE_TAG',
          title: '吊牌价',
          dataAcessKey: 'PRICE_TAG',
          render: (h, params) => h(
              'span',
              {},
              params.row.PRICE_TAG
          )
        },
        {
          key: 'PRICE',
          title: '平台售价',
          // render: (h, params) => {
          //   return h("span", {}, params.row.PRICE_LIST.toFixed(2));
          // }
        },
        {
          key: 'PRICE_ACTUAL',
          title: '成交单价',
          render: (h, params) => h('span', {}, params.row.PRICE_ACTUAL)
        },
        {
          key: 'REAL_AMT',
          title: '成交金额',
          dataAcessKey: 'REAL_AMT',
          render: (h, params) => h('span', {}, params.row.REAL_AMT)
        },
        // {
        //   key: "PRICE_SETTLE",
        //   title: "结算单价",
        //   dataAcessKey: "PRICE_SETTLE",
        //   render: (h, params) => {
        //     return h("span", {}, params.row.PRICE_SETTLE);
        //   }
        // },
        // {
        //   key: "TOT_PRICE_SETTLE",
        //   title: "结算金额",
        //   dataAcessKey: "TOT_PRICE_SETTLE",
        //   render: (h, params) => {
        //     return h("span", {}, params.row.TOT_PRICE_SETTLE);
        //   }
        // },
        {
          key: 'AMT_DISCOUNT',
          title: '优惠金额',
          dataAcessKey: 'AMT_DISCOUNT',
          render: (h, params) => h('span', {}, params.row.AMT_DISCOUNT)
        },
        {
          key: 'ADJUST_AMT',
          title: '调整金额',
          dataAcessKey: 'ADJUST_AMT',
          render: (h, params) => h('span', {}, params.row.ADJUST_AMT)
        },
        {
          key: 'ORDER_SPLIT_AMT',
          title: '平摊金额',
          dataAcessKey: 'ORDER_SPLIT_AMT',
          render: (h, params) => h('span', {}, params.row.ORDER_SPLIT_AMT)
        },
        {
          key: 'EXPAND_CARD_EXPAND_PRICE_USED_SUBORDER',
          title: '购物金核销子订单权益金分摊金额',
          dataAcessKey: 'EXPAND_CARD_EXPAND_PRICE_USED_SUBORDER'
        },
        {
          key: 'EXPAND_CARD_BASIC_PRICE_USED_SUBORDER',
          title: '购物金核销子订单本金分摊金额',
          dataAcessKey: 'EXPAND_CARD_BASIC_PRICE_USED_SUBORDER'
        },
        {
          key: 'REFUND_STATUS_EXT',
          title: '取消状态',
          dataAcessKey: 'REFUND_STATUS',
        },
        {
          key: 'PT_RETURN_STATUS_EXT',
          title: '平台退款状态',
        },
        {
          key: 'DISTRIBUTION_PRICE',
          title: '分销金额',
          dataAcessKey: 'DISTRIBUTION_PRICE',
          render: (h, params) => h(
              'span',
              {},
              params.row.DISTRIBUTION_PRICE == null
                  ? params.row.DISTRIBUTION_PRICE
                  : Number(params.row.DISTRIBUTION_PRICE).toFixed(2)
          )
        },
        {
          key: 'ANCHOR_ID',
          title: '主播ID',
          dataAcessKey: 'ANCHOR_ID',
          width: 100
        },
        {
          key: 'ANCHOR_NAME',
          title: '主播昵称',
          dataAcessKey: 'ANCHOR_NAME',
          width: 120
        },
        {
          key: 'LIVE_PLATFORM',
          title: '直播来源',
          dataAcessKey: 'LIVE_PLATFORM',
          width: 130,
          render: (h, params) => {
            const self = this;
            const list = self.livePlatformArr;
            return h(
                'Select',
                {
                  attrs: {
                    disabled: true,
                    placeholder: ''
                  },
                  style: {
                    width: '100px'
                  },
                  props: {
                    value: params.row.LIVE_PLATFORM
                  }
                },
                list.map(item => h('Option', {
                  props: item
                }))
            );
          }
        },
        {
          key: 'AC_F_MANAGE_ENAME',
          title: '直播主体',
          dataAcessKey: 'AC_F_MANAGE_ENAME'
        },
        {
          key: 'COOPERATE_ENAME',
          title: '配合主体',
          dataAcessKey: 'COOPERATE_ENAME'
        },
        {
          key: 'LIVE_EVENTS',
          title: '直播场次',
          dataAcessKey: 'LIVE_EVENTS'
        },
        {
          key: 'TID',
          title: '原始平台单号',
          dataAcessKey: 'TID'
        },
        {
          key: 'RESERVE_VARCHAR01',
          title: '促销编码',
          dataAcessKey: 'RESERVE_VARCHAR01'
        },
        {
          key: 'OOID',
          title: '子订单编号',
          dataAcessKey: 'OOID'
        },
        {
          key: 'ESTIMATE_CON_TIME',
          title: '预计发货时间',
          dataAcessKey: 'ESTIMATE_CON_TIME',
          render: (h, params) => {
            const { ESTIMATE_CON_TIME } = params.row
            let time = ESTIMATE_CON_TIME ? dateUtil.getFormatDate(new Date(ESTIMATE_CON_TIME), 'yyyy-MM-dd HH:mm:ss') : ''
            return h('span', time)
          }
        },
        {
          key: 'ADVANCE_TYPE',
          title: '预售类型',
          dataAcessKey: 'ADVANCE_TYPE'
        },
        // {
        //   key: "SKU_SPEC",
        //   title: "规格",
        //   width: 160,
        //   render: (h, params) => {
        //     let self = this;
        //     let list = params.row.STANDARDS_LIST || [];
        //     if (!self.componentData.order)
        //       return h("span", {}, params.row.SKU_SPEC);
        //     let status = self.componentData.order.ORDER_STATUS || "";
        //     let wms_cancel_status =
        //             self.componentData.order.WMS_CANCEL_STATUS || "";
        //     //订单状态非未确认、缺货、配货中且WMS撤回状态为已撤回
        //     if (
        //             ![1, 2].includes(status) &&
        //             !(status === 4 && wms_cancel_status === 1)
        //     ) {
        //       return h("span", {}, params.row.SKU_SPEC);
        //     }
        //     return h(
        //             "Select",
        //             {
        //               attrs: {
        //                 transfer: true
        //               },
        //               style: {
        //                 width: "150px"
        //               },
        //               props: {
        //                 value: params.row.SKU_SPEC //结算方式
        //               },
        //               on: {
        //                 "on-change": (value, ev) => {
        //                   let self = this;
        //                   let o = this.searchSkuId(value, list);
        //                   // let skuid = o.SKU_ID || -1;
        //                   // let sku_ecode = o.SKU_ECODE||'';
        //                   let oc_b_order_item_id = params.row.ID || -1;
        //                   let obj = {
        //                     oc_b_order_item_id: oc_b_order_item_id,
        //                     standards: value,
        //                     oc_b_order_id: self.objid,
        //                   };
        //                   obj = Object.assign(obj,o);
        //                   this.saveStandards(obj);
        //                 }
        //               }
        //             },
        //             list.map(item =>
        //                     h("Option", {
        //                       props: {
        //                         value: item.SPEC||'',
        //                         label: item.SPEC||''
        //                       }
        //                     })
        //             )
        //     );
        //   }
        // }
      ];

      // 接口获取元数据
      const formdata = new FormData();
      formdata.append('table', "oc_b_order_item");
      formdata.append('objid', this.$route.params.customizedModuleId);
      formdata.append('refcolid', "169188");
      formdata.append(
          'searchdata',
          '{"column_include_uicontroller":true,"startindex":0,"fixedcolumns":{}}'
      );
      let _columns_ = [];
      const res = await this.service.common.objectTableItem(formdata),
          { code, datas: { tabth } } = res.data;
      if (code === 0 && tabth && tabth.length) {
        tabth?.forEach(n => {
          const tempArr = columns.filter(m => m.key === n.colname);
          if (!n.isak)
            _columns_.push({ title: n.name, key: n.colname, dataAcessKey: n.name, ...(tempArr.length ? tempArr[0] : {}) });
        });
      }
      const param = { ID: this.$route.params.customizedModuleId, "sss": "1" };
      await this.service.orderCenter.getDetail(param).then(res => {
        const { data: { code, data: { PLATFORM } } } = res;
        // 唯品会（19） +平台条码
        if (code === 0 && PLATFORM !== 19) {
          const _index = _columns_.findIndex((item => item.key === "BARCODE"));
          _index >= 0 ? _columns_.splice(_index, 1) : ""
        }
        // 定义表格表头
        this.getDataAccess('OC_B_ORDER', (res) => {
          this.columns = this.setTablePermissions(_columns_, res);
          this.$set(this.tableConfig, 'columns', this.columns);
        });
      })
    },

    showTable(obj) {
      const tbody = obj
      let totalData = [];
      // 明细合计
      let amt = 0;
      let qty = 0;
      obj.forEach((item) => {
        if (item.REAL_AMT !== null) {
          amt = publicMethodsUtil.accAdd(
              parseFloat(item.REAL_AMT).toFixed(2),
              amt
          );
          qty += Number(item.QTY);
        }
      });
      totalData = [
        {
          index: '总计',
          REAL_AMT: amt,
          QTY: qty
        }
      ];
      this.tableConfig = Object.assign(this.tableConfig, {
        columns: this.columns,
        isShowSelection: true,
        indexColumn: true, // 是否展示需要
        data: tbody,
        pageShow: false, // 控制分页是否显示
        btnsShow: true, // 控制操作按钮是否显示
        searchInputShow: false, // 控制搜索框是否显示
        width: '', // 表格宽度
        height: '', // 表格高度
        border: true, // 是否显示纵向边框
        total: obj.totalRowCount, // 设置总条数
        pageSizeOpts: obj.selectRange, // 每页条数切换的配置
        pageSize: obj.defaultrange, // 每页条数
        totalData // 总计
      });
    },
    BtnClickEvent(opt) {
      this.$emit('BtnClickEvent', opt);
    },
    /** 保存规格 /ps/c/saveStandards */
    async saveStandards(data) {
      const self = this;
      const obj = data.STANDARDS_LIST.find(item => item.COLOR_ID === data.PS_C_CLR_ID && item.SIZE_ID === data.PS_C_SIZE_ID);
      // 此商品中不存在该颜色和尺寸
      if (!obj) return this.$Message.warning($it('tip.dy'));
      const oc_b_order_item_id = data.ID || -1;
      let param = {
        oc_b_order_item_id, // 行ID
        oc_b_order_id: self.objid // 订单ID
      };
      param = Object.assign(param, obj);
      const { data: { code, message } } = await this.service.orderCenter.saveStandards(param);
      if (code === 0) {
        self.$Message.success(message);
        self.$emit('freshLoadChild');
      } else {
        self.$Message.error(message);
      }
    },
    // 实物报缺保存
    async saveLackStock(param) {
      const self = this;
      const { data: { code, message } } = await this.service.orderCenter.updateIsLackstock(param);
      if (code === 0) {
        self.$Message.success(message || '成功');
        self.$emit('freshLoadChild');
      } else {
        self.$Message.error(message || $it('tip.z3'));
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.getColumns();
      if (this.componentData && this.componentData.tablename) {
        this.request(this.componentData);
      }
    })
  }
};
