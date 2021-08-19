/*
 * @Author: your name
 * @Date: 2021-06-07 20:40:40
 * @LastEditTime: 2021-07-09 14:11:34
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

   groupTreeload: params => $network.post('/p/cs/groupTreeload', params.params).then(res => {
    if (typeof params.success === 'function') {
      params.success(res);
    }
  }),

   getMenuTree: params => $network.post('/p/cs/getMenuTree', params.params).then(res => {
    if (typeof params.success === 'function') {
      params.success(res);
    }
  }),

   cgroupsquery: params => $network.post('/p/cs/cgroupsquery', params.params).then(res => {
    if (typeof params.success === 'function') {
      params.success(res);
    }
  }),

   savePermission: params => $network.post('/p/cs/savePermission', params.params).then(res => {
    if (typeof params.success === 'function') {
      params.success(res);
    }
  }),

   copyPermission: params => $network.post('/p/cs/copyPermission', params.params).then(res => {
    if (typeof params.success === 'function') {
      params.success(res);
    }
  }),

   queryMenuPermission: params => $network.post('/p/cs/queryMenuPermission', params.params).then(res => {
    if (typeof params.success === 'function') {
      params.success(res);
    }
  }),

  fetchActionsInCustomizePage: params => $network.post('/p/cs/fetchActionsInCustomizePage', params.params).then(res => {
    if (typeof params.success === 'function') {
      params.success(res);
    }
  }),
  
  groupTreeload: params => $network.post('/p/cs/groupTreeload', params).then(res=>{
    if (typeof params.success === 'function') {
      params.success(res);
    }
  }),

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
