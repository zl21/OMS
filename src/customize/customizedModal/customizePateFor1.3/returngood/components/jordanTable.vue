<template>
  <div class="jordan-table-box">
    <p
      v-if="tableTitle"
      class="jordan-table-title"
    >
      <span>{{ tableTitle }}</span>
    </p>
    <!-- 标签 -->
    <!-- 
    <keep-alive>
      <component
        :is="currentView"
        :ref="currentView"
        :componentData="componentData"
        v-if="slotComponent"
        :data-name="tableSlotComponent"
      ></component>
    </keep-alive>-->
    <!-- 按钮组件 -->


    <!-- 表单组件 -->


    <!-- 分页 -->
    <div
      v-if="pageShow"
      class="jordan-table-pageContent"
    >
      <p style="margin-right:4px;">
        共{{ tableTotal }}条
      </p>
      <Page
        class="jordan-table-page"
        :total="tableTotal"
        :page-size="tablePageSize"
        :page-size-opts="pageSizeOpts"
        :placement="placement"
        :transfer="transfer"
        :size="styleSize"
        :simple="simple"
        :show-sizer="showSizer"
        :show-elevator="showElevator"
        :show-total="showTotal"
        :current="tableCurrent"
        :class-name="className"
        :styles="styles"
        :prev-text="prevText"
        :next-text="nextText"
        @on-change="onChange"
        @on-page-size-change="pageSizeChange"
      />

      <!-- 表格按钮操作 -->
      <div class="jordan-table-operation-btns">
        <span
          v-for="(item,index) in tableOptionsBtns"
          :key="index"
          @click="tableOperationBtns(item)"
        >【{{ item }}】</span>
      </div>

      <!-- 表格搜索框 -->
      <div
        v-if="isShowSearchInput"
        class="jordan-search-box"
      >
        <Input
          v-model="searchValue"
          :placeholder="searchPlaceholder"
          style="width: 200px"
          @on-change="onInputChange"
          @on-blur="onInputBlur"
          @on-keydown="onInputKeydown"
        />
      </div>
    </div>
    <!-- 表格内容区域 -->
    <div class="jordan-table-content">
      <Table
        v-if="tableColumns.length > 0"
        class="jordan-table-tableContent"
        :columns="tableColumns"
        :data="tableData"
        :total-data="totalData"
        :col-row-method="colRowMethod"
        :highlight-row="highlightRow"
        :size="size"
        :width="width"
        :height="height"
        :stripe="stripe"
        :border="border"
        :show-header="showHeader"
        :row-class-name="rowClassName"
        :context="context"
        :no-data-text="noDataText"
        :no-filtered-data-text="noFilteredDataText"
        :disabled-hover="disabledHover"
        :loading="loadingFlag"
        :click-timer-task="250"
        @on-current-change="currentChange"
        @on-select="onSelect"
        @on-select-cancel="onSelectCancel"
        @on-select-all="onSelectAll"
        @on-select-all-cancel="onSelectAllCancel"
        @on-selection-change="onSelectionChange"
        @on-sort-change="onSortChange"
        @on-filter-change="onFilterChange"
        @on-row-click="onRowClick"
        @on-row-dblclick="onRowDblclick"
        @on-expand="onExpand"
      />
      <!--clickTimerTask  单双击定时-->
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  // import { constants } from 'fs';

  import jordanButton from './jordanButton';
  // ../../jordanComponents/components/jordanButton
  // const _import = file => require(`../components/customComponents/${file}.vue`).default;

  export default {
    name: 'JordanTable',
    components: {
      jordanButton
    },
    props: {
      pageShow: {
        // 控制分页是否显示
        type: Boolean,
        default: true
      },
      current: {
        type: Number,
        default: 1
      },
      total: {
        type: Number,
        default: 0
      },
      pageSize: {
        type: Number,
        default: 15
      },
      pageSizeOpts: {
        type: Array,
        default() {
          return [15, 30, 45, 100];
        }
      },
      placement: {
        type: String,
        default: 'bottom'
      },
      transfer: {
        type: Boolean,
        default() {
          return true;
        }
      },
      styleSize: {
        type: String
      },
      simple: {
        type: Boolean,
        default: false
      },
      showTotal: {
        type: Boolean,
        default: false
      },
      showElevator: {
        type: Boolean,
        default: true
      },
      showSizer: {
        type: Boolean,
        default: true
      },
      className: {
        type: String
      },
      styles: {
        type: Object
      },
      prevText: {
        type: String,
        default: ''
      },
      nextText: {
        type: String,
        default: ''
      },

      // 表格props
      data: {
        // 表格行数据
        type: Array,
        default() {
          return [];
        }
      },
      totalData: {
        // 合计行数据
        type: Array,
        default() {
          return [];
        }
      },
      columns: {
        // 表头数据
        type: Array,
        default() {
          return [];
        }
      },
      colRowMethod: {
        // 合计行和列
        type: Function,
        default() {
          return '';
        }
      },
      size: {
        type: String,
        default() {
          return 'default';
        }
      },
      tableOptionsBtns: {
        type: Array,
        default() {
          return ['删除明细', '导入', '导出'];
        }
      }, // 表格操作
      width: {
        type: [Number, String]
      },
      height: {
        type: [Number, String]
      },
      stripe: {
        type: Boolean,
        default: false
      },
      border: {
        type: Boolean,
        default: false
      },
      showHeader: {
        type: Boolean,
        default: true
      },
      highlightRow: {
        type: Boolean,
        default: false
      },
      rowClassName: {
        type: Function,
        default() {
          return '';
        }
      },
      context: {
        type: Object
      },
      noDataText: {
        type: String
      },
      noFilteredDataText: {
        type: String
      },
      disabledHover: {
        type: Boolean
      },
      loading: {
        type: Boolean,
        default: false
      },

      // 自定义属性
      renderArr: {
        // 表头自定义列表
        type: Array,
        default: () => []
      },
      multiple: {
        // 是否多选
        type: Boolean,
        default: false
      },
      multipleCheckbox: {
        // 多选是否有全选按钮
        type: Boolean,
        default: false
      },
      indexColumn: {
        // 控制序号列是否存在
        type: Boolean,
        default: true
      },
      actionColumn: {
        // 控制是否存在操作列
        type: Boolean,
        default: false
      },
      slotComponent: {
        // slot组件地址
        type: String,
        default: ''
      },
      tableTitle: {
        // 表格顶部的title
        type: String,
        default: ''
      },
      url: {
        // 表格刷新数据url地址
        type: String,
        default: ''
      },
      searchObj: {
        // 表格刷新请求数据
        type: Object,
        default: () => {}
      },
      rowDblclick: {
        // 双击回调
        type: Function,
        default: () => {}
      },
      rowClick: {
        // 单击回调
        type: Function,
        default: () => {}
      },
      selectionChange: {
        // 点击复选框触发回调
        type: Function,
        default: () => {}
      },
      select: {
        // 多选时，复选框选中时触发
        type: Function,
        default: () => {}
      },
      selectCancel: {
        // 多选时，复选框取消选中时触发
        type: Function,
        default: () => {}
      },
      moduleInstanceKey: {
        type: String,
        default: () => ''
      },
      stateNameSpace: {
        type: String,
        default: () => ''
      },
      componentData: {
        type: Object,
        default: () => {}
      }, // 自定义组件props
      httpOptions: {
        // http请求配置
        type: Object,
        default: () => {}
      },
      // Jurisdiction: {
      //   //查询是否携带权限控制
      //   type: Boolean,
      //   default: () => false
      // },
      searchPlaceholder: {
        // 搜索文字
        type: String,
        default: () => ''
      },

      isShowSearchInput: {
        //
        type: Boolean,
        default: () => false
      }
    // searchFinish: {
    //   //接口调用完成回调
    //   type: Function,
    //   default() {
    //     return "";
    //   }
    // }
    },
    data() {
      return {
        tableColumns: [],
        tableData: [],
        loadingFlag: false,
        tableTotal: 0,
        tableCurrent: 1,
        tablePageSize: 15,
        oldSearchObj: {}, // 上一次查询条件searchObj
        temporary: {}, // 查询条件，与后端交互
        currentView: '', // slot

        DelayTime: 0, // 查询延时时间
        searchValue: '' // 搜索文字
      };
    },
    computed: {
    // tableSlotComponent(){
    //   if (this.slotComponent) {
    //     let _component = this.slotComponent;
    //     Vue.component(_component, Vue.extend(_import(this.slotComponent)));
    //     this.currentView = _component;
    //   }
    //   return true;
    // }
    },
    watch: {
      columns: {
        handler(val, old) {
          if (this.columns.length > 0) {
            this.tableColumns = this.getTableColumns(this.columns);
          }
        },
        deep: true
      },
      data: {
        handler(val, old) {
          this.tableData = this.getTableData(this.data);
        },
        deep: true
      }
    },
    created() {
      const self = this;
      if (self.stateNameSpace !== '') {
        self.$store.commit(`${self.stateNameSpace}/setCurrent`, {
          moduleInstance: self,
          moduleInstanceKey: self.moduleInstanceKey
        });
      }

      // tableColumns:[],
      // tableData:[],
      // loadingFlag:false,
      // tableTotal:0,
      // tableCurrent:1,
      if (this.columns && this.columns.length > 0) {
        this.tableColumns = this.getTableColumns(this.columns);
      }
      if (this.data && this.data.length > 0) {
        this.tableData = this.getTableData(this.data);
      }

      this.tableTotal = this.total;
      this.tableCurrent = this.current;
      this.tablePageSize = this.pageSize;
    },
    methods: {
      // 搜索框方法
      onInputChange(event, value) {
        this.$emit('searchChange', event, this.searchValue);
      },
      onInputBlur() {
        this.$emit('searchEnter', event, this.searchValue);
      },
      onInputKeydown() {
        console.log(event);
        if (event.keyCode === 13) {
          this.$emit('searchBlur', event, this.searchValue);
        }
      },
      //
      tableOperationBtns(item) {
        if (item === '删除明细') {
          this.$emit('tableDeleteDetail');
        } else if (item === '导入') {
          this.$emit('tableExport');
        } else if (item === '导出') {
          this.$emit('tableImport');
        }
      },

      onChange(page) {
        // 页码改变的回调，返回改变后的页码
        this.$emit('on-change', page);
        this.tableCurrent = page;
        this.freshTable();
      },
      pageSizeChange(size) {
        // 切换每页条数时的回调，返回切换后的每页条数
        this.$emit('on-page-size-change', size);
        this.tablePageSize = size;
        this.freshTable();
      },

      currentChange(currentRow, oldCurrentRow) {
        // 开启 highlight-row 后有效，当表格的当前行发生变化的时候会触发
        this.$emit('on-current-change', currentRow, oldCurrentRow);
      },
      onSelect(selection, row) {
        this.$emit('on-select', selection, row);
      // if (typeof this.select === "function") {
      //   this.select(selection, row);
      // }
      },
      onSelectCancel(selection, row) {
        this.$emit('on-select-cancel', selection, row);
        if (typeof this.selectCancel === 'function') {
          this.selectCancel(selection, row);
        }
      },
      onSelectAll(selection) {
        this.$emit('on-select-all', selection);
      },
      onSelectAllCancel(selection) {
        this.$emit('on-select-all-cancel', selection);
      },
      onSelectionChange(selection) {
        this.$emit('on-selection-change', selection);
      // if (typeof this.selectionChange === "function") {
      //   this.selectionChange(selection);
      // }
      },
      onSortChange(column, key, order) {
        this.$emit('on-sort-change', column, key, order);
      },
      onFilterChange(data) {
        this.$emit('on-filter-change', data);
      },
      onRowClick(row, index) {
        this.$emit('on-row-click', row, index);
      // if (typeof this.rowClick === "function") {
      //   this.rowClick(row, index);
      // }
      },
      onRowDblclick(row, index) {
        this.$emit('on-row-dblclick', row, index);
      // if (typeof this.rowDblclick === "function") {
      //   this.rowDblclick(row, index);
      // }
      },
      onExpand(row, status) {
        this.$emit('on-expand', row, status);
      },
      getTableColumns(column) {
        const columns = [...column];

        // 让列居左
        columns.map((temp) => {
          temp.align = 'center';
        });
        if (this.indexColumn) {
          columns.unshift({
            type: 'index',
            align: 'center',
            fixed: 'left',
            width: 60,
            renderHeader: (h, params) => h('div', '序号')
          });
        }
        if (this.multiple) {
          // 判断是否存在多选情况

          if (this.multipleCheckbox) {
            columns.unshift({
              type: 'selection',
              align: 'center',
              width: 30,
              fixed: 'left'
            });
          } else {
            columns.unshift({
              type: 'selection',
              align: 'center',
              width: 30,
              fixed: 'left',
              renderHeader: (h, params) => h('div', '')
            });
          }
        }

        if (this.actionColumn) {
          // 判断是否存在操作列
          columns.push({
            title: 'Action',
            key: 'action',
            align: 'center',
            fixed: 'right',
            width: 60,
            renderHeader: (h, params) => h('span', '操作')
          });
        }

        this.renderArr.map((item, col) => {
          columns.map((temp) => {
            const currentTemp = temp;
            if (item.key === currentTemp.key && item.key) {
              if (item.renderHeader) {
                temp.renderHeader = item.renderHeader;
              }
              if (item.render) {
                temp.render = item.render;
              }
              if (item.width) {
                temp.width = item.width;
              }
            }
            if (temp.type === 'index' && item.type === 'index') {
              // 表头的列  单选时候
              columns.map((columnItem) => {
                if (columnItem.type === 'index') {
                  if (item.renderHeader) {
                    columnItem.renderHeader = item.renderHeader;
                  }

                  if (item.indexMethod) {
                    columnItem.indexMethod = item.indexMethod;
                  }

                  if (item.render) {
                    columnItem.render = item.render;
                  }
                }

                return columnItem;
              });
            }
            return currentTemp;
          });
        });
        return columns;
      },
      getTableData(data) {
        return data;
      },
      freshTable() {
        if (document.getElementsByClassName('disableCheckbox').length > 0) {
          document
            .getElementsByClassName('disableCheckbox')[0]
            .getElementsByTagName('input')[0].disabled = true;
        }
        // 自定义刷新表格数据
        const self = this;
        if (!this.url) {
          return;
        }

        this.DelayTime = 0;

        if (this.$route.query.delayTime) {
          const { delayTime } = this.$route.query;
          this.DelayTime = delayTime;
        }

        delete this.searchObj.delayTime;

        this.temporary = { ...this.searchObj };

        self.loadingFlag = true;
        if (!this.searchObj) {
          this.temporary = {};
        }

        // 是否带着权限请求
        // if (this.Jurisdiction) {
        //   let { organizationIdList } = this.$store.state.userInfo;
        //   let organizationIdmap = organizationIdList
        //     ? organizationIdList.join(",")
        //     : "";
        //   this.temporary.condition += ` ${
        //     Object.keys(this.temporary.condition).length > 0 ? "and" : ""
        //   } (organizations.organization_id  in ( ${organizationIdmap} ))`;
        // }

        if (this.pageShow) {
          // 更新temporary
          this.temporary.page = {
            offset: (this.tableCurrent - 1) * this.tablePageSize,
            limit: this.tablePageSize
          };
        }

        if (
          JSON.stringify(this.searchObj) !== JSON.stringify(this.oldSearchObj)
        ) {
          this.tableCurrent = 1;

          if (this.pageShow) {
            // 当两次查询条件不同时要回到第一页查询
            this.temporary.page = {
              offset: (this.tableCurrent - 1) * this.tablePageSize,
              limit: this.tablePageSize
            };
          }
        }

        this.oldSearchObj = { ...this.searchObj };
        self.tableData = [];
        setTimeout(() => {
          self.API.request(this.url, this.temporary, this.httpOptions)
            .then((request) => {
              self.tableData = self.getTableData(request.t.list);
              self.tableTotal = request.t.count;
              self.loadingFlag = false;
              if (document.getElementsByClassName('disableCheckbox').length > 0) {
                document
                  .getElementsByClassName('disableCheckbox')[0]
                  .getElementsByTagName('input')[0].disabled = false;
              }

              this.DelayTime = 0;

              this.$emit('searchFinish');
            })
            .catch((err) => {
              self.loadingFlag = false;
              if (document.getElementsByClassName('disableCheckbox').length > 0) {
                document
                  .getElementsByClassName('disableCheckbox')[0]
                  .getElementsByTagName('input')[0].disabled = false;
              }

              this.DelayTime = 0;

              this.$emit('searchFinish');
            });

          self.$router.push({
            path: self.$route.name,
            query: { fresh: true, keepTab: true }
          });
        }, this.DelayTime);
      // try {
      //   let request = this.API.request(this.url,this.searchObj,this.httpOptions);

      // } catch (err) {
      //   self.loadingFlag = false;
      // }
      }
    }
  };
</script>
<style  lang="less" scoped>
.jordan-table-box {
  height: auto;
  display: flex;
  flex-direction: column;

  .jordan-table-pageContent {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-top: 8px;
    flex-wrap: wrap;
    .jordan-search-box {
      text-align: left;
    }
    .jordan-table-operation-btns {
      span {
        color: rgb(136, 192, 250);
        font-size: 14px;
      }
    }
  }

  .jordan-table-title {
    line-height: 20px;
    font-size: 14px;
    margin-bottom: 10px;
    span {
      padding: 5px 15px;
      border: 1px solid rgb(236, 110, 78);
    }
  }

  .jordan-table-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    margin-top: 8px;
    .jordan-table-tableContent {
      flex: 1;
    }
    .jordan-table-pageContent {
       p {
        display: inline-block;
        vertical-align: top;
        height: 32px;
        line-height: 32px;
        margin-right: 4px;
      }
      .jordan-table-page {
        display: inline-block;
      }
    }
  }
}
</style>
