import customizedPage from '@/config/config/customized.page.config.js'

export default {
  mounted() {
    const { customizedModuleId, customizedModuleName } = this.$route.params
    const keepAliveModuleName = `C.${customizedModuleName}.${customizedModuleId}`; // 拼接当前定制界面模块名称
    let label = customizedPage[customizedModuleName].labelName
    if (!label) return
    let mode = customizedModuleId > 0 ? $i18n.t('table_label.edit') : $i18n.t('btn.add')
    let lan = localStorage.getItem('locale')
    const title = lan == 'zh' ? mode : ` ${mode}`
    label = label.replace(/新增|编辑|Add|Edit/, '').concat(title);
    const data = { label, name: keepAliveModuleName }; // 当前界面模块名称 
    this.$store.commit('global/modifycurrentLabel' , data)
  }
}