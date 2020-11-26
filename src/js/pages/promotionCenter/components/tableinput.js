import axios from 'axios';
// import SelectDialog from '../../components/dialog/selectDialog.vue'
import SelectDialog from 'framework/components/dialog/popDialog.vue';
import fkdialog from 'framework/components/tablelist/fkdialog.vue';
import advancedSearch from 'framework/components/views/custompage/crm/advancedSearch.vue';
import FkTable from 'framework/components/tablelist/fktable.vue';
import ChineseDictionary from '@/assets/js/ChineseDictionary.js';
import ImportDialog from '@/js/pages/promotionCenter/components/importDialog';
// import mAutocomplete from './autocomplete.vue'
/* import Vue from 'vue' */

/* Vue.component('my-item-zh', {
    functional: true,
    render: function (h, ctx) {
      var item = ctx.props.item;
      let arr = []
      for (var i in item) {
        if (i != 'id' && i != 'value') {
          arr.push(h('span', {attrs: {class: 'length' + (Object.keys(item).length - 2), title: item[i]}}, [item[i]]))
        }
      }
      return h('li', ctx.data, arr);
    },
    props: {
      item: {type: Object, required: true}
    }
  }); */

export default {
  // '单对象属性表格中的文本输入框',
  props: {
    defaultSelectedIds: {
      type: [String, Number]
    },
    type: {
      type: String
    },
    storageItem: {
      type: Object
    },
    itemdata: {
      // 后台返回的数据，针对一个字段的
      type: Object
    },
    isActive: {
      // 判断是否可编辑状态
      type: Boolean
    },
    isdisabled: {
      // 判断是否可编辑状态
      type: Boolean
    },
    objList: {
      // 返回所有的数据，全部数据
      type: Array
    },
    refaddcol: null,
    hasLabel: {
      // 是否有label
      type: Boolean,
      default: true
    },
    isObject: {
      // 判断是否来自定制(弹框多选点击确定是否发送请求)
      type: Boolean,
      default: false
    },
    layer: {
      type: Boolean,
      default: false
    }, // 用于弹框多选蒙层全部放在body上
    row: {
      type: Object
    } // 表格行
  },
  data() {
    return {
      getSetTime: false, // 保存定时器的
      /* autocompleteIputData: '', */
      showData: '',

      SingleSelect: {
        show: false
      },
      SelectionData: {
        config: [],
        thead: [],
        row: [],
        item: '',
        tableAllDatas: {}
      },
      selectOperation: {
        page: {
          totalRowCount: 0
        },
        curpage: 1,
        startindex: 0,
        pageSize: 10,
        pageSizeList: [10, 20, 50, 100, 200]
      },
      queryList: [],
      // 单选弹出框数据操作
      selectCurrentPage: 2,
      popoverShow: {},
      isHandleSelect: false,
      autocomplete: false,
      queryParams: {}, // 级联字段查询条件
      drpPopoverShow: false,

      fkDialog: {
        // 弹框多选
        dialog: false,
        lists: [],
        tablename: this.itemdata.reftable,
        tableid: this.itemdata.reftableid
      },
      importData: {
        // 导出提示
        importDialog: false,
        importDialogTitle: ''
      },
      modelList: [], // 模版列表
      ChineseDictionary,
      selectConfigChanged: {},

      mopDefaultValue: '',

      // 消息提示
      errorDialog: false, // 消息弹框
      errorDialogClass: 'success', // 弹框类型
      errorDialogTitle: ChineseDictionary.PROMPT, // 弹框标题
      errorData: [], // 弹框内容
      errorDialogBack: false, // 是否有返回按钮

      // 外健字段联动
      dynamicforcomputeObj: {}
    };
  },
  created() {
    const self = this;

    if (!self.itemdata.valuedata) {
      self.itemdata.valuedata = self.itemdata.defval;
    }

    if (self.itemdata.fkdisplay == 'mop') {
      if (self.itemdata.reftable === 'VP_C_VIP_ACC') {
        if (self.itemdata.valuedata) {
          self.mopDefaultValue = self.itemdata.pid;
          // self.mopDefaultValue = self.itemdata.valuedata;
          // self.itemdata.pid = self.itemdata.valuedata;
          self.fkDialog.lists = self.mopDefaultValue;
          // self.itemdata.valuedata =
          //   "已选中" + JSON.parse(self.mopDefaultValue).count + "条数据";
        } else {
          self.fkDialog.lists = {};
        }
      } else if (self.itemdata.valuedata) {
        // self.mopDefaultValue = self.itemdata.valuedata;
        self.mopDefaultValue = self.itemdata.pid;
        self.fkDialog.lists = self.mopDefaultValue;
        // self.itemdata.pid = self.itemdata.valuedata;
        // self.itemdata.valuedata =
        //   "已选中" + JSON.parse(self.mopDefaultValue).total + "条数据";
      } else {
        self.fkDialog.lists = {};
      }
    }
    if (self.itemdata.isfk && self.itemdata.valuedata) {
      // 如果用户有默认值,则默认是选中的状态
      self.isHandleSelect = true;
    }
  },
  mounted() {
    const self = this;
    // $(document).mouseup(function(e){
    //   var _con = $('.selection-dialog');   // 设置目标区域
    //   if(!_con.is(e.target) && _con.has(e.target).length === 0){ // Mark 1
    //      self.SingleSelect.show = false  // 功能代码
    //   }
    // })
    $('.main-content,.basicSteps').scroll(e => {
      $.each(self.popoverShow, item => {
        self.popoverShow[item] = false;
      });
    });
    $(document).on('click', e => {
      $.each(self.popoverShow, item => {
        self.popoverShow[item] = false;
      });
    });
  },
  computed: {
    /* autoval: {
        get () {
          return this.autocompleteIputData
        },
        set (val) {
          console.log('vvvvvvvvv')
          this.autocompleteIputData = val;
        },
      }, */
    hasQuery() {
      // 判断单选框是否有输入值
      const self = this;
      let hasValue = false;
      for (let i = 0; i < self.SelectionData.config.length; i++) {
        const element = self.SelectionData.config[i];
        if (element.value) {
          hasValue = true;
        }
      }
      return hasValue;
    }
  },
  components: {
    SelectDialog,
    FkTable,
    fkdialog,
    ImportDialog,
    advancedSearch
  },
  watch: {
    itemdata: {
      handler(val, oldVal) {
        const self = this;
        let reg = '';
        // 数字判断
        if (val.length) {
          if (val.scale === 0) {
            reg = new RegExp(`^[\\-\\+]?\\d{1,${val.length - val.scale}}(\\.\\d{1,2})?$`);
          } else {
            reg = new RegExp(`^[\\-\\+]?\\d{1,${val.length - val.scale}}(\\.\\d{0,${val.scale}})?$`); // 匹配小数点位数 /^\d+(\.\d{0,2})?$/
          }
        } else if (val.scale === 0) {
          reg = new RegExp('^[\\-\\+]?\\d+(\\.\\d{1,2})?$');
        } else {
          reg = new RegExp(`^[\\-\\+]?\\d+(\\.\\d{0,${val.scale}})?$`); // 匹配小数点位数 /^\d+(\.\d{0,2})?$/
        }
        if (!reg.test(val.valuedata) && val.type === 'NUMBER' && val.valuedata && val.valuedata !== '-') {
          if (isNaN(val.valuedata)) {
            val.valuedata = val.valuedata.length === 1 ? '' : oldVal.valuedata.substr(0, oldVal.valuedata.length - 1);
          } else if (val.scale === 0) {
            val.valuedata = val.valuedata.substring(0, val.valuedata.length - 1);
          } else {
            val.valuedata = val.valuedata.substring(0, val.valuedata.indexOf('.') === -1 ? val.valuedata.length - 1 : val.valuedata.indexOf('.') + val.scale - 0 + 1);
          }
        }
        // 弹框多选
        if (self.itemdata.fkdisplay == 'mop') {
          // console.log(self.itemdata)
          if (self.itemdata.valuedata && self.itemdata.valuedata.indexOf('{') >= 0) {
            self.mopDefaultValue = self.itemdata.valuedata;
            self.itemdata.pid = self.itemdata.valuedata;
            self.fkDialog.lists = self.mopDefaultValue;
            // self.itemdata.valuedata =
            //   "已选中" +
            //   (self.itemdata.reftable === "VP_C_VIP_ACC"
            //     ? JSON.parse(self.mopDefaultValue).count
            //     : JSON.parse(self.mopDefaultValue).total) +
            //   "条数据";
            self.itemdata.valuedata = self.itemdata.pid;
          } else if (!self.itemdata.valuedata) {
            self.mopDefaultValue = '';
            self.itemdata.pid = self.itemdata.valuedata;
            self.fkDialog.lists = {};
          }
        }
      },
      deep: true
    },
    refaddcol: {
      handler(val, oldVal) {
        const _self = this;
        // 判断是否可编辑,不可编辑则不做默认值处理
        if (!_self.isActive || _self.isdisabled) return;
        if (_self.storageItem.id == '-1' && _self.itemdata.refcolval && _self.itemdata.refcolval.addrule) {
          const addrule = _self.itemdata.refcolval.addrule;
          // 判断是否在规则内,如果在规则内则根据规则设置默认值
          for (const rule of addrule) {
            if ((val.fkdisplay && rule.refval.indexOf(val.pid) >= 0) || (!val.fkdisplay && rule.refval.indexOf(val.valuedata) >= 0)) {
              _self.itemdata.valuedata = rule.defval;
              _self.itemdata.pid = rule.defid || '';
              _self.$emit('getFkChooseItem', _self.itemdata, _self.row);
              return;
            }
          }
          // 设置原默认值
          if (_self.itemdata.defval) {
            _self.itemdata.valuedata = _self.itemdata.defval;
            _self.itemdata.pid = _self.itemdata.refobjid || '';
            _self.$emit('getFkChooseItem', _self.itemdata, _self.row);
          } else {
            // 如果没有默认值,则清空
            _self.itemdata.valuedata = null;
            _self.itemdata.pid = null;
            _self.$emit('getFkChooseItem', _self.itemdata, _self.row);
          }
        }
      },
      deep: true
    }
  },
  methods: {
    /* 高级搜索关闭弹框 */
    dialogClose() {
      this.fkDialog.dialog = false;
    },
    visibleChange(val) {
      // console.log('visibleChange',val)
      this.SingleSelect.show = false;
      this.selectOperation.pageSize = 10;
      this.selectOperation.curpage = 1;
      this.selectOperation.startindex = 0;
    },
    inputChange(item) {
      // 大小写转换
      const self = this;
      if (self.itemdata.isuppercase && self.itemdata.valuedata) {
        self.itemdata.valuedata = self.itemdata.valuedata.toString().toLocaleUpperCase();
      }
      self.$emit('getChangeItem', item);
    },
    inputKeyUp(str, event) {
      const self = this;
      // 判断是否enter键，如果是，不清空模糊查询列表
      if (event.keyCode !== 13) {
        self.queryList = [];
        self.isHandleSelect = false;
      }
      if (!this.autocomplete && str.valuedata !== '' && ((event.keyCode <= 57 && event.keyCode >= 48) || (event.keyCode <= 90 && event.keyCode >= 65))) {
        // 如果完成模糊查询，回车跳下一个输入框
        if (this.$refs[`autocomplete${this.itemdata.colname}`]) {
          this.$refs[`autocomplete${this.itemdata.colname}`].activated = true;
        }
      }
      if (str.valuedata == '' || !str.valuedata) {
        str.pid = '';
        self.$emit('getFkChooseItem', str, self.row);
      }

      // 字段联动
      if (self.itemdata.dynamicforcompute) {
        let strdynamicforcompute = self.itemdata.dynamicforcompute.express;

        self.itemdata.dynamicforcompute.refcolumns.forEach((refcolumns, index) => {
          for (let i = 0; i < self.objList.length; i++) {
            const item = self.objList[i];

            if (item.childs) {
              for (let j = 0; j < item.childs.length; j++) {
                const temp = item.childs[j];

                if (temp.colname == refcolumns) {
                  const regExp = new RegExp(temp.colname, 'g');
                  if (self.itemdata.dynamicforcompute.express) {
                    strdynamicforcompute = strdynamicforcompute.replace(regExp, Number(temp.valuedata ? temp.valuedata.replace(/,/g, '') : 0));
                  }
                }
              }
            } else {
            }
          }
        });

        vm.$nextTick(() => {
          setTimeout(() => {
            for (let i = 0; i < self.objList.length; i++) {
              const item = self.objList[i];

              if (item.childs) {
                for (let j = 0; j < item.childs.length; j++) {
                  const temp = item.childs[j];
                  if (temp.colname == self.itemdata.dynamicforcompute.computecolumn) {
                    if (self.itemdata.dynamicforcompute.refact) {
                    } else if (eval(strdynamicforcompute) == 'NaN') {
                      temp.valuedata = String('-');
                      // self.$set(temp,'valuedata',String('-'))
                      if (temp.readonly && !self.itemdata.dynamicforcompute.isSave) {
                      } else {
                        self.$emit('getChangeItem', temp);
                      }
                    } else {
                      if (self.itemdata.valuedata) {
                        temp.valuedata = String(eval(strdynamicforcompute));
                      } else {
                        temp.valuedata = null;
                      }
                      if (!temp.readonly) {
                        self.$emit('getChangeItem', temp);
                      }
                    }
                  }
                }
              } else {
              }
            }
          });
        });
      }
    },
    getFixedColumns(itemdata) {
      const self = this;
      const params = {};

      if (itemdata.refcolval) {
        const str = itemdata.refcolval.expre == 'equal' ? '=' : '';
        const queryColumnsList = this.objList;
        queryColumnsList.forEach(item => {
          if (item.childs) {
            item.childs.forEach(child => {
              if (child.colname === itemdata.refcolval.srccol) {
                if (child.isfk) {
                  params[itemdata.refcolval.fixcolumn] = child.pid && child.valuedata ? str + child.pid : str + child.refobjid;
                  if (!child.pid && !child.valuedata) {
                    params[itemdata.refcolval.fixcolumn] = null;
                  }
                } else {
                  params[itemdata.refcolval.fixcolumn] = child.valuedata ? str + child.valuedata : null;

                  if (!child.valuedata) {
                    params[itemdata.refcolval.fixcolumn] = null;
                  }
                }
              }
            });
          } else if (item.child) {
            if (item.child.colname === itemdata.refcolval.srccol) {
              if (item.child.isfk) {
                params[itemdata.refcolval.fixcolumn] = item.child.pid && item.child.valuedata ? str + item.child.pid : str + item.child.refobjid;
                if (!item.child.pid && !item.child.valuedata) {
                  params[itemdata.refcolval.fixcolumn] = null;
                }
              } else {
                params[itemdata.refcolval.fixcolumn] = item.child.valuedata ? str + item.child.valuedata : null;
                if (!item.child.valuedata) {
                  params[itemdata.refcolval.fixcolumn] = null;
                }
              }
            }
          } else {
            // 添加到明细输入框
            if (item.colname === itemdata.refcolval.srccol) {
              params[itemdata.refcolval.fixcolumn] = item.pid ? str + item.pid : str + item.refobjid;
            }
          }
        });
      }
      if (itemdata.refcolprem) {
        let findflag = false;
        self.objList.forEach(item => {
          if (!findflag && item.childs) {
            item.childs.forEach(child => {
              if (child.colname === itemdata.refcolprem.srccol) {
                findflag = true;
                if (child.isfk) {
                  itemdata.refcolprem.refcolval = child.pid && child.valuedata ? child.pid : child.refobjid;
                  if (!child.pid && !child.valuedata) {
                    itemdata.refcolprem.refcolval = null;
                  }
                } else {
                  itemdata.refcolprem.refcolval = child.valuedata ? child.valuedata : null;
                  if (!child.valuedata) {
                    itemdata.refcolprem.refcolval = null;
                  }
                }
                if (!itemdata.refcolprem.refcolval) {
                  self.$message({
                    message: `请先选择${child.name}`,
                    type: 'warning'
                  });
                  $(`.el-autocomplete.${child.name}`)
                    .find('input')
                    .focus();
                  return false;
                }
              }
            });
          } else if (!findflag) {
            if (item.child.colname === itemdata.refcolprem.srccol) {
              findflag = true;
              if (item.child.isfk) {
                itemdata.refcolprem.refcolval = item.child.pid && item.child.valuedata ? item.child.pid : item.child.refobjid;
                if (!item.child.pid && !item.child.valuedata) {
                  itemdata.refcolprem.refcolval = null;
                }
              } else {
                itemdata.refcolprem.refcolval = item.child.valuedata ? item.child.valuedata : null;

                if (!item.child.valuedata) {
                  itemdata.refcolprem.refcolval = null;
                }
              }
              if (!itemdata.refcolprem.refcolval) {
                self.$message({
                  message: `请先选择${item.child.name}`,
                  type: 'warning'
                });
                $(`.el-autocomplete.${item.child.name}`)
                  .find('input')
                  .focus();
                return false;
              }
            }
          }
        });
      }

      return params;
    },
    /**
     * 判断是否可以显示下拉效果,判断关联参数是否有值
     * @param itemdata
     * @param callback
     */
    getQueryClick(itemdata, callback) {
      const self = this;
      const params = {};
      const tipsname = {};
      if (itemdata.refcolval) {
        const str = itemdata.refcolval.expre == 'equal' ? '=' : '';
        self.objList.forEach(item => {
          if (item.childs) {
            item.childs.forEach(child => {
              if (child.colname === itemdata.refcolval.srccol) {
                if (child.isfk) {
                  params[itemdata.refcolval.fixcolumn] = child.pid && child.valuedata ? str + child.pid : str + child.refobjid;

                  if (!child.pid && !child.valuedata) {
                    params[itemdata.refcolval.fixcolumn] = null;
                  }
                  // params[itemdata.refcolval.fixcolumn] = child.pid
                  tipsname[itemdata.refcolval.fixcolumn] = child;
                } else {
                  params[itemdata.refcolval.fixcolumn] = child.valuedata ? str + child.valuedata : null;

                  if (!child.valuedata) {
                    params[itemdata.refcolval.fixcolumn] = null;
                  }
                  // params[itemdata.refcolval.fixcolumn] = child.pid
                  tipsname[itemdata.refcolval.fixcolumn] = child;
                }
              }
            });
          } else if (item.child) {
            if (item.child.colname === itemdata.refcolval.srccol) {
              if (item.child.isfk) {
                params[itemdata.refcolval.fixcolumn] = item.child.pid && item.child.valuedata ? str + item.child.pid : str + item.child.refobjid;

                if (!item.child.pid && !item.child.valuedata) {
                  params[itemdata.refcolval.fixcolumn] = null;
                }
                // params[itemdata.refcolval.fixcolumn] = item.child.pid
                tipsname[itemdata.refcolval.fixcolumn] = item.child;
              } else {
                params[itemdata.refcolval.fixcolumn] = item.child.valuedata ? str + item.child.valuedata : null;

                if (!item.child.valuedata) {
                  params[itemdata.refcolval.fixcolumn] = null;
                }
                // params[itemdata.refcolval.fixcolumn] = item.child.pid
                tipsname[itemdata.refcolval.fixcolumn] = item.child;
              }
            }
          } else if (item.colname === itemdata.refcolval.srccol) {
            if (item.isfk) {
              params[itemdata.refcolval.fixcolumn] = item.pid && item.valuedata ? str + item.pid : str + item.refobjid;

              if (!item.pid && !item.valuedata) {
                params[itemdata.refcolval.fixcolumn] = null;
              }
              tipsname[itemdata.refcolval.fixcolumn] = item;
            } else {
              params[itemdata.refcolval.fixcolumn] = item.valuedata ? str + item.child.valuedata : null;

              if (!item.valuedata) {
                params[itemdata.refcolval.fixcolumn] = null;
              }
              tipsname[itemdata.refcolval.fixcolumn] = item.child;
            }
          }
        });
      }
      self.queryParams = params;
      for (const key in params) {
        if (params[key] != -1 && params[key]) {
          if (itemdata.fkdisplay === 'pop') {
            callback();
          }
          if (itemdata.fkdisplay === 'drp' || itemdata.fkdisplay === 'mrp') {
            callback();
          }
        } else {
          self.$message({
            message: `请先选择${tipsname[key].name}`,
            type: 'warning'
          });
          setTimeout(() => {
            $(`.el-autocomplete.${itemdata.colname}`)
              .find('input')
              .blur();
            $(`.el-autocomplete.${tipsname[key].colname}`)
              .find('input')
              .focus();
          });
        }
      }
      if (itemdata.refcolprem) {
        let findflag = false;
        self.objList.forEach(item => {
          if (!findflag && item.childs) {
            item.childs.forEach(child => {
              if (child.colname === itemdata.refcolprem.srccol) {
                findflag = true;
                if (child.isfk) {
                  itemdata.refcolprem.refcolval = child.pid && child.valuedata ? child.pid : child.refobjid;
                  if (!child.pid && !child.valuedata) {
                    itemdata.refcolprem.refcolval = null;
                  }
                } else {
                  itemdata.refcolprem.refcolval = child.valuedata ? child.valuedata : null;
                  if (!child.valuedata) {
                    itemdata.refcolprem.refcolval = null;
                  }
                }
                if (!itemdata.refcolprem.refcolval) {
                  self.$message({
                    message: `请先选择${child.name}`,
                    type: 'warning'
                  });
                  $(`.el-autocomplete.${child.name}`)
                    .find('input')
                    .focus();
                  return false;
                }
                if (itemdata.fkdisplay === 'pop' || itemdata.fkdisplay === 'drp' || itemdata.fkdisplay === 'mrp') {
                  callback();
                }
              }
            });
          } else if (!findflag) {
            if (item.child.colname === itemdata.refcolprem.srccol) {
              findflag = true;
              if (item.child.isfk) {
                itemdata.refcolprem.refcolval = item.child.pid && item.child.valuedata ? item.child.pid : item.child.refobjid;
                if (!item.child.pid && !item.child.valuedata) {
                  itemdata.refcolprem.refcolval = null;
                }
              } else {
                itemdata.refcolprem.refcolval = item.child.valuedata ? item.child.valuedata : null;

                if (!item.child.valuedata) {
                  itemdata.refcolprem.refcolval = null;
                }
              }
              if (!itemdata.refcolprem.refcolval) {
                self.$message({
                  message: `请先选择${item.child.name}`,
                  type: 'warning'
                });
                $(`.el-autocomplete.${item.child.name}`)
                  .find('input')
                  .focus();
                return false;
              }
              if (itemdata.fkdisplay === 'pop' || itemdata.fkdisplay === 'drp' || itemdata.fkdisplay === 'mrp') {
                callback();
              }
            }
          }
        });
      }
    },
    getQueryParams(itemdata, callback) {
      const self = this;
      const params = {};
      const tipsname = {};

      if (itemdata.refcolval) {
        const str = itemdata.refcolval.expre == 'equal' ? '=' : '';
        this.objList.forEach(item => {
          if (item.childs) {
            item.childs.forEach(child => {
              if (child.colname === itemdata.refcolval.srccol) {
                if (child.isfk) {
                  params[itemdata.refcolval.fixcolumn] = child.pid && child.valuedata ? str + child.pid : str + child.refobjid;

                  if (!child.pid && !child.valuedata) {
                    params[itemdata.refcolval.fixcolumn] = null;
                  }
                  // params[itemdata.refcolval.fixcolumn] = child.pid
                  tipsname[itemdata.refcolval.fixcolumn] = child;
                } else {
                  params[itemdata.refcolval.fixcolumn] = child.valuedata ? str + child.valuedata : null;

                  if (!child.valuedata) {
                    params[itemdata.refcolval.fixcolumn] = null;
                  }
                  // params[itemdata.refcolval.fixcolumn] = child.pid
                  tipsname[itemdata.refcolval.fixcolumn] = child;
                }
              }
            });
          } else if (item.child.colname === itemdata.refcolval.srccol) {
            if (item.child.isfk) {
              params[itemdata.refcolval.fixcolumn] = item.child.pid && item.child.valuedata ? str + item.child.pid : str + item.child.refobjid;

              if (!item.child.pid && !item.child.valuedata) {
                params[itemdata.refcolval.fixcolumn] = null;
              }
              // params[itemdata.refcolval.fixcolumn] = item.child.pid
              tipsname[itemdata.refcolval.fixcolumn] = item.child;
            } else {
              params[itemdata.refcolval.fixcolumn] = item.child.valuedata ? str + item.child.valuedata : null;

              if (!item.child.valuedata) {
                params[itemdata.refcolval.fixcolumn] = null;
              }
              // params[itemdata.refcolval.fixcolumn] = item.child.pid
              tipsname[itemdata.refcolval.fixcolumn] = item.child;
            }
          }
        });
      }

      self.queryParams = params;
      for (const key in params) {
        if (params[key] != -1 && params[key]) {
          return params;
          self.drpPopoverShow = true;
        }
        self.$message({
          message: `请先选择${tipsname[key].name}`,
          type: 'warning'
        });
        // $('.el-popover').css('display','none')
        $(`.el-autocomplete.${tipsname[key].colname}`)
          .find('input')
          .focus();
        return { key: -1 };
      }
      return params;
    },

    getHideColumn(itemdata) {
      const self = this;
      let hidden = false;
      if (itemdata.hidecolumn) {
        self.objList.forEach(item => {
          if (item.childs) {
            item.childs.forEach(child => {
              if (child.colname === itemdata.hidecolumn.refcolumn && child.valuedata !== itemdata.hidecolumn.refval) {
                if (child.display === 'OBJ_DATENUMBER') {
                  if (child.valuedata !== itemdata.hidecolumn.refval.replace(/-/g, '')) {
                    hidden = true;
                  }
                } else {
                  hidden = true;
                }
              }
            });
          } else if (item.child.colname === itemdata.hidecolumn.refcolumn && item.child.valuedata !== itemdata.hidecolumn.refval) {
            if (item.child.display === 'OBJ_DATENUMBER') {
              if (item.child.valuedata !== itemdata.hidecolumn.refval.replace(/-/g, '')) {
                hidden = true;
              }
            } else {
              hidden = true;
            }
          }
        });
      }
      if (hidden) {
        itemdata.valuedata = null;
        self.$emit('clearInputValue', itemdata);
      }
      // hidden ? itemdata.valuedata = null : console.log('itemdata.valuedata',itemdata.valuedata)
      // this.$emit('getChangeItem',itemdata)
      return hidden;
    },
    fktableShow(val) {
      const self = this;
      const item = val.item;
      // this.$refs['autocomplete'+this.itemdata.colname].$refs['input']['currentValue'] = item.value

      if (jQuery.isArray(item)) {
        // 多选
        self.SingleSelect.show = false;
        if (val.idArr.length > 0) {
          self.itemdata.pid = val.idArr.join(',');
        } else {
          self.itemdata.pid = '';
        }
        self.$set(self.itemdata, 'valuedata', val.desc.join(','));
        self.$emit('getFkChooseItem', self.itemdata, self.row);
      } else {
        self.SingleSelect.show = false;
        self.itemdata.pid = self.hasLabel ? val.idArr.join(',') : val.item.ECODE.val;
        if (self.itemdata.hasDistribId) {
          self.itemdata.hasDistribId = val.item.CP_C_DISTRIB_ID.val;
        }
        self.$set(self.itemdata, 'valuedata', val.desc.join(','));
        self.popoverShow[self.itemdata.colname] = false;
        // 2020/03/26 模拟仿真平台商品单独获取成交单价 luyan
        if (self.itemdata.reftable === 'SG_B_CHANNEL_PRODUCT' && item.PRICE) {
          // 平台商品单选单独取值，新增成交单价、sku_id
          self.itemdata.channelList = {
            SKU_ID: item.SKU_ID.val,
            PS_C_SKU_ECODE: item.PS_C_SKU_ECODE.val,
            PRICE: item.PRICE.val,
            PS_C_PRO_ENAME: item.PS_C_PRO_ENAME.val,
            ID: item.ID.val
          };
          self.$set(self.itemdata, 'valuedata', item.PS_C_SKU_ECODE.val);
        } else if (self.itemdata.reftable === 'PS_C_PRO' || self.itemdata.reftable === 'PS_C_SKU') {
          self.itemdata.channelList = {
            ENAME: item.PS_C_PRO_ENAME.val,
            ECODE: item.ECODE.val,
            ID: item.ID.val
          };
          self.$set(self.itemdata, 'valuedata', item.ECODE.val);
        }
        self.$emit('getFkChooseItem', self.itemdata, self.row);
      }

      if (self.itemdata.dynamicforcompute) {
        if (self.itemdata.dynamicforcompute.refact) {
          // 字段联动
          // if(self.itemdata.dynamicforcompute){
          const str = self.itemdata.dynamicforcompute.express;

          self.itemdata.dynamicforcompute.refcolumns.forEach((refcolumns, index) => {
            for (let i = 0; i < self.objList.length; i++) {
              const item = self.objList[i];
              // console.log(refcolumns)
              if (item.childs) {
                for (let j = 0; j < item.childs.length; j++) {
                  const temp = item.childs[j];

                  if (String(temp.colname).trim() == String(refcolumns).trim()) {
                    // let regExp = new RegExp(temp.colname,'g');

                    if (temp.isfk) {
                      if (self.itemdata.colname == temp) {
                        self.dynamicforcomputeObj[temp.colname] = self.itemdata.pid;
                      } else {
                        self.dynamicforcomputeObj[temp.colname] = temp.pid;
                      }
                    } else {
                      self.dynamicforcomputeObj[temp.colname] = temp.valuedata;
                    }

                    // str =  str.replace(regExp,temp.valuedata?temp.valuedata:0)
                  }
                }
              } else {
              }
            }
          });

          // vm.$nextTick(() => {
          setTimeout(() => {
            let value = '';

            const paramobj = {
              actionid: 0,
              webaction: self.itemdata.dynamicforcompute.refact,
              param: JSON.stringify(self.dynamicforcomputeObj)
            };
            self.$ajax.dataAjax('/p/cs/exeAction', paramobj, res => {
              if (res.code == 0) {
                value = res.data;
              } else {
                value = 0;
              }

              for (let i = 0; i < self.objList.length; i++) {
                const item = self.objList[i];

                if (item.childs) {
                  for (let j = 0; j < item.childs.length; j++) {
                    const temp = item.childs[j];

                    if (temp.colname.trim() == self.itemdata.dynamicforcompute.computecolumn.trim()) {
                      // self.itemdata.dynamicforcompute.computecolumn.trim()
                      self.$set(temp, 'valuedata', String(value));
                      if (temp.readonly && !self.itemdata.dynamicforcompute.isSave) {
                      } else {
                        self.$emit('getChangeItem', temp);
                      }
                    }
                  }
                } else {
                }
              }
            });

            // console.log(self.itemdata.hidecolumn.express)
          });
          // })

          // }
        }
      }
      // 外键关联,选中后,当前input获取焦点
      // 移除获取焦点,用户直接操作输入框,导致数据变更,无法响应到给上层传递的参数上
      //        $(self.$el).find('input').focus();
      self.isHandleSelect = true;
      // added on 2018-06-08
      self.$emit('getFkTableChange', this.itemdata.colname, {
        desc: val.desc,
        idArr: val.idArr
      });
    },
    // 外键下拉模糊查询
    querySearchAsync(queryString, cb) {
      const self = this;
      self.autocomplete = false;
      let flag = true;
      const obj = self.getQueryClick(self.itemdata, () => {});
      if (self.itemdata.isuppercase && self.itemdata.valuedata) {
        self.itemdata.valuedata = self.itemdata.valuedata.toString().toLocaleUpperCase();
      }
      setTimeout(() => {
        for (const i in obj) {
          if (!obj[i].valuedata) {
            flag = false;
            cb([]);
            self.$set(self.itemdata, 'valuedata', null);
            self.$set(self.itemdata, 'pid', null);
            return;
          }
        }
      });
      setTimeout(() => {
        if (flag && queryString) {
          self.getQueryList(queryString, self.itemdata.colid, list => {
            const queryList = list;
            cb(queryList);
          });
        } else {
          cb([]);
        }
      });
    },
    clearItemdata() {
      this.itemdata.valuedata = null;
    },
    createStateFilter(queryString) {
      return state => state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0;
    },
    handleSelect(item) {
      const self = this;
      this.$refs[`autocomplete${this.itemdata.colname}`].$refs.input.currentValue = item.value;
      this.itemdata.valuedata = item.value;
      // this.$set(self.itemdata,'valuedata',item.value)
      this.itemdata.pid = self.hasLabel ? item.id : item.ECODE;
      /* this.$set(this.itemdata,'valuedata',item.value); */
      this.isHandleSelect = true;
      this.autocomplete = true;
      // 2020/03/26 模拟仿真平台商品单独获取成交单价 luyan
      if (self.itemdata.reftable === 'SG_B_CHANNEL_PRODUCT') {
        // 平台商品单选单独取值，新增成交单价、sku_id
        self.itemdata.channelList = {
          SKU_ID: item.SKU_ID,
          PS_C_SKU_ECODE: item.PS_C_SKU_ECODE,
          PRICE: item.PRICE || 0,
          PS_C_PRO_ENAME: item.PS_C_PRO_ENAME,
          ID: item.id
        };
        self.$set(self.itemdata, 'valuedata', item.PS_C_SKU_ECODE);
      } else if (self.itemdata.reftable === 'PS_C_PRO' || self.itemdata.reftable === 'PS_C_SKU') {
        self.itemdata.channelList = {
          ENAME: item.PS_C_PRO_ENAME,
          ECODE: item.ECODE,
          ID: item.id
        };
        self.$set(self.itemdata, 'valuedata', item.ECODE);
      }
      if (self.itemdata.reftable === 'SG_B_CHANNEL_PRODUCT' || self.itemdata.reftable === 'PS_C_PRO' || self.itemdata.reftable === 'PS_C_SKU') {
        this.$emit('getFkChooseItem', self.itemdata, self.row);
      } else {
        this.$emit('getFkChooseItem', item, self.row);
      }
      if (self.itemdata.dynamicforcompute) {
        if (self.itemdata.dynamicforcompute.refact) {
          // 字段联动
          // if(self.itemdata.dynamicforcompute){
          const str = self.itemdata.dynamicforcompute.express;
          self.itemdata.dynamicforcompute.refcolumns.forEach((refcolumns, index) => {
            for (let i = 0; i < self.objList.length; i++) {
              const item = self.objList[i];
              // console.log(refcolumns)
              if (item.childs) {
                for (let j = 0; j < item.childs.length; j++) {
                  const temp = item.childs[j];
                  if (String(temp.colname).trim() == String(refcolumns).trim()) {
                    // let regExp = new RegExp(temp.colname,'g');
                    if (temp.isfk) {
                      if (self.itemdata.colname == temp) {
                        self.dynamicforcomputeObj[temp.colname] = self.itemdata.pid;
                      } else {
                        self.dynamicforcomputeObj[temp.colname] = temp.pid;
                      }
                    } else {
                      self.dynamicforcomputeObj[temp.colname] = temp.valuedata;
                    }
                    // str =  str.replace(regExp,temp.valuedata?temp.valuedata:0)
                  }
                }
              } else {
              }
            }
          });
          // vm.$nextTick(() => {
          setTimeout(() => {
            let value = '';

            const paramobj = {
              actionid: 0,
              webaction: self.itemdata.dynamicforcompute.refact,
              param: JSON.stringify(self.dynamicforcomputeObj)
            };
            self.$ajax.dataAjax('/p/cs/exeAction', paramobj, res => {
              if (res.code == 0) {
                value = res.data;
              } else {
                value = 0;
              }

              for (let i = 0; i < self.objList.length; i++) {
                const item = self.objList[i];

                if (item.childs) {
                  for (let j = 0; j < item.childs.length; j++) {
                    const temp = item.childs[j];

                    if (temp.colname.trim() == self.itemdata.dynamicforcompute.computecolumn.trim()) {
                      // self.itemdata.dynamicforcompute.computecolumn.trim()
                      self.$set(temp, 'valuedata', String(value));
                      if (temp.readonly && !self.itemdata.dynamicforcompute.isSave) {
                      } else {
                        self.$emit('getChangeItem', temp);
                      }
                    }
                  }
                } else {
                }
              }
            });
          });
        }
      }
    },
    async getQueryList(queryString, id, cb) {
      const self = this;
      const query = {
        ak: queryString,
        colid: id,
        fixedcolumns: {
          whereKeys: self.getFixedColumns(self.itemdata)
        }
      };
      if (self.itemdata.precolnameslist && self.itemdata.precolnameslist.length > 0) {
        query.fixedcolumns.precolnameslist = self.itemdata.precolnameslist;
      }
      if (self.itemdata.refcolprem) {
        if (!self.itemdata.refcolprem.refcolval) {
          return;
        }
        query.fixedcolumns.precolnameslist = (query.fixedcolumns.precolnameslist || []).concat([self.itemdata.refcolprem]);
      }
      query.fixedcolumns = JSON.stringify(query.fixedcolumns);
      const searchParam = new URLSearchParams();
      searchParam.append('ak', queryString);
      searchParam.append('colid', id);
      searchParam.append('fixedcolumns', query.fixedcolumns);
      const res = await this.service.common.fuzzyquerybyak(searchParam);
      self.queryList = res.data.data;
      if (res.data.data.length > 0) {
        cb(res.data.data);
        self.$refs[`autocomplete${self.itemdata.colname}`].activated = true;
      } else {
        cb([]);
        $(`.fkAutocomplete${self.itemdata.colname}`).css('display', 'none');
      }
    },
    autocompleteEnter(itemdata, event) {
      const self = this;
      if (self.isHandleSelect) {
        // 如果完成模糊查询，回车跳下一个输入框
        self.$emit('itemInputEnter', event);
      }
      if (!self.isHandleSelect) {
        if (self.queryList.length > 0 && !self.autocomplete && itemdata.valuedata) {
          itemdata.pid = self.hasLabel
            ? self.queryList[0].id
            : self.queryList[0].ECODE;
          itemdata.valuedata = self.queryList[0].value;
          // add  by wdq  2020-04-07   表格嵌入单选控件
          const item = self.queryList[0] || {};
          this.customResult(item);
          self.autocomplete = true;
          self.$emit('getFkChooseItem', itemdata, self.row);
          $(`.fkAutocomplete${itemdata.colname}`).css('display', 'none');
          if (self.itemdata.dynamicforcompute) {
            if (self.itemdata.dynamicforcompute.refact) {
              // 字段联动

              // if(self.itemdata.dynamicforcompute){
              const str = self.itemdata.dynamicforcompute.express;

              self.itemdata.dynamicforcompute.refcolumns.forEach((refcolumns, index) => {
                for (let i = 0; i < self.objList.length; i++) {
                  const item = self.objList[i];
                  // console.log(refcolumns)
                  if (item.childs) {
                    for (let j = 0; j < item.childs.length; j++) {
                      const temp = item.childs[j];

                      if (String(temp.colname).trim() == String(refcolumns).trim()) {
                        // let regExp = new RegExp(temp.colname,'g');

                        if (temp.isfk) {
                          if (self.itemdata.colname == temp) {
                            self.dynamicforcomputeObj[temp.colname] = self.queryList[0].id;
                          } else {
                            self.dynamicforcomputeObj[temp.colname] = temp.pid;
                          }
                        } else {
                          self.dynamicforcomputeObj[temp.colname] = temp.valuedata;
                        }

                        // str =  str.replace(regExp,temp.valuedata?temp.valuedata:0)
                      }
                    }
                  } else {
                  }
                }
              });

              // vm.$nextTick(() => {
              setTimeout(() => {
                let value = '';

                const paramobj = {
                  actionid: 0,
                  webaction: self.itemdata.dynamicforcompute.refact,
                  param: JSON.stringify(self.dynamicforcomputeObj)
                };
                self.$ajax.dataAjax('/p/cs/exeAction', paramobj, res => {
                  if (res.code == 0) {
                    value = res.data;
                  } else {
                    value = 0;
                  }

                  for (let i = 0; i < self.objList.length; i++) {
                    const item = self.objList[i];

                    if (item.childs) {
                      for (let j = 0; j < item.childs.length; j++) {
                        const temp = item.childs[j];

                        if (temp.colname.trim() == self.itemdata.dynamicforcompute.computecolumn.trim()) {
                          // self.itemdata.dynamicforcompute.computecolumn.trim()
                          self.$set(temp, 'valuedata', String(value));
                          if (temp.readonly && !self.itemdata.dynamicforcompute.isSave) {
                          } else {
                            self.$emit('getChangeItem', temp);
                          }
                        }
                      }
                    } else {
                    }
                  }
                });

                // console.log(self.itemdata.hidecolumn.express)
              });
              // })

              // }
            }
          }
        } else if (itemdata.valuedata) {
          self.inQueryList(itemdata, () => {
            // console.log('callback')
            self.$emit('itemInputEnter', event);
          });
          if (self.itemdata.dynamicforcompute) {
            if (self.itemdata.dynamicforcompute.refact) {
              // 字段联动

              // if(self.itemdata.dynamicforcompute){
              const str = self.itemdata.dynamicforcompute.express;

              self.itemdata.dynamicforcompute.refcolumns.forEach((refcolumns, index) => {
                for (let i = 0; i < self.objList.length; i++) {
                  const item = self.objList[i];
                  // console.log(refcolumns)
                  if (item.childs) {
                    for (let j = 0; j < item.childs.length; j++) {
                      const temp = item.childs[j];

                      if (String(temp.colname).trim() == String(refcolumns).trim()) {
                        // let regExp = new RegExp(temp.colname,'g');

                        if (temp.isfk) {
                          if (self.itemdata.colname == temp) {
                            self.dynamicforcomputeObj[temp.colname] = self.itemdata.pid;
                          } else {
                            self.dynamicforcomputeObj[temp.colname] = temp.pid;
                          }
                        } else {
                          self.dynamicforcomputeObj[temp.colname] = temp.valuedata;
                        }

                        // str =  str.replace(regExp,temp.valuedata?temp.valuedata:0)
                      }
                    }
                  } else {
                  }
                }
              });

              // vm.$nextTick(() => {
              setTimeout(() => {
                let value = '';

                const paramobj = {
                  actionid: 0,
                  webaction: self.itemdata.dynamicforcompute.refact,
                  param: JSON.stringify(self.dynamicforcomputeObj)
                };
                self.$ajax.dataAjax('/p/cs/exeAction', paramobj, res => {
                  if (res.code == 0) {
                    value = res.data;
                  } else {
                    value = 0;
                  }

                  for (let i = 0; i < self.objList.length; i++) {
                    const item = self.objList[i];

                    if (item.childs) {
                      for (let j = 0; j < item.childs.length; j++) {
                        const temp = item.childs[j];

                        if (temp.colname.trim() == self.itemdata.dynamicforcompute.computecolumn.trim()) {
                          // self.itemdata.dynamicforcompute.computecolumn.trim()
                          self.$set(temp, 'valuedata', String(value));
                          if (temp.readonly && !self.itemdata.dynamicforcompute.isSave) {
                          } else {
                            self.$emit('getChangeItem', temp);
                          }
                        }
                      }
                    } else {
                    }
                  }
                });

                // console.log(self.itemdata.hidecolumn.express)
              });
              // })

              // }
            }
          }
        } else {
          self.$emit('itemInputEnter', event);
          if (self.itemdata.dynamicforcompute) {
            if (self.itemdata.dynamicforcompute.refact) {
              // 字段联动

              // if(self.itemdata.dynamicforcompute){
              const str = self.itemdata.dynamicforcompute.express;

              self.itemdata.dynamicforcompute.refcolumns.forEach((refcolumns, index) => {
                for (let i = 0; i < self.objList.length; i++) {
                  const item = self.objList[i];
                  // console.log(refcolumns)
                  if (item.childs) {
                    for (let j = 0; j < item.childs.length; j++) {
                      const temp = item.childs[j];

                      if (String(temp.colname).trim() == String(refcolumns).trim()) {
                        // let regExp = new RegExp(temp.colname,'g');

                        if (temp.isfk) {
                          if (self.itemdata.colname == temp) {
                            self.dynamicforcomputeObj[temp.colname] = self.itemdata.pid;
                          } else {
                            self.dynamicforcomputeObj[temp.colname] = temp.pid;
                          }
                        } else {
                          self.dynamicforcomputeObj[temp.colname] = temp.valuedata;
                        }

                        // str =  str.replace(regExp,temp.valuedata?temp.valuedata:0)
                      }
                    }
                  } else {
                  }
                }
              });

              // vm.$nextTick(() => {
              setTimeout(() => {
                let value = '';

                const paramobj = {
                  actionid: 0,
                  webaction: self.itemdata.dynamicforcompute.refact,
                  param: JSON.stringify(self.dynamicforcomputeObj)
                };
                self.$ajax.dataAjax('/p/cs/exeAction', paramobj, res => {
                  if (res.code == 0) {
                    value = res.data;
                  } else {
                    value = 0;
                  }

                  for (let i = 0; i < self.objList.length; i++) {
                    const item = self.objList[i];

                    if (item.childs) {
                      for (let j = 0; j < item.childs.length; j++) {
                        const temp = item.childs[j];

                        if (temp.colname.trim() == self.itemdata.dynamicforcompute.computecolumn.trim()) {
                          // self.itemdata.dynamicforcompute.computecolumn.trim()
                          self.$set(temp, 'valuedata', String(value));
                          if (temp.readonly && !self.itemdata.dynamicforcompute.isSave) {
                          } else {
                            self.$emit('getChangeItem', temp);
                          }
                        }
                      }
                    } else {
                    }
                  }
                });

                // console.log(self.itemdata.hidecolumn.express)
              });
              // })

              // }
            }
          }
        }
      }

      //        self.isHandleSelect = false
    },
    async inQueryList(itemdata, callback) {
      const self = this;
      const query = {
        ak: itemdata.valuedata,
        colid: itemdata.colid,
        fixedcolumns: {
          whereKeys: self.getFixedColumns(self.itemdata)
        }
      };
      if (self.itemdata.precolnameslist && self.itemdata.precolnameslist.length > 0) {
        query.fixedcolumns.precolnameslist = self.itemdata.precolnameslist;
      }
      if (self.itemdata.refcolprem) {
        if (!self.itemdata.refcolprem.refcolval) {
          return;
        }
        query.fixedcolumns.precolnameslist = (query.fixedcolumns.precolnameslist || []).concat([self.itemdata.refcolprem]);
      }
      query.fixedcolumns = JSON.stringify(query.fixedcolumns);
      const searchParam = new URLSearchParams();
      searchParam.append('ak', itemdata.valuedata);
      searchParam.append('colid', itemdata.colid);
      searchParam.append('fixedcolumns', query.fixedcolumns);
      const res = await this.service.common.fuzzyquerybyak(searchParam);
      for (let i = 0; i < res.data.data.length; i++) {
        const element = res.data.data[i];
        if (element.value === itemdata.valuedata && (element.id === itemdata.pid || element.id == itemdata.refobjid)) {
          // console.log('beforecall')
          callback();
        }
      }
      if (res.data.data.length === 0) {
        self.itemdata.valuedata = null;
        self.itemdata.pid = null;
      }
    },

    DeleteClick(event) {
      const self = this;
      this.$set(this.itemdata, 'valuedata', '');
      this.$refs[`autocomplete${this.itemdata.colname}`].value = '';
      // $('.' + this.itemdata.colname)[0].value = '';
      self.itemdata.pid = '';
      self.fkDialog.lists = {};
      self.mopDefaultValue = {};
      self.$emit('getFkChooseItem', self.itemdata, self.row);
      $(event.target)
        .parent()
        .css('display', 'none');
    },
    DeleteOver(event) {
      $(event.target).css('display', 'inline-block');
    },
    DeleteOut(event) {
      $(event.target).css('display', 'none');
    },
    DeleteIconOver(event) {
      $(event.target)
        .parent()
        .css('display', 'inline-block');
    },
    DeleteIconOut(event) {
      $(event.target)
        .parent()
        .css('display', 'none');
    },
    //      显示删除小图标
    autocompleteOver(event) {
      const self = this;
      if ((self.itemdata.fkdisplay == 'mrp' || self.itemdata.fkdisplay == 'mop') && self.itemdata.pid != -1 && self.itemdata.valuedata) {
        // 下拉多选
        $(event.target)
          .parent()
          .find('.deleteDiv')
          .css('display', 'inline-block');
      }
    },
    autocompleteOut() {
      const self = this;
      if (self.itemdata.fkdisplay == 'mrp' || self.itemdata.fkdisplay == 'mop') {
        // 下拉多选
        $(event.target)
          .parent()
          .find('.deleteDiv')
          .css('display', 'none');
      }
    },
    InputBlur() {
      const self = this;
      // this.$refs['autocomplete'+this.itemdata.colname].$refs['input']['currentValue'] = item.value

      if (self.itemdata.fkdisplay == 'mrp' || self.itemdata.fkdisplay == 'mop') {
        if (self.itemdata.pid && self.itemdata.pid != -1) {
        } else {
          // self.itemdata.valuedata = null
          // self.itemdata.pid = null

          self.$set(self.itemdata, 'pid', null);
          self.$set(self.itemdata, 'valuedata', null);
          $(event.target).val(null);
        }

        self.$emit('getFkChooseItem', self.itemdata, self.row);
      }
    },
    autocompleteBlur() {
      const self = this;
      // 防止失去焦点自动跳到下一个输入框
      // if(self.autocomplete && self.itemdata.valuedata) { //如果完成模糊查询，回车跳下一个输入框
      //   self.$emit('itemInputEnter',event)
      // }
      // #2018-07-09 加入settimeout 原因: 模糊搜索handleSelect鼠标点击下拉列表项事件在blur之后,导致默认选中第一行的bug
      clearTimeout(self.getSetTime);
      self.getSetTime = setTimeout(() => {
        if (!self.isHandleSelect) {
          if (self.queryList.length > 0 && !self.autocomplete && self.itemdata.valuedata) {
            self.itemdata.pid = self.hasLabel ? self.queryList[0].id : self.queryList[0].ECODE;
            self.itemdata.valuedata = self.queryList[0].value;
            self.customResult(self.queryList[0]);
            self.autocomplete = true;
            self.$emit('getFkChooseItem', self.itemdata, self.row);
            $(`.fkAutocomplete${self.itemdata.colname}`).css('display', 'none');
            if (self.itemdata.dynamicforcompute) {
              if (self.itemdata.dynamicforcompute.refact) {
                // 字段联动
                // if(self.itemdata.dynamicforcompute){

                self.itemdata.dynamicforcompute.refcolumns.forEach(refcolumns => {
                  for (let i = 0; i < self.objList.length; i++) {
                    const item = self.objList[i];
                    // console.log(refcolumns)
                    if (item.childs) {
                      for (let j = 0; j < item.childs.length; j++) {
                        const temp = item.childs[j];

                        if (String(temp.colname).trim() == String(refcolumns).trim()) {
                          // let regExp = new RegExp(temp.colname,'g');

                          if (temp.isfk) {
                            if (self.itemdata.colname == temp) {
                              self.dynamicforcomputeObj[temp.colname] = self.itemdata.pid;
                            } else {
                              self.dynamicforcomputeObj[temp.colname] = temp.pid;
                            }
                          } else {
                            self.dynamicforcomputeObj[temp.colname] = temp.valuedata;
                          }

                          // str =  str.replace(regExp,temp.valuedata?temp.valuedata:0)
                        }
                      }
                    } else {
                    }
                  }
                });

                // vm.$nextTick(() => {
                setTimeout(() => {
                  let value = '';

                  const paramobj = {
                    actionid: 0,
                    webaction: self.itemdata.dynamicforcompute.refact,
                    param: JSON.stringify(self.dynamicforcomputeObj)
                  };
                  self.$ajax.dataAjax('/p/cs/exeAction', paramobj, res => {
                    if (res.code == 0) {
                      value = res.data;
                    } else {
                      value = 0;
                    }

                    for (let i = 0; i < self.objList.length; i++) {
                      const item = self.objList[i];

                      if (item.childs) {
                        for (let j = 0; j < item.childs.length; j++) {
                          const temp = item.childs[j];

                          if (temp.colname.trim() == self.itemdata.dynamicforcompute.computecolumn.trim()) {
                            // self.itemdata.dynamicforcompute.computecolumn.trim()
                            self.$set(temp, 'valuedata', String(value));
                            if (temp.readonly && !self.itemdata.dynamicforcompute.isSave) {
                            } else {
                              self.$emit('getChangeItem', temp);
                            }
                          }
                        }
                      } else {
                      }
                    }
                  });
                });
              }
            }
          } else if (self.itemdata.valuedata && self.queryList.length == 0) {
            self.inQueryList(self.itemdata, () => {
              self.$emit('itemInputEnter', event);
            });
          } else {
          }
        }
      }, 300);
    },
    // 弹出框数据操作
    selectPageSizeChange(val) {
      // console.log('selectPageSizeChange',val.page)
      this.selectOperation.pageSize = val.page;
      this.selectOperation.startindex = (this.selectOperation.curpage - 1) * this.selectOperation.pageSize;
      this.getSelectData(val.param);
    },
    selectPageCurrentChange(val) {
      // console.log('selectPageCurrentChange',val.page)
      this.selectOperation.curpage = val.page;
      this.selectOperation.startindex = (val.page - 1) * this.selectOperation.pageSize;
      // this.selectOperation.pageSize = val
      this.getSelectData(val.param);
    },
    itemInputEnter(event) {
      this.$emit('itemInputEnter', event);
    },
    showFkMore() {
      // 获取弹框多选模版
      const self = this;
      const obj = {
        tableid: self.itemdata.reftableid
      };
      self.$ajax.dataAjax('/p/cs/getMultiQuery', obj, res => {
        if (res.code == 0) {
          self.modelList = res.data;
        }
      });
    },
    buttonImoprt(itemdata) {
      const self = this;
      $(`.mop${itemdata.colname} span i`).trigger('click');
      $(`#${self.itemdata.colname}mopfile`).trigger('click');
    }, // 导入
    async uploadFileChange(itemdata, event) {
      const self = this;
      const file = $(`#${self.itemdata.colname}mopfile`)[0].files;
      const data = new FormData();
      // let param = {
      //   'tablename':self.storageItem.name
      // }
      data.append('file', file[0]);
      data.append('table', self.itemdata.reftable);

      const res = await self.service.common.menuimport(data);
      if (res.code == 0) {
        self.fkDialog.dialog = true;
        self.fkDialog.lists = res.data.text;
      } else {
        const data = {
          message: res.message
        };
        self.errorData = data;
        self.errorDialog = true;
        self.errorDialogClass = 'error';
        self.errorDialogTitle = self.ChineseDictionary.ERROR;
        self.errorDialogBack = false;
      }

      setTimeout(() => {
        $(`#${self.itemdata.colname}mopfile`).val('');
      });
    },
    modelIconShow(item, index) {
      const self = this;
      self.$nextTick(() => {
        $(`.el-popover .mop${item.colname} li i`).css('display', 'none');
        $(`.el-popover .mop${item.colname} .model${index}`)
          .find('i')
          .css('display', 'inline');
      });
    },
    modelIconHidden(item, index) {
      const self = this;
      self.$nextTick(() => {
        $(`.el-popover .mop${item.colname} li i`).css('display', 'none');
      });
    },
    modelDelete(item) {
      const self = this;
      const obj = {
        tableid: self.itemdata.reftableid,
        modelname: item.key
      };

      self.$ajax.dataAjax('/p/cs/delMultiQuery', obj, res => {
        if (res.code == 0) {
          self.showFkMore();
        }
      });
      // $.ajax({
      //   url:'/p/cs/delMultiQuery',
      //   type:'POST',
      //   dataType:'json',
      //   data:obj,
      //   success:function(res){
      //     if(res.code == 0){
      //      self.showFkMore()
      //     }
      //   },
      //   error:function(res){

      //   }
      // })
    },
    modelClick(item) {
      const self = this;
      setTimeout(() => {
        $(`.mop${self.itemdata.colname} span i`).trigger('click');
      });
      self.fkDialog.dialog = true;
      self.fkDialog.lists = item.value;
    },
    filterInputName(item) {
      const self = this;
      $('.admin-container').trigger('click');
      if (item.refcolval || item.refcolprem) {
        if (item.fkdisplay == 'drp' || item.fkdisplay == 'mrp') {
          self.getQueryClick(item, () => {
            self.popoverShow[item.colname] = true;
          });
        } else if (item.fkdisplay == 'pop') {
          self.getQueryClick(item, () => {
            self.SingleSelect.show = true;
            self.SelectionData.item = item;
            self.getSelectConfig(item, () => {
              // self.getSelectData() //获取单选框表格数据
            }); // 获取单选框输入配置
            // self.getSelectData() //获取单选框表格数据
          });
        } else {
          self.fkDialog.lists = {};
          self.fkDialog.dialog = true;
        }
      } else if (item.fkdisplay == 'drp' || item.fkdisplay == 'mrp') {
        self.popoverShow[item.colname] = true;
      } else if (item.fkdisplay == 'pop') {
        // 弹框单选
        self.SingleSelect.show = true;
        self.SelectionData.item = item;
        self.getSelectConfig(item, () => {
          // self.getSelectData() //获取单选框表格数据
        }); // 获取单选框输入配置
        // self.getSelectData() //获取单选框表格数据
      } else {
        // 弹框多选
        if (self.itemdata.pid != -1 && self.itemdata.pid) {
          // 存在值
          self.fkDialog.lists = self.mopDefaultValue;
        } else {
          self.fkDialog.lists = {};
        }

        self.fkDialog.dialog = true;
      }
    },
    // 高级搜索向上抛数据
    advancedData(val) {
      const self = this;
      self.itemdata.pid = '';
      self.itemdata.valuedata = '';
      if (val) {
        self.itemdata.pid = val;
        self.mopDefaultValue = val;
        self.itemdata.valuedata = `已选中${JSON.parse(val).count}条数据`;
        self.fkDialog.lists = val;
      } else {
        self.fkDialog.lists = {};
        self.itemdata.pid = '';
        self.mopDefaultValue = {};
        self.itemdata.valuedata = '';
      }
      self.$emit('getFkChooseItem', self.itemdata, self.row);
    },
    getFkdialog(item) {
      const self = this;
      const ITEM = JSON.parse(item);
      self.itemdata.pid = '';
      self.itemdata.valuedata = '';
      if (ITEM.lists.result.length > 0) {
        self.itemdata.pid = item;
        self.mopDefaultValue = item;
        self.itemdata.valuedata = `已选中${ITEM.total}条数据`;
        // ITEM.lists.forEach((item, index) => {
        //   if(index == (ITEM.lists.length-1)){
        //     self.itemdata.pid += ITEM.screen
        //     self.itemdata.valuedata += ITEM.screen_string
        //   }else{
        //     self.itemdata.pid += ITEM.screen+','
        //     self.itemdata.valuedata += ITEM.screen_string+','
        //   }

        // })
        self.fkDialog.lists = item;
      } else {
        self.fkDialog.lists = {};
        self.itemdata.pid = '';
        self.mopDefaultValue = {};
        self.itemdata.valuedata = '';
      }
      self.$emit('getFkChooseItem', self.itemdata, self.row);
    },
    async getSelectConfig(item, callback) {
      // 更新数据: SelectionData.config 弹出框输入配置
      const self = this;
      self.SelectionData.config = []; // 请求前清空旧数据
      const query = {
        params: {
          tableid: item.reftableid,
          getcmd: 'n',
          table: item.reftable
        }
      };
      const res = await this.service.common.getTableQuery(query);
      axios({
        url: '/p/cs/getTableQuery',
        type: 'post',
        params: {
          tableid: item.reftableid,
          getcmd: 'n',
          table: item.reftable
        }
      }).then(res => {
        for (let i = 0; i < res.data.datas.dataarry.length; i++) {
          const element = res.data.datas.dataarry[i];
          element.value = '';
          if (element.display === 'OBJ_CHECK') {
            element.value = element.limitval === 'Y';
          }
          if (element.default) {
            element.value = element.default;
          }
          self.SelectionData.config.push(element);
        }
        // self.SelectionData.config = res.data.datas.dataarry
        callback();
      });
    },
    async getSelectData(query) {
      const self = this;
      const params = new FormData();
      const item = self.SelectionData.item;
      self.SelectionData.row = [];
      const searchdata = {
        refcolid: item.colid,
        isdroplistsearch: true,
        fixedcolumns: this.queryParams,
        startindex: self.selectOperation.startindex,
        range: self.selectOperation.pageSize
      };
      // console.log('query',self.hasQuery,query)
      if (self.hasQuery) {
        // searchdata.fixedcolumns = self.selectConfigChanged
        searchdata.fixedcolumns = query;
      }
      params.append('searchdata', JSON.stringify(searchdata));
      const res = await this.service.common.QueryList(params);
      if (res.data.code === 0) {
        self.SelectionData.row = res.data.datas.row;
        self.SelectionData.thead = res.data.datas.tabth;
        self.SelectionData.tableAllDatas = res.data.datas;
        self.selectOperation.page.totalRowCount = res.data.datas.totalRowCount;
      }
      // axios({
      //   url: '/p/cs/QueryList',
      //   type: 'post',
      //   params: {
      //     searchdata
      //   }
      // }).then((res) => {
      //   if (res.data.code === 0) {
      //     self.SelectionData.row = res.data.datas.row;
      //     self.SelectionData.thead = res.data.datas.tabth;
      //     self.SelectionData.tableAllDatas = res.data.datas;
      //     self.selectOperation.page.totalRowCount = res.data.datas.totalRowCount;
      //   }
      // });
    },

    selectionQueryTable(val) {
      const self = this;
      // console.log('getSelectData',val)
      self.getSelectData(val);
    },
    getSelectChooseItem(val) {
      // 获取单选框选择数据
      const self = this;
      self.SingleSelect.show = false;
      this.selectOperation.pageSize = 10;
      this.selectOperation.curpage = 1;
      this.selectOperation.startindex = 0;
      self.itemdata.pid = self.hasLabel ? val.ID.val : val.ECODE.val;
      self.itemdata.valuedata = val[val.DISPLAY].val;

      self.$emit('getFkChooseItem', val, self.row);
    },
    /**
     * 定制返回结果
     * @item  选中项目
     */
    customResult(item) {
      const self = this;
      if (self.itemdata.reftable === 'SG_B_CHANNEL_PRODUCT') {
        // 平台商品单选单独取值，新增成交单价、sku_id
        self.itemdata.channelList = {
          SKU_ID: item.SKU_ID,
          PS_C_SKU_ECODE: item.PS_C_SKU_ECODE,
          PRICE: item.PRICE || 0,
          PS_C_PRO_ENAME: item.PS_C_PRO_ENAME,
          ID: item.id
        };
        self.$set(self.itemdata, 'valuedata', item.PS_C_SKU_ECODE);
      } else if (self.itemdata.reftable === 'PS_C_PRO' || self.itemdata.reftable === 'PS_C_SKU') {
        self.itemdata.channelList = {
          ENAME: item.PS_C_PRO_ENAME,
          ECODE: item.ECODE,
          ID: item.id
        };
        self.$set(self.itemdata, 'valuedata', item.ECODE);
      }
    }
  }
};
