import axios from 'axios';
import businessForm from 'professionalComponents/businessForm';
import jordanBtn from 'professionalComponents/businessButton';
import businessActionTable from 'professionalComponents/businessActionTable.vue';

export default {
  components: {
    businessForm,
    jordanBtn,
    businessActionTable,
  },
  props: {
    componentData: {
      type: Object,
      default: {},
    },
  },
  computed: {},
  data() {
    return {
      vmI18n: window.vmI18n,
      btnConfig: {
        typeAll: 'error', // 按钮统一风格样式
        btnsite: 'right', // 按钮位置 (right , center , left)
        buttons: [
          {
            type: '', // 按钮类型
            // text: "保存", //按钮文本
            text: vmI18n.t('btn.save'), // 按钮文本
            icon: '', // 按钮图标
            size: 'small', // 按钮大小
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              const self = this;
              if (!self.isNullEmpty()) {
                return;
              }
              const obj = {};
              self.componentData.INVOICE_TYPE_LIST.map((item) => {
                if (item.INVOICE_TYPE_NAME === self.invoiceType) {
                  obj.INVOICE_TYPE = item.INVOICE_TYPE;
                }
              });
              self.componentData.HEADER_TYPE_LIST.map((item) => {
                if (item.HEADER_TYPE_NAME === self.invoiceTitleType) {
                  obj.HEADER_TYPE = item.HEADER_TYPE;
                }
              });
              if (self.componentData.OC_B_ORDER_INVOICE_INFORM) {
                obj.ID = self.componentData.OC_B_ORDER_INVOICE_INFORM.ID;
              }
              const params = {
                OC_B_ORDER_INVOICE_INFORM: Object.assign(
                  self.formConfig.formValue,
                  self.formConfig2.formValue,
                  obj
                ),
                QUERYORDERRESULT: self.componentData.QUERYORDERRESULT,
              };
              const fromdata = new FormData();
              fromdata.append('param', JSON.stringify(params));
              self.save(fromdata);
            }, // 按钮点击事件
          },
          {
            type: '', // 按钮类型
            // text: "取消", //按钮文本
            text: vmI18n.t('common.cancel'), // 按钮文本
            icon: '', // 按钮图标
            size: 'small', // 按钮大小
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              this.$parent.$parent.closeConfirm();
            }, // 按钮点击事件
          },
        ],
      },
      formConfig: {
        formData: [
          {
            style: 'input', // 输入框类型
            // label: "发票抬头", //输入框前文字
            label: vmI18n.t('form_label.invoiceTitle'),
            value: 'HEADER_NAME', // 输入框的值
            width: '12', // 所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
          },
          {
            style: 'input', // 输入框类型
            // label: "识别号", //输入框前文字
            label: vmI18n.t('form_label.identificationNo'),
            value: 'TAXPAYER_NO', // 输入框的值
            width: '12', // 所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
          },
          {
            style: 'input', // 输入框类型
            // label: "邮箱", //输入框前文字
            label: vmI18n.t('form_label.mailbox'),
            value: 'EMAIL', // 输入框的值
            width: '12', // 所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
          },
          {
            style: 'input', // 输入框类型
            // label: "公司地址", //输入框前文字
            label: vmI18n.t('form_label.companyAddress'),
            value: 'COMPANY', // 输入框的值
            width: '24', // 所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
          },
          {
            style: 'input', // 输入框类型
            // label: "电话号码", //输入框前文字
            label: vmI18n.t('form_label.telephoneNumber'),
            value: 'PHONE_NO', // 输入框的值
            width: '12', // 所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
          },
          {
            style: 'input', // 输入框类型
            // label: "开户银行", //输入框前文字
            label: vmI18n.t('form_label.bankOFdeposit'),
            value: 'OPENING_BANK', // 输入框的值
            width: '12', // 所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
          },
          {
            style: 'input', // 输入框类型
            // label: "开户行账号", //输入框前文字
            label: vmI18n.t('form_label.bankAccountNo'),
            value: 'OPENING_BANK_ACCOUNT', // 输入框的值
            width: '24', // 所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
          },
          {
            style: 'input', // 输入框类型
            // label: "发票备注", //输入框前文字
            label: vmI18n.t('form_label.invoice_remarks'),
            value: 'INVOICE_REMARK', // 输入框的值
            width: '24', // 所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
          },
        ],
        formValue: {
          // 存储表单得所有值
          HEADER_NAME: '',
          TAXPAYER_NO: '',
          EMAIL: '',
          COMPANY: '',
          PHONE_NO: '',
          OPENING_BANK: '',
          OPENING_BANK_ACCOUNT: '',
          INVOICE_REMARK: '',
        },
        // 表单非空提示
        ruleValidate: {
          HEADER_NAME: [
            // { required: true, message: "发票抬头不能为空", trigger: "blur" },
            {
              required: true,
              message: vmI18n.t('modalTips.zw'),
              trigger: 'blur',
            },
          ], // 发票抬头
        },
      },
      formConfig2: {
        formValue: {
          // 存储表单得所有值
          RECEIVE_NAME: '',
          RECEIVER_MOBILE: '',
          RECEIVER_ADDRESS: '',
        },
        formData: [
          {
            style: 'input', // 输入框类型
            // label: "收货人", //输入框前文字
            label: vmI18n.t('form_label.consignee'),
            value: 'RECEIVE_NAME', // 输入框的值
            width: '12', // 所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
          },
          {
            style: 'input', // 输入框类型
            // label: "手机号", //输入框前文字
            label: vmI18n.t('form_label.cellPhone_numbe'),
            value: 'RECEIVER_MOBILE', // 输入框的值
            width: '12', // 所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
          },
          {
            style: 'input', // 输入框类型
            // label: "收票地址", //输入框前文字
            label: vmI18n.t('form_label.receiptAddress'),
            value: 'RECEIVER_ADDRESS', // 输入框的值
            width: '24', // 所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
          },
        ],
      },
      // invoiceType: "电子发票", // 发票类型
      invoiceType: vmI18n.t('form_label.electronic_invoice'),
      invoiceTitleType: '个人', // 抬头类型
      invoiceFooterFlag: false, // 控制收票信息显示
      identificationFlag: false, // 根据抬头类型控制识别号显示
      specialInvoiceFlag: false, // 专用发票标识，用来隐藏抬头类型和邮箱
    };
  },
  mounted() {
    const self = this;
    if (self.componentData.OC_B_ORDER_INVOICE_INFORM) {
      self.getFormValue(self.componentData.OC_B_ORDER_INVOICE_INFORM);
    } else if (self.invoiceTitleType === '个人') {
      self.formConfig.formValue.HEADER_NAME = self.componentData.QUERYORDERRESULT.RECEIVER_NAME;
    }
    self.controlFormData();
  },
  methods: {
    // 发票类型改变事件
    invoiceTypeChange(value) {
      const self = this;
      if (value === '电子发票') {
        self.invoiceFooterFlag = false; // 不显示收票信息
        self.specialInvoiceFlag = false; // 不是专用发票
      } else {
        self.invoiceFooterFlag = true;
        if (value === '专用发票') {
          self.specialInvoiceFlag = true;
        } else {
          self.specialInvoiceFlag = false;
        }
      }
      self.formConfig.ruleValidate = {};
      if (value !== '专用发票') {
        if (self.identificationFlag) {
          self.formConfig.ruleValidate = {
            HEADER_NAME: [
              // { required: true, message: "发票抬头不能为空", trigger: "blur" },
              {
                required: true,
                message: vmI18n.t('modalTips.zw'),
                trigger: 'blur',
              },
            ], // 发票抬头
            TAXPAYER_NO: [
              // { required: true, message: "识别号不能为空", trigger: "blur" },
              {
                required: true,
                message: vmI18n.t('modalTips.zx'),
                trigger: 'blur',
              },
            ], // 识别号
            COMPANY: [
              // { required: false, message: "公司地址不能为空", trigger: "blur" },
              {
                required: true,
                message: vmI18n.t('modalTips.zy'),
                trigger: 'blur',
              },
            ], // 公司地址
            PHONE_NO: [
              // { required: false, message: "电话号码不能为空", trigger: "blur" },
              {
                required: true,
                message: vmI18n.t('modalTips.zz'),
                trigger: 'blur',
              },
            ], // 电话号码
            OPENING_BANK: [
              // { required: false, message: "开户银行不能为空", trigger: "blur" },
              {
                required: true,
                message: vmI18n.t('modalTips.ya'),
                trigger: 'blur',
              },
            ], // 开户银行
            OPENING_BANK_ACCOUNT: [
              {
                required: false,
                // message: "开户行账号不能为空",
                message: vmI18n.t('modalTips.yb'),
                trigger: 'blur',
              },
            ], // 开户行账号
          };
        } else {
          self.formConfig.ruleValidate = {};
          self.formConfig.ruleValidate = {
            HEADER_NAME: [
              // { required: true, message: "发票抬头不能为空", trigger: "blur" },
              {
                required: true,
                message: vmI18n.t('modalTips.zw'),
                trigger: 'blur',
              },
            ], // 发票抬头
            COMPANY: [
              // { required: false, message: "公司地址不能为空", trigger: "blur" },
              {
                required: true,
                message: vmI18n.t('modalTips.zy'),
                trigger: 'blur',
              },
            ], // 公司地址
            PHONE_NO: [
              // { required: false, message: "电话号码不能为空", trigger: "blur" },
              {
                required: true,
                message: vmI18n.t('modalTips.zz'),
                trigger: 'blur',
              },
            ], // 电话号码
            OPENING_BANK: [
              // { required: false, message: "开户银行不能为空", trigger: "blur" },
              {
                required: true,
                message: vmI18n.t('modalTips.ya'),
                trigger: 'blur',
              },
            ], // 开户银行
            OPENING_BANK_ACCOUNT: [
              {
                required: false,
                // message: "开户行账号不能为空",
                message: vmI18n.t('modalTips.yb'),
                trigger: 'blur',
              },
            ], // 开户行账号
          };
        }
      } else {
        self.formConfig.ruleValidate = {
          HEADER_NAME: [
            // { required: true, message: "发票抬头不能为空", trigger: "blur" },
            {
              required: true,
              message: vmI18n.t('modalTips.zw'),
              trigger: 'blur',
            },
          ], // 发票抬头
          TAXPAYER_NO: [
            // { required: true, message: "识别号不能为空", trigger: "blur" },
            {
              required: true,
              message: vmI18n.t('modalTips.zx'),
              trigger: 'blur',
            },
          ], // 识别号
          COMPANY: [
            // { required: true, message: "公司地址不能为空", trigger: "blur" },
            {
              required: true,
              message: vmI18n.t('modalTips.zy'),
              trigger: 'blur',
            },
          ], // 公司地址
          PHONE_NO: [
            // { required: true, message: "电话号码不能为空", trigger: "blur" },
            {
              required: true,
              message: vmI18n.t('modalTips.zz'),
              trigger: 'blur',
            },
          ], // 电话号码
          OPENING_BANK: [
            // { required: true, message: "开户银行不能为空", trigger: "blur" },
            {
              required: true,
              message: vmI18n.t('modalTips.ya'),
              trigger: 'blur',
            },
          ], // 开户银行
          OPENING_BANK_ACCOUNT: [
            // { required: true, message: "开户行账号不能为空", trigger: "blur" },
            {
              required: true,
              message: vmI18n.t('modalTips.yb'),
              trigger: 'blur',
            },
          ], // 开户行账号
        };
      }
      self.controlFormData();
    },
    // 抬头类型改变事件
    invoiceTitleTypeChange(value) {
      const self = this;
      self.formConfig.ruleValidate = {};
      if (value === '个人') {
        self.identificationFlag = false;
        if (!self.componentData.OC_B_ORDER_INVOICE_INFORM) {
          self.formConfig.formValue.HEADER_NAME = self.componentData.QUERYORDERRESULT.RECEIVER_NAME;
        }
        self.formConfig.ruleValidate = {
          HEADER_NAME: [
            // { required: true, message: "发票抬头不能为空", trigger: "blur" },
            {
              required: true,
              message: vmI18n.t('modalTips.zw'),
              trigger: 'blur',
            },
          ], // 发票抬头
          COMPANY: [
            // { required: false, message: "公司地址不能为空", trigger: "blur" },
            {
              required: true,
              message: vmI18n.t('modalTips.zy'),
              trigger: 'blur',
            },
          ], // 公司地址
          PHONE_NO: [
            // { required: false, message: "电话号码不能为空", trigger: "blur" },
            {
              required: true,
              message: vmI18n.t('modalTips.zz'),
              trigger: 'blur',
            },
          ], // 电话号码
          OPENING_BANK: [
            // { required: false, message: "开户银行不能为空", trigger: "blur" },
            {
              required: true,
              message: vmI18n.t('modalTips.ya'),
              trigger: 'blur',
            },
          ], // 开户银行
          OPENING_BANK_ACCOUNT: [
            // { required: false, message: "开户行账号不能为空", trigger: "blur" },
            {
              required: true,
              message: vmI18n.t('modalTips.yb'),
              trigger: 'blur',
            },
          ], // 开户行账号
        };
      } else {
        self.identificationFlag = true;
        self.formConfig.ruleValidate = {};
        self.formConfig.formValue.HEADER_NAME = '';
        self.formConfig.ruleValidate = {
          HEADER_NAME: [
            // { required: true, message: "发票抬头不能为空", trigger: "blur" },
            {
              required: true,
              message: vmI18n.t('modalTips.zw'),
              trigger: 'blur',
            },
          ], // 发票抬头
          TAXPAYER_NO: [
            // { required: true, message: "识别号不能为空", trigger: "blur" },
            {
              required: true,
              message: vmI18n.t('modalTips.zx'),
              trigger: 'blur',
            },
          ], // 识别号
          COMPANY: [
            // { required: false, message: "公司地址不能为空", trigger: "blur" },
            {
              required: true,
              message: vmI18n.t('modalTips.zy'),
              trigger: 'blur',
            },
          ], // 公司地址
          PHONE_NO: [
            // { required: false, message: "电话号码不能为空", trigger: "blur" },
            {
              required: true,
              message: vmI18n.t('modalTips.zz'),
              trigger: 'blur',
            },
          ], // 电话号码
          OPENING_BANK: [
            // { required: false, message: "开户银行不能为空", trigger: "blur" },
            {
              required: true,
              message: vmI18n.t('modalTips.ya'),
              trigger: 'blur',
            },
          ], // 开户银行
          OPENING_BANK_ACCOUNT: [
            // { required: false, message: "开户行账号不能为空", trigger: "blur" },
            {
              required: true,
              message: vmI18n.t('modalTips.yb'),
              trigger: 'blur',
            },
          ], // 开户行账号
        };
      }
      self.controlFormData();
    },
    // 详情表单复制
    getFormValue(data) {
      const self = this;
      self.componentData.HEADER_TYPE_LIST.map((item) => {
        if (item.HEADER_TYPE === data.HEADER_TYPE) {
          self.invoiceTitleType = item.HEADER_TYPE_NAME;
          self.invoiceTitleTypeChange(self.invoiceTitleType);
        }
      });
      self.componentData.INVOICE_TYPE_LIST.map((item) => {
        if (item.INVOICE_TYPE === data.INVOICE_TYPE) {
          self.invoiceType = item.INVOICE_TYPE_NAME;
          self.invoiceTypeChange(self.invoiceType);
        }
      });
      self.formConfig.formValue = {
        HEADER_NAME: data.HEADER_NAME,
        TAXPAYER_NO: data.TAXPAYER_NO,
        EMAIL: data.EMAIL,
        COMPANY: data.COMPANY,
        PHONE_NO: data.PHONE_NO,
        OPENING_BANK: data.OPENING_BANK,
        OPENING_BANK_ACCOUNT: data.OPENING_BANK_ACCOUNT,
        INVOICE_REMARK: data.INVOICE_REMARK,
      };
      self.formConfig2.formValue = {
        RECEIVE_NAME: data.RECEIVE_NAME,
        RECEIVER_MOBILE: data.RECEIVER_MOBILE,
        RECEIVER_ADDRESS: data.RECEIVER_ADDRESS,
      };
    },
    // 控制识别号和邮箱的显示
    controlFormData() {
      const self = this;
      self.formConfig.formData.map((item) => {
        if (self.specialInvoiceFlag) {
          if (item.label === '识别号') {
            item.style = 'input';
          }
          if (item.label === '邮箱') {
            item.style = '';
          }
        } else {
          if (self.identificationFlag) {
            if (item.label === '识别号') {
              item.style = 'input';
            }
          } else if (item.label === '识别号') {
            item.style = '';
          }
          if (item.label === '邮箱' && item.style === '') {
            item.style = 'input';
          }
        }
      });
    },
    // 非空判断
    isNullEmpty() {
      const self = this;
      let promptMessage = ''; // 非空提示信息
      const obj = self.formConfig.ruleValidate;
      for (const key in obj) {
        if (obj[key][0].required && !self.formConfig.formValue[key]) {
          promptMessage = obj[key][0].message;
          self.$Message.warning(promptMessage);
          return;
        }
      }
      if (promptMessage) {
        return false;
      } 
      return true;
    },
    // 保存
    save(params) {
      const self = this;
      axios({
        url: '/api/cs/oc/oms/v1/recordInvoicing',
        method: 'post',
        data: params,
      }).then((res) => {
        if (res.data.code === 0) {
          self.$Message.success(res.data.message);
          self.$parent.$parent.closeConfirm();
          self.$parent.$parent.$parent.getData();
        } else {
          // self.$Message.warning(res.data.message || "保存未成功!");
          self.$Message.warning(res.data.message || vmI18n.t('modalTips.g2'));
        }
      });
    },
  },
};
