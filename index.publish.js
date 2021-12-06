/*
 * @Author: flybird
 * @Date: 2021-06-04 13:20:21
 * @LastEditTime: 2021-11-16 09:59:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /burgeon-project-logic/config/config/init.config.js
 */
import Vue from 'vue';
import R3 from '@syman/burgeon-r3';
import '@/assets/css/css_1_3/custom.less'; // 框架 主题文件（变量）
import '@/assets/css/css_1_3/oms_index.less'; // 定制公共界面样式

// import BC from 'burgeonComponents'
// Vue.use(BC);
// console.log('BC::', BC);

// import cus from 'burgeonConfig'
// import pageNote from '@/config/config/pageNote'
import qs from 'qs';
import i18n from '@burgeon/internationalization/i18n'; // 国际化
import service from '@/service/index.js';
import store from '@/config/store/store'; // 将老框架公共状态注册为customize模块

import omsThemecConfig from '@burgeon/oms-theme/package.json';
import internationalizationConfig from '@burgeon/internationalization/package.json';
import proVersion from './package.json';
import ImportCDNJS from 'import-cdn-js';

let omsTheme = localStorage.getItem("VarTheme");
if (!omsTheme) {
  localStorage.setItem("VarTheme", 'oms');
  omsTheme = localStorage.getItem("VarTheme");
}
const { components } = R3
Vue.component('WaterMark', components.WaterMark)
require(`@burgeon/oms-theme/skin/${omsTheme}/index.less`).default;
import Burgeon from 'burgeonComponents'

// export default ImportCDNJS('//cdn.jsdelivr.net/gh/zl21/OMS/burgeon.publish/businessComponents.min.js', 'Burgeon')
//   .then(Burgeon => {
    Vue.use(Burgeon);
    window.BC = Burgeon;
    
    let pageNote = require('@/config/config/pageNote').default;
    console.log(pageNote);

    window.$store = store;
    window.$pageNote = pageNote;
    window.R3 = R3; // 暴露R3为全局变量
    window.$i18n = i18n; // 挂载国际化
    window.$it = (str) => {
      return i18n.t(str)
    }
    // Vue.prototype.$theme = customizedTheme; // 将主题方法挂载到原型上
    Vue.prototype.qs = qs;
    Vue.prototype.$lodash = window._;
    Vue.prototype.service = service;
    Vue.prototype.vmI18n = i18n; // 暂时留着, for 组件库
    Vue.prototype.$it = (str) => {
      return i18n.t(str)
    }

    let cus = require('@/config').default;
    window.OMS = cus;
    window.$omsUtils = cus.omsUtils;
    Vue.prototype.$omsUtils = cus.omsUtils;

    window.version = {
      '@burgeon/project-logic': proVersion.version,
      '@burgeon/business-components': BC.version,
      '@burgeon/oms-theme': omsThemecConfig.version,
      '@burgeon/internationalization': internationalizationConfig.version,
      '@syman/burgeon-r3': R3.version,
      '@syman/ark-ui': window.Ark.version,
      '@syman/ark-ui-bcl': window.$Bcl.version,
    }

    // 路由守卫 去掉部分定制界面onresize方法
    R3.router.afterEach(to => {
      const tableNameArr = ['ORDERMANAGER', 'PAYABLEADJUSTMENTLIST', 'returnGoodList', 'manualMatching', 'RETURNSTOREAGELIST', 'PROMACTIQUERYLIST', 'SETWAREHOUSELOGISTICS'];
      const currentTable = to.params.tableName || to.params.customizedModuleName;
      if (!tableNameArr.includes(currentTable)) {
        // window.onresize = null;
        // 销毁resize方法
        cus.omsUtils.removeOnresize();
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
    
// })
// class InitAppConfig {
//   constructor() {
//     // -------------引入框架项目配置文件;
//     // const customizedTheme = require(`@burgeon/oms-theme/skin/${omsSkinTheme}/index.min.css`).default;
//     window.$store = store;
//     window.$omsUtils = cus.omsUtils;
//     window.$pageNote = pageNote;
//     window.R3 = R3; // 暴露R3为全局变量
//     window.OMS = cus;
//     window.$i18n = i18n; // 挂载国际化
//     // Vue.prototype.$theme = customizedTheme; // 将主题方法挂载到原型上
//     Vue.prototype.qs = qs;
//     Vue.prototype.$omsUtils = cus.omsUtils;
//     Vue.prototype.$lodash = window._;
//     Vue.prototype.service = service;
//     Vue.prototype.vmI18n = i18n;
//     window.version = {
//       '@burgeon/project-logic': proVersion.version,
//       '@burgeon/business-components': BC.version,
//       '@burgeon/oms-theme': omsThemecConfig.version,
//       '@burgeon/internationalization': internationalizationConfig.version,
//       '@syman/burgeon-r3': R3.version,
//       '@syman/ark-ui': window.Ark.version,
//       '@syman/ark-ui-bcl': window.$Bcl.version,
//     }

//     // 路由守卫 去掉部分定制界面onresize方法
//     R3.router.afterEach(to => {
//       const tableNameArr = ['ORDERMANAGER', 'PAYABLEADJUSTMENTLIST', 'returngoodmanagementList', 'manualMatching', 'RETURNSTOREAGELIST', 'PROMACTIQUERYLIST', 'SETWAREHOUSELOGISTICS'];
//       const currentTable = to.params.tableName || to.params.customizedModuleName;
//       if (!tableNameArr.includes(currentTable)) {
//         // window.onresize = null;
//         // 销毁resize方法
//         cus.omsUtils.removeOnresize();
//       }
//     });

//     // 存储可视化宽度
//     let clientWidthsFun = () => {
//       let clientWidths = document.body.clientWidth;
//       if (clientWidths < 990) { $store.commit('customize/colRowNum', 3); } else { $store.commit('customize/colRowNum', 4); }
//     };
//     clientWidthsFun();
//     // 屏幕变化
//     window.onresize = () => clientWidthsFun();
//   }
// }

// export default new InitAppConfig();
export default {}
