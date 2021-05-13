import '../../assets/css/css_1_3/custom.less'; // 框架 主题文件（变量）
import '../../assets/css/css_1_3/oms_index.less'; // 定制公共界面样式
import R3 from '@syman/burgeon-r3';
import Vue from 'vue';
import comUtils from '../../assets/js/__utils__/common';
// import store from 'burgeonConfig/store/store'; // 将老框架公共状态注册为customize模块
import wangEditor from 'wangeditor';
import qs from 'qs';
import i18n from '@burgeon/internationalization/i18n/i18n'; // 国际化
import service from '../../service/index.js';
import lodash from 'lodash';
import store from 'burgeonConfig/store/store'; // 将老框架公共状态注册为customize模块
class InitAppConfig {
  constructor() {
    // -------------引入框架项目配置文件;
    const customizedTheme = require(`@burgeon/oms-theme/skin/${omsSkinTheme}/index.min.css`).default;
    // window.$store = store;
    Vue.prototype.qs = qs;
    window.$store=store;
    window.R3 = R3; // 暴露R3为全局变量
    window.$i18n = i18n; // 挂载国际化
    window.wangEditor = wangEditor;
    Vue.prototype.$theme = customizedTheme; // 将主题方法挂载到原型上
    Vue.prototype.$comUtils = comUtils;
    Vue.prototype.$lodash = lodash;
    Vue.prototype.service = service;

    console.log('window.vmI18n',window.vmI18n);
    // 路由守卫 去掉部分定制界面onresize方法
    R3.router.afterEach(to => {
      const tableNameArr = ['ORDERMANAGER', 'PAYABLEADJUSTMENTLIST', 'returngoodmanagementList', 'manualMatching', 'RETURNSTOREAGELIST', 'PROMACTIQUERYLIST', 'SETWAREHOUSELOGISTICS'];
      const currentTable = to.params.tableName || to.params.customizedModuleName;
      if (!tableNameArr.includes(currentTable)) {
        // window.onresize = null;
        // 销毁resize方法
        comUtils.removeOnresize();
      }
    });
  }

}

export default new InitAppConfig();