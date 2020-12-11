// 额外退款新增/编辑、已发货退款编辑  共用此组件
import reButton from 'professionalComponents/businessButton';
import reTable from 'professionalComponents/businessActionTable';
import reForm from 'professionalComponents/businessForm';
import dateFormat from '@/assets/js/__utils__/common';
import refundAfterShipment from './constants/refundAfterShipment';
import comUtils from '@/assets/js/__utils__/common';

export default {
  components: {
    reButton,
    reTable,
    reForm,
  },
  data() {
    return {
      sessionStorageData: '',
      vmI18n: window.vmI18n,
      IMAGE: '', // 图片
      imgIndex: 0, // 当前操作图片位置
      isModal: false,
      delTableData: [], // 要删除的退款单明细
      isOne: true,
      RETURN_STATUS: null,
      BILL_TYPE: '1',
      addItem: {
        // 新增明细弹框数据
        modal: false,
        table: {
          indexColumn: true,
          columns: refundAfterShipment.addItemTableColumns,
          data: [],
        },
        addList: [],
      },
      onSelectData: {},
      selectData: {},
      order: {
        modal: false,
        btn: {
          typeAll: 'error', // 按钮统一风格样式
          buttons: [
            {
              text: window.vmI18n.t('btn.find'), // 查找 按钮文本
              disabled: false, // 按钮禁用控制
              btnclick: () => {
                this.queryBounced();
                this.$nextTick(() => {
                  this.reForm.config.forEach((val, index) => {
                    if (val.item.label === '单据来源') {
                      this.reForm.config[index].item.props.value = '手动';
                    } else if (val.item.label === '单据日期') {
                      this.reForm.config[index].item.props.value = dateFormat(
                        new Date(),
                        'yyyy-MM-dd'
                      );
                    }
                  });
                });
              }, // 按钮点击事件
            },
          ],
        },
        orderform: {
          formValue: {
            bill_no: '',
            source_code: '',
            receiver_name: '',
            user_nick: '',
            receiver_mobile: '',
            cp_c_store_ename: '',
          },
          formData: [
            {
              style: 'input',
              label: window.vmI18n.t('table_label.orderNo'), // 订单编号
              value: 'bill_no',
              width: '8',
              inputenter: () => this.queryBounced(),
            },
            {
              style: 'input',
              label: window.vmI18n.t('table_label.platform_orderNo'), // 平台订单号
              value: 'source_code',
              width: '8',
              inputenter: () => this.queryBounced(),
            },
            {
              style: 'input',
              label: window.vmI18n.t('table_label.buyerNickname'), // 买家昵称
              value: 'user_nick',
              width: '8',
              inputenter: () => this.queryBounced(),
            },
            {
              style: 'input',
              label: window.vmI18n.t('form_label.consignee'), // 收货人
              value: 'receiver_name',
              width: '8',
              inputenter: () => this.queryBounced(),
            },
            {
              style: 'input',
              label: window.vmI18n.t('form_label.consignee_phone'), // 收货人手机
              value: 'receiver_mobile',
              width: '8',
              regx: /^(([1-9]{1}\d*)|(0{1}))(\.\d{0,2})?$/,
              inputenter: () => this.queryBounced(),
            },
            {
              style: 'popInput',
              width: '8',
              itemdata: {
                col: 1,
                colid: 168210,
                colname: 'SELLER_NICK', // 当前字段的名称
                datelimit: 'all',
                precolnameslist: [
                  {
                    premtype: 'CP_C_SHOP_PERMISSION_ID',
                    refcol: 'ID',
                    iswrite: 'true',
                  },
                ],
                display: 'text', // 显示什么类型，例如xml表示弹窗多选加导入功能，mrp表示下拉多选
                fkdisplay: 'drp', // 外键关联类型
                fkdesc: window.vmI18n.t('table_label.shopName'), // 店铺名称
                inputname: 'SELLER_NICK:ENAME', // 这个是做中文类型的模糊查询字段，例如ENAME
                isfk: true, // 是否有fk键
                isnotnull: false, // 是否必填
                isuppercase: false, // 是否转大写
                length: 65535, // 最大长度是多少
                name: window.vmI18n.t('table_label.shopName'), // 店铺名称input前面显示的lable值
                readonly: false, // 是否可编辑，对应input   readonly属性
                reftable: 'OC_B_RETURN_ORDER', // 对应的表
                reftableid: 24578, // 对应的表ID
                row: 1,
                statsize: -1,
                type: 'STRING', // 这个是后台用的
                valuedata: '', // 这个是选择的值
              },
              oneObj: () => {
                this.threeObjs();
              },
            },
          ],
        },
        table: {
          columns: [
            {
              key: 'SOURCE_CODE',
              title: window.vmI18n.t('table_label.platformInfo'), // 平台信息
            },
            {
              key: 'ID',
              title: window.vmI18n.t('table_label.orderNo'), // 订单编号
            },
            {
              key: 'USER_NICK',
              title: window.vmI18n.t('table_label.buyerNickname'), // 买家昵称
            },
            {
              key: 'ORDER_AMT',
              title: window.vmI18n.t('table_label.totalOrderAmount'), // 订单总额
            },
            {
              key: 'RECEIVER_NAME',
              title: window.vmI18n.t('form_label.consignee'), // 收货人
            },
            {
              key: 'RECEIVER_MOBILE',
              title: window.vmI18n.t('form_label.consignee_phone'), // 收货人手机号
            },
            {
              key: 'CP_C_PHY_WAREHOUSE_ENAME',
              title: window.vmI18n.t('form_label.delivery_warehouse'), // 发货仓库
            },
            // {
            //   key: "PLATFORM",
            //   title: "平台状态"
            // },
            {
              key: 'EXPRESSCODE',
              title: window.vmI18n.t('form_label.logisticsOrder_No'), // 物流单号
            },
            {
              key: 'CP_C_SHOP_TITLE',
              title: window.vmI18n.t('form_label.orderShop'), // 下单店铺
            },
          ], // 表头
          data: [], // 数据配置
          indexColumn: true, // 是否显示序号
          height: '300',
          loading: false,
          //   isShowSelection: true // 是否显示checkedbox
        },
        value: '',
      },
      imageUploadConfig: {
        name: window.vmI18n.t('other.uploadVoucher'),
        url: '/p/cs/upload2', // 上传地址
        sendData: {
          path: `${this.$route.params.customizedModuleName}/${this.$route.params.customizedModuleId}/`,
        }, // 上传参数
        width: 270,
        height: 250,
        valuedata: [],
      },
      reForm: {
        defaultColumn: 3,
        config: [
          {
            show: true, // 是否显示隐藏
            col: 3, // 列宽
            item: {
              soltName: 'CBX', // 组件类型
              props: {},
              event: {},
            },
          },
          {
            item: {
              type: 'Input',
              label: window.vmI18n.t('form_label.billNo'), // 单据编号
              props: {
                value: '',
              },
            },
          },
          {
            item: {
              type: 'Input',
              label: window.vmI18n.t('form_label.sourceDocuments'), // 单据来源
              props: {
                value: '',
                disabled: true,
              },
            },
          },
          // {
          //   item: {
          //     type: 'Select',
          //     label: '平台',
          //     props: {
          //       value: '',
          //       options: []
          //     }
          //   }
          // },
          {
            item: {
              type: 'Input',
              label: window.vmI18n.t('form_label.originalOrderNo'), // 原始订单编号
              required: true,
              props: {
                icon: 'ios-search',
                value: '',
              },
              event: {
                'on-click': () => {
                  // icon点击事件
                  const self = this;
                  self.order.modal = true;
                },
              },
            },
          },
          {
            item: {
              type: 'Input',
              label: window.vmI18n.t('table_label.shopName'), // 店铺名称
              required: true,
              props: {
                value: '',
                disabled: true,
              },
              event: {},
            },
          },
          {
            item: {
              type: 'Input',
              label: window.vmI18n.t('form_label.originalOrderNo'), // 原始平台单号
              required: true,
              props: {
                value: '',
                disabled: true,
              },
              event: {},
            },
          },
          {
            item: {
              type: 'Input',
              label: window.vmI18n.t('form_label.originalPlatformNo'), // 平台退款单号
              // required: true,
              props: {
                value: '',
              },
              event: {},
            },
          },
          {
            item: {
              type: 'Input',
              label: window.vmI18n.t('table_label.buyerNickname'), // 买家昵称
              props: {
                value: '',
                disabled: true,
              },
              event: {},
            },
          },
          {
            item: {
              type: 'Input',
              label: window.vmI18n.t('form_label.BuyerPhoneNumber'), // 买家手机号
              // required: true,
              props: {
                value: '',
                disabled: false,
              },
              event: {
                'on-blur': (e) => {
                  const value = e.currentTarget.value;
                  this.sellerRemarkValueChange('phone', value);
                },
              },
            },
          },
          {
            item: {
              type: 'Input',
              label: window.vmI18n.t('form_label.reasonRefund'), // 退款原因
              props: {
                value: '',
              },
              event: {},
            },
          },
          {
            item: {
              type: 'Select',
              label: window.vmI18n.t('table_label.paymentWay'), // 支付方式
              props: {
                value: '1',
                options: [],
              },
              event: {
                'on-change': (value) => {
                  this.sellerRemarkValueChange('payMode', value);
                },
              },
            },
          },
          {
            item: {
              type: 'Input',
              label: '支付账号',
              required: true,
              props: {
                value: '',
              },
              event: {
                'on-blur': (e) => {
                  const value = e.currentTarget.value;
                  this.sellerRemarkValueChange('payNo', value);
                },
              },
            },
          },
          {
            item: {
              type: 'DatePicker',
              label: window.vmI18n.t('form_label.documentDate'), // 单据日期
              required: true,
              props: {
                value: '',
              },
            },
          },
          {
            item: {
              type: 'Input',
              label: window.vmI18n.t('form_label.refundAmount'), // 申请退款金额
              props: {
                value: '',
                disabled: true,
              },
              event: {},
            },
          },
          {
            item: {
              type: 'Select',
              label: window.vmI18n.t('form_label.responsibleParty'), // 判责方
              props: {
                value: '',
                options: [],
              },
              event: {},
            },
          },
          {
            item: {
              type: 'Input',
              label: window.vmI18n.t('form_label.remarksResponsibleParty'), // 判责方备注
              props: {
                value: '',
              },
              event: {},
            },
          },
          {
            show: true, // 是否显示隐藏
            col: 1, // 列宽
            item: {
              label: window.vmI18n.t('form_label.refundClass'), // 退款分类
              soltName: 'returnType', // 组件类型
              props: {},
              event: {},
            },
          },
          {
            show: true, // 是否显示隐藏
            col: 1, // 列宽
            item: {
              label: window.vmI18n.t('form_label.refundDescription'), // 退款描述
              soltName: 'returnTypeItem', // 组件类型
              props: {},
              event: {},
            },
          },
          {
            item: {
              type: 'Input',
              label: window.vmI18n.t('form_label.namePayee'), // 收款人姓名
              required: true,
              props: {
                value: '',
              },
            },
          },
          {
            item: {
              type: 'Input',
              label: window.vmI18n.t('table_label.remarks'), // 备注
              props: {
                value: '',
              },
              event: {},
            },
          },
          {
            item: {
              type: 'Input',
              label: window.vmI18n.t('form_label.sellerNotes'), // 卖家备注
              props: {
                value: '',
              },
              event: {},
            },
          },
        ],
      },
      reFormDataConfig: refundAfterShipment.reFormDataConfig,
      sellerRemarkData: {
        USER_NICK: '',
        VIP_PHONE: '',
        SOURCE_CODE: '',
        OC_B_RETURN_TYPE_ENAME: '',
        AMT_RETURN_APPLY: '',
        PAY_MODE: '',
        BUYER_ALIPAY_NO: '',
      },
      value: ['1', '2'],
      returnTypeFormConfig: {
        formValue: {},
        formData: [
          {
            style: 'popInput',
            width: '24',
            itemdata: {
              colid: 1700816078,
              colname: 'OC_B_RETURN_TYPE_ID',
              display: 'text',
              fkdisplay: 'drp',
              isfk: true,
              length: 100,
              name: window.vmI18n.t('form_label.refundClass'), // 退款分类
              isnotnull: true,
              reftable: 'OC_B_RETURN_TYPE', // 对应的表
              reftableid: 249230473, // 对应的表ID
              pid: '', // 这个是选择的id
              valuedata: '',
            },
            oneObj: (data) => {
              this.returnTypeFormConfig.formValue.OC_B_RETURN_TYPE_ID = data.pid;
              this.returnTypeFormConfig.formValue.OC_B_RETURN_TYPE_ENAME = data.valuedata;
              if (data.pid) {
                this.returnTypeChange();
                this.sellerRemarkValueChange('returnType', data.valuedata);
              }
            },
            InputEnter: () => {},
          },
        ],
      },
      returnTypeItemConfig: {
        formValue: {},
        formData: [
          {
            style: 'select', // 下拉框类型
            label: window.vmI18n.t('form_label.refundDescription'), // 退款描述
            width: '24', // 所占宽度宽度
            value: 'OC_B_RETURN_TYPE_ITEM_ID', // 输入框的值
            // clearable: true, //下拉选中是否显示清空按钮,默认为false
            options: [],
          },
        ],
        ruleValidate: {
          OC_B_RETURN_TYPE_ITEM_ID: [
            { required: true, message: ' ', trigger: 'blur' },
          ],
        },
      },
      btnConfig: {
        typeAll: 'error',
        buttons: [
          {
            text: window.vmI18n.t('btn.save'), // 保存
            // class: 'save',
            // icon: 'md-download',
            btnclick: () => {
              this.save();
            },
          },
          {
            text: window.vmI18n.t('btn.back'), // 返回
            // class: 'cancel',
            // icon: 'md-arrow-round-back',
            btnclick: () => {
              comUtils.tabCloseAppoint(this);
              if (this.$route.params.customizedModuleName === 'EXTRAREFUND') {
                R3.store.commit('global/tabOpen', {
                  type: 'S',
                  tableId: 249230545,
                  tableName: 'OC_B_RETURN_AF_SEND_MANUAL',
                  back: true,
                  label: window.vmI18n.t('btn.additionalRefund'), // 额外退款
                });
              } else {
                R3.store.commit('global/tabOpen', {
                  type: 'S',
                  tableId: 249130393,
                  tableName: 'OC_B_RETURN_AF_SEND',
                  back: true,
                  label: window.vmI18n.t('form_label.refundNoteDelivered'), // 已发货退款单
                });
              }
              // 销毁当前实例
              this.$destroy();
            },
          },
        ],
      },
      tableConfig: {
        // jordanBtnConfig: {
        //   typeAll: "error", //按钮统一风格样式
        //   buttons: [
        //     {
        //       text: '新增明细',
        //       icon: 'md-add',
        //       btnclick: () => {
        //         this.tableAddDetail();
        //       }
        //     }, {
        //       text: '删除明细',
        //       icon: 'md-add',
        //       btnclick: () => {
        //         this.tableDeleteDetail();
        //       }
        //     }
        //   ]
        // },
        pageShow: false,
        current: 1,
        pageSize: 20,
        total: 0,
        isShowDeleteDetailBtn: true, // 显示删除明细
        isShowAddDetailBtn: true, // 显示新增明细
        columns: [
          {
            type: 'selection',
            width: 50,
            align: 'center',
          },
          // {
          //   title: '业务单据',
          //   key: 'BILL_TYPE'
          // },
          {
            title: window.vmI18n.t('form_label.billNo'), // 单据编号
            key: 'BILL_NO',
          },
          {
            title: window.vmI18n.t('form_label.gift'), // 赠品
            key: 'IS_GIFT_NAME',
          },
          {
            title: window.vmI18n.t('form_label.gift'), // 平台商品编码
            key: 'PS_C_SKU_PT_ECODE',
          },
          {
            title: window.vmI18n.t('table_label.code_SKU'), // SKU编码
            key: 'skuEcode',
          },
          // {
          //   title: '商品条码',
          //   key: 'skuEcode'
          // },
          {
            title: window.vmI18n.t('form_label.platformProductsCode'), // 商品编码
            key: 'ecode',
          },
          {
            title: window.vmI18n.t('form_label.platformProductsName'), // 平台商品名称
            key: 'PT_PRO_NAME',
          },
          {
            title: window.vmI18n.t('table_label.productName'), // 商品名称
            key: 'proEname',
          },
          {
            title: window.vmI18n.t('form_label.skuName'), // SKU名称
            key: 'PS_C_SKU_ENAME',
          },

          // {
          //   title: '规格名称',
          //   key: 'skuSpec'
          // },
          {
            title: window.vmI18n.t('form_label.purchaseQuantity'), // 购买数量
            key: 'qty',
          },
          {
            title: window.vmI18n.t('form_label.transactionAmount'), // 成交金额
            key: 'price',
          },
          {
            title: window.vmI18n.t('form_label.returnQuantity'), // 退货数量
            key: 'QTY_IN',
            render: (h, params) => {
              const self = this;
              return h(
                'div',
                {
                  style: {
                    width: '100%',
                    display: 'flex',
                    alignitems: 'center',
                    justifyContent: 'space-between',
                  },
                },
                [
                  h('Input', {
                    class: 'isNone',
                    style: {
                      width: '150',
                      height: '100%',
                      'text-align': 'center',
                    },
                    props: {
                      value: params.row.QTY_IN,
                      autosize: true,
                      placeholder: '',
                      // regx:/^(([1-9]{1}\\d*)|([0]{1}))(\\.(\\d){0,2})?$/,
                      regx: /^(([1-9]{1}\d*)|(0{1}))(\.\d{0,2})?$/,
                    },

                    on: {
                      'on-change': (e) => {
                        params.row.QTY_IN = Number(e.target.value);
                        self.tableConfig.data[params.index] = params.row;
                      },
                    },
                  }),
                ]
              );
            },
          },
          {
            title: window.vmI18n.t('form_label.refundAmount'), // 退款金额
            key: 'c',
            render: (h, params) => {
              const self = this;
              return h(
                'div',
                {
                  style: {
                    width: '100%',
                    display: 'flex',
                    alignitems: 'center',
                    justifyContent: 'space-between',
                  },
                },
                [
                  h('Input', {
                    class: 'isNone',
                    style: {
                      width: '150',
                      height: '100%',
                      border: '1px solid #dcdee2',
                      'text-align': 'center',
                    },
                    props: {
                      value: params.row.returnPrice,
                      autosize: true,
                      // regx:/^(([1-9]{1}\\d*)|([0]{1}))(\\.(\\d){0,2})?$/,
                      regx: /^(([1-9]{1}\d*)|(0{1}))(\.\d{0,2})?$/,
                    },

                    on: {
                      'on-change': (e) => {
                        params.row.returnPrice = Number(e.target.value);
                        if (this.$route.query.new) {
                          // if (params.row.returnPrice > params.row.RETURNABLE_AMOUNT) {
                          //   self.$Message.warning('退款金额不能大于可退金额!');
                          //   self.tableConfig.data[params.index].returnPrice = params.row.RETURNABLE_AMOUNT;
                          //   self.tableConfig.data[params.index] = params.row;
                          //   return
                          // }
                        }
                        self.tableConfig.data[params.index] = params.row;
                        let total = 0;
                        self.tableConfig.data.forEach((item) => {
                          total = total + (item.returnPrice || 0) + item.FREIGHT;
                        });
                        // self.reForm.config[12].item.props.value = total;
                        self.reForm.config.find(
                          item => item.item.label
                            == self.vmI18n.t('form_label.refundAmount') // 申请退款金额
                        ).item.props.value = total;
                      },
                    },
                  }),
                ]
              );
            },
          },
          // {
          //   title: '可退金额',
          //   key: 'RETURNABLE_AMOUNT'
          // },
          {
            title: window.vmI18n.t('form_label.freight'), // 运费
            key: 'FREIGHT',
            width: 60,
            render: (h, params) => {
              const self = this;
              return h(
                'div',
                {
                  style: {
                    width: '100%',
                    display: 'flex',
                    alignitems: 'center',
                    justifyContent: 'space-between',
                  },
                },
                [
                  h('Input', {
                    class: 'isNone',
                    style: {
                      width: '50px',
                      height: '100%',
                      'text-align': 'center',
                    },
                    props: {
                      value: params.row.FREIGHT,
                      autosize: true,
                      // regx:/^(([1-9]{1}\\d*)|([0]{1}))(\\.(\\d){0,2})?$/,
                      regx: /^(([1-9]{1}\d*)|(0{1}))(\.\d{0,2})?$/,
                    },

                    on: {
                      'on-change': (e) => {
                        params.row.FREIGHT = Number(e.target.value);
                        self.tableConfig.data[params.index] = params.row;
                        let total = 0;
                        self.tableConfig.data.forEach((item) => {
                          total = total + item.FREIGHT + (item.returnPrice || 0);
                        });
                        // self.reForm.config[12].item.props.value = total;
                        self.reForm.config.find(
                          item => item.item.label
                            == self.vmI18n.t('form_label.refundAmount') // 申请退款金额
                        ).item.props.value = total;
                      },
                    },
                  }),
                ]
              );
            },
          },
        ],
        data: [],
      },
      navStatus: 0,
      logFormConfig: refundAfterShipment.logFormConfig,
      logTableConfig: {
        tableName: this.$route.params.customizedModuleName,
        id: this.$route.params.customizedModuleId,
      },
      createdStatus: !!this.$route.query.new, // 页面数据是否初始化完成
      sellerRemarkDataCreated: !!this.$route.query.new,
      selectOptions: {
        payType: [],
      },
    };
  },
  mounted() {
    this.sessionStorageData = JSON.parse(sessionStorage.getItem('customizeMessage'))[this.$route.params.customizedModuleId == '41460334' ? 'undefined' : this.$route.params.customizedModuleId];
    console.log(this.sessionStorageData);
    // if (this.$route.query.id && !this.$route.query.new) {
      if (this.sessionStorageData.standardTableurlCustomized) { // 已发货退款单详情跳转
      this.reForm.config.splice(14, 0, {
        item: {
          type: 'Input',
          label: window.vmI18n.t('form_label.actualRefundAmount'), // 实际退款金额
          props: {
            value: '',
          },
          event: {},
        },
      });
      this.query();
    } else if (this.$route.query.fromOrder) {
      // 该类型从订单详情跳转过来的查询方式
      this.queryBounced(this.$route.query.oid);
      this.$nextTick(() => {
        this.reForm.config.forEach((val, index) => {
          if (val.item.label === '单据来源') {
            this.reForm.config[index].item.props.value = '手动';
          } else if (val.item.label === '单据日期') {
            this.reForm.config[index].item.props.value = dateFormat(
              new Date(),
              'yyyy-MM-dd'
            );
          }
        });
      });
    } else {
      this.$nextTick(() => {
        this.reForm.config.forEach((val, index) => {
          if (val.item.label === '单据来源') {
            this.reForm.config[index].item.props.value = '手动';
          } else if (val.item.label === '单据日期') {
            this.reForm.config[index].item.props.value = dateFormat(
              new Date(),
              'yyyy-MM-dd'
            );
          }
        });
      });
    }
    this.getDownUp();
  },
  methods: {
    billTypeChange(val) {
      // 退款完成的订单不进行操作
      if (this.RETURN_STATUS === 2) return;
      if (val === '1') {
        // 仅退款
        this.tableConfig.data.forEach((val) => {
          val.QTY_IN = 0;
        });
      } else {
        // 退货退款
        this.tableConfig.data.forEach((val) => {
          val.QTY_IN = val.qty;
        });
      }
    },
    getnumPrice(rerurnData) {
      let price = 0;
      rerurnData.forEach((item) => {
        price += Number(item.returnPrice || 0) + Number(item.FREIGHT);
      });
      return price;
    },
    filter(arr) {
      arr.forEach((item, i) => {
        item.IS_GIFT_NAME = item.GIFT_TYPE == '2'
          ? '平台赠品'
          : item.GIFT_TYPE == '1'
            ? '系统赠品'
            : '否';
        item.IS_GIFT = item.GIFT_TYPE;
        if (!item.FREIGHT) item.FREIGHT = 0; // 运费
        if (item.RETURNABLE_AMOUNT == 0) {
          arr.splice(i, 1);
        }
        if (item.QTY_IN === undefined || item.QTY_IN === null) item.QTY_IN = this.BILL_TYPE === '1' ? 0 : Number(item.qty || 1);
      });
      return arr;
    },
    fromOrder(listData, initStatus = false) {
      const _this = this;
      console.log(listData);
      _this.onSelectData = listData[0];
      const QUERYORDERITEMRESULTLIST = _this.onSelectData.QUERYORDERITEMRESULTLIST;
      _this.onSelectData.QUERYORDERITEMRESULTLIST = _this.filter(
        QUERYORDERITEMRESULTLIST
      );

      _this.isOne = false;
      _this.addItem.table.data = _this.filter(QUERYORDERITEMRESULTLIST);

      const data = _this.onSelectData;
      _this.reForm.config.forEach((item) => {
        // 原始订单编号
        if (item.item.label == _this.vmI18n.t('form_label.originalOrderNo')) item.item.props.value = data.ID;
        // 店铺名称
        if (item.item.label == _this.vmI18n.t('table_label.shopName')) item.item.props.value = data.CP_C_SHOP_TITLE;
        // 原始平台单号
        if (item.item.label == _this.vmI18n.t('form_label.originalOrderNo')) item.item.props.value = data.SOURCE_CODE;
        // 买家昵称
        if (item.item.label == _this.vmI18n.t('table_label.buyerNickname')) item.item.props.value = data.USER_NICK;
        // 买家手机号;
        if (item.item.label == _this.vmI18n.t('form_label.BuyerPhoneNumber')) item.item.props.value = data.VIP_PHONE;
        // if (item.item.label == '平台退款单号') item.item.props.value = '5';
        // if (item.item.label == '退款原因') item.item.props.value = '6';
        // 支付方式
        if (item.item.label == _this.vmI18n.t('table_label.paymentWay')) item.item.props.value = String(data.PAY_TYPE) || '1';
        // if (item.item.label == '判责方') item.item.props.value = data.RESPONSIBLE_PARTY;
        // if (item.item.label == '支付账号') item.item.props.value = data.BUYER_ALIPAY_NO;
        // 收款人姓名
        if (item.item.label === _this.vmI18n.t('form_label.namePayee')) item.item.props.value = data.RECEIVER_NAME;
        // _this.addItem.addList.forEach(item => {
        //   a = a + Number(item.RETURNABLE_AMOUNT);
        // });
        // 申请退款金额
        if (item.item.label == _this.vmI18n.t('form_label.apply_refundAmount')) {
          if (initStatus && _this.addItem.addList.length === 0) {
            item.item.props.value = _this.addItem.table.data.reduce(
              (sum, n) => sum + Number(n.RETURNABLE_AMOUNT || 0),
              0
            );
          } else {
            item.item.props.value = _this.addItem.addList.reduce(
              (sum, n) => sum + Number(n.RETURNABLE_AMOUNT || 0),
              0
            );
          }
        }
        // if (item.item.label == '判责方备注') item.item.props.value = '10';
      });
      QUERYORDERITEMRESULTLIST.forEach((item) => {
        item.returnPrice = item.RETURNABLE_AMOUNT;
        item.ID = item.proId;
        item.IS_GIFT_NAME = item.GIFT_TYPE == '2'
          ? '平台赠品'
          : item.GIFT_TYPE == '1'
            ? '系统赠品'
            : '否';
        item.IS_GIFT = item.GIFT_TYPE;
        item.BILL_NO = _this.selectData.BILL_NO;
      });
      _this.tableConfig.data = QUERYORDERITEMRESULTLIST;
    },
    // 确定原始订单编号
    queryorder(listData, isEnter) {
      const _this = this;
      if (isEnter) {
        _this.fromOrder(listData, true);
      } else {
        _this.onSelectData = _this.selectData;
        if (JSON.stringify(_this.onSelectData) == '{}') {
          _this.$Message.warning(window.vmI18n.t('modalTips.i7')); // 请选择一条数据！
          return;
        }
        const QUERYORDERITEMRESULTLIST = _this.onSelectData.QUERYORDERITEMRESULTLIST;
        _this.onSelectData.QUERYORDERITEMRESULTLIST = _this.filter(
          QUERYORDERITEMRESULTLIST
        );
        _this.setForm(_this.onSelectData);
      }
    },
    // 取消
    querycancel() {},
    onCurrentChange(val, oldval) {
      this.selectData = val;
    },
    threeObjs() {
      const _this = this;
      _this.order.orderform.formData.forEach((item) => {
        // 店铺名称
        if (
          item
          && item.itemdata
          && item.itemdata.name === _this.vmI18n.t('table_label.shopName')
        ) {
          this.order.orderform.formValue.cp_c_store_id = item.itemdata.pid;
          this.order.orderform.formValue.cp_c_store_ename = item.itemdata.valuedata;
        }
      });
    },
    // 查询原始订单编号
    queryBounced(num) {
      //  获取页面数据
      const _this = this;
      const lists = _this.order.orderform.formValue;
      // if (
      //   (lists.bill_no == "" || lists.bill_no == undefined) &&
      //   (lists.source_code == "" || lists.source_code == undefined) &&
      //   (lists.receiver_name == "" || lists.receiver_name == undefined) &&
      //   (lists.user_nick == "" || lists.user_nick == undefined) &&
      //   (lists.receiver_mobile == "" || lists.receiver_mobile == undefined) &&
      //   (lists.cp_c_store_ename == "" || lists.cp_c_store_ename == undefined) &&
      //   num == undefined
      // ) {
      //   _this.$Message.error("请输入查询条件！");
      //   return;
      // }
      if (
        !lists.bill_no
        && !lists.source_code
        && !lists.receiver_name
        && !lists.user_nick
        && !lists.receiver_mobile
        && !lists.cp_c_store_ename
        && num === undefined
      ) {
        _this.$Message.error(_this.vmI18n.t('modalTips.i8')); // 请输入查询条件！
        return;
      }
      _this.order.table.loading = true;
      const fromdata = new FormData();
      const param = {
        page: {
          pageSize: '500',
          pageNum: '1',
        },
        highSearch: [
          {
            type: 'Select',
            queryName: 'ID',
            value: lists.bill_no,
          },
          {
            type: 'Input',
            queryName: 'SOURCE_CODE',
            value: lists.source_code,
          },
          {
            type: 'Input',
            queryName: 'RECEIVER_NAME',
            value: lists.receiver_name,
          },
          {
            type: 'Input',
            queryName: 'USER_NICK',
            value: lists.user_nick,
          },
          {
            type: 'Input',
            queryName: 'RECEIVER_MOBILE',
            value: lists.receiver_mobile,
          },
          {
            type: 'Select',
            queryName: 'CP_C_SHOP_ID',
            value: lists.cp_c_store_id,
          },
          {
            type: 'Select',
            queryName: 'ID',
            value: num,
          },
          {
            type: 'Select',
            queryName: 'ORDER_STATUS',
            value: '5,6,12',
          },
        ],
      };
      fromdata.append('param', JSON.stringify(param));
      this.service.common.queryOrderList(fromdata)
        .then((res) => {
          const query = _this.$route.query;
          if (res.data.data) {
            res.data.data.queryOrderResultList.forEach((item) => {
              item.USER_NICK = `${item.USER_NICK}(${item.CP_C_SHOP_TITLE})`;
            });
            _this.order.table.data = res.data.data.queryOrderResultList;
          } else {
            _this.order.table.data = [];
          }
          if (num) {
            _this.queryorder(_this.order.table.data, true);
          }
          _this.order.table.loading = false;
          // 当订单详情跳转过来时执行
          if (query.oid && query.fromOrder) {
            this.$nextTick(() => {
              setTimeout(() => {
                this.createdStatus = true;
              }, 100);
            });
          }
        })
        .catch(() => {
          _this.$Message.info(_this.vmI18n.t('modalTips.i9')); // 查询不到数据!
          _this.order.table.loading = false;
        });
    },
    save() {
      const self = this;
      const flag = self.isNull();
      if (flag !== '') {
        self.$Message.warning(`${flag},${self.vmI18n.t('modalTips.y1')}`);
        return;
      }
      const data = {};
      data.objId = self.$route.query.new || self.$route.query.cid || self.$route.query.oid
        ? -1
        : self.$route.params.customizedModuleId;
      const AfSend = self.getForm();
      if (AfSend.VIP_PHONE && !/^1[3456789]\d{9}$/.test(AfSend.VIP_PHONE)) {
        return self.$Message.warning(self.vmI18n.t('modalTips.j0')); // 请输入正确的买家手机号
      }
      AfSend.ID = self.$route.query.cid || self.$route.params.customizedModuleId;
      const AfSendItem = self.tableConfig.data.map(item => ({
        id: item.ID,
        AMT_RETURN: item.returnPrice,
        FREIGHT: item.FREIGHT,
        QTY_IN: item.QTY_IN,
      }));
      // self.addItem.addList.map(item => {
      // self.tableConfig.data.forEach(item => {
      //   let obj = {};
      //   // if (self.$route.query.cid) {
      //   //   obj['id'] = item.RELATION_BILL_ITEM_ID;
      //   // } else {

      //   // }
      //   obj['id'] = item.ID;
      //   obj['AMT_RETURN'] = item.returnPrice;
      //   obj['FREIGHT'] = item.FREIGHT
      //   AfSendItem.push(obj);
      // })
      console.log(data, AfSendItem);
      AfSend.OC_B_RETURN_TYPE_ID = this.returnTypeFormConfig.formValue.OC_B_RETURN_TYPE_ID;
      AfSend.OC_B_RETURN_TYPE_ENAME = this.returnTypeFormConfig.formValue.OC_B_RETURN_TYPE_ENAME;
      AfSend.OC_B_RETURN_TYPE_ITEM_ID = this.returnTypeItemConfig.formValue.OC_B_RETURN_TYPE_ITEM_ID;
      AfSend.BILL_TYPE = this.BILL_TYPE;
      AfSend.IMAGE = this.IMAGE;
      data.AfSend = AfSend;
      data.AfSendItem = AfSendItem;
      this.service.orderCenter.saveAfterDeliver(data)
        .then((res) => {
          if (res.data.code == 0) {
            self.$Message.success(res.data.message);
            if (this.$route.query.tabTitle === '额外退款编辑') {
              this.$store.commit('customize/TabHref', {
                id: 249230545,
                type: 'table',
                name: 'OC_B_RETURN_AF_SEND_MANUAL',
                label: window.vmI18n.t('btn.additionalRefund'), // 额外退款
                back: true,
              });
            } else {
              this.$store.commit('customize/TabHref', {
                id: 249130393,
                type: 'table',
                name: 'OC_B_RETURN_AF_SEND',
                label: window.vmI18n.t('form_label.refundNoteDelivered'), // 已发货退款单
                back: true,
              });
            }
            // 销毁当前实例
            this.$destroy();
          } else {
            self.$Message.error(res.data.message);
          }
        });
    },
    // 赋值表单数据
    setForm(data) {
      const self = this;
      // 弹出原始退单明细
      self.addItem.modal = true;
      self.isOne = false;
      self.addItem.table.data = self.filter(data.QUERYORDERITEMRESULTLIST);
    },
    getForm() {
      // 保存获取主表数据
      const self = this;
      const dataConfig = self.reFormDataConfig;
      const AfSend = {};
      self.reForm.config.forEach((item) => {
        const itemLabel = item.item.label;
        AfSend[dataConfig[itemLabel]] = item.item.props.value;
        if (itemLabel == '单据来源') {
          AfSend[dataConfig[itemLabel]] = item.item.props.value == '手动' ? 1 : 2;
        }
      });
      // self.reForm.config.map(item => {
      //   AfSend['BILL_TYPE'] = self.BILL_TYPE; //单据类型
      //   if (item.item.label == '原始订单编号') AfSend['source_bill_no'] = item.item.props.value;
      //   if (item.item.label == '店铺名称') AfSend['CP_C_SHOP_TITLE'] = item.item.props.value;
      //   if (item.item.label == '原始平台单号') AfSend['TID'] = item.item.props.value;
      //   if (item.item.label == '买家昵称') AfSend['VIP_NICK'] = item.item.props.value;
      //   if (item.item.label == '平台退款单号') AfSend['T_RETURN_ID'] = item.item.props.value;
      //   if (item.item.label == '退款原因') AfSend['REASON'] = item.item.props.value;
      //   if (item.item.label == '支付方式') AfSend['PAY_MODE'] = item.item.props.value;
      //   if (item.item.label == '判责方') AfSend['RESPONSIBLE_PARTY'] = item.item.props.value;
      //   if (item.item.label == '实际退款金额') AfSend['AMT_RETURN_ACTUAL'] = item.item.props.value;
      //   if (item.item.label == '支付账号') AfSend['PAY_ACCOUNT'] = item.item.props.value;
      //   if (item.item.label == '退款金额') AfSend['AMT_RETURN_APPLY'] = item.item.props.value;
      //   if (item.item.label == '判责方备注') AfSend['RESPONSIBLE_PARTY_REMARK'] = item.item.props.value;
      //   if (item.item.label == '备注') AfSend['REMARK'] = item.item.props.value;
      // });
      AfSend.CP_C_SHOP_ECODE = self.onSelectData.CP_C_SHOP_ECODE; // 店铺编码
      AfSend.CP_C_SHOP_ID = self.onSelectData.CP_C_SHOP_ID; // 店铺ID

      return AfSend;
    },
    isNull() {
      // let flag = '';
      // this.reForm.config.forEach(item => {
      //   if (item.item.label == '平台退款单号' && !item.item.props.value) {
      //     flag = '平台退款单号,';
      //   }
      // })
      let flag = this.reForm.config.find(
        item => item.item.required && !item.item.props.value
      );
      // 退款分类必填校验
      if (!flag) {
        if (!this.returnTypeFormConfig.formValue.OC_B_RETURN_TYPE_ID) {
          // 退款分类
          flag = {
            item: { label: `${this.vmI18n.t('form_label.refundClass')}` },
          };
        } else if (
          // 退款描述
          !this.returnTypeItemConfig.formValue.OC_B_RETURN_TYPE_ITEM_ID
        ) {
          flag = {
            item: { label: `${this.vmI18n.t('form_label.refundDescription')}` },
          };
        }
      }
      return `${flag ? flag.item.label : ''}`;
    },
    // 新增明细按钮调用
    tableAddDetail() {
      const self = this;
      if (!self.reForm.config[3].item.props.value) {
        self.$Message.warning(self.vmI18n.t('modalTips.j1')); // 原始订单编号不能为空!
        return;
      }
      const formData = new FormData();
      const requestData = {
        page: { pageSize: '500', pageNum: '1' },
        highSearch: [
          {
            type: 'Select',
            queryName: 'ID',
            value: self.reForm.config[3].item.props.value,
          },
        ],
      };
      formData.append('param', JSON.stringify(requestData));
      this.service.common.queryOrderList(formData)
        .then((res) => {
          console.log(res);
          if (res.data.code == 0) {
            const arr = [];
            if (!res.data.data) { return this.$Message.error(self.vmI18n.t('modalTips.j2')); } // 没有明细可新增
            //  res.data.data.queryOrderResultList[0].QUERYORDERITEMRESULTLIST = self.filter( res.data.data.queryOrderResultList[0].QUERYORDERITEMRESULTLIST)
            res.data.data.queryOrderResultList[0].QUERYORDERITEMRESULTLIST.forEach(
              (item) => {
                if (!item.FREIGHT) item.FREIGHT = 0;
                if (item.RETURNABLE_AMOUNT != 0) {
                  arr.push(item);
                }
              }
            );
            self.addItem.table.data = arr;
            self.addItem.table.data.forEach((item) => {
              item.returnQTY = item.qty - (item.QTY_RETURN_APPLY ? item.QTY_RETURN_APPLY : 0);
              item.IS_GIFT_NAME = item.GIFT_TYPE == '2'
                ? '平台赠品'
                : item.GIFT_TYPE == '1'
                  ? '系统赠品'
                  : '否';
              item.IS_GIFT = item.GIFT_TYPE;
            });
            self.addItem.modal = true;
          } else {
            self.$Message.error(res.data.message);
          }
        });
    },
    onAddItem() {
      const self = this;
      // 新增界面逻辑
      if (self.$route.query.new || self.$route.query.cid) {
        if (!self.isOne) {
          const data = self.onSelectData;
          // 通过原始订单编号二次弹框确定
          self.reForm.config.forEach((item) => {
            const configItem = item.item;
            const configItemLabel = configItem.label;
            // 原始订单编号
            if (configItemLabel === self.vmI18n.t('form_label.originalOrderNo')) configItem.props.value = data.ID;
            // 店铺名称
            if (configItemLabel === self.vmI18n.t('table_label.shopName')) configItem.props.value = data.CP_C_SHOP_TITLE;
            // 原始平台单号
            if (configItemLabel === self.vmI18n.t('form_label.originalOrderNo')) configItem.props.value = data.SOURCE_CODE;
            // 买家昵称
            if (configItemLabel === self.vmI18n.t('table_label.buyerNickname')) configItem.props.value = data.USER_NICK;
            // 买家手机号
            if (
              configItemLabel === self.vmI18n.t('form_label.BuyerPhoneNumber')
            ) configItem.props.value = data.VIP_PHONE;
            // if (item.item.label == '平台退款单号') item.item.props.value = '5';
            // if (item.item.label == '退款原因') item.item.props.value = '6';
            // 支付方式
            if (configItemLabel === self.vmI18n.t('table_label.paymentWay')) configItem.props.value = String(data.PAY_TYPE) || '1';
            // if (item.item.label === '判责方') item.item.props.value = data.RESPONSIBLE_PARTY;
            // if (configItemLabel === '支付账号') configItem.props.value = data.BUYER_ALIPAY_NO;
            // 收款人姓名;
            if (configItemLabel === self.vmI18n.t('form_label.namePayee')) configItem.props.value = data.RECEIVER_NAME;
            // self.addItem.addList.forEach(item => {
            //   a = a + Number(item.RETURNABLE_AMOUNT);
            // });
            // 申请退款金额
            if (configItemLabel === self.vmI18n.t('form_label.apply_refundAmount')) {
              configItem.props.value = self.addItem.addList.reduce(
                (sum, n) => sum + Number(n.RETURNABLE_AMOUNT || 0),
                0
              );
            }
            // if (item.item.label == '判责方备注') item.item.props.value = '10';
          });
          self.addItem.addList.forEach((item) => {
            item.returnPrice = item.RETURNABLE_AMOUNT;
            item.ID = item.proId;
            item.IS_GIFT_NAME = item.GIFT_TYPE == '2'
              ? '平台赠品'
              : item.GIFT_TYPE == '1'
                ? '系统赠品'
                : '否';
            item.IS_GIFT = item.GIFT_TYPE;
            item.BILL_NO = self.selectData.BILL_NO;
            item.QTY_IN = self.BILL_TYPE === '1' ? 0 : Number(item.qty || 1);
          });
          self.tableConfig.data = self.addItem.addList;
          this.sellerRemarkValueChange('originalOrder', data);
          // 通过原始订单编号二次弹框确定 end
        } else {
          // self.tableConfig.map(item=>{
          self.addItem.addList.forEach((item) => {
            let flag = false;
            self.tableConfig.data.forEach((item1) => {
              price += item1.returnPrice || 0;
              if (item.proId == item1.proId) {
                flag = true;
              }
            });
            if (!flag) {
              item.returnPrice = item.price > item.RETURNABLE_AMOUNT
                ? item.RETURNABLE_AMOUNT
                : item.price;
              self.tableConfig.data.push(item);
            }
            if (self.$route.query.new || self.$route.query.cid) {
              self.tableConfig.data.forEach((item) => {
                item.returnPrice = item.price > item.RETURNABLE_AMOUNT
                  ? item.RETURNABLE_AMOUNT
                  : item.price;
                item.ID = item.proId;
                item.BILL_NO = self.selectData.BILL_NO;
              });
            }
          });
          const returnprice = self.getnumPrice(self.tableConfig.data);
          // self.reForm.config[12].item.props.value = returnprice;
          self.reForm.config.find(
            item => item.item.label == self.vmI18n.t('form_label.refundAmount') // 申请退款金额
          ).item.props.value = returnprice;
        }
      } else {
        // 详情/复制页面新增明细逻辑
        const data = {};
        const OcBReturnAfSendItem = [];
        data.orderId = self.reForm.config[3].item.props.value;
        data.id = self.$route.params.customizedModuleId;
        self.addItem.addList.forEach((item) => {
          const obj = {};
          obj.id = item.proId;
          obj.AMT_RETURN = item.RETURNABLE_AMOUNT;
          obj.FREIGHT = 0; // 默认运费为零 夏继超要求;
          OcBReturnAfSendItem.push(obj);
        });
        data.OcBReturnAfSendItem = OcBReturnAfSendItem;
        this.service.orderCenter.saveAfterDeliverItem(data)
          .then((res) => {
            if (res.data.code == 0) {
              self.$Message.success(res.data.message);
              self.query();
            } else {
              self.$Message.error(res.data.message);
            }
          });
      }
    },
    addItemCancel() {},
    // 新增明细表格数据单多选操作
    onSelect(e) {
      this.addItem.addList = e;
    },
    onDel(e) {
      this.delTableData = e;
    },
    tableDeleteDetail() {
      // 删除明细
      const self = this;
      if (
        self.$route.query.new
        || self.$route.query.cid
        || self.$route.query.oid
      ) {
        // 新增的请求方式
        if (self.tableConfig.data.length == self.delTableData.length) self.tableConfig.data = [];
        // 删除明细
        self.delTableData.forEach((item) => {
          if (self.isIn(item.proId, self.tableConfig.data) >= 0) {
            self.tableConfig.data.splice(
              self.isIn(item.proId, self.tableConfig.data),
              1
            );
          }
        });
        const total = self.tableConfig.data.reduce(
          (sum, item) => sum + number(item.returnPrice || 0),
          0
        );
        // self.tableConfig.data.forEach(item => {
        //   total += item.returnPrice;
        // })
        self.reForm.config.find(
          item => item.item.label == self.vmI18n.t('form_label.refundAmount') // 申请退款金额
        ).item.props.value = total;
        // self.reForm.config[12].item.props.value = total;
        self.delTableData = [];
      } else {
        // 编辑状态,删除明细
        if (self.delTableData.length == 0) {
          self.$Message.warning(self.vmI18n.t('modalTips.j3')); // 请选择需要删除的明细!
          return;
        }
        if (self.delTableData.length == self.tableConfig.data.length) {
          self.$Message.warning(self.vmI18n.t('modalTips.j4')); // 至少保留一条明细,不允许全部删除
          return;
        }
        this.$Modal.fcError({
          title: self.vmI18n.t('modalTitle.deleteDetails'), // 删除明细
          content: self.vmI18n.t('modalTips.j5'), // 确定删除所选明细?
          onOk: () => {
            const data = {};
            const arr = [];
            data.AfSendID = self.$route.params.customizedModuleId;
            self.delTableData.forEach((item) => {
              arr.push(item.ID);
            });
            data.AfSendItemIds = arr;
            this.service.orderCenter.deleteAfterDeliverItem(data)
              .then((res) => {
                console.log(res);
                if (res.data.code == 0) {
                  self.$Message.success(res.data.message);
                  self.query();
                } else {
                  self.$Message.error(res.data.message);
                }
              });
          },
        });
      }
    },
    tabllePageChange(page) {
      this.tableConfig.current = page;
      this.query();
    },
    tabllePageSizeChange(size) {
      this.tableConfig.pageSize = size;
      this.query();
    },
    isIn(data, arr) {
      let flag = -1;
      arr.forEach((item, index) => {
        if (item.proId == data) {
          flag = index;
        }
      });
      return flag;
    },
    // 详情 复制查询方法
    query() {
      const self = this;
      const query = { ID: self.$route.params.customizedModuleId };
      self.service.orderCenter.copyAfterDeliver(query)
        .then((res) => {
          console.log(res);
          if (res.data.code == 0) {
            const resData = res.data.data;
            const AfSend = resData.AfSend;
            this.RETURN_STATUS = AfSend.RETURN_STATUS;
            // self.onSelectData['ID'] = res.data.data.AfSend.ID
            self.setDetailTable(resData.AfSendItemList);
            self.tableConfig.data = resData.AfSendItemList;
            self.tableConfig.current = resData.AfSendItemList.length;
            self.tableConfig.total = resData.AfSendItemList.length;
            self.setDetailForm(AfSend);
            self.onSelectData = AfSend;
            self.logFormConfig.formValue = {
              OWNERENAME: AfSend.OWNERNAME,
              CREATIONDATE:
                AfSend.CREATIONDATE
                && dateFormat(
                  new Date(AfSend.CREATIONDATE),
                  'yyyy-MM-dd hh:mm:ss'
                ),
              MODIFIERENAME: AfSend.MODIFIERENAME || AfSend.MODIFIERNAME,
              MODIFIEDDATE:
                AfSend.MODIFIEDDATE
                && dateFormat(
                  new Date(AfSend.MODIFIEDDATE),
                  'yyyy-MM-dd hh:mm:ss'
                ),
            };
            self.$nextTick(() => {
              setTimeout(() => {
                this.createdStatus = true;
              }, 100);
            });
          } else {
            self.$Message.error(res.data.message);
          }
        });
    },
    // 详情 复制界面复制问题
    setDetailForm(data) {
      const self = this;
      const dataConfig = self.reFormDataConfig;
      self.BILL_TYPE = String(data.BILL_TYPE);
      self.reForm.config.forEach(async (item) => {
        const itemLabel = item.item.label;
        // 单据日期 退款分类 退款描述 单据来源
        if (
          itemLabel
          !== (self.vmI18n.t('form_label.documentDate')
            && self.vmI18n.t('form_label.refundClass')
            && self.vmI18n.t('form_label.refundDescription')
            && self.vmI18n.t('form_label.sourceDocuments'))
        ) {
          item.item.props.value = data[dataConfig[itemLabel]];
          // 退款分类
        } else if (itemLabel === self.vmI18n.t('form_label.refundClass')) {
          this.returnTypeFormConfig.formValue.OC_B_RETURN_TYPE_ID = data.OC_B_RETURN_TYPE_ID;
          this.returnTypeFormConfig.formValue.OC_B_RETURN_TYPE_ENAME = data.OC_B_RETURN_TYPE_ENAME;
          this.returnTypeFormConfig.formData[0].itemdata.pid = data.OC_B_RETURN_TYPE_ID;
          this.returnTypeFormConfig.formData[0].itemdata.valuedata = data.OC_B_RETURN_TYPE_ENAME;
          // 退款描述
        } else if (
          itemLabel === self.vmI18n.t('form_label.refundDescription')
        ) {
          await this.returnTypeChange();
          this.returnTypeItemConfig.formValue.OC_B_RETURN_TYPE_ITEM_ID = data.OC_B_RETURN_TYPE_ITEM_ID;
          // 单据来源
        } else if (itemLabel === self.vmI18n.t('form_label.sourceDocuments')) {
          item.item.props.value = data[dataConfig[itemLabel]] == 1 ? '手动' : '自动';
        } else {
          // item.item.props.value = self.$route.query.cid ? 0 : data[dataConfig[itemLabel]]
          item.item.props.value = dateFormat(
            new Date(data[dataConfig[itemLabel]]),
            'yyyy-MM-dd'
          );
        }
        // switch (item.item.label) {
        //   case '单据编号':
        //     item.item.props.value = data.BILL_NO
        //     break
        //   case '单据来源':
        //     item.item.props.value = data.REFUND_ORDER_SOURCE_TYPE
        //     break
        //   case '平台':
        //     item.item.props.value = data.CP_C_PLATFORM_ID
        //     break
        //   case '原始订单编号':
        //     item.item.props.value = data.SOURCE_BILL_NO
        //     break
        //   case '店铺名称':
        //     item.item.props.value = data.CP_C_SHOP_TITLE
        //     break
        //   case '原始平台单号':
        //     item.item.props.value = data.TID
        //     break
        //   case '平台退款单号':
        //     item.item.props.value = data.T_RETURN_ID
        //     break
        //   case '买家昵称':
        //     item.item.props.value = data.VIP_NICK
        //     break
        //   case '退款原因':
        //     item.item.props.value = data.REASON
        //     break
        //   case '支付方式':
        //     item.item.props.value = data.PAY_MODE
        //     break
        //   case '支付账号':
        //     item.item.props.value = data.PAY_ACCOUNT
        //     break
        //   case '单据日期':
        //     item.item.props.value = data.RETURN_APPLY_TIME
        //     break
        //   case '申请退款金额':
        //     item.item.props.value = self.$route.query.cid ? 0 : data.AMT_RETURN_APPLY
        //     break
        //   case '实际退款金额':
        //     item.item.props.value = data.AMT_RETURN_ACTUAL
        //     break
        //   case '判责方':
        //     item.item.props.value = data.RESPONSIBLE_PARTY
        //     break
        //   case '判责方备注':
        //     item.item.props.value = data.RESPONSIBLE_PARTY_REMARK
        //     break
        //   case '备注':
        //     item.item.props.value = data.REMARK
        //     break
        //   case '卖家备注':
        //     item.item.props.value = data.SELLER_REMARK
        //     break
        // }
      });
      this.sellerRemarkValueChange('originalOrder', data);
      self.imageUploadConfig.valuedata = data.IMAGE
        ? JSON.parse(data.IMAGE)
        : [];
      self.IMAGE = self.imageUploadConfig.valuedata;
    },
    // 图片上传成功
    uploadFileChangeSuccess(res) {
      const self = this;
      self.imageUploadConfig.valuedata.push({
        name: res.data.Name,
        URL: res.data.Url,
      });
      self.IMAGE = self.imageUploadConfig.valuedata;
    },
    // 图片删除回调
    deleteImg(imgInfo, imgIndex) {
      this.imgIndex = imgIndex;
      this.isModal = true;
    },
    deleteImgBySure() {
      this.imageUploadConfig.valuedata.splice(this.imgIndex - 1, 1);
      this.IMAGE = this.imageUploadConfig.valuedata;
    },
    setDetailTable(data) {
      const self = this;
      data.forEach((item) => {
        item.IS_GIFT = item.GIFT; // 赠品
        if (item.GIFT == 1) item.GIFT = '系统赠品';
        else if (item.GIFT == 2) item.GIFT = '平台赠品';
        else if (item.GIFT == 0) item.GIFT = '否';
        item.price = item.AMT_ACTUAL; // 成交金额
        item.RETURNABLE_AMOUNT = item.AMT_HAS_RETURN; // 可退金额
        item.returnPrice = item.AMT_RETURN; // 退款金额
        item.IS_GIFT_NAME = item.GIFT; // 赠品
        item.ecode = item.PS_C_PRO_ECODE; // 商品编码
        item.proEname = item.PS_C_PRO_ENAME; // 商品名称
        item.PS_C_SKU_PT_ECODE = item.PS_C_SKU_PT_ECODE; // 平台商品编码
        item.PT_PRO_NAME = item.PT_PRO_NAME; // 平台商品名称

        item.skuEcode = item.PS_C_SKU_ECODE; // 商品条码
        item.skuSpec = item.PS_C_SPEC_ENAME; // 商品规格
        item.qty = item.PURCHASE_QTY; // 购买数量
        item.BILL_NO = item.RELATION_BILL_NO; // 单据编号
        item.BILL_TYPE = item.BILL_TYPE == 0 ? '退货单' : '发货单';
        if (self.$route.query.cid) {
          // 如果为复制状态订单,修改明细id为原订单id
          item.ID = item.RELATION_BILL_ITEM_ID;
        }
      });
    },
    async getDownUp() {
      const self = this;
      const formdata = new FormData();
      formdata.append('table', 'OC_B_RETURN_AF_SEND');
      formdata.append('objid', -1);
      const res = await self.service.common.getObject(formdata);
      console.log(res);
      if (res.data.code == 0) {
        let payType = [];
        let dutyOfficer = [];
        const childs = res.data.data.addcolums[res.data.data.addcolums.length - 2]
          .childs || [];
        childs.forEach((item) => {
          if (item.name === '判责方') {
            dutyOfficer = item.combobox;
          }
          if (item.name === '支付方式') {
            payType = item.combobox;
          }
        });
        payType.forEach((item) => {
          item.label = item.limitdesc;
          item.value = item.limitval;
        });
        dutyOfficer.forEach((item) => {
          item.label = item.limitdesc;
          item.value = item.limitval;
        });
        this.selectOptions = {
          payType,
          dutyOfficer,
        };
        self.reForm.config.forEach((item) => {
          // 支付方式
          if (item.item.label == self.vmI18n.t('table_label.paymentWay')) {
            item.item.props.options = payType;
          }
          // 判责方
          if (
            item.item.label == self.vmI18n.t('form_label.responsibleParty')
          ) {
            item.item.props.options = dutyOfficer;
          }
        });
      } else {
        self.$Message.error(res.data.message);
      }
    },
    // 退款分类联动查询退描述
    returnTypeChange() {
      const formdata = new FormData();
      formdata.append('table', 'OC_B_RETURN_TYPE_ITEM');
      formdata.append('objid', this.returnTypeFormConfig.formValue.OC_B_RETURN_TYPE_ID);
      formdata.append('refcolid', 1700815960);
      formdata.append('searchdata', JSON.stringify({
                                            column_include_uicontroller: true,
                                            startindex: 0,
                                            fixedcolumns: {},
                                          }));
      this.service.orderCenter.objectTableItem(formdata)
        .then((res) => {
          const resData = res.data;
          if (resData.code === 0) {
            const row = resData.datas.row || [];
            this.returnTypeItemConfig.formData[0].options = [];
            this.$nextTick(() => {
              this.returnTypeItemConfig.formData[0].options = row.map(
                item => ({
                  label: item.ENAME.val,
                  value: Number(item.ID.val),
                })
              );
            });
          } else {
            this.$Message.error(self.vmI18n.t('modalTips.j6')); // 退款描述请求失败
          }
        });
    },
    /**
     * 卖家备注联动生成
     * @method sellerRemarkValueChange
     * @param { string } type 联动类型(originalOrder: 原始订单；phone: 手机号；payMode: 支付方式；payNo: 支付账号；returnType: 退款分类)
     * @param { string | {} } value
     */
    sellerRemarkValueChange(type = '', value) {
      const config = this.reForm.config;
      const index = config.length - 1;
      const sellerRemarkData = this.sellerRemarkData;
      // 判断编辑状态时是否数据渲染初始化完成
      if (!this.createdStatus) return;
      if (type === 'originalOrder') {
        // 原始订单
        for (const key in sellerRemarkData) {
          if (key !== 'PAY_MODE') sellerRemarkData[key] = value[key] || 'xxxxx';
          else sellerRemarkData[key] = this.payTypeName(value.payType);
        }
      } else if (type === 'phone') {
        // 买家手机号
        sellerRemarkData.VIP_PHONE = value || 'xxxxx';
      } else if (type === 'payMode') {
        // 支付方式
        sellerRemarkData.PAY_MODE = this.payTypeName(value);
      } else if (type === 'payNo') {
        // 支付账号
        sellerRemarkData.BUYER_ALIPAY_NO = value || 'xxxxx';
      } else if (type === 'returnType') {
        // 退款分类
        sellerRemarkData.OC_B_RETURN_TYPE_ENAME = value;
      }
      // 卖家备注数据补偿
      this.sellerRemarkCompensation();
      this.reForm.config[index].item.props.value = `${
        sellerRemarkData.USER_NICK
      }-${sellerRemarkData.VIP_PHONE}${self.vmI18n.t('modalTips.j7')}${
        sellerRemarkData.SOURCE_CODE
      }${self.vmI18n.t('modalTips.j8')}${
        sellerRemarkData.OC_B_RETURN_TYPE_ENAME
      }${self.vmI18n.t('modalTips.j9')}${
        sellerRemarkData.AMT_RETURN_APPLY || 0
      }${self.vmI18n.t('modalTips.k0')}${sellerRemarkData.PAY_MODE}${
        sellerRemarkData.BUYER_ALIPAY_NO
      }${self.vmI18n.t('modalTips.k1')}`;
      // 亲，您好！您的订单号
      // 因为
      // 原因，给您申请
      // 中，请您注意查收！感谢您的惠顾，欢迎下次光临，祝您生活愉快！
    },
    // 获取支付方式名称
    payTypeName(value) {
      const item = this.selectOptions.payType.find(
        item => item.value === value
      ) || { label: 'xxxxx' };
      return item.label;
    },
    // 卖家备注数据补偿（编辑状态下，第一次编写时触发）
    sellerRemarkCompensation() {
      const config = this.reForm.config;
      const sellerRemarkData = this.sellerRemarkData;
      // 初始化赋值（用于确定是否以赋值，只作用一次且只在编辑状态的第一次起作用）
      if (!this.sellerRemarkDataCreated) {
        config.forEach((configItem) => {
          const item = configItem.item;
          const itemValue = item.props.value || 'xxxxx';
          switch (item.label) {
            case '买家昵称':
              sellerRemarkData.USER_NICK = itemValue;
              break;
            case '买家手机号':
              sellerRemarkData.VIP_PHONE = itemValue;
              break;
            case '原始平台单号':
              sellerRemarkData.SOURCE_CODE = itemValue;
              break;
            case '申请退款金额':
              sellerRemarkData.AMT_RETURN_APPLY = itemValue;
              break;
            case '支付方式':
              sellerRemarkData.PAY_MODE = this.payTypeName(itemValue);
              break;
            case '支付账号':
              sellerRemarkData.BUYER_ALIPAY_NO = itemValue;
              break;
          }
        });
        sellerRemarkData.OC_B_RETURN_TYPE_ENAME = this.returnTypeFormConfig.formValue.OC_B_RETURN_TYPE_ENAME || 'xxxxx';
        this.sellerRemarkDataCreated = true;
      }
    },
  },
  computed: {
    // 同步计算申请退款金额
    applyAmt() {
      return this.reForm.config[13].item.props.value;
    },
  },
  watch: {
    // 监听申请退款金额进行卖家备注赋值
    applyAmt(newValue) {
      const index = this.reForm.config.length - 1;
      const sellerRemarkData = this.sellerRemarkData;
      // 当不是新增的同时又是第一次相应数据（用于组织第一次查询的时候申请退款金额的改变，导致卖家备注被赋值）
      if (!this.$route.query.new && !this.createdStatus) return;
      sellerRemarkData.AMT_RETURN_APPLY = newValue;
      // 卖家备注数据补偿
      this.sellerRemarkCompensation();
      this.reForm.config[index].item.props.value = `${
        sellerRemarkData.USER_NICK
      }-${sellerRemarkData.VIP_PHONE}${self.vmI18n.t('modalTips.j7')}${
        sellerRemarkData.SOURCE_CODE
      }${self.vmI18n.t('modalTips.j8')}${
        sellerRemarkData.OC_B_RETURN_TYPE_ENAME
      }${self.vmI18n.t('modalTips.j9')}${
        sellerRemarkData.AMT_RETURN_APPLY || 0
      }${self.vmI18n.t('modalTips.k0')}${sellerRemarkData.PAY_MODE}${
        sellerRemarkData.BUYER_ALIPAY_NO
      }${self.vmI18n.t('modalTips.k1')}`;
      // 亲，您好！您的订单号
      // 因为
      // 原因，给您申请
      // 中，请您注意查收！感谢您的惠顾，欢迎下次光临，祝您生活愉快！
    },
  },
};
