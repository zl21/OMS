/** 封装常用的方法 */
class StringUtil {
  // constructor() {}

  // 1. 判断是否是一个空对象
  static isObjectEmpty(obj) {
    for (const key in obj) {
      if (key) {
        return false;
      }
    }
    return true;
  }

  static IsString(v) {
    return Object.prototype.toString.apply(v) === '[object String]';
  }
}
/* 
  问题：
    静态方法可以直接在该类上调用（StringUtil.isObjectEmpty()），但是不能在该类的实例上调用，所以直接暴露 new StringUtil()会抛出一个错误：表示该方法不存在。
  解决方案：
    1. 去掉static
    2. 父类的静态方法可以被子类继承
*/
class StringUtilEg extends StringUtil{};

export default StringUtilEg;
