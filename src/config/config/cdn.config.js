// 项目CDN配置
const CDN_CONFIG = {
  echarts: {
    js: [
      'https://cdn.bootcdn.net/ajax/libs/echarts/5.1.2/echarts.min.js'
    ],
    css: []
  }
}

// 定制页面CDN加载配置
const customizePage = {
  MONITORINGPLATFORM: [CDN_CONFIG.echarts]
}
export default customizePage;