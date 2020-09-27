// import arkUI from '@syman/ark-ui';
import R3 from '@syman/burgeon-r3';


// 企业Logo、Banner配置信息
import enterpriseLogo from './src/assets/image/logo.png';
import enterpriseBanner from './src/assets/image/banner.png';
import Login from './src/component/Login.vue';
import WelcomePage from './src/component/WelcomePage.vue';
import projectRouterConfig from './src/config/router.config';
import customizedPageConfig from './src/config/customized.page.config';
import customizedModalConfig from './src/config/customized.modal.config';
import './static/theme/custom.less'; // 主题文件
import customizedTheme from './src/config/customized.theme.js';//主题配置

// import './static/theme/custom.less'; // 主题文件
// import './static/theme/theme.less'; // 自定义主题文件
// import '@syman/ark-ui/dist/styles/ark-ui.css';
import '@syman/burgeon-r3/r3.publish/r3.min.css';

// 老框架引入的 自定义界面内需要的css资源
import 'element-ui/lib/theme-chalk/index.css'; // customize-1.3
import './static/iconfont/iconfont.css'; // customize-1.3自定义界面icon,下拉单选,此样式会影响框架样式，
import './static/promotion.icofont/iconfont.css'; //促销iconfont
import '@/assets/css/css_1_3/index.less'; // customize-1.3自定义界面icon,下拉单选
import '@/assets/css/css_1_3/common.less';
import '@/assets/css/css_1_3/reset.less';
// 老框架引入的 自定义界面内需要的css资源


// 老框架引入的 自定义界面内需要的js资源
import request, {
  httpFormdata,
} from 'framework/__utils__/request';
import ajax from 'framework/__utils__/ajax';
import store from '@/config/store/store'; // 将老框架公共状态注册为customize模块
import groups from '@/assets/js/promotion/groups.js';// 促销需要
import connector from './src/views/pages/common/orderDetail/connector.js';

groups.load();
Vue.prototype.$ajax = ajax;
Vue.prototype.axios = request;
Vue.prototype.request = request;
Vue.prototype.httpForm = httpFormdata;

Vue.prototype.$store = store;
const {
  network,
  urlSearchParams
} = R3;
window.R3 = R3;
Vue.prototype.$network = network;
Vue.prototype.$urlSearchParams = urlSearchParams;
Vue.prototype.$theme = customizedTheme;//将主题方法挂载到原型上

// 设置主题调用方法
customizedTheme.appendLink(customizedTheme.skyBlue)

function restructureMenuTreeData(data) {
  return data.map((item) => {
    item.NAME = item.ENAME;
    // item.id = item.ID;
    if (item.children && item.children.length > 0) {
      restructureMenuTreeData(item.children);
    }
    return item;
  });
}

function getTreeChildren(pnode, arr) {
  pnode.children = arr.filter(item => item.CP_C_ORGUP_ID === pnode.ID);
  pnode.children.forEach((item) => {
    item.lastChild = false;
    item.ID = item.ENAME;
    // item.expand = true;
    pnode.children[pnode.children.length - 1].lastChild = true;
    getTreeChildren(item, arr);
  });
}

const theme = localStorage.getItem('theme');
document.getElementsByTagName('body')[0].className = theme;
// 老框架引入的 自定义界面内需要的资源
R3.launchApplication({
  image: {
    enterpriseLogo,
    enterpriseBanner,
  },
  globalComponent: {
    Login,
    WelcomePage
  },
  connector,
  externalModules: customizedPageConfig, // 自定义界面
  externalModals: customizedModalConfig, // 自定义弹框
  Version: '1.3', // 版本号
  enableGateWay: false, // 网关是否打开,
  // ignoreGateWayPattern: [/\/jflow\/*/g, /\/api\/*/g], // 框架默认禁用的网关逻辑的正则模式匹配
  enableJflow: false, // 默认禁用JFlow插件功能
  // jflowRequestDomain: 'http://jflow-shangfei.dev.burgeononline.com/', // jflow后台地址（商飞）
  customizeWaterMark: {
    // submit: { text: '测试水印', color: '#e80000' },
  }, // 启用外部自定义水印配置,
  isItemTableNewValidation: true, // 是否允许子表新增有必填项时，输入值才触发子表必填项校验，不输入值则只校验主表
  isCommonTable: false, // 是否开启普通表格，默认关闭
  projectRoutes: projectRouterConfig, // 项目自定义路由，一般情况下用不到此配置
  // quietRoutes: ['/register', '/password', '/forgotPassword'], // 外置路由
  externalTreeDatas: {
    // 供应商档案
    CP_C_SUPPLIER: () => async () => {
      let data = [];
      const formdata = new FormData();
      formdata.append('param', 'IN');
      await network.post('/p/c/cpCHrorgTree', formdata).then((res) => {
        console.log(res);
        // data = restructureMenuTreeData(res.data);
        data = res.data;
        if (res.data.code === 0) {}
      });
      const treeData = {
        data,
        name: 'CP_C_HRORG_ID'
      };
      return treeData;
    },
    // 员工档案
    CP_C_EMP: () => async () => {
      let data = [];
      const formdata = new FormData();
      formdata.append('param', 'IN');
      await network.post('/p/c/cpCHrorgTree', formdata).then((res) => {
        console.log(res);
        // data = restructureMenuTreeData(res.data);
        data = res.data;
        if (res.data.code === 0) {}
      });
      const treeData = {
        data,
        name: 'ID'
      };
      return treeData;
    },
    // 组织中心
    CP_C_INORG: () => async () => {
      let data = [];
      const formdata = new FormData();
      formdata.append('param', 'IN');
      await network.post('/p/c/cpCHrorgTree', formdata).then((res) => {
        console.log(res);
        // data = restructureMenuTreeData(res.data);
        data = res.data;
      });
      const treeData = {
        data,
        name: 'ID'
      };
      return treeData;
    }
  }
});
