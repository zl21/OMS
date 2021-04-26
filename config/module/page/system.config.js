// 系统配置-查看用户权限
import userPermission from 'allpages/systemConfig/userPermission/userPermission';

// 系统配置-商品权限
import commodityAuthority from 'allpages/systemConfig/commodityAuthority/commodityAuthority';


// 权限
import quanXian from 'allpages/systemConfig/quanXian/quanXian'; // 公共权限页面

export default {
  //   查看用户权限
  USERPERMISSION: {
    component: userPermission,
  },
  // 商品权限
  COMMODITYAUTHORITY: {
    component: commodityAuthority,
  },
  // 店仓权限
  STOREWAREHOUSEPERMISSIONS: {
    component: quanXian,
  },
  //  敏感列权限
  SENSITIVECOLUMNPERMISSIONS: {
    component: quanXian,
  },
  //  角色
  CP_C_GROUPS: {
    component: quanXian,
  },
  //  用户档案
  CP_C_HRUSERS: {
    component: quanXian,
  },  
  // 实体仓权限
  PHYSICALSTORAGEAUTHORITY: {
    component: quanXian,
  },
  // 品牌权限
  BRANDPERMISSIONS: {
    component: quanXian,
  },
  // 平台权限
  SALESCHANNELAUTHORITY: {
    component: quanXian,
  },
};
