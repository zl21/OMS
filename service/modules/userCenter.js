/*
 * @Author: zhou.l
 * @Date: 2021-06-01 14:31:15
 * @LastEditTime: 2021-06-08 14:18:58
 * @LastEditors: Please set LastEditors
 * @Description: 用户中心
 * @FilePath: /burgeon-project-logic/service/modules/userCenter.js
 */

export default {
    hrorgTree: params => $network.post('/p/cs/cp/v1/hrorg/tree', params), // 组织档案
};
