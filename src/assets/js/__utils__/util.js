/** 封装常用的方法 */
class StringUtil {
  constructor() {}

  // 1. 判断是否是一个空对象
  isObjectEmpty(obj) {
    for (const key in obj) {
      if (key) {
        return false;
      }
    }
    return true;
  }

  IsString(v) {
    return Object.prototype.toString.apply(v) === '[object String]';
  }
}

export default new StringUtil();
