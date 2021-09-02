// 额外退款新增/编辑
import reButton from 'professionalComponents/businessButton';
import reTable from 'professionalComponents/businessActionTable';
import reForm from 'professionalComponents/businessForm';
import commonUtil from '@/assets/js/__utils__/common';
import comUtils from '@/assets/js/__utils__/common';
import axios from 'axios';
import refundAfterShipment from './constants/refundAfterShipment';
import publicMethodsUtil from '@/assets/js/public/publicMethods';

export default {
  components: {
    reButton,
    reTable,
    reForm
  },
  data() {
    return {
      vmI18n: window.vmI18n,
      value: ['1', '2', '3'],
      isOne: true,
      btnConfig: {
        typeAll: 'error',
        buttons: [
          {
            text: '保存', // 保存、
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              this.save();
            }
          },
          {
            text: '复制',
            disabled: true, // 按钮禁用控制
            btnclick: () => {
              const self = this;
              this.copy();
            }
          },
          {
            text: '审核',
            disabled: true, // 按钮禁用控制
            btnclick: () => {
              const _this = this;
              const copyId = _this.$route.params.customizedModuleId;
              const fromdata = new FormData();
              const param = {"tableid":249230545,"ids":[_this.$route.params.customizedModuleId],"menu":"额外退款"}
              fromdata.append('actionid', 41460332);
              fromdata.append('webaction', null);
              fromdata.append('param', JSON.stringify(param));
              _this.service.common.exeAction(fromdata).then(res => {
                if (res.data.code === 0) {
                  _this.$Message.success(res.data.message);
                  comUtils.tabCloseAppoint(_this);
                  R3.store.commit('global/tabOpen', {
                    type: 'S',
                    tableName: 'OC_B_RETURN_AF_SEND_MANUAL',
                    tableId: 249230545
                  });
                  _this.$nextTick(()=>{
                    _this.$store.commit('customize/TabOpen', {
                      id: copyId,
                      type: 'action',
                      name: 'EXTRAREFUND',
                      label: '额外退款编辑',
                      query: Object.assign({
                        id: copyId,
                        tabTitle: '额外退款编辑'
                      }),
                    });
                  })
                  // 销毁当前实例
                  _this.$destroy();
                } else {
                  _this.$Message.warning(res.data.message);
                }
              })
            }
          },
          {
            text: '打款失败复审',
            disabled: true, // 按钮禁用控制
            btnclick: () => {
              this.save(true);
            }
          },
          {
            text: '返回', // 返回
            btnclick: () => {
              comUtils.tabCloseAppoint(this);
              if (this.$route.params.customizedModuleName === 'EXTRAREFUND') {
                R3.store.commit('global/tabOpen', {
                  type: 'S',
                  tableId: 249230545,
                  tableName: 'OC_B_RETURN_AF_SEND_MANUAL',
                  back: true,
                  label: window.vmI18n.t('btn.additionalRefund') // 额外退款
                });
              } else if (this.$route.query.fromOrder === 'true') {
                // 返回零售发货单详情
                R3.store.commit('global/tabOpen', {
                  type: 'C',
                  customizedModuleName: 'ORDERMANAGEDETAIL',
                  customizedModuleId: this.$route.query.oid,
                  label: this.vmI18n.t('panel_label.retailInvoice_details'),
                  dynamicRoutingForCustomizePage: true
                });
              }
              // 销毁当前实例
              this.$destroy();
            }
          }
        ]
      },
      information: {
        formValue: {
          // 存储表单得所有值
          BILL_NO: '', // 额外退款单号码
          CREATIONDATE: '', // 创建时间
          OWNERENAME: '', // 创建人
          REFUND_ORDER_SOURCE_TYPE: '1', // 单据来源
          RESERVE_VARCHAR01: '', // R3单据编号
          RESERVE_BIGINT04: '0', // 紧急程度
          TID: '', // 原始平台单号
          SOURCE_BILL_TIME: '', // R3单据创建日期
          CP_C_SHOP_TITLE: '', // 店铺名称
          CP_C_SHOP_ECODE: '', // 店铺编码
          CP_C_SHOP_ID: '', // 店铺id
          VIP_NICK: '', // 买家昵称
          VIP_PHONE: '', // 买家手机号
          BPM_FAILURE_TIMES: '', // BPM传输失败次数
        },
        // 表单非空提示
        ruleValidate: {
          RESERVE_BIGINT04: [{ required: true, message: ' ', trigger: 'blur' }],
          RESERVE_VARCHAR01: [{ required: true, message: ' ', trigger: 'blur' }]
        },
        formData: [
          {
            style: 'input',
            label: '额外退款单号码',
            disabled: true,
            value: 'BILL_NO',
            width: '6'
          },
          {
            style: 'input',
            label: '创建人',
            disabled: true,
            value: 'OWNERENAME',
            width: '6'
          },
          {
            style: 'input',
            label: '创建日期',
            disabled: true,
            value: 'CREATIONDATE',
            width: '6'
          },
          {
            style: 'select', // 下拉框类型
            label: '单据来源', // 单据类型 下拉框前的值
            dataAcessKey: 'REFUND_ORDER_SOURCE_TYPE',
            width: '6', // 所占宽度宽度
            disabled: true, // 按钮禁用控制
            rules: true,
            value: 'REFUND_ORDER_SOURCE_TYPE',
            selectChange: () => {
            },
            options: [
              // 下拉框选项值
              {
                value: '1',
                label: '手动'
              },
              {
                value: '2',
                label: '自动'
              }
            ]
          },
          {
            style: 'input', // 输入框类型
            dataAcessKey: 'RESERVE_VARCHAR01',
            label: 'R3单据编号',
            value: 'RESERVE_VARCHAR01', // 输入框的值
            width: '6', // 所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
            icon: 'ios-search', // 输入框后带的图标,暂只有输入框支持
            placeholder: '', // 占位文本，默认为请输入
            disabled: false, // 按钮禁用控制
            rules: true,
            ghost: false, // 是否关闭幽灵按钮，默认开启
            inputenter: () => {
              // this.queryEnter();
            }, // 表单回车事件
            iconclick: () => {
              const self = this;
              self.order.modal = true;
            } // 点击icon图标事件
          },
          {
            style: 'select', // 下拉框类型
            label: '紧急程度', // 单据类型 下拉框前的值
            dataAcessKey: 'RESERVE_BIGINT04',
            width: '6', // 所占宽度宽度
            disabled: false, // 按钮禁用控制
            rules: true,
            value: 'RESERVE_BIGINT04',
            selectChange: () => {
            },
            options: [
              // 下拉框选项值
              {
                value: '0',
                label: '普通'
              },
              {
                value: '1',
                label: '加急'
              }
            ]
          },
          {
            style: 'input',
            label: '原始平台单号',
            disabled: true,
            value: 'TID',
            width: '6'
          },
          {
            style: 'input',
            label: 'R3单据创建日期',
            disabled: true,
            value: 'SOURCE_BILL_TIME',
            width: '6'
          },
          {
            style: 'input',
            label: '店铺名称',
            disabled: true,
            value: 'CP_C_SHOP_TITLE',
            width: '6'
          },
          {
            style: 'input',
            label: '买家昵称',
            disabled: true,
            value: 'VIP_NICK',
            width: '6'
          },
          {
            style: 'input',
            label: '买家手机号',
            disabled: true,
            value: 'VIP_PHONE',
            width: '6'
          },
          {
            style: 'input',
            label: 'BPM传输失败次数',
            disabled: true,
            value: 'BPM_FAILURE_TIMES',
            width: '6'
          },
        ]
      }, // 单据信息
      returnInfo: {
        formValue: {
          // 存储表单得所有值
          RESERVE_BIGINT01: '', // 额外退款申请类型
          BILL_TYPE: '', // 退款类型
          OC_B_RETURN_TYPE_ID: '', // 退货大类id
          OC_B_RETURN_TYPE_ENAME: '', // 退货大类name
          OC_B_RETURN_TYPE_ITEM_ID: '', // 退款小类
          PAY_MODE: '1', // 支付方式
          RECEIVER_NAME: '', // 收款人姓名
          PAY_ACCOUNT: '', // 收款人账号
          AMT_RETURN_APPLY: '', // 额外退款金额
          RESERVE_BIGINT02: '', // 退货签收状态 0未签收,1已签收
          PRO_RETURN_STATUS: '', // 退货入库状态 0待入库,1部分入库,2全部入库
          RESERVE_VARCHAR02: '', // 退货物流单号
          RESERVE_BIGINT03: '', // 支付宝累计打款次数
          REASON: '', // 退款原因备注说明
          SELLER_REMARK: '', // 卖家备注
        },
        // 表单非空提示
        ruleValidate: {
          RESERVE_BIGINT01: [{ required: true, message: ' ', trigger: 'blur' }],
          BILL_TYPE: [{ required: true, message: ' ', trigger: 'blur' }],
          OC_B_RETURN_TYPE_ID: [{ required: true, message: ' ', trigger: 'blur' }],
          OC_B_RETURN_TYPE_ITEM_ID: [{ required: true, message: ' ', trigger: 'blur' }],
          PAY_MODE: [{ required: true, message: ' ', trigger: 'blur' }],
          RECEIVER_NAME: [{ required: true, message: ' ', trigger: 'blur' }],
          PAY_ACCOUNT: [{ required: true, message: ' ', trigger: 'blur' }],
          REASON: [{ required: true, message: ' ', trigger: 'blur' }],
        },
        formData: [
          {
            style: 'select', // 下拉框类型
            label: '额外退款申请类型', // 单据类型 下拉框前的值
            dataAcessKey: 'RESERVE_BIGINT01',
            width: '6', // 所占宽度宽度
            disabled: false, // 按钮禁用控制
            rules: true,
            value: 'RESERVE_BIGINT01',
            selectChange: () => {
              // this.selectSelectt();
            },
            options: []
          },
          {
            style: 'select', // 下拉框类型
            label: '退款类型', // 单据类型 下拉框前的值
            dataAcessKey: 'BILL_TYPE',
            width: '6', // 所占宽度宽度
            disabled: false, // 按钮禁用控制
            rules: true,
            value: 'BILL_TYPE',
            selectChange: () => {
              // this.selectSelectt();
            },
            options: [
              // 下拉框选项值
              {
                value: '1',
                label: '仅退款'
              },
              {
                value: '0',
                label: '退货退款'
              }
            ]
          },
          {
            style: 'popInput',
            width: '6',
            itemdata: {
              colid: 1700816078,
              colname: 'OC_B_RETURN_TYPE_ID',
              display: 'text',
              fkdisplay: 'drp',
              readonly: false,
              isfk: true,
              length: 100,
              name: '退款大类',
              isnotnull: true,
              reftable: 'OC_B_RETURN_TYPE', // 对应的表
              reftableid: 249230473, // 对应的表ID
              pid: '', // 这个是选择的id
              valuedata: ''
            },
            oneObj: data => {
              this.returnInfo.formValue.OC_B_RETURN_TYPE_ID = data.pid;
              this.returnInfo.formValue.OC_B_RETURN_TYPE_ENAME = data.valuedata;
              if (data.valuedata == '退货') {
                this.returnInfo.formData.forEach(item => {
                  if (item.value == 'RESERVE_BIGINT02') item.disabled = false
                  if (item.value == 'PRO_RETURN_STATUS') item.disabled = false
                  if (item.value == 'RESERVE_VARCHAR02') item.disabled = false
                })
              } else {
                this.returnInfo.formValue.RESERVE_BIGINT02 = ''
                this.returnInfo.formValue.PRO_RETURN_STATUS = ''
                this.returnInfo.formValue.RESERVE_VARCHAR02 = ''
                this.returnInfo.formData.forEach(item => {
                  if (item.value == 'RESERVE_BIGINT02') item.disabled = true
                  if (item.value == 'PRO_RETURN_STATUS') item.disabled = true
                  if (item.value == 'RESERVE_VARCHAR02') item.disabled = true
                })
              }
              if (data.pid) {
                this.returnTypeChange();
              }
            },
            InputEnter: () => {}
          },
          {
            style: 'select', // 下拉框类型
            label: '退款细类', // 单据类型 下拉框前的值
            dataAcessKey: 'OC_B_RETURN_TYPE_ITEM_ID',
            width: '6', // 所占宽度宽度
            disabled: false, // 按钮禁用控制
            rules: true,
            value: 'OC_B_RETURN_TYPE_ITEM_ID',
            selectChange: () => {},
            options: []
          },
          {
            style: 'select', // 下拉框类型
            label: '支付方式', // 单据类型 下拉框前的值
            dataAcessKey: 'PAY_MODE',
            width: '6', // 所占宽度宽度
            disabled: false, // 按钮禁用控制
            rules: true,
            value: 'PAY_MODE',
            selectChange: () => {
              // this.selectSelectt();
            },
            options: [
              // 下拉框选项值
              {
                value: '1',
                label: '支付宝'
              }
            ]
          },
          {
            style: 'input',
            label: '收款人姓名',
            disabled: false,
            value: 'RECEIVER_NAME',
            width: '6'
          },
          {
            style: 'input',
            label: '收款人账号',
            disabled: false,
            value: 'PAY_ACCOUNT',
            width: '6'
          },
          {
            style: 'input',
            label: '额外退款金额',
            disabled: true,
            value: 'AMT_RETURN_APPLY',
            width: '6'
          },
          {
            style: 'select', // 下拉框类型
            label: '退货签收状态', // 单据类型 下拉框前的值
            dataAcessKey: 'RESERVE_BIGINT02',
            width: '6', // 所占宽度宽度
            disabled: false, // 按钮禁用控制
            rules: true,
            value: 'RESERVE_BIGINT02',
            selectChange: () => {
            },
            options: [
              {
                value: '0',
                label: '未签收'
              },
              {
                value: '1',
                label: '已签收'
              }
            ]
          },
          {
            style: 'select', // 下拉框类型
            label: '退货入库状态', // 单据类型 下拉框前的值
            dataAcessKey: 'PRO_RETURN_STATUS',
            width: '6', // 所占宽度宽度
            disabled: false, // 按钮禁用控制
            rules: true,
            value: 'PRO_RETURN_STATUS',
            selectChange: () => {
            },
            options: [
              {
                value: '0',
                label: '待入库'
              },
              {
                value: '1',
                label: '部分入库'
              },
              {
                value: '2',
                label: '全部入库'
              }
            ]
          },
          {
            style: 'input',
            label: '退货物流单号',
            disabled: false,
            value: 'RESERVE_VARCHAR02',
            width: '6'
          },
          {
            style: 'input',
            label: '支付宝累计打款次数',
            disabled: false,
            value: 'RESERVE_BIGINT03',
            width: '6'
          },
          {
            style: 'textarea',
            label: '退款原因备注说明',
            disabled: false,
            value: 'REASON',
            width: '24'
          },
          {
            style: 'input',
            label: '卖家备注',
            disabled: true,
            value: 'SELLER_REMARK',
            width: '24'
          },
      ]}, // 退款信息
      payInfo: {
        formValue: {
          PAYMENT_STATUS: '',
          MODIFIERENAME: '',
          PAYMENT_FAIL_REASON: '',
          PAYMENT_FAIL_REASON1: ''
        },
        formData: [
          {
            style: 'input',
            label: '单据状态',
            disabled: true,
            value: 'PAYMENT_STATUS',
            width: '6'
          },
          {
            style: 'input',
            label: '财务打款人',
            disabled: true,
            value: 'MODIFIERENAME',
            width: '6'
          },
          {
            style: 'input',
            label: '支付宝交易流水号', // 打款成功 显示
            disabled: true,
            value: 'PAYMENT_FAIL_REASON',
            width: '6'
          },
          {
            style: 'input',
            label: '打款失败/拒绝打款原因', // 打款失败/拒绝打款 显示
            disabled: true,
            value: 'PAYMENT_FAIL_REASON1',
            width: '6'
          },
        ]
      }, // 单据回传及支付信息回传
      addItem: {
        // 新增明细弹框数据
        modal: false,
        table: {
          indexColumn: true,
          totalData: [],
          columns: refundAfterShipment.addItemTableColumns,
          data: []
        },
        addList: []
      },
      IMAGE: '', // 图片
      imgIndex: 0, // 当前操作图片位置
      isModal: false,
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
              } // 按钮点击事件
            }
          ]
        },
        orderform: {
          formValue: {
            bill_no: '',
            source_code: '',
            receiver_name: '',
            user_nick: '',
            receiver_mobile: '',
            cp_c_store_ename: ''
          },
          formData: [
            {
              style: 'input',
              label: 'R3单据编号',
              value: 'bill_no',
              width: '8',
              inputenter: () => this.queryBounced()
            },
            {
              style: 'input',
              label: window.vmI18n.t('table_label.platform_orderNo'), // 平台订单号
              value: 'source_code',
              width: '8',
              inputenter: () => this.queryBounced()
            },
            {
              style: 'input',
              label: window.vmI18n.t('table_label.buyerNickname'), // 买家昵称
              value: 'user_nick',
              width: '8',
              inputenter: () => this.queryBounced()
            },
            {
              style: 'input',
              label: window.vmI18n.t('form_label.consignee'), // 收货人
              value: 'receiver_name',
              width: '8',
              inputenter: () => this.queryBounced()
            },
            {
              style: 'input',
              label: window.vmI18n.t('form_label.consignee_phone'), // 收货人手机
              value: 'receiver_mobile',
              width: '8',
              regx: /^(([1-9]{1}\d*)|(0{1}))(\.\d{0,2})?$/,
              inputenter: () => this.queryBounced()
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
                    iswrite: 'true'
                  }
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
                valuedata: '' // 这个是选择的值
              },
              oneObj: () => {
                this.threeObjs();
              }
            }
          ]
        },
        table: {
          columns: [
            {
              key: 'SOURCE_CODE',
              title: window.vmI18n.t('table_label.platformInfo') // 平台信息
            },
            {
              key: 'BILL_NO',
              title: 'R3单据编号'
            },
            {
              key: 'USER_NICK',
              title: window.vmI18n.t('table_label.buyerNickname') // 买家昵称
            },
            {
              key: 'ORDER_AMT',
              title: window.vmI18n.t('table_label.totalOrderAmount') // 订单总额
            },
            {
              key: 'RECEIVER_NAME',
              title: window.vmI18n.t('form_label.consignee') // 收货人
            },
            {
              key: 'RECEIVER_MOBILE',
              title: window.vmI18n.t('form_label.consignee_phone') // 收货人手机号
            },
            {
              key: 'CP_C_PHY_WAREHOUSE_ENAME',
              title: window.vmI18n.t('form_label.delivery_warehouse') // 发货仓库
            },
            {
              key: 'EXPRESSCODE',
              title: window.vmI18n.t('form_label.logisticsOrder_No') // 物流单号
            },
            {
              key: 'CP_C_SHOP_TITLE',
              title: window.vmI18n.t('form_label.orderShop') // 下单店铺
            }
          ], // 表头
          data: [], // 数据配置
          indexColumn: true, // 是否显示序号
          height: '300',
          loading: false
          //   isShowSelection: true // 是否显示checkedbox
        },
        value: ''
      },
      isDisabled: false,
      tableConfig: {
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
            align: 'center'
          },
          {
            title: window.vmI18n.t('form_label.billNo'), // 单据编号
            key: 'BILL_NO'
          },
          {
            title: window.vmI18n.t('form_label.gift'), // 平台商品编码
            key: 'PS_C_SKU_PT_ECODE'
          },
          {
            title: window.vmI18n.t('table_label.code_SKU'), // SKU编码
            key: 'skuEcode'
          },
          {
            title: window.vmI18n.t('form_label.platformProductsCode'), // 商品编码
            key: 'ecode'
          },
          {
            title: window.vmI18n.t('form_label.platformProductsName'), // 平台商品名称
            key: 'PT_PRO_NAME'
          },
          {
            title: window.vmI18n.t('table_label.productName'), // 商品名称
            key: 'proEname'
          },
          {
            title: window.vmI18n.t('form_label.purchaseQuantity'), // 购买数量
            key: 'qty'
          },
          {
            title: window.vmI18n.t('form_label.transactionAmount'), // 成交金额
            key: 'realAmt'
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
                    justifyContent: 'space-between'
                  }
                },
                [
                  h('Input', {
                    class: 'isNone',
                    style: {
                      width: '150',
                      height: '100%',
                      'text-align': 'center'
                    },
                    props: {
                      value: params.row.QTY_IN,
                      autosize: true,
                      placeholder: '',
                      disabled: self.isDisabled,
                      regx: /^(([1-9]{1}\d*)|(0{1}))(\.\d{0,2})?$/
                    },

                    on: {
                      'on-change': e => {
                        params.row.QTY_IN = Number(e.target.value);
                        self.tableConfig.data[params.index] = params.row;
                      }
                    }
                  })
                ]
              );
            }
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
                    justifyContent: 'space-between'
                  }
                },
                [
                  h('Input', {
                    class: 'isNone',
                    style: {
                      width: '150',
                      height: '100%',
                      border: '1px solid #dcdee2',
                      'text-align': 'center'
                    },
                    props: {
                      value: params.row.returnPrice,
                      autosize: true,
                      disabled: self.isDisabled,
                    },

                    on: {
                      'on-change': e => {
                        const tag = /^(([1-9]{1}\d*)|(0{1}))(\.\d{0,2})?$/
                        if (!tag.test(e.target.value)) {
                          setTimeout(() => {
                            params.row.returnPrice = 0
                            let total = 0;
                            self.tableConfig.data.forEach(item => {
                              total = publicMethodsUtil.accAdd(total, publicMethodsUtil.accAdd((item.returnPrice || 0), item.FREIGHT));
                            });
                            self.returnInfo.formValue.AMT_RETURN_APPLY = total;
                          })
                        }
                        params.row.returnPrice = Number(e.target.value);
                        self.tableConfig.data[params.index] = params.row;
                        let total = 0;
                        self.tableConfig.data.forEach(item => {
                          total = publicMethodsUtil.accAdd(total, publicMethodsUtil.accAdd((item.returnPrice || 0), item.FREIGHT));
                        });
                        self.returnInfo.formValue.AMT_RETURN_APPLY = total;
                      },
                      'on-blur': e => {
                        const tag = /^(([1-9]{1}\d*)|(0{1}))(\.\d{0,2})?$/
                        if (!tag.test(e.target.value)) {
                          params.row.returnPrice = 0

                          let total = 0;
                          self.tableConfig.data.forEach(item => {
                            total = publicMethodsUtil.accAdd(total, publicMethodsUtil.accAdd((item.returnPrice || 0), item.FREIGHT));
                          });
                          self.returnInfo.formValue.AMT_RETURN_APPLY = total;
                        }
                      }
                    }
                  })
                ]
              );
            }
          },
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
                    justifyContent: 'space-between'
                  }
                },
                [
                  h('Input', {
                    class: 'isNone',
                    style: {
                      width: '50px',
                      height: '100%',
                      'text-align': 'center'
                    },
                    props: {
                      value: params.row.FREIGHT,
                      autosize: true,
                      disabled: self.isDisabled
                    },

                    on: {
                      'on-change': e => {
                        const tag = /^(([1-9]{1}\d*)|(0{1}))(\.\d{0,2})?$/
                        if (!tag.test(e.target.value)) {
                          setTimeout(() => {
                            params.row.FREIGHT = 0
                            let total = 0;
                            self.tableConfig.data.forEach(item => {
                              total = publicMethodsUtil.accAdd(total, publicMethodsUtil.accAdd((item.returnPrice || 0), item.FREIGHT));
                            });
                            self.returnInfo.formValue.AMT_RETURN_APPLY = total;
                          })
                        }
                        params.row.FREIGHT = Number(e.target.value);
                        self.tableConfig.data[params.index] = params.row;
                        let total = 0;
                        self.tableConfig.data.forEach(item => {
                          total = publicMethodsUtil.accAdd(total, publicMethodsUtil.accAdd((item.returnPrice || 0), item.FREIGHT));
                        });
                        self.returnInfo.formValue.AMT_RETURN_APPLY = total;
                      }
                    }
                  })
                ]
              );
            }
          }
        ],
        data: []
      },
      navStatus: 0,
      delTableData: [], // 要删除的退款单明细
      returnLogTableLoad: false, // 日志
      returnLogTableConfig: {
        columns: refundAfterShipment.returnLogTableConfig,
        data: [],
        pageShow: false, // 控制分页是否显示
        btnsShow: false, // 控制操作按钮是否显示
        searchInputShow: false, // 控制搜索框是否显示
        indexColumn: true,
        width: '', // 表格宽度
        height: '', // 表格高度
        border: true, // 是否显示纵向边框
        total: 0, // 设置总条数
        pageSizeOpts: [10, 20, 30], // 每页条数切换的配置
        pageSize: 10, // 每页条数
        current: '' // 当前页
      },
      imageUploadConfig: {
        name: window.vmI18n.t('other.uploadVoucher'),
        url: '/p/cs/upload2', // 上传地址
        readonly: false,
        sendData: {
          path: `${this.$route.params.customizedModuleName}/${this.$route.params.customizedModuleId}/`
        }, // 上传参数
        width: 270,
        height: 250,
        valuedata: []
      },
      PAYMENT_STATUS: '', // 单据状态
      copyId: '',
      strike: false
    };
  },
  async mounted() {
    const RESERVE_BIGINT01 = await publicMethodsUtil.getTypeList('OC_B_RETURN_AF_SEND_MANUAL', '额外退款申请类型', '基础信息')
    this.returnInfo.formData.forEach(item => {
      if (item.value == 'RESERVE_BIGINT01') item.options = RESERVE_BIGINT01
    })
    if (this.$route.query.fromOrder) {
      // 该类型从订单详情跳转过来的查询方式
      this.queryBounced(this.$route.query.oid);
    } else {
      // 复制
      if (this.$route.query.copyId) this.copyId = this.$route.query.copyId
      if (this.$route.params.customizedModuleId !== 'New') {
        this.query()
        if (!this.$route.query.copyId) this.logTableInfo();
      } else {
        // this.information.formValue.CREATIONDATE = commonUtil.dateFormat(new Date(), 'yyyy-MM-dd')
      }
    }
    this.getDownUp();
  },
  methods: {
    // 保存
    save(flag) {
      const self = this;
      // 防暴击
      if (self.strike) return
      if (!this.information.formValue.RESERVE_VARCHAR01) return this.$Message.warning('R3单据编号必填!');
      if (!this.information.formValue.RESERVE_BIGINT04) return this.$Message.warning('紧急程度必填!');
      if (!this.returnInfo.formValue.RESERVE_BIGINT01) return this.$Message.warning('额外退款申请类型必填!');
      if (!this.returnInfo.formValue.BILL_TYPE) return this.$Message.warning('退款类型必填!');
      if (!this.returnInfo.formValue.OC_B_RETURN_TYPE_ID) return this.$Message.warning('退款大类必填!');
      if (!this.returnInfo.formValue.OC_B_RETURN_TYPE_ITEM_ID) return this.$Message.warning('退款细类必填!');
      if (!this.returnInfo.formValue.PAY_MODE) return this.$Message.warning('支付方式必填!');
      if (!this.returnInfo.formValue.RECEIVER_NAME) return this.$Message.warning('收款人姓名必填!');
      if (!this.returnInfo.formValue.PAY_ACCOUNT) return this.$Message.warning('收款人账号必填!');
      if (!this.returnInfo.formValue.REASON) return this.$Message.warning('退款原因备注说明必填!');
      if (this.IMAGE == '') return this.$Message.warning('附件必填!');
      if (!this.tableConfig.data.length) return this.$Message.warning('退款明细必填!');
      if (this.returnInfo.formValue.OC_B_RETURN_TYPE_ENAME == '退货' && !this.returnInfo.formValue.RESERVE_BIGINT02) return this.$Message.warning('退款大类=退货时，退货签收状态必填!');
      // 签收状态为“未签收”时该字段必填，其他选填，否则点击保存时提示”签收状态为“未签收”时，退货物流单号必填！”
      if (this.returnInfo.formValue.RESERVE_BIGINT02 == '0' && !this.returnInfo.formValue.RESERVE_VARCHAR02) return this.$Message.warning('签收状态为“未签收”时，退货物流单号必填!');
      if (Number(this.returnInfo.formValue.AMT_RETURN_APPLY) <= 0) return this.$Message.warning('额外退款金额不允许小于等于0!');




      self.strike = true
      const data = {};
      data.objId = self.$route.params.customizedModuleId === 'New' || self.copyId ? -1 : self.$route.params.customizedModuleId;
      const AfSend = Object.assign(self.information.formValue, this.returnInfo.formValue);
      AfSend.IMAGE = this.IMAGE;
      AfSend.SOURCE_BILL_NO = this.onSelectData.ID
      if (flag) AfSend.PAYMENT_STATUS = '3' // 打款失败复审
      const AfSendItem = self.tableConfig.data.map(item => ({
        id: self.copyId ? item.RELATION_BILL_ITEM_ID : item.ID,
        AMT_RETURN: item.returnPrice,
        FREIGHT: item.FREIGHT,
        QTY_IN: item.QTY_IN
      }));


      data.AfSend = AfSend;
      data.AfSendItem = AfSendItem;
      this.service.orderCenter.saveAfterDeliver(data).then(res => {
        if (res.data.code == 0) {
          self.$Message.success(res.data.message);

          comUtils.tabCloseAppoint(self);
          R3.store.commit('global/tabOpen', {
            type: 'S',
            tableName: 'OC_B_RETURN_AF_SEND_MANUAL',
            tableId: 249230545
          });
          self.$nextTick(()=>{
             self.$store.commit('customize/TabOpen', {
              id: res.data.data,
              type: 'action',
              name: 'EXTRAREFUND',
              label: '额外退款编辑',
              query: Object.assign({
                id: res.data.data,
                tabTitle: '额外退款编辑'
              }),
            });
          })
          // 销毁当前实例
          self.$destroy();
        } else {
          self.$Message.error(res.data.message || '保存出错');
        }
        self.strike = false
      }).catch(() => {
        self.strike = false
      })
    },

    // 日志明细请求
    async logTableInfo() {
      this.returnLogTableLoad = true;
      const query = {
        ocBReturnAfSendId: this.$route.params.customizedModuleId
      };
      const res = await this.service.orderCenter.extraReturnTableLogQuery(query);
      this.returnLogTableLoad = false;
      if (res.data.code === 0) {
        const resData = res.data.data;
        const dateFormat = this.$comUtils.dateFormat;
        resData.forEach(val => {
          val.CREATIONDATE = dateFormat(new Date(val.CREATIONDATE || ''), 'yyyy-MM-dd hh:mm:ss');
        });
        this.returnLogTableConfig.data = resData;
        this.returnLogTableConfig.total = resData.length;
      } else {
        this.$Message.error('日志明细请求失败');
      }
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
        const childs = res.data.data.addcolums[res.data.data.addcolums.length - 2].childs || [];
        childs.forEach(item => {
          if (item.name === '判责方') {
            dutyOfficer = item.combobox;
          }
          if (item.name === '支付方式') {
            payType = item.combobox;
          }
        });
        payType.forEach(item => {
          item.label = item.limitdesc;
          item.value = item.limitval;
        });
        dutyOfficer.forEach(item => {
          item.label = item.limitdesc;
          item.value = item.limitval;
        });
        this.selectOptions = {
          payType,
          dutyOfficer
        };
      } else {
        self.$Message.error(res.data.message);
      }
    },
    // 查询原始订单编号
    queryBounced(num) {
      //  获取页面数据
      const _this = this;
      const lists = _this.order.orderform.formValue;
      if (!lists.bill_no && !lists.source_code && !lists.receiver_name && !lists.user_nick && !lists.receiver_mobile && !lists.cp_c_store_ename && num === undefined) {
        _this.$Message.error(_this.vmI18n.t('modalTips.i8')); // 请输入查询条件！
        return;
      }
      _this.order.table.loading = true;
      const fromdata = new FormData();
      const param = {
        page: {
          pageSize: '500',
          pageNum: '1'
        },
        highSearch: [
          {
            type: 'Select',
            queryName: 'BILL_NO',
            value: lists.bill_no
          },
          {
            type: 'Input',
            queryName: 'SOURCE_CODE',
            value: lists.source_code
          },
          {
            type: 'Input',
            queryName: 'RECEIVER_NAME',
            value: lists.receiver_name
          },
          {
            type: 'Input',
            queryName: 'USER_NICK',
            value: lists.user_nick
          },
          {
            type: 'Input',
            queryName: 'RECEIVER_MOBILE',
            value: lists.receiver_mobile
          },
          {
            type: 'Select',
            queryName: 'CP_C_SHOP_ID',
            value: lists.cp_c_store_id
          },
          {
            type: 'Select',
            queryName: 'ID',
            value: num
          },
          {
            type: 'Select',
            queryName: 'ORDER_STATUS',
            value: '1,2,3,4,5,6,9,10,11,12,13,21,51,52'
          }
        ]
      };
      fromdata.append('param', JSON.stringify(param));
      this.service.common
        .queryOrderList(fromdata)
        .then(res => {
          const query = _this.$route.query;
          if (res.data.data) {
            res.data.data.queryOrderResultList.forEach(item => {
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
    // 确定原始订单编号 
    queryorder(listData, isEnter) {
      const _this = this;
      if (isEnter) {
        _this.fromOrder(listData[0], true);
      } else {
        _this.onSelectData = _this.selectData;
        if (JSON.stringify(_this.onSelectData) == '{}') {
          _this.$Message.warning(window.vmI18n.t('modalTips.i7')); // 请选择一条数据！
          return;
        }
        const QUERYORDERITEMRESULTLIST = _this.onSelectData.QUERYORDERITEMRESULTLIST;
        _this.onSelectData.QUERYORDERITEMRESULTLIST = _this.filter(QUERYORDERITEMRESULTLIST);
        _this.setForm(_this.onSelectData);
      }
    },
    filter(arr) {
      arr.forEach((item, i) => {
        item.IS_GIFT = item.GIFT_TYPE;
        if (!item.FREIGHT) item.FREIGHT = 0; // 运费
        if (item.RETURNABLE_AMOUNT == 0) {
          arr.splice(i, 1);
        }
        item.QTY_IN = 0
        // if (item.QTY_IN === undefined || item.QTY_IN === null) item.QTY_IN = this.BILL_TYPE === '1' ? 0 : Number(item.qty || 1);
      });
      return arr;
    },
    // 赋值表单数据
    setForm(data) {
      const self = this;
      // 弹出原始退单明细
      self.addItem.modal = true;
      self.isOne = false;
      self.addItem.table.data = self.filter(data.QUERYORDERITEMRESULTLIST);
      if (self.addItem.table.data.length) {
        let RETURNABLE_AMOUNT = 0
        let realAmt = 0
        self.addItem.table.data.forEach(item => {
          RETURNABLE_AMOUNT = publicMethodsUtil.accAdd(item.RETURNABLE_AMOUNT, RETURNABLE_AMOUNT)
          realAmt = publicMethodsUtil.accAdd(item.realAmt, realAmt)
        })
        self.addItem.table.totalData = [
          {
            selection: '合计:',
            realAmt: realAmt,
            RETURNABLE_AMOUNT_total: RETURNABLE_AMOUNT
          }
        ];
      }
    },
    // 取消
    querycancel() {},
    onCurrentChange(val) {
      this.selectData = val;
    },
    fromOrder(listData, initStatus = false) {
      this.isOne = false;

      this.information.formValue.SOURCE_BILL_TIME = listData.CREATIONDATE && commonUtil.dateFormat(new Date(listData.CREATIONDATE), 'yyyy-MM-dd hh:mm:ss')
      this.information.formValue.CP_C_SHOP_TITLE = listData.CP_C_SHOP_TITLE
      this.information.formValue.CP_C_SHOP_ID = listData.CP_C_SHOP_ID
      this.information.formValue.CP_C_SHOP_ECODE = listData.CP_C_SHOP_ECODE
      this.information.formValue.VIP_NICK = listData.USER_NICK
      this.information.formValue.VIP_PHONE = listData.VIP_PHONE.length > 11 ? '***********' : listData.VIP_PHONE // 是否为密文
      this.information.formValue.RESERVE_VARCHAR01 = listData.ORIG_ORDER_NO
      this.information.formValue.TID = listData.SOURCE_CODE

      this.onSelectData.ID = listData.ID


      const arr = []
      listData.QUERYORDERITEMRESULTLIST.map(item => {
        item.FREIGHT = 0
        item.returnPrice = 0;
        item.ID = item.proId;
        item.IS_GIFT = item.GIFT_TYPE;
        item.BILL_NO = this.selectData.BILL_NO;
        // item.QTY_IN = this.BILL_TYPE === '1' ? 1 : Number(item.qty || 1);
        item.QTY_IN = 0;
        arr.push(item)
      });
      this.tableConfig.data = arr;
    },

    onAddItem() {
      const self = this;
      // 新增界面逻辑
      if (self.$route.params.customizedModuleId === 'New' || self.copyId) {
        if (!self.isOne) {
          const data = self.onSelectData;
          this.information.formValue.SOURCE_BILL_TIME = data.CREATIONDATE && commonUtil.dateFormat(new Date(data.CREATIONDATE), 'yyyy-MM-dd hh:mm:ss')
          this.information.formValue.CP_C_SHOP_TITLE = data.CP_C_SHOP_TITLE
          this.information.formValue.CP_C_SHOP_ID = data.CP_C_SHOP_ID
          this.information.formValue.CP_C_SHOP_ECODE = data.CP_C_SHOP_ECODE
          this.information.formValue.VIP_NICK = data.USER_NICK
          this.information.formValue.VIP_PHONE = data.VIP_PHONE.length > 11 ? '***********' : data.VIP_PHONE // 是否为密文
          this.information.formValue.RESERVE_VARCHAR01 = data.ORIG_ORDER_NO
          this.information.formValue.TID = data.SOURCE_CODE

          
          self.addItem.addList.forEach(item => {
            item.returnPrice = 0;
            item.ID = item.proId;
            item.IS_GIFT = item.GIFT_TYPE;
            item.BILL_NO = self.selectData.BILL_NO;
            // item.QTY_IN = self.BILL_TYPE === '1' ? 1 : Number(item.qty || 1);
            item.QTY_IN = 0;
          });
          self.tableConfig.data = self.addItem.addList;
        } else {
          self.addItem.addList.forEach(item => {
            let flag = false;
            item.QTY_IN = 0;
            item.AMT_RETURN = 0;
            self.tableConfig.data.forEach(item1 => {
              item1.price += item1.returnPrice || 0;
              if (item.proId == item1.RELATION_BILL_ITEM_ID) {
                flag = true;
              }
            });
            if (!flag) {
              item.returnPrice = item.price > item.RETURNABLE_AMOUNT ? item.RETURNABLE_AMOUNT : item.price;
              self.tableConfig.data.push(item);
            }
            if (self.$route.params.customizedModuleId === 'New' || self.copyId) {
              self.tableConfig.data.forEach(item => {
                item.returnPrice = 0;
                item.RELATION_BILL_ITEM_ID = item.ID ? item.ID : item.proId;
                // item.BILL_NO = self.selectData.BILL_NO;
              });
            }
          });
        }
      } else {
        // 详情/复制页面新增明细逻辑
        const data = {};
        const OcBReturnAfSendItem = [];
        data.id = self.$route.params.customizedModuleId == 'New' ? -1 : self.$route.params.customizedModuleId;
        data.orderId = self.onSelectData.ID;
        self.addItem.addList.forEach(item => {
          const obj = {};
          obj.id = item.proId;
          obj.AMT_RETURN = 0;
          obj.FREIGHT = 0; // 默认运费为零 夏继超要求;
          OcBReturnAfSendItem.push(obj);
          obj.QTY_IN = 0;
        });
        data.OcBReturnAfSendItem = OcBReturnAfSendItem;
        this.service.orderCenter.saveAfterDeliverItem(data).then(res => {
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
    onSelect(e) {
      this.addItem.addList = e;
    },

    // 退款单详情相关
    tabllePageChange(page) {
      this.tableConfig.current = page;
      this.query();
    },
    tabllePageSizeChange(size) {
      this.tableConfig.pageSize = size;
      this.query();
    },
    onDel(e) {
      this.delTableData = e;
    },
    // 新增明细按钮调用
    tableAddDetail() {
      const self = this;
      if (!self.onSelectData.ID) return self.$Message.warning('R3单据编号不能为空！');
      const formData = new FormData();
      const requestData = {
        page: { pageSize: '500', pageNum: '1' },
        highSearch: [
          {
            type: 'Select',
            queryName: 'ID',
            value: self.onSelectData.ID
          }
        ]
      };
      formData.append('param', JSON.stringify(requestData));
      this.service.common.queryOrderList(formData).then(res => {
        console.log(res);
        if (res.data.code == 0) {
          const arr = [];
          if (!res.data.data) {
            return this.$Message.error(self.vmI18n.t('modalTips.j2'));
          } // 没有明细可新增
          res.data.data.queryOrderResultList[0].QUERYORDERITEMRESULTLIST.forEach(item => {
            if (!item.FREIGHT) item.FREIGHT = 0;
            if (item.RETURNABLE_AMOUNT != 0) {
              arr.push(item);
            }
          });
          self.addItem.table.data = arr;
          self.addItem.table.data.forEach(item => {
            item.returnQTY = item.qty - (item.QTY_RETURN_APPLY ? item.QTY_RETURN_APPLY : 0);
            item.IS_GIFT = item.GIFT_TYPE;
          });
          if (self.addItem.table.data.length) {
            let RETURNABLE_AMOUNT = 0
            let realAmt = 0
            self.addItem.table.data.forEach(item => {
              RETURNABLE_AMOUNT = publicMethodsUtil.accAdd(item.RETURNABLE_AMOUNT, RETURNABLE_AMOUNT)
              realAmt = publicMethodsUtil.accAdd(item.realAmt, realAmt)
            })
            self.addItem.table.totalData = [
              {
                selection: '合计:',
                realAmt: realAmt,
                RETURNABLE_AMOUNT_total: RETURNABLE_AMOUNT
              }
            ];
          }
          self.addItem.modal = true;
        } else {
          self.$Message.error(res.data.message);
        }
      });
    },
    tableDeleteDetail() {
      // 删除明细
      const self = this;
      if (self.delTableData.length == 0) {
        return self.$Message.warning(self.vmI18n.t('modalTips.j3')); // 请选择需要删除的明细!
      }
      if (self.delTableData.length == self.tableConfig.data.length) {
        return self.$Message.warning(self.vmI18n.t('modalTips.j4')); // 至少保留一条明细,不允许全部删除
      }

      if (self.$route.params.customizedModuleId === 'New' || self.copyId) {

        // 新增的请求方式
        if (self.tableConfig.data.length == self.delTableData.length) self.tableConfig.data = [];
        // 删除明细
        self.delTableData.forEach(item => {
          if (self.isIn(item.proId, self.tableConfig.data) >= 0) {
            self.tableConfig.data.splice(self.isIn(item.proId, self.tableConfig.data), 1);
          }
        });
        const total = self.tableConfig.data.reduce((sum, item) => sum + Number(item.returnPrice || 0), 0);
        self.delTableData = [];
      } else {
        // 编辑状态,删除明细
        this.$Modal.fcError({
          title: self.vmI18n.t('modalTitle.deleteDetails'), // 删除明细
          content: self.vmI18n.t('modalTips.j5'), // 确定删除所选明细?
          onOk: () => {
            const data = {};
            const arr = [];
            data.AfSendID = self.$route.params.customizedModuleId;
            self.delTableData.forEach(item => {
              arr.push(item.ID);
            });
            data.AfSendItemIds = arr;
            this.service.orderCenter.deleteAfterDeliverItem(data).then(res => {
              console.log(res);
              if (res.data.code == 0) {
                self.$Message.success(res.data.message);
                self.query();
              } else {
                self.$Message.error(res.data.message);
              }
            });
          }
        });
      }
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


    // 复制
    copy() {
      const copyId = this.$route.params.customizedModuleId;
      comUtils.tabCloseAppoint(this);
      R3.store.commit('global/tabOpen', {
        type: 'S',
        tableName: 'OC_B_RETURN_AF_SEND_MANUAL',
        tableId: 249230545
      });
      this.$nextTick(()=>{
        this.$store.commit('customize/TabOpen', {
          id: copyId,
          type: 'action',
          name: 'EXTRAREFUND',
          label: '额外退款编辑',
          query: Object.assign({
            id: copyId,
            tabTitle: '额外退款编辑',
            copyId: copyId
          }),
        });
      })
      this.$destroy();
    },
    // 获取详情
    query() {
      const self = this;
      const ID = self.$route.params.customizedModuleId;
      const query = { ID: ID === 'New' ? '-1' : ID };
      self.service.orderCenter.copyAfterDeliver(query).then(res => {
        console.log(res);
        if (res.data.code == 0) {
          const resData = res.data.data;
          const AfSend = resData.AfSend;
          self.setDetailTable(resData.AfSendItemList);
          self.tableConfig.data = resData.AfSendItemList;
          self.tableConfig.current = resData.AfSendItemList.length;
          self.tableConfig.total = resData.AfSendItemList.length;
          self.setDetailForm(AfSend);
        } else {
          self.$Message.error(res.data.message);
        }
      });
    },
    setDetailForm(Afsend) {
      // 非复制
      if(!this.copyId) {
        this.PAYMENT_STATUS = Afsend.PAYMENT_STATUS; // 打款状态
        this.btnConfig.buttons.forEach(item => {
          item.disabled = false
          // 打款状态:0 未打款 1 打款中 2 打款成功 3 打款失败
          // 单据状态：未退款", 0 "退款中", 1 "退款完成", 2 "取消", 3 "待审核", 4
          // ("待打款", 0),("打款中", 1),("打款成功", 2),("打款失败", 3),("拒绝打款", 4),("待审核", 5),("待审批", 6),("取消", 7);
          if ((Afsend.PAYMENT_STATUS == 3) && (item.text === '保存' || item.text === '审核' || item.text === '复制')) item.disabled = true
          if ((Afsend.PAYMENT_STATUS == 5) && (item.text === '打款失败复审')) item.disabled = true
          if ((Afsend.PAYMENT_STATUS != 3 && Afsend.PAYMENT_STATUS != 5) && (item.text !== '返回')) item.disabled = true
        })
        // 打款失败只允许修改收款人姓名&账号
        if (Afsend.PAYMENT_STATUS == 3 || Afsend.PAYMENT_STATUS != 5) {
          this.isDisabled = true
          this.imageUploadConfig.readonly = true
          this.information.formData.forEach(item => {
            item.disabled = true
          })
          this.returnInfo.formData.forEach(item => {
            if(item.style === 'popInput') item.itemdata.readonly = true
            if(Afsend.PAYMENT_STATUS == 3) {
              if (item.value !== 'RECEIVER_NAME'&& item.value !== 'PAY_ACCOUNT') item.disabled = true
            } else {
              item.disabled = true
            }
          })
        }

        this.payInfo.formValue = {
          PAYMENT_STATUS: Afsend.PAYMENT_STATUS == 0 ? '待打款' : Afsend.PAYMENT_STATUS == 1 ? '打款中' :  Afsend.PAYMENT_STATUS == 2 ? '打款成功' : Afsend.PAYMENT_STATUS == 3 ? '打款失败' : Afsend.PAYMENT_STATUS == 4 ? '拒绝打款' : Afsend.PAYMENT_STATUS == 5 ? '待审核' : Afsend.PAYMENT_STATUS == 6 ? '待审批' : '取消',
          MODIFIERENAME: Afsend.PAYMENT_STATUS == 2 || Afsend.PAYMENT_STATUS == 3 || Afsend.PAYMENT_STATUS == 4 ? Afsend.MODIFIERENAME : '',
          PAYMENT_FAIL_REASON: Afsend.PAYMENT_STATUS == 2 ? Afsend.PAYMENT_FAIL_REASON : '', // 打款成功 显示
          PAYMENT_FAIL_REASON1: Afsend.PAYMENT_STATUS == 3 || Afsend.PAYMENT_STATUS == 4 ? Afsend.PAYMENT_FAIL_REASON : '' // 打款失败/拒绝打款 显示
        }
      }
      // 申请单据信息
      this.information.formValue = {
        BILL_NO: !this.copyId ? Afsend.BILL_NO : '', // 额外退款单号码
        CREATIONDATE: !this.copyId ? Afsend.CREATIONDATE && commonUtil.dateFormat(new Date(Afsend.CREATIONDATE), 'yyyy-MM-dd hh:mm:ss') : '', // 创建时间
        OWNERENAME: !this.copyId ? Afsend.OWNERENAME : '', // 创建人
        REFUND_ORDER_SOURCE_TYPE: Afsend.REFUND_ORDER_SOURCE_TYPE + '', // 单据来源
        RESERVE_VARCHAR01: Afsend.RESERVE_VARCHAR01, // R3单据编号
        RESERVE_BIGINT04: Afsend.RESERVE_BIGINT04 + '', // 紧急程度
        TID: Afsend.TID, // 原始平台单号
        SOURCE_BILL_TIME: Afsend.SOURCE_BILL_TIME && commonUtil.dateFormat(new Date(Afsend.SOURCE_BILL_TIME), 'yyyy-MM-dd hh:mm:ss'), // R3单据创建日期
        CP_C_SHOP_TITLE: Afsend.CP_C_SHOP_TITLE, // 店铺名称
        CP_C_SHOP_ECODE: Afsend.CP_C_SHOP_ECODE, // 店铺编码
        CP_C_SHOP_ID: Afsend.CP_C_SHOP_ID, // 店铺id
        VIP_NICK: Afsend.VIP_NICK, // 买家昵称
        VIP_PHONE: Afsend.VIP_PHONE, // 买家手机号
        BPM_FAILURE_TIMES: !this.copyId ? Afsend.BPM_FAILURE_TIMES : '', // BPM传输失败次数
      }
      // 申请退款信息
      this.returnInfo.formValue = {
        RESERVE_BIGINT01: Afsend.RESERVE_BIGINT01 + '', // 额外退款申请类型
        BILL_TYPE: Afsend.BILL_TYPE + '', // 退款类型
        OC_B_RETURN_TYPE_ID: Afsend.OC_B_RETURN_TYPE_ID, // 退货大类id
        OC_B_RETURN_TYPE_ENAME: Afsend.OC_B_RETURN_TYPE_ENAME, // 退货大类name
        OC_B_RETURN_TYPE_ITEM_ID: Afsend.OC_B_RETURN_TYPE_ITEM_ID, // 退款小类
        PAY_MODE: Afsend.PAY_MODE, // 支付方式
        RECEIVER_NAME: Afsend.RECEIVER_NAME, // 收款人姓名
        PAY_ACCOUNT: Afsend.PAY_ACCOUNT, // 收款人账号
        AMT_RETURN_APPLY: Afsend.AMT_RETURN_APPLY, // 额外退款金额
        RESERVE_BIGINT02: Afsend.RESERVE_BIGINT02 + '', // 退货签收状态 0未签收,1已签收
        PRO_RETURN_STATUS: Afsend.PRO_RETURN_STATUS + '', // 退货入库状态 0待入库,1部分入库,2全部入库
        RESERVE_VARCHAR02: Afsend.RESERVE_VARCHAR02, // 退货物流单号
        RESERVE_BIGINT03: Afsend.RESERVE_BIGINT03, // 支付宝累计打款次数
        REASON: Afsend.REASON, // 退款原因备注说明
        SELLER_REMARK: !this.copyId ? Afsend.SELLER_REMARK : '', // 卖家备注
      }
      if (Afsend.OC_B_RETURN_TYPE_ENAME == '退货' && Afsend.PAYMENT_STATUS == 5) {
        this.returnInfo.formData.forEach(item => {
          if (item.value == 'RESERVE_BIGINT02') item.disabled = false
          if (item.value == 'PRO_RETURN_STATUS') item.disabled = false
          if (item.value == 'RESERVE_VARCHAR02') item.disabled = false
        })
      } else {
        this.returnInfo.formData.forEach(item => {
          if (item.value == 'RESERVE_BIGINT02') item.disabled = true
          if (item.value == 'PRO_RETURN_STATUS') item.disabled = true
          if (item.value == 'RESERVE_VARCHAR02') item.disabled = true
        })
      }
      if (Afsend.OC_B_RETURN_TYPE_ENAME && Afsend.OC_B_RETURN_TYPE_ID) {
        this.returnInfo.formData.forEach(item => {
          if (item.style == 'popInput') {
            item.itemdata.pid = Afsend.OC_B_RETURN_TYPE_ID
            item.itemdata.valuedata = Afsend.OC_B_RETURN_TYPE_ENAME
            this.returnTypeChange();
          }
        })
      }
      this.onSelectData.ID = Afsend.SOURCE_BILL_NO;
      this.imageUploadConfig.valuedata = Afsend.IMAGE ? JSON.parse(Afsend.IMAGE) : [];
      this.IMAGE = this.imageUploadConfig.valuedata;

    },
    setDetailTable(data) {
      const self = this;
      data.forEach(item => {
        item.price = item.AMT_ACTUAL; // 成交金额
        item.RETURNABLE_AMOUNT = item.AMT_HAS_RETURN; // 可退金额
        item.returnPrice = item.AMT_RETURN; // 退款金额
        item.ecode = item.PS_C_PRO_ECODE; // 商品编码
        item.proEname = item.PS_C_PRO_ENAME; // 商品名称
        item.PS_C_SKU_PT_ECODE = item.PS_C_SKU_PT_ECODE; // 平台商品编码
        item.PT_PRO_NAME = item.PT_PRO_NAME; // 平台商品名称

        item.skuEcode = item.PS_C_SKU_ECODE; // 商品条码
        item.skuSpec = item.PS_C_SPEC_ENAME; // 商品规格
        item.qty = item.PURCHASE_QTY; // 购买数量
        item.BILL_NO = item.RELATION_BILL_NO; // 单据编号
        item.BILL_TYPE = item.BILL_TYPE == 0 ? '退货单' : '发货单';
        item.realAmt = item.AMT_ACTUAL; // 成交金额
        if (self.copyId) {
          // 如果为复制状态订单,修改明细id为原订单id
          item.ID = item.RELATION_BILL_ITEM_ID;
        }
      });
    },

    // 图片上传成功
    uploadFileChangeSuccess(res) {
      const self = this;
      self.imageUploadConfig.valuedata.push({
        name: res.data.Name,
        URL: res.data.Url
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


    threeObjs() {
      const _this = this;
      _this.order.orderform.formData.forEach(item => {
        // 店铺名称
        if (item && item.itemdata && item.itemdata.name === _this.vmI18n.t('table_label.shopName')) {
          this.order.orderform.formValue.cp_c_store_id = item.itemdata.pid;
          this.order.orderform.formValue.cp_c_store_ename = item.itemdata.valuedata;
        }
      });
    },

    // 退款小类联动查询退描述
    returnTypeChange() {
      const self = this;
      const formdata = new FormData();
      formdata.append('table', 'OC_B_RETURN_TYPE_ITEM');
      formdata.append('objid', this.returnInfo.formValue.OC_B_RETURN_TYPE_ID);
      formdata.append('refcolid', 1700815960);
      formdata.append(
        'searchdata',
        JSON.stringify({
          column_include_uicontroller: true,
          startindex: 0,
          fixedcolumns: {}
        })
      );
      this.returnInfo.formData.forEach(item => {
        if (item.value == 'OC_B_RETURN_TYPE_ITEM_ID') item.options = []
      })
      this.service.orderCenter.objectTableItem(formdata).then(res => {
        const resData = res.data;
        if (resData.code === 0) {
          const row = resData.datas.row || [];
          this.returnInfo.formData.forEach(item => {
            if (item.value == 'OC_B_RETURN_TYPE_ITEM_ID') {
              item.options = row.map(item => ({
                label: item.ENAME.val,
                value: Number(item.ID.val)
              }));
            }
          })
        } else {
          this.$Message.error(self.vmI18n.t('modalTips.j6')); // 退款描述请求失败
        }
      });
    },
  }
};
