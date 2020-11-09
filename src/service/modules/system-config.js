// 系统配置
import R3 from '@syman/burgeon-r3';

const { network } = R3;
export default {
  /**
   *  查看用户权限
   * /p/cs/chrstoregroupquery  店仓权限
   * /p/cs/chrsuppgroupquer  供应商权限
   * /p/cs/chrgroupsdistrib/query  配销中心
   * /p/cs/cgroupsbrand/query  品牌权限
   * /p/cs/cgrouppro/query  商品权限
   * /p/cs/chrgroupscompany/query  公司权限
   * /p/cs/cusergroupquery  角色权限
   * */ 
  chrstoregroupquery: (url, params) => network.post(url, params),
  // 请求tab列表页
  userstreeload: params => network.post('/p/cs/userstreeload', params),
  //
  getTableQuery: params => network.post('/p/cs/getTableQuery', params),
  // /p/cs/usertreequery
  usertreequery: params => network.post('/p/cs/usertreequery', params),
  /**
   * 角色
   */
  // 权限查询接口
  selectPermissionColumn: params => network.post('/p/cs/permission/v1/selectPermissionColumn', params),
  /**
   * 用户档案
   * */
  /**
  * quanxian
  */
  // 获取搜索框
  selectPermissionColumn: params => network.post('/p/cs/permission/v1/selectPermissionColumn', params),
  // 获取表格 
  cgroupcolumnquery: params => network.post('/p/cs/cgroupcolumnquery', params),
  selectDataPermission: params => network.post('/p/cs/permission/v1/selectDataPermission', params),
  // 保存 /p/cs/objectSave /p/cs/permission/v1/saveDataPermission
  objectSave: (url, params) => network.post(url, params),
  // 复制权限 /p/cs/copyShopPermission
  copyShopPermission: params => network.post('/p/cs/copyShopPermission', params),
  
};
