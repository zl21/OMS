/*
 * @Author: zhou.l
 * @Date: 2021-06-01 14:31:15
 * @LastEditTime: 2021-06-01 14:34:28
 * @LastEditors: Please set LastEditors
 * @Description: 用户中心
 * @FilePath: /burgeon-project-logic/service/modules/userCenter.js
 */
import R3 from '@syman/burgeon-r3';

const { network } = R3;
export default {
    hrorgTree: params => network.post('/r3-cp/p/cs/cp/v1/hrorg/tree', params), // 组织档案
};
