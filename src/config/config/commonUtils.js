import service from '@/service/index'
class commonUtils {
  static gateWayPrefix = {
    basicData: '/r3-cp',
    commodityCenter: '/r3-ps',
    orderCenter: '/r3-oc-oms',
  }
  constructor() { }

  //--------------工具方法区--------------------------

  static initForm(self, param, myForm) {
    // const self = this;
    // console.log(data);
    /* const param = {
      TABLE: self.tablename,
      FOLD: fold,
    }; */
    let da, fD = [], fV = {}, fR = {};
    return service.orderCenter.initList(param).then(res => {
      const { data: { code, data } } = res;
      if (code === 0) {
        if (data.ZIP) {
          console.error("当前数据格式为'ZIP',不支持!")
          return Promise.reject(data)
        } else {
          da = data.DATA;
          return da
        }
      }
    }).then(form => {
      /**
       * 1. style
       * 2. width
       * 3. regx
       */
      const ordinary = []; // 普通控件
      const fkStylt = ['drp', 'mrp', 'FK_TABLE']; // 外键等复杂控件
      form.forEach((ele, i) => {
        let item;
        const key = ele.NAME;
        const myEle = myForm.find(it => it.colname == key);
        if (ordinary.includes(ele.DISPLAY)) {
          item = {
            colname: key, // 控件key
            style: 'input', // 控件类型
            label: ele.DESC, // 控件label名称
          }
          Object.assign(item, myEle);
          fV[key] = ele.defval || ''; // 生成formValue
          if (ele.isnotnull) { // 生成必填ruleValidate
            fR[item.colname] = [
              {
                required: true,
                message: ' ',
              },
            ]
          }
        } else {
          Object.assign(ele, myEle);
          item = {
            colname: key,
            itemdata: ele,
          }
        }
        fD.push(item); // 生成formData结构
        /* switch (ele.DISPLAY) {
          case 'TEXT':
            fD.push({
              colname: key, // 控件key
              style: 'input', // 控件类型
              label: ele.DESC, // 控件label名称
              width: '6', // 控件宽度
              disabled: false, // 是否禁用
              maxlength: ele.LENGTH, // 输入长度
              regx: /^[^']*$/,
              inputChange: () => {
                console.log(ele.DESC);
              },
            });
            fV[ele.NAME] = '';
            break;
          case 'SELECT':
            fD.push({
              colname: ele.NAME,
              style: 'select', // 下拉框类型
              label: ele.DESC,
              width: '6', // 所占宽度宽度
              value: ele.NAME, // 输入框的值
              clearable: true,
              selectChange: () => { },
              disabled: false,
              options: ele.COMBOBOX,
              multiple: true,
            });
            fV[ele.NAME] = '';
            break;
          case 'FK_TABLE':
            fD.push({
              version: '1.4',
              colname: ele.NAME, // 控件key
              style: 'popInput', // 输入框弹框单多选
              width: '6',
              itemdata: {
                colid: ele.ID, // 当前字段的ID
                colname: ele.NAME, // 当前字段的名称
                fkdisplay: 'drp', // 外键关联类型
                isfk: true, // 是否有fk键
                isnotnull: false, // 是否必填
                name: ele.DESC, // 展示的label
                readonly: false, // 是否可编辑，对应input   readonly属性
                reftable: ele.REF_TB_NAME, // 对应的表
                reftableid: ele.REF_TB_ID, // 对应的表ID
                valuedata: '', // 这个是选择的值
                pid: '',
                serviceId: ele.CENTER
              },
              oneObj: (e) => {
                console.log(e);
                fV[ele.NAME] = e.pid;
              },
            });
            fV[ele.NAME] = '';
            break;
          case 'OBJ_DATE':
            fD.push({
              style: 'date',
              type: 'daterange',
              colname: ele.NAME,
              // type: 'datetimerange', // 日期组件类型,默认为data  (daterange)为双日期区间选择
              value: ele.NAME,
              label: ele.DESC, // 平台修改时间
              width: '6',
              format: 'yyyy-MM-dd HH:mm:ss', // 格式参照burgeonui
              placeholder: '',
              onChange: (val) => {
                console.log(val);
              },
            });
            fV[ele.NAME] = '';
            break;
          case 'RANGE':
            fD.push({
              style: 'bothInput', // 双input框控件
              colname: ele.NAME,
              label: ele.DESC,
              value: ele.NAME,
              regx: /^\d/,
            });
            fV[ele.NAME] = '';
            break;
          case 'RADIOGROUP':
            fD.push({
              style: 'radio',
              colname: ele.NAME,
              value: ele.NAME,
              label: ele.DESC,
              width: '6',
              options: ele.COMBOBOX,
            });
            fV[ele.NAME] = '';
            break;
        } */
      });
      const formCon = {
        fD,
        fV,
        fR
      }
      const res = {
        res: da,
        formCon,
      }
      return Promise.resolve(res)
    })
    // return formCon
    // 配置必填**************************************************
    // self.formConfig.ruleValidate = {
    //   ORDER_TAG: [{ required: true, message: ' ', trigger: 'blur' }],
    // };
  }

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
  static serviceHandler(self, serviceUrl, params, ...callback) {
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
              $utils.msgTips(self, 'success', '取消成功', 0)
              self.selection = []
              self.query()
            }
          } else {
            // this.tipShow('error', self, res);
            $utils.tipShow(
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
                        title: $it('tL.serialNo'), // 序号
                        key: 'INDEX',
                      },
                      {
                        title: $it('fL.billNo'), // 单据编号
                        key: 'BILL_NO',
                      },
                      {
                        title: $it('fL.e0'), // 失败原因
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
  // /**
  //  *
  //  * @param {消息框类型} type :String,
  //  * @param {当前页面实例} self ,
  //  * @param {接口返回结果} res :Object,
  //  * @param {是否定制消息框title} isTitle:String
  //  * @param {消息框自定义render} renderFun :function
  //  */
  // static tipShow(type, self, res, isTitle, renderFun) {
  //   self.$Modal[type]({
  //     title: isTitle ?? $it('mT.tips'), // 提示
  //     content: renderFun ?? res.data.message,
  //     cancelType: true,
  //     titleAlign: 'left',
  //     closable: true,
  //     mask: true,
  //     draggable: true,
  //     className: 'ark-dialog',
  //     keyDown: (event) => {
  //       if ([27, 13].includes(event.keyCode)) {
  //         self.$Modal.remove()
  //       }
  //     },
  //     render: renderFun,
  //   })
  // }
  // /**
  //  * 复杂的$Modal类型的提示弹窗
  //  * @self {*} this
  //  * @tips {*} modalTitle[tips]
  //  * @okKey {*} {String} 点击确定要调用的接口，eg."common.queryList"
  //  * @data {*} {Object} 点击确定调用的接口的入参
  //  * @callback  {Object} 什么鬼？反正里面存了callbackType、callbackFun（具体处理接口返回的res的方法？）
  //  * @param  {...any} callback
  //  */
  static modalShow(self, tips, okKey, data, ...callback) {
    self.$Modal.info({
      title: $it('mT.tips'), // 提示
      content: $it(`tip.${tips}`),
      mask: true,
      showCancel: true,
      okText: $it('com.determine'), // 确定
      cancelText: $it('com.cancel'), // 取消
      onOk: () => {
        let [callbackType, callbackFun] = callback
        this.serviceHandler(self, okKey, data, callbackType, callbackFun)
      },
      onCancel: () => {
        self.$emit('closeActionDialog', false)
      },
    })
  }

  // // 数组对象根据子元素某各个key合并分组
  // static sonList(arr, key) {
  //   return arr.map((item) => item[key])
  // }

  // /**
  //  * 扩展Array方法, 去除数组中空白数据
  //  */
  // static notempty(val) {
  //   return val.filter(function (s) {
  //     return s && s.toString().trim()
  //   })
  // }

  // /**
  //  * $Message类型的提示框：
  //  * @self {object} self 指向当前this
  //  * @type {string} (eg.'warning'/'error'/'success'……)
  //  * @tips {string} 当tipsType=1或不传时，tips为语言包中modalTips对应的key；当tipsType!=1时，tips为要展示的提示信息(如接口直接返回的message)
  //  * @tipsType {number} 默认为1，等于1则使用语言包中的modalTips，不等于1则使用传过来的tips
  //  */
  // static msgTips(self, type, tips, tipsType = 1) {
  //   self.$Message[type]({
  //     content: tipsType == 1 ? $it(`tip.${tips}`) : tips, // 请选择需要新增退单记录！
  //     duration: 5,
  //     top: 80,
  //   })
  // }
  // /**
  //  *
  //  * @param {this} self
  //  * @param {弹框配置的名称} modalConfig
  //  * @param {弹框文件名称} pageName
  //  * @param {弹框标题} confirmTitle
  //  */
  // static importTable(self, modalConfig, pageName, confirmTitle) {
  //   console.log(confirmTitle)
  //   self[modalConfig].confirmTitle = confirmTitle
  //     ? $it(`${confirmTitle}`)
  //     : self[modalConfig].confirmTitle // 弹框标题
  //   self.$children.find((item) => item.name === pageName).openConfirm() // 文件名称
  // }

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
      label: $it(`${labelName}`), // 订单管理
      back: isback,
      query: Object.assign({
        id: id,
        tabTitle: $it(`${labelName}`), // 订单管理
        ...exendObj,
      }),
    })
  }

  /**
   * 9个参数
   * eg:
        $omsUtils.tabJump(0, -1, 1, 'PM_C_PROM_ACTI_BATCH_ADD', { i8n: 1, tip: 'pL.batchAddPromotion' }, {}, 0)
   */
  static tabJump(
    mutationType, // 对应mutationArr的数组下标
    id,
    type,
    tableName,
    labelName = { i8n: 1, tip: '' },
    exendObj = {},
    isback = 0,
    global,
    tableId
  ) {
    const label = labelName.i8n ? $it(`${labelName.tip}`) : labelName.tip; // 语言包有就走语言包，不存在则直接取
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
      label: $it(`${labelName}`),
      tableId: tableId,
      id: id,
      query: Object.assign({
        id: id,
        ptitle: $it(`${labelName}`),
        tabTitle: $it(`${labelName}`),
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
   * @param {Boolean} isIndependent 单对象页面必传true
   * @returns
   */
  static getPermissions(self, array, params, isIndependent) {
    const query = {
      TABLE: params.table || params.TABLE,
      TYPE: params.type || params.TYPE,
    }
    const serviceId = params.serviceId || params.SERVICEID || '';
    let data, btnArr = [];
    if (!isIndependent && self[array] == undefined) return
    if (self[array] != undefined) btnArr = self[array].buttons || [];
    const show_iconbj_setup = ['ORDERMANAGER' , 'OC_B_RETURN_ORDER']; //储存允许设置按钮展示的页面集;
    return new Promise(async (resolve) => {
      const res = await self.service.common.fetchActionsInCustomizePage(query, { serviceId });
      let result = res.data.data.ZIP || res.data.data.DATA || [] //未压缩情况下数据获取
      data = JSON.parse(JSON.stringify(result))
      if (res.data.code === 0) {
        const a = [], c = [];
        if (!btnArr.length) {
          resolve(data);
          return
        }
        self[array].buttons.forEach((item) => {
          // 设置、收藏等图标按钮的配置
          if (!item.text && item.icon ) {
            if(item.icon !== 'iconfont iconbj_setup'){
              a.push(item);
            }else if(show_iconbj_setup.includes(self.$route.params.customizedModuleName)){
              a.push(item)
            }
          }
        })
        if (isIndependent) {
          result = result.ACTIONS;
        }
        result.forEach((element) => {
          // 有下拉项的处理
          if (element.child) {
            this.buttonChild(element, self[array].buttons, c)
          }
          // 普通btn（无child）的处理
          self[array].buttons.forEach((btn) => {
            if (!btn.webname) {
              console.log('btnConfig no webname !', btn);
              return
            }
            if (btn.webname == element.webname) {
              btn.webid = element.webid
              btn.text = element.webdesc
              c.push(btn)
            }
          })
        })
        self[array].buttons.forEach((btn) => {
          if (btn.webname == 'fix_back') {
            btn.text = $it("btn.back");
            if (!c.some(it => it.webname == 'fix_back')) {
              c.push(btn)
            }
          }
        })
        if (btnArr.length) {
          self[array].buttons = [...c, ...a]
          self[array].loading = false;
        }
        resolve(data);
      }
    }).finally(e => {
      console.log('butConfig::', self[array]);
    });
    /*  self.service.common.fetchActionsInCustomizePage(query).then((res) => {
       let result = res.data.data.ZIP || res.data.data.DATA || [] //未压缩情况下数据获取
       independent = result
       if (isIndependent) {
 
         self[array] = JSON.parse(JSON.stringify(result));
         return independent
       } else {
         const a = []
         self[array].buttons.forEach((item) => {
           // 设置、收藏等图标按钮的配置
           if (!item.text && item.icon) {
             a.push(item);
             // if(show_iconbj_setup.includes(self.$route.params.customizedModuleName)){ //暂时不过滤任何图标按钮
             //   a.push(item)
             // }else if(item.icon !== 'iconfont iconbj_setup'){
             //   a.push(item);
             // }
 
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
         self[array].buttons = [...c, ...a]
       }
       self[array].loading = false
     }).catch(e => {
       if (self[array] != undefined) self[array].loading = false;
     }) */
  }

  /**
   * 版本2:按钮权限请求方法getBtnPermission：
   * @self {object} 指向当前实例
   * @cBtn {Array} 当前按钮配置的name，buttons数组的上一级。eg: 'btnConfig'
   * @param {string} 用于请求接口的传参，目前是String类型。待扩展成对象类型，便于支持同名不同按钮配置的页面，如新增和详情同一页面时
   * @param {Boolean} isIndependent 默认为单对象
   * @returns
   */
  static getBtnPermission(self, cBtn, params, isIndependent=true) {
    const query = {
      TABLE: params.table || params.TABLE,
      TYPE: params.type || params.TYPE,
    }
    const serviceId = params.serviceId || params.SERVICEID || '';
    let data, btnArr = [];
    if (!isIndependent && self[array] == undefined) return
    return new Promise(async (resolve) => {
      const res = await self.service.common.fetchActionsInCustomizePage(query, { serviceId });
      let result = res.data.data.ZIP || res.data.data.DATA || [] //未压缩情况下数据获取
      if (isIndependent) {
        result = result.ACTIONS;
      }
      data = JSON.parse(JSON.stringify(result))
      if (res.data.code === 0) {
        cBtn.forEach(item=>{
          let key = item.split('.');
          let btnArr = self
          for (const i of key) {
            btnArr = btnArr[i]
          };
          const a = [], c = [];
        result.forEach((element) => {
          // 有下拉项的处理
          if (element.child) {
            this.buttonChild(element, btnArr.buttons, c)
          }
          // 普通btn（无child）的处理
          btnArr.buttons.forEach((btn) => {
            if (!btn.webname) {
              console.log('btnConfig no webname !', btn);
              return
            }
            if (btn.webname == element.webname) {
              btn.webid = element.webid
              btn.text = element.webdesc
              c.push(btn)
            }
            // if (btn.webname == 'fix_back') {
            //   btn.text = $it("btn.back");
            //   if (!c.some(it => it.webname == 'fix_back')) {
            //     c.push(btn)
            //   }
            // }
          })
        })
        if (btnArr.buttons.length) {
          btnArr.buttons = [...c, ...a]
          btnArr.loading = false;
        }

        })
        resolve(data);
      }
    }).finally(e => {
      // console.log('butConfig::', self[array]);
    });
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
    fromdata.append('omsT', +new Date())
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

  // /**
  //  * 获取两个数组对象的差集
  //  * @param allArr：全数组
  //  * @param partArr：缺省数组
  //  * @key {ECODE} 根据key来做求差集
  //  */
  // static getDifferentArr(allArr = [], partArr = [], key) {
  //   const differentArr = [...allArr].filter((x) =>
  //     [...partArr].every((y) => y[key] !== x[key])
  //   )
  //   return differentArr
  // }

  // /**
  //  * 获取两个数组对象的交集
  //  * @param Arr1 数组1
  //  * @param Arr2 数组2
  //  * @key {ID} 根据key来做求交集
  //  */
  // static getUnionArr(Arr1 = [], Arr2 = [], key) {
  //   const unionArr = [...Arr1].filter((x) =>
  //     [...Arr2].some((y) => y[key] === x[key])
  //   )
  //   return unionArr
  // }

  // /**
  //  * 用当前时间生成唯一Key
  //  * @returns key
  //  */
  // static generateKey() {
  //   const now = new Date()
  //   const year = now.getFullYear()
  //   let month = now.getMonth() + 1
  //   let day = now.getDate()
  //   let hour = now.getHours()
  //   let minutes = now.getMinutes()
  //   let seconds = now.getSeconds()
  //   String(month).length < 2 ? (month = Number('0' + month)) : month
  //   String(day).length < 2 ? (day = Number('0' + day)) : day
  //   String(hour).length < 2 ? (hour = Number('0' + hour)) : hour
  //   String(minutes).length < 2 ? (minutes = Number('0' + minutes)) : minutes
  //   String(seconds).length < 2 ? (seconds = Number('0' + seconds)) : seconds
  //   const yyyyMMddHHmmss = `${year}${month}${day}${hour}${minutes}${seconds}`
  //   return yyyyMMddHHmmss
  // }

  /**
   * @method 请求p/cs/getObject接口，初始化‘基础信息’Part的表单值
   * @table 主表表名
   * @id 明细ID
   */
  static async getObject(table, id) {
    const fromdata = new FormData()
    fromdata.append('table', table)
    fromdata.append('objid', id)
    fromdata.append('omsT', +new Date())
    const {
      data: { code, data, message },
    } = await service.common.getObject(fromdata)
    if (code != 0) {
      console.error('p/cs/getObject no data!')
      return false
    } else {
      // return data
      return new Promise(resolve => {
        resolve(data)
      })
    }
  }

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
    formdata.append('omsT', +new Date())
    const res = await service.common.objectTableItem(formdata)
    if (res.data.code === 0) {
      let rowData = [];
      let columns = [];
      res.data.data.row.map((row) => {
        const obj = {}
        for (const i in row) {
          obj[i] = row[i].val
        }
        rowData.push(obj)
      })
      res.data.data.tabth.map((it) => {
        let column = {}
        for (const i in it) {
          column[i] = it[i];
          column.key = it.colname;
          column.title = it.name;
        }
        columns.push(column)
      })
      const data = {
        otherData: res.data.data,
        rowData,
        columns,
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
    const serviceIdConfig = ['r3-cp']
    // 标准/定制(eg.零售发货单列表) - 且 菜单中存在(localStorage中存在)
    if (serviceIDMap.hasOwnProperty(routeKey)) {
      return reSrc
    } else {
      // 定制 且 菜单中不存在(eg.零售发货单详情、定制的新增/详情)
      reSrc = `/${serviceIdConfig[0]}${reSrc}`
      return reSrc
    }
  }

  // /**
  //  * 含有部分相同属性的两个对象快速赋值法
  //  * 对于相同的key, 用源对象覆盖目标对象
  //  * @param {Object} target 目标对象
  //  * @param {Object} origin 源对象
  //  */
  // static intersectFormValue(target, origin) {
  //   Object.keys(target).forEach((key) => {
  //     if (origin[key]) {
  //       if (typeof origin[key] == 'object') {
  //         target[key] = JSON.parse(JSON.stringify(origin[key]))
  //       } else {
  //         target[key] = origin[key]
  //       }
  //     }
  //   })
  // }
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
  // /**
  //  * 结束时间，只选择日期未选择时间的情况下，时间默认23:59:59
  //  * @param {Date|String} newEndTime 改变后的结束时间
  //  * @param {Date|String} oldEndTime 改变前的结束时间
  //  * @returns 返回处理后的结束时间
  //  */
  // static defaultEndTime(newEndTime, oldEndTime) {
  //   let isNewDate = Object.prototype.toString.call(newEndTime) == '[object Date]'
  //   let isOldDate = Object.prototype.toString.call(oldEndTime) == '[object Date]'
  //   let [newDate, newTime] = (isNewDate
  //     ? $utils.getFormatDate(newEndTime, 'yyyy-MM-dd HH:mm:ss') : newEndTime).split(' ')
  //   let [oldDate, oldTime] = (oldEndTime && isOldDate
  //     ? $utils.getFormatDate(oldEndTime, 'yyyy-MM-dd HH:mm:ss') : oldEndTime || '').split(' ')

  //   let time = `${newDate} ${newTime}`
  //   if (time != `${oldDate} ${oldTime}`
  //     && newDate != oldDate
  //     && '00:00:00' == newTime
  //   ) {
  //     time = `${newDate} 23:59:59`
  //   }
  //   return time
  // }

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

  // /**
  //  * 日期 format
  //  * @method 日期转换
  //  * @param {Date} newDate {Object Date}
  //  * @param {String} format {String} 示例: yyyy-MM-dd hh:mm:ss
  //  */
  // static dateFormat = (newDate, format) => {
  //   const e = {
  //     'M+': newDate.getMonth() + 1,
  //     'd+': newDate.getDate(),
  //     'h+': newDate.getHours(),
  //     'm+': newDate.getMinutes(),
  //     's+': newDate.getSeconds()
  //   };
  //   if (/(y+)/.test(format)) {
  //     format = format.replace(RegExp.$1, (`${newDate.getFullYear()}`).substr(4 - RegExp.$1.length));
  //   }
  //   for (const k in e) {
  //     if (new RegExp(`(${k})`).test(format)) {
  //       format = format.replace(RegExp.$1, (RegExp.$1.length == 1) ? (e[k]) : ((`00${e[k]}`).substr((`${e[k]}`).length)));
  //     }
  //   }
  //   return format;
  // };

  // // 获取当前时间
  // static getCurrentTime = () => {
  //   let startTime = $utils.Format(new Date(), 'yyyy-MM-dd 23:59:59');
  //   let endDay = $utils.addDays(new Date(), -7);
  //   let endTime = $utils.Format(endDay, 'yyyy-MM-dd 00:00:00');
  //   return [startTime, endTime];
  // }

  // // 数组标准时间转换成yyyy-mm-dd格式
  // static getTimesValue = time => {
  //   let timeValue = '';
  //   const dateone = new Date(time[0]).toJSON();
  //   const datetwo = new Date(time[1]).toJSON();
  //   const dateTimeOne = new Date(+new Date(dateone) + 8 * 3600 * 1000)
  //     .toISOString()
  //     .replace(/T/g, ' ')
  //     .replace(/\.[\d]{3}Z/, '');
  //   const dateTimeTwo = new Date(+new Date(datetwo) + 8 * 3600 * 1000)
  //     .toISOString()
  //     .replace(/T/g, ' ')
  //     .replace(/\.[\d]{3}Z/, '');
  //   timeValue = `${dateTimeOne}~${dateTimeTwo}`;

  //   if (timeValue === '1970-01-01 08:00:00~1970-01-01 08:00:00') {
  //     timeValue = '';
  //   }
  //   return timeValue;
  // }

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
      _self.$Message.warning($it('tip.zm'))
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

  /* ============================================== @/assets/js/public/publicMethods.js ============================================== */


  // // 标准时间转时间格式
  // static FromDates(time) {
  //   const date = new Date(time);
  //   const Y = `${date.getFullYear()}-`;
  //   const M = `${date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1}-`;
  //   const D = `${date.getDate()} `;
  //   // const h = `${date.getHours()}:`;
  //   // const m = `${date.getMinutes()}:`;
  //   // const s = date.getSeconds();
  //   return Y + M + D;
  // }

  // // 字符串转时间格式
  // static DatesTime(time) {
  //   const date = new Date(time);
  //   const Y = `${date.getFullYear()}-`;
  //   const M = `${date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1}-`;
  //   const D = `${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()} `;
  //   const h = `${date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()}:`;
  //   const m = `${date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()}:`;
  //   const s = (date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds());
  //   return Y + M + D + h + m + s;
  // }

  // // 加法函数
  // static accAdd(arg1, arg2) {
  //   let r1; let r2; let m; let
  //     c;
  //   try {
  //     r1 = arg1.toString().split('.')[1].length;
  //   } catch (e) {
  //     r1 = 0;
  //   }
  //   try {
  //     r2 = arg2.toString().split('.')[1].length;
  //   } catch (e) {
  //     r2 = 0;
  //   }
  //   c = Math.abs(r1 - r2);
  //   m = Math.pow(10, Math.max(r1, r2));
  //   if (c > 0) {
  //     const cm = 10 ** c;
  //     if (r1 > r2) {
  //       arg1 = Number(arg1.toString().replace('.', ''));
  //       arg2 = Number(arg2.toString().replace('.', '')) * cm;
  //     } else {
  //       arg1 = Number(arg1.toString().replace('.', '')) * cm;
  //       arg2 = Number(arg2.toString().replace('.', ''));
  //     }
  //   } else {
  //     arg1 = Number(arg1.toString().replace('.', ''));
  //     arg2 = Number(arg2.toString().replace('.', ''));
  //   }
  //   return (arg1 + arg2) / m;
  // }

  // // 減法函數
  // static accSub(arg1, arg2) {
  //   let r1; let r2;
  //   try {
  //     r1 = arg1.toString().split('.')[1].length;
  //   } catch (e) {
  //     r1 = 0;
  //   }
  //   try {
  //     r2 = arg2.toString().split('.')[1].length;
  //   } catch (e) {
  //     r2 = 0;
  //   }
  //   const m = 10 ** Math.max(r1, r2); // last modify by deeka //动态控制精度长度
  //   // const n = (r1 >= r2) ? r1 : r2;
  //   return ((arg1 * m - arg2 * m) / m).toFixed(2);
  // }

  // // 乘法
  // static accMul(arg1, arg2) {
  //   let m = 0; const s1 = arg1.toString();
  //   const s2 = arg2.toString();
  //   try {
  //     m += s1.split('.')[1].length;
  //   } catch (e) {
  //     console.log(e);
  //   }
  //   try {
  //     m += s2.split('.')[1].length;
  //   } catch (e) {
  //     console.log(e);
  //   }
  //   return Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / (10 ** m);
  // }

  // // 除法
  // static accDiv(arg1, arg2) {
  //   let t1 = 0; let t2 = 0;
  //   arg1 = arg1 || 0;
  //   arg2 = arg2 || 0;
  //   try {
  //     t1 = arg1.toString().split('.')[1].length;
  //   } catch (e) {
  //     console.log(e);
  //   }
  //   try {
  //     t2 = arg2.toString().split('.')[1].length;
  //   } catch (e) {
  //     console.log(e);
  //   }
  //   const r1 = Number(arg1.toString().replace('.', ''));
  //   const r2 = Number(arg2.toString().replace('.', ''));
  //   // return (r1 / r2) * Math.pow(10, t2 - t1);
  //   return (r1 / r2) * (10 ** (t2 - t1));
  // }

  // /**
  //  * 获取n天后的日期
  //  */
  // static getDate(index) {
  //   const date = new Date(); // 当前日期
  //   const newDate = new Date();
  //   newDate.setDate(date.getDate() + index);
  //   const time = `${newDate.getFullYear()}-${newDate.getMonth() + 1}-${newDate.getDate()}`;
  //   return time;
  // }

  // /**
  //  * 获取n天前的日期
  //  */
  // static getDateOld(index) {
  //   const date = new Date(); // 当前日期
  //   const newDate = new Date();
  //   newDate.setDate(date.getDate() - index);
  //   const mon = newDate.getMonth() + 1;
  //   const day = newDate.getDate();
  //   const time = `${newDate.getFullYear()}-${mon < 10 ? `0${mon}` : mon}-${day < 10 ? `0${day}` : day}`;
  //   return time;
  // }

  // /**
  //  * 获取两个字符串日期相差天数
  //  */
  // static dateDiff(startDate, endDate) {
  //   let aDate;
  //   aDate = startDate.split('-');
  //   const oDate1 = new Date(`${aDate[1]}-${aDate[2]}-${aDate[0]}`);
  //   aDate = endDate.split('-');
  //   const oDate2 = new Date(`${aDate[1]}-${aDate[2]}-${aDate[0]}`);
  //   const iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24);
  //   return iDays;
  // }

  // /**
  //  * 数组去重 ps:工作台专用
  //  */
  // static workArrHeavy(arr1, arr2) {
  //   if (arr1 && arr2) {
  //     for (let i = 0; i < arr1.length; i++) {
  //       for (let j = 0; j < arr2.length; j++) {
  //         if (arr1[i].key === arr2[j].key) {
  //           arr1[i].value = arr2[j].value;
  //           break;
  //         }
  //       }
  //     }
  //     return arr1;
  //   }
  //   return [];
  // }

  // /**
  //  * 四舍五入改进
  //  * num表示需要四舍五入的小数
  //  * s表示需要保留几位小数
  //  */
  // static toFixed(num, s) {
  //   const times = 10 ** s;
  //   let des = num * times + 0.5;
  //   des = parseInt(des, 10) / times;
  //   return `${des}`;
  // }

  /**
   * 导出
   * src 导出路径
   */
  // static downloadUrlFile(url) {
  //   const self = this;
  //   const domFrame = window.parent.document.getElementById('downLoadListFrame');
  //   if (domFrame != null) {
  //     window.parent.document.body.removeChild(domFrame);
  //   }
  //   const downloadFile = {};
  //   if (typeof downloadFile.iframe === 'undefined') {
  //     const iframe = document.createElement('iframe');
  //     iframe.setAttribute('id', 'downLoadListFrame');
  //     self.addEvent('load', iframe, () => {
  //       self.iframeLoad(iframe);
  //     });
  //     iframe.src = url;
  //     iframe.style.display = 'none';
  //     downloadFile.iframe = iframe;
  //     document.body.appendChild(downloadFile.iframe);
  //     setTimeout(() => {
  //       iframe.src = '';
  //     }, 1000);
  //   }

  //   // const eleLink = document.createElement('a');
  //   // eleLink.setAttribute('href', src);
  //   // eleLink.style.display = 'none';
  //   // document.body.appendChild(eleLink);
  //   // eleLink.click();
  //   // document.body.removeChild(eleLink);

  //   // const download_file = {};
  //   // if (typeof (download_file.iframe) === 'undefined') {
  //   //   const iframe = document.createElement('iframe');
  //   //   download_file.iframe = iframe;
  //   //   document.body.appendChild(download_file.iframe);
  //   // }
  //   // download_file.iframe.src = src;
  //   // download_file.iframe.style.display = 'none';
  // }

  // // 判断iframe的src
  // static iframeLoad(iframe) {
  //   const src = iframe.src ? iframe.src : iframe.contentWindow.locatiion.href;
  //   console.log('src::', src);
  // }

  // // 调用方法时绑定iframe的load事件
  // static addEvent(eventName, element, fn) {
  //   if (element.attachEvent) element.attachEvent(`on${eventName}`, fn);
  //   else element.addEventListener(eventName, fn, false);
  // }

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

  /**
   * 公共接口获取表头
   * @param {*} length 
   */
  static getCommonColumn(self,tableName){
    return new Promise(async (resolve)=>{
      let data = await self.service.orderCenter.initObject({"TABLE":tableName});
      let obj = {}
      if (data.data.code !== -1) {
        let handleTh = data.data.data.DATA.map(element => ({title:`${element.headerName}`,key:`${element.field}`,dataAcessKey:`${element.field}`}));
        obj = {
          'sourceData':data.data,
          'handleTh':handleTh
        }
      }
      resolve(obj)
    })
  }
  /**
   * 公共接口获取数据
   * @param {*
   *  ID // 明细id
   *  TABLE // 主表名
   *  SUB_TABLE // 明细表名
   *  PT_SKU // true平台 false商品
   *  REFRESH //是否加密
   *  index  //当前页
   * } 
   */
   static getTableData(self,params){
    return new Promise(async (resolve)=>{
      const data = await self.service.orderCenter.queryObject(params);
      let obj = {}
      if (data.data.code !== -1) {
        obj = {
          'sourceData':data.data,
          'SUB_ITEM':data.data.data.DATA.SUB_ITEM
        }
      }
      resolve(obj)
    })
  }
  /**
   * ark table 添加合计行
   */
  static totalColumn(totalKey,resData){
      // 生成map对象
      let mapObj = new Map();
      totalKey.forEach(e => { mapObj.set(e,0) });
      // 编辑查询
      resData.forEach(e => {
        totalKey.forEach(v => {
          if(e[v] !== undefined) mapObj.set(v,this.floatNumber($utils.accAdd(Number(mapObj.get(v)), Number(e[v]))))
        });
      });
      return Object.fromEntries([...mapObj])
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
}


export default commonUtils

// 给Number类型增加一个mul方法，调用起来更加方便。
Number.prototype.mul = function (arg) {
  return commonUtils.accMul(arg, this);
};
// 给Number类型增加一个div方法，调用起来更加方便。
Number.prototype.div = function (arg) {
  return commonUtils.accDiv(this, arg);
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