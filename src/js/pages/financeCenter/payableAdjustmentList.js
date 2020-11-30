import businessButton from 'professionalComponents/businessButton';
import businessForm from 'professionalComponents/businessForm';
import businessLabel from 'professionalComponents/businessLabel';
import aTable from 'professionalComponents/agGridTable.vue';
import businessDialog from 'professionalComponents/businessDialog';
// import axios from 'axios';
// import { debug, debuglog } from 'util';
import { isFavoriteMixin } from '@/assets/js/mixins/isFavorite';
import publicMethodsUtil from '@/assets/js/public/publicMethods';
import { customPagingMixins } from '@/assets/js/mixins/customPaging.js';
import { buttonPermissionsMixin } from '@/assets/js/mixins/buttonPermissions';
import loading from '@/component/loading.vue';
import comUtils from '@/assets/js/__utils__/common.js';

// 表头的基本配置
// const baseColumnDefs = [
//   {
//     headerName: '单据状态',
//     field: 'BILL_STATUS_NAME',
//   },
//   {
//     headerName: '单据编号',
//     field: 'BILL_NO',
//   },
//   {
//     headerName: '平台单号',
//     field: 'TID',
//   },
//   {
//     headerName: '单据类型',
//     field: 'BILL_TYPE_NAME',
//   },
//   {
//     headerName: '调整类型',
//     field: 'ADJUST_TYPE_NAME',
//   },
//   {
//     headerName: '店铺名称',
//     field: 'CP_C_SHOP_TITLE',
//   },
//   {
//     headerName: '实体仓',
//     field: 'CP_C_PHY_WAREHOUSE_ENAME',
//   },
//   {
//     headerName: '赔付快递公司',
//     field: 'CP_C_LOGISTICS_ENAME',
//   },
//   {
//     headerName: '快递单号',
//     field: 'LOGISTICS_NO',
//   },
//   {
//     headerName: '总应付金额',
//     field: 'PAYABLE_PRICE',
//   },
//   {
//     headerName: '支付方式',
//     field: 'PAY_TYPE_NAME',
//   },
//   {
//     headerName: '备注',
//     field: 'REMARK',
//   },
//   {
//     headerName: '来源单据编号',
//     field: 'ORDER_NO',
//   },
//   {
//     headerName: '顾客电话',
//     field: 'CUSTOMER_TEL',
//   },
//   {
//     headerName: '顾客姓名',
//     field: 'CUSTOMER_NAME',
//   },
//   {
//     headerName: '支付宝号',
//     field: 'ALIPAY_ACCOUNT',
//   },
//   {
//     headerName: '会员昵称',
//     field: 'CUSTOMER_NICK',
//   },
//   {
//     headerName: '付款时间',
//     field: 'PAY_TIME',
//   },
//   {
//     headerName: '创建时间',
//     field: 'CREATIONDATE',
//   },
//   {
//     headerName: '创建人',
//     field: 'OWNERENAME',
//   },
//   {
//     headerName: '修改时间',
//     field: 'MODIFIEDDATE',
//   },
//   {
//     headerName: '修改人',
//     field: 'MODIFIERENAME',
//   },
//   {
//     headerName: '客审时间',
//     field: 'GUEST_TRIAL_TIME',
//   },
//   {
//     headerName: '客审人',
//     field: 'GUEST_TRIAL_ENAME',
//   },
//   {
//     headerName: '财审时间',
//     field: 'FINANCIAL_TRIAL_TIME',
//   },
//   {
//     headerName: '财审人',
//     field: 'FINANCIAL_TRIAL_ENAME',
//   },
//   {
//     headerName: '作废时间',
//     field: 'DEL_TIME',
//   },
//   {
//     headerName: '作废人',
//     field: 'DELENAME',
//   },
//   {
//     headerName: '可用',
//     field: 'ISACTIVE',
//   },
// ];

export default {
  components: {
    businessButton,
    businessForm,
    aTable,
    businessLabel,
    businessDialog,
    loading
  },
  mixins: [isFavoriteMixin, customPagingMixins, buttonPermissionsMixin],
  data() {
    return {
      vmI18n: window.vmI18n,
      allTableArr: [],
      selectArr: [],
      // 弹框配置 导入
      importTable: {
        refFuns: 'confirmFun',
        confirmTitle: window.vmI18n.t('modalTitle.import'),
        titleAlign: 'center', // 设置标题是否居中 center left
        width: '600',
        scrollable: false, // 是否可以滚动
        closable: true, // 是否可以按esc关闭
        draggable: true, // 是否可以拖动
        mask: true, // 是否显示遮罩层
        maskClosable: true, // 是否可以点击叉号关闭
        transfer: true, // 是否将弹层放在body内
        name: 'importTable', // 组件名称
        url: 'importTable',
        keepAlive: true,
        excludeString: 'importTable', // 将name传进去，确认不缓存
        componentData: {},
      },
      warningModal: false, // 警告弹框
      btnConfig: {
        typeAll: 'error', // 按钮统一风格样式
        buttons: [
          {
            // text: "查找", //按钮文本
            text: window.vmI18n.t('btn.find'), // 按钮文本
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              this.find();
            }, // 按钮点击事件
          },
          {
            // text: "新增", //按钮文本
            text: window.vmI18n.t('btn.add'), // 按钮文本
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              this.$store.commit('customize/TabHref', {
                id: -1, // id
                type: 'action', // 类型action
                name: 'payableAdjustAdd', // 文件名
                // label: "赔付单新增", //tab中文名
                label: window.vmI18n.t('panel_label.add_claimForm'), // tab中文名
                query: Object.assign({
                  id: -1, // id
                  // tabTitle: "赔付单新增", //tab中文名
                  tabTitle: window.vmI18n.t('panel_label.add_claimForm'), // tab中文名
                }), // 带的参数
              });
            }, // 按钮点击事件
          },
          {
            // text: "导出", //按钮文本
            text: window.vmI18n.t('btn.export'), // 按钮文本
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              this.exportClick();
            }, // 按钮点击事件
          },
          {
            // text: "作废", //按钮文本
            text: window.vmI18n.t('btn.void'), // 按钮文本
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              this.invalid();
            }, // 按钮点击事件
          },
          {
            // text: "财审", //按钮文本
            text: window.vmI18n.t('btn.financeAudit'), // 按钮文本
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              this.fiAudit();
            }, // 按钮点击事件
          },
          {
            // text: "客审", //按钮文本
            text: window.vmI18n.t('btn.custAudit'), // 按钮文本
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              this.custAudit();
            }, // 按钮点击事件
          },
          {
            // text: "反客审", //按钮文本
            text: window.vmI18n.t('btn.deCustAudit'), // 按钮文本
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              this.unCustAudit();
            }, // 按钮点击事件
          },
          {
            icon: 'iconfont iconbj_col', // 按钮图标
            size: 'small', // 按钮大小
            // name: "收藏",
            name: window.vmI18n.t('btn.collection'),
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              const _this = this;
              _this.setFavorite();
            }, // 按钮点击事件
          },
        ],
      }, // 按钮数据
      formConfig: {
        formData: [
          {
            style: 'input', // 文本录入
            // label: "单据编号",
            label: window.vmI18n.t('form_label.billNo'),
            value: 'BILL_NO',
            width: '6',
          },
          {
            style: 'input', // 文本录入
            // label: "平台单号",
            label: window.vmI18n.t('form_label.platform_billNo'),
            value: 'TID',
            width: '6',
          },
          {
            style: 'select', // 下拉框类型
            // label: "单据状态", //下拉框前的值
            label: window.vmI18n.t('form_label.billStatus'),
            width: '6', // 所占宽度宽度
            value: 'BILL_STATUS', // 输入框的值
            multiple: true,
            options: [
              {
                // label: "未审核",
                label: window.vmI18n.t('common.unAudit'),
                value: '1',
              },
              {
                // label: "已客审",
                label: window.vmI18n.t('common.custAudited'),
                value: '2',
              },
              {
                // label: "已财审",
                label: window.vmI18n.t('common.financeAudited'),
                value: '3',
              },
              {
                // label: "已作废",
                label: window.vmI18n.t('common.voided'),
                value: '4',
              },
            ],
          },
          {
            style: 'input',
            // label: "来源单据编号",
            label: window.vmI18n.t('form_label.source_billNo'),
            value: 'ORDER_NO',
            width: '6',
          },
          {
            style: 'popInput', // 输入框弹框单多选
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
              // name: "实体仓名称", //input前面显示的lable值
              name: window.vmI18n.t('form_label.physicalWarehouseName'),
              readonly: false, // 是否可编辑，对应input   readonly属性
              reftable: 'CP_C_PHY_WAREHOUSE', // 对应的表
              reftableid: 23451, // 对应的表ID
              row: 1,
              statsize: -1,
              type: 'STRING', // 这个是后台用的
              valuedata: '', // 这个是选择的值
              pid: '',
            },
            oneObj: (val) => {
              this.formConfig.formValue.CP_C_PHY_WAREHOUSE_ID = val.pid;
              this.formConfig.formValue.CP_C_PHY_WAREHOUSE_ENAME = val.valuedata;
            },
          },
          {
            style: 'popInput', // 输入框弹框单多选
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
              // name: "快递公司名称", //input前面显示的lable值
              name: window.vmI18n.t('form_label.expressCompanyName'),
              readonly: false, // 是否可编辑，对应input   readonly属性
              reftable: 'CP_C_LOGISTICS', // 对应的表
              row: 1,
              statsize: -1,
              type: 'STRING', // 这个是后台用的
              valuedata: '', // 这个是选择的值
              pid: '',
            },
            oneObj: (val) => {
              this.formConfig.formValue.CP_C_LOGISTICS_ID = val.pid;
              this.formConfig.formValue.CP_C_LOGISTICS_ENAME = val.valuedata;
            },
          },
          {
            style: 'popInput', // 输入框弹框单多选
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
              // name: "商品条码", //input前面显示的lable值
              name: window.vmI18n.t('form_label.commodityCode'),
              readonly: false, // 是否可编辑，对应input   readonly属性
              reftable: 'PS_C_SKU', // 对应的表
              row: 1,
              statsize: -1,
              type: 'STRING', // 这个是后台用的
              valuedata: '', // 这个是选择的值
              pid: '',
            },
            oneObj: (val) => {
              this.formConfig.formValue.PS_C_SKU_ID = val.pid;
              this.formConfig.formValue.PS_C_SKU_ECODE = val.valuedata;
            },
          },
          {
            style: 'input', // 文本录入
            // label: "国标码",
            label: window.vmI18n.t('form_label.gBCode'),
            value: 'GBCODE',
            width: '6',
          },
          {
            style: 'select', // 下拉框类型
            // label: "调整类型", //下拉框前的值
            label: window.vmI18n.t('form_label.adjustmentType'),
            width: '6', // 所占宽度宽度
            value: 'ADJUST_TYPE', // 输入框的值
            multiple: true,
            options: [
              // 下拉框选项值
            ],
          },
          {
            style: 'select', // 下拉框类型
            // label: "单据类型", //下拉框前的值
            label: window.vmI18n.t('form_label.billType'),
            width: '6', // 所占宽度宽度
            value: 'BILL_TYPE', // 输入框的值
            multiple: true,
            options: [
              // 下拉框选项值
            ],
          },
          {
            style: 'select', // 下拉框类型
            // label: "渠道类型", //下拉框前的值
            label: window.vmI18n.t('form_label.channelType'),
            width: '6', // 所占宽度宽度
            value: 'RESERVE_BIGINT01', // 输入框的值
            multiple: true,
            options: [
              // 下拉框选项值
            ],
          },
          {
            style: 'date',
            type: 'datetimerange',
            // label: "创建日期",
            label: window.vmI18n.t('form_label.creationDate'),
            width: '6',
            value: 'CREATIONDATE',
            format: 'yyyy-MM-dd HH:mm:ss', // 格式参照burgeonui
            placeholder: '',
            clearable: '', // 是否显示清空按钮,默认为true   false
          },
          {
            style: 'date',
            type: 'datetimerange',
            // label: "客审日期",
            label: window.vmI18n.t('form_label.custAuditDate'),
            width: '6',
            value: 'GUEST_TRIAL_TIME',
            format: 'yyyy-MM-dd HH:mm:ss', // 格式参照burgeonui
            placeholder: '',
            clearable: '', // 是否显示清空按钮,默认为true   false
          },
          {
            style: 'date',
            type: 'datetimerange',
            // label: "财审日期",
            label: window.vmI18n.t('form_label.financeAuditDate'),
            width: '6',
            value: 'FINANCIAL_TRIAL_TIME',
            format: 'yyyy-MM-dd HH:mm:ss', // 格式参照burgeonui
            placeholder: '',
            clearable: '', // 是否显示清空按钮,默认为true   false
          },
        ],
        formValue: {},
        flodClick: () => {
          setTimeout(() => {
            this.setTableHeight();
          }, 10);
        },
      }, // form表单
      labelList: [
        {
          // label: "全部",
          label: window.vmI18n.t('panel_label.all'),
          value: '1',
          isShow: true,
        },
      ], // tab切换
      labelDefaultValue: '1',

      agTableConfig: {

        loading: false,
        // isIndex: true, // 如果要自定义序号，则将此key的值设置为true，而后自己定义序号生成器，可参考promotionlist.vue
        tableHeight: '440px',
        columnDefs: [
          {
            // headerName: "单据状态",
            headerName: vmI18n.t('form_label.billStatus'),
            field: 'BILL_STATUS_NAME',
          },
          {
            // headerName: "单据编号",
            headerName: vmI18n.t('form_label.billNo'),
            field: 'BILL_NO',
          },
          {
            // headerName: "平台单号",
            headerName: vmI18n.t('form_label.platform_billNo'),
            field: 'TID',
          },
          {
            // headerName: "单据类型",
            headerName: vmI18n.t('form_label.billType'),
            field: 'BILL_TYPE_NAME',
          },
          {
            // headerName: "调整类型",
            headerName: vmI18n.t('form_label.adjustmentType'),
            field: 'ADJUST_TYPE_NAME',
          },
          {
            // headerName: "店铺名称",
            headerName: vmI18n.t('table_label.shopName'),
            field: 'CP_C_SHOP_TITLE',
          },
          {
            // headerName: "实体仓",
            headerName: vmI18n.t('table_label.physicalWarehouse'),
            field: 'CP_C_PHY_WAREHOUSE_ENAME',
          },
          {
            // headerName: "赔付快递公司",
            headerName: vmI18n.t('table_label.compensation_expressCompany'),
            field: 'CP_C_LOGISTICS_ENAME',
          },
          {
            // headerName: "快递单号",
            headerName: vmI18n.t('table_label.expressNo'),
            field: 'LOGISTICS_NO',
          },
          {
            // headerName: "总应付金额",
            headerName: vmI18n.t('table_label.total_amountDue'),
            field: 'PAYABLE_PRICE',
          },
          {
            // headerName: "支付方式",
            headerName: vmI18n.t('table_label.paymentWay'),
            field: 'PAY_TYPE_NAME',
          },
          {
            // headerName: "备注",
            headerName: vmI18n.t('table_label.remarks'),
            field: 'REMARK',
          },
          {
            // headerName: "来源单据编号",
            headerName: vmI18n.t('form_label.source_billNo'),
            field: 'ORDER_NO',
          },
          {
            // headerName: "顾客电话",
            headerName: vmI18n.t('table_label.custTelephone'),
            field: 'CUSTOMER_TEL',
          },
          {
            // headerName: "顾客姓名",
            headerName: vmI18n.t('table_label.custName'),
            field: 'CUSTOMER_NAME',
          },
          {
            // headerName: "支付宝号",
            headerName: vmI18n.t('table_label.alipay'),
            field: 'ALIPAY_ACCOUNT',
          },
          {
            // headerName: "会员昵称",
            headerName: vmI18n.t('table_label.vip_nickname'),
            field: 'CUSTOMER_NICK',
          },
          {
            // headerName: "付款时间",
            headerName: vmI18n.t('table_label.paymentTime'),
            field: 'PAY_TIME',
          },
          {
            // headerName: "创建时间",
            headerName: vmI18n.t('table_label.creationTime'),
            field: 'CREATIONDATE',
          },
          {
            // headerName: "创建人",
            headerName: vmI18n.t('table_label.creator'),
            field: 'OWNERENAME',
          },
          {
            // headerName: "修改时间",
            headerName: vmI18n.t('table_label.modificationTime'),
            field: 'MODIFIEDDATE',
          },
          {
            // headerName: "修改人",
            headerName: vmI18n.t('table_label.reviser'),
            field: 'MODIFIERENAME',
          },
          {
            // headerName: "客审时间",
            headerName: vmI18n.t('table_label.custAuditTime'),
            field: 'GUEST_TRIAL_TIME',
          },
          {
            // headerName: "客审人",
            headerName: vmI18n.t('table_label.custAuditMan'),
            field: 'GUEST_TRIAL_ENAME',
          },
          {
            // headerName: "财审时间",
            headerName: vmI18n.t('table_label.financeAuditTime'),
            field: 'FINANCIAL_TRIAL_TIME',
          },
          {
            // headerName: "财审人",
            headerName: vmI18n.t('table_label.financeAuditMan'),
            field: 'FINANCIAL_TRIAL_ENAME',
          },
          {
            // headerName: "作废时间",
            headerName: vmI18n.t('table_label.voidTime'),
            field: 'DEL_TIME',
          },
          {
            // headerName: "作废人",
            headerName: vmI18n.t('table_label.voidMan'),
            field: 'DELENAME',
          },
          {
            // headerName: "可用",
            headerName: vmI18n.t('table_label.usable'),
            field: 'ISACTIVE',
          },
        ],
        rowData: [],
        renderArr: {
          ACTION_LOG: (params) => {
            // console.log("params :>> ", params);
            if (!params.data.ACTION_LOG) return;
            const resultElement = document.createElement('div');
            const iTag = document.createElement('div');
            iTag.style.color = '#0f8ee9';
            iTag.style.textDecoration = 'underline';
            iTag.innerText = params.data.ACTION_LOG;
            iTag.style.cursor = 'pointer';
            iTag.onclick = () => {
              // console.log(params.data);
              this.viewLog(params.data);
            };
            resultElement.appendChild(iTag);
            return resultElement;
          },
        },
        pagenation: comUtils.pageConfig,
      }, // 全部
      // returnSelectData: [], // 列表选中数据
      isShowFromLoading: false,
      statusTab: '', // 单据类型
    };
  },
  activated() {
    // 获取默认数据
    this.agTableConfig.pagenation.current = 1;
    this.getList();
  },
  created() {
    const self = this;
    self.getSelectData();
  },
  mounted() {
    this.$nextTick(() => {
      this.getPermissions('btnConfig', 'payableAdjustmentList');
    });
    const _this = this;
    window.addEventListener('keydown', (e) => {
      const key = e.keyCode;
      if (key === 13 && _this.warningModal) {
        _this.warningOk();
      } else if (key === 27) {
        _this.warningModal = false;
      }
    });
    this.getList();

    // 计算高度 通过设置节点 'totalHeight'
    comUtils.setTableHeight(this, 50);
    // 检测屏幕变化 设置高度 重新渲染agTabe
    window.onresize = () => {
      comUtils.setTableHeight(this, 10);
      console.log(this, 50);
      this.$refs.agtable.agGridTable(this.agTableConfig.columnDefs, this.agTableConfig.rowData);
    };
  },
  methods: {
    // 填充下拉选项框
    async getSelectData() {
      const self = this;
      const arrBillType = await this.getColOption(
        'AC_F_PAYABLE_ADJUSTMENT',
        // "基本信息",
        vmI18n.t('common.baseInformation'),
        'BILL_TYPE'
      );
      const arrAdjustType = await this.getColOption(
        'AC_F_PAYABLE_ADJUSTMENT',
        // "基本信息",
        vmI18n.t('common.baseInformation'),
        'ADJUST_TYPE'
      );
      const arrChannel = await this.getColOption(
        'AC_F_PAYABLE_ADJUSTMENT',
        // "基本信息",
        vmI18n.t('common.baseInformation'),
        'RESERVE_BIGINT01'
      );
      self.formConfig.formData.map((item) => {
        if (item.value === 'BILL_TYPE') {
          item.options = arrBillType;
        } else if (item.value === 'ADJUST_TYPE') {
          item.options = arrAdjustType;
        } else if (item.value === 'RESERVE_BIGINT01') {
          item.options = arrChannel;
        }
      });
    },
    async getColOption(tableName, parentColName, childColName) {
      const fromdata = new FormData();
      fromdata.append('table', tableName);
      fromdata.append('objid', -1);
      return new Promise(async (resolve) => {
        let optionData = [];
        const res = await this.service.common.getObject(fromdata);
        const selectData = res.data.data.addcolums;
        selectData.forEach((item) => {
          if (item.parentdesc === parentColName) {
            const childItem = item.childs;
            childItem.forEach((item) => {
              if (item.colname === childColName) {
                optionData = item.combobox.map(subItem => ({
                  label: subItem.limitdesc,
                  value: subItem.limitval,
                }));
              }
            });
          }
        });
        resolve(optionData);
      });
    },
    // 查找
    find() {
      this.agTableConfig.pagenation.current = 1;
      this.getList();
    },
    async invalid() {
      const self = this;
      self.selection = self.$refs.agtable.AGTABLE.getSelect();
      const ids = [];
      this.selection.map((item) => {
        ids.push(item.ID);
      });
      const param = {
        objids: ids,
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
      const formdata = self.generateAuditFromdata();
      const { data: { data } } = await this.service.financeCenter.fiAuditPayableAdjustment(formdata);
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
      const { data: { data } } = await this.service.financeCenter.auditPayableAdjustment(formdata);
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
      const { data: { data } } = await this.service.financeCenter.cancelAuditPayableAdjustment(formdata);
      if (data.code === 0) {
        self.$Message.success(vmI18n.t('modalTips.z1'));// 反客审成功!
        self.getList();
      } else {
        self.$Message.error(data.message);
      }
    },
    generateAuditFromdata() {
      const ids = [];
      const self = this;
      self.selection = self.$refs.agtable.AGTABLE.getSelect();
      this.selection.map((item) => {
        ids.push(item.ID);
      });
      const param = {
        ids,
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
      if (
        mainData.FINANCIAL_TRIAL_TIME
        && mainData.FINANCIAL_TRIAL_TIME.length > 0
      ) {
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
        RESERVE_BIGINT01: mainData.RESERVE_BIGINT01,
      };

      const param = {
        whereInfo: whereInfoForm,
        pageNum: _this.agTableConfig.pagenation.current,
        pageSize: _this.agTableConfig.pagenation.pageSize,
      };
      const fromdata = new FormData();
      fromdata.append('param', JSON.stringify(param));
      // 接口
      const { data: { code, data } } = await this.service.financeCenter.getPayableAdjustmentList(fromdata); 
      _this.agTableConfig.loading = false;
      _this.returnSelectData = [];
      if (code === 0 && data.payableAdjustmentList.length) {
        // Table表单赋值
        _this.allTableArr = data.payableAdjustmentList.map(
          item => 
            // 过滤不需要展示的模糊搜索项
            ({
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
              CREATIONDATE: item.CREATIONDATE
                ? publicMethodsUtil.DatesTime(item.CREATIONDATE)
                : '',
              PAY_TIME: item.PAY_TIME
                ? publicMethodsUtil.DatesTime(item.PAY_TIME)
                : '',
              MODIFIEDDATE: item.MODIFIEDDATE
                ? publicMethodsUtil.DatesTime(item.MODIFIEDDATE)
                : '',
              GUEST_TRIAL_TIME: item.GUEST_TRIAL_TIME
                ? publicMethodsUtil.DatesTime(item.GUEST_TRIAL_TIME)
                : '',
              FINANCIAL_TRIAL_TIME: item.FINANCIAL_TRIAL_TIME
                ? publicMethodsUtil.DatesTime(item.FINANCIAL_TRIAL_TIME)
                : '',
              DEL_TIME: item.DEL_TIME
                ? publicMethodsUtil.DatesTime(item.DEL_TIME)
                : '',
            })
          
        );
        _this.agTableConfig.pagenation.total = data.page.totalSize;
        _this.agTableConfig.rowData = _this.allTableArr;
      } else {
        _this.agTableConfig.rowData = [];
        _this.agTableConfig.pagenation.total = 0;
      }
      this.$refs.agtable.agGridTable(
        this.agTableConfig.columnDefs,
        this.agTableConfig.rowData,
        this.getExtendObj()
      );
    },
    // 双击时触发
    onRowDblclick(row) {
      this.$store.commit('customize/TabHref', {
        id: row.ID, // 单据id
        type: 'action', // 类型action
        name: 'payableAdjustAdd', // 文件名
        // label: "赔付单详情", //tab中文名
        label: window.vmI18n.t('panel_label.details_claimForm'),
        query: Object.assign({
          id: row.ID, // 单据id
          // tabTitle: "赔付单详情", //tab中文名
          tabTitle: window.vmI18n.t('panel_label.details_claimForm'),
        }), // 带的参数
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
          if (params.data.BILL_STATUS === 4) {
            // 已作废
            return { color: 'gray' };
          }
          if (params.data.BILL_STATUS === 3) {
            // 已财审
            return { color: 'blue' };
          }
          // 未审核
          return { color: '#323233' };
        },
      };
    },
    // 导入
    returnExport() {},
    // 导出
    returnImport() {},
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
      _this.selection = _this.$refs.agtable.AGTABLE.getSelect();
      console.log('selection', _this.selection);
      if (_this.selection.length) {
        const ids = [];
        for (let i = 0; i < _this.selection.length; i++) {
          ids.push(_this.selection[i].ID);
        }
        const idList = { idList: ids };
        const { data: { code, data, message } } = await this.service.financeCenter.exportPayableAdjustment(idList); 
        if (code === 0 && data !== null) {
          const mes = message || window.vmI18n.t('modalTips.z2');// 导出成功！
          _this.$Message.success(mes);
          _this.downloadUrlFile(data);
        } else {
          const err = message || window.vmI18n.t('modalTips.z3');// 失败！
          _this.$Message.error(err);
        }
      } else {
        if (_this.agTableConfig.rowData.length === 0) {
          return _this.$Message.error(window.vmI18n.t('modalTips.z4'));// 列表没有数据,无法导出!
        }
        _this.warningModal = true;
      }
    },
    // 导出下载
    downloadUrlFile(src) {
      const download_file = {};
      if (typeof download_file.iframe === 'undefined') {
        const iframe = document.createElement('iframe');
        download_file.iframe = iframe;
        document.body.appendChild(download_file.iframe);
      }
      download_file.iframe.src = src;
      download_file.iframe.style.display = 'none';
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
      if (
        mainData.FINANCIAL_TRIAL_TIME
        && mainData.FINANCIAL_TRIAL_TIME.length > 0
      ) {
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
        RESERVE_BIGINT01: mainData.RESERVE_BIGINT01,
      };
      const { data: { code, data, message } } = await this.service.financeCenter.exportPayableAdjustment(param); 
      if (code === 0 && data !== null) {
        const mes = message || window.vmI18n.t('modalTips.z2');// 导出成功！
        _this.$Message.success(mes);
        _this.downloadUrlFile(data);
        _this.agTableConfig.loading = false;
      } else {
        const err = message || window.vmI18n.t('modalTips.z3');// 失败！
        _this.$Message.error(err);
        _this.agTableConfig.loading = false;
      }
      // axios({
      //   url: "/p/cs/exportPayableAdjustment",
      //   method: "post",
      //   cancelToken: true,
      //   data: param,
      // }).then((res) => {
      //   if (res.data.code === 0 && res.data.data !== null) {
      //     let mes = res.data.message || window.vmI18n.t("modalTips.z2");//导出成功！
      //     _this.$Message.success(mes);
      //     _this.downloadUrlFile(res.data.data);
      //   } else {
      //     let err = res.data.message || window.vmI18n.t("modalTips.z3");//失败！
      //     _this.$Message.error(err);
      //   }
      // });
    },
  },
  destroyed() {
    window.removeEventListener('keydown', this, false);
  },
};
