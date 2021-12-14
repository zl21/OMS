// import axios from 'axios';
import service from '@/service/index';
import dateUtil from '@/assets/js/__utils__/date';
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
   * @method 请求p/cs/getObject接口，初始化‘基础信息’Part的表单值
   * @table 主表表名
   * @id 明细ID
   */
  async getObject(table, id) {
    const fromdata = new FormData()
    fromdata.append('table', table)
    fromdata.append('objid', id)
    const {
      data: { code, data, message },
    } = await service.common.getObject(fromdata)
    if (code != 0) {
      console.log('p/cs/getObject no data!')
      return false
    } else {
      return data
    }
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
  downloadUrlFile(url) {
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
  iframeLoad(iframe) {
    const src = iframe.src ? iframe.src : iframe.contentWindow.locatiion.href;
    console.log('src::', src);
  }

  // 调用方法时绑定iframe的load事件
  addEvent(eventName, element, fn) {
    if (element.attachEvent) element.attachEvent(`on${eventName}`, fn);
    else element.addEventListener(eventName, fn, false);
  }

  /**
   * 结束时间，只选择日期未选择时间的情况下，时间默认23:59:59
   * @param {Date|String} newEndTime 改变后的结束时间
   * @param {Date|String} oldEndTime 改变前的结束时间
   * @returns 返回处理后的结束时间
   */
  defaultEndTime(newEndTime, oldEndTime) {
    let isNewDate = Object.prototype.toString.call(newEndTime) == '[object Date]'
    let isOldDate = Object.prototype.toString.call(oldEndTime) == '[object Date]'
    let [newDate, newTime] = (isNewDate
      ? dateUtil.getFormatDate(newEndTime, 'yyyy-MM-dd HH:mm:ss') : newEndTime).split(' ')
    let [oldDate, oldTime] = (oldEndTime && isOldDate
      ? dateUtil.getFormatDate(oldEndTime, 'yyyy-MM-dd HH:mm:ss') : oldEndTime || '').split(' ')

    let time = `${newDate} ${newTime}`
    if (time != `${oldDate} ${oldTime}`
      && newDate != oldDate
      && '00:00:00' == newTime
    ) {
      time = `${newDate} 23:59:59`
    }
    return time
  }
  /**
   * 保存前校验必填不能为空
   * @valueArr 要校验的--普通input、select等类型的formValue值
   * @drpArr 要校验的--下拉等复杂类型的valuedata值
   * @return 该填的都填了就返回1，反之返回提示信息
   */
  validatorNotEmpty(formConfig, valueArr, drpArr) {
    // 最好是初始化、赋值、修改……的时候，把所有的值都赋一个给对应的formValue，编辑formValue
    // 好像还是要分别写，便于提示……不能为空，遍历formData !不行，formData Item的value并没有改变，还是要遍历formValue
    // 只能双遍历了
    const fD = formConfig.formData
    const fV = formConfig.formValue
    let messages = ''
    // 类型一：
    valueArr.forEach((item) => {
      for (const key2 in fV) {
        if (key2 == item) {
          if (!fV[key2]) {
            fD.forEach((it) => {
              if (it.colname == key2) {
                messages += `${it.label}，`
              }
            })
          }
        }
      }
    })
    // 类型二：
    if (drpArr) {
      drpArr.forEach((item) => {
        fD.forEach((it) => {
          if (it.colname == item) {
            if (!it.itemdata.valuedata) {
              messages += `${it.itemdata.name}，`
            }
          }
        })
      })
    }
    messages = messages.replace(/，$/, ' ')
    const msg = `${messages}不能为空!`
    if (!messages) {
      return 1
    } else {
      return msg
    }
  }
  /**
   * @method 根据据方法(getObject)的返回,初始化formConfig配置,包括formData
   * @data 待解析的数据
   * @form this.formConfig
   */
  initFormConfig(data, form) {
    // form.formData = [];
    // form.formValue = {};
    // form.ruleValidate = {};
    const fD = form.formData
    const fV = form.formValue
    const fR = form.ruleValidate
    data.forEach((item) => {
      fD.forEach((fDitem) => {
        if (fDitem.colname == item.colname) {
          /*  ˚˚˚˚˚˚˚˚˚˚˚˚˚˚˚˚˚˚˚˚˚˚˚˚˚˚˚˚ 生成formData结构 ˚˚˚˚˚˚˚˚˚˚˚˚˚˚˚˚˚˚˚˚˚˚˚˚˚˚˚˚  */
          fDitem.style =
            fDitem.style == 'dynamic' ? null : fDitem.style ? fDitem.style : ''
          if (item.webconf && item.webconf.style) {
            // 元数据中的前端自定义参数（因为元数据无法直接配置style为time）
            fDitem.style =
              fDitem.style == 'dynamic'
                ? null
                : fDitem.style
                  ? fDitem.style
                  : 'time'
          }
          fDitem.label = item.name || ''
          fDitem.value = item.colname.toString()
          fDitem.width = fDitem.width || '6'
          fDitem.regx = fDitem.regx || ''
          fDitem.placeholder = fDitem.placeholder || ''
          fDitem.disabled = item.readonly || false
          if (fDitem.style == 'input') {
            // 普通input类型--方法绑定
            // fDitem.inputChange = item.inputChange; // 不能在此赋值，不会实时调用，导致值的动态监听无效
          } else if (item.display == 'select' || item.display == 'check') {
            // select/check类型--方法绑定、options赋值
            // fDitem.selectChange = item.selectChange; // 不能在此赋值，不会实时调用，以至于下拉类型的值的动态监听无效
            fDitem.options = item.combobox.map((i) => ({
              label: i.limitdesc,
              value: i.limitval,
            }))
          } else if (item.fkdisplay && fDitem.itemdata) {
            // 复杂类型--方法绑定、formDataItem的itemdata子对象赋值
            // fDitem.itemdata = item;
            fDitem.version = fDitem.version || '1.4' // // 必须
            fDitem.itemdata.display = item.colid || 'No-colid' // 必须，用于查询表数据
            fDitem.itemdata.display = item.colname || 'No-colname' // 必须
            fDitem.itemdata.display = item.display || 'No-text' // 非必须，展示什么类型(eg.text、xml等)，非特殊类型不用写
            fDitem.itemdata.fkdisplay = item.fkdisplay || 'No-fkdisplay' // 必须，复杂类型是什么类型(eg.drp、mrp等)
            fDitem.itemdata.isfk = item.isfk // 必须
            fDitem.itemdata.isnotnull = item.isnotnull // 必须
            fDitem.itemdata.name = item.name || 'No-name' // 必须
            fDitem.itemdata.readonly = item.readonly // 必须
            fDitem.itemdata.reftable = item.reftable || 'No-reftable' // 非必须，mrp类型时必须设置(/p/cs/getTableQuery)
            fDitem.itemdata.reftableid = item.reftableid || 'No-reftableid' // 同reftable
            fDitem.itemdata.valuedata = item.valuedata || '' // 必须，展示的值
            fDitem.itemdata.pid = item.pid || '' // 必须，展示的值对应的那行数据的ID
            fDitem.oneObj = fDitem.oneObj
          }
          /*  ˚˚˚˚˚˚˚˚˚˚˚˚˚˚˚˚˚˚˚˚˚˚˚˚˚˚˚˚ 生成formValue 并 赋值（新增时接口不会返回valuedata字段）˚˚˚˚˚˚˚˚˚˚˚˚˚˚˚˚˚˚˚˚˚˚˚˚˚˚˚˚  */
          if (item.fkdisplay) {
            // 复杂类型的formValue赋值
            if (!item.valuedata) return
            fV[item.colname] = {
              pid: item.refobjid || '',
              valuedata: item.valuedata || '',
            }
            fV[`${item.colname}_pid`] = item.refobjid || ''
            fV[`${item.colname}_valuedata`] = item.valuedata || ''
            fV[`${item.colname.replace('_ID', '_ENAME')}`] =
              item.valuedata || ''
          } else if (item.display == 'select' || item.display == 'check') {
            // 下拉类型的接口会返回一个默认选中的值（元数据中字段的缺省值）
            fV[item.colname] = item.valuedata || item.defval || ''
          } else {
            fV[item.colname] = item.valuedata || item.defval || ''
          }
          /*  ˚˚˚˚˚˚˚˚˚˚˚˚˚˚˚˚˚˚˚˚˚˚˚˚˚˚˚˚ 生成必填ruleValidate（针对input、select等普通类型 ˚˚˚˚˚˚˚˚˚˚˚˚˚˚˚˚˚˚˚˚˚˚˚˚˚˚˚˚  */
          if (item.isnotnull) {
            fR[item.colname] = [
              {
                required: true,
                message: ' ',
              },
            ]
          }
        }
      })
    })
    form.formData = fD
    form.formValue = fV
    form.ruleValidate = fR
    return form
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
