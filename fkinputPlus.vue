<!--
 * @Author: zhou.l
 * @Date: 2021-05-19 15:56:14
 * @LastEditTime: 2021-06-01 17:37:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /burgeon-business-components/fkinputPlus.vue
-->
<template>
  <div class="item-input item-col">
    <label v-if="itemdata.name" class="title">
      <i v-if="itemdata.isnotnull">*</i>
      {{ itemdata.name }}：
    </label>
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
      :data="data"
      :totalRowCount="totalRowCount"
      :pageSize="pageSize"
      :showColnameKey="'show'"
      @on-page-change="changePage"
      @on-input-value-change="InputValueChange"
      :dataEmptyMessage="dataEmptyMessage"
      :columns="columns"
      :AutoData="AutoData"
    >
    </DropMultiSelectFilter>
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
      // 单选弹出框数据操作
      selectCurrentPage: 2,
      popoverShow: {},
      autocomplete: false,
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
  computed: {
    /* data() {
      return this.itemdata.data;
    },
    totalRowCount() {
      return this.itemdata.totalRowCount;
    }, 
    pageSize() {
      return this.itemdata.pageSize;
    },
    dataEmptyMessage() {
      return this.itemdata.dataEmptyMessage || '数据加载中...';
    },
    columns() {
      return this.itemdata.columns || []; // 展现的组 ? ? ?
    },
    AutoData() {
      return this.itemdata.AutoData;
    },
    showColnameKey() {
      return this.itemdata.showColnameKey || 'show';
    },
    columnsKey() { // 模糊搜索时要展示的待选数据的Key/表头
      return this.itemdata.columnsKey || [];
    },
    hidecolumns() { // 模糊搜索时要隐藏的待选数据的Key/表头
      return this.itemdata.hidecolumns || [];
    },
    placeholder() {
      return this.itemdata.placeholder || '';
    },
    defaultSelected() {
      return this.itemdata.defaultSelected || [];
    },
    disabled() {
      return this.itemdata.disabled;
    },
    isBackRowItem() {
      return this.itemdata.isBackRowItem;
    },
    pageIndex() {
      return this.itemdata.pageIndex || 0;
    },
    className() {
      return this.itemdata.className || '';
    }, */
  },
  watch: {
    itemdata: {
      handler(val, oldVal) {
        if (val.pid || val.valuedata) {
          this.defaultSelected = [{ ID: val.pid, Label: val.valuedata }];
        }
        if (val.isuppercase && val.valuedata) {
          val.valuedata = val.valuedata.toString().toUpperCase();
        }
      },
      deep: true
    },
  },
  mounted() {
    this.$nextTick(() => {
      if (this.itemdata.pid || this.itemdata.valuedata) {
        this.defaultSelected = [{ ID: this.itemdata.pid, Label: this.itemdata.valuedata }];
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
      const query = this.handelParam();
      const {
        data: { code, data, message },
      } = await axios.post("/r3-cp/p/cs/QueryList", query);
      if (code == 0) {
        const { row, tabth, totalRowCount } = data;
        tabth.map(it => it.isak && (it.show = true));
        this.data = {
          "start": 0,
          row,
          tabth,
        };
        this.totalRowCount = totalRowCount;
      }
    },
    async getFuzzySelectData(val) {
      const query = this.handelFuzzyParam(val);
      const {
        data: { code, data, message },
      } = await axios.post("/r3-cp/p/cs/fuzzyquerybyak", query);
      if (code == 0) {
        data.forEach((item) => {
          item.value = item[this.itemdata.columnsKey[0]] || item.value; // 模糊搜索失焦/选中后展示在input中的字符
        });
        this.AutoData = data;
      }
    },

    /* ------------------- DropMultiSelectFilter组件事件 start  ------------------- */
    fkrpselected(val) {
      if (this.itemdata.fkdisplay == 'drp') {
        this.itemdata.pid = val[0].ID;
        this.itemdata.valuedata = val[0].Label;
        if (this.isBackRowItem) {
          this.$emit('getFkChooseItem', val[0]);
        } else {
          this.$emit('getFkChooseItem', this.itemdata);
        }
      } else {

      }
    },
    InputValueChange(val) {
      this.isFuzzy = true;
      this.getFuzzySelectData(val);
    },
    changePage(val) {
      this.pageIndex = val;
      this.getSelectData();
    },
    blur() {
      // 失焦：模糊搜索的选中、clear都会先走失焦
      if (this.isFuzzy) {
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
          this.itemdata.pid = null;
          this.itemdata.valuedata = null;
          if (this.isBackRowItem) {
            this.$emit('inputBlur', {});
          } else {
            this.$emit('inputBlur', this.itemdata);
          }
        }
      } else {
        console.log('not fuzzy blur');
      }
    },
    clear() {
      this.itemdata.pid = null;
      this.itemdata.valuedata = null;
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
      if (e.keyCode == 13 && (this.itemdata.pid || this.itemdata.valuedata)) {
        this.$emit('getFkChooseItem', this.itemdata);
      }
    },
    popperShow() {
      this.getSelectData()
      // this.$emit('getFkChooseItem', val);
    },
    /* ------------------- DropMultiSelectFilter组件事件 end  ------------------- */
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
