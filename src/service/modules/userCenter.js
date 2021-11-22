/*
 * @Author: zhou.l
 * @Date: 2021-06-01 14:31:15
 * @LastEditTime: 2021-06-10 14:14:16
 * @LastEditors: Please set LastEditors
 * @Description: 用户中心
 * @FilePath: /burgeon-project-logic/service/modules/userCenter.js
 */

export default { //
    groupsTree: params => $network.post('/p/cs/cp/v1/groups/tree', params), // 组织档案
    hrorgTree: params => $network.post('/p/cs/cp/v1/hrorg/tree', params), // 组织档案
};
