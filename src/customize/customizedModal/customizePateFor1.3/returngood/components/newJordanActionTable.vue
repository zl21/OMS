<template>
  <div class="jordan-table-box">
    <div
      v-if="jordanFormConfig !== undefined"
      class="jordanForm-box"
    >
      <jordanForm :form-config="jordanFormConfig" />
    </div>
    <div
      v-if="jordanBtnConfig !== undefined"
      class="jordanBtns-box"
    >
      <jordanBtn
        style="margin-top:10px;"
        :btn-config="jordanBtnConfig"
      />
    </div>

    <keep-alive>
      <component
        :is="currentView"
        :ref="currentView"
        :component-data="componentData"
      />
    </keep-alive>
    <div class="page-box">
      <div class="page-box-left">
        <div
          v-show="pageShow"
          class="page_content"
        >
          <p class="page-allSizes">
            共 {{ total }} 条
          </p>
          <Page
            class="page-pages"
            :total="total"
            :current="current"
            :page-size="pageSize"
            :page-size-opts="pageSizeOpts"
            show-elevator
            show-sizer
            :transfer="true"
            @on-change="pageChange"
            @on-page-size-change="onPageSizeChange"
          />
        </div>
        <div class="page-btns">
          <button
            v-show="isShowRefreshBtn"
            class="deleteDetail"
            @click="tableRefreshDetail"
          >
            【刷新】
          </button>
          <button
            v-show="isShowAddDetailBtn"
            class="deleteDetail"
            @click="tableAddDetail"
          >
            【新增明细】
          </button>
          <button
            v-show="isShowDeleteDetailBtn"
            class="deleteDetail"
            @click="tableDeleteDetail"
          >
            【删除明细】
          </button>
          <button
            v-show="isShowImportBtn"
            class="import"
            @click="tableImport"
          >
            【导入】
          </button>
          <button
            v-show="isShowExportBtn"
            class="export"
            @click="tableExport"
          >
            【导出】
          </button>
        </div>
      </div>
      <Input
        v-show="searchInputShow"
        v-model="searchInputValue"
        class="page-input"
        placeholder
        style="width: 220px;"
        @on-enter="searchOnEnter"
        @on-change="searchOnChange"
      />
      <span
        v-if="isSearchText"
        slot="prepend"
      >搜索</span>
      <Select
        v-if="!isSearchText"
        slot="prepend"
        v-model="searchSelectValue"
        :label-in-value="true"
        size="small"
        :transfer="true"
        style="width: 80px"
        @on-change="searchSelectOnChange"
      >
        <Option
          v-for="(item,index) in searchSelectList"
          :key="index"
          :value="item.value"
        >
          {{ item.label }}
        </Option>
      </Select>
      <Button
        slot="append"
        icon="ios-search"
        @click="searchOnEnter"
      />
      </Input>
    </div>
    <Table
      ref="selections"
      class="jordan-table"
      :columns="columns"
      :draggable-method="draggableMethod"
      :data="data"
      :total-data="totalData"
      :border="border"
      :height="height"
      :width="width"
      :loading="loading"
      :highlight-row="highlightRow"
      :row-class-name="rowClassName"
      :no-data-text="noDataText"
      @on-current-change="onCurrentChange"
      @on-select="onSelect"
      @on-select-cancel="onSelectCancel"
      @on-select-all="onSelectAll"
      @on-select-all-cancel="onSelectAllCancel"
      @on-row-click="onRowClick"
      @on-row-dblclick="onRowDblclick"
    />
    <!-- @on-drag-drop="onDragDrop" -->
    <div>
      <slot name="tableFooter" />
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import jordanBtn from './newJordanButton';
  import jordanForm from './jordanForm';

  const _import = file => require(`@/jordanComponents/views/${file}.vue`).default;

  export default {
    components: {
      jordanBtn,
      jordanForm
    },
    props: {
      jordanTableConfig: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        // 输入框文字
        searchInputValue: '',
        // 输入框前搜索select
        searchSelectValue: '',
        // 动态渲染插槽组件
        currentView: null,
        noDataText: '当前为大数据表，请先设置查询条件进行查询！'
      };
    },
    computed: {
      // 是否自动换行
      // ellipsis() {
      //   console.log(this.jordanTableConfig.ellipsis);
      //   return this.jordanTableConfig.ellipsis;
      // },
      // 是否高亮
      highlightRow() {
        let highlightRow = Boolean;
        if (this.jordanTableConfig.highlightRow === undefined) {
          highlightRow = true;
        } else {
          highlightRow = this.jordanTableConfig.highlightRow;
        }
        return highlightRow;
      },
      // 搜索框前文字
      isSearchText() {
        return this.jordanTableConfig.isSearchText;
      },
      // 搜索框前搜索数组
      searchSelectList() {
        if (!this.jordanTableConfig.searchSelectList) {
          this.jordanTableConfig.searchSelectList = [];
        }
        return this.jordanTableConfig.searchSelectList;
      },
      // 表头显示数据
      columns() {
        const columnsData = [...this.jordanTableConfig.columns];
        if (this.jordanTableConfig.indexColumn) {
          // 是否存在序号列
          columnsData.unshift({
            title: '序号',
            key: 'index',
            align: 'left',
            fixed: 'left',
            width: 40,
            // renderHeader: (h, params) => h("div","序号"),
            render: (h, params) => h(
              'span',
              {
                style: {
                  color: '#0f8ee9'
                }
              },
              params.index + 1
            )
          });
        }
        if (this.jordanTableConfig.isShowSelection) {
          // 是否存在多选
          columnsData.unshift({
            type: 'selection',
            align: 'center',
            fixed: 'left',
            width: 30
          });
        }
        if (this.jordanTableConfig.isShowAction) {
          // 是否存在多选
          columnsData.push({
            title: 'Action',
            key: 'action',
            align: 'center',
            fixed: 'right',
            width: 50,
            renderHeader: (h, params) => h('span', '操作')
          });
        }
        // 判断是否存在自定义列
        if (this.renderArr.length > 0) {
          this.jordanTableConfig.renderArr.map((newItem, newIndex) => {
            columnsData.forEach((oldItem) => {
              if (oldItem.key === newItem.key) {
                oldItem.render = newItem.render;
                (oldItem.ellipsis = newItem.ellipsis === undefined ? true : newItem.ellipsis),
                (oldItem.width = newItem.width);
              }
            });
          });
        }
        // console.log(new Date(), "组件列");
        return columnsData;
      },
      // 自定义列
      renderArr() {
        if (!this.jordanTableConfig.renderArr) {
          this.jordanTableConfig.renderArr = [];
        }
        return this.jordanTableConfig.renderArr;
      },
      // 表格显示数据
      data() {
        if (!this.jordanTableConfig.data) {
          this.jordanTableConfig.data = [];
        }
        // console.log(new Date(), "组件data");
        return this.jordanTableConfig.data;
      },

      totalData() { // 孙乾添加合计数据
        if (!this.jordanTableConfig.totalData) {
          this.jordanTableConfig.totalData = [];
        }
        return this.jordanTableConfig.totalData;
      },
      // 是否显示纵向边框
      border() {
        return this.jordanTableConfig.border;
      },
      // 控制分页是否显示
      pageShow() {
        return this.jordanTableConfig.pageShow;
      },
      // 控制操作按钮是否显示
      btnsShow() {
        return this.jordanTableConfig.btnsShow;
      },
      // 控制是否显示新增明细
      isShowAddDetailBtn() {
        return this.jordanTableConfig.isShowAddDetailBtn;
      },
      // 控制是否显示刷新按钮
      isShowRefreshBtn() {
        return this.jordanTableConfig.isShowRefreshBtn;
      },
      // 控制是否显示删除明细
      isShowDeleteDetailBtn() {
        return this.jordanTableConfig.isShowDeleteDetailBtn;
      },
      // 控制是否显示导入
      isShowImportBtn() {
        return this.jordanTableConfig.isShowImportBtn;
      },
      // 控制是否显示导出
      isShowExportBtn() {
        return this.jordanTableConfig.isShowExportBtn;
      },
      // 控制搜索框是否显示
      searchInputShow() {
        return this.jordanTableConfig.searchInputShow;
      },
      // 表格宽度
      width() {
        return this.jordanTableConfig.width;
      },
      // 表格高度
      height() {
        return this.jordanTableConfig.height;
      },
      // 数据总数
      total() {
        if (!this.jordanTableConfig.total) {
          this.jordanTableConfig.total = 0;
        }
        return this.jordanTableConfig.total;
      },
      // 是否加载中
      loading() {
        return this.jordanTableConfig.loading;
      },
      // 是否是大数据表
      // noDataText() {
      //   return this.jordanTableConfig.isBigDataTable ? '当前为大数据表，请先设置查询条件进行查询！' : '';
      // },
      // 每页条数切换的配置
      pageSizeOpts() {
        if (!this.jordanTableConfig.pageSizeOpts) {
          this.jordanTableConfig.pageSizeOpts = [10, 20, 30, 40];
        }
        return this.jordanTableConfig.pageSizeOpts;
      },
      // 每页条数
      pageSize() {
        if (!this.jordanTableConfig.pageSize) {
          this.jordanTableConfig.pageSize = 20;
        }

        return this.jordanTableConfig.pageSize;
      },
      // 页数
      current() {
        if (!this.jordanTableConfig.current) {
          this.jordanTableConfig.current = 1;
        }
        return this.jordanTableConfig.current;
      },
      // 是否产生拖拽
      draggable() {
        return this.jordanTableConfig.draggable;
      },
      // 表单配置文件
      jordanFormConfig() {
        return this.jordanTableConfig.jordanFormConfig;
      },
      // 按钮配置文件
      jordanBtnConfig() {
        return this.jordanTableConfig.jordanBtnConfig;
      },
      // // 请求链接
      // searchUrl() {
      //   return this.jordanTableConfig.searchUrl;
      // },
      // // 请求搜索json
      // searchObject() {
      //   return this.jordanTableConfig.searchObject;
      // },
      //   // 请求搜索方法
      // searchMethod() {
      //   return this.jordanTableConfig.searchMethod;
      // },
      name() {
        return this.jordanTableConfig.name;
      },
      url() {
        return this.jordanTableConfig.url;
      },
      componentData() {
        return this.jordanTableConfig.componentData;
      }
    },
    mounted() {
      const _self = this;
      if (!_self.url && !_self.name) {
      } else {
        const componentName = _self.name;
        Vue.component(componentName, Vue.extend(_import(_self.url)));
        _self.currentView = componentName;
      }
      
      if (_self.jordanTableConfig.isBigData && _self.jordanTableConfig.data.length === 0) {
        this.noDataText = '当前为大数据表，请先设置查询条件进行查询！';
        const img = document.createElement('img');
        img.setAttribute('src', '../../../static/img/big-data-icon.png');
        $(_self.$children[3].$refs.body).find('div')[0].prepend(img);
      }
    },
    updated() {
      if (this.jordanTableConfig.isBigData && this.jordanTableConfig.data.length === 0) {
        this.noDataText = '暂无数据';
      }
    },
    methods: {
      // 行样式修改
      rowClassName(row, index) {
        if (row.isGray) { // 订单中心详情-订单明细行背景置灰
          return 'table-gray-row';
        }
        if (row.isColorGray) { // 订单中心列表-已取消/系统作废行的字体颜色置灰
          return 'color-gray-row';
        }
        if (row.isOutOfStock) { // 订单中心详情-订单明细行缺货字体置红
          return 'color-red-row';
        }
        return '';
      },
      // 分页change 事件
      pageChange(val) {
        this.$emit('on-page-change', val);
      },
      // 切换分页条数
      onPageSizeChange(val) {
        this.$emit('on-page-size-change', val);
      },
      // 拖拽函数回调，返回当前拖拽完成后的表头
      draggableMethod(columns) {
        // console.log(columns.length)
        this.$emit('on-drag-drop', columns);
      },
      // 选中某一项时触发
      onSelect(selection, row) {
        // console.log(selection,row)
        this.$emit('on-select', selection, row);
      },
      // 取消选中某一项时触发
      onSelectCancel(selection, row) {
        this.$emit('on-select-cancel', selection, row);
      },
      // 点击全选时触发
      onSelectAll(selection) {
        this.$emit('on-select-all', selection);
      },
      // 点击取消全选时触发
      onSelectAllCancel(selection) {
        this.$emit('on-select-all-cancel', selection);
      },

      // 单击某一行时触发
      onRowClick(row, index) {
        this.$refs.selections.toggleSelect(index);
        this.$emit('on-row-click', row, index);
      },
      // 单击某二行时触发
      onRowDblclick(row, index) {
        this.$emit('on-row-dblclick', row, index);
      },
      // 单选某一行
      onCurrentChange(currentRow, oldCurrentRow) {
        this.$emit('on-current-change', currentRow, oldCurrentRow);
      },
      // 刷新按钮
      tableRefreshDetail() {
        this.$emit('table-refresh-detail');
      },
      // 删除明细
      tableDeleteDetail() {
        this.$emit('table-delete-detail');
      },
      // 新增明细
      tableAddDetail() {
        this.$emit('table-add-detail');
      },
      // 导入
      tableImport() {
        // this.$children.find(item => item.name === "importTable").openConfirm();
        this.$emit('table-import');
      },
      // 导出
      tableExport() {
        this.$emit('table-export');
      },
      // input 按下回车键时触发
      searchOnEnter(event, vm) {
        this.$emit('search-on-enter', this.searchInputValue, event, vm);
      },
      // input 	数据改变时触发
      searchOnChange(event, vm) {
        this.$emit('search-on-change', this.searchInputValue, event, vm);
      },
      // 选择框 change事件
      searchSelectOnChange(item) {
        this.$emit('search-select-on-ohange', this.searchSelectValue, item);
      }
    }
  };
</script>

<style lang="less">
  .jordan-table-box {
    height: 100%;
    .ark-table-border td,
    .ark-table-border th {
      border-right: none !important;
    }
    .ark-table-cell {
      // padding-left: 10px !important;
    }
    // .ark-table-fixed{
    //   width: 75px !important;
    // }
    // .ark-table-cell-with-selection{
    //   padding-right: 0px !important;
    // }
    .ark-table-fixed, .ark-table-fixed-right {
      position: absolute;
      top: 0;
      left: 0;
      box-shadow: 1px 0 0 0 #e8eaec;
      z-index: 5;
      background-color: #fff;
    }
    .ark-table-fixed-body {
      .ark-table-column-center {
        border-right: none !important;
        padding-right: 0px !important;
      }
    }
    .ark-input-group-append,
    .ark-input-group-prepend {
      padding: 2px 7px !important;
    }
    .ark-table-wrapper > .ark-spin-fix {
      z-index: 1000 !important;
    }
    .ark-page-item {
      min-width: 26px !important;
      height: 26px !important;
      line-height: 26px !important;
    }
    .ark-page-options-elevator input {
      height: 26px !important;
      line-height: 26px !important;
      border-radius: 4px !important;
    }
    .ark-page-options-sizer .ark-select-selection {
      height: 26px !important;
      line-height: 26px !important;
      border-radius: 4px !important;
    }
    .ark-page-options-sizer .ark-select {
      height: 26px !important;
      line-height: 26px !important;
      border-radius: 4px !important;
    }

    .ark-page-options-sizer .ark-select-selected-value {
      height: 26px !important;
      line-height: 26px !important;
    }
    .ark-select-single .ark-select-selection .ark-select-placeholder,
    .ark-select-single
    .ark-select-selection
    .ark-select-selected-value {
      height: 26px !important;
      line-height: 26px !important;
    }
    .ark-page-prev {
      min-width: 26px !important;
      height: 26px !important;
      line-height: 26px !important;
    }
    .ark-page-next {
      min-width: 26px !important;
      height: 26px !important;
      line-height: 26px !important;
    }
    .ark-input {
      box-sizing: border-box !important;
    }
    .ark-table-wrapper {
      margin-top: 8px;
    }
    .jordan-table-box .jordanForm-box {
      background-color: #eee;
      /*padding: 0px 0px 18px 0px;*/
    }
    .jordan-table-box .jordanForm-box .jordanForm_a {
      height: 100%;
      padding-bottom: 4px;
    }
    .page-box {
      display: flex;
      align-items: center;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-between;
      padding-top: 8px;
      .page-box-left {
        display: flex;
        align-items: center;
        flex-direction: row;
        flex-wrap: wrap;
      }
      .ark-page-options-elevator input {
        box-sizing: border-box !important;
      }

      .page_content {
        display: flex;
        align-items: center;
        flex-direction: row;

        .page-allSizes {
          margin-right: 6px;
        }
      }
      .page-btns {
        margin-left: 10px;
        button {
          color: #20a0ff;
          font-size: 12px;
          background-color: white;
        }
      }
      .page-input {
        margin-left: 4px;
        justify-content: flex-end;
      }
    }
    .ark-table .table-gray-row td{
      background: #f1f1f1 !important;
    }
    .ark-table .color-gray-row td{
      color: #c5c5c5 !important;
    }
    .ark-table .color-red-row td{
      color: #fd6442 !important;
    }

  }
</style>
