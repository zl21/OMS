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
  PHYSICALSTORAGEAUTHORITY: {
    component:  () => import('allpages/systemConfig/quanXian/quanXian'),
  },
  // 品牌权限
  BRANDPERMISSIONS: {
    component:  () => import('allpages/systemConfig/quanXian/quanXian'),
  },
  // 平台权限
  SALESCHANNELAUTHORITY: {
    component:  () => import('allpages/systemConfig/quanXian/quanXian'),
  },
};
