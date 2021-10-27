<!--
 * @Author: your name
 * @Date: 2021-06-21 10:17:42
 * @LastEditTime: 2021-06-29 16:03:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /burgeon-business-components/vueAgTable.vue
-->
<template>
    <div class="agTable">
        <arkCommonTableByAgGrid
        ref="agGrid"
        :rowHeight="agTableConfig.rowHeight"
        :height="agTableConfig.tableHeight"
        :options="options"
        :data="agTableConfig.rowData"
        :columns="agTableConfig.columnDefs"
        @grid-ready="gridReady"
        :renderParams="agTableConfig.renderParams"
        @on-row-dblclick="tableRowDbclick"
        @on-selection-change="tableSelectedChange"
        @on-column-moved="colMoved"
        @on-column-pinned="colPinned"
        @on-sort-change="colSortChange"
      ></arkCommonTableByAgGrid>

      <div class="page"
         v-show="agTableConfig.pageShow && (agTableConfig.rowData || []).length !== 0">
      <span style="paddingright: 8px">{{vmI18n.t('common.total')}} {{ agTableConfig.pagenation.total }} {{vmI18n.t('common.piece')}}</span>
      <Page class="page-pages"
            size="small"
            :total="agTableConfig.pagenation.total"
            :current="agTableConfig.pagenation.current"
            :page-size="agTableConfig.pagenation.pageSize"
            :page-size-opts="agTableConfig.pagenation.pageSizeOpts"
            show-elevator
            show-sizer
            :transfer="true"
            @on-change="pageChange"
            @on-page-size-change="onPageSizeChange" />
    </div>
    </div>
</template>

<script>
import businessAgTable from './js/businessAgTable'
export default businessAgTable
</script>

<style lang="less" scoped>
@import "common/css/table.less";
// @import "css/agGridTable.less";
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