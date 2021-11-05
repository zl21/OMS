
// import axios from 'axios';
import { OmsButton } from 'burgeonComponents'
import { OmsForm } from 'burgeonComponents';
// import { setTimeout } from 'timers';
import { OmsTable } from 'burgeonComponents'

export default {
  components: {
    OmsButton,
    businessForm,
    OmsTable,
  },
  data() {
    return {
      vmI18n:$i18n,
      order: {
        modal: false,
        btn: {
          typeAll: 'default', // 按钮统一风格样式
          buttons: [
            {
              text: '查找', // 按钮文本
              disabled: false, // 按钮禁用控制
              btnclick: () => {
                this.queryBounced();
              } // 按钮点击事件
            }
          ]
        },
        orderform: {
          formValue: {
            id: '',
            receive_name: '',
            buyer_nick: '',
            user_nick: '',
            receive_mobile: '',
            logistics_code: '',
            tag: 0
          },
          formData: [
            {
              style: 'input',
              // label: '物流编号',
              label: $i18n.t('form_label.logisticsNo'),
              value: 'logistics_code',
              width: '8',
              inputenter: () => this.queryBounced()
            },
            {
              style: 'input',
              label: '退换货单号',
              value: 'id',
              width: '8',
              inputenter: () => this.queryBounced()
            }, {
              style: 'input',
              label: '收货人',
              value: 'receive_name',
              width: '8',
              inputenter: () => this.queryBounced()
            }, {
              style: 'input',
              label: '买家昵称',
              value: 'buyer_nick',
              width: '8',
              inputenter: () => this.queryBounced()
            }, {
              style: 'input',
              label: '收货人手机',
              value: 'receive_mobile',
              width: '8',
              inputenter: () => this.queryBounced()
            }
          ]
        },
        table: {
          columns: [
            {
              key: 'ID',
              title: '退单编号'
            },
            // {
            //   key: "ORIG_SOURCE_CODE",
            //   title: "平台单号"
            // },
            {
              key: 'LOGISTICS_CODE',
              title: '物流单号'
            },
            {
              key: 'PRODUCTITEMS',
              title: '商品信息',
              render: (h, params) => {
                if (
                  params.row.PRODUCTITEMS
                  && params.row.PRODUCTITEMS.length !== 0
                ) {
                  return h(
                    'div',
                    {
                      style: {
                        display: 'flex',
                        'justify-content': 'space-between'
                      }
                    },
                    params.row.PRODUCTITEMS.map(item => h(
                      'div',
                      {
                        style: {
                          padding: '4px 6px',
                          border: '1px solid #d3d3d3',
                          position: 'relative',
                          marginRight: '10px'
                        }
                      },
                      [
                        h('span', {}, `${item.PS_C_PRO_ECODE},${item.PS_C_CLR_ENAME},${item.PS_C_SIZE_ENAME}`),
                        h(
                          'div',
                          {
                            style: {
                              'min-width': '16px',
                              height: '16px',
                              'line-height': '14px',
                              border: '1px solid #DCDEE2',
                              borderRadius: '9px',
                              backgroundColor: '#84C9E2',
                              'font-size': '6px',
                              position: 'absolute',
                              top: '-1px',
                              right: '-8px',
                              zIndex: '1',
                              color: 'white',
                              'text-align': 'center'
                            }
                          },
                          item.QTY_REFUND
                        ),
                      ]
                    ))
                  );
                }
                  return h(
                    'div',
                    {
                      style: {
                        display: 'flex',
                        'justify-content': 'space-between'
                      }
                    },
                  );
              }
            },
            {
              key: 'shopName',
              title: '实体仓库'
            },
            {
              key: 'CP_C_SHOP_TITLE',
              title: $i18n.t('table_label.shopName'), // 店铺名称
            },
            {
              key: 'RECEIVE_NAME',
              title: '收货人'
            },
            // {
            //   key: "ORIG_ORDER_ID",
            //   title: "原单单号"
            // }
          ], // 表头
          data: [], // 数据配置
          indexColumn: true, // 是否显示序号
          height: '300',
          loading: false,
          isShowSelection: true // 是否显示checkedbox
        },
        value: ''
      }, // 查询退单数据
      wrong: {
        modal: false,
        table: {
          columns: [
            {
              key: 'PS_C_PRO_ECODE',
              title: '商品编码'
            },
            {
              key: 'PS_C_CLR_ENAME',
              title: '颜色'
            },
            {
              key: 'PS_C_SIZE_ENAME',
              title: '尺寸'
            },
            {
              key: 'PS_C_SKU_ECODE',
              title: '条码'
            },
            {
              key: 'PS_C_PRO_ENAME',
              title: '商品名称'
            },
            {
              key: 'BARCODE',
              title: '国标码'
            },
            {
              key: 'QTY_REFUND',
              title: '数量'
            }
          ], // 表头
          data: [], // 数据配置
          indexColumn: true, // 是否显示序号
          height: '300',
          loading: false,
          isShowSelection: true // 是否显示checkedbox
        },
      },
      btnConfig: {
        typeAll: 'default', // 按钮统一风格样式
        btnsite: 'right', // 按钮位置 (right , center , left)
        buttons: [
          {
            text: $i18n.t('common.determine'), // 确定 按钮文本
            size: 'small', // 按钮大小
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              const _this = this;
              if (_this.selectData.length !== 1) return _this.$Message.error('请选择一条数据');
              if (_this.componentData.type == 2) _this.okClick();
              else if (_this.componentData.type == 3) _this.okClick2();
            } // 按钮点击事件
          },
          {
            text: $i18n.t('common.cancel'), // 取消 按钮文本
            size: 'small', // 按钮大小
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              // this.$refs.changeLogistics.close();
              this.$parent.$parent.closeConfirm();
            } // 按钮点击事件
          }
        ]
      }, // 确定取消按钮
      selectData: [], // 选中的数据
      wrongSelectData: [], // 明细选中的数据
    };
  },
  props: {
    componentData: {
      type: Object,
      default: {}
    }
  },
  methods: {
    // 初始化数据
    initData() {
      this.order.table.data = [];
      this.selectData = [];
    },
    // 查询原始订单编号
    async queryBounced() {
      //  获取页面数据
      const _this = this;
      _this.order.table.data = [];
      const lists = _this.order.orderform.formValue;
      if (!lists.id && !lists.receive_name && !lists.buyer_nick && !lists.receive_mobile && !lists.logistics_code) {
        _this.$Message.error('请输入查询条件！');
        return;
      }
      _this.order.table.loading = true;
      const param = {
        tag: 0
      };
      if (lists.id) param.id = lists.id;
      if (lists.receive_name) param.receive_name = lists.receive_name;
      if (lists.buyer_nick) param.buyer_nick = lists.buyer_nick;
      if (lists.receive_mobile) param.receive_mobile = lists.receive_mobile;
      if (lists.logistics_code) param.logistics_code = lists.logistics_code;
      try {
        const res = await _this.service.common.searchButtonsInJdDetail(param);
        if (res.data.code == 0 && res.data.data !== null) {
          for (let i = 0, list = res.data.data.length; i < list; i++) {
            res.data.data[i].ORIG_ORDER_NO = res.data.data[i].ORIG_ORDER_ID;
            _this.order.table.data.push(res.data.data[i]);
          }
        }
        _this.order.table.loading = false;
      } catch (e) {
        _this.$Message.error(e.message);
        _this.order.table.loading = false;
      }
    },
    // 手工匹配确定
    async okClick() {
      const _this = this;
      const param = {
        refundId: _this.componentData.ids,
        id: _this.selectData[0].ID,
        refundInId: this.$route.query.id
      };
      const res = await this.service.common.manualJdMatchingConfirmationButton(param);
      if (res.data.code == 0) {
        _this.$parent.$parent.$parent.returnArr(_this.selectData[0].ID);
        _this.$parent.$parent.closeConfirm();
      } else {
        _this.$Message.warning(res.data.message);
      }
    },
    // 错发强制匹配确定
    async okClick2() {
      const _this = this;
      if (_this.selectData[0].PRODUCTITEMS.length !== 1 && _this.selectData[0].PRODUCTITEMS !== undefined) {
        _this.wrong.modal = true;
      } else if (_this.selectData[0].PRODUCTITEMS.length === 1) {
        const param = {
          refundId: _this.componentData.ids,
          returnOrderId: _this.selectData[0].ID,
          refundInId: this.$route.query.id,
          returnItem: _this.selectData[0].PRODUCTITEMS[0].ID
        };
        const res = await this.service.common.seachJdForced(param);
        if (res.data.code == 0) {
          _this.$parent.$parent.$parent.returnArr1(_this.selectData[0].ID, res.data.data.REAL_SEND_SKU, _this.selectData[0].PRODUCTITEMS[0].ID);
          // _this.$parent.$parent.$parent.getList();
          _this.$parent.$parent.closeConfirm();
        } else {
          _this.$Message.warning(res.data.message);
        }
      }
    },
    async wrongForce() {
      if (this.wrongSelectData.length !== 1) {
        return this.$Message.error('请选择一条明细！');
      }
      const param = {
        refundId: this.componentData.ids,
        returnOrderId: this.selectData[0].ID,
        refundInId: this.$route.query.id,
        returnItem: this.wrongSelectData[0].ID
      };
      const { data } = this.service.orderCenter.seachForced(param);
      this.$parent.$parent.closeConfirm();
      if (data.code == 0) {
        this.$parent.$parent.$parent.returnArr1(data.data.returnId, data.data.REAL_SEND_SKU, this.wrongSelectData[0].ID);
      } else {
        this.$Message.warning(data.message);
      }
    },
    querycancel() { },
    wrongForceSelect(e) {
      this.wrongSelectData = e;
    },
    wrongForceCancel(e) {
      this.wrongSelectData = e;
    },
    wrongSelectAll(e) {
      this.wrongSelectData = e;
    },
    wrongSelectAllCancel(e) {
      this.wrongSelectData = e;
    },
    onSelectAll(e) {
      this.selectData = e;
    },
    onSelectAllCancel(e) {
      this.selectData = e;
    },
    onquerySelect(e) {
      this.selectData = e;
      if (this.selectData.length === 1) {
        this.wrong.table.data = this.selectData[0].PRODUCTITEMS;
      } else {
        this.wrong.table.data = [];
      }
    }, // 选中的数据
    onqueryCancel(e) {
      this.selectData = e;
    },
    // 取消选中
    threeObjs() { },
  },
  created() {
    const _this = this;
    window.addEventListener('keydown', (e) => {
      const key = e.keyCode;
      if (key == 13) {
        if (_this.order.table.data.length && _this.componentData.type == 2) {
          _this.okClick();
        } else if (_this.order.table.data.length && _this.componentData.type == 3) {
          _this.okClick2();
        }
      } else if (key == 27) {
        _this.$parent.$parent.closeConfirm();
      }
    });
  },
  destroyed() {
    this.initData();
    window.removeEventListener('keydown', this, false);
  }
};
