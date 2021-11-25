// 检查必填项是否已经填写
export const setFormDataFunMixin = {
  data() {
    return {
      statusObj: {
        2: '已提交',
        3: '已作废',
        4: '已结案',
      },
      isActive: true, //  是否可用
      status: null, //  1： 未提交,2：已提交,3：已作废,4:已结案
    }
  },
  mounted() {

  },
  methods: {
    /**
     * 动态配置表单属性值
     * @param item
     * @param formName
     * @param width
     * @returns {{date: {width: string, format: string, style: string, disabled: *, label: *, placeholder: string, type: string, value: *}, input: {regx: (RegExp|string), setRequired: string, ghost: boolean, width: string, icon: string, style: string, disabled: *, label: *, placeholder: string, id: string, value: *, inputChange: input.inputChange}, popInput: {colname: *, oneObj: popInput.oneObj, width: string, style: string, itemdata: {col: number, reftable: *, display: *, length: *, reftableid: *, pid: string, type: *, statsize: *, datelimit: *, colname: *, readonly: *, isuppercase: *, isnotnull: *, fkdesc: *, name: *, valuedata: (*|string), fkdisplay: *, row: *, colid: *, inputname: *, isfk: *}}}}
     */
    formConfig(item, formName, width = 6) {
      if (item) {
        return {
          popInput: {
            colname: item.colname,
            style: 'popInput', // 输入框弹框单多选
            width: width,
            itemdata: {
              autoRequest: item.autoRequest || {},
              tableRequest: item.tableRequest || {},
              col: 1,
              colid: item.colid, // 当前字段的ID
              colname: item.colname, // 当前字段的名称
              datelimit: item.datelimit,
              display: item.display, // 显示什么类型，例如xml表示弹窗多选加导入功能，mrp表示下拉多选
              fkdisplay: item.fkdisplay, // 外键关联类型
              fkdesc: item.fkdesc,
              inputname: item.inputname, // 这个是做中文类型的模糊查询字段，例如ENAME
              isfk: item.isfk, // 是否有fk键
              isnotnull: item.isnotnull, // 是否必填
              isuppercase: item.isuppercase, // 是否转大写
              length: item.length, // 最大长度是多少
              name: item.name,
              readonly: item.readonly, // 是否可编辑，对应input   readonly属性
              reftable: item.reftable, // 对应的表
              reftableid: item.reftableid, // 对应的表ID
              row: item.row,
              statsize: item.statsize,
              type: 'STRING',//item.type, // 这个是后台用的
              valuedata: item.valuedata || '', // 这个是选择的值
              pid: item.pid || (item.valuedata ? item.refobjid : ''),
            },
            oneObj: e => {
              this[formName].formValue[item.colname] = e.pid;
              this[formName].formValueName[`${item.colname}`] = e.valuedata;
              this.isChange = true;
            },
            InputEnter: (val) => {
              if (typeof item.onEnter == 'function') {
                item.onEnter({
                  valuedata: val.valuedata || '',
                  pid: val.pid || (val.valuedata ? val.refobjid : ''),
                })
              }
            }, // 表单回车事件
          },
          date: {
            style: 'date',
            type: item.dateType || 'datetime', // 日期组件类型,默认为data  (daterange)为双日期区间选择
            value: item.colname,
            label: item.name,
            width: width,
            disabled: item.readonly,
            format: 'yyyy-MM-dd HH:mm:ss', // 格式参照burgeonui
            placeholder: item.placeholder || `请选择${item.name}`, // 占位文本，默认为请输入
          },
          input: {
            style: 'input', // 输入框类型
            regx: item.regx ? item.regx : (item.type === 'NUMBER' ? /^[0-9]*$/ : ''),// 校验规则
            label: item.name,
            value: item.colname, // 输入框的值
            width: width, // 所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
            icon: '', // 输入框后带的图标,暂只有输入框支持
            placeholder: item.placeholder || `请输入${item.name}`, // 占位文本，默认为请输入
            ghost: false, // 是否关闭幽灵按钮，默认开启
            id: `${formName}${item.colname}`,
            disabled: item.readonly, // 禁用控制
            inputChange: () => {
              this.isChange = true;
            },
            inputenter: (val) => {
              if (typeof item.onEnter == 'function') {
                item.onEnter(val !== undefined ? val : this[formName].formValue[item.colname])
              }
            }, // 回车事件
            setRequired: "required" //必选标识,值不为required时无标识
          },
          select: {
            style: 'select',
            label: item.name,
            value: item.colname,
            width: width,
            disabled: item.readonly,
            colname: item.colname,
            placeholder: item.placeholder || `请选择${item.name}`, // 占位文本，默认为请输入
            multiple: false, // 布尔值,下拉框是否开启多选,默认为不开启
            clearable: true, // 下拉选中是否显示清空按钮,默认为false
            filterable: true,
            selectChange: (e) => {
              this.isChange = true;
            }, // 选中事件，默认返回选中的值,默认返回当前值value
            clearSelect: () => {
              console.log('清空事件')
            }, // 点击清空按钮回调
            selectEnter: (val) => {
              if (typeof item.onEnter == 'function') {
                item.onEnter(val)
              }
            }, // 回车事件
            options: item.combobox || []
          },
          check: {
            style: 'checkbox', // 勾选框类型
            label: item.name,
            width: width, // 所占的宽度
            value: item.colname,
            disabled: item.colname === 'ISACTIVE' || item.readonly, // 禁用控制 (TODO 日志那块可用暂时让他不能编辑)
            // checked: item.valuedata === 'Y', // 是否勾选控制
            checkboxChange: e => {
              this.isChange = true;
            }
          },
        }
      }
    },
    /**
     * 表单赋值
     * @param formConfigName
     * @param formList
     * @param width
     * @param upDataIsnotnull 更新是否必填
     */
    formCommonFun(formConfigName, formList, width = 6, upDataIsnotnull) {
      this[formConfigName] = {
        formData: [],
        formValue: upDataIsnotnull ? this[formConfigName].formValue : {},
        formValueName: {},
        ruleValidate: {},
      }

      this.$nextTick(() => {
        if (formList && formList.length) {
          formList.forEach((item) => {
            if (item.colname === 'STATUS') {
              this.status = item.valuedata // 状态：  1： 未提交,2：已提交,3：已作废,4:已结案
            }
            if (item.colname === 'ISACTIVE') {
              this.isActive = item.valuedata ? item.valuedata !== 'N' : true
            }
            this[formConfigName].formValue[item.colname] = item.defval || item.valuedata || ''
            this[formConfigName].ruleValidate[item.colname] = [{required: item.isnotnull, message: `请输入${item.name}`}]
            let type = 'input'
            if (item.isfk) {
              this[formConfigName].formValue[item.colname] = item.pid || item.defval || item.refobjid || ''
              this[formConfigName].formValueName[`${item.colname}`] = item.valuedata || '' // 默认为空
              type = 'popInput'
            } else if (item.display && item.display.indexOf('DATE') !== -1) {
              type = 'date'
            } else if (item.display === 'select') {
              const arr = []
              const combobox = JSON.parse(JSON.stringify(item.combobox))
              combobox.forEach((item2) => {
                arr.push({
                  label: item2.limitdesc || item2.label,
                  value: item2.limitval || item2.value,
                })
              })
              item.combobox = arr
              type = 'select'
            } else if (item.display === 'check') {
              type = 'check'
              this[formConfigName].formValue[item.colname] = item.valuedata === 'Y'
            } else if (item.display === 'text') {
              type = 'input'
              if (item.name.indexOf('%') !== -1) {
                // item.regx = /^(?:[1-9]?\d|100)$/ // 校验规则 (只能输入-100的数字，不能输入小数)
              }
            }
            this[formConfigName].formData.push(this.formConfig(item, formConfigName, width)[type])
          })
        }
      });
    },
  }
};
