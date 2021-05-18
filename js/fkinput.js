// import commonUtils from '@burgeon/project-logic/config/config/commonUtils.js';
// import SelectDialog from '../dialog/selectDialog.vue';
// import FkTable from '../tablelist/fktable.vue';
// 兼容fktable1.4数据格式（云雀1.0）
import SelectDialog from 'framework/components/dialog/selectDialog.vue';
import FkTable from '../fktable.vue';
// import $ from '@/assets/js/jquery3.5.1.min.js';
/* import Vue from 'vue' */

export default {
  props: {
    itemdata: {
      type: Object
    },
    isActive: {
      type: Boolean
    },
    isdisabled: {
      type: Boolean
    },
    inputList: {
      type: Array
    },
    objList: {
      type: Array
    },
    version: {
      type: String
    }
  },
  data() {
    return {
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
        startindex: 0,
        pageSize: 10,
        pageSizeList: [10, 20, 50, 100, 200]
      },
      queryList: [],
      isHandleSelect: false,
      // 单选弹出框数据操作
      selectCurrentPage: 2,
      popoverShow: {},
      autocomplete: false,
      enter: {
        time: 0
      }
    };
  },
  watch: {
    itemdata: {
      handler(val, oldVal) {
        const self = this;
        let reg = '';

        // 数字判断
        if (val.length) {
          if (val.scale === 0) {
            reg = new RegExp(
              `^[\\-\\+]?\\d{0,${val.length - val.scale}}(\\.\\d{1,2})?$`
            );
          } else {
            reg = new RegExp(
              `^[\\-\\+]?\\d{0,${val.length - val.scale}}(\\.\\d{0,${val.scale
              }})?$`
            ); // 匹配小数点位数 /^[+\-\d]{0,1}+(\.\d{0,2})?$/
          }
        } else if (val.scale === 0) {
          reg = new RegExp('^[\\+\\-]?\\d+(\\.\\d{1,2})?$');
        } else {
          reg = new RegExp(`^[\\+\\-]?\\d+(\\.\\d{0,${val.scale}})?$`); // 匹配小数点位数 /^[+\-\d]{0,1}+(\.\d{0,2})?$/
        }
        const numberCount = val.length - val.scale;
        if (!reg.test(val.valuedata) && val.type === 'NUMBER') {
          if (isNaN(val.valuedata)) {
            val.valuedata = val.valuedata.length === 1
              ? ''
              : oldVal.valuedata.substr(0, oldVal.valuedata.length - 1);
          } else if (val.scale === 0) {
            val.valuedata = val.valuedata.substring(
              0,
              val.valuedata.length - 1
            );
          } else {
            val.valuedata = val.valuedata.indexOf('.') === -1
              ? val.valuedata.substring(0, val.valuedata.length - 1)
              : val.length
                ? val.valuedata.substring(
                  0,
                  val.valuedata.includes('-') || val.valuedata.includes('+')
                    ? val.valuedata.indexOf('.') > numberCount + 1
                      ? numberCount + 1
                      : val.valuedata.indexOf('.')
                    : val.valuedata.indexOf('.') > numberCount
                      ? numberCount
                      : val.valuedata.indexOf('.')
                )
                + val.valuedata.substring(
                  val.valuedata.indexOf('.'),
                  val.valuedata.indexOf('.') + val.scale + 1
                )
                : val.valuedata.substring(
                  0,
                  val.valuedata.indexOf('.') + val.scale
                );
          }
        }

        // 大小写转换
        if (val.isuppercase && val.valuedata) {
          val.valuedata = val.valuedata.toString().toUpperCase();
        }
      },
      deep: true
    }
  },
  computed: {
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
    },
    selectConfigChanged() {
      const self = this;
      const params = {};
      for (let i = 0; i < self.SelectionData.config.length; i++) {
        const element = self.SelectionData.config[i];
        if (element.value) {
          params[element.colinputName] = element.value;
        }
        if (element.display === 'OBJ_CHECK') {
          params[element.colinputName] = element.value === true ? '=Y' : '=N';
        }
      }
      return params;
    },
  },
  components: {
    SelectDialog,
    FkTable
  },
  mounted() {
    const self = this;
    $(document).on('click', (e) => {
      $.each(self.popoverShow, (item) => {
        self.popoverShow[item] = false;
      });
    });
  },
  updated() { },
  methods: {
    clear() {
      // 清空值
      if (this.itemdata.isBackRowItem) {
        this.$emit('getFkChooseItem', {});
      } else {
        this.itemdata.pid = '';
        this.itemdata.valuedata = '';
        this.$emit('getFkChooseItem', this.itemdata); // sq-20190910修改
      }
    },
    // 组件值传递
    inputChange(item) {
      const self = this;
      if (self.itemdata.isuppercase && self.itemdata.valuedata) {
        self.itemdata.valuedata = self.itemdata.valuedata
          .toString()
          .toLocaleUpperCase();
      }
      this.$emit('getChangeItem', item);
    },
    // 弹出框数据操作
    selectPageSizeChange(val) {
      this.selectOperation.pageSize = val;
      this.getSelectData();
    },
    selectPageCurrentChange(val) {
      this.selectOperation.startindex = (val - 1) * this.selectOperation.pageSize;
      // this.selectOperation.pageSize = val
      this.getSelectData();
    },
    getSelectChooseItem(val) {
      // 获取单选框选择数据
      const self = this;
      self.SingleSelect.show = false;
      self.itemdata.pid = val.ID.val;

      self.itemdata.valuedata = val[val.DISPLAY].val; // 动态获取外键
      self.$emit('getFkChooseItem', val);
    },

    inQueryList(itemdata, callback) {
      const self = this;
      const query = {
        ak: itemdata.valuedata,
        colid: itemdata.colid,
        fixedcolumns: {
          whereKeys: self.getFixedColumns(self.itemdata)
        }
      };
      if (
        self.itemdata.precolnameslist
        && self.itemdata.precolnameslist.length > 0
      ) {
        query.fixedcolumns.precolnameslist = JSON.stringify(
          self.itemdata.precolnameslist
        );
      }
      query.fixedcolumns = JSON.stringify(query.fixedcolumns);
      const searchParam = new URLSearchParams();
      searchParam.append('ak', queryString);
      searchParam.append('colid', id);
      searchParam.append('fixedcolumns', query.fixedcolumns);

      this.service.common.fuzzyquerybyak(searchParam, { serviceId: itemdata.serviceId || 'r3-cp' }).then((res) => {
        for (let i = 0; i < res.data.data.length; i++) {
          const element = res.data.data[i];
          if (
            element.value === itemdata.valuedata
            && (element.id === itemdata.pid || element.id == itemdata.refobjid)
          ) {
            // console.log('beforecall')
            callback();
          }
        }
        if (res.data.data.length === 0) {
          // console.log('callback null')
          self.itemdata.valuedata = null;
          self.itemdata.pid = null;
        }
      });
    },
    // input与table的关联
    fktableShow(val) {
      const self = this;
      const item = val.item; // 接收到fktable传过来的对象item
      if (Array.isArray(item)) {
        // 多选-选中时触发
        self.SingleSelect.show = false;
        if (val.idArr.length > 0) {
          self.itemdata.pid = val.idArr.join(',');
          self.autocomplete = false;
          self.isHandleSelect = true;
        } else {
          self.itemdata.pid = '';
          self.autocomplete = false;
          self.isHandleSelect = false;
        }

        self.$set(self.itemdata, 'valuedata', val.desc.join(','));
        // self.$emit('getFkChooseItem', self.itemdata);
        self.$emit('getFkChooseItem', item);
      } else {
        // 单选-选中时触发
        self.SingleSelect.show = false;
        self.popoverShow[val.index] = false;
        self.itemdata.pid = item.ID.val;
        self.itemdata.valuedata = item[val.tabth.colname].val;

        self.autocomplete = false;
        self.isHandleSelect = true;
        //      当前项获取焦点
        $(self.$el)
          .find('input')
          .focus();
        self.$emit('getFkChooseItem', item);
      }
    },
    itemInputEnter(event) {
      this.$emit('itemInputEnter', event);
    },
    // 外键下拉模糊查询
    querySearchAsync(queryString, cb) {
      const self = this;
      self.autocomplete = false;
      self.isHandleSelect = false;
      let flag = true;
      const obj = self.getQueryClick(self.itemdata, () => { });
      for (const i in obj) {
        if (!obj[i].valuedata) {
          flag = false;
          cb([]);
          self.$set(self.itemdata, 'valuedata', null);
          self.$set(self.itemdata, 'pid', null);
          return;
        }
      }

      setTimeout(() => {
        if (flag) {
          self.getQueryList(queryString, self.itemdata.colid, (list) => {
            const queryList = list;
            cb(queryList);
          });
        } else {
          cb([]);
        }
      });
    },
    createStateFilter(queryString) {
      return state => (
        state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
      );
    },
    handleSelect(item) {
      const self = this;
      if (item.id) {
        self.itemdata.pid = item.id;
        self.autocomplete = true;
        self.$emit('getFkChooseItem', item);
      }
    },
    getQueryList(queryString, id, cb) {
      const self = this;
      const query = {
        ak: queryString,
        colid: id,
        fixedcolumns: {
          whereKeys: self.getFixedColumns(self.itemdata)
        }
      };
      if (
        self.itemdata.precolnameslist
        && self.itemdata.precolnameslist.length > 0
      ) {
        query.fixedcolumns.precolnameslist = JSON.stringify(
          self.itemdata.precolnameslist
        );
      }
      query.fixedcolumns = JSON.stringify(query.fixedcolumns);
      const searchParam = new URLSearchParams();
      searchParam.append('ak', queryString);
      searchParam.append('colid', id);
      searchParam.append('fixedcolumns', query.fixedcolumns);
      this.service.common.fuzzyquerybyak(searchParam, { serviceId: self.itemdata.serviceId || 'r3-cp' }).then((res) => {
        self.queryList = res.data.data;

        if (res.data.data.length > 0) {
          cb(res.data.data);
        } else {
          cb([]);
        }
      });
    },
    autocompleteEnter(itemdata) {
      const self = this;
      if (self.autocomplete || self.isHandleSelect) {
        // 如果完成模糊查询，回车跳下一个输入框
        self.$emit('itemInputEnter', true);
        return;
      }
      self.autocompleteBlur(itemdata);
    },
    autocompleteBlur(itemdata) {
      const self = this;
      if (!this.isHandleSelect && !this.autocomplete) {
        if (this.queryList.length > 0) {
          // 模糊匹配成功（匹配到了值）
          itemdata.pid = this.queryList[0].id;
          itemdata.valuedata = this.queryList[0].value;
          this.$emit('getFkChooseItem', itemdata);
          $(`.item-filter .fkAutocomplete${itemdata.colname}`).css(
            'display',
            'none'
          );
          self.autocomplete = true;
          self.isHandleSelect = false;
        } else {
          // 模糊匹配失败
          // itemdata.valuedata = '';
          itemdata.pid = null;
          this.$emit('getFkChooseItem', itemdata);
        }
      }
    },

    inputKeyUp(str, event) {
      // 判断是否enter键，如果是，不清空模糊查询列表
      if (event.keyCode !== 13) {
        this.queryList = [];
        this.isHandleSelect = false;
        if (
          !this.autocomplete
          && str.valuedata !== ''
          && ((event.keyCode <= 57 && event.keyCode >= 48)
            || (event.keyCode <= 90 && event.keyCode >= 65))
        ) {
          // 如果完成模糊查询，回车跳下一个输入框
          $(`.item-filter .fkAutocomplete${str.colname}`).css(
            'display',
            'block'
          );
        }
        if (str.valuedata == '') {
          str.pid = '';
          this.$emit('getFkChooseItem', str);
        }
      }
    },
    filterInputName(item) {
      const self = this;
      // $(document).trigger('click')
      $('.admin-container').trigger('click');
      if (item.refcolval) {
        if (item.fkdisplay == 'drp' || item.fkdisplay == 'mrp') {
          self.getQueryClick(item, () => {
            self.popoverShow[item.colname] = true;
          });
        } else {
          // pop
          self.getQueryClick(item, () => {
            self.SingleSelect.show = true;
            self.SelectionData.item = item;
            self.getSelectConfig(item); // 获取单选框输入配置
            self.getSelectData(item); // 获取单选框表格数据
          });
        }
      } else if (item.fkdisplay == 'drp' || item.fkdisplay == 'mrp') {
        self.popoverShow[item.colname] = true;
        self.popoverShow = Object.assign({}, self.popoverShow);
      } else {
        // pop
        self.SingleSelect.show = true;
        self.SelectionData.item = item;
        self.getSelectConfig(item); // 获取单选框输入配置
        self.getSelectData(item); // 获取单选框表格数据
      }
    },
    getSelectConfig(item) {
      // 更新数据: SelectionData.config 弹出框输入配置
      const self = this;
      self.SelectionData.config = []; // 请求前清空旧数据
      let params = {
        tableid: item.reftableid,
        getcmd: 'n',
        table: item.reftable
      }
      this.service.common.getTableQuery(params, { serviceId: self.itemdata.serviceId || 'r3-cp' }).then((res) => {
        for (let i = 0; i < res.data.datas.dataarry.length; i++) {
          const element = res.data.datas.dataarry[i];
          element.value = '';
          if (element.display === 'OBJ_CHECK') {
            element.value = element.limitval === 'Y';
          }
          self.SelectionData.config.push(element);
        }
        // self.SelectionData.config = res.data.datas.dataarry
      });
    },
    getSelectData() {
      const self = this;
      const item = self.SelectionData.item;
      self.SelectionData.row = [];
      const searchdata = {
        refcolid: item.colid,
        isdroplistsearch: true,
        startindex: self.selectOperation.startindex,
        range: self.selectOperation.pageSize
      };
      if (self.hasQuery) {
        searchdata.fixedcolumns = self.selectConfigChanged;
      }
      this.service.common.QueryList(searchdata, { serviceId: self.itemdata.serviceId || 'r3-cp' }).then((res) => {
        self.SelectionData.tableAllDatas = res.data.datas;
        self.SelectionData.row = res.data.datas.row;
        self.SelectionData.thead = res.data.datas.tabth;
        self.selectOperation.page.totalRowCount = res.data.datas.totalRowCount;
      });
    },
    getHideColumn(itemdata) {
      const self = this;
      let hidden = false;
      if (itemdata.hidecolumn) {
        self.inputList.forEach((item) => {
          if (
            item.colname === itemdata.hidecolumn.refcolumn
            && item.valuedata !== itemdata.hidecolumn.refval
          ) {
            if (item.display === 'OBJ_DATENUMBER') {
              if (
                item.valuedata !== itemdata.hidecolumn.refval.replace(/-/g, '')
              ) {
                hidden = true;
              }
            } else {
              hidden = true;
            }
          }
        });
      }
      return hidden;
    },
    /* ------------------------ 入参处理 start  ------------------------ */
    /**
     * 处理请求QueryList的入参
     * @param {*} formData.item.itemdata 
     * @returns 
     * 1. 拼接'='：精准匹配
     */
    getFixedColumns(itemdata) {
      const self = this;
      let params = {};
      if (itemdata.refcolval) {
        const queryColumnsList = itemdata.refcolval.maintable
          ? this.objList
          : this.inputList; // 判断是主表关联字段还是子表关联字段（可以不需要 直接取inputList）
        queryColumnsList.forEach((item) => {
          if (item.childs) {
            item.childs.forEach((child) => {
              params = self.handleParamsFromInputList(child, itemdata);
            });
          } else if (item.child) {
            params = self.handleParamsFromInputList(item.child, itemdata);
          } else {
            params = self.handleParamsFromInputList(item, itemdata);
          }
        });
      }
      return params;
    },
    handleParamsFromInputList(inputList_item, itemdata) {
      const str = itemdata.refcolval ? (itemdata.refcolval.expre == 'equal' ? '=' : '') : '';
      let params = {};
      if (inputList_item.colname === itemdata.refcolval.srccol) {
        params[itemdata.refcolval.fixcolumn] = inputList_item.pid
          ? str + inputList_item.pid
          : str + inputList_item.refobjid;
      }
      return params
    },
    getQueryClick(itemdata, callback) {
      const self = this;
      const params = {};
      const tipsname = {};
      if (itemdata.refcolval) {
        const str = itemdata.refcolval.expre == 'equal' ? '=' : '';
        const queryColumnsList = itemdata.refcolval.maintable
          ? this.objList
          : this.inputList; // 判断是主表关联字段还是子表关联字段
        queryColumnsList.forEach((item) => {
          if (item.childs) {
            item.childs.forEach((child) => {
              if (child.colname === itemdata.refcolval.srccol) {
                if (child.isfk) {
                  params[itemdata.refcolval.fixcolumn] = child.pid && child.valuedata
                    ? str + child.pid
                    : str + child.refobjid;

                  if (!child.pid && !child.valuedata) {
                    params[itemdata.refcolval.fixcolumn] = null;
                  }
                  // params[itemdata.refcolval.fixcolumn] = child.pid
                  tipsname[itemdata.refcolval.fixcolumn] = child;
                } else {
                  params[itemdata.refcolval.fixcolumn] = child.valuedata
                    ? str + child.valuedata
                    : null;

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
                params[itemdata.refcolval.fixcolumn] = item.child.pid && item.child.valuedata
                  ? str + item.child.pid
                  : str + item.child.refobjid;

                if (!item.child.pid && !item.child.valuedata) {
                  params[itemdata.refcolval.fixcolumn] = null;
                }
                // params[itemdata.refcolval.fixcolumn] = item.child.pid
                tipsname[itemdata.refcolval.fixcolumn] = item.child;
              } else {
                params[itemdata.refcolval.fixcolumn] = item.child.valuedata
                  ? str + item.child.valuedata
                  : null;

                if (!item.child.valuedata) {
                  params[itemdata.refcolval.fixcolumn] = null;
                }
                // params[itemdata.refcolval.fixcolumn] = item.child.pid
                tipsname[itemdata.refcolval.fixcolumn] = item.child;
              }
            }
          } else {
            // 添加到明细输入框

            if (item.colname === itemdata.refcolval.srccol) {
              if (item.isfk) {
                params[itemdata.refcolval.fixcolumn] = item.pid && item.valuedata
                  ? str + item.pid
                  : str + item.refobjid;

                if (!item.pid && !item.valuedata) {
                  params[itemdata.refcolval.fixcolumn] = null;
                }
                tipsname[itemdata.refcolval.fixcolumn] = item;
              } else {
                params[itemdata.refcolval.fixcolumn] = item.valuedata
                  ? str + item.child.valuedata
                  : null;

                if (!item.valuedata) {
                  params[itemdata.refcolval.fixcolumn] = null;
                }
                tipsname[itemdata.refcolval.fixcolumn] = item.child;
              }
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
            // $('.el-autocomplete.'+tipsname[key].colname).find('input').focus()
          });
        }
      }

      return tipsname;
    },

    /* ------------------------ 入参处理 start  ------------------------ */

    selectionQueryTable() {
      const self = this;
      self.getSelectData('query');
    }
  }
};

