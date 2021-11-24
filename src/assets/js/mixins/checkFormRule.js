// 检查必填项是否已经填写
export const checkRuleFunMixin = {
  mounted() {

  },
  methods: {
    /**
     * 表单校验
     * @param formConfig
     */
    checkRuleFun(formConfig) {
      for (const key in this[formConfig].formValue) {
        const val = this[formConfig].formValue[key]
        if ((this[formConfig].ruleValidate[key] && this[formConfig].ruleValidate[key][0].required) && ((Array.isArray(val)) ? !val.join('').length : !val)) {
          this.$Message.destroy()
          this.$Message.warning(this[formConfig].ruleValidate[key][0].message);
          this[formConfig].formData.forEach((item) => {
            $(`input[colname=${key}]`).focus()
            $(`#${formConfig}${key}`).focus()
          })
          return false
        }
      }
      return true
    },
  }
};
