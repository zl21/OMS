import axios from 'axios';
import service from '@/service/index';

class publicUtil {
  constructor() {}

  // 标准时间转时间格式
  FromDates(time) {
    const date = new Date(time);
    const Y = `${date.getFullYear()}-`;
    const M = `${date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1}-`;
    const D = `${date.getDate()} `;
    const h = `${date.getHours()}:`;
    const m = `${date.getMinutes()}:`;
    const s = date.getSeconds();
    return Y + M + D;
  }

  // 字符串转时间格式
  DatesTime(time) {
    const date = new Date(time);
    const Y = `${date.getFullYear()}-`;
    const M = `${date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1}-`;
    const D = `${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()} `;
    const h = `${date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()}:`;
    const m = `${date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()}:`;
    const s = (date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds());
    return Y + M + D + h + m + s;
  }

  // 加法函数
  accAdd(arg1, arg2) {
    let r1; let r2; let m; let 
      c;
    try {
      r1 = arg1.toString().split('.')[1].length;
    } catch (e) {
      r1 = 0;
    }
    try {
      r2 = arg2.toString().split('.')[1].length;
    } catch (e) {
      r2 = 0;
    }
    c = Math.abs(r1 - r2);
    m = Math.pow(10, Math.max(r1, r2));
    if (c > 0) {
      const cm = Math.pow(10, c);
      if (r1 > r2) {
        arg1 = Number(arg1.toString().replace('.', ''));
        arg2 = Number(arg2.toString().replace('.', '')) * cm;
      } else {
        arg1 = Number(arg1.toString().replace('.', '')) * cm;
        arg2 = Number(arg2.toString().replace('.', ''));
      }
    } else {
      arg1 = Number(arg1.toString().replace('.', ''));
      arg2 = Number(arg2.toString().replace('.', ''));
    }
    return (arg1 + arg2) / m;
  }

  // 減法函數
  accSub(arg1, arg2) {
    let r1; let r2; let m; let 
      n;
    try {
      r1 = arg1.toString().split('.')[1].length;
    } catch (e) {
      r1 = 0;
    }
    try {
      r2 = arg2.toString().split('.')[1].length;
    } catch (e) {
      r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2)); // last modify by deeka //动态控制精度长度
    n = (r1 >= r2) ? r1 : r2;
    return ((arg1 * m - arg2 * m) / m).toFixed(2);
  }

  // 乘法
  accMul(arg1, arg2) {
    let m = 0; const s1 = arg1.toString(); 
    const s2 = arg2.toString();
    try {
      m += s1.split('.')[1].length;
    } catch (e) {
    }
    try {
      m += s2.split('.')[1].length;
    } catch (e) {
    }
    return Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, m);
  }

  // 除法
  accDiv(arg1, arg2) {
    let t1 = 0; let t2 = 0; let r1; let 
      r2;
    arg1 = arg1 || 0;
    arg2 = arg2 || 0;
    try {
      t1 = arg1.toString().split('.')[1].length;
    } catch (e) {
    }
    try {
      t2 = arg2.toString().split('.')[1].length;
    } catch (e) {
    }
    r1 = Number(arg1.toString().replace('.', ''));
    r2 = Number(arg2.toString().replace('.', ''));
    return (r1 / r2) * Math.pow(10, t2 - t1);
  }

  /**
   * 获取字段选项组值
   *  @param table 表名
   *  @param label label Name
   *  @param foldingName 折叠名称
   * */
  async getTypeList(table, label, foldingName) {
    const fromdata = new FormData();
    const data = [];
    fromdata.append('table', table);
    fromdata.append('objid', -1);
    const res = await service.common.getObject(fromdata);
    res.data.data.addcolums.forEach((item) => {
      if (item.parentdesc == foldingName) {
        item.childs.forEach((list) => {
          if (list.name == label) {
            list.combobox.forEach((arr) => {
              data.push({
                value: arr.limitval,
                label: arr.limitdesc
              });
            });
          }
        });
      }
    });
    return data;
  }

  /**
   * 获取n天后的日期
   */
  getDate(index) {
    const date = new Date(); // 当前日期
    const newDate = new Date();
    newDate.setDate(date.getDate() + index);
    const time = `${newDate.getFullYear()}-${newDate.getMonth() + 1}-${newDate.getDate()}`;
    return time;
  }

  /**
   * 获取n天前的日期
   */
  getDateOld(index) {
    const date = new Date(); // 当前日期
    const newDate = new Date();
    newDate.setDate(date.getDate() - index);
    const mon = newDate.getMonth() + 1;
    const day = newDate.getDate();
    const time = `${newDate.getFullYear()}-${mon < 10 ? `0${mon}` : mon}-${day < 10 ? `0${day}` : day}`;
    return time;
  }

  /**
   * 获取两个字符串日期相差天数
   */
  dateDiff(startDate, endDate) {
    let aDate; let oDate1; let oDate2; let 
      iDays;
    aDate = startDate.split('-');
    oDate1 = new Date(`${aDate[1]}-${aDate[2]}-${aDate[0]}`);
    aDate = endDate.split('-');
    oDate2 = new Date(`${aDate[1]}-${aDate[2]}-${aDate[0]}`);
    iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24);
    return iDays;
  }

  /**
   * 数组去重 ps:工作台专用
   */
  workArrHeavy(arr1, arr2) {
    if (arr1 && arr2) {
      for (let i = 0; i < arr1.length; i++) {
        for (let j = 0; j < arr2.length; j++) {
          if (arr1[i].key === arr2[j].key) {
            arr1[i].value = arr2[j].value;
            break;
          }
        }
      }
      return arr1;
    }
  }

  /**
   * 四舍五入改进
   * num表示需要四舍五入的小数
   * s表示需要保留几位小数
   */
  toFixed(num, s) {
    const times = Math.pow(10, s);
    let des = num * times + 0.5;
    des = parseInt(des, 10) / times;
    return `${des}`;
  }

  /**
   * 导出
   * src 导出路径
   */
  downloadUrlFile(src) {
    const download_file = {};
    if (typeof (download_file.iframe) === 'undefined') {
      const iframe = document.createElement('iframe');
      download_file.iframe = iframe;
      document.body.appendChild(download_file.iframe);
    }
    download_file.iframe.src = src;
    download_file.iframe.style.display = 'none';
  }
}

export default new publicUtil();

// 给Number类型增加一个mul方法，调用起来更加方便。
Number.prototype.mul = function (arg) {
  return accMul(arg, this);
};
// 给Number类型增加一个div方法，调用起来更加方便。
Number.prototype.div = function (arg) {
  return accDiv(this, arg);
};

//
// Number.prototype.toFixed = function(fractionDigits) {
//   return ( parseInt((this * Math.pow( 10, fractionDigits ) + 0.5).toString())/ Math.pow( 10, fractionDigits )).toString();
// }
Number.prototype.toFixed = function (length) {
  let carry = 0; // 存放进位标志
  let num; let 
    multiple; // num为原浮点数放大multiple倍后的数，multiple为10的length次方
  const str = `${this}`; // 将调用该方法的数字转为字符串
  let dot = str.indexOf('.'); // 找到小数点的位置
  if (dot != -1) {
    if (str.slice(dot + length + 1, dot + length + 2) >= 5) carry = 1; /* 找到要进行舍入的数的位置，手动判断是否大于等于5，满足条件进位标志置为1,这里原作者用的是str.substr(dot + length + 1, 1) */
  }
  // 需要舍入的数字如果小数位小于等于length，则不处理；
  if (this.toString().length - dot - 1 <= length) {
    return this;
  }
  multiple = Math.pow(10, length); // 设置浮点数要扩大的倍数
  num = Math.floor(this * multiple) + carry; // 去掉舍入位后的所有数，然后加上我们的手动进位数
  let result = `${num / multiple}`; // 将进位后的整数再缩小为原浮点数
  /*
  * 处理进位后无小数
  */
  dot = result.indexOf('.');
  if (dot === -1) {
    result += '.';
    dot = result.indexOf('.');
  }
  /*
  * 处理多次进位
  */
  const len = result.length - (dot + 1);
  if (len < length) {
    for (let i = 0; i < length - len; i++) {
      result += 0;
    }
  }
  return result;
};
