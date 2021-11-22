export default {
  components: {},
  props: {
    componentData: {
      type: Object,
      default: {}
    }
  },
  computed: {},
  data() {
    return {
      btnConfig: {
        typeAll: 'default', // 按钮统一风格样式
        btnsite: 'right', // 按钮位置 (right , center , left)
        buttons: []
      },
      formConfig: {
        formData: [],
        formValue: {
          // 存储表单得所有值
          HEADER_NAME: '',
          TAXPAYER_NO: '',
          EMAIL: '',
          COMPANY: '',
          PHONE_NO: '',
          OPENING_BANK: '',
          OPENING_BANK_ACCOUNT: '',
          INVOICE_REMARK: ''
        },
        // 表单非空提示
        ruleValidate: {
          HEADER_NAME: [
            {
              required: true,
              message: '',
              trigger: 'blur'
            }
          ] // 发票抬头
        }
      },
      formConfig2: {
        formValue: {
          // 存储表单得所有值
          RECEIVE_NAME: '',
          RECEIVER_MOBILE: '',
          RECEIVER_ADDRESS: ''
        },
        formData: []
      },
      // invoiceType: "电子发票", // 发票类型
      invoiceType: '',
      invoiceTitleType: $i18n.t('form_label.personal'), // '个人', // 抬头类型
      invoiceFooterFlag: false, // 控制收票信息显示
      identificationFlag: false, // 根据抬头类型控制识别号显示
      specialInvoiceFlag: false // 专用发票标识，用来隐藏抬头类型和邮箱
    };
  },
  mounted() {
    this.invoiceType = $i18n.t('form_label.electronic_invoice');
    this.btnConfig.buttons = [
      {
        type: '', // 按钮类型
        text: $i18n.t('common.cancel'), // 取消 按钮文本
        icon: '', // 按钮图标
        size: 'small', // 按钮大小
        disabled: false, // 按钮禁用控制
        btnclick: () => {
          this.$parent.$parent.closeConfirm();
        } // 按钮点击事件
      },
      {
        type: '', // 按钮类型
        text: $i18n.t('btn.save'), // 保存 按钮文本
        icon: '', // 按钮图标
        size: 'small', // 按钮大小
        disabled: false, // 按钮禁用控制
        btnclick: () => {
          const self = this;
          if (!self.isNullEmpty()) {
            return;
          }
          const obj = {};
          self.componentData.INVOICE_TYPE_LIST.forEach(item => {
            if (item.INVOICE_TYPE_NAME === self.invoiceType) {
              obj.INVOICE_TYPE = item.INVOICE_TYPE;
            }
          });
          self.componentData.HEADER_TYPE_LIST.forEach(item => {
            if (item.HEADER_TYPE_NAME === self.invoiceTitleType) {
              obj.HEADER_TYPE = item.HEADER_TYPE;
            }
          });
          if (self.componentData.OC_B_ORDER_INVOICE_INFORM) {
            obj.ID = self.componentData.OC_B_ORDER_INVOICE_INFORM.ID;
          }
          const params = {
            OC_B_ORDER_INVOICE_INFORM: Object.assign(self.formConfig.formValue, self.formConfig2.formValue, obj),
            QUERYORDERRESULT: self.componentData.QUERYORDERRESULT
          };
          const fromdata = new FormData();
          fromdata.append('param', JSON.stringify(params));
          self.save(fromdata);
        } // 按钮点击事件
      }
    ];

    this.formConfig.formData = [
      {
        style: 'input', // 输入框类型
        label: $i18n.t('form_label.invoiceTitle'),
        value: 'HEADER_NAME', // 输入框的值
        width: '12' // 所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
      },
      {
        style: 'input', // 输入框类型
        label: $i18n.t('form_label.identificationNo'),
        value: 'TAXPAYER_NO', // 输入框的值
        width: '12' // 所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
      },
      {
        style: 'input', // 输入框类型
        label: $i18n.t('form_label.mailbox'),
        value: 'EMAIL', // 输入框的值
        width: '12' // 所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
      },
      {
        style: 'input', // 输入框类型
        label: $i18n.t('form_label.companyAddress'),
        value: 'COMPANY', // 输入框的值
        width: '24' // 所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
      },
      {
        style: 'input', // 输入框类型
        label: $i18n.t('form_label.telephoneNumber'),
        value: 'PHONE_NO', // 输入框的值
        width: '12' // 所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
      },
      {
        style: 'input', // 输入框类型
        label: $i18n.t('form_label.bankOFdeposit'),
        value: 'OPENING_BANK', // 输入框的值
        width: '12' // 所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
      },
      {
        style: 'input', // 输入框类型
        label: $i18n.t('form_label.bankAccountNo'),
        value: 'OPENING_BANK_ACCOUNT', // 输入框的值
        width: '24' // 所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
      },
      {
        style: 'input', // 输入框类型
        label: $i18n.t('form_label.invoice_remarks'),
        value: 'INVOICE_REMARK', // 输入框的值
        width: '24' // 所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
      }
    ];
    this.formConfig2.formData = [
      {
        style: 'input', // 输入框类型
        label: $i18n.t('form_label.consignee'),
        value: 'RECEIVE_NAME', // 输入框的值
        width: '12' // 所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
      },
      {
        style: 'input', // 输入框类型
        label: $i18n.t('form_label.cellPhone_number'),
        value: 'RECEIVER_MOBILE', // 输入框的值
        width: '12' // 所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
      },
      {
        style: 'input', // 输入框类型
        label: $i18n.t('form_label.receiptAddress'),
        value: 'RECEIVER_ADDRESS', // 输入框的值
        width: '24' // 所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
      }
    ];

    this.formConfig.ruleValidate.HEADER_NAME.message = $i18n.t('modalTips.zw');
    if (this.componentData.OC_B_ORDER_INVOICE_INFORM) {
      this.getFormValue(this.componentData.OC_B_ORDER_INVOICE_INFORM);
    } else if (this.invoiceTitleType === $i18n.t('form_label.personal')) {
      this.formConfig.formValue.HEADER_NAME = this.componentData.QUERYORDERRESULT.RECEIVER_NAME;
    }
    this.controlFormData();
  },
  methods: {
    // 发票类型改变事件
    invoiceTypeChange(value) {
      const self = this;
      // '电子发票'
      if (value === $i18n.t('form_label.electronic_invoice')) {
        self.invoiceFooterFlag = false; // 不显示收票信息
        self.specialInvoiceFlag = false; // 不是专用发票
      } else {
        self.invoiceFooterFlag = true;
        // '专用发票'
        if (value === $i18n.t('form_label.special_invoice')) {
          self.specialInvoiceFlag = true;
        } else {
          self.specialInvoiceFlag = false;
        }
      }
      self.formConfig.ruleValidate = {};
      if (value !== $i18n.t('form_label.special_invoice')) {
        if (self.identificationFlag) {
          self.formConfig.ruleValidate = {
            HEADER_NAME: [
              {
                required: true,
                message: $i18n.t('modalTips.zw'),
                trigger: 'blur'
              }
            ], // 发票抬头
            TAXPAYER_NO: [
              {
                required: true,
                message: $i18n.t('modalTips.zx'),
                trigger: 'blur'
              }
            ], // 识别号
            COMPANY: [
              {
                required: true,
                message: $i18n.t('modalTips.zy'),
                trigger: 'blur'
              }
            ], // 公司地址
            PHONE_NO: [
              {
                required: true,
                message: $i18n.t('modalTips.zz'),
                trigger: 'blur'
              }
            ], // 电话号码
            OPENING_BANK: [
              {
                required: true,
                message: $i18n.t('modalTips.ya'),
                trigger: 'blur'
              }
            ], // 开户银行
            OPENING_BANK_ACCOUNT: [
              {
                required: false,
                message: $i18n.t('modalTips.yb'),
                trigger: 'blur'
              }
            ] // 开户行账号
          };
        } else {
          self.formConfig.ruleValidate = {};
          self.formConfig.ruleValidate = {
            HEADER_NAME: [
              {
                required: true,
                message: $i18n.t('modalTips.zw'),
                trigger: 'blur'
              }
            ], // 发票抬头
            COMPANY: [
              {
                required: true,
                message: $i18n.t('modalTips.zy'),
                trigger: 'blur'
              }
            ], // 公司地址
            PHONE_NO: [
              {
                required: true,
                message: $i18n.t('modalTips.zz'),
                trigger: 'blur'
              }
            ], // 电话号码
            OPENING_BANK: [
              {
                required: true,
                message: $i18n.t('modalTips.ya'),
                trigger: 'blur'
              }
            ], // 开户银行
            OPENING_BANK_ACCOUNT: [
              {
                required: false,
                message: $i18n.t('modalTips.yb'),
                trigger: 'blur'
              }
            ] // 开户行账号
          };
        }
      } else {
        self.formConfig.ruleValidate = {
          HEADER_NAME: [
            {
              required: true,
              message: $i18n.t('modalTips.zw'),
              trigger: 'blur'
            }
          ], // 发票抬头
          TAXPAYER_NO: [
            {
              required: true,
              message: $i18n.t('modalTips.zx'),
              trigger: 'blur'
            }
          ], // 识别号
          COMPANY: [
            {
              required: true,
              message: $i18n.t('modalTips.zy'),
              trigger: 'blur'
            }
          ], // 公司地址
          PHONE_NO: [
            {
              required: true,
              message: $i18n.t('modalTips.zz'),
              trigger: 'blur'
            }
          ], // 电话号码
          OPENING_BANK: [
            {
              required: true,
              message: $i18n.t('modalTips.ya'),
              trigger: 'blur'
            }
          ], // 开户银行
          OPENING_BANK_ACCOUNT: [
            {
              required: true,
              message: $i18n.t('modalTips.yb'),
              trigger: 'blur'
            }
          ] // 开户行账号
        };
      }
      self.controlFormData();
    },
    // 抬头类型改变事件
    invoiceTitleTypeChange(value) {
      const self = this;
      self.formConfig.ruleValidate = {};
      // === 个人
      if (value === $i18n.t('form_label.personal')) {
        self.identificationFlag = false;
        if (!self.componentData.OC_B_ORDER_INVOICE_INFORM) {
          self.formConfig.formValue.HEADER_NAME = self.componentData.QUERYORDERRESULT.RECEIVER_NAME;
        }
        self.formConfig.ruleValidate = {
          HEADER_NAME: [
            {
              required: true,
              message: $i18n.t('modalTips.zw'),
              trigger: 'blur'
            }
          ], // 发票抬头
          COMPANY: [
            {
              required: true,
              message: $i18n.t('modalTips.zy'),
              trigger: 'blur'
            }
          ], // 公司地址
          PHONE_NO: [
            {
              required: true,
              message: $i18n.t('modalTips.zz'),
              trigger: 'blur'
            }
          ], // 电话号码
          OPENING_BANK: [
            {
              required: true,
              message: $i18n.t('modalTips.ya'),
              trigger: 'blur'
            }
          ], // 开户银行
          OPENING_BANK_ACCOUNT: [
            {
              required: true,
              message: $i18n.t('modalTips.yb'),
              trigger: 'blur'
            }
          ] // 开户行账号
        };
      } else {
        self.identificationFlag = true;
        self.formConfig.ruleValidate = {};
        self.formConfig.formValue.HEADER_NAME = '';
        self.formConfig.ruleValidate = {
          HEADER_NAME: [
            {
              required: true,
              message: $i18n.t('modalTips.zw'),
              trigger: 'blur'
            }
          ], // 发票抬头
          TAXPAYER_NO: [
            {
              required: true,
              message: $i18n.t('modalTips.zx'),
              trigger: 'blur'
            }
          ], // 识别号
          COMPANY: [
            {
              required: true,
              message: $i18n.t('modalTips.zy'),
              trigger: 'blur'
            }
          ], // 公司地址
          PHONE_NO: [
            {
              required: true,
              message: $i18n.t('modalTips.zz'),
              trigger: 'blur'
            }
          ], // 电话号码
          OPENING_BANK: [
            {
              required: true,
              message: $i18n.t('modalTips.ya'),
              trigger: 'blur'
            }
          ], // 开户银行
          OPENING_BANK_ACCOUNT: [
            {
              required: true,
              message: $i18n.t('modalTips.yb'),
              trigger: 'blur'
            }
          ] // 开户行账号
        };
      }
      self.controlFormData();
    },
    // 详情表单复制
    getFormValue(data) {
      this.componentData.HEADER_TYPE_LIST.forEach(item => {
        if (item.HEADER_TYPE === data.HEADER_TYPE) {
          this.invoiceTitleType = item.HEADER_TYPE_NAME;
          this.invoiceTitleTypeChange(this.invoiceTitleType);
        }
      });
      this.componentData.INVOICE_TYPE_LIST.forEach(item => {
        if (item.INVOICE_TYPE === data.INVOICE_TYPE) {
          this.invoiceType = item.INVOICE_TYPE_NAME;
          this.invoiceTypeChange(this.invoiceType);
        }
      });
      this.formConfig.formValue = {
        HEADER_NAME: data.HEADER_NAME,
        TAXPAYER_NO: data.TAXPAYER_NO,
        EMAIL: data.EMAIL,
        COMPANY: data.COMPANY,
        PHONE_NO: data.PHONE_NO,
        OPENING_BANK: data.OPENING_BANK,
        OPENING_BANK_ACCOUNT: data.OPENING_BANK_ACCOUNT,
        INVOICE_REMARK: data.INVOICE_REMARK
      };
      this.formConfig2.formValue = {
        RECEIVE_NAME: data.RECEIVE_NAME,
        RECEIVER_MOBILE: data.RECEIVER_MOBILE,
        RECEIVER_ADDRESS: data.RECEIVER_ADDRESS
      };
    },
    // 控制识别号和邮箱的显示
    controlFormData() {
      this.formConfig.formData.forEach(item => {
        if (this.specialInvoiceFlag) {
          // '识别号'
          if (item.label === $i18n.t('form_label.identificationNo')) {
            item.style = 'input';
          }
          // '邮箱'
          if (item.label === $i18n.t('form_label.mailbox')) {
            item.style = '';
          }
        } else {
          if (this.identificationFlag) {
            if (item.label === $i18n.t('form_label.identificationNo')) {
              item.style = 'input';
            }
          } else if (item.label === $i18n.t('form_label.identificationNo')) {
            item.style = '';
          }
          if (item.label === $i18n.t('form_label.mailbox') && item.style === '') {
            item.style = 'input';
          }
        }
      });
    },
    // 非空判断
    isNullEmpty() {
      let promptMessage = ''; // 非空提示信息
      const obj = this.formConfig.ruleValidate;
      for (const key in obj) {
        if (obj[key][0].required && !this.formConfig.formValue[key]) {
          promptMessage = obj[key][0].message;
          this.$Message.warning(promptMessage);
          return promptMessage;
        }
      }

      return true;
    },
    // 保存
    save(params) {
      const self = this;
      this.service.orderCenter.recordInvoicing(params).then((res) => {
        if (res.data.code === 0) {
          self.$Message.success(res.data.message);
          self.$parent.$parent.closeConfirm();
          self.$parent.$parent.$parent.getData();
        } else {
          // self.$Message.warning(res.data.message || "保存未成功!");
          self.$Message.warning(res.data.message || $i18n.t('modalTips.g2'));
        }
      });
    }
  }
};
