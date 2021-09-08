<!--
 * @Author: zhou.l
 * @Date: 2021-05-19 15:56:14
 * @LastEditTime: 2021-06-07 15:32:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /burgeon-business-components/fkinputPlus.vue
-->
<template>
  <div class="item-input item-col">
    <label v-if="itemdata.name && itemdata.notForm" class="title">
      <i v-if="itemdata.isnotnull">*</i>
      {{ itemdata.name }}：
    </label>
    <Tooltip
      :placement="itemdata.placement || 'bottom'"
      :max-width="itemdata.maxwidth || 200"
      :content="itemdata.valuedata"
      :disabled="itemdata.istooltip ? !itemdata.valuedata : true"
      theme="light"
      class="fk-tooltip"
    >
      <DropDownSelectFilter
        v-if="itemdata.fkdisplay === 'drp'"
        :single="true"
        :data="data"
        :totalRowCount="totalRowCount"
        :showColnameKey="'show'"
        :pageSize="pageSize"
        @on-page-change="changePage"
        @on-input-value-change="InputValueChange"
        @on-fkrp-selected="fkrpselected"
        @on-blur="blur"
        @on-clear="clear"
        @on-popper-show="popperShow"
        @on-keyup="keyup($event)"
        :dataEmptyMessage="dataEmptyMessage"
        :columns="columns"
        :AutoData="AutoData"
        :columnsKey="columnsKey"
        :hidecolumns="hidecolumns"
        :placeholder="placeholder"
        :defaultSelected="defaultSelected"
        :isBackRowItem="isBackRowItem"
        :className="className"
        transfer
      >
      </DropDownSelectFilter>
      <DropMultiSelectFilter
        v-else-if="itemdata.fkdisplay === 'mrp'"
        :single="itemdata.single"
        :data="data"
        :totalRowCount="totalRowCount"
        :pageSize="pageSize"
        :columnsKey="itemdata.columnsKey"
        :hidecolumns="itemdata.hidecolumns"
        :showColnameKey="'show'"
        :placeholder="itemdata.placeholder || ''"
        :disabled="itemdata.disabled"
        :isBackRowItem="itemdata.isBackRowItem"
        :className="itemdata.className"
        @on-page-change="changePage"
        @on-input-value-change="InputValueChange"
        @on-fkrp-selected="fkrpselected"
        @on-blur="blur"
        @on-clear="clear"
        @on-popper-show="popperShow"
        @on-keyup="keyup($event)"
        :dataEmptyMessage="dataEmptyMessage"
        :defaultSelected="itemdata.defaultSelectedMrp || []"
        :columns="columns"
        :AutoData="AutoData"
        transfer
      >
      </DropMultiSelectFilter>
    </Tooltip>
  </div>
</template>

<script>
// import objinput_dz from "./js/fkinput.js";
// export default objinput_dz;
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
      inputVal: '',
      isFuzzy: false,
      fuzzyQueryList: [],
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
      isHandleSelect: false,
      autocomplete: false,
      // 单选弹出框数据操作
      selectCurrentPage: 2,
      popoverShow: {},
      enter: {
        time: 0
      },
      valuedata: this.itemdata.valuedata || '',
      pid: this.itemdata.pid || '',
      data: this.itemdata.data || {},
      totalRowCount: this.itemdata.totalRowCount || 0,
      pageSize: this.itemdata.pageSize,
      dataEmptyMessage: this.itemdata.dataEmptyMessage || '数据加载中...',
      columns: this.itemdata.columns || [], // 展现的组 ? ? ?
      AutoData: this.itemdata.AutoData,
      showColnameKey: this.itemdata.showColnameKey || 'show',
      columnsKey: this.itemdata.columnsKey || [],// 模糊搜索时-选中/失焦-要展示在input框的待选数据的Key，默认AutoData中的value
      hidecolumns: this.itemdata.hidecolumns || [],// 模糊搜索时要隐藏的待选数据的Key/表头
      placeholder: this.itemdata.placeholder || '',
      defaultSelected: this.itemdata.defaultSelected || [],
      disabled: this.itemdata.disabled,
      isBackRowItem: this.itemdata.isBackRowItem,
      pageIndex: this.itemdata.pageIndex || 0,
      className: this.itemdata.className || '',
    }
  },
  computed: {},
  watch: {
    itemdata: {
      handler(val, oldVal) {
        // if (val.pid || val.valuedata) { // 存在赋空值的情况
        if (this.itemdata.fkdisplay == 'drp') {
          this.defaultSelected = [{ ID: val.pid, Label: val.valuedata }];
        }
        // }
        if (val.isuppercase && val.valuedata) {
          val.valuedata = val.valuedata.toString().toUpperCase();
        }
      },
      deep: true
    },
  },
  created() {
    if (this.itemdata.fkdisplay == 'mrp') {
      if (!this.itemdata.pid) return
      if (this.itemdata.defaultSelectedMrp.length) return
      const formItem = this.deepClone(this.itemdata);
      const ids = formItem.pid.split(',');
      const values = formItem.valuedata.split(',');
      formItem.defaultSelectedMrp = [];
      ids.forEach((it, index) => {
        const item = { ID: it, Label: values[index] }
        formItem.defaultSelectedMrp.push(item);
      })
      this.itemdata.defaultSelectedMrp = formItem.defaultSelectedMrp;
      this.$set(this.itemdata, 'defaultSelectedMrp', formItem.defaultSelectedMrp)
    }
  },
  mounted() {
    this.$nextTick(() => {
      if (this.itemdata.pid || this.itemdata.valuedata) {
        if (this.itemdata.fkdisplay == 'drp') {
          this.defaultSelected = [{ ID: this.itemdata.pid, Label: this.itemdata.valuedata }];
        } else if (this.itemdata.fkdisplay == 'mrp') {
          // const ids = this.itemdata.pid.split(',');
          // const values = this.itemdata.valuedata.split(',');
          // console.log(ids);
          // this.itemdata.defaultSelected = [];
          // ids.forEach((it, index) => {
          //   const item = { ID: it, Label: values[index] }
          //   this.itemdata.defaultSelected.push(item);
          // })
          // this.$set(this.itemdata, 'defaultSelected', this.itemdata.defaultSelected)
        }
      }
    })
  },
  methods: {
    /* ------------------------ 入参处理 start  ------------------------ */
    handelFixedcolumns() { },
    handelParam() {
      const query = new FormData();
      const startindex = !this.pageIndex ? 0 : (this.pageIndex - 1) * 10; // 起始条数
      const search = {
        isdroplistsearch: true,
        refcolid: this.itemdata.colid,
        fixedcolumns: {},
        startindex,
        range: 10,
      };
      query.append("searchdata", JSON.stringify(search));
      return query
    },
    handelFuzzyParam(val) {
      const formdata = new FormData();
      formdata.append("ak", val.trim());
      formdata.append("colid", this.itemdata.colid);
      formdata.append("fixedcolumns", JSON.stringify({ whereKeys: {} }));
      return formdata
    },
    /* ------------------------ 入参处理 end  ------------------------ */
    /**
     * 填充气泡表格数据
     * @val {Number} val 当前页数 / 输入的关键字
     */
    async getSelectData() {
      if (this.itemdata.isCustom) {
        this.getPopData(0);
        return
      }
      const query = this.handelParam();
      const { serviceId } = this.itemdata
      const version = this.version || this.itemdata.version || '1.3'; // 默认1.3,兼容斯凯奇
      const result = await this.service.common.QueryList(query, serviceId ? { serviceId } : 0);
      if (result.data.code == 0) {
        const { row, tabth, totalRowCount } = version == '1.4' ? result.data.data : result.data.datas
        tabth.map(it => it.isak && (it.show = true));
        this.data = {
          "start": 0,
          row,
          tabth,
        };
        this.totalRowCount = totalRowCount;
      }
    },
    handleCusParam() {
      this.$emit('pop-show-before', this.itemdata);
    },
    // 不走queryList，走自定义接口，接口格式如：(商品特殊策略-详情-半定制明细-SKU/SPU编码)
    async getPopData(isFuzzy, callback = this.handleCusParam) {
      callback();
      const ApiUrl = this.itemdata.api.split('.');
      const { data: { data, code } } = await this.service[ApiUrl[0]][ApiUrl[1]](this.itemdata.params);
      let rowDa = [], tabthDa = [];
      if (code == 0) {
        const { row, tabth, totalRowCount } = data;
        row.length && row.map(it => {
          let obj = {};
          for (const key in it) {
            obj[key] = { 'val': it[key] }
          }
          rowDa.push(obj)
        });
        tabth.length && tabth.map(it => {
          let ob = {};
          for (const key in it) {
            ob.colname = key;
            ob.name = it[key];
            ob.show = key == this.itemdata.columnsKey[0]; // 选中后要展示的key
          }
          tabthDa.push(obj)
        });
        if (isFuzzy) {
          rowDa.length && rowDa.forEach((item) => {
            item.value = this.itemdata.columnsKey ? item[this.itemdata.columnsKey[0]] : '未设置columnsKey'; // 模糊搜索失焦/选中后展示在input中的字符
          });
          this.AutoData = rowDa;
        } else {
          this.data = {
            "start": 0,
            row: rowDa,
            tabth: tabthDa,
          };
          this.totalRowCount = totalRowCount;
        }
      }
    },
    async getFuzzySelectData(val) {
      if (this.itemdata.isCustom) {
        this.getPopData(1);
        return
      }
      const query = this.handelFuzzyParam(val);
      const { version, serviceId } = this.itemdata
      const {
        data: { code, data, message },
      } = await this.service.common.fuzzyquerybyak(query, serviceId ? { serviceId } : 0);
      if (code == 0) {
        data.forEach((item) => {
          item.value = this.itemdata.columnsKey ? item[this.itemdata.columnsKey[0]] : item.value; // 模糊搜索失焦/选中后展示在input中的字符
        });
        this.AutoData = data;
      }
    },

    /* ------------------- DropMultiSelectFilter组件事件 start  ------------------- */
    fkrpselected(val) {
      this.isHandleSelect = true;
      if (this.itemdata.fkdisplay == 'drp') {
        this.itemdata.pid = val[0].ID;
        this.itemdata.valuedata = val[0].Label;
        if (this.isBackRowItem) {
          this.$emit('getFkChooseItem', val[0]);
        } else {
          this.$emit('getFkChooseItem', this.itemdata);
        }
      } else {
        this.itemdata.pid = '';
        this.itemdata.valuedata = '';
        val.forEach((it) => {
          this.itemdata.pid += `${it.ID},`;
          this.itemdata.valuedata += `${it.Label},`;
        })
        this.itemdata.pid = this.itemdata.pid.replace(/,$/, '');
        this.itemdata.valuedata = this.itemdata.valuedata.replace(/,$/, '');
        this.itemdata.defaultSelectedMrp = val;
        if (this.isBackRowItem) {
          this.$emit('getFkChooseItem', val);
        } else {
          this.$emit('getFkChooseItem', this.itemdata);
        }
      }
    },
    InputValueChange(val) {
      this.isFuzzy = true;
      if (!val) return
      this.inputVal = val;
      this.$emit('inputChange', val);
      this.getFuzzySelectData(val);
    },
    changePage(val) {
      this.pageIndex = val;
      this.getSelectData();
    },
    blur() {
      // 失焦：模糊搜索的选中、clear都会先走失焦
      if (this.isFuzzy && !this.isHandleSelect) {
        console.warn('fuzzy blur，模糊搜索失去焦点了，自行处理！');
        setTimeout(() => {
          if (this.itemdata.pid && this.itemdata.valuedata) { // 假装已经走了选中事件
            return
          } else {
            if (this.AutoData.length) {
              const val = this.AutoData;
              this.itemdata.pid = val[0].ID;
              this.itemdata.valuedata = val[0].value;
              this.defaultSelected = [{ ID: val[0].ID, Label: val[0].value }];
              if (this.isBackRowItem) {
                this.$emit('inputBlur', val[0]);
              } else {
                this.$emit('inputBlur', this.itemdata);
              }
            } else {
              console.warn('模糊搜索未查询到数据！');
              this.itemdata.pid = '';
              this.itemdata.valuedata = '';
              if (this.isBackRowItem) {
                this.$emit('inputBlur', {});
              } else {
                this.$emit('inputBlur', this.itemdata);
              }
            }
          }
          this.isHandleSelect = false;
        }, 3000);
      } else {
        console.warn('not fuzzy blur');
      }
    },
    clear() {
      this.itemdata.pid = '';
      this.itemdata.valuedata = '';
      this.inputVal = '';
      this.AutoData = []; // clear之后，仅聚焦无任何操作又了赋值的bug
      this.$emit('inputClear', this.itemdata);
      if (this.isBackRowItem) {
        this.$emit('getFkChooseItem', {});
      } else {
        this.$emit('getFkChooseItem', this.itemdata);
      }
    },
    keyup(e) {
      // 判断是否enter键，如果是，不清空模糊查询列表
      /* if (event.keyCode !== 13) {
        this.queryList = [];
        if (this.itemdata.valuedata !== ''
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
      } */
      if (e.keyCode == 13) {
        if (this.itemdata.pid || this.itemdata.valuedata) {
          this.$emit('getFkChooseItem', this.itemdata);
        }
        this.$emit('inputEnter', inputVal);
      }
    },
    popperShow() {
      this.getSelectData()
      // this.$emit('getFkChooseItem', val);
    },
    /* ------------------- DropMultiSelectFilter组件事件 end  ------------------- */
    /**
     * 获取两个数组对象的并集
     * @param obj  拷贝的数据源
     */
    deepClone(obj) {
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
  },
}
</script>

<style scoped lang="less">
@import "css/fkinput.less";
.item-col {
  /deep/ #dropDownSelectFilter.ark-fkrp-select {
    & > div:first-child {
      width: 100%;
    }
  }
}
</style>
