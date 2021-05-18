/*
 * @Author: 萧萧
 * @Date: 2021-05-17 17:36:59
 * @LastEditTime: 2021-05-18 15:14:19
 * @LastEditors: Please set LastEditors
 * @Description: 路由守卫 -- 用于切换路由时一些操作
 * @FilePath: /project-logic/config/config/routeGuardConfig.js
 */
import CustomizedConfig from 'burgeonConfig/customized.config';
import cusAllPageConfig from '_/config/page/page.config.js';

/**
 * 路由守卫 - 全局前置守卫
 * @to {Object} 即将要进入的目标 路由对象
 * @from {Object} 当前导航正要离开的 路由对象
 * @next {function} 一定要调用该方法来 resolve 这个钩子:
 * 1.next() 
 * 2.next(false) 中断当前的导航
 * 3.next({ path: '/' }) 当前的导航被中断，然后进行一个新的导航
 */
let beforeEach = (to, from, next) =>{
  // 判断是否是定制界面
  if(to.meta?.routePrefix === '/CUSTOMIZED'){
    // 获取当前页面的路由的 
    let currentKey = to.params.customizedModuleName;
    // 循环页面配置查找当前路由的配置 并给singleType赋值
    currentKey in cusAllPageConfig && (CustomizedConfig.BtnConfig.singleType=Number(!cusAllPageConfig[currentKey].isList));
  }
  // 其他判断
  
  // 进入下一个钩子
  next();
}
export default{
  beforeEach
}