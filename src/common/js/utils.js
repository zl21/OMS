/**
 * 科学检索
 * 【Navigate】导航
 * 【Form】表单
 * 【Page】分页
 * 【Object】
 * 【Date】日期
 * 【Number】
 * 【Array】
 * 【DOM】
 */
class custUtils {
  constructor() { }

  //--------------工具方法区--------------------------

  /**
   *
   * @param {消息框类型} type :String,
   * @param {当前页面实例} self ,
   * @param {接口返回结果} res :Object,
   * @param {是否定制消息框title} isTitle:String
   * @param {消息框自定义render} renderFun :function
   */
  static tipShow(type, self, res, isTitle, renderFun) {
    self.$Modal[type]({
      title: isTitle ?? $i18n.t('modalTitle.tips'), // 提示
      content: renderFun ?? res.data.message,
      cancelType: true,
      titleAlign: 'left',
      closable: true,
      mask: true,
      draggable: true,
      className: 'ark-dialog',
      keyDown: (event) => {
        if ([27, 13].includes(event.keyCode)) {
          self.$Modal.remove()
        }
      },
      render: renderFun,
    })
  }
 
  /**
   * $Message类型的提示框：
   * @self {object} self 指向当前this
   * @type {string} (eg.'warning'/'error'/'success'……)
   * @tips {string} 当tipsType=1或不传时，tips为语言包中modalTips对应的key；当tipsType!=1时，tips为要展示的提示信息(如接口直接返回的message)
   * @tipsType {number} 默认为1，等于1则使用语言包中的modalTips，不等于1则使用传过来的tips
   */
  static msgTips(self, type, tips, tipsType = 1) {
    self.$Message[type]({
      content: tipsType == 1 ? $i18n.t(`modalTips.${tips}`) : tips, // 请选择需要新增退单记录！
      duration: 5,
      top: 80,
    })
  }
  /**
   *
   * @param {this} self
   * @param {弹框配置的名称} modalConfig
   * @param {弹框文件名称} pageName
   * @param {弹框标题} confirmTitle
   */
  static importTable(self, modalConfig, pageName, confirmTitle) {
    console.log(confirmTitle)
    self[modalConfig].confirmTitle = confirmTitle
      ? $i18n.t(`${confirmTitle}`)
      : self[modalConfig].confirmTitle // 弹框标题
    self.$children.find((item) => item.name === pageName).openConfirm() // 文件名称
  }

  /**
   * key：value，Map对象生成,并查询相应的key值
   */
  static generateMap(keyArr,valueArr,serachV){
    let mapObj = new Map();
    let serachValue
    keyArr.forEach((e, i) => { mapObj.set(e, valueArr[i]) });
    mapObj.forEach((v, k) => {
      if (k === serachV) serachValue = v;
    });
    return serachValue;
  }
  
  /**
   * 用当前时间生成唯一Key
   * @returns key
   */
  static generateKey() {
    const now = new Date()
    const year = now.getFullYear()
    let month = now.getMonth() + 1
    let day = now.getDate()
    let hour = now.getHours()
    let minutes = now.getMinutes()
    let seconds = now.getSeconds()
    String(month).length < 2 ? (month = Number('0' + month)) : month
    String(day).length < 2 ? (day = Number('0' + day)) : day
    String(hour).length < 2 ? (hour = Number('0' + hour)) : hour
    String(minutes).length < 2 ? (minutes = Number('0' + minutes)) : minutes
    String(seconds).length < 2 ? (seconds = Number('0' + seconds)) : seconds
    const yyyyMMddHHmmss = `${year}${month}${day}${hour}${minutes}${seconds}`
    return yyyyMMddHHmmss
  }

  /* ============================================== 【Navigate】导航 START ============================================== */
  /**
   * 导航跳转处理-跳定制
   * @param {跳转表ID} id
   * @param {跳转打开的方式} eventType
   * @param {跳转的主表模块} moduleName
   * @param {跳转的主表标题} labelName
   * @param {扩展数据对象} exendObj
   * @param {Boolean} isback，返回是否刷新列表，默认true
   */
  static navigateMain(
    id,
    eventType,
    moduleName,
    labelName,
    exendObj = {},
    isback = true
  ) {
    R3.store.commit(`customize/${eventType}`, {
      id: id,
      type: 'action',
      name: moduleName,
      label: $i18n.t(`${labelName}`), // 订单管理
      back: isback,
      query: Object.assign({
        id: id,
        tabTitle: $i18n.t(`${labelName}`), // 订单管理
        ...exendObj,
      }),
    })
  }

  /**
   * 9个参数
   * eg:
        $omsUtils.tabJump(0, -1, 1, 'PM_C_PROM_ACTI_BATCH_ADD', { i8n: 1, tip: 'panel_label.batchAddPromotion' }, {}, 0)
   */
  static tabJump(
    mutationType,
    id,
    type,
    tableName,
    labelName = { i8n: 1, tip: '' },
    exendObj = {},
    isback = 0,
    global,
    tableId
  ) {
    const label = labelName.i8n ? $i18n.t(`${labelName.tip}`) : labelName.tip; // 语言包有就走语言包，不存在则直接取
    let mutationArr = ['customize/TabOpen', 'customize/switchActiveTab', 'customize/TabClose', 'customize/TabHref'];
    if (global) mutationArr = ['global/tabOpen'];
    const muta = mutationArr[mutationType];
    let param = {};
    if (!global) {
      param = {
        id: id,
        type: 1 ? 'action' : type, // 传1则'action'
        name: tableName,
        label,
        back: Boolean(isback),
        query: Object.assign({
          id: id,
          tabTitle: label,
          ...exendObj,
        }),
      };
    } else {
      param = {
        id: id, // 该条数据ID
        type: 1 ? 'S' : type, // 传1则'S'
        tableName,
        tableId,
        back: Boolean(isback),
      };
      if (type == 'C') {
        param = {
          type,
          customizedModuleId: tableId,
          customizedModuleName: tableName,
          label,
          dynamicRoutingForCustomizePage: Boolean(isback),
        };
      }
    }
    R3.store.commit(muta, param)
  }

  /**
   * 导航跳转处理-跳标准
   * @param {Number|String} id，明细ID
   * @param {Number} tableId，主表ID
   * @param {String} eventType，跳转打开的方式(eg.'TabHref'/'TabOpen')
   * @param {String} actionType，跳转类型(eg.'C'/'S')
   * @param {String} moduleName，模块名/tableName
   * @param {String} labelName，展示名
   * @param {Object} exendObj，拓展路由参数
   * @param {Boolean} isback，返回是否刷新列表，默认false
   */
  static navigateStandard(
    id,
    tableId,
    eventType,
    actionType,
    moduleName,
    labelName,
    exendObj = {},
    isback = false
  ) {
    R3.store.commit(`global/${eventType}`, {
      type: actionType,
      tableName: moduleName,
      label: $i18n.t(`${labelName}`),
      tableId: tableId,
      id: id,
      query: Object.assign({
        id: id,
        ptitle: $i18n.t(`${labelName}`),
        tabTitle: $i18n.t(`${labelName}`),
        tableName: moduleName,
        back: isback,
        ...exendObj,
      }),
    })
  }

  /**
   * 关闭当前tab
   * @param _self 指向当前this
   */
  static tabCloseAppoint = _self => {
    const { fullPath } = _self.$route;
    const { keepAliveModuleName, tableName } = _self.$store.state.global.activeTab;
    R3.store.commit('global/tabCloseAppoint', {
      routeFullPath: fullPath,
      stopRouterPush: true,
      keepAliveModuleName,
      tableName
    });
  };

  /**
   * @param {*} _self 
   * @param {*} defaultHeight 
   */
  static tabHref = (_self, params, extendObj = {}) => {
    // 返回--要传固定id
    let selection = [];
    if (!_self.vueAgTable) {
      selection = _self.$refs.agGridChild.AGTABLE.getSelect();
    } // 获取勾行数据;
    let id = params.id;
    if (params.id === 'id') {
      id = selection[0].ID;
    }
    if ((selection.length != 1 && params.id !== '-1') || (selection.length != 1 && params.cloneReturnGoodId)) {
      _self.$Message.warning($i18n.t('modalTips.zm'))
      return;
    }
    _self.$store.commit('customize/TabHref', {
      id: id,
      type: params.type ? params.type : 'action',
      name: params.name, // 文件名
      label: params.label, // tab中文名
      query: Object.assign({
        id: id,
        tabTitle: params.label, //  tab名
        ...extendObj
      })
    });
  }

  /* ============================================== 【Navigate】导航 END ============================================== */

  /* ============================================== 【Form】表单 START ============================================== */

  // 清空表单
  static formEmpty(_this, form, notvalueArr = [], notdrpArr = []) {
    _this[form].formData.forEach((it) => {
      if (it.itemdata && !notdrpArr.includes(it.colname)) {
        it.itemdata.pid = '';
        it.itemdata.valuedata = '';
      }
    })
    for (const key in _this[form].formValue) {
      if (!notvalueArr.includes(key)) {
        _this[form].formValue[key] = ''
      }
    }
    return _this[form]
  }

  /**
   * @method 根据据方法(getObject)的返回,初始化formConfig配置,包括formData
   * @data 待解析的数据
   * @form this.formConfig
   */
  static initFormConfig(data, form) {
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
            fDitem.serviceId = fDitem.serviceId || 'r3-cp' // 不配置则框架根据路由上的表名默认拼接该中心的网关
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

  /**
   * @method 根据各界面'各自的查询接口'返回的主表data，初始化详情的form值
   * @data {data} 待处理的数据对象
   * @replaceString 要转换为'_ENAME'还是'_NAME'，要取接口返回的name字段赋值给valuedata
   */
  static transformForm(
    data,
    form,
    inputArr = [],
    drpArr = [],
    replaceString = '_NAME'
  ) {
    const fD = form.formData
    const fV = form.formValue
    for (const keyRes in data) {
      // input型
      for (const keyFv in fV) {
        if (keyRes == keyFv && inputArr.includes(keyFv)) {
          fV[keyFv] = data[keyRes]
        }
      }
      // drp/mrp型
      fD.forEach((item) => {
        if (keyRes == item.colname && drpArr.includes(item.colname)) {
          item.itemdata.pid = data[item.colname]
          item.itemdata.valuedata =
            data[item.colname.replace('_ID', replaceString)]
        }
      })
    }
    form.formData = fD
    form.formValue = fV
    return form
  }

  /**
   * 保存前校验必填不能为空
   * @valueArr 要校验的--普通input、select等类型的formValue值
   * @drpArr 要校验的--下拉等复杂类型的valuedata值
   * @return 该填的都填了就返回1，反之返回提示信息
   */
  static validatorNotEmpty(formConfig, valueArr, drpArr, callback) {
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
    if (typeof callback == 'function') callback(!messages ? '' : msg);
    if (!messages) {
      return ''
    } else {
      return msg
    }
  }

  /**
   * 置为不可编辑
   * @valueArr 要置为不可编辑的--input、select等普通类型formItem
   * @drpArr 要置为不可编辑的--下拉等复杂类型formItem
   * @return
   */
  static formItemDisable(formData, valueArr = [], drpArr = []) {
    const fD = formData
    fD.forEach((it) => {
      it.display = valueArr.includes(it.colname)
      it.itemdata.readonly = drpArr.includes(it.colname)
    })
    return fD
  }

  /* ============================================== 【Form】表单 END ============================================== */

  /* ============================================== 【Page】分页 START ============================================== */

  /**
   * 共用对象
   */
   static pageConfig = {
    // 设置总条数
    total: 0,
    // 条数
    pageSize: 50,
    // 页数
    current: 1,
    pageSizeOpts: [50, 200, 500, 2000]
  };

  /**
   * 适用于前端分页
   * @method 分页初始化方法
   * @param {Array} sumData 总数据
   * @param {Object} config 分页的配置（含有current（页数）、pageSize（每页个数））
   * @returns {Object} data: 当前页数据；config: 分页的配置
  */
  static pagingInit = (sumData, config) => {
    const sumTableData = JSON.parse(JSON.stringify(sumData)); // 所有数据
    let listData = [];
    const dataConfig = Object.assign({}, config);
    const pageSize = dataConfig.pageSize;
    const start = (dataConfig.current - 1) * pageSize;
    const end = start + pageSize;
    const dialogTableConfigData = sumTableData.slice(start, end);
    if (dialogTableConfigData.length === 0) {
      // 当前页都被删除
      if (dataConfig.current === 1) {
        // 当前页为第一页
        listData = [];
      } else {
        // 当前页不为第一页
        listData = sumTableData.slice(start - pageSize, end - pageSize);
        dataConfig.current--;
      }
    } else {
      listData = dialogTableConfigData;
    }
    return {
      data: listData,
      config: dataConfig
    };
  };

  /* ============================================== 【Page】分页 END ============================================== */
  
  /* ============================================== 【Object】 START ============================================== */
  
  /**
   * 含有部分相同属性的两个对象快速赋值法
   * 对于相同的key, 用源对象覆盖目标对象
   * @param {Object} target 目标对象
   * @param {Object} origin 源对象
   */
  static intersectFormValue(target, origin) {
    Object.keys(target).forEach((key) => {
      if (origin[key]) {
        if (typeof origin[key] == 'object') {
          target[key] = JSON.parse(JSON.stringify(origin[key]))
        } else {
          target[key] = origin[key]
        }
      }
    })
  }

  /* ============================================== 【Object】 END ============================================== */

  /* ============================================== 【Date】日期 START ============================================== */

  static standardTimeConversiondateToStr(val) {
    let tempVal = val ?? '';
    const dateTime = new Date(tempVal);
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
    return `${year}-${month}-${date} ${hour}:${minutes}:${second}`;
  }

  // 针对日期组件：数据标准时间转成 yyyy-mm-dd hh:mm:ss
  static standardTimeConversion(val) {
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
  static getFormatDate(date, fmt) {
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        `${date.getFullYear()}`.substr(4 - RegExp.$1.length)
      );
    }
    const o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'H+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds(),
    };
    for (const k in o) {
      if (new RegExp(`(${k})`).test(fmt)) {
        const str = `${o[k]}`;
        fmt = fmt.replace(
          RegExp.$1,
          RegExp.$1.length === 1 ? str : `00${str}`.substr(str.length)
        );
      }
    }
    return fmt;
  }

  static compareDate(date1, date2) {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    if (d1.getTime() > d2.getTime()) {
      return true;
    }
    return false;
  }

  /** 日期原型扩展
   * 日期格式转化函数
   */
  static Format(self, fmt) {
    const o = {
      'M+': self.getMonth() + 1, // 月份
      'd+': self.getDate(), // 日
      'h+': self.getHours(), // 小时
      'm+': self.getMinutes(), // 分
      's+': self.getSeconds(), // 秒
      'q+': Math.floor((self.getMonth() + 3) / 3), // 季度
      S: self.getMilliseconds(), // 毫秒
    };
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        `${self.getFullYear()}`.substr(4 - RegExp.$1.length)
      );
    }
    for (const k in o) {
      if (new RegExp(`(${k})`).test(fmt)) {
        fmt = fmt.replace(
          RegExp.$1,
          RegExp.$1.length === 1 ? o[k] : `00${o[k]}`.substr(`${o[k]}`.length)
        );
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
  static dateAdd(dt, num, unit) {
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
        return new Date(
          dt.getFullYear(),
          dt.getMonth() + num,
          dt.getDate(),
          dt.getHours(),
          dt.getSeconds(),
          dt.getMilliseconds()
        );
      case 'y':
        return new Date(
          dt.getFullYear() + num,
          dt.getMonth(),
          dt.getDate(),
          dt.getHours(),
          dt.getSeconds(),
          dt.getMilliseconds()
        );
      default:
        return dt;
    }
  };

  /**
   * 给指定时间累加毫秒
   * @param dt 待累加毫秒的时间类型数据(可以是时间类型数据或者时间格式的字符串)
   * @param milliSeconds 累加毫秒
   */
  static addMilliseconds(dt, milliSeconds) {
    return this.dateAdd(dt, milliSeconds, 'S');
  };

  /**
   * 给指定时间累加秒
   * @param dt):待累加秒的时间
   * @param seconds):累加秒
   */
  static addSeconds(dt, seconds) {
    return this.dateAdd(dt, seconds, 's');
  };

  /**
   * 给指定时间累加分钟
   * @param dt):待累加分钟的时间(可以是时间类型数据或者时间格式的字符串)
   * @param minutes):累加分钟
   */
  static addMinutes(dt, minutes) {
    return this.dateAdd(dt, minutes, 'm');
  };

  /**
   * 给指定时间累加小时
   * @param dt):待累加小时的时间(可以是时间类型数据或者时间格式的字符串)
   * @param hours):累加小时
   */
  static addHours(dt, hours) {
    return this.dateAdd(dt, hours, 'h');
  };

  /**
   * 给指定时间累加天数
   * @param dt):待累加天数的时间(可以是时间类型数据或者时间格式的字符串)
   * @param days):累加天数
   */
  static addDays(dt, days) {
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
  static convert(maybe) {
    if (this.isDate(maybe)) {
      return maybe;
    }
    if (strUtil.IsString(maybe) && Number.isNaN(maybe)) {
      maybe = maybe.replace(/-/g, '/');
      const values = maybe.match(/(\d+)+/g);
      return new Date(
        values[0],
        parseInt(values[1]) - 1,
        values[2] || '',
        values[3] || '',
        values[4] || '',
        values[5] || '',
        values[6] || ''
      );
    }
    if (strUtil.IsString(maybe)) {
      maybe = `${maybe.slice(0, 4)}-${maybe.slice(4, 6)}-${maybe.slice(6, 8)}`;
      maybe = maybe.replace(/-/g, '/');
      const values = maybe.match(/(\d+)+/g);
      return new Date(
        values[0],
        parseInt(values[1]) - 1,
        values[2] || '',
        values[3] || '',
        values[4] || '',
        values[5] || '',
        values[6] || ''
      );
    }
    return new Date(Number(maybe));
  };

  /**
   * 判断传入值是否为Date数据类型
   * @param date  待判断的值
   */
  static isDate(date) {
    return Object.prototype.toString.call(date) === '[object Date]';
  };

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

  // 时间戳转换为日期
  static timestampToTime(timestamp) {
    const a = (`${timestamp}`).length;
    const date = a == 13 ? new Date(timestamp) : new Date(timestamp * 1000); // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
    const Y = `${date.getFullYear()}-`;
    const M = `${date.getMonth() + 1 < 10
      ? `0${date.getMonth() + 1}`
      : date.getMonth() + 1}-`;
    const D = `${date.getDate()} `;
    const h = `${date.getHours()}:`;
    const m = `${date.getMinutes()}:`;
    const s = date.getSeconds();
    return Y + M + D + h + m + s;
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

  // 数组标准时间转换成yyyy-mm-dd格式
  static getTimesValue = time => {
    let timeValue = '';
    const dateone = new Date(time[0]).toJSON();
    const datetwo = new Date(time[1]).toJSON();
    const dateTimeOne = new Date(+new Date(dateone) + 8 * 3600 * 1000)
      .toISOString()
      .replace(/T/g, ' ')
      .replace(/\.[\d]{3}Z/, '');
    const dateTimeTwo = new Date(+new Date(datetwo) + 8 * 3600 * 1000)
      .toISOString()
      .replace(/T/g, ' ')
      .replace(/\.[\d]{3}Z/, '');
    timeValue = `${dateTimeOne}~${dateTimeTwo}`;

    if (timeValue === '1970-01-01 08:00:00~1970-01-01 08:00:00') {
      timeValue = '';
    }
    return timeValue;
  }

  /**
   * 日期 format
   * @method 日期转换
   * @param {Date} newDate {Object Date}
   * @param {String} format {String} 示例: yyyy-MM-dd hh:mm:ss
   */
  static dateFormat = (newDate, format) => {
    const e = {
      'M+': newDate.getMonth() + 1,
      'd+': newDate.getDate(),
      'h+': newDate.getHours(),
      'm+': newDate.getMinutes(),
      's+': newDate.getSeconds()
    };
    if (/(y+)/.test(format)) {
      format = format.replace(RegExp.$1, (`${newDate.getFullYear()}`).substr(4 - RegExp.$1.length));
    }
    for (const k in e) {
      if (new RegExp(`(${k})`).test(format)) {
        format = format.replace(RegExp.$1, (RegExp.$1.length == 1) ? (e[k]) : ((`00${e[k]}`).substr((`${e[k]}`).length)));
      }
    }
    return format;
  };

  /**
   * 获取当前时间
   */
  static getCurrentTime = () => {
    let startTime = this.Format(new Date(), 'yyyy-MM-dd 23:59:59');
    let endDay = this.addDays(new Date(), -7);
    let endTime = this.Format(endDay, 'yyyy-MM-dd 00:00:00');
    return [startTime, endTime];
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
   * 结束时间，只选择日期未选择时间的情况下，时间默认23:59:59
   * @param {Date|String} newEndTime 改变后的结束时间
   * @param {Date|String} oldEndTime 改变前的结束时间
   * @returns 返回处理后的结束时间
   */
  static defaultEndTime(newEndTime, oldEndTime) {
    let isNewDate = Object.prototype.toString.call(newEndTime) == '[object Date]'
    let isOldDate = Object.prototype.toString.call(oldEndTime) == '[object Date]'
    let [newDate, newTime] = (isNewDate
      ? this.getFormatDate(newEndTime, 'yyyy-MM-dd HH:mm:ss') : newEndTime).split(' ')
    let [oldDate, oldTime] = (oldEndTime && isOldDate
      ? this.getFormatDate(oldEndTime, 'yyyy-MM-dd HH:mm:ss') : oldEndTime || '').split(' ')

    let time = `${newDate} ${newTime}`
    if (time != `${oldDate} ${oldTime}`
      && newDate != oldDate
      && '00:00:00' == newTime
    ) {
      time = `${newDate} 23:59:59`
    }
    return time
  }

  /* ============================================== 【Date】日期 END ============================================== */
  
  /* ============================================== 【Number】START ============================================== */
  
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
   * 保留小数点几两位 不足自动补0
   *  @param {Number\String}
   */
  static floatNumber(num) {
    num = typeof num === 'number' ? num.toString() : num;
    if (num.includes('.')) {
      let b = num.split('.')
      if (b[1].length == 1) {
        b = b.join('.')
        b += '0'
        num = b
      } else if (b[1].length > 2) {
        let isZero = b[0].charAt(0) == '0';
        let num_length = isZero ? 2 : b[0].length + 2;
        if(b[0].includes('-')) num_length = num_length - 1;
        b = Number(b.join('.')).toPrecision(num_length)
        num = b;
      }
    } else {
      num += '.00'
    }
    return num
  }

  /* ============================================== 【Number】END ============================================== */

  /* ============================================== 【Array】START ============================================== */
  
  // 数组对象根据子元素某各个key合并分组
  static sonList(arr, key) {
    return arr.map((item) => item[key])
  }

  /**
   * 扩展Array方法, 去除数组中空白数据
   */
  static notempty(val) {
    return val.filter(function (s) {
      return s && s.toString().trim()
    })
  }

  /**
   * 获取两个数组对象的差集
   * @param allArr：全数组
   * @param partArr：缺省数组
   * @key {ECODE} 根据key来做求差集
   */
   static getDifferentArr(allArr = [], partArr = [], key) {
    const differentArr = [...allArr].filter((x) =>
      [...partArr].every((y) => y[key] !== x[key])
    )
    return differentArr
  }

  /**
   * 获取两个数组对象的交集
   * @param Arr1 数组1
   * @param Arr2 数组2
   * @key {ID} 根据key来做求交集
   */
  static getUnionArr(Arr1 = [], Arr2 = [], key) {
    const unionArr = [...Arr1].filter((x) =>
      [...Arr2].some((y) => y[key] === x[key])
    )
    return unionArr
  }

  // 数组对象去重
  static unrepeated(targetArr, id) {
    let obj = {}
    let okArr = targetArr.reduce((cur, next) => {
      obj[next[id]] ? '' : (obj[next[id]] = true && cur.push(next))
      return cur
    }, []) //设置cur默认为空的数组
    return okArr
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

  /* ============================================== 【Array】END ============================================== */
  
  /* ============================================== 【DOM】START ============================================== */
  
  /**
   * 设置表格高度
   * @param _self 指向当前this
   * @param defaultHeight 指向当前this
   * 获取agTable高度
   * 通过 totalHeight 节点
   */
   static setTableHeight = (_self, defaultHeight) => {
    const contentHeight = document.getElementById('content').clientHeight;
    // 获取需要除了agTable之外的节点
    const arr = document.getElementsByClassName('totalHeight');
    if (!arr.length) return // 解决促销换ag后报错
    let sumHeight = 34 + defaultHeight;
    Object.getOwnPropertyNames(arr).forEach(item => {
      sumHeight += parseInt(arr[item].clientHeight);
    });
    const tableHeight = `${contentHeight - sumHeight}px`;
    if (_self.$refs.agGridChild1) {
      _self.tabConfig.forEach(item => {
        item.agTableConfig.tableHeight = tableHeight;
      });
    } else {
      _self.agTableConfig.tableHeight = tableHeight;
    }
    const agTableDom = document.getElementsByClassName('ag-theme-balham')[0];
    if (agTableDom) {
      agTableDom.style.height = tableHeight;
    }
  };

  /**
   * 计算表格高度
   */
  static onresizes = (_self, defaultHeight) => {
    let option = () => { };
    // 获取当前主表名
    const tableName = _self.$route.params.customizedModuleName;
    // 匹配当前的定制界面执行当前逻辑
    switch (tableName) {
      case 'PAYABLEADJUSTMENTLIST':// 赔付单
      case 'RETURNGOODLIST': // 退换货单
      case 'RETURNSTOREAGELIST':// 退货入库
      case 'ORDERMANAGER':// 零售发货单
        option = () => {
          if (tableName == 'ORDERMANAGER' && _self.iconDownIcon === 'ark-icon iconfont iconios-arrow-down') {
            // 判断 如果不是高级搜索 自适应高度
            this.setTableHeight(_self, defaultHeight);
          } else if (tableName != 'ORDERMANAGER') {
            this.setTableHeight(_self, defaultHeight);
          }
        };
        break;
      case 'PROMACTIQUERYLIST':// 促销活动
        option = () => {
          this.setTableHeight(_self, 100);
          const agGridChild = `agGridChild${Number(_self.activeName) + 1}`;
          _self.$refs[`${agGridChild}`][0].agGridTable(_self.tabConfig[_self.activeName].agTableConfig.columnDefs, _self.tabConfig[_self.activeName].agTableConfig.rowData);
        };
        break;
    }
    $(window).on('resize', option);
  };

  /**
   * 销毁resize方法
   */
  static removeOnresize = () => {
    //  移除监听屏幕变化方法 js
    $(window).off('resize');
  };

  /**
   * 设置局部loading
   * @loading 是否生成loading
   */
  static setLoading = (loading = false) => {
    const loadingParentDom = document.getElementsByClassName('ark-modal-body')[0];
    let loadingDom = document.getElementsByClassName('vue-loading')[0];
    if (loadingDom) {
      loadingParentDom.removeChild(loadingDom);
    }
    loadingDom = document.createElement("div");
    loadingParentDom.appendChild(loadingDom);
    const loadingChildDom = document.createElement("div");
    loadingDom.appendChild(loadingChildDom);
    if (loading) {
      loadingDom.setAttribute('class', 'vue-loading');
      loadingChildDom.setAttribute('class', 'R3-Loading loader');
    } else {
      loadingParentDom.removeChild(loadingDom);
    }
  };

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
  /* ============================================== 【DOM】END ============================================== */
}


export default custUtils

// 给Number类型增加一个mul方法，调用起来更加方便。
Number.prototype.mul = function (arg) {
  return custUtils.accMul(arg, this);
};
// 给Number类型增加一个div方法，调用起来更加方便。
Number.prototype.div = function (arg) {
  return custUtils.accDiv(this, arg);
};

//
// Number.prototype.toFixed = function(fractionDigits) {
//   return ( parseInt((this * Math.pow( 10, fractionDigits ) + 0.5).toString())/ Math.pow( 10, fractionDigits )).toString();
// }

/**
 * 修改了原型上的toFixed方法
 * @param {*} length 
 * @returns 
 * 效果：1.6800000000000068.toFixed(2) = 1.69
 */
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
}