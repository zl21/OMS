/*
 * @Author: your name
 * @Date: 2021-04-28 13:22:03
 * @LastEditTime: 2021-05-20 14:16:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /burgeon-project-logic/config/module/modal/system.config.js
 */
// 系统配置
export default {
  AUTHINFODISPLAY: {  //平台店铺档案授权信息
    component: ()=> import(
      /* webpackChunkName: 'BasicDataCenterModal' */
      '@/views/modal/basicData/authinfodisplay.vue'
    )
  }
};
