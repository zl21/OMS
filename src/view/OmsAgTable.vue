<!--
 * @Author: your name
 * @Date: 2021-06-21 10:17:42
 * @LastEditTime: 2021-11-02 17:53:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /burgeon-business-components/vueAgTable.vue
-->
<template>
  <div class="agTable">
    <arkCommonTableByAgGrid
      v-if="agTableConfig.columnDefs.length"
      ref="agGrid"
      :rowHeight="agTableConfig.rowHeight"
      :height="agTableConfig.tableHeight"
      :options="options"
      :data="agTableConfig.rowData"
      :columns="agTableConfig.columnDefs"
      :renderParams="agTableConfig.renderParams"
      :enableRangeSelection="true"
      :externalModules="[RangeSelectionModule]"
      @grid-ready="gridReady"
      @on-row-dblclick="tableRowDbclick"
      @on-selection-change="tableSelectedChange"
      @on-column-moved="colMoved"
      @on-column-pinned="colPinned"
      @on-sort-change="colSortChange"
      @sortChanged="colSortChange"
    ></arkCommonTableByAgGrid>

    <div
      class="page page-wrap"
      v-show="agTableConfig.pageShow && (agTableConfig.rowData || []).length !== 0"
    >
      <span style="paddingright: 8px"
        >{{ vmI18n.t("com.total") }} {{ agTableConfig.pagenation.total }}
        {{ vmI18n.t("com.piece") }}</span
      >
      <Page
        class="page-pages"
        size="small"
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
import { RangeSelectionModule } from '@ag-grid-enterprise/range-selection'
// import commonTableByAgGrid from 'libs/@syman/ark-ui-bcl/src/components/common-table-by-ag-grid/CommonTableByAgGrid'; // npm
// import i18n from "@burgeon/internationalization/i18n";

export default {
  name: 'OmsAgTable',
  components: {
    // commonTableByAgGrid
  },
  props: {
    renderParams: {
      type: Function
    },
    agTableConfig: {
      type: Object,
      default: () => { }
    },
    options: {
      type: Object,
      default: () => {
        return { datas: {} }
      }
    }
  },
  data() {
    return {
      // vmI18n: i18n,
      RangeSelectionModule: RangeSelectionModule,
      columnState: '',
      fixedColumn: '',
      hideColumn: '',
      timer: null,
      timerCount: 10
    }
  },
  watch: {
    'agTableConfig.columnDefs': {
      handler(val, oldVal) {
        if (this.agTableConfig.isIndex && val[0].field !== 'ag_index') {
          val.unshift({
            headerName: '序号',
            field: 'ag_index',
            checkboxSelection: true,
            headerCheckboxSelection: true,
            pinned: 'left',
            suppressMovable: true, //禁止该列拖拽
            suppressFilter: true,
            floatingFilter: this.options.floatingFilter ? this.options.floatingFilter : true,
            isorder: true, // checkboxSelection为true时排序不生效！？
            sort: 'desc',
            maxWidth: 125, //最大宽度
            "width": 90,
            cellStyle: { color: 'rgb(15, 142, 233)' },
          })
        }
        // 是否开启字段处理回调
        if (this.agTableConfig.isAmtCb) {
          this.$emit('on-reset-column')
        }
      },
      deep: true
    },
    'agTableConfig.rowData': {
      handler(val, oldVal) {
        const currentPage = this.agTableConfig.pagenation.current;
        const pageSize = this.agTableConfig.pagenation.pageSize;
        if (this.agTableConfig.isIndex) {
          val.forEach((item, i) => {
            item.ag_index = (currentPage - 1) * pageSize + i + 1;
          });
        }
        // 是否开启字段处理回调
        if (this.agTableConfig.isAmtCb) {
          this.$emit('on-reset-row')
        }
        this.handleTotalData()
      },
      deep: true
    },
    timerCount(val) {
      val <= 0 && clearInterval(this.timer) 
    }
  },
  methods: {
    // 序号列显示合计、总计 
    handleTotalData() {
      const { isSubTotalEnabled, isFullRangeSubTotalEnabled } = this.options.datas
      if (!isSubTotalEnabled && !isFullRangeSubTotalEnabled) {
        this.timerCount = 0
        return
      }
      this.timer = setInterval(() => {
        const agGridTable = this.$refs.agGrid && this.$refs.agGrid.$refs.agGridTable
        const { subtotalRowData, fullRangeSubTotalRowData } = agGridTable || {}
        if (agGridTable) {
          const handler = (rowData) => {
            if (agGridTable[rowData].hasOwnProperty('ID') && agGridTable[rowData].ID.val != '') {
              agGridTable[rowData].ID.val = ''
              agGridTable[rowData].ag_index.val = rowData == 'subtotalRowData' ? $it('other.total') : $it('tL.total') // 合计 | 总计
            }
          }
          // 仅显示合计
          if (isSubTotalEnabled && !isFullRangeSubTotalEnabled) {
            if (subtotalRowData) {
              if (subtotalRowData.ID.val == '') {
                this.timerCount = 0
                return
              }
              handler('subtotalRowData')
              this.timerCount -= 1
            }
          }
          // 仅显示总计
          if (!isSubTotalEnabled && isFullRangeSubTotalEnabled) {
            if (fullRangeSubTotalRowData) {
              if (fullRangeSubTotalRowData.ID.val == '') {
                this.timerCount = 0
                return
              }
              handler('fullRangeSubTotalRowData')
              this.timerCount -= 1
            }
          }
          // 显示合计总计
          if (isSubTotalEnabled && isFullRangeSubTotalEnabled) {
            if (fullRangeSubTotalRowData && subtotalRowData) {
              if (subtotalRowData.ID.val == '' && fullRangeSubTotalRowData.ID.val == '') {
                this.timerCount = 0
                return
              }
              handler('subtotalRowData')
              handler('fullRangeSubTotalRowData')
              this.timerCount -= 1
            }
          }
          // console.log(this.timerCount, subtotalRowData, fullRangeSubTotalRowData)
        }
      }, 100)
    },
    gridReady() {
      // this.tabth = [];
      // this.row = [];
      const self = this;
      // console.log('--::', this.columnState);
      if (self.columnState != '') {
        let th = self.setColumn(this.columnState, self.setColumnPinned(self.fixedColumn), this.hideColumn)
        this.agTableConfig.columnDefs = th;
      }
    },
    tableRowDbclick(data) {
      this.$emit('on-row-dblclick', data.data);
    },
    // 分页change 事件
    pageChange(val) {
      this.$emit('on-page-change', val)
    },
    // 切换分页条数
    onPageSizeChange(val) {
      this.$emit('on-page-size-change', val)
    },
    tableSelectedChange(data) {
      this.$emit('on-selection-change', data);
    },
    colPinned(data) {
      this.onColumnPinned()
      this.$emit('on-column-pinned', data);
    },
    colSortChange(data) {
      this.$emit('on-sort-change', data);
    },
    colMoved: _.debounce(async function () {
      const self = this;
      if (self.options.oldMoved) {
        self.onColumnMoved(self.$refs.agGrid, self);
        // return
      }
      const { api, columnApi } = self.$refs.agGrid;
      const colData = columnApi.getAllGridColumns()
      this.$emit('on-column-moved', colData);
    }, 900),
    onColumnVisibleChanged (hideCols,callback) {
      // 显示 or 隐藏 列
      console.log('zheonColumnVisibleChangednshi::', hideCols);
      this.hideColumn = hideCols
      this.setHideColumn(hideCols)
    },

    /** ---------------------- 老ag方法： ---------------------- **/
    onColumnMoved: _.debounce((agSelf, self) => {
      //拖拽表头,更新表头顺序
      const {
        columnApi
      } = agSelf
      let a = columnApi
        .getColumnState()
        .map((d) => d.colId)
        .toString()
      //表头拖拽存储
      let formdata = new FormData()
      formdata.append('tableid', self.$route.params.customizedModuleId)
      formdata.append('colposition', a)
      R3.network.post('/p/cs/setColPosition', formdata)
        .then((res) => {
          if (res.data.code == 0) {
            self.columnState = res.data.data
            //更新表头
            let col = self.setColumn(
              res.data.data,
              self.agTableConfig.columnDefs
            )
            self.agTableConfig.columnDefs = col;
            // self.AGTABLE.setCols(col)
          }
        })
    }, 100),
    // 固定列
    onColumnPinned() {
      const { columnApi } = this.$refs.agGrid
      const pinnedLeft = columnApi.getDisplayedLeftColumns().map(d => d.colId);
      const pinnedRight = columnApi.getDisplayedRightColumns().map(d => d.colId);
      //  将固定列保存到数据库
      const pinnedPosition = pinnedLeft.join(',')+"|"+pinnedRight.join(',');
      let formdata = new FormData()
      formdata.append('tableid', this.$route.params.customizedModuleId)
      formdata.append('fixedcolumn', pinnedPosition)
      R3.network.post('/p/cs/setFixedColumn', formdata)
      .then((res) => {
        if (res.data.code == 0) {
          this.fixedColumn = res.data.data
          this.agTableConfig.columnDefs = this.setColumnPinned(res.data.data)
        }
      })
    },
    setColumnPinned(fixedcolumn) {
      const [pinnedLeft, pinnedRight] = fixedcolumn.indexOf('|') > -1 ? fixedcolumn.split('|') : ['', '']
      const curPinnedLeft = pinnedLeft.split(',')
      const curPinnedRight = pinnedRight.split(',')
      return this.agTableConfig.columnDefs
      .map(column => {
        if (curPinnedLeft.indexOf(column.key) > -1) {
          column.pinned = 'left';
        } else if (curPinnedRight.indexOf(column.key) > -1) {
          column.pinned = 'right';
        } else {
          column.pinned = null;
        }
        if (column.field == 'ag_index') column.pinned = 'left';
        return column
      })
    },
    setHideColumn(val) {
      let self = this
      let formdata = new FormData()
      formdata.append('tableid', this.$route.params.customizedModuleId)
      formdata.append('hidecolumns', val)
      R3.network.post('/p/cs/setHideColumn', formdata).then((res) => {
        self.setColumn(self.columnState, self.agTableConfig.columnDefs, val)
      })
    },
    setColumn(val, th, hideColumn) {
      let arr = val.split(',')
      let thArr = [], eXArr = []
      /* arr.forEach((item) => {
        let head = th.find((i) => {
          return i.field == item
        })
        if (head) {
          thArr.push(head)
        }
      })
      return thArr */
      arr.forEach((item) => {
        th.forEach((i) => {
          if (item == i.field) {
            thArr.push(i)
          }
        })
      })
      th.forEach((i) => {
        i.hide = false
        if (!arr.includes(i.field)) {
          eXArr.push(i)
        }
      })
      let resultArr = thArr.concat(eXArr)
      if (hideColumn != undefined) {
        let hideArr = hideColumn.split(',')
        resultArr.forEach(i => {
          if (hideArr.includes(i.field)) {
            i.hide = true
          }
        })
      }
      return resultArr
    },
    getUserConfig() {
      //请求用户表头排列顺序
      let self = this
      let formdata = new FormData()
      formdata.append('id', this.$route.params.customizedModuleId)
      formdata.append('type', 'action')
      formdata.append('flag', 'OmsAgTable')
      R3.network.post('/p/cs/getUserConfig', formdata)
        .then((res) => {
          // console.log(res);
          if (res.data.code == 0) {
            const { colPosition, fixedColumn, hideColumn } = res.data.data
            self.columnState = colPosition
            self.fixedColumn = fixedColumn
            self.hideColumn = hideColumn
            if (self.agTableConfig.columnDefs.length) {
              // 便于以后在组件中可以只接调用这个方法来修复 重置按钮 导致的列顺序复原 - 待测
              let col = self.setColumn(
                colPosition,
                self.setColumnPinned(fixedColumn),
                hideColumn
              )
              self.agTableConfig.columnDefs = col;
            }
          }
        })
    },
    getMainMenuItems: (params, self) => {
      // 注意: 会触发列移动的回调'on-column-moved'
      // let self = this
      return [
        'pinSubMenu', // 固定列
        'separator',
        'autoSizeThis',
        'autoSizeAll',
        'separator',
        {
          name: '隐藏当前列',
          action: () => {
            let colName = params.column.colId
            self.hideColumn = [...self.hideColumn.split(','), colName].join()
            let th = self.setColumn(self.columnState, self.agTableConfig.columnDefs, self.hideColumn)
            self.agTableConfig.columnDefs = th;
          },
        },
        {
          name: '重置所有列位置信息',
          action: () => {
            // let a = columnApi.getColumnState().map(d => d.colId).toString();
            //表头拖拽存储
            let formdata = new FormData()
            formdata.append('tableid', self.$route.params.customizedModuleId)
            formdata.append('colposition', '')
            formdata.append('flag', 'reset')
            R3.network.post('/p/cs/setColPosition', formdata).then((res) => {
              if (res.data.code == 0) {
                self.columnState = res.data.data
                //更新表头
                self.agTableConfig.columnDefs.forEach((d, i) => {
                  params.columnApi.moveColumn(d, i);
                })
              }
            })
          },
        },
      ]
    },
  },
  mounted() {
    // this.RangeSelectionModule = RangeSelectionModule // ag表格多选行
    setTimeout(() => {
      this.getUserConfig();
    }, 1000)
    // 初始化options
    if (this.options.oldAg || this.options.oldMoved) {
      Object.assign(this.options, {
        'getMainMenuItems': ag => this.getMainMenuItems(ag, this),
        'agColumnVisibleChanged': (...params) => this.onColumnVisibleChanged(...params),
      })
    }
  }
}

// import OmsAgTable from 'burgeonComponents/js/OmsAgTable'
// export default OmsAgTable
</script>

<style lang="less" scoped>
@import "burgeonComponents/common/css/table.less";
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