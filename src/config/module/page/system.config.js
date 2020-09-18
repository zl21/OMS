//系统配置-查看用户权限
import userPermission from 'allpages/SystemConfig/userPermission/userPermission'

//系统配置-商品权限
import commodityAuthority from 'allpages/SystemConfig/commodityAuthority/commodityAuthority'


// 权限
import quanXian from 'allpages/SystemConfig/quanXian/quanXian'; // 公共权限页面

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
  storeWarehousePermissions: {
    component: quanXian,
  },
  //  敏感列权限
  sensitiveColumnPermissions: {
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
  //实体仓权限
  physicalStorageAuthority: {
    component: quanXian,
  },
  //品牌权限
  brandPermissions: {
    component: quanXian,
  },
  // 平台权限
  salesChannelAuthority: {
    component: quanXian,
  },
}
