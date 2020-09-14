# Burgeon-R3 Tutorial
> Api


| Name |  Type  |   Description  |
| --- | --- | --- |
| R3.launchApplication   |  Function   |  启动应用程序   |
| R3.urlSearchParams     |  Function   |  对[URLSearchParams](https://developer.mozilla.org/zh-CN/docs/Web/API/URLSearchParams)的简单封装，通常配合Axios使用，用于提交参数。    |
| R3.getModuleName       |  Function   | 用于获取当前路由所对应界面，唯一模块标识    |
| R3.network             |  Object     | 对axios的封装，提供get、post方法（用法同axios相同）<br/>以及axios原对象  |

##### R3.launchApplication(projectConfig：JSON Object)
```
/**
   * @param projectConfig 项目配置
   * projectConfig: {
   *   image: {
   *     enterpriseLogo: '',  // 公司 Logo 图片
   *     enterpriseBanner: '', // 公司Banner 图片
   *   }, // 此配置项必传。
   *   globalComponent: {
   *     Login: '',  // 登录页
   *     WelcomePage: '', // 欢迎页
   *   }, // 此配置项必传。
   *   externalModules: { // 项目自定义界面组件入口
   *      keyOne: VueComponentOne,
   *      keyTwo: VueComponentTwo,
   *      ...
   *   }, // 如无自定义界面，此配置项可不传参。
   *   externalModals: {  // 项目自定义弹框（模态框）组件
   *     keyOne: VueComponentOne,
   *     keyTwo: VueComponentTwo,
   *     ...
   *   }, // 如无自定义弹窗，此配置项可不传参。
   *   projectRoutes: [  // 项目自定义路由，一般情况下用不到此配置。
   *     {
   *       path: '/register',
   *       component: VueComponentForRegister
   *     }
   *   ], // 此配置项可不传参。
   *   quietRoutes: [ '/register' ],  // 项目中针对403的请求，都会默认跳转到登录页面。处于静默路由列表的路由界面则不进行跳转。一般情况用不到此配置。默认值为[]，此配置项可不传参。
   *   Version： '1.4', // 后台框架API版本号，目前只支持['1.3', '1.4']其中一个。默认值是"1.4"，此配置项可不传参。
   *   enableGateWay: true, // 开启 | 关闭 网关(默认开启)，此配置项可不传参。
   *   enableJflow: true, // 开启JFlow插件功能（默认关闭），此配置项可不传参。
   *   jflowRequestDomain： 'http(s)://domain:port', // jflow请求转发的域名或者IP（只有在enableJflow为true时生效），此配置项可不传参。
   * }
   */

```


> Usage e.g.
```
import R3 from 'burgeon-r3';

// 企业Logo、Banner配置信息
import enterpriseLogo from './src/assets/image/logo.png';
import enterpriseBanner from './src/assets/image/banner.png';
import Login from './src/component/Login';
import WelcomePage from './src/component/WelcomePage'

R3.launchApplication({
  image: { enterpriseLogo,  enterpriseBanner },
  globalComponent: { Login, WelcomePage },
  externalModules: {
    TheKeyNameOfMyPage: {
      component: {
        template: '<h1>Here is my customized component.</h1>'
      }
    }
    ...
  }
});
```
