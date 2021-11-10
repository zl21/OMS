/*
 * @Author: your name
 * @Date: 2021-11-01 15:32:39
 * @LastEditTime: 2021-11-02 17:42:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /burgeon-business-components/src/index.js
 */

let burgeonComponents = require.context('burgeonComponents/view/', false, /.vue$/);
let comJs = require.context('burgeonComponents/common/js/', false, /.js$/);

// 自动导入定制配置组件
const context = require.context('burgeonComponents/view/', true, /\.vue$/);
const CustomComponents = {}
context.keys().forEach((key) => {
  const component = context(key).default;
  CustomComponents[component.name] = component
});

export default { burgeonComponents, comJs };
