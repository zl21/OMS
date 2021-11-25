// 检查必填项是否已经填写
export const setActionFormMixin = {
  data() {
    return {}
  },
  mounted() {

  },
  methods: {
    /**
     * 动态配置表单属性值
     * @param item
     * @param formName
     * @param width
     * @returns {{propSelect: {displayType: string, changeFun: propSelect.changeFun, refcolid: *, labelName: *, colid: *, columnName: *}}}
     */
    setFormConfigFun(item, formName, width = 6) {
      if (item) {
        return {
          propSelect: {
            displayType: 'propSelect',
            columnName: item.colname,
            labelName: item.coldesc,
            colid: item.colid,
            refcolid: item.colid,
            changeFun: (v) => {
              if (typeof item.changeFun == 'function') {
                item.changeFun(v)
              }
            }
          },
          selectCustom: {
            displayType: 'selectCustom', // 输入框类型
            multiple: item.multiple === undefined || item.multiple, // 是否多选
            clearable: true, //  清空按钮
            columnName: item.colname,
            labelName: item.coldesc,
            optionArr: item.combobox, //下拉框列表
            placeholder: item.placeholder || `请选择${item.coldesc}`, // 占位文本，默认为请输入
            changeFun: (v) => {
              if (typeof item.changeFun == 'function') {
                item.changeFun(v)
              }
            }
          },
          selectTag: {
            displayType: 'selectTag', // 标签选择器
            multiple: true, // 是否多选
            clearable: true, //  清空按钮
            columnName: item.colname,
            labelName: item.coldesc,
            optionArr: item.combobox, //下拉框列表
            colorObj: item.colorObj, // 映射对应颜色的对象
            placeholder: item.placeholder || `请选择${item.coldesc}`, // 占位文本，默认为请输入
            changeFun: (v) => {
              if (typeof item.changeFun == 'function') {
                item.changeFun(v)
              }
            }
          },
          inputCustom: {
            displayType: 'inputCustom', // 输入框
            clearable: true, //  清空按钮
            regx: item.regx ? item.regx : (item.type === 'NUMBER' ? /^[0-9]*$/ : ''),// 校验规则
            columnName: item.colname,
            labelName: item.coldesc,
            placeholder: item.placeholder || `请输入${item.coldesc}`, // 占位文本，默认为请输入
            changeFun: (v) => {
              if (typeof item.changeFun == 'function') {
                item.changeFun(v)
              }
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
    actionFormCommonFun(formConfigName, formList, width = 6, upDataIsnotnull) {
      this[formConfigName] = {
        formData: [],
        formValue: {},
      }
      const valType = {
        STRING: '',
        OBJ_SELECT: [],
        OBJ_FK: []
      }
      this.$nextTick(() => {
        if (formList && formList.length) {
          formList.forEach((item, index) => {
            let type = 'inputCustom'
            if (item.display === 'OBJ_FK') {
              type = 'propSelect'
            }
            if (item.display === 'OBJ_SELECT') {
              if (item.coldesc === '商品标签' || item.colname === 'BRAND_LABEL') { // tag 下拉框
                const colorArr = item.colorArr || [
                  '#670FDF',
                  '#A10000',
                  '#13B3B4',
                  '#177D4C',
                  '#FF9300',
                  '#0657E8'] // 颜色数组
                const colorObj = {} // 如果对颜色没有对应要求，就取colorArr的颜色
                const arr = []
                const combobox = JSON.parse(JSON.stringify(item.combobox))
                combobox.forEach((item2, index2) => {
                  colorObj[item2.limitval] = colorArr[index2]
                  arr.push({
                    label: item2.limitdesc,
                    value: item2.limitval,
                  })
                })
                if (!item.colorObj) {
                  item.colorObj = colorObj
                }
                item.combobox = arr
                type = 'selectTag'
              } else {
                const arr = []
                const combobox = JSON.parse(JSON.stringify(item.combobox))
                combobox.forEach((item2) => {
                  arr.push({
                    label: item2.limitdesc,
                    value: item2.limitval,
                  })
                })
                item.combobox = arr
                type = 'selectCustom'
              }
            }
            const defaultValFun = () => {
              let val = item.display ? valType[item.display] : ''
              if (item.default !== undefined) {
                val = Array.isArray(valType[item.display]) ? [item.default] : item.default
              }
              return val
            }
            this.$set(this[formConfigName].formValue, item.colname, defaultValFun())
            // this.$set(this[formConfigName].formValue, item.colname, item.default !== undefined ? Array.isArray(valType[item.display]) ? [item.default] : item.default : (item.display ? valType[item.display] : ''))
            this.$set(this[formConfigName].formData, index, this.setFormConfigFun(item, formConfigName, width)[type])
          })
        }
      });
    },
  }
};
