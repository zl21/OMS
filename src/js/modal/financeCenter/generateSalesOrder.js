export default {
  components: {},
  name: 'generateSalesOrder',
  data() {
    return {
      type: '', // 月结:month 进度: progress
      generateFormConfig: {
        formValue: {
          vendorId: '', // 供应商编码
          type: '', // 状态
          billnumber: '' // 账单编码
        },
        formData: [
          {
            style: 'select', // 下拉框类型
            label: $i18n.t('form_label.supplierID'), // 供应商ID 下拉框前的值
            width: '24', // 所占宽度宽度
            value: 'vendorId', // 输入框的值
            multiple: false, // 布尔值,下拉框是否开启多选,默认为不开启
            disabled: false, // 是否禁用,默认为false
            clearable: true, // 下拉选中是否显示清空按钮,默认为false
            clearSelect: () => {
            }, // 点击清空按钮回调
            selectChange: () => {
            }, // 选中事件，默认返回选中的值,默认返回当前值value
            setRequired: 'required', // 必选标识,值不为required时无标识
            options: []
          },
          {
            style: 'select', // 下拉框类型
            label: $i18n.t('other.billCode'), // 账单编码 下拉框前的值
            width: '24', // 所占宽度宽度
            value: 'billNumber', // 输入框的值
            multiple: false,
            options: [],
            selectChange: (e) => {
              console.log(e);
              // this.formConfig.formValue.billNumber =
            }
          }
        ]
      },
      generateBtnConfig: {
        typeAll: 'default', // 按钮统一风格样式
        btnsite: 'right', // 按钮位置 (right , center , left)
        buttons: [
          {
            type: '', // 按钮类型
            text: $i18n.t('common.cancel'), // 取消 按钮文本
            icon: '', // 按钮图标
            size: '', // 按钮大小
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              this.$emit('closeActionDialog', false);
            } // 按钮点击事件
          },
          {
            type: '', // 按钮类型
            text: $i18n.t('btn.generate'), // 生成 按钮文本
            icon: '', // 按钮图标
            size: '', // 按钮大小
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              this.printData();
            } // 按钮点击事件
          }
        ]
      }
    };
  },
  methods: {
    init() {
      this.setFormValueType();
      this.getBillMonthAndVendorIds();
    },
    // 月结,进度
    setFormValueType() {
      if (this.$route.params.tableName == 'AC_F_VIP_BILL_MONTH_AGGREGATE') {
        // 月结
        this.generateFormConfig.formValue.type = '1';
      } else {
        // 进度
        this.generateFormConfig.formValue.type = '2';
      }
    },
    async getBillMonthAndVendorIds() {
      const params = {
        param: {
          type: this.generateFormConfig.formValue.type
        }
      };
      $omsUtils.setLoading(true);
      const { data: { data: { code, data } } } = await this.service.financeCenter.getVendorCodeAndBillNumber({ params });
      $omsUtils.setLoading();
      if (code === 0) {
        if (data.vendorIds) {
          this.generateFormConfig.formData[0].options = data.vendorIds.map(
            item => ({
              label: String(item),
              value: String(item)
            })
          );
        }
        if (data.billNumbers) {
          this.generateFormConfig.formData[1].options = data.billNumbers.map(
            item => ({
              label: item,
              value: item
            })
          );
        }
      }
    },
    // 打印
    async printData() {
      const formValue = this.generateFormConfig.formValue;
      if (!formValue.vendorId) {
        // 供应商ID不能为空!
        this.$Message.warning($i18n.t('modalTips.bl'));
        return false;
      }
      if (!formValue.billNumber) {
        // 账单编码不能为空!
        this.$Message.warning($i18n.t('modalTips.bm'));
        return false;
      }
      const params = {
        param: {
          type: formValue.type,
          vendorId: formValue.vendorId,
          billNumber: formValue.billNumber
        }
      };
      const { data: { data: { code, message } } } = await this.service.financeCenter.generateVipSalesOrder({ params });
      if (code === 0) {
        this.$message.success(message);
        this.$emit('closeActionDialog', true);
      }
    }
  },
  mounted() {
    window.generateSalesOrder = this;
    this.init();
  }
};
