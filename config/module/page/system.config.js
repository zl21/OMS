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
    component: () => import('allpages/systemConfig/userPermission/userPermission'),
  },
  // 商品权限
  COMMODITYAUTHORITY: {
    component: () => import('allpages/systemConfig/commodityAuthority/commodityAuthority'),
  },
  // 店仓权限
  STOREWAREHOUSEPERMISSIONS: {
    component: () => import('allpages/systemConfig/quanXian/quanXian'),
  },
  //  敏感列权限
  SENSITIVECOLUMNPERMISSIONS: {
    component:  () => import('allpages/systemConfig/quanXian/quanXian'),
  },
  //  角色
  CP_C_GROUPS: {
    component:  () => import('allpages/systemConfig/quanXian/quanXian'),
  },
  //  用户档案
  CP_C_HRUSERS: {
    component:  () => import('allpages/systemConfig/quanXian/quanXian'),
  },  
 
  // 品牌权限
  BRANDPERMISSIONS: {
    component:  () => import('allpages/systemConfig/quanXian/quanXian'),
  },
  //功能权限
  JURISDICTIONDATA:{
    component:() => import('allpages/systemConfig/quanXian/FunctionPowerNew'),
  },
  //数据权限
  DATAJURISDICTION:{
    component:  () => import('allpages/systemConfig/quanXian/quanXian'),
  }
};
