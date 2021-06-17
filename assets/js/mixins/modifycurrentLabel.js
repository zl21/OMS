import customizedPage from '@/config/config/customized.page.config.js'

export default {
  mounted() {
    const { customizedModuleId, customizedModuleName } = this.$route.params
    const keepAliveModuleName = `C.${customizedModuleName}.${customizedModuleId}`; // 拼接当前定制界面模块名称
    let label = customizedPage[customizedModuleName].labelName
    if (!label) return
    let mode = customizedModuleId > 0 ? '编辑' : '新增'
    label = label.replace(/新增|编辑/, '').concat(mode);
    const data = { label, name: keepAliveModuleName }; // 当前界面模块名称 
    this.$store.commit('global/modifycurrentLabel' , data)
  }
}