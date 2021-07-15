import R3 from '@syman/burgeon-r3';

// 企业Logo、Banner配置信息
import apiPath from '@/assets/js/api/path/index';
import i18n from '@burgeon/internationalization/i18n/i18n'; // 国际化
import service from '@/service/index';
import qs from 'qs';
import request, { httpFormdata, fetch } from 'framework/__utils__/request';
import ajax from 'framework/__utils__/ajax';
import store from 'burgeonConfig/store/store'; // 将老框架公共状态注册为customize模块
import groups from '@/assets/js/promotion/groups';
import comUtils from '@/assets/js/__utils__/common';
import projectRouterConfig from 'burgeonConfig/router.config';
import customizedPageConfig from 'burgeonConfig/customized.page.config';
import customizedModalConfig from 'burgeonConfig/customized.modal.config';
import customizeWaterMarkConfig from 'burgeonConfig/customized.watermark.config';
import filterUrlConfig from 'burgeonConfig/config/filterUrl.config';
import myfilterUrlForNetworkScript from '@/service/filterUrlForNetwork';
import WelcomePage from '@/component/WelcomePage';
import Login from '@/component/Login';
import enterpriseBanner from '@/assets/image/banner.png';
import enterpriseLogo from '@/assets/image/logo.png';
// ----------动态加载主题库皮肤包;

import '@burgeon/oms-theme/theme/custom.less'; // 主题文件

import externalTreeDatasConfig from '@/config/externalTreeDatas.config'; // 树结构配置
import '@syman/burgeon-r3/r3.publish/r3.min.css';

// 老框架引入的 自定义界面内需要的css资源
import './static/iconfont/iconfont.css'; // customize-1.3自定义界面icon,下拉单选,此样式会影响框架样式，
// import './static/promotion.icofont/iconfont.css'; // 促销iconfont
import '@/assets/css/css_1_3/index.less'; // customize-1.3自定义界面icon,下拉单选
import '@/assets/css/css_1_3/common.less';
import '@/assets/css/css_1_3/reset.less';

// 老框架引入的 自定义界面内需要的js资源
// 促销需要
import connector from '@/js/pages/common/orderDetail/connector';

// 根据接口调整title
const appTitle = '森马电商';
  fetch('/p/c/getAppTitle').then((res) => {
    if (res.status == 200) {
      document.title = res.data || appTitle;
    }
  }).catch(() => {
    document.title = appTitle;
  });

// -------------引入框架项目配置文件;
const customizedTheme = require(`@burgeon/oms-theme/skin/${omsSkinTheme}/index.min.css`).default;
filterUrlConfig.customizePage = filterUrlConfig.customizePage.flat();
console.log(filterUrlConfig);
groups.load();
Vue.prototype.$ajax = ajax;
Vue.prototype.axios = request;
Vue.prototype.request = request;
Vue.prototype.httpForm = httpFormdata;
Vue.prototype.$httpApi = apiPath;
Vue.prototype.$store = store;
Vue.prototype.service = service;
Vue.prototype.qs = qs;
window.R3 = R3; // 暴露R3为全局变量
window.vmI18n = i18n; // 挂载国际化
Vue.prototype.$theme = customizedTheme; // 将主题方法挂载到原型上
Vue.prototype.$comUtils = comUtils;

// 路由守卫 去掉部分定制界面onresize方法
R3.router.afterEach((to)=>{
  const tableNameArr = ['ORDERMANAGER', 'PAYABLEADJUSTMENTLIST', 'returngoodmanagementList', 'manualMatching', 'RETURNSTOREAGELIST', 'PROMACTIQUERYLIST', 'SETWAREHOUSELOGISTICS'];
  const currentTable = to.params.tableName || to.params.customizedModuleName;
  if (!tableNameArr.includes(currentTable)) {
    // window.onresize = null;
    // 销毁resize方法
    comUtils.removeOnresize();
  }
});
// 老框架引入的 自定义界面内需要的资源
R3.launchApplication({
  image: {
    enterpriseLogo,
    enterpriseBanner
  },
  globalComponent: {
    Login,
    WelcomePage
  },
  // setComponentsProps: (type, props) => {  
  // // 下拉多选 添加模糊查询多选功能
  //   if (type === 'OBJ_FK') {
  //     if(props.PropsData !== undefined && props.PropsData.fkobj.searchmodel ==='mrp'){
  //       props.filterMode = true;
  //     }
  //   }
  //   return props;
  // },
  // enableOpenNewTab: false,
  connector,
  externalModules: customizedPageConfig, // 自定义界面
  externalModals: customizedModalConfig, // 自定义弹框
  Version: '1.3', // 版本号
  enableGateWay: false, // 网关是否打开,
  requestPenddingExpire: 100, // 全局设置请求代理防暴力点击
  // ignoreGateWayPattern: [/\/jflow\/*/g, /\/api\/*/g], // 框架默认禁用的网关逻辑的正则模式匹配
  enableJflow: false, // 默认禁用JFlow插件功能
  // jflowRequestDomain: 'http://jflow-shangfei.dev.burgeononline.com/', // jflow后台地址（商飞）
  customizeWaterMark: customizeWaterMarkConfig, // 水印配置,
  isItemTableNewValidation: true, // 是否允许子表新增有必填项时，输入值才触发子表必填项校验，不输入值则只校验主表
  isCommonTable: false, // 是否开启普通表格，默认关闭
  projectRoutes: projectRouterConfig, // 项目自定义路由，一般情况下用不到此配置
  // quietRoutes: ['/register', '/password', '/forgotPassword'], // 外置路由
  externalTreeDatas: externalTreeDatasConfig,
  filterUrlForNetwork: filterUrlConfig, // 过滤不需要用框架报错提示信息的接口请求
  enableActivateSameCustomizePage: false, // 控制列表页面是否能打开多个详情页
  filterUrlForNetworkScript: myfilterUrlForNetworkScript // 导入的filterUrlForNetworkScript脚本文件
});
