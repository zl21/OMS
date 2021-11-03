/*
 * @Author: your name
 * @Date: 2021-11-01 15:32:39
 * @LastEditTime: 2021-11-02 17:42:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /burgeon-business-components/src/index.js
 */

let burgeonComponents = require.context('burgeonComponents/view/', false,/.vue$/);
export default burgeonComponents;