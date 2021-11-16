/*
 * @Author: flybird
 * @Date: 2021-06-04 13:20:21
 * @LastEditTime: 2021-11-15 14:53:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /burgeon-project-logic/config/config/init.config.js
 */
import cus from 'burgeonConfig'
import '@/assets/css/css_1_3/custom.less'; // 框架 主题文件（变量）
import '@/assets/css/css_1_3/oms_index.less'; // 定制公共界面样式
import 'burgeonComponents/burgeon.publish/businessComponents.min.css' // 组件库样式

import R3 from '@syman/burgeon-r3';
import Vue from 'vue';
import commonUtils from '@/config/config/commonUtils.js'

import BC from 'burgeonComponents'
const { Utils, Directives } = BC
console.log('%cTest LocalDebug','color: #cc00ee;');
console.log('%cTest nodemon watch files change','color: red;');
console.log('BC::', BC);

// 注册自定义指令
Object.keys(Directives).forEach(key => {
  Vue.directive(key, Directives[key])
})

// import custUtils from 'burgeonComponents/burgeon.publish/common/js/utils.js'
import pageNote from 'burgeonConfig/config/pageNote'
import qs from 'qs';
import i18n from '@burgeon/internationalization/i18n'; // 国际化
import service from '@/service/index.js';
import store from '@/config/store/store'; // 将老框架公共状态注册为customize模块
import componentsConfig from 'burgeonComponents/package.json';
import omsThemecConfig from '@burgeon/oms-theme/package.json';
import internationalizationConfig from '@burgeon/internationalization/package.json';
import r3Version from '@syman/burgeon-r3/package.json';
import proVersion from './package.json';
let omsTheme = localStorage.getItem("VarTheme");
if(!omsTheme){
  localStorage.setItem("VarTheme", 'oms');
  omsTheme = localStorage.getItem("VarTheme");
}
const { components } = R3
Vue.component('WaterMark', components.WaterMark)
require(`@burgeon/oms-theme/skin/${omsTheme}/index.less`).default;
class InitAppConfig {
  constructor() {
    // -------------引入框架项目配置文件;
    // const customizedTheme = require(`@burgeon/oms-theme/skin/${omsSkinTheme}/index.min.css`).default;
    // window.$store = store;
    Vue.prototype.qs = qs;
    window.$store = store;
    window.$omsUtils = commonUtils;
    window.$utils = Utils.CM;
    window.$pageNote = pageNote;
    window.R3 = R3; // 暴露R3为全局变量
    window.OMS = cus;
    window.$i18n = i18n; // 挂载国际化
    // Vue.prototype.$theme = customizedTheme; // 将主题方法挂载到原型上
    // Vue.prototype.$comUtils = comUtils;
    Vue.prototype.$omsUtils = commonUtils;
    Vue.prototype.$utils = Utils.CM;
    Vue.prototype.$lodash = window._;
    Vue.prototype.service = service;
    Vue.prototype.vmI18n = i18n;
    window.version = {
      '@burgeon/business-components': componentsConfig.version,
      '@burgeon/project-logic': proVersion.version,
      '@burgeon/oms-theme': omsThemecConfig.version,
      '@burgeon/internationalization': internationalizationConfig.version,
      '@syman/burgeon-r3': r3Version.version,
      '@syman/ark-ui': window.Ark.version,
      '@syman/ark-ui-bcl': window.$Bcl.version,
    }

    // 路由守卫 去掉部分定制界面onresize方法
    R3.router.afterEach(to => {
      const tableNameArr = ['ORDERMANAGER', 'PAYABLEADJUSTMENTLIST', 'returngoodmanagementList', 'manualMatching', 'RETURNSTOREAGELIST', 'PROMACTIQUERYLIST', 'SETWAREHOUSELOGISTICS'];
      const currentTable = to.params.tableName || to.params.customizedModuleName;
      if (!tableNameArr.includes(currentTable)) {
        // window.onresize = null;
        // 销毁resize方法
        commonUtils.removeOnresize();
      }
    });

    // 存储可视化宽度
    let clientWidthsFun = () => {
      let clientWidths = document.body.clientWidth;
      if (clientWidths < 990) { $store.commit('customize/colRowNum', 3); } else { $store.commit('customize/colRowNum', 4); }
    };
    clientWidthsFun();
    // 屏幕变化
    window.onresize = () => clientWidthsFun();
  }
}

export default new InitAppConfig();
