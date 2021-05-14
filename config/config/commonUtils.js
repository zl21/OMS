import service from '@/service/index'
import BurgeonDate from '@/assets/js/__utils__/date';
class commonUtils {
  static gateWayPrefix = {
    basicData: '/r3-cp',
    commodityCenter: '/r3-ps',
    orderCenter: '/r3-oc-oms',
  }
  constructor() { }

  //--------------工具方法区--------------------------

  //请求主体处理
  /* 
    callback不定参, 做参数解构;
    callbackType: callback类型标记, callbackFun;
    callbackType : all 全部替换, part 局部替换;
   */
  /**
   * 统一发请求
   * @self {Object} 当前实例
   * @serviceUrl {String} eg."common.queryList"
   * @params {Object} 该接口的请求参数
   * @callback  {Array} 其余参数解构成的数组
   * @callbackType {String} 用于判断何时走回调函数
   * @callbackFun {Funtion} 回调函数，具体处理接口返回的res的方法
   */
  static serviceHandler(self, serviceUrl, params, callback) {
    const ApiUrl = serviceUrl.split('.')
    self.service[ApiUrl[0]]
    [ApiUrl[1]](params)
      .then((res) => {
        let [callbackType, callbackFun] = callback
        console.log('args', callbackType)
        if (callbackType == 'all') {
          callbackFun(res)
        } else {
          if (res.data.code === 0) {
            if (callbackFun) {
              callbackFun(res)
            } else {
              self.msgTips('success', self, '取消成功', 0)
              self.selection = []
              self.query()
            }
          } else {
            // this.tipShow('error', self, res);
            this.tipShow(
              'confirm',
              self,
              res,
              `订单取消成功${res.data.data.SUCCESS_COUNT}条失败${res.data.data.ERROR_COUNT}条!`,
              function (h) {
                //因为后端复用列列表详情界面的取消接口,需要区分
                return h('Table', {
                  props: {
                    columns: [
                      {
                        title: '序号',
                        key: 'INDEX',
                      },
                      {
                        title: '单据编号',
                        key: 'BILL_NO',
                      },
                      {
                        title: '失败原因',
                        key: 'RESULT_MSG',
                      },
                    ],
                    data: res.data.data.CANCEL_ORDER_ERROR_INFOS,
                  },
                })
              }
            )
          }
        }
      })
      .finally(() => {
        self.btnConfig.loading = false
      })
  }
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
   * 获取两个数组对象的并集
   * @param obj  拷贝的数据源
   */
  static deepClone(obj) {
    let objClone = Array.isArray(obj) ? [] : {}
    if (obj && typeof obj === 'object') {
      for (let key in obj) {
        if (obj[key] && typeof obj[key] === 'object') {
          objClone[key] = this.deepClone(obj[key])
        } else {
          objClone[key] = obj[key]
        }
      }
    }
    return objClone
  }
  /**
   * 复杂的$Modal类型的提示弹窗
   * @self {*} this
   * @tips {*} modalTitle[tips]
   * @okKey {*} {String} 点击确定要调用的接口，eg."common.queryList"
   * @data {*} {Object} 点击确定调用的接口的入参
   * @callback  {Object} 什么鬼？反正里面存了callbackType、callbackFun（具体处理接口返回的res的方法？）
   * @param  {...any} callback
   */
  static modalShow(self, tips, okKey, data, ...callback) {
    self.$Modal.info({
      title: $i18n.t('modalTitle.tips'), // 提示
      content: $i18n.t(`modalTips.${tips}`),
      mask: true,
      showCancel: true,
      okText: $i18n.t('common.determine'), // 确定
      cancelText: $i18n.t('common.cancel'), // 取消
      onOk: () => {
        this.serviceHandler(self, okKey, data, callback)
      },
      onCancel: () => {
        self.$emit('closeActionDialog', false)
      },
    })
  }

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
   * 按钮权限请求方法getPermissions：
   * @self {object} 指向当前实例
   * @arrry {string} 当前按钮配置的name，eg: 'btnConfig'
   * @param {string} 用于请求接口的传参，目前是String类型。待扩展成对象类型，便于支持同名不同按钮配置的页面，如新增和详情同一页面时
   * @param {*} isIndependent
   * @returns
   */
  static getPermissions(self, array, params, isIndependent) {
    let independent = []
    const query = {
      TABLE: params.table,
      TYPE: params.type,
    }
    // console.log('this[arrry].buttons===', this[arrry].buttons)
    if (self[array] == undefined) return
    self.service.common.fetchActionsInCustomizePage(query).then((res) => {
      let result = res.data.data.ZIP || res.data.data.DATA || [] //未压缩情况下数据获取
      independent = result
      const a = []
      self[array].buttons.forEach((item) => {
        // 设置、收藏等图标按钮的配置
        if (!item.text && item.icon) {
          a.push(item)
        }
      })

      const c = []
      result.forEach((element) => {
        // 有下拉项的处理
        if (element.child) {
          this.buttonChild(element, self[array].buttons, c)
        }
        // 普通btn（无child）的处理
        self[array].buttons.forEach((btn) => {
          if (
            btn.webname == element.webname ||
            btn.webname.includes(element.webname)
          ) {
            btn.webid = element.webid
            btn.text = element.webdesc
            c.push(btn)
          }
        })
      })
      self[array].loading = false
      if (isIndependent) {
        return independent
      }
      self[array].buttons = [...c, ...a]
    })
  }
  static buttonChild(ele, btns, arr) {
    const obj = {}
    const ar = []
    obj.menuText = ele.caption
    obj.dropDown = true
    ele.child.forEach((item) => {
      if (item.child) {
        this.buttonChild(item, btns, ar)
        return
      }
      btns.forEach((sItem) => {
        if (
          item.webname == sItem.webname ||
          sItem.webname.includes(item.webname)
        ) {
          sItem.webid = item.webid
          sItem.text = item.webdesc
          ar.push(sItem)
        }
      })
    })
    obj.menus = ar
    arr.push(obj)
  }

  // 字段选项组转换
  static converSelect(val) {
    let list = val.map((item) => {
      return { label: item.limitdesc, value: item.limitval }
    })
    return list
  }

  /* ============================================== 2.0: ============================================== */

  /**
   * 获取字段选项组值/初始化下拉options(p/cs/getObject)
   *  @table 'PS_C_SKU' 表名
   *  @colArr ["PAY_TYPE"] select类型的字段 的colname/英文名 的集合
   *  @foldingName "基础信息" 折叠名称
   *  @formConfig this.formConfig 待修改的formConfig
   *  @return 返回this.formConfig.formData
   * */
  static async getTypeList(table, colArr, foldingName, formConfig) {
    const fromdata = new FormData()
    let fD = formConfig.formData
    fromdata.append('table', table)
    fromdata.append('objid', -1)
    const res = await service.common.getObject(fromdata)
    res.data.data.addcolums.forEach((item) => {
      if (item.parentdesc == foldingName) {
        item.childs.forEach((it) => {
          // it为接口返回的类似formData.Item的数据
          colArr.forEach((colArrItem) => {
            if (it.colname == colArrItem) {
              // 用colname来匹配需要的select类型的item
              fD.forEach((fDitem) => {
                // 赋值给options
                if (fDitem.colname === colArrItem) {
                  fDitem.options = it.combobox.map((i) => ({
                    label: i.limitdesc,
                    value: i.limitval,
                  }))
                }
              })
            }
          })
        })
      }
    })
    return fD
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

  /**
   * @method 请求p/cs/getObject接口，初始化‘基础信息’Part的表单值
   * @table 主表表名
   * @id 明细ID
   */
  static async getObject(table, id) {
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
   * 填充子表数据(p/cs/objectTableItem)
   * @param {*} table 子表表名
   * @param {*} objid 明细ID
   * @param {*} refcolid 子表id
   * @param {*} searchdata searchdata查询条件，可不传
   * @returns 表数据数组data
   */
  static async initSubtable(table, objid, refcolid, searchdata = {}) {
    if (objid === -1) return
    const searchdatas = {
      column_include_uicontroller:
        searchdata.column_include_uicontroller || true,
      startindex: searchdata.startindex || 0,
      range: searchdata.range || 10,
      fixedcolumns: searchdata.fixedcolumns || {},
    }
    const formdata = new FormData()
    formdata.append('objid', objid)
    formdata.append('table', table)
    formdata.append('searchdata', JSON.stringify(searchdatas))
    formdata.append('refcolid', refcolid)
    const res = await service.common.objectTableItem(formdata)
    if (res.data.code === 0) {
      let rowData = []
      res.data.data.row.map((row) => {
        const obj = {}
        for (const i in row) {
          obj[i] = row[i].val
        }
        rowData.push(obj)
      })
      const data = {
        otherData: res.data.data,
        rowData,
      }
      return data
    } else {
      // 数据加载失败
      console.log('no objectItem data!')
      return []
    }
  }

  /**
   * 保存前校验必填不能为空
   * @valueArr 要校验的--普通input、select等类型的formValue值
   * @drpArr 要校验的--下拉等复杂类型的valuedata值
   * @return 该填的都填了就返回1，反之返回提示信息
   */
  static validatorNotEmpty(formConfig, valueArr, drpArr) {
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

  //拼接网关前缀;
  static splicingGateWay(gateWay, url) {
    let prefix = ''
    if (gateWayFlag) {
      for (let [k, v] of Object.entries(this.gateWayPrefix)) {
        console.log(k, v)
        if (gateWay == k) {
          prefix = v
        }
      }
    }

    let resUrl = prefix.concat(url) //网关打开自动
    return resUrl
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
   * 标准接口(eg./cs/QueryList,/cs/getTableQuery等)动态拼接网关
   * @param {*} src
   * @returns
   */
  static splitServiceID(src) {
    let reSrc = src
    const serviceIDMap = JSON.parse(localStorage.getItem('serviceIdMap'))
    const path = R3.router.history.current.fullPath
    const sysMark = path.split('/')[1]
    const routeKey = path.split('/')[2]
    const serviceIdConfig = ['r3-ps']
    // 标准/定制(eg.零售发货单列表) - 且 菜单中存在(localStorage中存在)
    if (serviceIDMap.hasOwnProperty(routeKey)) {
      return reSrc
    } else {
      // 定制 且 菜单中不存在(eg.零售发货单详情、定制的新增/详情)
      reSrc = `/${serviceIdConfig[0]}${reSrc}`
      return reSrc
    }
  }

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
  /**
   * 保留小数点几两位 不足自动补0
   *  @param {Number\String}
   */
  static floatNumber(num) {
    num = typeof num === 'number' ? num.toString() : num
    if (num.includes('.')) {
      let b = num.split('.')
      if (b[1].length == 1) {
        b = b.join('.')
        b += '0'
        num = b
      } else if (b[1].length > 2) {
        b = Number(b.join('.')).toFixed(2)
        num = b
      }
    } else {
      num += '.00'
    }
    return num
  }
  /**
   * 定制按钮 -- 按钮是否需要disabled
   */
  static buttonHasDisable(textArr, ButtonArr, disabled) {
    ButtonArr.forEach((item) => {
      if (textArr.includes(item.text)) {
        item.disabled = disabled
      }
    })
  }
  /**
   * 结束时间，只选择日期未选择时间的情况下，时间默认23:59:59
   * @param {String} newEndTime 改变后的结束时间
   * @param {String} oldEndTime 改变前的结束时间
   * @returns 返回处理后的结束时间
   */
  static defaultEndTime(newEndTime, oldEndTime) {
    let time = newEndTime
    if (oldEndTime != newEndTime
      && oldEndTime?.split(' ')[0] != newEndTime.split(' ')[0]
      && / 00:00:00$/.test(newEndTime)
    ) {
      time = newEndTime.replace(/00:00:00/, '23:59:59')
    }
    return time
  }

  /* ============================================== @/assets/js/__utils__/date ============================================== */

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

  // 获取当前时间
  static getCurrentTime = () => {
    let startTime = BurgeonDate.Format(new Date(), 'yyyy-MM-dd 23:59:59');
    let endDay = BurgeonDate.addDays(new Date(), -7);
    let endTime = BurgeonDate.Format(endDay, 'yyyy-MM-dd 00:00:00');
    return [startTime, endTime];
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
    console.log(_self.$refs.agGridChild.AGTABLE.getSelect());
    const selection = _self.$refs.agGridChild.AGTABLE.getSelect(); // 获取勾行数据;
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
            setTableHeight(_self, defaultHeight);
          } else if (tableName != 'ORDERMANAGER') {
            setTableHeight(_self, defaultHeight);
          }
        };
        break;
      case 'PROMACTIQUERYLIST':// 促销活动
        option = () => {
          setTableHeight(_self, 100);
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

}


export default commonUtils
