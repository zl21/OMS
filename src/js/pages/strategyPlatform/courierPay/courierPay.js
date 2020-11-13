import businessButton from 'professionalComponents/businessButton';
import businessForm from 'professionalComponents/businessForm';
import businessActionTable from 'professionalComponents/businessActionTable';
// import businessLabel from 'professionalComponents/businessLabel';
import publicMethods from '@/assets/js/public/publicMethods';
// import port from "@/assets/js/connector.js";

import areaList from '@/assets/js/address/area-list';
import { parseArea } from '@/assets/js/address/address-parse';

parseArea(areaList);
export default {
  components: {
    businessButton,
    businessForm,
    businessActionTable
    // businessLabel
  },
  data() {
    return {
      vmI18n: window.vmI18n,
      identifying: '',
      detailList: [], // 存储已勾选需要删除的明细id
      objid: -1, // 主表ID,默认为新增
      value1: ['1', '3'],
      btnConfig: {
        typeAll: 'error',
        buttons: []
      },
      formConfig: {
        formData: [],
        // 表单一
        formValue: {
          BILL_NO: '', // 单据标号
          BEGIN_TIME: `${publicMethods.getDate(0)} 00:00:00`, // 生效日期
          END_TIME: `${publicMethods.getDate(6)} 23:59:59`, // 结束日期
          ENAME: '', // 方案名称
          PLAN_DESC: '', // 方案描述
          CP_C_PHY_WAREHOUSE_ID: '' // 实体仓id
        },
        // 表单非空提示
        ruleValidate: {
          SHIP_AMT: [{ required: true, message: ' ', trigger: 'blur' }],
          USER_NICK: [{ required: true, message: ' ', trigger: 'blur' }],
          PAY_TYPE: [{ required: true, message: ' ', trigger: 'blur' }],
          BEGIN_TIME: [{ required: true, message: ' ', trigger: 'blur' }],
          END_TIME: [{ required: true, message: ' ', trigger: 'blur' }],
          ENAME: [{ required: true, message: ' ', trigger: 'blur' }]
        }
      },
      // 表单二
      formConfig1: {
        formData: [],
        formValue: {
          OWNERENAME: '', // 创建人
          CREATIONDATE: '', // 创建时间
          MODIFIERENAME: '', // 修改人
          MODIFIEDDATE: '', // 修改时间
          DELENAME: '', // 作废人
          DEL_TIME: '', // 作废时间
          CHECKENAME: '', // 审核人
          CHECKTIME: '', // 审核时间
          FINISHENAME: '', // 结案人
          FINISHTIME: '' // 结案时间
        },
        // 表单非空提示
        ruleValidate: {
          RECEIVER_NAME: [{ required: true, message: ' ', trigger: 'blur' }],
          RECEIVER_ADDRESS: [{ required: true, message: ' ', trigger: 'blur' }],
          RECEIVER_MOBILE: [{ required: true, message: ' ', trigger: 'blur' }]
        }
      },
      // 表格
      jordanTableConfig: {
        isShowAddDetailBtn: false,
        indexColumn: true,
        isShowSelection: true, // 是否存在多选框
        jordanFormConfig: {
          img: {},

          formValue: {
            COMPENSATE_TYPE: '', // 赔付类型
            COMPENSATE_STANDARD: '', // 赔付标准
            MULTIPLE: '', // 倍数
            SETTLEMENTPRICE: '', // 结算价
            CP_C_LOGISTICS_ID: '', // 快递公司id
            CP_C_LOGISTICS_ENAME: '' // 快递公司名称
          },
          ruleValidate: {
            COMPENSATE_TYPE: [{ required: true, message: ' ', trigger: 'blur' }],
            COMPENSATE_STANDARD: [{ required: false, message: ' ', trigger: 'blur' }],
            MULTIPLE: [{ required: false, message: ' ', trigger: 'blur' }],
            SETTLEMENTPRICE: [{ required: false, message: ' ', trigger: 'blur' }]
          },
          formData: []
        }, // 表单配置

        // 是否修改搜索框为select
        isSearchText: true,
        isShowDeleteDetailBtn: true, // 控制是否显示删除明细
        // isSearchText为false的情况下使用 搜索框list
        searchSelectList: [
          {
            value: '1',
            label: 'aa'
          },
          {
            value: '2',
            label: 'bb'
          }
        ],
        pageShow: true, // 控制分页是否显示
        btnsShow: true, // 控制操作按钮是否显示
        searchInputShow: false, // 控制搜索框是否显示
        width: '', // 表格宽度
        height: '280', // 表格高度
        border: true, // 是否显示纵向边框
        total: 1, // 设置总条数
        pageSizeOpts: [15, 30, 45, 60], // 每页条数切换的配置
        pageSize: 5, // 每页条数
        columns: [],
        data: []
      },
      // tab切换配置
      labelList: [
        {
          // label: "订单明细",
          label: window.vmI18n.t('panel_label.order_detailed'),
          value: '1',
          isShow: true
        }
      ],
      labelDefaultValue: '1' // 设置tab默认值
    };
  },
  watch: {
    objid(value) {
      const self = this;
      if (value !== -1) {
        // self.jordanTableConfig.jordanFormConfig = {};
        // 获取详情
        self.query(self.objid);
      }
    }
  },
  mounted() {
    const self = this;
    self.objid = Number(self.$route.query.id);
    this.formConfig.formData = [
      {
        style: 'input',
        // label: "单据编号",
        label: this.vmI18n.t('form_label.billNo'),
        value: 'BILL_NO',
        width: '6',
        disabled: true,
        inputenter: () => {
          const self = this;
          self.sava();
        }
      },
      {
        style: 'popInput', // 输入框弹框单多选
        width: '6',
        itemdata: {
          col: 1,
          reftable: 'CP_C_PHY_WAREHOUSE',
          display: 'xml',
          length: 65535,
          reftableid: 24486,
          type: 'STRING',
          statsize: -1,
          datelimit: 'all',
          colname: 'CP_C_PHY_WAREHOUSE_ID',
          readonly: false,
          isuppercase: false,
          isnotnull: true,
          fkdesc: '实体仓档案',
          // name: "实体仓",
          name: this.vmI18n.t('table_label.physicalWarehouse'),
          fkdisplay: 'mrp',
          row: 1,
          inputname: 'CP_C_PHY_WAREHOUSE_ID:ENAME',
          colid: 172477,
          isfk: true,
          pid: '',
          popover: false,
          valuedata: ''
        }
      },
      {
        style: 'date',
        type: '', // 日期组件类型,默认为data  (daterange)为双日期区间选择
        // label: "生效日期",
        label: this.vmI18n.t('form_label.effectiveDate'),
        value: 'BEGIN_TIME',
        width: '6',
        format: 'yyyy-MM-dd HH:mm:ss', // 格式参照burgeonui
        placeholder: '',
        clearable: '' // 是否显示清空按钮,默认为true   false
      },
      {
        style: 'date',
        type: '', // 日期组件类型,默认为data  (daterange)为双日期区间选择
        // label: "结束日期",
        label: this.vmI18n.t('form_label.endDate'),
        value: 'END_TIME',
        width: '6',
        format: 'yyyy-MM-dd HH:mm:ss', // 格式参照burgeonui
        placeholder: '',
        clearable: '' // 是否显示清空按钮,默认为true   false
      },
      {
        style: 'input',
        // label: "方案名称",
        label: this.vmI18n.t('form_label.schemeName'),
        value: 'ENAME',
        width: '6',
        inputenter: () => {
          const self = this;
          self.sava();
        }
      },
      {
        style: 'input',
        // label: "方案描述",
        label: this.vmI18n.t('form_label.schemeDescription'),
        value: 'PLAN_DESC',
        width: '6',
        inputenter: () => {
          const self = this;
          self.sava();
        }
      }
    ];
    this.formConfig1.formData = [
      {
        style: 'input',
        // label: "创建人",
        label: this.vmI18n.t('table_label.creator'),
        value: 'OWNERENAME',
        width: '6',
        disabled: true
      },
      {
        style: 'input',
        // label: "创建时间",
        label: this.vmI18n.t('table_label.creationTime'),
        value: 'CREATIONDATE',
        width: '6',
        disabled: true
      },
      {
        style: 'input',
        // label: "修改人",
        label: this.vmI18n.t('table_label.reviser'),
        value: 'MODIFIERENAME',
        width: '6',
        disabled: true
      },
      {
        style: 'input',
        // label: "修改时间",
        label: this.vmI18n.t('table_label.modificationTime'),
        value: 'MODIFIEDDATE',
        width: '6',
        disabled: true
      },
      {
        style: 'input',
        // label: "作废人",
        label: this.vmI18n.t('table_label.voidMan'),
        value: 'DELENAME',
        width: '6',
        disabled: true
      },
      {
        style: 'input',
        // label: "作废时间",
        label: this.vmI18n.t('table_label.voidTime'),
        value: 'DEL_TIME',
        width: '6',
        disabled: true
      },
      {
        style: 'input',
        // label: "审核人",
        label: this.vmI18n.t('form_label.reviewer'),
        value: 'CHECKENAME',
        width: '6',
        disabled: true
      },
      {
        style: 'input',
        // label: "审核时间",
        label: this.vmI18n.t('table_label.auditTime'),
        value: 'CHECKTIME',
        width: '6',
        disabled: true
      },
      {
        style: 'input',
        // label: "结案人",
        label: this.vmI18n.t('form_label.closingMan'),
        value: 'FINISHENAME',
        width: '6',
        disabled: true
      },
      {
        style: 'input',
        // label: "结案时间",
        label: this.vmI18n.t('form_label.closingTime'),
        value: 'FINISHTIME',
        width: '6',
        disabled: true
      }
    ];
    this.jordanTableConfig.jordanFormConfig.formData = [
      {
        style: 'popInput',
        width: '6',
        itemdata: {
          col: 1,
          reftable: 'CP_C_LOGISTICS',
          display: 'text',
          length: 20,
          reftableid: 24411,
          type: 'STRING',
          statsize: -1,
          datelimit: 'all',
          colname: 'CP_C_LOGISTICS_ID',
          readonly: false,
          isuppercase: false,
          isnotnull: true,
          fkdesc: '物流公司档案',
          // name: "快递公司名称",
          label: this.vmI18n.t('form_label.expressCompanyName'),
          fkdisplay: 'drp',
          row: 1,
          inputname: 'CP_C_LOGISTICS_ID:ENAME',
          colid: 169097,
          isfk: true,
          value: '',
          pid: '',
          valuedata: ''
        },
        InputEnter: () => {
          const self = this;
          self.addDetail();
        }
      },
      {
        style: 'select', // 下拉框类型
        // label: "赔付类型", // 下拉框前的值
        label: this.vmI18n.t('form_label.payableAdjustType'),
        width: '6', // 所占宽度宽度
        value: 'COMPENSATE_TYPE', // 输入框的值
        selectChange: () => {
          const self = this;
          const formValue = self.jordanTableConfig.jordanFormConfig.formValue;
          const formData = self.jordanTableConfig.jordanFormConfig.formData;
          let ruleValidate = self.jordanTableConfig.jordanFormConfig.ruleValidate;
          switch (self.jordanTableConfig.jordanFormConfig.formValue.COMPENSATE_TYPE) {
            case 1:
              formValue.COMPENSATE_STANDARD = ''; // 赔付标准置空
              formValue.SETTLEMENTPRICE = ''; // 结算价置空
              formData[2].options[0].disabled = false;
              formData[2].options[1].disabled = false;
              formData[2].disabled = false; // 赔付标准可编辑
              formData[3].disabled = false; // 倍数可编辑
              formData[4].disabled = true; // 结算价不可编辑

              ruleValidate.COMPENSATE_STANDARD[0].required = true;
              ruleValidate.MULTIPLE[0].required = true;
              ruleValidate.SETTLEMENTPRICE[0].required = false;
              ruleValidate = Object.assign({}, ruleValidate);
              break;
            case 2:
              formValue.COMPENSATE_STANDARD = ''; // 赔付标准置空
              formValue.SETTLEMENTPRICE = ''; // 结算价置空
              formData[2].options[0].disabled = true;
              formData[2].options[1].disabled = true;
              formData[2].disabled = false; // 赔付标准可编辑
              formData[3].disabled = false; // 倍数可编辑
              formData[4].disabled = true; // 结算价不可编辑

              ruleValidate.COMPENSATE_STANDARD[0].required = true;
              ruleValidate.MULTIPLE[0].required = true;
              ruleValidate.SETTLEMENTPRICE[0].required = false;
              ruleValidate = Object.assign({}, ruleValidate);
              break;
            case 3:
              formValue.MULTIPLE = ''; // 倍数置空
              formValue.COMPENSATE_STANDARD = ''; // 赔付标准置空
              formData[2].disabled = true;
              formData[3].disabled = true;
              formData[4].disabled = false;

              ruleValidate.COMPENSATE_STANDARD[0].required = false;
              ruleValidate.MULTIPLE[0].required = false;
              ruleValidate.SETTLEMENTPRICE[0].required = true;
              ruleValidate = Object.assign({}, ruleValidate);
              break;
          }
        }, // 选中事件，默认返回选中的值
        options: [
          // 下拉框选项值
          {
            // label: "价格赔付",
            label: this.vmI18n.t('other.price_compensation'),
            value: 1,
            disabled: false
          },
          {
            // label: "邮费赔付",
            label: this.vmI18n.t('other.postage_compensation'),
            value: 2,
            disabled: true
          },
          {
            // label: "固定结算",
            label: this.vmI18n.t('other.fixed_settlement'),
            value: 3,
            disabled: false
          }
        ]
      },
      {
        style: 'select', // 下拉框类型
        // label: "赔付标准", // 下拉框前的值
        label: this.vmI18n.t('form_label.payableAdjustStandard'),
        width: '6', // 所占宽度宽度
        value: 'COMPENSATE_STANDARD', // 输入框的值
        disabled: false,
        selectChange: () => {}, // 选中事件，默认返回选中的值
        options: [
          // 下拉框选项值
          {
            // label: "销售价",
            label: this.vmI18n.t('other.sales_price'),
            value: 1,
            disabled: false
          },
          {
            // label: "标准价",
            label: this.vmI18n.t('table_label.standardPrice'),
            value: 2,
            disabled: false
          },
          {
            // label: "邮费",
            label: this.vmI18n.t('other.postage'),
            value: 3,
            disabled: true
          }
        ]
      },
      {
        style: 'input', // 输入框类型
        // label: "倍数", // 输入框前文字
        label: this.vmI18n.t('form_label.multiple'),
        value: 'MULTIPLE', // 输入框的值
        width: '6', // 所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
        disabled: false,
        inputenter: () => {
          const self = this;
          self.addDetail();
        }
      },
      {
        style: 'input', // 输入框类型
        // label: "结算价", // 输入框前文字
        label: this.vmI18n.t('form_label.settlement_price'),
        value: 'SETTLEMENTPRICE', // 输入框的值
        width: '6', // 所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
        inputenter: () => {
          const self = this;
          self.addDetail();
        }
      }
    ];
    this.jordanTableConfig.columns = [
      {
        // title: "快递名称",
        label: this.vmI18n.t('table_label.expressName'),
        sortable: true,
        key: 'CP_C_LOGISTICS_ENAME',
        width: '',
        type: 'asc',
        sortMethod(value) {
          console.log(value);
        }
      },
      {
        // title: "赔付类型",
        label: this.vmI18n.t('form_label.payableAdjustType'),
        key: 'COMPENSATE_TYPE'
      },
      {
        // title: "赔付标准",
        label: this.vmI18n.t('table_label.payableAdjustStandard'),
        key: 'COMPENSATE_STANDARD'
      },
      {
        // title: "倍数",
        label: this.vmI18n.t('form_label.multiple'),
        key: 'MULTIPLE'
      },
      {
        // title: "结算价",
        label: this.vmI18n.t('form_label.settlement_price'),
        key: 'SETTLEMENTPRICE'
      }
    ];
    this.btnConfig.buttons = [
      {
        // type: '',  //按钮类型
        // text: "保存", // 按钮文本
        text: this.vmI18n.t('btn.save'), // 按钮文本
        size: '', // 按钮大小
        disabled: false, // 按钮禁用控制
        btnclick: () => {
          self.sava();
        }
      },
      {
        // text: "返回",
        text: this.vmI18n.t('btn.back'), // 按钮文本
        btnclick: () => {
          R3.store.commit('global/tabOpen', {
            type: 'S',
            tableId: 24613,
            tableName: 'ST_C_COMPENSATE',
            label: self.vmI18n.t('panel_label.express_compensation_scheme'),
            back: true
          });
        }
      }
    ];
  }, // 获取支付方式下拉选项值
  methods: {
    // 保存方法
    async sava() {
      const self = this;
      const a = self.getData(self.$route.query.id);
      console.log(a);
      const param = a;
      // 非空效验
      if (String(a.fixcolumn.ST_C_COMPENSATE.CP_C_PHY_WAREHOUSE_ID) == 'undefined' || !a.fixcolumn.ST_C_COMPENSATE.CP_C_PHY_WAREHOUSE_ID) {
        // self.$Message.warning("实体仓不能为空");
        self.$message.warning(this.vmI18n.t('modalTips.x0'));
        return;
      }
      if (String(a.fixcolumn.ST_C_COMPENSATE.BEGIN_TIME) == 'undefined' || !a.fixcolumn.ST_C_COMPENSATE.BEGIN_TIME) {
        // self.$Message.warning("生效日期不能为空");
        self.$message.warning(this.vmI18n.t('modalTips.x1'));
        return;
      }
      if (String(a.fixcolumn.ST_C_COMPENSATE.END_TIME) == 'undefined' || !a.fixcolumn.ST_C_COMPENSATE.END_TIME) {
        // self.$message.warning('结束日期不能为空');
        self.$message.warning(this.vmI18n.t('modalTips.x2'));
        return;
      }
      if (String(a.fixcolumn.ST_C_COMPENSATE.ENAME) == 'undefined' || !a.fixcolumn.ST_C_COMPENSATE.ENAME) {
        // self.$message.warning('方案名称不能为空');
        self.$message.warning(this.vmI18n.t('modalTips.x3'));
        return;
      }
      if (!self.jordanTableConfig.data.length) return self.$message.error('明细为空不允许保存');
      return self.$message.error(self.vmI18n.t('modalTips.x4'));
      const formdata = new FormData();
      formdata.append('param', JSON.stringify(param));
      const {
        data: { code, data }
      } = await this.service.strategyPlatform.saveCompensate(formdata);
      if (data.code === 0) {
        if (JSON.stringify(data.data) !== '{}') {
          self.removeDetail();
          // self.$store.commit("TabHref", {
          //   id: data.data.objid,
          //   type: "action",
          //   name: "courierPay",
          //   label: "快递赔付方案",
          //   query: Object.assign({
          //     id: data.data.objid,
          //     tabTitle: "快递赔付方案"
          //   })
          // });
        }
        self.query(self.objid);
        self.$message.success(data.message);
      } else {
        self.$message.error(data.message);
      }
      // axios({
      //   url: "/p/cs/saveCompensate",
      //   method: "post",
      //   data: formdata,
      // }).then((res) => {
      //   if (res.data.data.code === 0) {
      //     if (JSON.stringify(res.data.data.data) !== "{}") {
      //       self.removeDetail();
      //       // self.$store.commit("TabHref", {
      //       //   id: res.data.data.data.objid,
      //       //   type: "action",
      //       //   name: "courierPay",
      //       //   label: "快递赔付方案",
      //       //   query: Object.assign({
      //       //     id: res.data.data.data.objid,
      //       //     tabTitle: "快递赔付方案"
      //       //   })
      //       // });
      //     }
      //     self.query(self.objid);
      //     self.$Message.success(res.data.data.message);
      //   } else {
      //     self.$Message.error(res.data.data.message);
      //   }
      //   // self.query(self.objid);
      // });
    },
    setData(data) {
      // 页面赋值方法
      const self = this;
      const formValue = self.formConfig.formValue;
      const formValueOne = self.formConfig1.formValue;
      formValue.BILL_NO = data.ST_C_COMPENSATE.BILL_NO; // 单据编号赋值
      self.formConfig.formData[1].itemdata.valuedata = data.ST_C_COMPENSATE.CP_C_PHY_WAREHOUSE_ENAME;
      self.formConfig.formData[1].itemdata.pid = data.ST_C_COMPENSATE.CP_C_PHY_WAREHOUSE_ID;
      formValue.BEGIN_TIME = new Date(data.ST_C_COMPENSATE.BEGIN_TIME); // 生效时间赋值
      formValue.END_TIME = new Date(data.ST_C_COMPENSATE.END_TIME); // 结束日期赋值
      formValue.ENAME = data.ST_C_COMPENSATE.ENAME; // 方案名称
      formValue.PLAN_DESC = data.ST_C_COMPENSATE.PLAN_DESC; // 方案描述

      formValueOne.OWNERENAME = data.ST_C_COMPENSATE.OWNERENAME; // 创建人
      formValueOne.CREATIONDATE = self.setTime(data.ST_C_COMPENSATE.CREATIONDATE); // 创建时间
      formValueOne.MODIFIERENAME = data.ST_C_COMPENSATE.MODIFIERENAME; // 修改人
      formValueOne.MODIFIEDDATE = self.setTime(data.ST_C_COMPENSATE.MODIFIEDDATE); // 修改时间
      formValueOne.DELENAME = data.ST_C_COMPENSATE.DELENAME; // 作废人
      formValueOne.DEL_TIME = self.setTime(data.ST_C_COMPENSATE.DEL_TIME); // 作废时间

      formValueOne.CHECKENAME = data.ST_C_COMPENSATE.CHECKENAME; // 审核人
      formValueOne.CHECKTIME = self.setTime(data.ST_C_COMPENSATE.CHECKTIME); // 审核时间
      formValueOne.FINISHENAME = data.ST_C_COMPENSATE.FINISHENAME; // 结案人
      formValueOne.FINISHTIME = self.setTime(data.ST_C_COMPENSATE.FINISHTIME); // 结案时间
      data.ST_C_COMPENSATE_LOGISTICS.forEach(item => {
        if (item.COMPENSATE_TYPE == 1) {
          item.COMPENSATE_TYPE = '价格赔付';
        } else if (item.COMPENSATE_TYPE == 2) {
          item.COMPENSATE_TYPE = '邮费赔付';
        } else if (item.COMPENSATE_TYPE == 3) {
          item.COMPENSATE_TYPE = '固定结算';
        }

        if (item.COMPENSATE_STANDARD == 1) {
          item.COMPENSATE_STANDARD = '销售价';
        } else if (item.COMPENSATE_STANDARD == 2) {
          item.COMPENSATE_STANDARD = '标准价';
        } else if (item.COMPENSATE_STANDARD == 3) {
          item.COMPENSATE_STANDARD = '邮费';
        }
      });
      self.jordanTableConfig.data = data.ST_C_COMPENSATE_LOGISTICS; // 赋值明细信息
    },
    setTime(needTime) {
      const self = this;
      // needTime是整数，否则要parseInt转换
      const time = new Date(needTime);
      const y = time.getFullYear();
      const m = time.getMonth() + 1;
      const d = time.getDate();
      const h = time.getHours();
      const mm = time.getMinutes();
      const s = time.getSeconds();
      if (`${y}-${self.add0(m)}-${self.add0(d)} ${self.add0(h)}:${self.add0(mm)}:${self.add0(s)}` === '1970-01-01 08:00:00') {
        return '';
      }
      return `${y}-${self.add0(m)}-${self.add0(d)} ${self.add0(h)}:${self.add0(mm)}:${self.add0(s)}`;
    },
    add0(m) {
      return m < 10 ? `0${m}` : m;
    },
    getData(val = -1) {
      // 页面取值方法
      const self = this;
      const data = {
        fkcolumn: {
          ST_C_COMPENSATE_LOGISTICS: 'ST_C_COMPENSATE_ID'
        },
        dsptable: {},
        realtables: {
          ST_C_COMPENSATE: 'ST_C_COMPENSATE',
          ST_C_COMPENSATE_LOGISTICS: 'ST_C_COMPENSATE_LOGISTICS'
        },
        version: '1.0',
        table: 'ST_C_COMPENSATE',
        group: 'st'
      };
      const fixcolumn = {};
      const objid = val;
      const ST_C_COMPENSATE = JSON.parse(JSON.stringify(self.formConfig.formValue)); // 主表数据
      ST_C_COMPENSATE.BEGIN_TIME = ST_C_COMPENSATE.BEGIN_TIME ? Date.parse(ST_C_COMPENSATE.BEGIN_TIME) : ''; // 转换生效时间
      ST_C_COMPENSATE.END_TIME = ST_C_COMPENSATE.END_TIME ? Date.parse(ST_C_COMPENSATE.END_TIME) : ''; // 转换结束日期
      // let CP_C_PHY_WAREHOUSE_ID; //实体仓数据
      // if (self.formConfig.formData[1].itemdata.pid) {
      //   CP_C_PHY_WAREHOUSE_ID = JSON.parse(
      //     self.formConfig.formData[1].itemdata.pid
      //   ).lists.result;
      // }
      ST_C_COMPENSATE.CP_C_PHY_WAREHOUSE_ID = self.formConfig.formData[1].itemdata.pid;
      const dataArr = [];
      self.jordanTableConfig.data.forEach(item => {
        if (item.ID == -1) dataArr.push(item);
      });
      const ST_C_COMPENSATE_LOGISTICS = dataArr;
      fixcolumn.ST_C_COMPENSATE = ST_C_COMPENSATE; // 赋值主表数据
      fixcolumn.ST_C_COMPENSATE_LOGISTICS = ST_C_COMPENSATE_LOGISTICS; // 赋值明细表数据
      data.objid = objid; // 赋值主表id
      data.fixcolumn = fixcolumn;

      return JSON.parse(JSON.stringify(data));
      // return data;
    },
    // 删除明细
    async tableDeleteDetail() {
      const self = this;
      const obj = {
        tabitem: {
          ST_C_COMPENSATE_LOGISTICS: self.detailList // 明细表要删除的id
        },
        objid: self.objid, // 主表id（表示要删除该主表下的明细）
        fkcolumn: {
          ST_C_COMPENSATE_LOGISTICS: 'ST_C_COMPENSATE_ID'
        },
        isdelmtable: false, // false:代表删除明细；
        dsptable: {},
        realtables: {
          ST_C_COMPENSATE: 'ST_C_COMPENSATE',
          ST_C_COMPENSATE_LOGISTICS: 'ST_C_COMPENSATE_LOGISTICS'
        },
        version: '1.0',
        table: 'ST_C_COMPENSATE',
        group: 'st'
      };
      const param = obj;
      const formdata = new FormData();
      formdata.append('param', JSON.stringify(param));
      // 接口
      const res = await this.service.strategyPlatform.delCompenstate(formdata);
      if (res.status === 200) {
        self.$message.success(res.data.data.message);
        self.query(self.objid);
      }
      // axios({
      //   url: "/p/cs/delCompenstate",
      //   method: "post",
      //   data: formdata,
      // }).then((res) => {
      //   console.log(res);
      //   if (res.status === 200) {
      //     self.$Message.success(res.data.data.message);
      //     self.query(self.objid);
      //   }
      // });
    },
    // 查询方法
    async query(id) {
      const self = this;
      const obj = {
        objid: id
      };
      const param = obj;
      const formdata = new FormData();
      formdata.append('param', JSON.stringify(param));
      // 接口
      const res = await this.service.strategyPlatform.delCompenstate(formdata);
      if (res.status === 200) {
        if (res.data.ST_C_COMPENSATE.BILL_STATUS) self.identifying = res.data.ST_C_COMPENSATE.BILL_STATUS;
        if (res.data.ST_C_COMPENSATE.BILL_STATUS !== 1) self.jordanTableConfig.isShowDeleteDetailBtn = false;
        if (res.data.ST_C_COMPENSATE.END_TIME === null) res.data.ST_C_COMPENSATE.END_TIME = '';
        self.setData(res.data);
      }
      // axios({
      //   url: "/p/cs/selectCompenstateLogistic",
      //   method: "post",
      //   data: formdata,
      // }).then((res) => {
      //   console.log(res);
      //   if (res.status === 200) {
      //     if (res.data.ST_C_COMPENSATE.BILL_STATUS)
      //       self.identifying = res.data.ST_C_COMPENSATE.BILL_STATUS;
      //     if (res.data.ST_C_COMPENSATE.BILL_STATUS !== 1)
      //       self.jordanTableConfig.isShowDeleteDetailBtn = false;
      //     if (res.data.ST_C_COMPENSATE.END_TIME === null)
      //       res.data.ST_C_COMPENSATE.END_TIME = "";
      //     self.setData(res.data);
      //   }
      // });
    },
    // 新增明细方法
    async addDetail() {
      const self = this;
      const a = self.getData(self.objid);
      const param = a;
      // 获取新增明细栏所有值
      const addList = self.jordanTableConfig.jordanFormConfig.formValue;
      // 根据赔付类型,判断必选值
      const valueType = self.jordanTableConfig.jordanFormConfig.formValue;
      if ((valueType.COMPENSATE_TYPE === 1 || valueType.COMPENSATE_TYPE === 2) && (valueType.COMPENSATE_STANDARD === '' || valueType.MULTIPLE === '')) {
        self.$message.warning('赔付标准和倍数不能为空');
        self.$message.warning(this.vmI18n.t('modalTips.x5'));
        return;
      }
      if (valueType.COMPENSATE_TYPE === 3 && valueType.SETTLEMENTPRICE === '') {
        self.$message.warning('结算价不能为空');
        self.$message.warning(this.vmI18n.t('modalTips.x6'));
        return;
      }
      if (self.jordanTableConfig.jordanFormConfig.formData[0].itemdata.pid === '') {
        self.$message.warning('快递公司名称不能为空');
        self.$message.warning(this.vmI18n.t('modalTips.x7'));
        return;
      }
      addList.CP_C_LOGISTICS_ENAME = self.jordanTableConfig.jordanFormConfig.formData[0].itemdata.valuedata;
      addList.CP_C_LOGISTICS_ID = Number(self.jordanTableConfig.jordanFormConfig.formData[0].itemdata.pid);

      // 新增明细标识
      addList.ID = -1;
      param.fixcolumn.ST_C_COMPENSATE_LOGISTICS.push(addList);
      const formdata = new FormData();
      formdata.append('param', JSON.stringify(param));
      const {
        data: { code, data }
      } = await this.service.strategyPlatform.saveCompensate(formdata);
      if (data.code === 0) {
        self.removeDetail();
        if (JSON.stringify(data.data) !== '{}') {
          self.$store.commit('TabHref', {
            id: data.data.objid,
            type: 'action',
            name: 'courierPay',
            // label: "快递赔付方案",
            label: self.vmI18n.t('panel_label.express_compensation_scheme'),
            query: Object.assign({
              id: data.data.objid,
              // tabTitle: "快递赔付方案",
              tabTitle: self.vmI18n.t('panel_label.express_compensation_scheme')
            })
          });
        }
        self.$message.success(data.message);
      } else {
        self.$message.error(data.message);
        return;
      }
      self.query(self.objid);
    },
    // 保存清除明细条件
    removeDetail() {
      this.jordanTableConfig.jordanFormConfig.formValue = {};
      this.jordanTableConfig.jordanFormConfig.formData[0].itemdata.valuedata = '';
      this.jordanTableConfig.jordanFormConfig.formData[0].itemdata.pid = '';
    },
    // 选中明细列表
    onSelect(row) {
      this.detailList = row.map(item => item.ID);
    },

    onSelectAllCancel() {
      this.detailList = [];
    }
  }
};
