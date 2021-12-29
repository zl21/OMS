import isFavoriteMixin from '@/assets/js/mixins/isFavorite';
import customPagingMixins from '@/assets/js/mixins/customPaging';
import buttonPermissionsMixin from '@/assets/js/mixins/buttonPermissions';
import publicMethodsUtil from '@/assets/js/public/publicMethods';

export default {
  components: {},
  mixins: [isFavoriteMixin, customPagingMixins, buttonPermissionsMixin],
  data() {
    return {
      caiShengModel: false,
      defaultColumn: 1,
      caiShengConfig: [
        {
          item: {
            type: 'Select', // 组件类型
            required: true,
            field: 'IS_RECEIVE_PAYMENT',
            label: '是否已收到赔付',
            with: "130px",
            props: {
              value: "1",
              options: [
                {
                  value: '0',
                  label: '否'
                },
                {
                  value: '1',
                  label: '是'
                },
              ]
            },
            event: {
              'on-change': (e) => {
                console.log(e);
              }
            }
          }
        },
        {
          item: {
            type: 'Input', // 组件类型
            required: false, // 是否必填
            field: 'REMARK',
            label: '备注',
            props: {
              value: '',
            }
          }
        }
      ],
      allTableArr: [],
      selectArr: [],
      // 弹框配置 导入
      importTable: {
        refFuns: 'confirmFun',
        confirmTitle: $it('mT.import'),
        titleAlign: 'left', // 设置标题是否居中 center left
        width: '600',
        scrollable: false, // 是否可以滚动
        closable: true, // 是否可以按esc关闭
        draggable: true, // 是否可以拖动
        mask: true, // 是否显示遮罩层
        maskClosable: true, // 是否可以点击叉号关闭
        transfer: true, // 是否将弹层放在body内
        name: 'importTable', // 组件名称
        url: $BC.Components.ImportTable,
        keepAlive: true,
        excludeString: 'importTable', // 将name传进去，确认不缓存
        componentData: {}
      },
      // 责任放 弹框配置
      responsibility: {
        title: '确认责任方',
        width: '432', // 控制窗口宽度
        visible: false, // 控制窗口 hidd || show
        footerHide: false, // 显示footer
        confirm: async () => {
          // 确 认
          // const actioveSelect = this.$refs.agtable.AGTABLE.getSelect();
          const formData = new FormData();
          formData.append('param', JSON.stringify({
            ids: this.selection.map(val => val.ID), // 选中的列表
            RESPONSIBLE_PARTY: this.responsibility.formConfig.formValue.RESPONSIBLE_PARTY // 责任方id
          }));
          const data = await this.service.financeCenter.confirmResponsibilityObjtct(formData);
          if (data.data.data.code !== null) {
            const mes = data.data.data.message;
            const messageName = data.data.data.code === 0 ? 'success' : 'error';
            this.$Message[messageName](mes);
          }
          this.responsibility.visible = false;
        },
        formConfig: {
          colSpan: 24,
          formValue: {},
          formData: [
            {
              label: '责任方',
              value: 'RESPONSIBLE_PARTY',
              style: 'select',
              options: [
                {
                  value: '1',
                  label: 'TP'
                },
                {
                  value: '2',
                  label: '快递仓储',
                },
                {
                  value: '3',
                  label: '客户',
                },
                {
                  value: '4',
                  label: '斯凯奇'
                },
                {
                  value: '5',
                  label: '其他'
                }
              ]
            }
          ]
        }, // 控制窗口 插槽内表单内容呈现
      },
      warningModal: false, // 警告弹框
      btnConfig: {
        typeAll: 'default', // 按钮统一风格样式
        buttons: [
          // {
          //   webname: 'lookup_yingfukuantiaozhengdan', // 查找
          //   disabled: false, // 按钮禁用控制
          //   btnclick: () => {
          //     this.find();
          //   } // 按钮点击事件
          // },
          {
            webname: 'Newlyadded_yingfukuantiaozhengdan', // 新增
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              this.$store.commit('customize/TabHref', {
                id: -1, // id
                type: 'action', // 类型action
                name: 'payableAdjustAdd', // 文件名
                // label: "赔付单新增", //tab中文名
                label: $it('丢件单新增'), // tab中文名
                query: Object.assign({
                  id: -1, // id
                  // tabTitle: "赔付单新增", //tab中文名
                  tabTitle: $it('丢件单新增') // tab中文名
                }) // 带的参数
              });
            } // 按钮点击事件
          },
          {
            webname: 'export_yingfukuantiaozhengdan', // 导出
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              this.exportClick();
            } // 按钮点击事件
          },
          {
            webname: 'Tovoid_yingfukuantiaozhengdan', // 作废
            text: $it('btn.void'), // 按钮文本
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              this.invalid();
            } // 按钮点击事件
          },
          {
            webname: 'AcFPayableAdjustmentBizAuditListCmd', // 财审
            text: "业审", // 按钮文本
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              this.yeShen();
            } // 按钮点击事件
          },
          {
            webname: 'Financialtrial_yingfukuantiaozhengdan', // 财审
            text: $it('btn.financeAudit'), // 按钮文本
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              this.fiAudit();
            } // 按钮点击事件
          },
          {
            webname: 'Guesttrial_yingfukuantiaozhengdan', // 客审
            text: $it('btn.custAudit'), // 按钮文本
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              this.custAudit();
            } // 按钮点击事件
          },
          {
            webname: 'AcReceivableAdjustmentUnAuditCwListCmd01', // 反客审
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              this.unCustAudit();
            } // 按钮点击事件
          },
          {
            webname: 'OmsPayableAdjustmentConfirmResponsiblePartyCmd', // 确认责任方
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              this.responsibility.formConfig.formValue = {}; // 清空
              this.responsibility.visible = true;
            }, // 按钮点击事件
          },
          {
            icon: 'iconfont iconbj_col', // 按钮图标
            webname: 'isFavorite', // 必须写，用于匹配框架的收藏功能（作为key替换掉之前的中文判断）
            size: 'small', // 按钮大小
            name: $it('btn.collection'), // 收藏
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              const _this = this;
              _this.setFavorite();
            } // 按钮点击事件
          }
        ]
      }, // 按钮数据
      formConfig: {
        btn: {
          buttons: [
            {
              text: $it('btn.find'), // 查找
              webname: 'lookup_tuihuanhuo',
              type: 'error',
              disabled: false, // 按钮禁用控制
              btnclick: () => {
                this.find();
              } // 按钮点击事件
            },
            {
              text: $it('btn.reset'), // 重置
              webname: 'lookup_chongzhi',
              disabled: false, // 按钮禁用控制
              btnclick: () => {
              } // 按钮点击事件
            },
          ]
        },
        iconSite: 'bottomCenter',
        // setColnum: 4, // 4列
        // setRow: 3, // 3行
        formData: [
          {
            style: 'input', // 文本录入
            label: $it('fL.billNo'), // 单据编号
            value: 'BILL_NO',
            width: '6'
          },
          {
            style: 'input', // 文本录入
            label: $it('fL.platform_billNo'), // 平台单号
            value: 'TID',
            width: '6'
          },
          {
            style: 'select', // 下拉框类型
            label: $it('fL.billStatus'), // 单据状态
            width: '6', // 所占宽度宽度
            value: 'BILL_STATUS', // 输入框的值
            multiple: true,
            options: [
              {
                label: $it('com.unAudit'), // 未审核
                value: '1'
              },
              {
                label: $it('com.custAudited'), // 已客审
                value: '2'
              },
              {
                label: '已业审', // 已业审
                value: '3'
              },
              {
                label: $it('com.financeAudited'), // 已财审
                value: '4'
              },
              {
                label: $it('com.voided'), // 已作废
                value: '5'
              }
            ]
          },
          {
            style: 'input',
            label: $it('fL.source_billNo'), // 来源单据编号
            value: 'ORDER_NO',
            width: '6'
          },
          {
            style: 'popInputPlus', // 输入框弹框单多选
            width: '6',
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
              name: $it('fL.physicalWarehouseName'), // 实体仓名称
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
            }
          },
          {
            style: 'popInputPlus', // 输入框弹框单多选
            width: '6',
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
              name: $it('fL.expressCompanyName'), // 快递公司名称
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
            }
          },
          {
            style: 'popInputPlus', // 输入框弹框单多选
            width: '6',
            itemdata: {
              col: 1,
              colid: 170011,
              colname: 'PS_C_SKU_ID', // 当前字段的名称
              datelimit: 'all',
              display: 'text', // 显示什么类型，例如xml表示弹窗多选加导入功能，mrp表示下拉多选
              fkdisplay: 'drp', // 外键关联类型
              fkdesc: '商品条码',
              inputname: 'ECODE', // 这个是做中文类型的模糊查询字段，例如ENAME
              isfk: true, // 是否有fk键
              isnotnull: false, // 是否必填
              isuppercase: false, // 是否转大写
              length: 65535, // 最大长度是多少
              name: $it('fL.commodityCode'), // 商品条码
              readonly: false, // 是否可编辑，对应input   readonly属性
              reftable: 'PS_C_SKU', // 对应的表
              row: 1,
              statsize: -1,
              type: 'STRING', // 这个是后台用的
              valuedata: '', // 这个是选择的值
              pid: ''
            },
            oneObj: val => {
              this.formConfig.formValue.PS_C_SKU_ID = val.pid;
              this.formConfig.formValue.PS_C_SKU_ECODE = val.valuedata;
            }
          },
          {
            style: 'input', // 文本录入
            label: $it('fL.gBCode'), // 国标码
            value: 'GBCODE',
            width: '6'
          },
          {
            style: 'select', // 下拉框类型
            label: $it('fL.adjustmentType'), // 调整类型
            width: '6', // 所占宽度宽度
            value: 'ADJUST_TYPE', // 输入框的值
            multiple: true,
            options: [
              // 下拉框选项值
            ]
          },
          {
            style: 'select', // 下拉框类型
            label: $it('fL.billType'), // 单据类型
            width: '6', // 所占宽度宽度
            value: 'BILL_TYPE', // 输入框的值
            multiple: true,
            options: [
              // 下拉框选项值
            ]
          },
          {
            style: 'select', // 下拉框类型
            label: $it('fL.channelType'), // 渠道类型
            width: '6', // 所占宽度宽度
            value: 'RESERVE_BIGINT01', // 输入框的值
            multiple: true,
            options: [
              // 下拉框选项值
            ]
          },
          {
            style: 'date',
            type: 'datetimerange',
            label: $it('fL.creationDate'), // 创建日期
            width: '6',
            value: 'CREATIONDATE',
            format: 'yyyy-MM-dd HH:mm:ss', // 格式参照burgeonui
            placeholder: '',
            clearable: '' // 是否显示清空按钮,默认为true   false
          },
          {
            style: 'date',
            type: 'datetimerange',
            label: $it('fL.custAuditDate'), // 客审日期
            width: '6',
            value: 'GUEST_TRIAL_TIME',
            format: 'yyyy-MM-dd HH:mm:ss', // 格式参照burgeonui
            placeholder: '',
            clearable: '' // 是否显示清空按钮,默认为true   false
          },
          {
            style: 'date',
            type: 'datetimerange',
            label: $it('fL.financeAuditDate'), // 财审日期
            width: '6',
            value: 'FINANCIAL_TRIAL_TIME',
            format: 'yyyy-MM-dd HH:mm:ss', // 格式参照burgeonui
            placeholder: '',
            clearable: '' // 是否显示清空按钮,默认为true   false
          },
          {
            style: 'select', // 下拉框类型
            label: '责任方', // 责任方
            width: '6', // 所占宽度宽度
            value: 'RESPONSIBLE_PARTY', // 输入框的值
            multiple: true,
            options: [
              // 下拉框选项值
            ]
          },
          {
            style: 'input', // 下拉框类型
            label: '责任人', // 责任方
            width: '6', // 所占宽度宽度
            value: 'RESPONSIBLE_PERSON', // 输入框的值
            multiple: true
          },
          {
            style: 'select', // 下拉框类型
            label: '是否已收到赔付', // 是否已收到赔付
            width: '6', // 所占宽度宽度
            value: 'IS_RECEIVE_PAYMENT', // 输入框的值
            options: [
              {
                value: '-1',
                label: '全部'
              },
              {
                value: '0',
                label: '否'
              },
              {
                value: '1',
                label: '是'
              },
            ]
          },
          {
            style: 'select', // 下拉框类型
            label: '传DRP状态', // 传DRP状态
            width: '6', // 所占宽度宽度
            value: 'TO_DRP_STATUS', // 输入框的值
            multiple: true,
            options: []
          }
        ],
        formValue: {},
        flodClick(v) {
        }
      }, // form表单
      labelList: [
        {
          label: $it('pL.all'), // 全部
          value: '1',
          isShow: true
        }
      ], // tab切换
      labelDefaultValue: '1',

      agTableConfig: {
        loading: false,
        isIndex: true, // 如果要自定义序号，则将此key的值设置为true，而后自己定义序号生成器，可参考promotionlist.vue
        pageShow: true,
        tableHeight: '412px',
        columnDefs: [
          {
            headerName: $it('fL.billStatus'), // 单据状态
            field: 'BILL_STATUS_NAME'
          },
          {
            headerName: $it('fL.billNo'), // 单据编号
            field: 'BILL_NO'
          },
          {
            headerName: $it('fL.platform_billNo'), // 平台单号
            field: 'TID'
          },
          {
            headerName: $it('fL.billType'), // 单据类型
            field: 'BILL_TYPE_NAME'
          },
          {
            headerName: $it('fL.adjustmentType'), // 调整类型
            field: 'ADJUST_TYPE_NAME'
          },
          {
            headerName: $it('tL.shopName'), // 店铺名称
            field: 'CP_C_SHOP_TITLE'
          },
          {
            headerName: $it('tL.physicalWarehouse'), // 实体仓
            field: 'CP_C_PHY_WAREHOUSE_ENAME'
          },
          {
            headerName: $it('tL.compensation_expressCompany'), // 赔付快递公司
            field: 'CP_C_LOGISTICS_ENAME'
          },
          {
            headerName: $it('tL.expressNo'), // 快递单号
            field: 'LOGISTICS_NO'
          },
          {
            headerName: $it('tL.total_amountDue'), // 总应付金额
            field: 'PAYABLE_PRICE'
          },
          {
            headerName: $it('tL.paymentWay'), // 支付方式
            field: 'PAY_TYPE_NAME'
          },
          {
            headerName: $it('tL.remarks'), // 备注
            field: 'REMARK'
          },
          {
            headerName: $it('fL.source_billNo'), // 来源单据编号
            field: 'ORDER_NO'
          },
          {
            headerName: $it('tL.custTelephone'), // 顾客电话
            field: 'CUSTOMER_TEL'
          },
          {
            headerName: $it('tL.custName'), // 顾客姓名
            field: 'CUSTOMER_NAME'
          },
          {
            headerName: $it('tL.alipay'), // 支付宝号
            field: 'ALIPAY_ACCOUNT'
          },
          {
            headerName: $it('tL.vip_nickname'), // 会员昵称
            field: 'CUSTOMER_NICK'
          },
          {
            headerName: $it('tL.paymentTime'), // 付款时间
            field: 'PAY_TIME'
          },
          {
            headerName: $it('tL.creationTime'), // 创建时间
            field: 'CREATIONDATE'
          },
          {
            headerName: $it('tL.creator'), // 创建人
            field: 'OWNERENAME'
          },
          {
            headerName: $it('tL.modificationTime'), // 修改时间
            field: 'MODIFIEDDATE'
          },
          {
            headerName: $it('tL.reviser'), // 修改人
            field: 'MODIFIERENAME'
          },
          {
            headerName: $it('tL.custAuditTime'), // 客审时间
            field: 'GUEST_TRIAL_TIME'
          },
          {
            headerName: $it('tL.custAuditMan'), // 客审人
            field: 'GUEST_TRIAL_ENAME'
          },
          {
            headerName: $it('tL.financeAuditTime'), // 财审时间
            field: 'FINANCIAL_TRIAL_TIME'
          },
          {
            headerName: $it('tL.financeAuditMan'), // 财审人
            field: 'FINANCIAL_TRIAL_ENAME'
          },
          {
            headerName: $it('tL.voidTime'), // 作废时间
            field: 'DEL_TIME'
          },
          {
            headerName: $it('tL.voidMan'), // 作废人
            field: 'DELENAME'
          },
          {
            headerName: $it('tL.usable'), // 可用
            field: 'ISACTIVE'
          },
          {
            headerName: '传DRP状态', // 责任方
            field: 'TO_DRP_STATUS_ENAME'
          },
          {
            headerName: '责任方', // 责任方
            field: 'RESPONSIBLE_PARTY_NAME'
          },
          {
            headerName: '责任人', // 责任人
            field: 'RESPONSIBLE_PERSON'
          },
          {
            headerName: '原因备注', // 原因备注
            field: 'REASON_REMARK'
          }
        ],
        rowData: [],
        renderParams: (cellData) => {
          if (cellData.field == 'ACTION_LOG') {
            return {
              renderContainer: 'CellRenderByFunction',
              renderComponent: (h, params) => {
                if (!params.data.ACTION_LOG) return;
                const resultElement = document.createElement('div');
                const iTag = document.createElement('div');
                iTag.style.color = '#0f8ee9';
                iTag.style.textDecoration = 'underline';
                iTag.innerText = params.data.ACTION_LOG;
                iTag.style.cursor = 'pointer';
                iTag.onclick = () => {
                  this.viewLog(params.data);
                };
                resultElement.appendChild(iTag);
              }
            }
          }
        },
        pagenation: $omsUtils.pageConfig
      }, // 全部
      options: {
        rowHeight: 40,
        getRowClass: this.getRowClass, // 改变行颜色
        // onColumnResized: this.onColumnResized, // aG列宽改变回调
        // getMainMenuItems: this.getMainMenuItems, // 重置所有列位置信息
        datas: {},
        floatingFilter: true
      },
      // returnSelectData: [], // 列表选中数据
      isShowFromLoading: false,
      statusTab: '', // 单据类型
      formOptions: {}
    };
  },
  activated() {
    // 获取默认数据
    this.agTableConfig.pagenation.current = 1;
    this.getList();

    // 计算高度 通过设置节点 'totalHeight'
    // $omsUtils.setTableHeight(this, 50);
    // 检测屏幕变化 设置高度 重新渲染agTabe
    // $omsUtils.onresizes(this, 10);
  },
  created() {
    this.agTableConfig.columnDefs.forEach((item) => {
      item.isagfilter = true
    })
    const self = this;
    self.getSelectData();
  },
  mounted() {
    this.$nextTick(() => {
      this.getPermissions('btnConfig', 'payableAdjustmentList');
    });
    const _this = this;
    window.addEventListener('keydown', e => {
      const key = e.keyCode;
      if (key === 13 && _this.warningModal) {
        _this.warningOk();
      } else if (key === 27) {
        _this.warningModal = false;
      }
    });
    this.getList();
  },
  methods: {
    colPinned() { },
    colMoved() { },
    onSelectionChange(e) {
      this.selection = e;
    },
    getRowClass(params) {
      const { data: { BILL_STATUS } } = params; // 获取行索引
      if (BILL_STATUS === 5) {
        // 已作废
        return 'gray';
      }
      if (BILL_STATUS === 3 || BILL_STATUS === 4) {
        // 已业审 已财审
        return 'blue';
      }
      // 未审核 #323233
      return 'grey1';
    },
    async caiShengModelok() {
      const { IS_RECEIVE_PAYMENT, REMARK } = this.$refs.caiShengref.formData;
      const self = this;
      let ids = [];
      //  self.selection = self.$refs.agtable.AGTABLE.getSelect();
      this.selection.forEach(item => {
        ids.push(item.ID);
      });

      const param = {
        ids,
        IS_RECEIVE_PAYMENT,
        REMARK
      };

      const formdata = new FormData();
      formdata.append('param', JSON.stringify(param));

      const {
        data: { data }
      } = await this.service.financeCenter.fiAuditPayableAdjustment(formdata);
      if (data.code === 0) {
        self.$Message.success(data.message);
        self.getList();
      } else {
        self.$Message.error(data.message);
      }
      this.$refs.caiShengref.reset();
    },
    // 填充下拉选项框
    async getSelectData() {
      const self = this;
      // const arrBillType = await this.getColOption(
      //   'AC_F_PAYABLE_ADJUSTMENT',
      //   // "基本信息",
      //   $it('com.baseInformation'),
      //   'BILL_TYPE'
      // );
      // const arrAdjustType = await this.getColOption(
      //   'AC_F_PAYABLE_ADJUSTMENT',
      //   // "基本信息",
      //   $it('com.baseInformation'),
      //   'ADJUST_TYPE'
      // );
      // const arrChannel = await this.getColOption(
      //   'AC_F_PAYABLE_ADJUSTMENT',
      //   // "基本信息",
      //   $it('com.baseInformation'),
      //   'RESERVE_BIGINT01'
      // );
      // // 责任方窗口options
      // const arrResponsibility = await this.getColOption(
      //   'AC_F_PAYABLE_ADJUSTMENT',
      //   // "基本信息",
      //   $it('com.baseInformation'),
      //   'RESPONSIBLE_PARTY'
      // );
      const formOptions = await this.getColOption(
        'AC_F_PAYABLE_ADJUSTMENT',
        $it('com.baseInformation'),
        ['BILL_TYPE', 'ADJUST_TYPE', 'RESERVE_BIGINT01', 'RESPONSIBLE_PARTY', 'TO_DRP_STATUS']
      );
      this.formOptions = formOptions;
      self.formConfig.formData.forEach(item => {
        switch (item.value) {
          case 'BILL_TYPE':
            item.options = formOptions.list.BILL_TYPE;
            break;
          case 'ADJUST_TYPE':
            item.options = formOptions.list.ADJUST_TYPE;
            break;
          case 'RESERVE_BIGINT01':
            item.options = formOptions.list.RESERVE_BIGINT01;
            break;
          case 'RESPONSIBLE_PARTY':
            // 责任方
            item.options = formOptions.list.RESPONSIBLE_PARTY;
            break;
          case 'TO_DRP_STATUS':
            // 传DRP状态
            item.options = formOptions.list.TO_DRP_STATUS;
            break;
        }
      });
      self.responsibility.formConfig.formData.forEach((item) => {
        if (item.value === 'RESPONSIBLE_PARTY') {
          // 确认责任方 Select options 赋值
          item.options = formOptions.list.RESPONSIBLE_PARTY;
        }
      });
    },
    async getColOption(tableName, parentColName, childColName) {
      const fromdata = new FormData();
      fromdata.append('table', tableName);
      fromdata.append('objid', -1);
      return new Promise(async resolve => {
        let optionData = [];
        let selectData = [];
        const valueObject = {};
        const res = await this.service.common.getObject(fromdata);
        if (res.data.data) {
          selectData = res.data.data.addcolums;
          selectData.forEach(item => {
            if (item.parentdesc === parentColName) {
              const childItem = item.childs;
              childItem.forEach(item => {
                if (childColName.includes(item.colname)) {
                  valueObject[item.colname] = {};
                  optionData[item.colname] = item.combobox.map(subItem => {
                    valueObject[item.colname][subItem.limitval] = subItem.limitdesc;
                    return {
                      label: subItem.limitdesc,
                      value: subItem.limitval
                    };
                  });
                }
              });
            } else if (item.child.colname === childColName[4]) {
              const colname = item.child.colname;
              // 因为传drp状态不在接口的基础信息里面
              valueObject[colname] = {};
              optionData[colname] = item.child.combobox.map(subItem => {
                valueObject[colname][subItem.limitval] = subItem.limitdesc;
                return {
                  label: subItem.limitdesc,
                  value: subItem.limitval
                };
              });
            }
          });
        }
        resolve({
          list: optionData,
          valueObject
        });
      });
    },
    // 查找
    find() {
      this.agTableConfig.pagenation.current = 1;
      this.getList();
    },
    async invalid() {
      const self = this;
      // self.selection = self.$refs.agtable.AGTABLE.getSelect();
      const ids = [];
      this.selection.forEach(item => {
        ids.push(item.ID);
      });
      const param = {
        objids: ids
      };
      const formdata = new FormData();
      formdata.append('param', JSON.stringify(param));
      const res = await this.service.common.voidPayableAdjustment(formdata);
      if (res.data.data.code === 0) {
        self.$Message.success(res.data.data.message);
        self.getList();
      } else {
        self.$Message.error(res.data.data.message);
      }
    },
    // 财审
    async fiAudit() {
      const self = this;
      let ids = [];
      // self.selection = self.$refs.agtable.AGTABLE.getSelect();
      this.selection.forEach(item => {
        ids.push(item.ID);
      });
      if (ids.length == 0) {
        self.$Message.error('请选着一条数据！');
        return;
      }
      this.caiShengModel = true;
    },
    // 业审
    async yeShen() {
      const self = this;
      const formdata = self.generateAuditFromdata();
      // 接口
      const {
        data: { data }
      } = await this.service.financeCenter.bizAuditPayableAdjustment(formdata);
      if (data.code === 0) {
        self.$Message.success(data.message);
        self.getList();
      } else {
        self.$Message.error(data.message);
      }
    },
    // 客审
    async custAudit() {
      const self = this;
      const formdata = self.generateAuditFromdata();
      // 接口
      const {
        data: { data }
      } = await this.service.financeCenter.auditPayableAdjustment(formdata);
      if (data.code === 0) {
        self.$Message.success(data.message);
        self.getList();
      } else {
        self.$Message.error(data.message);
      }
    },
    // 反客审
    async unCustAudit() {
      const self = this;
      const formdata = self.generateAuditFromdata();
      // 接口
      const {
        data: { data }
      } = await this.service.financeCenter.cancelAuditPayableAdjustment(formdata);
      if (data.code === 0) {
        self.$Message.success($it('tip.z1')); // 反客审成功!
        self.getList();
      } else {
        self.$Message.error(data.message);
      }
    },
    generateAuditFromdata() {
      const ids = [];
      const self = this;
      // self.selection = self.$refs.agtable.AGTABLE.getSelect();
      this.selection.forEach(item => {
        ids.push(item.ID);
      });
      const param = {
        ids
      };
      const formdata = new FormData();
      formdata.append('param', JSON.stringify(param));
      return formdata;
    },
    // 获取列表数据
    async getList() {
      const _this = this;
      if (_this.agTableConfig.loading) {
        return;
      }
      _this.agTableConfig.rowData = [];
      _this.agTableConfig.pagenation.total = 0;
      _this.agTableConfig.loading = true;

      const mainData = _this.formConfig.formValue;
      let creationdateStart = '';
      let creationdateEnd = '';
      let guestTrialTimeStart = '';
      let guestTrialTimeEnd = '';
      let financialTrialTimeStart = '';
      let financialTrialTimeEnd = '';
      if (mainData.CREATIONDATE && mainData.CREATIONDATE.length > 0) {
        creationdateStart = mainData.CREATIONDATE[0];
        creationdateEnd = mainData.CREATIONDATE[1];
      }
      if (mainData.GUEST_TRIAL_TIME && mainData.GUEST_TRIAL_TIME.length > 0) {
        guestTrialTimeStart = mainData.GUEST_TRIAL_TIME[0];
        guestTrialTimeEnd = mainData.GUEST_TRIAL_TIME[1];
      }
      if (mainData.FINANCIAL_TRIAL_TIME && mainData.FINANCIAL_TRIAL_TIME.length > 0) {
        financialTrialTimeStart = mainData.FINANCIAL_TRIAL_TIME[0];
        financialTrialTimeEnd = mainData.FINANCIAL_TRIAL_TIME[1];
      }

      const whereInfoForm = {
        CREATIONDATE_START: creationdateStart,
        CREATIONDATE_END: creationdateEnd,
        GUEST_TRIAL_TIME_START: guestTrialTimeStart,
        GUEST_TRIAL_TIME_END: guestTrialTimeEnd,
        FINANCIAL_TRIAL_TIME_START: financialTrialTimeStart,
        FINANCIAL_TRIAL_TIME_END: financialTrialTimeEnd,
        ADJUST_TYPE: mainData.ADJUST_TYPE,
        BILL_TYPE: mainData.BILL_TYPE,
        PS_C_SKU_ID: mainData.PS_C_SKU_ID,
        PS_C_SKU_ECODE: mainData.PS_C_SKU_ECODE,
        CP_C_LOGISTICS_ID: mainData.CP_C_LOGISTICS_ID,
        CP_C_LOGISTICS_ENAME: mainData.CP_C_LOGISTICS_ENAME,
        CP_C_PHY_WAREHOUSE_ID: mainData.CP_C_PHY_WAREHOUSE_ID,
        CP_C_PHY_WAREHOUSE_ENAME: mainData.CP_C_PHY_WAREHOUSE_ENAME,
        BILL_NO: mainData.BILL_NO,
        TID: mainData.TID,
        BILL_STATUS: mainData.BILL_STATUS,
        ORDER_NO: mainData.ORDER_NO,
        GBCODE: mainData.GBCODE,
        RESERVE_BIGINT01: mainData.RESERVE_BIGINT01,
        RESPONSIBLE_PARTY: mainData.RESPONSIBLE_PARTY,
        RESPONSIBLE_PERSON: mainData.RESPONSIBLE_PERSON,
        TO_DRP_STATUS: mainData.TO_DRP_STATUS,
      };

      if (mainData.IS_RECEIVE_PAYMENT != '-1') { // 增加是否已收到赔付查询条件
        whereInfoForm.IS_RECEIVE_PAYMENT = mainData.IS_RECEIVE_PAYMENT;
      }

      const param = {
        whereInfo: whereInfoForm,
        pageNum: _this.agTableConfig.pagenation.current,
        pageSize: _this.agTableConfig.pagenation.pageSize
      };
      const fromdata = new FormData();
      fromdata.append('param', JSON.stringify(param));
      // 接口
      const {
        data: { code, data, message }
      } = await this.service.financeCenter.getPayableAdjustmentList(fromdata);
      _this.agTableConfig.loading = false;
      _this.returnSelectData = [];
      if (code === 0 && data.payableAdjustmentList.length) {
        // Table表单赋值
        // 过滤不需要展示的模糊搜索项
        _this.allTableArr = data.payableAdjustmentList.map(item => ({
          ID: item.ID,
          BILL_STATUS: item.BILL_STATUS,
          BILL_STATUS_NAME: item.BILL_STATUS_NAME,
          BILL_NO: item.BILL_NO,
          TID: item.TID,
          BILL_TYPE: item.BILL_TYPE,
          BILL_TYPE_NAME: item.BILL_TYPE_NAME,
          ADJUST_TYPE_NAME: item.ADJUST_TYPE_NAME,
          CP_C_SHOP_TITLE: item.CP_C_SHOP_TITLE,
          CP_C_PHY_WAREHOUSE_ENAME: item.CP_C_PHY_WAREHOUSE_ENAME,
          CP_C_LOGISTICS_ENAME: item.CP_C_LOGISTICS_ENAME,
          LOGISTICS_NO: item.LOGISTICS_NO,
          PAYABLE_PRICE: item.PAYABLE_PRICE,
          PAY_TYPE: item.PAY_TYPE,
          PAY_TYPE_NAME: item.PAY_TYPE_NAME,
          REMARK: item.REMARK,
          ORDER_NO: item.ORDER_NO,
          CUSTOMER_TEL: item.CUSTOMER_TEL,
          CUSTOMER_NAME: item.CUSTOMER_NAME,
          ALIPAY_ACCOUNT: item.ALIPAY_ACCOUNT,
          CUSTOMER_NICK: item.CUSTOMER_NICK,
          OWNERENAME: item.OWNERENAME,
          FINANCIAL_TRIAL_ENAME: item.FINANCIAL_TRIAL_ENAME,
          MODIFIERENAME: item.MODIFIERENAME,
          GUEST_TRIAL_ENAME: item.GUEST_TRIAL_ENAME,
          DELENAME: item.DELENAME,
          ISACTIVE: item.ISACTIVE === 'Y' ? '是' : '否',
          TO_DRP_STATUS_ENAME: this.formOptions.valueObject.TO_DRP_STATUS[item.TO_DRP_STATUS],
          CREATIONDATE: item.CREATIONDATE ? publicMethodsUtil.DatesTime(item.CREATIONDATE) : '',
          PAY_TIME: item.PAY_TIME ? publicMethodsUtil.DatesTime(item.PAY_TIME) : '',
          MODIFIEDDATE: item.MODIFIEDDATE ? publicMethodsUtil.DatesTime(item.MODIFIEDDATE) : '',
          GUEST_TRIAL_TIME: item.GUEST_TRIAL_TIME ? publicMethodsUtil.DatesTime(item.GUEST_TRIAL_TIME) : '',
          FINANCIAL_TRIAL_TIME: item.FINANCIAL_TRIAL_TIME ? publicMethodsUtil.DatesTime(item.FINANCIAL_TRIAL_TIME) : '',
          DEL_TIME: item.DEL_TIME ? publicMethodsUtil.DatesTime(item.DEL_TIME) : '',
          RESPONSIBLE_PARTY_NAME: item.RESPONSIBLE_PARTY_NAME,
          RESPONSIBLE_PERSON: item.RESPONSIBLE_PERSON,
          REASON_REMARK: item.REASON_REMARK
        }));

        _this.agTableConfig.pagenation.total = data.page.totalSize;
        _this.agTableConfig.rowData = _this.allTableArr;
      } else {
        _this.agTableConfig.rowData = [];
        _this.agTableConfig.pagenation.total = 0;
        console.log(message);
        // _this.$Message.warning(message);
      }
      this.agTableConfig.columnDefs = [...this.agTableConfig.columnDefs];
      // this.$refs.agtable.agGridTable(this.agTableConfig.columnDefs, this.agTableConfig.rowData, this.getExtendObj());
    },
    // 双击时触发
    onRowDblclick(row) {
      this.$store.commit('customize/TabHref', {
        id: row.ID, // 单据id
        type: 'action', // 类型action
        name: 'payableAdjustAdd', // 文件名
        label: '丢件单详情', // 赔付单详情
        query: Object.assign({
          id: row.ID, // 单据id
          tabTitle: '丢件单详情' // 赔付单详情
        }) // 带的参数
      });
    },
    // 分页change 事件
    pageChange(val) {
      this.selectArr = [];
      this.agTableConfig.pagenation.current = val;
      this.getList();
    },
    // 切换分页条数
    pageSizeChange(val) {
      this.selectArr = [];
      this.agTableConfig.pagenation.pageSize = val;
    },
    getExtendObj() {
      /**
       * BILL_STATUS: 4，BILL_STATUS_NAME: "已作废"。
       * BILL_STATUS: 1，BILL_STATUS_NAME: "未审核"。
       * BILL_STATUS: 2，BILL_STATUS_NAME: "已客审"。
       * BILL_STATUS: 3，BILL_STATUS_NAME: "已财审"。
       * */
      return {
        getRowStyle(params) {
          // console.log("params :>> ", params);
          // 设置行样式
          if (params.data.BILL_STATUS === 5) {
            // 已作废
            return { color: 'gray' };
          }
          if (params.data.BILL_STATUS === 4) {
            // 已财审
            return { color: 'blue' };
          }
          if (params.data.BILL_STATUS === 3) {
            // 已业审
            return { color: 'blue' };
          }
          // 未审核
          return { color: '#323233' };
        }
      };
    },
    // 导入
    returnExport() { },
    // 导出
    returnImport() { },
    // 设置表格高度
    // setTableHeight() {
    //   const _this = this;
    //   const contentHeight = document.getElementById('content').clientHeight;
    //   let returnHeight = 25;
    //   returnHeight += document.getElementsByClassName('returnBtn')[0]
    //     .clientHeight;
    //   returnHeight += document.getElementsByClassName('returnForm')[0]
    //     .clientHeight;
    //   const tableHeight = contentHeight - returnHeight;
    //   _this.agTableConfig.height = tableHeight - 130;
    // },
    // 导出
    async exportClick() {
      const _this = this;
      // _this.selection = _this.$refs.agtable.AGTABLE.getSelect();
      // console.log('selection', _this.selection);
      if (_this.selection.length) {
        const ids = [];
        for (let i = 0; i < _this.selection.length; i++) {
          ids.push(_this.selection[i].ID);
        }
        const idList = { idList: ids };
        const {
          data: { code, data, message }
        } = await this.service.common.exportPayableAdjustment(idList);
        if (code === 0 && data !== null) {
          const mes = message || $it('tip.z2'); // 导出成功！
          _this.$Message.success(mes);
          publicMethodsUtil.downloadUrlFile(data);
        } else {
          // const err = message || $it('tip.z3'); // 失败！
          // _this.$Message.error(err);
        }
      } else {
        if (_this.agTableConfig.rowData.length === 0) {
          _this.$Message.error($it('tip.z4')); // 列表没有数据,无法导出!
          return;
        }
        _this.warningModal = true;
      }
    },
    // 警告框确认
    async warningOk() {
      const _this = this;
      _this.agTableConfig.loading = true;
      const mainData = _this.formConfig.formValue;
      let creationdateStart = '';
      let creationdateEnd = '';
      let guestTrialTimeStart = '';
      let guestTrialTimeEnd = '';
      let financialTrialTimeStart = '';
      let financialTrialTimeEnd = '';
      if (mainData.CREATIONDATE && mainData.CREATIONDATE.length > 0) {
        creationdateStart = mainData.CREATIONDATE[0];
        creationdateEnd = mainData.CREATIONDATE[1];
      }
      if (mainData.GUEST_TRIAL_TIME && mainData.GUEST_TRIAL_TIME.length > 0) {
        guestTrialTimeStart = mainData.GUEST_TRIAL_TIME[0];
        guestTrialTimeEnd = mainData.GUEST_TRIAL_TIME[1];
      }
      if (mainData.FINANCIAL_TRIAL_TIME && mainData.FINANCIAL_TRIAL_TIME.length > 0) {
        financialTrialTimeStart = mainData.FINANCIAL_TRIAL_TIME[0];
        financialTrialTimeEnd = mainData.FINANCIAL_TRIAL_TIME[1];
      }
      const param = {
        start: _this.agTableConfig.pagenation.current,
        count: 999999,
        CREATIONDATE_START: creationdateStart,
        CREATIONDATE_END: creationdateEnd,
        GUEST_TRIAL_TIME_START: guestTrialTimeStart,
        GUEST_TRIAL_TIME_END: guestTrialTimeEnd,
        FINANCIAL_TRIAL_TIME_START: financialTrialTimeStart,
        FINANCIAL_TRIAL_TIME_END: financialTrialTimeEnd,
        ADJUST_TYPE: mainData.ADJUST_TYPE,
        BILL_TYPE: mainData.BILL_TYPE,
        PS_C_SKU_ID: mainData.PS_C_SKU_ID,
        PS_C_SKU_ECODE: mainData.PS_C_SKU_ECODE,
        CP_C_LOGISTICS_ID: mainData.CP_C_LOGISTICS_ID,
        CP_C_LOGISTICS_ENAME: mainData.CP_C_LOGISTICS_ENAME,
        CP_C_PHY_WAREHOUSE_ID: mainData.CP_C_PHY_WAREHOUSE_ID,
        CP_C_PHY_WAREHOUSE_ENAME: mainData.CP_C_PHY_WAREHOUSE_ENAME,
        BILL_NO: mainData.BILL_NO,
        TID: mainData.TID,
        BILL_STATUS: mainData.BILL_STATUS,
        ORDER_NO: mainData.ORDER_NO,
        RESERVE_BIGINT01: mainData.RESERVE_BIGINT01
      };
      const {
        data: { code, data, message }
      } = await this.service.common.exportPayableAdjustment(param);
      if (code === 0 && data !== null) {
        const mes = message || $it('tip.z2'); // 导出成功！
        _this.$Message.success(mes);
        publicMethodsUtil.downloadUrlFile(data);
      } else {
        // const err = message || $it('tip.z3'); // 失败！
        // _this.$Message.error(err);
      }
      _this.agTableConfig.loading = false;
    }
  },
  destroyed() {
    window.removeEventListener('keydown', this, false);
  }
};
