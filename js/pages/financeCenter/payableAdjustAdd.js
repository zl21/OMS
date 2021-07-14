import businessButton from 'professionalComponents/businessButton';
import businessForm from 'professionalComponents/businessForm';
import businessActionTable from 'professionalComponents/businessActionTable';
import businessLabel from 'professionalComponents/businessLabel';
import customPagingMixins from '@/assets/js/mixins/customPaging.js';
import buttonPermissionsMixin from '@/assets/js/mixins/buttonPermissions';
import businessStatusFlag from 'professionalComponents/businessStatusFlag';
import dateUtil from '@/assets/js/__utils__/date.js';
import tableInput from 'professionalComponents/businessTableInput.vue';
import publicMethodsUtil from '@/assets/js/public/publicMethods.js';
import loading from 'professionalComponents/loading';
import ImageUpload from 'arkui_BCL/ImageUpload';

export default {
  name: 'payableAdjustAdd',
  components: {
    businessButton,
    businessForm,
    businessActionTable,
    businessLabel,
    businessStatusFlag,
    loading,
    ImageUpload
  },
  mixins: [customPagingMixins, buttonPermissionsMixin],
  data() {
    return {
      vmI18n:$i18n,
      loading: false,
      address: '', // 存储解析后的地址
      delTableList: [], // 删除明细中记录选中的标识
      ID: this.$route.query.id, // 记录主界面传入的ID
      selectData: [], // 支付方式的下拉选项值
      allLogTableArr: [],
      showStatusFlag: false,
      statusName: '',
      unAutitFlag: true,
      message: '', // 输入框输入的值
      columns: ['label', 'value'],
      // 以上为模糊搜索测试数据
      theadTitle: [
        {
          LOGISTICS_NO: $i18n.t('table_label.expressNo'),
          CP_C_LOGISTICS_ENAME: $i18n.t('table_label.expressCompany'),
          BILL_NO: $i18n.t('table_label.orderNo'),
          SOURCE_CODE: $i18n.t('form_label.platform_billNo'),
          CP_C_PHY_WAREHOUSE_ENAME: $i18n.t('table_label.warehouseName')
        }
      ],
      isActive: true, // 商品编码搜索框是否显示 true为显示,false隐藏
      spreadPanel: ['panel_baseInfo', 'panel_log'],
      addSelection: [],
      selectArr: [],
      addDetailSelectArr: [],
      allTableArr: [],
      imgIndex: 0,
      btnConfig: {
        typeAll: 'default',
        buttons: [
          {
            webname: 'lookup_save', // 保存
            text: '保存',
            size: '', // 按钮大小
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              const self = this;
              const masterForm = this.formConfig.formValue;
              // 1.非空判断
              let promptMessage = ''; // 非空提示信息
              if (!masterForm.BILL_TYPE) {
                promptMessage += $i18n.t('form_label.billType'); // '单据类型'
              } else if (!masterForm.CP_C_SHOP_ID) {
                promptMessage += $i18n.t('other.shop');
              } else if (!masterForm.SOURCE_OUTSOURCE_DATE) {
                promptMessage += $i18n.t('form_label.out_date'); // '出库日期'
              }
              if (promptMessage) {
                // this.$Message.warning(promptMessage + "不能为空");
                this.$Message.warning(promptMessage + $i18n.t('modalTips.y1'));
                return;
              }
              if (masterForm.BILL_TYPE === '1' || masterForm.BILL_TYPE === '4') {
                if (!masterForm.CP_C_LOGISTICS_ID) {
                  promptMessage += $i18n.t('form_label.expressCompanyName');
                } else if (!masterForm.CP_C_PHY_WAREHOUSE_ID) {
                  promptMessage += $i18n.t('form_label.physicalWarehouseName');
                } else if (!masterForm.LOGISTICS_NO) {
                  promptMessage += $i18n.t('table_label.expressNo');
                }
              }
              if (promptMessage) {
                this.$Message.warning(promptMessage + $i18n.t('modalTips.y1'));
                return;
              }
              // 2.特殊字段正则校验
              const telFlag = self.CheckRegx(/^1[34578]\d{9}$/, masterForm.CUSTOMER_TEL); // 电话校验
              if (!telFlag) {
                self.$Message.error($i18n.t('modalTips.di')); // '顾客电话不合法!'
                return;
              }

              // 3.保存
              self.save();
            }
          },
          {
            webname: 'lookup_return', // 返回
            text: $i18n.t('btn.back'),
            btnclick: () => {
              this.$comUtils.tabCloseAppoint(this);
              this.$destroy(true);
              this.$store.commit('customize/TabHref', {
                id: 2986,
                type: 'CUSTOMIZED',
                name: 'payableAdjustmentList',
                label: $i18n.t('panel_label.payableAdjustmentList'), // 赔付单
                back: true,
              });
            }
          }
        ]
      },
      imageValue: '',
      http: $network,
      dataitem: {
        url: '/p/cs/upload2',
        sendData: {
          path: 'AC_F_PAYABLE_ADJUSTMENT/-1/'
        },
        colname: 'IMAGE',
        name: $i18n.t('other.uploadVoucher'), // 上传凭证
        readonly: false,
        valuedata: []
      },
      detailAddTable: {
        modal: false,
        pageShow: true, // 控制分页是否显示
        table: {
          columns: [
            {
              title: $i18n.t('table_label.productNo'), // 商品编码
              key: 'PS_C_PRO_ECODE'
            },
            {
              title: $i18n.t('table_label.productName'), // 商品名称
              sortable: true,
              key: 'PS_C_PRO_ENAME',
              width: '',
              type: 'asc'
            },
            {
              title: $i18n.t('other.color'), // 颜色
              key: 'PS_C_CLR_ENAME'
            },
            {
              title: $i18n.t('other.sizes'), // 尺寸
              key: 'PS_C_SIZE_ENAME'
            },
            {
              title: $i18n.t('form_label.commodityCode'), // 商品条码
              key: 'PS_C_SKU_ECODE'
            },
            {
              title: $i18n.t('table_label.quantities'), // 数量
              key: 'QTY'
            },
            {
              title: $i18n.t('table_label.standardPrice'), // 标准价
              key: 'STANDARD_PRICE'
            },
            {
              title: $i18n.t('table_label.actual_transactionPrice'), // 实际成交价
              key: 'TRUE_PRICE'
            },
            {
              title: $i18n.t('table_label.amountDue'), // 应付金额
              key: 'PAYABLE_PRICE'
            }
          ], // 表头
          data: [], // 数据配置
          indexColumn: true, // 是否显示序号
          loading: false,
          isShowSelection: true // 是否显示checkedbox
        },
        value: ''
      },
      formConfig: {
        formData: [
          {
            style: 'input', // 文本录入
            label: $i18n.t('form_label.billNo'), // 单据编号
            value: 'BILL_NO',
            width: '8',
            disabled: true
          },
          {
            style: 'dimSearch',
            label: $i18n.t('form_label.platform_billNo'), // 平台单号
            value: 'TID',
            width: '8',
            columns: ['SOURCE_CODE'],
            AuotData: [{}], // 模糊搜索的数据
            // 匹配的选项
            dimChange: async val => {
              // 模糊查询的方法
              const self = this;
              const fromdata = new FormData();
              const param = {
                highSearch: [
                  {
                    type: 'select',
                    queryName: 'ORDER_STATUS',
                    value: '5,6'
                  },
                  {
                    type: 'input',
                    queryName: 'SOURCE_CODE',
                    value: val
                  }
                ]
              };
              fromdata.append('param', JSON.stringify(param));
              const {
                data: { code, data }
              } = await this.service.common.queryOrderList(fromdata);
              if (code === 0) {
                const resData = data || {};
                const dataBySourceCode = resData.queryOrderResultList || [];
                const dimList = self.formConfig.formData;
                // let arr;
                // 过滤不需要展示的模糊搜索项
                const filterData = dataBySourceCode.map(item => ({
                  LOGISTICS_NO: item.EXPRESSCODE,
                  CP_C_LOGISTICS_ENAME: item.CP_C_LOGISTICS_ENAME,
                  BILL_NO: item.BILL_NO,
                  SOURCE_CODE: item.SOURCE_CODE,
                  CP_C_PHY_WAREHOUSE_ENAME: item.CP_C_PHY_WAREHOUSE_ENAME
                }));
                dimList.forEach(item => {
                  if (item.label === $i18n.t('form_label.platform_billNo') || item.label === 'platform_billNo') {
                    item.AuotData = self.theadTitle.concat(filterData);
                  }
                });
              }
            },
            dimSelect: obj => {
              const self = this;
              self.getSourceCodeDetail(obj);
            },
            dimEnter: () => {}
          },
          {
            style: 'input',
            label: $i18n.t('table_label.expressNo'), // 快递单号
            value: 'LOGISTICS_NO',
            width: '8',
            inputenter: () => {
              const formValue = this.formConfig.formValue;
              if (formValue.LOGISTICS_NO && !formValue.TID) this.getSourceCodeDetail();
            }
          },
          {
            style: 'input',
            label: $i18n.t('form_label.expressOutlets'), // 快递网点
            value: 'EXPRESS_OUTLETS',
            width: '8'
          },
          {
            style: 'select', // 下拉框类型
            label: $i18n.t('form_label.billType'), // 单据类型
            width: '8', // 所占宽度宽度
            value: 'BILL_TYPE', // 输入框的值
            selectChange: () => {
              this.getTableAfterCalPayablePrice();
            },
            options: [
              // 下拉框选项值
            ]
          },
          {
            style: 'popInput', // 输入框弹框单多选
            width: '8',
            itemdata: {
              col: 1,
              colid: 1700816190,
              colname: 'AC_F_COMPENSATION_TYPE_ID', // 当前字段的名称
              datelimit: 'all',
              display: 'text', // 显示什么类型，例如xml表示弹窗多选加导入功能，mrp表示下拉多选
              fkdisplay: 'drp', // 外键关联类型
              fkdesc: '赔付类型',
              inputname: 'AC_F_COMPENSATION_TYPE_ID:ID', // 这个是做中文类型的模糊查询字段，例如ENAME
              isfk: true, // 是否有fk键
              isnotnull: false, // 是否必填
              isuppercase: false, // 是否转大写
              length: 65535, // 最大长度是多少
              name: $i18n.t('form_label.payableAdjustType'), // 赔付类型
              readonly: false, // 是否可编辑，对应input   readonly属性
              reftable: 'AC_F_COMPENSATION_TYPE', // 对应的表
              reftableid: 249130445, // 对应的表ID
              row: 1,
              statsize: -1,
              type: 'STRING', // 这个是后台用的
              valuedata: '', // 这个是选择的值
              pid: ''
            },
            oneObj: val => {
              this.formConfig.formValue.AC_F_COMPENSATION_TYPE_ID = val.pid;
              this.getTableAfterCalPayablePrice();
              console.log(val);
              this.queryBIllCause(val.pid);
            }
          },
          {
            style: 'select', // 下拉框类型
            label: $i18n.t('form_label.payableAdjustReason'), // 赔付原因
            width: '8', // 所占宽度宽度
            value: 'AC_F_COMPENSATION_REASON_ID', // 输入框的值
            options: [
              // 下拉框选项值
            ]
          },
          {
            style: 'popInput', // 输入框弹框单多选
            width: '8',
            itemdata: {
              col: 1,
              colid: 167606,
              colname: 'CP_C_SHOP_ID', // 当前字段的名称
              datelimit: 'all',
              display: 'text', // 显示什么类型，例如xml表示弹窗多选加导入功能，mrp表              display: 'text', // 显示什么类型，例如xml表示弹窗多选加导入功能，mrp表示下拉多选示下拉多选
              fkdisplay: 'drp', // 外键关联类型
              inputname: 'CP_C_STORE_IDS:ENAME', // 这个是做中文类型的模糊查询字段，例如ENAME
              isfk: true, // 是否有fk键
              isnotnull: true, // 是否必填
              isuppercase: false, // 是否转大写
              length: 65535, // 最大长度是多少
              name: $i18n.t('other.shop'), // 店铺
              readonly: true, // 是否可编辑，对应input   readonly属性
              reftable: 'CP_C_SHOP', // 对应的表
              reftableid: 24475, // 对应的表ID
              row: 1,
              statsize: -1,
              type: 'STRING', // 这个是后台用的
              valuedata: '', // 这个是选择的值
              pid: ''
            },
            oneObj: val => {
              this.formConfig.formValue.CP_C_SHOP_ID = val.pid;
              this.formConfig.formValue.CP_C_SHOP_TITLE = val.valuedata;
            }
          },

          {
            style: 'select', // 下拉框类型
            label: $i18n.t('table_label.paymentWay'), // 支付方式
            width: '8', // 所占宽度宽度
            value: 'PAY_TYPE', // 输入框的值
            options: [
              // 下拉框选项值
            ]
          },
          {
            style: 'input',
            label: $i18n.t('form_label.source_billNo'), // 来源单据编号
            value: 'ORDER_NO',
            width: '8',
            disabled: true
          },
          {
            style: 'date', // 输入框类型
            label: $i18n.t('table_label.paymentTime'), // 付款时间
            value: 'PAY_TIME', // 输入框的值
            width: '8', // 所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
            format: 'yyyy-MM-dd HH:mm:ss',
            disabled: true
          },
          {
            style: 'select', // 下拉框类型
            label: $i18n.t('form_label.adjustmentType'), // 调整类型
            width: '8', // 所占宽度宽度
            value: 'ADJUST_TYPE', // 输入框的值
            options: [
              // 下拉框选项值
            ]
          },
          {
            style: 'input',
            label: $i18n.t('table_label.custName'), // 顾客姓名
            value: 'CUSTOMER_NAME',
            width: '8',
            disabled: true
          },
          {
            style: 'input',
            label: $i18n.t('table_label.custTelephone'), // 顾客电话
            value: 'CUSTOMER_TEL',
            width: '8'
          },
          {
            style: 'input',
            label: $i18n.t('table_label.alipay'), // 支付宝号
            value: 'ALIPAY_ACCOUNT',
            width: '8',
            disabled: true
          },
          {
            style: 'input', // 文本录入
            label: $i18n.t('table_label.vip_nickname'), // 会员昵称
            value: 'CUSTOMER_NICK',
            width: '8',
            disabled: true
          },
          {
            style: 'input',
            label: $i18n.t('table_label.total_amountDue'), // 总应付金额
            value: 'PAYABLE_PRICE',
            width: '8',
            disabled: true
          },
          {
            style: 'popInput', // 输入框弹框单多选
            width: '8',
            itemdata: {
              col: 1,
              colid: 169964,
              colname: 'CP_C_PHY_WAREHOUSE_ID', // 当前字段的名称
              datelimit: 'all',
              display: 'text', // 显示什么类型，例如xml表示弹窗多选加导入功能，mrp表示下拉多选
              fkdisplay: 'drp', // 外键关联类型
              fkdesc: '实体仓',
              inputname: 'ENAME', // 这个是做中文类型的模糊查询字段，例如ENAME
              isfk: true, // 是否有fk键
              isnotnull: false, // 是否必填
              isuppercase: false, // 是否转大写
              length: 65535, // 最大长度是多少
              name: $i18n.t('form_label.physicalWarehouseName'), // 实体仓名称
              readonly: false, // 是否可编辑，对应input   readonly属性
              reftable: 'CP_C_PHY_WAREHOUSE', // 对应的表
              reftableid: 23451, // 对应的表ID
              row: 1,
              statsize: -1,
              type: 'STRING', // 这个是后台用的
              valuedata: '', // 这个是选择的值
              pid: ''
            },
            oneObj: val => {
              this.formConfig.formValue.CP_C_PHY_WAREHOUSE_ID = val.pid;
              this.formConfig.formValue.CP_C_PHY_WAREHOUSE_ENAME = val.valuedata;
              this.getTableAfterCalPayablePrice();
            }
          },
          {
            style: 'popInput', // 输入框弹框单多选
            width: '8',
            itemdata: {
              col: 1,
              colid: 169965,
              colname: 'CP_C_LOGISTICS_ID', // 当前字段的名称
              datelimit: 'all',
              display: 'text', // 显示什么类型，例如xml表示弹窗多选加导入功能，mrp表示下拉多选
              fkdisplay: 'drp', // 外键关联类型
              fkdesc: '快递公司',
              inputname: 'ENAME', // 这个是做中文类型的模糊查询字段，例如ENAME
              isfk: true, // 是否有fk键
              isnotnull: false, // 是否必填
              isuppercase: false, // 是否转大写
              length: 65535, // 最大长度是多少
              name: $i18n.t('form_label.expressCompanyName'), // 快递公司名称
              readonly: false, // 是否可编辑，对应input   readonly属性
              reftable: 'CP_C_LOGISTICS', // 对应的表
              row: 1,
              statsize: -1,
              type: 'STRING', // 这个是后台用的
              valuedata: '', // 这个是选择的值
              pid: ''
            },
            oneObj: val => {
              this.formConfig.formValue.CP_C_LOGISTICS_ID = val.pid;
              this.formConfig.formValue.CP_C_LOGISTICS_ENAME = val.valuedata;
              this.getTableAfterCalPayablePrice();
            }
          },
          {
            style: 'date', // 输入框类型
            label: $i18n.t('form_label.original_out_date'), // 原始出库日期
            value: 'SOURCE_OUTSOURCE_DATE', // 输入框的值
            width: '8', // 所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
            format: 'yyyy-MM-dd HH:mm:ss'
          },
          {
            style: 'input',
            type: 'textarea',
            label: $i18n.t('table_label.remarks'), // 备注
            value: 'REMARK',
            width: '16'
          }
        ],
        // 表单一
        formValue: {
          BILL_NO: '',
          BILL_TYPE: '',
          AC_F_COMPENSATION_TYPE_ID: '',
          PAY_TYPE: '',
          AC_F_COMPENSATION_REASON_ID: '', // 赔付原因
          EXPRESS_OUTLETS: '', // 快递网点
          CP_C_SHOP_ID: '',
          ADJUST_TYPE: '',
          CP_C_LOGISTICS_ID: '',
          ORDER_NO: '',
          PAY_TIME: '',
          CP_C_PHY_WAREHOUSE_ID: '',
          IMAGE: '',
          PAYABLE_PRICE: ''
        },
        ruleValidate: {
          BILL_TYPE: [{ required: true, message: ' ' }],
          TID: [{ required: true, message: ' ' }],
          LOGISTICS_NO: [{ required: false, message: ' ' }],
          SOURCE_OUTSOURCE_DATE: [{ required: true, message: ' ' }]
        }
      },

      formConfigLog: {
        formData: [
          {
            style: 'input', // 文本录入
            label: $i18n.t('table_label.creator'), // 创建人
            value: 'OWNERENAME',
            width: '6',
            disabled: true
          },
          {
            style: 'date',
            type: '',
            label: $i18n.t('table_label.creationTime'), // 创建时间
            value: 'CREATIONDATE',
            width: '6',
            format: 'yyyy-MM-dd HH:mm:ss',
            disabled: true
          },
          {
            style: 'input',
            label: $i18n.t('table_label.reviser'), // 修改人
            value: 'MODIFIERNAME',
            width: '6',
            disabled: true
          },
          {
            style: 'date', // 输入框类型
            label: $i18n.t('table_label.modificationTime'), // 修改时间
            value: 'MODIFIEDDATE',
            width: '6',
            format: 'yyyy-MM-dd HH:mm:ss',
            disabled: true
          }
        ],
        // 日志表单
        formValue: {
          OWNERENAME: '',
          CREATIONDATE: '',
          MODIFIERNAME: '',
          MODIFIEDDATE: ''
        }
      },
      // 表格
      jordanTableConfig: {
        // 是否修改搜索框为select
        isSearchText: true,
        isShowDeleteDetailBtn: true, // 控制是否显示删除明细
        isShowAddDetailBtn: true, // 控制是否显示新增明细
        // isSearchText为false的情况下使用 搜索框list
        searchSelectList: [],
        pageShow: true, // 控制分页是否显示
        btnsShow: true, // 控制操作按钮是否显示
        searchInputShow: false, // 控制搜索框是否显示
        width: '', // 表格宽度
        height: '300', // 表格高度
        border: true, // 是否显示纵向边框
        total: 0, // 设置总条数
        pageSizeOpts: [10, 20, 30,50,100], // 每页条数切换的配置
        pageSize: 10, // 每页条数
        totalData: [],
        columns: [
          {
            key: 'selection',
            type: 'selection',
            width: '50',
            align: 'center'
          },
          {
            title: $i18n.t('table_label.productNo'), // 商品编码
            key: 'PS_C_PRO_ECODE'
          },
          {
            title: $i18n.t('table_label.productName'), // 商品名称
            sortable: true,
            key: 'PS_C_PRO_ENAME',
            width: '',
            type: 'asc'
          },
          {
            title: $i18n.t('other.color'), // 颜色
            key: 'PS_C_CLR_ENAME'
          },
          {
            title: $i18n.t('other.sizes'), // 尺寸
            key: 'PS_C_SIZE_ENAME'
          },
          {
            title: $i18n.t('form_label.commodityCode'), // 商品条码
            key: 'PS_C_SKU_ECODE'
          },
          {
            title: $i18n.t('form_label.gBCode'), // 国标码
            key: 'GBCODE'
          },
          {
            title: $i18n.t('table_label.logicWarehouse'), // 逻辑仓
            key: 'LOGICAL_STORE_ID',
            render: (h, params) => {
              if (this.unAutitFlag) {
                const self = this;
                return h(tableInput, {
                  style: {
                    width: '100%'
                  },
                  props: {
                    tableFormConfig: {
                      formData: [
                        {
                          style: 'popInput',
                          width: '24',
                          itemdata: {
                            col: 1,
                            colid: 180845,
                            colname: 'LOGICAL_STORE_ID',
                            datelimit: 'all',
                            display: 'text',
                            fkdesc: '逻辑仓',
                            fkdisplay: 'drp',
                            inputname: 'ENAME',
                            isfk: true,
                            isnotnull: true,
                            isuppercase: false,
                            length: 20,
                            readonly: false,
                            reftable: 'AC_F_PAYABLE_ADJUSTMENT_ITEM',
                            reftableid: 24666,
                            row: 1,
                            statsize: -1,
                            type: 'STRING',
                            pid: params.row.LOGICAL_STORE_ID,
                            valuedata: params.row.LOGICAL_STORE_NAME
                          },
                          tableObj: e => {
                            self.tableObjs(e, params);
                          }
                        }
                      ]
                    }
                  }
                });
              }
              const self = this;
              return h(tableInput, {
                style: {
                  width: '100%'
                },
                props: {
                  tableFormConfig: {
                    formData: [
                      {
                        style: 'popInput',
                        width: '24',
                        itemdata: {
                          col: 1,
                          colid: 180845,
                          colname: 'LOGICAL_STORE_ID',
                          datelimit: 'all',
                          display: 'text',
                          fkdesc: '逻辑仓',
                          fkdisplay: 'drp',
                          inputname: 'ENAME',
                          isfk: true,
                          isnotnull: true,
                          isuppercase: false,
                          length: 20,
                          readonly: true,
                          reftable: 'AC_F_PAYABLE_ADJUSTMENT_ITEM',
                          reftableid: 24666,
                          row: 1,
                          statsize: -1,
                          type: 'STRING',
                          pid: params.row.LOGICAL_STORE_ID,
                          valuedata: params.row.LOGICAL_STORE_NAME
                        },
                        tableObj: e => {
                          self.tableObjs(e, params);
                        }
                      }
                    ]
                  }
                }
              });
            }
          },
          {
            title: $i18n.t('table_label.quantities'), // 数量
            key: 'QTY',
            render: (h, params) => {
              if (this.unAutitFlag) {
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
                    h(
                      'Input',
                      {
                        class: 'isNone',
                        style: {
                          width: '100%',
                          height: '100%'
                        },
                        props: {
                          value: params.row.QTY,
                          autosize: true,
                          regx: /^[0-9]*$/
                        },
                        on: {
                          'on-blur': e => {
                            const self = this;
                            self.jordanTableConfig.data[`${params.index}`].QTY = e.target.value;
                            const reg = /^[0-9]*$/;
                            if (!reg.test(e.target.value)) {
                              // self.$Message.warning("数量只能录入正整数！");
                              self.$Message.warning($i18n.t('modalTips.z6'));
                              return;
                            }
                            // self.getTableAfterCalPayablePrice();
                            if (e.target.value > 0) {
                              if (params.row.DEAL_AMT) {
                                self.jordanTableConfig.data[params.index].TRUE_PRICE = (params.row.DEAL_AMT * e.target.value).toFixed(2);
                              }
                              // if(params.row.PAY_AMT){
                              //   self.jordanTableConfig.data[
                              //     params.index
                              //     ].PAYABLE_PRICE = (params.row.PAY_AMT * e.target.value).toFixed(2);
                              // }
                              self.getTableAfterCalPayablePrice();
                            }
                          }
                        }
                      },
                      params.row.QTY
                    )
                  ]
                );
              }
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
                  h(
                    'Label',
                    {
                      class: 'isNone',
                      style: {
                        width: '100%',
                        height: '100%'
                      },
                      props: {
                        value: params.row.QTY,
                        autosize: true
                      }
                    },
                    params.row.QTY
                  )
                ]
              );
            }
          },
          {
            title: $i18n.t('table_label.orderQuantity'), // 订单数量
            key: 'ORDER_QTY'
          },
          {
            title: $i18n.t('table_label.standardPrice'), // 标准价
            key: 'STANDARD_PRICE'
          },
          {
            title: $i18n.t('table_label.unitPrice'), // 成交单价
            key: 'DEAL_AMT'
          },
          {
            title: $i18n.t('table_label.actual_transactionPrice'), // 实际成交价
            key: 'TRUE_PRICE'
          },
          {
            title: $i18n.t('table_label.payable_unitPrice'), // 应付单价
            key: 'PAY_AMT'
          },
          {
            title: $i18n.t('table_label.amountDue'), // 应付金额
            key: 'PAYABLE_PRICE',
            render: (h, params) => {
              if (this.unAutitFlag) {
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
                    h(
                      'Input',
                      {
                        class: 'isNone',
                        style: {
                          width: '100%',
                          height: '100%'
                        },
                        props: {
                          value: params.row.PAYABLE_PRICE,
                          autosize: true,
                          regx: /^\d*\.{0,1}\d{0,4}$/
                        },
                        on: {
                          'on-blur': e => {
                            const self = this;
                            let changeAmt = e.target.value;
                            self.jordanTableConfig.data[`${params.index}`].PAYABLE_PRICE = changeAmt;
                            const reg = /^\d*\.{0,1}\d{0,4}$/;
                            if (!reg.test(changeAmt)) {
                              // self.$Message.warning("应付金额只能录入大于0的数字");
                              self.$Message.warning($i18n.t('modalTips.z7'));
                              return;
                            }
                            // 计算总应付金额
                            let preAmt = params.row.PAYABLE_PRICE;
                            if (preAmt) {
                              preAmt = parseFloat(preAmt);
                            }
                            if (changeAmt) {
                              changeAmt = parseFloat(changeAmt);
                            }
                            let preAllPayablePrice = self.formConfig.formValue.PAYABLE_PRICE;
                            if (preAllPayablePrice) {
                              preAllPayablePrice = parseFloat(preAllPayablePrice);
                            }
                            if (params.row.QTY > 0 && e.target.value) {
                              self.jordanTableConfig.data[params.index].PAY_AMT = (e.target.value / params.row.QTY).toFixed(2);
                            }
                            self.formConfig.formValue.PAYABLE_PRICE = preAllPayablePrice - preAmt + changeAmt;
                            self.calTableTable(self.jordanTableConfig.data);
                          }
                        }
                      },
                      params.row.PAYABLE_PRICE
                    )
                  ]
                );
              }
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
                  h(
                    'Label',
                    {
                      class: 'isNone',
                      style: {
                        width: '100%',
                        height: '100%'
                      },
                      props: {
                        value: params.row.PAYABLE_PRICE,
                        autosize: true
                      }
                    },
                    params.row.PAYABLE_PRICE
                  )
                ]
              );
            }
          }
        ],
        data: []
      },
      payableAdjustLog: {
        // 是否修改搜索框为select
        isSearchText: true,
        isShowDeleteDetailBtn: false, // 控制是否显示删除明细
        isShowAddDetailBtn: false, // 控制是否显示新增明细
        // isSearchText为false的情况下使用 搜索框list
        searchSelectList: [],
        pageShow: true, // 控制分页是否显示
        btnsShow: true, // 控制操作按钮是否显示*
        searchInputShow: false, // 控制搜索框是否显示
        width: '', // 表格宽度
        height: '300', // 表格高度
        border: true, // 是否显示纵向边框
        total: 0, // 设置总条数
        pageSizeOpts: [5, 15, 30, 45, 60], // 每页条数切换的配置
        pageSize: 5, // 每页条数
        columns: [
          {
            title: $i18n.t('table_label.logContent'), // 日志内容
            key: 'LOG_CONTENT'
          },
          {
            title: $i18n.t('table_label.operatorName'), // 操作姓名
            key: 'OWNERENAME'
          },
          {
            title: $i18n.t('table_label.operatorTime'), // 操作时间
            key: 'CREATIONDATE'
          }
        ],
        data: []
      },
      // tab切换配置
      labelList: [
        {
          label: $i18n.t('panel_label.payableAdjust_details'), // 赔付单明细
          value: '1',
          isShow: true
        }
      ],
      labelDefaultValue: '1' // 设置tab默认值
    };
  },
  watch: {},

  mounted() {
    this.$nextTick(() => {
      this.getPermissions('btnConfig', 'payableAdjustmentList');
    });
    const self = this;

    // 获取下拉选项组选项
    self.getSelectData();
    // ID>0进行表单赋值
    if (self.ID > 0) {
      self.getPayableAdjustment();
    }
  },
  created() {
    // 设置默认值
    const self = this;
    self.formConfig.formValue.PAY_TYPE = '1';
    self.formConfig.formValue.ADJUST_TYPE = '2';
    self.formConfig.formValue.BILL_TYPE = '4';
    // this.inputList = port[this.tablename].inputList;
  },
  methods: {
    async queryBIllCause(val) {
      const formdata = new FormData();
      formdata.append('id', val);
      const {
        data: { code, data, message }
      } = await this.service.financeCenter.getCompensationReason(formdata);
      console.log(code, data, message);
      if (code == 0) {
        const arr = [];
        data.forEach(item => {
          const obj = {};
          obj.value = item.ID;
          obj.label = item.ac_f_compensation_type_ename;
          arr.push(obj);
        });
        this.formConfig.formData.forEach(item => {
          if (item.label == $i18n.t('form_label.payableAdjustReason') || item.label == 'payableAdjustReason') {
            item.options = arr;
          }
        });
      } else {
        // this.$Message.error(message);
      }
    },
    labelClick(item) {
      this.labelDefaultValue = item.value;
    },
    async getPayableAdjustment() {
      const {customizedModuleName}=this.$router.currentRoute.params;
      const self = this;
      const param = {
        objid: self.ID
      };
      const fromdata = new FormData();
      fromdata.append('param', JSON.stringify(param));
      const {
        data: { code, data }
      } = await this.service.financeCenter.getPayableAdjustment(fromdata);
      if (code === 0) {
        self.labelList = [
          {
            label: $i18n.t('panel_label.payableAdjust_details'), // 赔付单明细
            value: '1',
            isShow: true
          },
          {
            label: $i18n.t('panel_label.operationLog'), // 操作日志
            value: '2'
          }
        ];
        const mainData = data.acFPayableAdjustment;
        const itemData = data.acFPayableAdjustmentItemList;
        const logData = data.acFPayableAdjustmentLogList;
        self.setPayableAdjustData(mainData, itemData, logData);
      }
      // this.$R3loading.hide(customizedModuleName);
      this.loading  = false;
    },
    // 分页change 事件
    pageChange(val) {
      this.selectArr = [];
      this.mixinPageChange(val, this.jordanTableConfig, 'jordanTableConfig');
    },
    logPageChange(val) {
      this.mixinPageChange(val, this.payableAdjustLog, 'payableAdjustLog');
    },
    // 切换分页条数
    pageSizeChange(val) {
      this.jordanTableConfig.pageSize = val;
      this.mixinPageSizeChange(this.allTableArr, val, this.jordanTableConfig, 'jordanTableConfig');
    },
    // 切换分页条数
    logPageSizeChange(val) {
      this.payableAdjustLog.pageSize = val;
      this.mixinPageSizeChange(this.allLogTableArr, val, this.payableAdjustLog, 'payableAdjustLog');
    },
    // 删除图片
    deleteImg() {
      this.formConfig.formValue.IMAGE = this.dataitem.valuedata;
    },
    // 图片上传成功的处理
    uploadFileChangeSuccess(res) {
      const self = this;
      self.dataitem.valuedata = res.map(i => ({ name: i.NAME, URL: i.URL }))
      self.formConfig.formValue.IMAGE = self.dataitem.valuedata;
    },
    // 生成赔付单form及table请求数据
    generateFromdata() {
      const self = this;
      const payableAdjustmentDO = self.formConfig.formValue;
      const payableAdjustmentItemDO = this.mixinTableArr('jordanTableConfig');
      const data = {
        AC_F_PAYABLE_ADJUSTMENT: payableAdjustmentDO,
        AC_F_PAYABLE_ADJUSTMENT_ITEM: payableAdjustmentItemDO
      };
      const param = {
        objid: self.ID,
        fixcolumn: data
      };
      const fromdata = new FormData();
      fromdata.append('param', JSON.stringify(param));
      return fromdata;
    },
    async getSourceCodeDetail(obj) {
      const self = this;
      let sourceCode = '';
      if (obj) sourceCode = obj.tem.SOURCE_CODE;
      if (sourceCode === $i18n.t('form_label.platform_billNo') || sourceCode === 'platform_billNo') {
        self.formConfig.formValue.TID = '';
        return;
      }
      const fromdata = new FormData();
      const param = {
        highSearch: [
          {
            type: 'select',
            queryName: 'ORDER_STATUS',
            value: '5,6'
          }
        ]
      };
      if (obj) {
        param.highSearch.push(
          {
            type: 'input',
            queryName: 'SOURCE_CODE',
            value: obj.tem.SOURCE_CODE
          },
          {
            type: 'input',
            queryName: 'BILL_NO',
            value: obj.tem.BILL_NO
          }
        );
      } else {
        param.highSearch.push({
          type: 'input',
          queryName: 'EXPRESSCODE',
          value: this.formConfig.formValue.LOGISTICS_NO
        });
      }
      fromdata.append('param', JSON.stringify(param));
      const {
        data: { code, data }
      } = await this.service.common.queryOrderList(fromdata);
      if (code === 0) {
        const dataByBillNo = data.queryOrderResultList;
        const item = dataByBillNo[0];
        // Form表单赋值
        let payType = item.PAY_TYPE;
        if (payType) {
          payType = payType.toString();
          self.formConfig.formValue.PAY_TYPE = payType;
        }
        self.formConfig.formValue.TID = item.SOURCE_CODE;
        self.formConfig.formValue.ORDER_NO = item.BILL_NO;
        self.formConfig.formValue.SOURCE_TID = item.ID;
        if (item.PAY_TIME) {
          // 时间戳转换为时间
          self.formConfig.formValue.PAY_TIME = self.formatDate(item.PAY_TIME);
        }
        self.formConfig.formValue.CUSTOMER_NAME = item.RECEIVER_NAME;
        self.formConfig.formValue.CUSTOMER_TEL = item.RECEIVER_MOBILE;
        self.formConfig.formValue.CUSTOMER_NICK = item.USER_NICK;
        self.formConfig.formValue.LOGISTICS_NO = item.EXPRESSCODE;
        self.formConfig.formValue.CP_C_SHOP_ID = item.CP_C_SHOP_ID;
        self.formConfig.formValue.PAYABLE_PRICE = 0;
        self.addSelection = [];
        self.detailAddTable.table.data = self.addSelection;
        if (item.SCAN_TIME) {
          self.formConfig.formValue.SOURCE_OUTSOURCE_DATE = this.formatDate(item.SCAN_TIME);
        }
        const queryData = self.formConfig.formData;
        queryData.forEach(formItem => {
          if (formItem.itemdata && (formItem.itemdata.name === $i18n.t('form_label.expressCompanyName') || formItem.itemdata.name === 'expressCompanyName')) {
            formItem.itemdata.valuedata = item.CP_C_LOGISTICS_ENAME;
            formItem.itemdata.pid = item.CP_C_LOGISTICS_ID;
            this.formConfig.formValue.CP_C_LOGISTICS_ID = item.CP_C_LOGISTICS_ID;
            this.formConfig.formValue.CP_C_LOGISTICS_ENAME = item.CP_C_LOGISTICS_ENAME;
          } else if (formItem.itemdata && formItem.itemdata.name === $i18n.t('other.shop')) {
            formItem.itemdata.valuedata = item.CP_C_SHOP_TITLE;
            formItem.itemdata.pid = item.CP_C_SHOP_ID;
            this.formConfig.formValue.CP_C_SHOP_ID = item.CP_C_SHOP_ID;
            this.formConfig.formValue.CP_C_SHOP_TITLE = item.CP_C_SHOP_TITLE;
          } else if (formItem.itemdata && formItem.itemdata.name === $i18n.t('form_label.physicalWarehouseName')) {
            formItem.itemdata.valuedata = item.CP_C_PHY_WAREHOUSE_ENAME;
            formItem.itemdata.pid = item.CP_C_PHY_WAREHOUSE_ID;
            this.formConfig.formValue.CP_C_PHY_WAREHOUSE_ID = item.CP_C_PHY_WAREHOUSE_ID;
            this.formConfig.formValue.CP_C_PHY_WAREHOUSE_ENAME = item.CP_C_PHY_WAREHOUSE_ENAME;
          }
        });
        // Table表单赋值
        const filterItemData = item.QUERYORDERITEMRESULTLIST.map(subItem => {
          const priceActual = parseFloat((subItem.realAmt / subItem.qty).toFixed(2));
          this.truePrice += parseFloat(subItem.realAmt);
          this.orderQty += subItem.qty;
          // 过滤不需要展示的模糊搜索项
          return {
            ID: subItem.proId,
            ORDER_ITEM_ID: subItem.proId,
            PS_C_PRO_ID: subItem.psCproId,
            PS_C_PRO_ECODE: subItem.ecode,
            PS_C_PRO_ENAME: subItem.proEname,
            PS_C_CLR_ENAME: subItem.clrs,
            PS_C_SIZE_ENAME: subItem.sizes,
            PS_C_SKU_ECODE: subItem.skuEcode,
            QTY: subItem.qty,
            ORDER_QTY: subItem.qty,
            STANDARD_PRICE: subItem.price,
            DEAL_AMT: priceActual,
            TRUE_PRICE: subItem.realAmt,
            PS_C_SKU_ID: subItem.skuId,
            GBCODE: subItem.barCode,
            PAYABLE_PRICE: 0, // 应付金额初始默认为0
            checked: false
          };
        });
        self.customPagingFun(filterItemData, self.jordanTableConfig.pageSize, self.jordanTableConfig, 'jordanTableConfig');
        self.allTableArr = filterItemData;
        self.getTableAfterCalPayablePrice();
      }
    },
    // 计算应付金额
    async getTableAfterCalPayablePrice() {
      const self = this;
      const formdata = self.generateFromdata();
      const billType = self.formConfig.formValue.BILL_TYPE;
      if (billType === '1' || billType === '4') {
        self.formConfig.formData.forEach(item => {
          if (item.itemdata && (item.itemdata.name === $i18n.t('form_label.physicalWarehouseName') || item.itemdata.name === $i18n.t('form_label.expressCompanyName'))) {
            item.itemdata.isnotnull = true;
          }
        });
        self.formConfig.ruleValidate.LOGISTICS_NO[0].required = true;
        self.formConfig.ruleValidate = Object.assign({}, self.formConfig.ruleValidate);
        // 接口
        const {
          data: { code, data, message }
        } = await this.service.financeCenter.getCompensate(formdata);
        console.log('formdata:', code, data, message);
        if (code === 0) {
          self.formConfig.formValue.PAYABLE_PRICE = data.payablePrice;
          const itemList = data.acFPayableAdjustmentItemList;
          // let priceActual = parseFloat((subItem.TRUE_PRICE / subItem.ORDER_QTY).toFixed(2));
          // 过滤不需要展示的模糊搜索项
          const filterItemData = itemList.map(subItem => ({
            ID: subItem.ID,
            ORDER_ITEM_ID: subItem.ORDER_ITEM_ID,
            PS_C_PRO_ID: subItem.PS_C_PRO_ID,
            PS_C_PRO_ECODE: subItem.PS_C_PRO_ECODE,
            PS_C_PRO_ENAME: subItem.PS_C_PRO_ENAME,
            PS_C_CLR_ENAME: subItem.PS_C_CLR_ENAME,
            PS_C_SIZE_ENAME: subItem.PS_C_SIZE_ENAME,
            PS_C_SKU_ECODE: subItem.PS_C_SKU_ECODE,
            QTY: subItem.QTY,
            ORDER_QTY: subItem.ORDER_QTY,
            STANDARD_PRICE: subItem.STANDARD_PRICE,
            DEAL_AMT: subItem.DEAL_AMT,
            PAY_AMT: subItem.PAY_AMT,
            TRUE_PRICE: subItem.TRUE_PRICE,
            PS_C_SKU_ID: subItem.PS_C_SKU_ID,
            GBCODE: subItem.GBCODE,
            PAYABLE_PRICE: subItem.PAYABLE_PRICE,
            checked: false
          }));
          self.jordanTableConfig.data = filterItemData;
          self.allTableArr = filterItemData;
          self.selectArr = [];
          self.customPagingFun(filterItemData, self.jordanTableConfig.pageSize, self.jordanTableConfig, 'jordanTableConfig');
          self.calTableTable(self.jordanTableConfig.data);
        } else {
          // this.$Message.error(message);
        }
      } else {
        self.formConfig.formData.forEach(item => {
          if (item.itemdata && (item.itemdata.name === $i18n.t('form_label.physicalWarehouseName') || item.itemdata.name === $i18n.t('form_label.expressCompanyName'))) {
            item.itemdata.isnotnull = false;
          }
        });
        self.formConfig.ruleValidate.LOGISTICS_NO[0].required = false;
        self.formConfig.ruleValidate = Object.assign({}, self.formConfig.ruleValidate);
        self.calTableTable(self.jordanTableConfig.data);
      }
    },
    // 填充表单数据
    setPayableAdjustData(mainData, itemData, logData) {
      console.log('mainData, itemData, logData', mainData, itemData, logData);
      // 将null转为''
      for (const x in mainData) {
        if (!mainData[x]) {
          mainData[x] = '';
        }
      }
      const self = this;
      let payType = mainData.PAY_TYPE;
      const billStatus = mainData.BILL_STATUS;
      if (billStatus !== 1) {
        self.setupByAuditOrVoid(billStatus);
      }
      let billType = mainData.BILL_TYPE;
      let adjustType = mainData.ADJUST_TYPE;
      self.formConfig.formValue.BILL_NO = mainData.BILL_NO;
      self.formConfig.formValue.TID = mainData.TID;
      if (payType) {
        payType = payType.toString();
        self.formConfig.formValue.PAY_TYPE = payType;
      }
      if (billType) {
        billType = billType.toString();
        self.formConfig.formValue.BILL_TYPE = billType;
      }
      self.formConfig.formValue.ORDER_NO = mainData.ORDER_NO;
      if (adjustType) {
        adjustType = adjustType.toString();
        self.formConfig.formValue.ADJUST_TYPE = adjustType;
      }
      self.formConfig.formValue.CUSTOMER_NAME = mainData.CUSTOMER_NAME ? mainData.CUSTOMER_NAME : '';
      self.formConfig.formValue.CUSTOMER_TEL = mainData.CUSTOMER_TEL ? mainData.CUSTOMER_TEL : '';
      self.formConfig.formValue.ALIPAY_ACCOUNT = mainData.ALIPAY_ACCOUNT ? mainData.ALIPAY_ACCOUNT : '';
      self.formConfig.formValue.CUSTOMER_NICK = mainData.CUSTOMER_NICK ? mainData.CUSTOMER_NICK : '';
      self.formConfig.formValue.LOGISTICS_NO = mainData.LOGISTICS_NO ? mainData.LOGISTICS_NO : '';
      self.formConfig.formValue.EXPRESS_OUTLETS = mainData.EXPRESS_OUTLETS ? mainData.EXPRESS_OUTLETS : '';
      self.formConfig.formValue.PAYABLE_PRICE = mainData.PAYABLE_PRICE ? mainData.PAYABLE_PRICE : '';
      self.formConfig.formValue.REMARK = mainData.REMARK ? mainData.REMARK : '';
      self.formConfig.formValue.PAY_TIME = this.formatDate(mainData.PAY_TIME);
      self.formConfig.formValue.SOURCE_OUTSOURCE_DATE = this.formatDate(mainData.SOURCE_OUTSOURCE_DATE);
      self.formConfig.formValue.CP_C_LOGISTICS_ID = mainData.CP_C_LOGISTICS_ID;
      self.formConfig.formValue.CP_C_SHOP_ID = mainData.CP_C_SHOP_ID;
      self.formConfig.formValue.CP_C_PHY_WAREHOUSE_ID = mainData.CP_C_PHY_WAREHOUSE_ID;
      self.formConfig.formValue.IMAGE = mainData.IMAGE;
      self.formConfig.formValue.AC_F_COMPENSATION_REASON_ID = mainData.AC_F_COMPENSATION_REASON_ID;
      self.formConfigLog.formValue.OWNERENAME = mainData.OWNERENAME;
      self.formConfigLog.formValue.MODIFIERNAME = mainData.MODIFIERNAME;
      self.formConfigLog.formValue.SOURCE_OUTSOURCE_DATE = mainData.SOURCE_OUTSOURCE_DATE;
      self.formConfigLog.formValue.CREATIONDATE = this.formatDate(mainData.CREATIONDATE);
      self.formConfigLog.formValue.MODIFIEDDATE = this.formatDate(mainData.MODIFIEDDATE);
      self.formConfig.formData.forEach(item => {
        if (item.itemdata && item.itemdata.name === $i18n.t('form_label.expressCompanyName')) {
          item.itemdata.valuedata = mainData.CP_C_LOGISTICS_ENAME;
          item.itemdata.pid = mainData.CP_C_LOGISTICS_ID;
        } else if (item.itemdata && item.itemdata.name === $i18n.t('other.shop')) {
          item.itemdata.valuedata = mainData.CP_C_SHOP_TITLE;
          item.itemdata.pid = mainData.CP_C_SHOP_ID;
        } else if (item.itemdata && item.itemdata.name === $i18n.t('form_label.physicalWarehouseName')) {
          item.itemdata.valuedata = mainData.CP_C_PHY_WAREHOUSE_ENAME;
          item.itemdata.pid = mainData.CP_C_PHY_WAREHOUSE_ID;
        } else if (item.itemdata && item.itemdata.name === $i18n.t('form_label.payableAdjustType')) {
          item.itemdata.valuedata = mainData.COMPENSATION_TYPE_ENAME;
          item.itemdata.pid = mainData.AC_F_COMPENSATION_TYPE_ID;
        } else if (item.label === $i18n.t('form_label.payableAdjustReason')) {
          item.options = [
            {
              value: mainData.AC_F_COMPENSATION_REASON_ID,
              label: mainData.COMPENSATION_REASON
            }
          ];
        }
      });
      if (mainData.IMAGE) {
        self.dataitem.valuedata = JSON.parse(mainData.IMAGE);
      }
      self.customPagingFun(itemData, self.jordanTableConfig.pageSize, self.jordanTableConfig, 'jordanTableConfig');
      const filterLogData = logData.map(item => ({
        LOG_CONTENT: item.LOG_CONTENT,
        OWNERENAME: item.OWNERENAME,
        CREATIONDATE: item.CREATIONDATE ? publicMethodsUtil.DatesTime(item.CREATIONDATE) : ''
      }));
      self.allLogTableArr = filterLogData;
      self.customPagingFun(filterLogData, self.payableAdjustLog.pageSize, self.payableAdjustLog, 'payableAdjustLog');
      self.allTableArr = itemData;
      // self.jordanTableConfig.data = itemData;
      self.calTableTable(self.jordanTableConfig.data);
    },
    // 已作废或已财/客审设置
    setupByAuditOrVoid(billStatus) {
      const self = this;
      // 保存按钮隐藏
      self.btnConfig.buttons.forEach(btn => {
        if (btn.webname === 'lookup_save') {
          btn.isShow = false;
        }
      });
      // 添加水印
      const showFlag = [2,3,4];
      if (showFlag.includes(billStatus)) {
        self.showStatusFlag = true;
      }
      switch (billStatus) {
        case 2:
          self.statusName = $i18n.t('common.custAudited');
          break;
        case 3:
          self.statusName = $i18n.t('common.financeAudited');
          break;
        case 4:
          self.statusName = $i18n.t('common.voided');
          break;
      }
      // 去除新增与删除明细按钮
      self.jordanTableConfig.isShowAddDetailBtn = false;
      self.jordanTableConfig.isShowDeleteDetailBtn = false;
      // 主表数据设为只读
      self.formConfig.formData.forEach(formItem => {
        if (formItem.style === 'popInput') {
          formItem.itemdata.readonly = true;
        } else if (formItem.style === 'dimSearch') {
          formItem.style = 'input';
          formItem.disabled = true;
        } else {
          formItem.disabled = true;
        }
      });
      // 禁用图片上传功能
      self.dataitem.readonly = true;
      // 列表功能禁用
      self.unAutitFlag = false;
    },
    // 时间戳格式化
    formatDate(time) {
      const date = new Date(time);
      return dateUtil.getFormatDate(date, 'yyyy-MM-dd HH:mm:ss');
    },
    // 填充下拉选项框
    async getSelectData() {
      const self = this;
      const arrPayType = [];
      const arrAdjustType = [];
      const arrBillType = [];
      await this.getColOption('AC_F_PAYABLE_ADJUSTMENT', $i18n.t('common.baseInformation'), 'PAY_TYPE');
      self.selectData.forEach(item => {
        const obj = {};
        obj.label = item.limitdesc;
        obj.value = item.limitval;
        arrPayType.push(obj);
      });
      await this.getColOption('AC_F_PAYABLE_ADJUSTMENT', $i18n.t('common.baseInformation'), 'ADJUST_TYPE');
      self.selectData.forEach(item => {
        const obj = {};
        obj.label = item.limitdesc;
        obj.value = item.limitval;
        arrAdjustType.push(obj);
      });
      await this.getColOption('AC_F_PAYABLE_ADJUSTMENT', $i18n.t('common.baseInformation'), 'BILL_TYPE');
      self.selectData.forEach(item => {
        const obj = {};
        obj.label = item.limitdesc;
        obj.value = item.limitval;
        arrBillType.push(obj);
      });
      self.formConfig.formData.forEach(item => {
        if (item.value === 'PAY_TYPE') {
          item.options = arrPayType;
        } else if (item.value === 'ADJUST_TYPE') {
          item.options = arrAdjustType;
        } else if (item.value === 'BILL_TYPE') {
          item.options = arrBillType;
        }
      });
    },
    // 获取控件对应下拉选项值
    async getColOption(tableName, parentColName, childColName) {
      const self = this;
      const fromdata = new FormData();
      fromdata.append('table', tableName);
      fromdata.append('objid', -1);
      const res = await self.service.common.getObject(fromdata);
      const selectData = res.data.data.addcolums;
      selectData.forEach(item => {
        if (item.parentdesc === parentColName) {
          const childItem = item.childs;
          childItem.forEach(item => {
            if (item.colname === childColName) {
              self.selectData = item.combobox;
            }
          });
        }
      });
    },
    keyDown(e) {
      console.log(e);
    },
    CheckRegx(reg, field) {
      return reg.test(field);
    },
    async save() {
      const self = this;
      // const {customizedModuleName}=this.$router.currentRoute.params;
      // this.$R3loading.show(customizedModuleName);
      this.loading = true;
      const fromdata = self.generateFromdata();
      const {
        data: { code, data, message }
      } = await self.service.financeCenter.savePayableAdjustment(fromdata);
      if (code === 0) {
        self.$Message.success(message || $i18n.t('modalTips.z9'));
        self.ID = data.objid;
        self.getPayableAdjustment();
      } else {
        // self.$Message.error(message || $i18n.t('modalTips.y0'));
      }
      // this.$R3loading.hide(customizedModuleName);
      this.loading = false
    }, // 保存方法

    async enterSave() {
      const self = this;
      const payableAdjustmentDO = Object.assign(self.formConfig.formValue);
      const payableAdjustmentItemDO = self.jordanTableConfig.data;

      const data = {
        AC_F_PAYABLE_ADJUSTMENT: payableAdjustmentDO,
        AC_F_PAYABLE_ADJUSTMENT_ITEM: payableAdjustmentItemDO
      };
      const res = await self.service.financeCenter.savePayableAdjustment(data);
      if (res.data.code === 0) {
        self.$Message.success(res.data.message || $i18n.t('modalTips.z9'));
      } else {
        // self.$Message.error(res.data.message || $i18n.t('modalTips.z3')); // '失败！'
      }
    },
    onSelectCancel(selection, row) {
      const selectArr = this.selectArr;
      for (let j = 0, len = selectArr.length; j < len; j++) {
        if (selectArr[j] === row.ID) {
          selectArr.splice(j, 1);
        }
      }
    },
    onSelect(selection, row) {
      this.selectArr.push(row.ID);
    }, // 表格取消勾选事件
    onSelectAllCancel() {
      this.selectArr = [];
    }, // 全选勾选事件
    onSelectAll() {
      const self = this;
      self.jordanTableConfig.data.forEach(item => {
        this.selectArr.push(item.ID);
      });
    }, // 全选选中事件
    calTableTable(tableArr) {
      const self = this;
      let truePrice = 0;
      let orderQty = 0;
      let payablePrice = 0;
      if (tableArr && tableArr.length > 0) {
        tableArr.forEach(tableItem => {
          truePrice += parseFloat(tableItem.TRUE_PRICE);
          payablePrice += parseFloat(tableItem.PAYABLE_PRICE);
          orderQty += tableItem.ORDER_QTY;
        });
      }
      setTimeout(() => {
        // 合计展示
        if (self.jordanTableConfig.total > 0) {
          self.jordanTableConfig.totalData = [
            {
              selection: '合计:',
              ORDER_QTY: orderQty,
              TRUE_PRICE: self.toFixed(truePrice, 2),
              PAYABLE_PRICE: self.toFixed(payablePrice, 2)
            }
          ];
        } else {
          self.jordanTableConfig.totalData = [{}];
        }
      }, 50);
      self.formConfig.formValue.PAYABLE_PRICE = self.toFixed(payablePrice, 2);
    },
    toFixed(data, val) {
      let numbers = '';
      // 保留几位小数后面添加几个0
      for (let i = 0; i < val; i++) {
        numbers += '0';
      }
      const s = 1 + numbers;
      // 如果是整数需要添加后面的0
      const spot = `.${numbers}`;
      // Math.round四舍五入
      //  parseFloat() 函数可解析一个字符串，并返回一个浮点数。
      let value = Math.round(parseFloat(data) * s) / s;
      // 从小数点后面进行分割
      const d = value.toString().split('.');
      if (d.length === 1) {
        value = value.toString() + spot;
        return value;
      }
      if (d.length > 1) {
        if (d[1].length < 2) {
          value = `${value.toString()}0`;
        }
        return value;
      }
      return value;
    },
    // 删除明细
    delTableDetail() {
      const selectArr = this.selectArr;
      const tableArr = this.allTableArr;
      const selection = [];
      // 判断是否有勾选明细
      if (selectArr.length === 0) {
        this.$Message.warning($i18n.t('modalTips.dj')); // '请选择明细后再点击删除!'
        return;
      }
      // 明细删除对应记录
      for (let i = tableArr.length - 1; i >= 0; i--) {
        for (let j = 0, len = selectArr.length; j < len; j++) {
          if (selectArr[j] === tableArr[i].ID) {
            selection.push(tableArr[i]);
            tableArr.splice(i, 1);
            break;
          }
        }
      }
      // 分页
      this.customPagingFun(tableArr, this.jordanTableConfig.pageSize, this.jordanTableConfig, 'jordanTableConfig');
      // 重置选中记录
      this.selectArr = [];
      // 新增明细表单回填记录
      this.addSelection = this.addSelection.concat(selection);
      this.detailAddTable.table.data = this.addSelection;
      this.calTableTable(this.jordanTableConfig.data);
    },
    // 新增明细
    addTableDetail() {
      this.detailAddTable.modal = true;
    },
    detailAddOnCancel(selection, row) {
      const selectArr = this.addDetailSelectArr;
      for (let j = 0, len = selectArr.length; j < len; j++) {
        if (selectArr[j] === row.ID) {
          selectArr.splice(j, 1);
        }
      }
    },
    detailAddOnSelect(selection, row) {
      this.addDetailSelectArr.push(row.ID);
    }, // 表格取消勾选事件
    detailAddOnSelectAllCancel() {
      this.addDetailSelectArr = [];
    }, // 全选勾选事件
    detailAddOnSelectAll() {
      const self = this;
      self.detailAddTable.table.data.forEach(item => {
        this.addDetailSelectArr.push(item.ID);
      });
    }, // 全选选中事件
    resetMainTable() {
      const selectArr = this.addDetailSelectArr;
      const tableArr = this.detailAddTable.table.data;
      const selection = [];
      // 确认后删除明细对应记录
      for (let i = tableArr.length - 1; i >= 0; i--) {
        for (let j = 0, len = selectArr.length; j < len; j++) {
          if (selectArr[j] === tableArr[i].ID) {
            selection.push(tableArr[i]);
            tableArr.splice(i, 1);
            break;
          }
        }
      }
      // 重置选中记录
      this.addDetailSelectArr = [];
      // 新增明细表单回填记录
      this.allTableArr = this.allTableArr.concat(selection);
      const mainTableArr = this.allTableArr;
      this.customPagingFun(mainTableArr, this.jordanTableConfig.pageSize, this.jordanTableConfig, 'jordanTableConfig');
      this.calTableTable(this.jordanTableConfig.data);
    },
    detailAddCancel() {},
    tableObjs(e, params) {
      const _this = this;
      _this.jordanTableConfig.data.forEach((item, index) => {
        if (params.index === index) {
          item.LOGICAL_STORE_NAME = e.valuedata;
          item.LOGICAL_STORE_ID = e.pid;
        }
      });
    }
  }
};
