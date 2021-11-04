// import axios from 'axios';
import service from '@/service/index';

class PublicUtil {
  // constructor() {}

  // 标准时间转时间格式
  static FromDates(time) {
    const date = new Date(time);
    const Y = `${date.getFullYear()}-`;
    const M = `${date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1}-`;
    const D = `${date.getDate()} `;
    // const h = `${date.getHours()}:`;
    // const m = `${date.getMinutes()}:`;
    // const s = date.getSeconds();
    return Y + M + D;
  }

  // 字符串转时间格式
  static DatesTime(time) {
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
  static accAdd(arg1, arg2) {
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
      const cm = 10 ** c;
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
  static accSub(arg1, arg2) {
    let r1; let r2;
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
    const m = 10 ** Math.max(r1, r2); // last modify by deeka //动态控制精度长度
    // const n = (r1 >= r2) ? r1 : r2;
    return ((arg1 * m - arg2 * m) / m).toFixed(2);
  }

  // 乘法
  static accMul(arg1, arg2) {
    let m = 0; const s1 = arg1.toString();
    const s2 = arg2.toString();
    try {
      m += s1.split('.')[1].length;
    } catch (e) {
      console.log(e);
    }
    try {
      m += s2.split('.')[1].length;
    } catch (e) {
      console.log(e);
    }
    return Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / (10 ** m);
  }

  // 除法
  static accDiv(arg1, arg2) {
    let t1 = 0; let t2 = 0;
    arg1 = arg1 || 0;
    arg2 = arg2 || 0;
    try {
      t1 = arg1.toString().split('.')[1].length;
    } catch (e) {
      console.log(e);
    }
    try {
      t2 = arg2.toString().split('.')[1].length;
    } catch (e) {
      console.log(e);
    }
    const r1 = Number(arg1.toString().replace('.', ''));
    const r2 = Number(arg2.toString().replace('.', ''));
    // return (r1 / r2) * Math.pow(10, t2 - t1);
    return (r1 / r2) * (10 ** (t2 - t1));
  }

  /**
   * 获取字段选项组值
   *  @table 'PS_C_SKU' 表名
   *  @colArr ["PAY_TYPE"] select类型的字段 的colname/英文名 的集合
   *  @foldingName "基础信息" 折叠名称
   *  @formConfig this.formConfig 待修改的formConfig
   *  @return 返回this.formConfig.formData
   * */
  static async getTypeList(table, colArr, foldingName, formConfig) {
    const fromdata = new FormData();
    let fD = formConfig.formData;
    fromdata.append('table', table);
    fromdata.append('objid', -1);
    const res = await service.common.getObject(fromdata);
    res.data.data.addcolums.forEach((item) => {
      if (item.parentdesc == foldingName) {
        item.childs.forEach((it) => {
          // it为接口返回的类似formData.Item的数据
          colArr.forEach(colArrItem => {
            if (it.colname == colArrItem) { // 用colname来匹配需要的select类型的item
              fD.forEach((fDitem) => {
                // 赋值给options
                if (fDitem.colname === colArrItem) {
                  fDitem.options = it.combobox.map((i) => ({
                    label: i.limitdesc,
                    value: i.limitval,
                  }));
                }
              });
            }
          })
        });
      }
    });
    return fD;
  }

  /**
   * 获取n天后的日期
   */
  static getDate(index) {
    const date = new Date(); // 当前日期
    const newDate = new Date();
    newDate.setDate(date.getDate() + index);
    const time = `${newDate.getFullYear()}-${newDate.getMonth() + 1}-${newDate.getDate()}`;
    return time;
  }

  /**
   * 获取n天前的日期
   */
  static getDateOld(index) {
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
  static dateDiff(startDate, endDate) {
    let aDate;
    aDate = startDate.split('-');
    const oDate1 = new Date(`${aDate[1]}-${aDate[2]}-${aDate[0]}`);
    aDate = endDate.split('-');
    const oDate2 = new Date(`${aDate[1]}-${aDate[2]}-${aDate[0]}`);
    const iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24);
    return iDays;
  }

  /**
   * 数组去重 ps:工作台专用
   */
  static workArrHeavy(arr1, arr2) {
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
    return [];
  }

  /**
   * 四舍五入改进
   * num表示需要四舍五入的小数
   * s表示需要保留几位小数
   */
  static toFixed(num, s) {
    const times = 10 ** s;
    let des = num * times + 0.5;
    des = parseInt(des, 10) / times;
    return `${des}`;
  }

  /**
   * 导出
   * src 导出路径
   */
  static downloadUrlFile(url) {
    const self = this;
    const domFrame = window.parent.document.getElementById('downLoadListFrame');
    if (domFrame != null) {
      window.parent.document.body.removeChild(domFrame);
    }
    const downloadFile = {};
    if (typeof downloadFile.iframe === 'undefined') {
      const iframe = document.createElement('iframe');
      iframe.setAttribute('id', 'downLoadListFrame');
      self.addEvent('load', iframe, () => {
        self.iframeLoad(iframe);
      });
      iframe.src = url;
      iframe.style.display = 'none';
      downloadFile.iframe = iframe;
      document.body.appendChild(downloadFile.iframe);
      setTimeout(() => {
        iframe.src = '';
      }, 1000);
    }

    // const eleLink = document.createElement('a');
    // eleLink.setAttribute('href', src);
    // eleLink.style.display = 'none';
    // document.body.appendChild(eleLink);
    // eleLink.click();
    // document.body.removeChild(eleLink);

    // const download_file = {};
    // if (typeof (download_file.iframe) === 'undefined') {
    //   const iframe = document.createElement('iframe');
    //   download_file.iframe = iframe;
    //   document.body.appendChild(download_file.iframe);
    // }
    // download_file.iframe.src = src;
    // download_file.iframe.style.display = 'none';
  }

  // 判断iframe的src
  static iframeLoad(iframe) {
    const src = iframe.src ? iframe.src : iframe.contentWindow.locatiion.href;
    console.log('src::', src);
  }

  // 调用方法时绑定iframe的load事件
  static addEvent(eventName, element, fn) {
    if (element.attachEvent) element.attachEvent(`on${eventName}`, fn);
    else element.addEventListener(eventName, fn, false);
  }
}

export default PublicUtil;

// 给Number类型增加一个mul方法，调用起来更加方便。
Number.prototype.mul = function (arg) {
  return PublicUtil.accMul(arg, this);
};
// 给Number类型增加一个div方法，调用起来更加方便。
Number.prototype.div = function (arg) {
  return PublicUtil.accDiv(this, arg);
};

//
// Number.prototype.toFixed = function(fractionDigits) {
//   return ( parseInt((this * Math.pow( 10, fractionDigits ) + 0.5).toString())/ Math.pow( 10, fractionDigits )).toString();
// }
Number.prototype.toFixed = function (length) {
  let carry = 0; // 存放进位标志
  // let num; // num为原浮点数放大multiple倍后的数，multiple为10的length次方
  const str = `${this}`; // 将调用该方法的数字转为字符串
  let dot = str.indexOf('.'); // 找到小数点的位置
  if (dot != -1) {
    if (str.slice(dot + length + 1, dot + length + 2) >= 5) carry = 1; /* 找到要进行舍入的数的位置，手动判断是否大于等于5，满足条件进位标志置为1,这里原作者用的是str.substr(dot + length + 1, 1) */
  }
  // 需要舍入的数字如果小数位小于等于length，则不处理；
  if (this.toString().length - dot - 1 <= length) {
    return this;
  }
  const multiple = 10 ** length; // 设置浮点数要扩大的倍数
  const num = Math.floor(this * multiple) + carry; // 去掉舍入位后的所有数，然后加上我们的手动进位数
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
