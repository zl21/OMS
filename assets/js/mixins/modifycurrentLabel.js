import customizedPage from '@/config/config/customized.page.config.js'

export default {
  mounted() {
    const { customizedModuleId, customizedModuleName } = this.$route.params
    const keepAliveModuleName = `C.${customizedModuleName}.${customizedModuleId}`; // 拼接当前定制界面模块名称
    let label = this.getCustomLabel(!(customizedModuleId > 0))
    if (!label) return
    const data = { label, name: keepAliveModuleName }; // 当前界面模块名称 
    this.$store.commit('global/modifycurrentLabel', data)
  },
  methods: {
    /**
     * 返回tab名称
     * @param {*} isAdd true 新增 false 编辑
     * @returns 
     */
    getCustomLabel(isAdd) {
      const { customizedModuleName } = this.$route.params
      let label = customizedPage[customizedModuleName].labelName
      if (!label) return
      let text = isAdd ? $i18n.t('btn.add') : $i18n.t('table_label.edit')
      const mode = localStorage.getItem('locale') == 'zh' ? text : ` ${text}`
      const customLabel = label.replace(/新增|编辑|Add|Edit/, '').concat(mode)
      console.log(customLabel);
      return customLabel
    }
  }
}