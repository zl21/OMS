import customizedPage from '@/config/config/customized.page.config.js'

/**
 * 重置tab页名称
 * @param {*} isList true: 列表
 * @returns 
 */
export default function (isList) {
  return {
    mounted() {
      const { customizedModuleId, customizedModuleName } = this.$route.params
      const keepAliveModuleName = `C.${customizedModuleName}.${customizedModuleId}`; // 拼接当前定制界面模块名称
      let label = customizedPage[customizedModuleName].labelName
      if (!label) return
      let mode = ''
      if (!isList) {
        let text = !(customizedModuleId > 0) ? $i18n.t('btn.add') : $i18n.t('table_label.edit')
        mode = localStorage.getItem('locale') == 'zh' ? text : ` ${text}`
      }
      label = label.replace(/新增|编辑|Add|Edit/, '').concat(mode)
      const data = { label, name: keepAliveModuleName }; // 当前界面模块名称 
      this.$store.commit('global/modifycurrentLabel', data)
    },
    methods: {
      /**
       * 返回tab名称
       * @param {*} type true: 新增 false: 编辑 默认: 列表
       * @returns 
       */
      getCustomLabel(type) {
        const { customizedModuleName } = this.$route.params
        let label = customizedPage[customizedModuleName].labelName
        if (!label) return
        let text = ''
        if (typeof type == 'boolean') {
          text = type ? $i18n.t('btn.add') : $i18n.t('table_label.edit')
        }
        const mode = localStorage.getItem('locale') == 'zh' ? text : ` ${text}`
        const filterLabel = label.replace(/新增|编辑|Add|Edit/, '')
        const customLabel = typeof type == 'boolean' ? filterLabel.concat(mode) : filterLabel
        console.log(customLabel);
        return customLabel
      }
    }
  }
}