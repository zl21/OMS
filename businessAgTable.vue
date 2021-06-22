<!--
 * @Author: your name
 * @Date: 2021-06-21 10:17:42
 * @LastEditTime: 2021-06-22 13:50:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /burgeon-business-components/vueAgTable.vue
-->
<template>
    <div class="vueAgTable">
        <commonTableByAgGrid
        ref="agGrid"
        :height="agTableConfig.tableHeight"
        :options="options"
        :data="agTableConfig.rowData"
        :columns="agTableConfig.columnDefs"
        @grid-ready="gridReady"
        :renderParams="agTableConfig.renderParams"
        @on-row-dblclick="tableRowDbclick"
        @on-sort-change="tableSortChange"
        @on-selection-change="tableSelectedChange"
      ></commonTableByAgGrid>

      <div class="page"
         v-show="(agTableConfig.rowData || []).length !== 0">
      <span style="paddingright: 8px">共{{ agTableConfig.pagenation.total }}条</span>
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