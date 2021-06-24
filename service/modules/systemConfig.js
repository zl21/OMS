/*
 * @Author: your name
 * @Date: 2021-06-07 20:40:40
 * @LastEditTime: 2021-06-24 13:42:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /burgeon-project-logic/service/modules/systemConfig.js
 */
// 系统配置
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
  groupTreeload: params => $network.post('/p/cs/groupTreeload', params),
  // /p/cs/usertreequery

  chrstoregroupquery: (url, params) => $network.post(url, params),
  // 请求tab列表页
  userstreeload: params => $network.post('/p/cs/userstreeload', params),
  // /p/cs/usertreequery
  usertreequery: params => $network.post('/p/cs/usertreequery', params),
  /**
   * 角色
   */
  // 权限查询接口'
  selectPermissionColumn: params => $network.post('/p/cs/permission/v1/selectDataPermission', params),
  /**
   * 用户档案
   * */

  // 获取表格 /p/cs/cgroupcolumnquery    
  selectDataPermission: (url, params) => $network.post(url, params),
  // 保存 /p/cs/objectSave /p/cs/permission/v1/saveDataPermission
  objectSave: (url, params) => $network.post(url, params),
  // 复制权限 /p/cs/copyShopPermission
  copyShopPermission: params => $network.post('/p/cs/copyShopPermission', params)
};
