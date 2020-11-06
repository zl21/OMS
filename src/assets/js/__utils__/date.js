import strUtil from './util.js';

class dateFuns {
  constructor() { }

  standardTimeConversiondateToStr(val) {
    const dateTime = new Date(val);
    const year = dateTime.getFullYear();
    let month = dateTime.getMonth() + 1; // js从0开始取
    let date = dateTime.getDate();
    let hour = dateTime.getHours();
    let minutes = dateTime.getMinutes();
    let second = dateTime.getSeconds();
    if (month < 10) {
      month = `0${month}`;
    }
    if (date < 10) {
      date = `0${date}`;
    }
    if (hour < 10) {
      hour = `0${hour}`;
    }
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    if (second < 10) {
      second = `0${second}`;
    }
    return (
      `${year 
      }-${ 
        month 
      }-${ 
        date 
      } ${ 
        hour 
      }:${ 
        minutes 
      }:${ 
        second}`
    );
  }

  // 针对日期组件：数据标准时间转成 yyyy-mm-dd hh:mm:ss
  standardTimeConversion(val) {
    const d = new Date(val);
    const datetime = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()} `;
    return datetime;
  }

  /**
   * @Descroption 将日期变量转换为指定格式的日期
   * @Author 洪艺安
   * @param date
   * @param fmt
   * @returns {*}
   */
  getFormatDate(date, fmt) {
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (`${date.getFullYear()}`).substr(4 - RegExp.$1.length));
    }
    const o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'H+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds()
    };
    for (const k in o) {
      if (new RegExp(`(${k})`).test(fmt)) {
        const str = `${o[k]}`;
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : (`00${str}`).substr(str.length));
      }
    }
    return fmt;
  }

  compareDate(date1, date2) {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    if (d1.getTime() > d2.getTime()) {
      return true;
    } 
    return false;
  }
}
export default new dateFuns();


/** 日期原型扩展
 * 日期格式转化函数
 */
Date.prototype.Format = function (fmt) {
  const o = {
    'M+': this.getMonth() + 1, // 月份
    'd+': this.getDate(), // 日
    'h+': this.getHours(), // 小时
    'm+': this.getMinutes(), // 分
    's+': this.getSeconds(), // 秒
    'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
    S: this.getMilliseconds() // 毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, `${this.getFullYear()}`.substr(4 - RegExp.$1.length));
  }
  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : `00${o[k]}`.substr(`${o[k]}`.length));
    }
  }
  return fmt;
};


/**
 * 增加添加指定单位的时间值
 * @param   dt   日期 可以是一个时间类型或者一个时间格式的字符串
 * @param   num  时间隔值
 * @param   unit 时间间隔单位： S(毫秒) s(秒) m(分) h(小时) d(天) M(月) y(年)
 */
Date.prototype.dateAdd = function (dt, num, unit) {
  dt = this.convert(dt);
  switch (unit) {
    case 'S':
      return new Date(dt.getTime() + num);
    case 's':
      return new Date(dt.getTime() + num * 1000);
    case 'm':
      return new Date(dt.getTime() + num * 60000);
    case 'h':
      return new Date(dt.getTime() + num * 3600000);
    case 'd':
      return new Date(dt.getTime() + num * 86400000);
    case 'M':
      return new Date(dt.getFullYear(), dt.getMonth() + num, dt.getDate(), dt.getHours(), dt.getSeconds(), dt.getMilliseconds());
    case 'y':
      return new Date(dt.getFullYear() + num, dt.getMonth(), dt.getDate(), dt.getHours(), dt.getSeconds(), dt.getMilliseconds());
    default:
      return dt;
  }
};

/**
 * 给指定时间累加毫秒
 * @param dt 待累加毫秒的时间类型数据(可以是时间类型数据或者时间格式的字符串)
 * @param milliSeconds 累加毫秒
 */
Date.prototype.addMilliseconds = function (dt, milliSeconds) {
  return this.dateAdd(dt, milliSeconds, 'S');
};

/**
 * 给指定时间累加秒
 * @param dt):待累加秒的时间
 * @param seconds):累加秒
 */
Date.prototype.addSeconds = function (dt, seconds) {
  return this.dateAdd(dt, seconds, 's');
};

/**
 * 给指定时间累加分钟
 * @param dt):待累加分钟的时间(可以是时间类型数据或者时间格式的字符串)
 * @param minutes):累加分钟
 */
Date.prototype.addMinutes = function (dt, minutes) {
  return this.dateAdd(dt, minutes, 'm');
};

/**
 * 给指定时间累加小时
 * @param dt):待累加小时的时间(可以是时间类型数据或者时间格式的字符串)
 * @param hours):累加小时
 */
Date.prototype.addHours = function (dt, hours) {
  return this.dateAdd(dt, hours, 'h');
};

/**
 * 给指定时间累加天数
 * @param dt):待累加天数的时间(可以是时间类型数据或者时间格式的字符串)
 * @param days):累加天数
 */
Date.prototype.addDays = function (dt, days) {
  return this.dateAdd(dt, days, 'd');
};


/**
 * 时间转换函数
 * @param   maybe 时间类型，或者时间类型字符串，或者毫秒数字
 *
 * @example
 *         var Dante = require('dantejs');
 *         Dante.Date.convert('2016-10-22'); > Date()
 */
Date.prototype.convert = function (maybe) {
  if (this.isDate(maybe)) {
    return maybe;
  } if (strUtil.IsString(maybe) && Number.isNaN(maybe)) {
    maybe = maybe.replace(/-/g, '/');
    const values = maybe.match(/(\d+)+/g);
    return new Date(values[0], parseInt(values[1]) - 1, values[2] || '', values[3] || '', values[4] || '', values[5] || '', values[6] || '');
  } if (strUtil.IsString(maybe)) {
    maybe = `${maybe.slice(0, 4)}-${maybe.slice(4, 6)}-${maybe.slice(6, 8)}`;
    maybe = maybe.replace(/-/g, '/');
    const values = maybe.match(/(\d+)+/g);
    return new Date(values[0], parseInt(values[1]) - 1, values[2] || '', values[3] || '', values[4] || '', values[5] || '', values[6] || '');
  } 
  return new Date(Number(maybe));
};

/**
 * 判断传入值是否为Date数据类型
 * @param date  待判断的值
 */
Date.prototype.isDate = function (date) {
  return Object.prototype.toString.call(date) === '[object Date]';
};
