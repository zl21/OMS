/*
 * @Author: your name
 * @Date: 2021-06-07 20:40:40
 * @LastEditTime: 2021-06-16 11:01:50
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /burgeon-project-logic/config/module/modal/organization.config.js
 */
// 组织中心
export default {
    //重置密码
    USERS_RESET_PWD:{
        component: () => import('@/views/modal/organizationCenter/users_reset_pwd.vue'),
    }
};
