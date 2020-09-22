<template>
  <div class="agTable">
    <div class="agGridTable isagTable" ref="agGridTable"></div>
    <div class="page" v-show="(agTableConfig.rowData || []).length !== 0">
      <span style="paddingRight:8px;">共{{ agTableConfig.pagenation.total }}条</span>
      <Page
        class="page-pages"
        :total="agTableConfig.pagenation.total"
        :current="agTableConfig.pagenation.current"
        :page-size="agTableConfig.pagenation.pageSize"
        :page-size-opts="agTableConfig.pagenation.pageSizeOpts"
        show-elevator
        show-sizer
        :transfer="true"
        @on-change="pageChange"
        @on-page-size-change="onPageSizeChange"
      />
    </div>
  </div>
</template>

<script>
import agTable from "@/assets/js/__utils__/custom-ag-grid-table";
import axios from "axios";
export default {
  data() {
    return {
      name: "agGridTable",
      AGTABLE: "", //ag实例
      columnState: "", //存储表头排列顺序
      column: "", //存储初始表头顺序
      localeText: {
        // filterPanel
        page: "页",
        more: "更多",
        to: "到",
        of: "共",
        next: "Next",
        previous: "Previous",
        loadingOoo: "加 载 中 ...",
        // setFilter
        selectAll: "全选",
        searchOoo: "搜索...",
        blanks: "空值",
        // numberFilterAndTextFilter
        filterOoo: "搜索...",
        applyFilter: "开始搜索",
        // numberFilter
        equals: "等于",
        notEqual: "不等于",
        notContains: "不包含",
        lessThanOrEqual: "小于等于",
        greaterThanOrEqual: "大于等于",
        inRange: "在...范围内",
        lessThan: "小于",
        greaterThan: "大于",
        // textFilter
        contains: "包含",
        startsWith: "以...开始",
        endsWith: "以...结尾",
        // headerOfDefaultGroupColumn
        group: "当前分组",
        // toolPanel
        columns: "所有列",
        rowGroupColumns: "透视列",
        rowGroupColumnsEmptyMessage: "将需要分组查询的“列”拖拽至此处",
        valueColumns: "聚合列",
        pivotMode: "透视模式",
        groups: "分组详情",
        values: "聚合分析值",
        pivots: "透视列",
        valueColumnsEmptyMessage: "将需要聚合分析的‘列’拖拽到此处",
        pivotColumnsEmptyMessage: "将需要透视分析的‘列’拖拽至此处",
        // other
        noRowsToShow: "暂无数据",
        // enterPriseMenu
        pinColumn: "固定“列”",
        valueAggregation: "聚合值",
        autosizeThiscolumn: "自适应当前列",
        autosizeAllColumns: "自适应所有列",
        groupBy: "分组",
        ungroupBy: "取消分组",
        resetColumns: "重置所有列位置信息",
        destroyColumnComps: "重置所有列位置信息",
        expandAll: "展开所有",
        collapseAll: "收缩所有",
        toolPanel: "工具栏",
        export: "导出",
        csvExport: "导出CSV",
        excelExport: "导出Excel",
        // enterPriseMenuPinning
        pinLeft: "向左固定",
        pinRight: "向右固定",
        noPin: "取消固定",
        // enterPriseAggregationAndStatusPanel
        sum: "求和",
        min: "最小值",
        max: "最大值",
        first: "首值",
        last: "末值",
        none: "None",
        count: "计数",
        avg: "平均",
        average: "平均值",
        // standardMenu
        copyWithHeaders: "复制（含表头）",
        copy: "复制",
        ctrlC: "ctrl+C",
        paste: "粘贴",
        ctrlV: "ctrl+V"
      }
    };
  },
  mounted() {
    this.getUserConfig();
  },
  activated() {
    if (typeof this.AGTABLE === "function" && this.AGTABLE.fixAgRenderChoke) {
      this.AGTABLE.fixAgRenderChoke();
    }
  },
  props: {
    agTableConfig: {
      type: Object,
      default: {}
    }
  },
  methods: {
    //初始化表格
    agGridTable(th, row, extendObj, bottomRowList) {
      let self = this;
      th.map(item => {
        delete item.__ob__;
        if (
          self.agTableConfig.renderArr &&
          self.agTableConfig.renderArr.hasOwnProperty(item.field)
        ) {
          //添加动态渲染列
          item["cellRenderer"] = self.agTableConfig.renderArr[item.field];
        }
      });
      self.column = JSON.parse(JSON.stringify(th));
      if (self.columnState != "") {
        th = self.setColumn(self.columnState, th);
      }
      if (!this.agTableConfig.isIndex) {
        th.unshift({
          headerName: "序号",
          field: "__ag_sequence_column_name__",
          checkboxSelection: true,
          headerCheckboxSelection: true,
          pinned: "left",
          resizable: false,
          suppressMovable: true, //禁止该列拖拽
          suppressFilter: true,
          sort: "asc",
          maxWidth: 125 //最大宽度
        });
      }

      self.$nextTick(() => {
        self.AGTABLE = agTable(this.$refs.agGridTable, {
          headerHeight: 36, //设置表头的高度 ******************
          rowHeight: 36, //设置行高
          localeText: self.localeText,
          columnDefs: th ? th : [], // 列定义
          rowData: row ? row : [], // 行数据
          rowSelection: "multiple", //设置多行选中
          enableSorting: true, //排序
          enableFilter: true, //过滤
          suppressDragLeaveHidesColumns: true, //如果为true，则将列拖出网格（例如，拖到组区域）时，不会隐藏该列。
          enableColResize: true, //列宽是否可拖动
          suppressRowClickSelection: true, //单击行不会触发勾选
          suppressCopyRowsToClipboard: true, //只复制当前聚焦td的数据
          getRowStyle: function (params) {
            //设置行样式
            if (params.node.rowPinned === "bottom") {
              //置底行
              // console.log(params.node.rowPinned);
              return { "font-weight": "bold", color: "red" };
            } else {
              //普通行
              return { color: "#323233" };
            }
          },
          onCellDoubleClicked: event => {
            self.$emit("on-row-dblclick", event.data, event.rowIndex);
          },
          onColumnMoved: columnState => {
            //拖拽表头,更新表头顺序
            const { columnApi } = columnState;
            let a = columnApi
              .getColumnState()
              .map(d => d.colId)
              .toString();
            //表头拖拽存储
            let self = this;
            let formdata = new FormData();
            formdata.append("tableid", self.$route.query.id);
            formdata.append("colposition", a);
            axios({
              url: "/p/cs/setColPosition",
              method: "post",
              data: formdata
            }).then(res => {
              if (res.data.code == 0) {
                self.columnState = res.data.data;
                //更新表头
                let col = self.setColumn(
                  res.data.data,
                  self.agTableConfig.columnDefs
                );
                self.AGTABLE.setCols(col);
              }
            });
          },
          getContextMenuItems(param) {
            return ["copy", "copyWithHeaders", "paste"];
          },
          getMainMenuItems: params => {
            return [
              // 'pinSubMenu',
              "separator",
              "autoSizeThis",
              "autoSizeAll",
              "separator",
              {
                name: "重置所有列位置信息",
                action: () => {
                  // let a = columnApi.getColumnState().map(d => d.colId).toString();
                  //表头拖拽存储
                  let self = this;
                  const columnApi = params.columnApi;
                  let formdata = new FormData();
                  formdata.append("tableid", self.$route.query.id);
                  formdata.append("colposition", "");
                  axios({
                    url: "/p/cs/setColPosition",
                    method: "post",
                    data: formdata
                  }).then(res => {
                    if (res.data.code == 0) {
                      self.columnState = res.data.data;
                      //更新表头
                      self.AGTABLE.resetCols(self.column);
                    }
                  });
                }
              }
            ];
          }, // 设置每列的general menu item
          onSortChanged: e => {
            //表格排序事件
            // console.log(e);
            this.$emit("on-sort-changed", e.api.getSortModel());
          },
          ...extendObj //注意：对象里的属性或方法会覆盖 前面的属性或方法
        }, { tableHeight: self.agTableConfig.tableHeight })
          .setCols(th)
          .setRows(row)
          .setPinnedBottomRowData(bottomRowList); // 设置置底的行
      });
    },
    // 分页change 事件
    pageChange(val) {
      this.$emit("on-page-change", val);
    },
    // 切换分页条数
    onPageSizeChange(val) {
      this.$emit("on-page-size-change", val);
    },
    setColumn(val, th) {
      let arr = val.split(",");
      let thArr = [];
      arr.map(item => {
        let head = th.find(i => {
          return i.field == item;
        });
        if (head) {
          thArr.push(head);
        }
      });
      return thArr;
    },
    getUserConfig() {
      //请求表头排列顺序
      let self = this;
      let formdata = new FormData();
      formdata.append("id", this.$route.params.customizedModuleId);
      formdata.append("type", "action");
      axios({
        url: "/p/cs/getUserConfig",
        method: "post",
        data: formdata
      }).then(res => {
        // console.log(res);
        if (res.data.code == 0) {
          self.columnState = res.data.data.colPosition;
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
@import "table.less";
.agTable {
  .page {
    padding: 10px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #606266;
  }
}
</style>
