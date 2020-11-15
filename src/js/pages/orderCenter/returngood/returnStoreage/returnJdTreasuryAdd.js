import axios from 'axios';
import businessButton from 'professionalComponents/businessActionTable';
import businessForm from 'professionalComponents/businessForm';
import businessLabel from 'professionalComponents/businessLabel';
import businessActionTable from 'professionalComponents/businessActionTable';
import businessStatusFlag from 'professionalComponents/businessStatusFlag';
import OrderItem from '@/views/pages/OrderCenter/orderManageDetail/details/orderItem.vue';
import { buttonPermissionsMixin } from '@/assets/js/mixins/buttonPermissions';
import { dataAccessMixin } from '@/assets/js//mixins/dataAccess';

export default {
  components: {
    businessButton,
    businessForm,
    businessActionTable,
    OrderItem,
    businessLabel,
    businessStatusFlag
  },
  mixins: [buttonPermissionsMixin, dataAccessMixin],
  data() {
    return {
      isSaveLoading: false,
      openDefault: [1], // 默认展开
      returnSelectData: [], // 列表选中数据
      DefaultValue: '1', // tab切换样式
      isDisabled: false, // 编辑时不可修改
      isFlag: false, // 特殊类型为正常时不可修改
      order: {
        modal: false,
        btn: {
          typeAll: 'error', // 按钮统一风格样式
          buttons: [
            {
              type: '', // 按钮类型
              text: '查找', // 按钮文本
              icon: '', // 按钮图标
              size: '', // 按钮大小
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
            tag: 1
          },
          formData: [
            {
              style: 'input',
              label: '物流编号',
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
            },
            {
              style: 'input',
              label: '收货人',
              value: 'receive_name',
              width: '8',
              inputenter: () => this.queryBounced()
            },
            {
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
              title: '退换货单号'
            },
            {
              key: 'ORIG_ORDER_NO',
              title: '原单单号',
            },
            {
              key: 'BUYER_NICK',
              title: '买家昵称'
            },
            {
              key: 'LOGISTICS_CODE',
              title: '物流单号'
            },
            {
              key: 'RECEIVE_NAME',
              title: '收货人'
            },
            {
              key: 'RECEIVE_MOBILE',
              title: '收货人手机号'
            },
            {
              key: 'shopName',
              title: '实体仓库'
            },
            {
              key: 'IS_ADD',
              title: '是否手工新增'
            },
            {
              key: 'CP_C_SHOP_TITLE',
              title: '店铺名称'
            }
          ], // 表头
          data: [], // 数据配置
          indexColumn: true, // 是否显示序号
          height: '300',
          loading: false,
          isShowSelection: true // 是否显示checkedbox
        },
        value: ''
      }, // 查询退单数据
      onSelectData: [], // 选中的原始订单编号
      btnConfig: {
        typeAll: 'error', // 按钮统一风格样式
        buttons: [
        ]
      }, // 按钮
      information: {
        formValue: {
          // 存储表单得所有值
          ORIG_ORDER_NO: '', // 原单单号
          SOURCE_CODE: '', // 平台单号
          USER_NICK: '', // 买家昵称
          OC_B_REFUND_BATCH_ID: '', // 退货批次id
          BATCH_NO: '', // 退货批次编码
          IN_STORE_ID: '', // 入库仓库id
          IN_STORE_ENAME: '', // 入库仓库
          LOGISTIC_NUMBER: '', // 物流单号
          RECEIVER_MOBILE: '', // 手机号
          RECEIVER_NAME: '', // 姓名
          SPECIAL_TYPE: '', // 特殊处理类型
          REMARK: '', // 备注
          RECEIVER_ADDRESS: '', // 发件地址
          DEAL_PEOPLE: '', // 处理人
          DEAL_REMARK: '', // 处理人备注
          IS_OFF_MATCH: false
        },
        // 表单非空提示
        ruleValidate: {
          ORIG_ORDER_NO: [{ required: true, message: ' ', trigger: 'blur' }],
          OC_B_REFUND_BATCH_ID: [
            { required: true, message: ' ', trigger: 'blur' }
          ],
          SPECIAL_TYPE: [{ required: true, message: ' ', trigger: 'blur' }]
        },
        formData: [
          {
            style: 'input', // 输入框类型
            label: '原单单号', // 输入框前文字
            value: 'ORIG_ORDER_NO', // 输入框的值
            width: '6', // 所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
            icon: 'ios-search', // 输入框后带的图标,暂只有输入框支持
            placeholder: '', // 占位文本，默认为请输入
            dataAcessKey: 'ORIG_ORDER_NO',
            disabled: false, // 按钮禁用控制
            readonly: true, // 按钮禁用控制
            ghost: false, // 是否关闭幽灵按钮，默认开启
            iconclick: () => {
              if (this.isDisabled) return;
              this.onSelectData = [];
              this.order.orderform.formValue = {};
              this.order.table.data = [];
              if (this.$route.query.id == '-1') {
                this.order.modal = true;
              }
            } // 点击icon图标事件
          },
          {
            style: 'input',
            label: '买家昵称',
            disabled: false, // 按钮禁用控制
            value: 'USER_NICK',
            dataAcessKey: 'USER_NICK',
            width: '6'
          },
          {
            style: 'select', // 下拉框类型
            label: '退货批次', // 下拉框前的值
            width: '6', // 所占宽度宽度
            value: 'OC_B_REFUND_BATCH_ID',
            dataAcessKey: 'OC_B_REFUND_BATCH_ID',
            disabled: false, // 按钮禁用控制
            options: [],
            selectChange: () => {
              this.sleectBatch();
            }
          },
          {
            style: 'input', // 下拉框类型
            label: '入库仓库', // 下拉框前的值
            width: '6', // 所占宽度宽度
            disabled: true, // 按钮禁用控制
            value: 'IN_STORE_ENAME',
            dataAcessKey: 'IN_STORE_ENAME'
          },
          {
            style: 'popInput',
            width: '6',
            dataAcessKey: 'CP_C_LOGISTICS_ENAME',
            itemdata: {
              col: 1,
              // colid: 170504,
              colid: 168212,
              colname: 'CP_C_LOGISTICS_ID',
              datelimit: 'all',
              display: 'text',
              fkdesc: '物流公司',
              fkdisplay: 'drp',
              inputname: 'CP_C_LOGISTICS_ID:ENAME',
              isfk: true,
              isnotnull: false,
              isuppercase: false,
              length: 20,
              name: '物流公司',
              readonly: false,
              reftable: 'CP_C_LOGISTICS',
              // reftableid: 24633,
              reftableid: 24411,
              row: 1,
              scale: 0,
              statsize: -1,
              type: 'NUMBER'
            },
            oneObj: (e) => {
              this.oneObjs(e);
            }
          },
          {
            style: 'input',
            dataAcessKey: 'LOGISTIC_NUMBER',
            label: '物流单号',
            value: 'LOGISTIC_NUMBER',
            disabled: false, // 按钮禁用控制
            width: '6'
          },
          {
            style: 'input',
            label: '收货人手机',
            dataAcessKey: 'RECEIVER_MOBILE',
            value: 'RECEIVER_MOBILE',
            disabled: false, // 按钮禁用控制
            width: '6'
          },
          {
            style: 'input',
            label: '收货人姓名',
            dataAcessKey: 'RECEIVER_NAME',
            value: 'RECEIVER_NAME',
            disabled: false, // 按钮禁用控制
            width: '6'
          },
          // {
          //   style: "select", //下拉框类型
          //   dataAcessKey: "SPECIAL_TYPE",
          //   label: "特殊处理类型", //下拉框前的值
          //   width: "6", //所占宽度宽度
          //   value: "SPECIAL_TYPE",
          //   disabled: false, //按钮禁用控制
          //   options: [],
          //   selectChange: () => {
          //     this.selectSpecialType();
          //   }
          // },
          {
            style: 'input',
            label: '发件地址',
            dataAcessKey: 'RECEIVER_ADDRESS',
            disabled: false, // 按钮禁用控制
            value: 'RECEIVER_ADDRESS',
            width: '6'
          },
          {
            style: 'input',
            label: '备注',
            dataAcessKey: 'REMARK',
            value: 'REMARK',
            disabled: false, // 按钮禁用控制
            width: '12'
          },
          {
            style: 'checkbox', // 勾选框类型
            label: '是否关闭匹配', // 前面的文字
            dataAcessKey: 'IS_OFF_MATCH',
            width: '6', // 所占的宽度
            value: 'IS_OFF_MATCH',
            checked: false // 是否勾选控制
          }
        ]
      }, // 基本信息
      jordanTableConfig: {
        jordanFormConfig: {}, // 表单配置
        columns: [
          {
            key: 'PS_C_PRO_ECODE',
            dataAcessKey: 'PS_C_PRO_ECODE',
            title: '商品编码'
          },
          {
            key: 'PS_C_CLR_ENAME',
            dataAcessKey: 'PS_C_CLR_ENAME',
            title: '颜色'
          },
          {
            key: 'PS_C_SIZE_ENAME',
            dataAcessKey: 'PS_C_SIZE_ENAME',
            title: '尺码'
          },
          {
            key: 'QTY',
            dataAcessKey: 'QTY',
            title: '数量'
          },
          {
            key: 'PS_C_SKU_ECODE',
            dataAcessKey: 'PS_C_SKU_ECODE',
            title: '条码'
          },
          {
            key: 'GBCODE',
            dataAcessKey: 'GBCODE',
            title: '国标码'
          },
          {
            key: 'OC_B_JD_RETURN_ORDER_ID',
            dataAcessKey: 'OC_B_JD_RETURN_ORDER_ID',
            title: '退单编号'
          },
          {
            key: 'REAL_SEND_SKU',
            title: '实际发出条码'
          },
          {
            key: 'REAL_SKU_ECODE',
            dataAcessKey: 'REAL_SKU_ECODE',
            title: '实收条码',
            render: (h, params) => {
              const pageShow = [];
              const _this = this;
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
                    style: {
                      width: '100%',
                      height: '100%',
                      display: params.row.Flag1 ? 'none' : 'block'
                    },
                    props: {
                      value: params.row.REAL_SKU_ECODE
                    },
                    on: {
                      'on-enter': (e) => {
                        // 修改行数据
                        if (e.target.value) {
                          axios({
                            url: '/api/cs/oc/oms/v1/getOneRefundItem',
                            method: 'post',
                            cancelToken: true,
                            data: { PS_C_SKU_ECODE: e.target.value }
                          }).then((res) => {
                            if (res.data.code == 0) {
                              params.row.Flag1 = true;
                              _this.jordanTableConfig.data[
                                params.index
                              ].REAL_SKU_ECODE = e.target.value;
                              params.row.REAL_SKU_ECODE = e.target.value;
                            } else {
                              const err = res.data.message
                                || '本地条码档案中不存在此条码，请检查后重试!';
                              _this.$Message.error(err);
                            }
                          });
                        } else {
                          params.row.Flag1 = true;
                        }
                      }
                    }
                  }),
                  h(
                    'span',
                    {
                      style: {
                        minWidth: '150px',
                        height: '16px',
                        display: params.row.Flag1 ? 'block' : 'none'
                      },
                      on: {
                        dblclick: (data) => {
                          if (!_this.isFlag) return;
                          if (_this.$route.query.id == -1) params.row.Flag1 = false;
                        }
                      }
                    },
                    params.row.REAL_SKU_ECODE
                  )
                ]
              );
            }
          },
          {
            key: 'GBCODE_ACTUAL',
            dataAcessKey: 'GBCODE_ACTUAL',
            title: '实收国标码'
          },
          {
            key: 'PS_C_PRO_ENAME',
            dataAcessKey: 'PS_C_PRO_ENAME',
            title: '商品名称'
          },
          {
            key: 'PRODUCT_MARK',
            dataAcessKey: 'PRODUCT_MARK',
            title: '商品标记',
            render: (h, params) => {
              const _this = this;
              const list = [
                {
                  SPEC: '正品'
                },
                {
                  SPEC: '次品'
                }
              ];
              return h(
                'Select',
                {
                  style: {
                    width: '150px'
                  },
                  props: {
                    value: params.row.PRODUCT_MARK, // 结算方式
                    transfer: true
                  },
                  on: {
                    'on-change': (value) => {
                      _this.jordanTableConfig.data[
                        params.index
                      ].PRODUCT_MARK = value;
                    }
                  }
                },
                list.map(item => h('Option', {
                  props: {
                    value: item.SPEC,
                    label: item.SPEC
                  }
                }))
              );
            }
          },
          {
            key: 'IS_MATCH',
            dataAcessKey: 'IS_MATCH',
            title: '是否匹配'
          },
          {
            key: 'IS_GEN_ADJUST',
            dataAcessKey: 'IS_GEN_ADJUST',
            title: '是否生成调整单'
          },
          {
            key: 'IS_WITHOUT_ORIG',
            dataAcessKey: 'IS_WITHOUT_ORIG',
            title: '是否无原单条码'
          },
          {
            key: ' IS_GEN_IN_ORDER',
            dataAcessKey: ' IS_GEN_IN_ORDER',
            title: '是否生成入库单'
          },
          {
            key: 'IS_GEN_WRO_ADJUST',
            dataAcessKey: 'IS_GEN_WRO_ADJUST',
            title: '是否生成错发调整单'
          },
          {
            key: 'IS_GEN_MINUS_ADJUST',
            dataAcessKey: 'IS_GEN_MINUS_ADJUST',
            title: '是否生成冲无头件调整单'
          }
        ],
        data: [], // 数据配置
        pageShow: false, // 控制分页是否显示
        loading: false,
        height: 280, // 表格高度
        isShowDeleteDetailBtn: false, // 控制是否显示删除明细
        isShowImportBtn: false, // 控制是否显示导入
        isShowExportBtn: false, // 控制是否显示导出
        indexColumn: true, // 是否显示序号
        isShowSelection: true, // 是否显示checkedbox
        width: '', // 表格宽度
        border: true, // 是否显示纵向边框
        total: 0, // 设置总条数
        pageSizeOpts: [15, 30, 45, 60], // 每页条数切换的配置
        pageSize: 15 // 每页条数
      }, // 明细
      labelList: [
        {
          label: '入库单商品明细',
          value: '1',
          isShow: true
        },
        {
          label: '退货入库日志',
          value: '2',
          isShow: true
        }
      ],
      optionsData: [], // 退货批次数据
      ID: '', // 主表id
      statusName: '', // 展示作废水印,通过状态显示什么水印
      labelDefaultValue: true, // 是否显示日志
      tab2: {
        tablename: '',
        objid: ''
      },
      isMatch: '' // 是否关闭匹配
    };
  },
  mounted() {
    this.$nextTick(() => {
      if (this.$route.query.id === '-1') {
        this.btnConfig.buttons = [
          {
            text: '保存', // 按钮文本
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              this.saveData();
            } // 按钮点击事件
          },
          {
            text: '返回', // 按钮文本
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              this.$store.commit('customize/TabHref', {
                id: 249130284,
                type: 'table',
                name: 'OC_B_JD_REFUND_IN',
                label: '京东退货入库',
                back: true,
                query: Object.assign({
                  id: 249130284,
                  tabTitle: '京东退货入库'
                }),
              });
            } // 按钮点击事件
          }
        ];
      } else {
        this.btnConfig.buttons = [
          {
            text: '保存', // 按钮文本
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              this.saveData();
            } // 按钮点击事件
          },
          {
            text: '手工匹配', // 按钮文本
            isShow: '',
            disabled: false, // 按钮禁用控制
            btnclick: async () => {
              const _this = this;
              if (_this.isMatch == 1) {
                return _this.$Message.error(
                  '此退货入库单已经关闭匹配，不允许选择!'
                );
              }
              if (_this.$route.query.id == -1) return;
              const res = await _this.service.common.manualJdMatchingCheck({ id: _this.$route.query.id });
              if (res.data.code === 0) {
                _this.$store.commit('customize/TabHref', {
                  id: _this.$route.query.id, // id
                  type: 'action', // 类型action
                  name: 'jdManualMatching', // 文件名
                  label: '退货入库-手工匹配', // tab中文名
                  query: Object.assign({
                    id: _this.$route.query.id, // id
                    tabTitle: '退货入库-手工匹配', // tab中文名
                    source: 2,
                    statusName: this.$route.query.statusName,
                    form: 'single'
                  }) // 带的参数
                });
              } else {
                const mes = res.data.message || '此单据不可进行手工匹配操作！';
                _this.$Message.error(mes);
              }
            } // 按钮点击事件
          },
          {
            text: '错发强制匹配',
            disabled: false,
            btnclick: async () => {
              const _this = this;
              if (_this.isMatch == 1) {
                return _this.$Message.error(
                  '此退货入库单已经关闭匹配，不允许选择!'
                );
              }
              if (_this.$route.query.id == -1) return;
              const res = await _this.service.common.manualJdMatchingCheck({ id: _this.$route.query.id });
              if (res.data.code === 0) {
                _this.$store.commit('customize/TabHref', {
                  id: _this.$route.query.id, // id
                  type: 'action', // 类型action
                  name: 'jdManualMatching', // 文件名
                  label: '退货入库-错发强制匹配', // tab中文名
                  query: Object.assign({
                    id: _this.$route.query.id, // id
                    tabTitle: '退货入库-错发强制匹配', // tab中文名
                    source: 3,
                    statusName: this.$route.query.statusName,
                    form: 'single'
                  }) // 带的参数
                });
              } else {
                const mes = res.data.message || '此单据不可进行错发强制匹配操作！';
                _this.$Message.error(mes);
              }
            } // 按钮点击事件
          },
          // {
          //   // ========================================暂时影藏
          //   text: "作废", //按钮文本
          //   isShow: false,
          //   disabled: false, //按钮禁用控制
          //   btnclick: () => {
          //     if (this.$route.query.id == -1) return;
          //     axios({
          //       url: "/api/cs/oc/oms/v1/returnCancel",
          //       method: "post",
          //       data: { ids: [this.$route.query.id] }
          //     }).then(res => {
          //       if (res.data.code === 0) {
          //         let mes = res.data.message || "作废操作成功";
          //         this.$Message.success(mes);
          //       } else {
          //         let mes = res.data.message || "作废操作失败";
          //         this.$Message.error(mes);
          //       }
          //     });
          //   } //按钮点击事件
          // },
          {
            text: '返回', // 按钮文本
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              this.$store.commit('customize/TabHref', {
                id: 249130284,
                type: 'table',
                name: 'OC_B_JD_REFUND_IN',
                label: '京东退货入库',
                back: true,
                query: Object.assign({
                  id: 249130284,
                  tabTitle: '京东退货入库'
                }),
              });
            } // 按钮点击事件
          }
        ];
      }
      // this.getPermissions("btnConfig", "returnStoreageList");
    });
    // 判断是新增还是修改
    if (this.$route.query.id == '-1') {
      this.information.formValue.SPECIAL_TYPE = '0';
      this.btnConfig.buttons.forEach((item) => {
        switch (item.text) {
          case '手工匹配':
            item.isShow = false;
            break;
          case '错发强制匹配':
            item.isShow = false;
            break;
          case '作废':
            item.isShow = false;
            break;
        }
      });
      this.getReturnBatch();
    } else {
      this.getList();
      const isDis = this.information.formData;
      isDis[0].disabled = true;
      isDis[0].icon = '';
      isDis[1].disabled = true;
      isDis[2].disabled = true;
      isDis[3].disabled = true;
      isDis[4].itemdata.readonly = true;
      isDis[5].disabled = true;
      isDis[6].disabled = true;
      isDis[7].disabled = true;
      isDis[8].disabled = true;
      // isDis[11].disabled = true;
      isDis.forEach((item, index) => {
        if (item.label === '退货批次') {
          item.style = 'input';
          item.value = 'BATCH_NO';
        }
      });
      this.information.formData.push(
        {
          style: 'input',
          label: '处理人',
          disabled: false, // 按钮禁用控制
          dataAcessKey: 'DEAL_PEOPLE',
          value: 'DEAL_PEOPLE',
          width: '6'
        },
        {
          style: 'input',
          label: '处理人备注',
          dataAcessKey: 'DEAL_REMARK',
          disabled: false, // 按钮禁用控制
          value: 'DEAL_REMARK',
          width: '6'
        },
        {
          style: 'input',
          label: '入库单单号',
          dataAcessKey: 'ID',
          disabled: true, // 按钮禁用控制
          value: 'ID',
          width: '6'
        },
        {
          style: 'input',
          label: '下单店铺',
          dataAcessKey: 'CP_C_SHOP_TITLE',
          disabled: true, // 按钮禁用控制
          value: 'CP_C_SHOP_TITLE',
          width: '6'
        }
      );
    }


    this.$nextTick(() => {
      this.getDataAccess('OC_B_JD_REFUND_IN', (res) => {
        this.information.formData.forEach((parent, parentIndex) => {
          res.SENSITIVE_COLUMNS.forEach((child, childIndex) => {
            if (parent.dataAcessKey == child.ecode) {
              if (this.$route.query.id == '-1') {
                this.setFormPermissions(parent, child, 'add');
              } else {
                this.setFormPermissions(parent, child, 'detail');
              }
            }
          });
        });
        // 退货入库-表格

        this.jordanTableConfig.columns = this.setTablePermissions(this.jordanTableConfig.columns, res);
      });
    });
    this.setTableHeight();
    // this.obtainWarehouse();
  },
  methods: {
    // 保存
    async saveData() {
      const _this = this;
      const item = this.information.formValue;
      if (!item.OC_B_REFUND_BATCH_ID) {
        this.$Message.warning('退货批次必填！');
        return;
      }
      if (!item.SPECIAL_TYPE) {
        this.$Message.warning('特殊处理类型必填！');
        return;
      }
      if (!this.jordanTableConfig.data.length) {
        this.$Message.warning('退货入库明细不能为空！');
        return;
      }
      const dataArr = JSON.parse(JSON.stringify(this.jordanTableConfig.data));
      dataArr.forEach((item) => {
        // 商品标记
        if (item.PRODUCT_MARK == '正品') item.PRODUCT_MARK = 1;
        if (item.PRODUCT_MARK == '次品') item.PRODUCT_MARK = 0;
        // 是否无原单条码
        if (item.IS_WITHOUT_ORIG == '是') item.IS_WITHOUT_ORIG = 1;
        else if (item.IS_WITHOUT_ORIG == '否') item.IS_WITHOUT_ORIG = 0;
        // 是否匹配
        if (item.IS_MATCH == '是') item.IS_MATCH = 1;
        else if (item.IS_MATCH == '否') item.IS_MATCH = 0;
        // 是否生成调整单
        if (item.IS_GEN_ADJUST == '是') item.IS_GEN_ADJUST = 1;
        else if (item.IS_GEN_ADJUST == '否') item.IS_GEN_ADJUST = 0;
        if (item.IS_GEN_IN_ORDER == '是') item.IS_GEN_IN_ORDER = 1;
        else if (item.IS_GEN_IN_ORDER == '否') item.IS_GEN_IN_ORDER = 0;
        if (item.IS_GEN_WRO_ADJUST == '是') item.IS_GEN_WRO_ADJUST = 1;
        else if (item.IS_GEN_WRO_ADJUST == '否') item.IS_GEN_WRO_ADJUST = 0;
        if (item.IS_GEN_MINUS_ADJUST == '是') item.IS_GEN_MINUS_ADJUST = 1;
        else if (item.IS_GEN_MINUS_ADJUST == '否') item.IS_GEN_MINUS_ADJUST = 0;
      });
      console.log(this.jordanTableConfig.data);
      const params = {
        ocBJdRefundInProductItem: dataArr, // 退货入库明细
        OcBJdRefundIn: {
          ORIG_ORDER_NO: item.ORIG_ORDER_NO, // 原单单号
          SOURCE_CODE: item.SOURCE_CODE, // 平台单号
          USER_NICK: item.USER_NICK, // 买家昵称
          RECEIVE_PHONE: item.RECEIVE_PHONE, // 电话
          OC_B_REFUND_BATCH_ID: item.OC_B_REFUND_BATCH_ID, // 退货批次id
          IN_STORE_ECODE: item.IN_STORE_ECODE, // 入库店仓
          IN_STORE_ENAME: item.IN_STORE_ENAME,
          IN_STORE_ID: item.IN_STORE_ID, // 入库店仓
          CP_C_LOGISTICS_ENAME: item.CP_C_LOGISTICS_ENAME, // 物流公司
          CP_C_LOGISTICS_ID: item.CP_C_LOGISTICS_ID, // 物流id
          LOGISTIC_NUMBER: item.LOGISTIC_NUMBER, // 物流单号
          RECEIVER_MOBILE: item.RECEIVER_MOBILE, // 手机号
          RECEIVER_NAME: item.RECEIVER_NAME, // 收货人姓名
          SPECIAL_TYPE: item.SPECIAL_TYPE, // 特殊处理类型
          REMARK: item.REMARK, // 备注
          RECEIVER_ADDRESS: item.RECEIVER_ADDRESS, // 发件地址
          DEAL_PEOPLE: item.DEAL_PEOPLE,
          DEAL_REMARK: item.DEAL_REMARK,
          IS_OFF_MATCH: item.IS_OFF_MATCH ? 1 : 0
        }, // 退货入库主表数据
        ID: this.ID
      };
      if (this.$route.query.id != '-1') params.ocBJdRefundIn.ID = item.ID; // 修改时传主表ID
      _this.isSaveLoading = true;
      const res = await this.service.common.jdReturnStorageSave(params);
      if (res.data.code === 0) {
        _this.isSaveLoading = false;
        this.$store.commit('customize/TabHref', {
          id: 249130284,
          type: 'table',
          name: 'OC_B_JD_REFUND_IN',
          label: '京东退货入库',
          back: true,
          query: Object.assign({
            id: 249130284,
            tabTitle: '京东退货入库'
          })
        });
        this.$Message.success(res.data.message);
      } else {
        _this.isSaveLoading = false;
        this.$Message.error(res.data.message);
      }
    },
    // 获取详情
    async getList() {
      const _this = this;
      const res = await _this.service.common.manualJdMatchingList({ id: _this.$route.query.id });
      if (res.data.code === 0) {
        res.data.data.ocBJdRefundIn.IN_STORE_ENAME = res.data.data.ocBJdRefundIn.IN_STORE_ENAME;
        _this.information.formValue = res.data.data.ocBJdRefundIn;
        res.data.data.ocBJdRefundInProductItemList.forEach((item) => {
          item.Flag1 = true;
          // 商品标记
          if (item.PRODUCT_MARK == 1) item.PRODUCT_MARK = '正品';
          else if (item.PRODUCT_MARK == 0) item.PRODUCT_MARK = '次品';
          // 是否无原单条码
          if (item.IS_WITHOUT_ORIG == 1) item.IS_WITHOUT_ORIG = '是';
          else if (item.IS_WITHOUT_ORIG == 0) item.IS_WITHOUT_ORIG = '否';
          // 是否匹配
          if (item.IS_MATCH == 1) item.IS_MATCH = '是';
          else if (item.IS_MATCH == 0) item.IS_MATCH = '否';
          // 是否生成调整单
          if (item.IS_GEN_ADJUST == 1) item.IS_GEN_ADJUST = '是';
          else if (item.IS_GEN_ADJUST == 0) item.IS_GEN_ADJUST = '否';
          if (item.IS_GEN_IN_ORDER == 1) item.IS_GEN_IN_ORDER = '是';
          else if (item.IS_GEN_IN_ORDER == 0) item.IS_GEN_IN_ORDER = '否';
          if (item.IS_GEN_WRO_ADJUST == 1) item.IS_GEN_WRO_ADJUST = '是';
          else if (item.IS_GEN_WRO_ADJUST == 0) item.IS_GEN_WRO_ADJUST = '否';
          if (item.IS_GEN_MINUS_ADJUST == 1) item.IS_GEN_MINUS_ADJUST = '是';
          else if (item.IS_GEN_MINUS_ADJUST == 0) item.IS_GEN_MINUS_ADJUST = '否';
        });
        if (res.data.data.ocBJdRefundIn.MATCH_STATUS == 2) {
          _this.information.formData.forEach((item) => {
            if (item.label === '是否关闭匹配') item.disabled = true;
          });
        }
        _this.isMatch = res.data.data.ocBJdRefundIn.IS_OFF_MATCH;
        if (res.data.data.ocBJdRefundIn.IS_OFF_MATCH == 1) res.data.data.ocBJdRefundIn.IS_OFF_MATCH = true;
        else if (res.data.data.ocBJdRefundIn.IS_OFF_MATCH == 0) res.data.data.ocBJdRefundIn.IS_OFF_MATCH = false;
        if (res.data.data.ocBJdRefundIn.IN_STATUS == 3) {
          _this.statusName = _this.$route.query.statusName;
          _this.btnConfig.buttons[0].disabled = true;
          _this.btnConfig.buttons[1].disabled = true;
          _this.btnConfig.buttons[2].disabled = true;
        }
        // 物流公司
        _this.information.formValue.CP_C_LOGISTICS_ID = res.data.data.ocBJdRefundIn.CP_C_LOGISTICS_ID;
        _this.information.formValue.CP_C_LOGISTICS_ENAME = res.data.data.ocBJdRefundIn.CP_C_LOGISTICS_ENAME;
        _this.information.formData[4].itemdata.pid = res.data.data.ocBJdRefundIn.CP_C_LOGISTICS_ID;
        _this.information.formData[4].itemdata.valuedata = res.data.data.ocBJdRefundIn.CP_C_LOGISTICS_ENAME;
        // if (res.data.data.ocBOrder !== null)
        //   _this.information.formValue.CP_C_SHOP_TITLE =
        //     res.data.data.ocBOrder.CP_C_SHOP_TITLE;
        // document.getElementsByClassName("disabled")[0].value =
        //   res.data.data.ocBJdRefundIn.CP_C_LOGISTICS_ENAME;
        _this.information.formData[2].options = [
          {
            label: _this.information.formValue.BATCH_NO,
            value: _this.information.formValue.OC_B_REFUND_BATCH_ID
          }
        ];
        _this.jordanTableConfig.data = res.data.data.ocBJdRefundInProductItemList;
      }
    },
    // 获取特殊处理类型字段选项组
    // obtainWarehouse() {
    //   const _this = this;
    //   let fromdata = new FormData();
    //   fromdata.append("table", "OC_B_JD_REFUND_IN");
    //   fromdata.append("objid", -1);
    //   axios({
    //     url: "/p/cs/getObject",
    //     method: "post",
    //     data: fromdata
    //   }).then(res => {
    //     this.information.formData.forEach(value => {
    //       if (value.label === "特殊处理类型") {
    //         res.data.data.addcolums.forEach((item) => {
    //           if (item.parentdesc === '基本信息') {
    //             let childItem = item.childs;
    //             childItem.forEach((item) => {
    //               if (item.colname === 'SPECIAL_TYPE') {
    //                 for (let i = 0; i < item.combobox.length; i++) {
    //                   value.options.push({
    //                     value: item.combobox[i].limitval,
    //                     label: item.combobox[i].limitdesc
    //                   });
    //                 }
    //               }
    //             });
    //           }
    //         });
    //       }
    //     });
    //   });
    // },
    // 获取退货批次数据
    getReturnBatch() {
      const _this = this;
      axios({
        url: '/api/cs/oc/oms/v1/getCurrentBatch',
        method: 'post',
        data: {
          BATCH_TYPE: 3
        }
      }).then((res) => {
        if (res.data.code === 0) {
          _this.optionsData = res.data.data;
          const options = res.data.data;
          options.map((item) => {
            item.label = item.BATCH_NO;
            item.value = item.ID;
          });
          _this.information.formData[2].options = options;
        } else {
          _this.$Message.warning(res.data.message);
        }
      });
    },
    // 选择退货批次
    sleectBatch() {
      this.optionsData.forEach((item) => {
        if (item.ID == this.information.formValue.OC_B_REFUND_BATCH_ID) {
          this.information.formValue.IN_STORE_ENAME = item.IN_STORE_ENAME;
          this.information.formValue.IN_STORE_ID = item.IN_STORE_ID;
          this.information.formValue.IN_STORE_ECODE = item.IN_STORE_ECODE;
          this.information.formValue.BATCH_NO = item.BATCH_NO;
        }
      });
    },
    // 选择特殊类型
    selectSpecialType() {
      if (this.information.formValue.SPECIAL_TYPE == 0) {
        this.isFlag = false;
      } else {
        this.isFlag = true;
      }
    },
    // 查询原始退单编号
    async queryBounced() {
      //  获取页面数据
      const _this = this;
      _this.order.table.data = [];
      const lists = _this.order.orderform.formValue;
      if (
        !lists.id
        && !lists.receive_name
        && !lists.buyer_nick
        && !lists.receive_mobile
        && !lists.logistics_code
      ) {
        _this.$Message.error('请输入查询条件！');
        return;
      }
      _this.order.table.loading = true;
      const param = {
        id: lists.id,
        receive_name: lists.receive_name,
        buyer_nick: lists.buyer_nick,
        receive_mobile: lists.receive_mobile,
        logistics_code: lists.logistics_code,
        tag: 1
      };
      try {
        const res = await _this.service.common.searchButtonsInJdDetail(param);
        if (res.data.code === 0 && res.data.data !== null) {
          // _this.order.table.data = res.data.data;
          for (let i = 0; i < res.data.data.length; i++) {
            res.data.data[i].ORIG_ORDER_NO = res.data.data[i].ORIG_ORDER_ID;
            if (res.data.data[i].IS_ADD == 1) res.data.data[i].IS_ADD = '是';
            else if (res.data.data[i].IS_ADD == 0) res.data.data[i].IS_ADD = '否';
            _this.order.table.data.push(res.data.data[i]);
          }
        }
        _this.order.table.loading = false;
      } catch (e) {
        _this.$Message.error(err.message);
        _this.order.table.loading = false;
      }
    },
    // 确定原始订单编号
    queryorder() {
      const _this = this;
      _this.jordanTableConfig.data = [];
      if (!this.onSelectData.length) {
        _this.$Message.error('请选择一条数据！');
        return;
      }
      const data = _this.information.formValue;
      const resData = _this.onSelectData[0];
      data.ORIG_ORDER_NO = resData.ID; // 原单单号
      data.USER_NICK = resData.BUYER_NICK; // 买家昵称
      data.LOGISTIC_NUMBER = resData.LOGISTICS_CODE; // 物流单号
      data.RECEIVER_MOBILE = resData.RECEIVE_MOBILE; // 手机号
      data.RECEIVER_NAME = resData.RECEIVE_NAME; // 姓名
      data.RECEIVER_ADDRESS = resData.RECEIVE_ADDRESS; // 发件地址
      _this.information.formValue.CP_C_LOGISTICS_ID = resData.CP_C_LOGISTICS_ID; // 物流公司
      _this.information.formValue.CP_C_LOGISTICS_ENAME = resData.CP_C_LOGISTICS_ENAME;
      _this.information.formData[4].itemdata.valuedata = resData.CP_C_LOGISTICS_ENAME;
      _this.information.formData[4].itemdata.pid = resData.CP_C_LOGISTICS_ID;
      // document.getElementsByClassName('CP_C_LOGISTICS_ID')[0].innerHTML = resData.CP_C_LOGISTICS_ENAME;
      _this.ID = resData.ID;
      const item = _this.onSelectData[0].PRODUCTITEMS;
      item.forEach((item) => {
        _this.jordanTableConfig.data.push({
          PS_C_SKU_ID: item.PS_C_SKU_ID, // ，明细id
          PS_C_SKU_ECODE: item.PS_C_SKU_ECODE, // 条码
          GBCODE: item.BARCODE, // 国标码
          OC_B_JD_RETURN_ORDER_ID: resData.ID, // 退单编号
          REAL_SKU_ECODE: '', // 实收条码
          PS_C_PRO_ENAME: item.PS_C_PRO_ENAME, // 商品名称
          PRODUCT_MARK: item.PRODUCT_MARK == 0 ? '次品' : '正品', // 商品标记
          IS_MATCH: resData.IS_CHECK == 0 ? '否' : '是', // 是否匹配
          IS_GEN_ADJUST: resData.IS_TRANSFER == 0 ? '否' : '是', // 是否生成调整单
          QTY: item.QTY_REFUND, // 数量
          PS_C_PRO_ECODE: item.PS_C_PRO_ECODE,
          PS_C_CLR_ID: item.PS_C_CLR_ID,
          PS_C_CLR_ECODE: item.PS_C_CLR_ECODE,
          PS_C_CLR_ENAME: item.PS_C_CLR_ENAME,
          PS_C_SIZE_ID: item.PS_C_SIZE_ID,
          PS_C_SIZE_ECODE: item.PS_C_SIZE_ECODE,
          PS_C_SIZE_ENAME: item.PS_C_SIZE_ENAME, // 尺寸
          IS_WITHOUT_ORIG: '否', // 是否无原单条码
          Flag1: true
        });
      });
      _this.order.modal = false;
    },
    // 选中的退货明细赋值
    returnArr(data) {
      this.jordanTableConfig.data[this.index].OC_B_JD_RETURN_ORDER_ID = data;
    },
    // 取消
    querycancel() { },
    // 切换tab
    labelClick(item, index) {
      console.log(item, index);
      const _this = this;
      if (index == '0') {
        _this.labelDefaultValue = true;
      } else if (index == '1') {
        _this.labelDefaultValue = false;
        _this.tab2 = {
          tablename: 'OC_B_JD_REFUND_IN',
          objid: this.$route.query.id
        };
      }
    },
    // 查询原始订单勾选
    onquerySelect(e) {
      this.onSelectData = e;
    },
    // 原始订单取消勾选
    onqueryCancel(e) {
      this.onSelectData = e;
    },
    // 列表勾选
    returnOnSelect(e) {
      this.returnSelectData = e;
    },
    // 取消勾选
    returnCancel(e) {
      this.returnSelectData = e;
    },
    oneObjs(e) {
      const _this = this;
      _this.information.formData.forEach((item) => {
        if (item.itemdata) {
          switch (item.itemdata.name) {
            case '物流公司':
              this.information.formValue.CP_C_LOGISTICS_ID = item.itemdata.pid;
              this.information.formValue.CP_C_LOGISTICS_ENAME = item.itemdata.valuedata;
              break;
          }
        }
      });
    },
    // 设置表格高度
    setTableHeight() {
      const _this = this;
      const contentHeight = document.getElementById('content').clientHeight;
      let returnHeight = 25;
      returnHeight += document.getElementsByClassName('buttonBox')[0]
        .clientHeight;
      returnHeight += document.getElementsByClassName('TreasuryDefault')[0]
        .clientHeight;
      const tableHeight = contentHeight - returnHeight;
      _this.jordanTableConfig.height = tableHeight - 220;
    }
  },
  created() {
    const _this = this;
    window.addEventListener('keydown', (e) => {
      const key = e.keyCode;
      if (key == 13) {
        if (_this.order.modal && _this.order.table.data.length) {
          _this.queryorder();
        }
      }
      if (key == 27) {
        _this.order.modal = false;
      }
    });
  },
  destroyed() {
    window.removeEventListener('keydown', this, false);
  }
};
