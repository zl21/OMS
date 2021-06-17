/*
 * @Author: your name
 * @Date: 2021-06-07 20:40:40
 * @LastEditTime: 2021-06-17 15:15:21
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /burgeon-project-logic/service/modules/organizationCenter.js
 */
// 组织中心
export default {
    usersSave: (params) =>
    $network.post('/p/cs/cp/v1/users/save', params), //修改密码
  
};
