/*
 * @Author: your name
 * @Date: 2021-06-07 20:40:40
 * @LastEditTime: 2021-07-14 19:39:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /burgeon-project-logic/config/module/page/system.config.js
 */
import i18n from '@burgeon/internationalization/i18n'; // 国际化
export default {
  //   查看用户权限
  USERPERMISSION: {
    component: () => import(
      /* webpackchunkname: 'SystemCenterPage' */
      'allpages/systemConfig/userPermission/userPermission.vue'
    ),
  },
  // 商品权限
  COMMODITYAUTHORITY: {
    component: () => import(
      /* webpackchunkname: 'SystemCenterPage' */
      'allpages/systemConfig/commodityAuthority/commodityAuthority.vue'
    ),
  },
  // 店仓权限
  STOREWAREHOUSEPERMISSIONS: {
    component: () => import(
      /* webpackchunkname: 'SystemCenterPage' */
      'allpages/systemConfig/quanXian/quanXian.vue'
    ),
  },
  //  敏感列权限
  SENSITIVECOLUMNPERMISSIONS: {
    component:  () => import(
      /* webpackchunkname: 'SystemCenterPage' */
      'allpages/systemConfig/quanXian/quanXian.vue'
    ),
  },
  //  角色
  CP_C_GROUPS: {
    component:  () => import(
      /* webpackchunkname: 'SystemCenterPage' */
      'allpages/systemConfig/quanXian/quanXian.vue'
    ),
  },
  //  用户档案
  CP_C_HRUSERS: {
    component:  () => import(
      /* webpackchunkname: 'SystemCenterPage' */
      'allpages/systemConfig/quanXian/quanXian.vue'
    ),
  },

  // 品牌权限
  BRANDPERMISSIONS: {
    component:  () => import(
      /* webpackchunkname: 'SystemCenterPage' */
      'allpages/systemConfig/quanXian/quanXian.vue'
    ),
  },
  //功能权限
  JURISDICTIONDATA:{
    component:() => import(
      /* webpackchunkname: 'SystemCenterPage' */
      'allpages/systemConfig/quanXian/FunctionPowerNew.vue'
    ),
  },
  //数据权限
  DATAJURISDICTION:{
    component:  () => import(
      /* webpackchunkname: 'SystemCenterPage' */
      'allpages/systemConfig/quanXian/quanXian.vue'
    ),
  }
};
