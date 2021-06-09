/*
 * @Author: your name
 * @Date: 2021-06-07 20:40:40
 * @LastEditTime: 2021-06-09 16:29:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /burgeon-project-logic/config/module/page/system.config.js
 */
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
  // 实体仓权限
  // JURISDICTIONDATA: {
  //   component:  () => import('allpages/systemConfig/quanXian/quanXian'),
  // },
  // 品牌权限
  BRANDPERMISSIONS: {
    component:  () => import('allpages/systemConfig/quanXian/quanXian'),
  },

  JURISDICTIONDATA:{
    component:() => import('allpages/systemConfig/quanXian/FunctionPowerNew'),
  }
};
