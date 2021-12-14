
export default {
  components: {
  },
  data() {
    const _this = this;
    return {
      vmI18n: window.vmI18n,
      buttonConfig: {
        typeAll: 'error', // 按钮统一风格样式
        btnsite: 'right', // 按钮位置 (right , center , left)
        buttons: [
          {
            type: '', // 按钮类型
            text: window.vmI18n.t('common.cancel'), // 取消 按钮文本
            icon: '', // 按钮图标
            size: '', // 按钮大小
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              this.$emit('closeActionDialog', false);
            } // 按钮点击事件
          },
          {
            type: '', // 按钮类型
            text: window.vmI18n.t('common.determine'), // 确认 按钮文本
            icon: '', // 按钮图标
            size: '', // 按钮大小
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              this.submit('form');
            } // 按钮点击事件
          }
        ]
      },
      monthSearchStartDate: null,
      form: {
        OUTSTORAGE_CODE: "",
        LATEST_OUT_TIME: "",
        ARRIVAL_TIME: ""
      },
      rules: {
        "LATEST_OUT_TIME": [
          { required: true, message: '请选择预计发货时间', trigger: 'blur' }
        ],
        "ARRIVAL_TIME": [
          { required: true, message: '请选择预计到货时间', trigger: 'blur' },
        ],
      },
      timeConfig: {
        disabledDate(date) {
          return date && date.valueOf() < Date.now() - 86400000;
        }
      }
    };
  },
  mounted() {
    // 唯品会入库单号
    this.form.OUTSTORAGE_CODE =
        this.$parent.$parent.$parent.mainFormInfo.formData.data.addcolums[0].childs[1].valuedata;
  },
  methods: {
    async submit(name) {
      this.$refs[name].validate(async (valid) => {
        if (!valid) return false;
        const { LATEST_OUT_TIME, ARRIVAL_TIME } = this.form;
        if (ARRIVAL_TIME <= LATEST_OUT_TIME) return this.$Message.error('到货时间小于预计发货时间');
        // 提价修改
        const res = await this.service.orderCenter.updateSendTime(this.form);
        if (res.data.code === 0) {
          this.$Message.success(res.data.message || "修改成功");
          // 刷新页面
          const ActionMODIFY = document.getElementById('refresh');
          setTimeout(() => {
            ActionMODIFY.click();
          }, 300)
        } else this.$Message.error(res.data.message);
        this.$emit('closeActionDialog');  // 关闭Dailog
      })
    }
  }
};
