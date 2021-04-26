<template>
  <div class="agTable">
    <div class="agGridTable isagTable"
         ref="agGridTable"></div>
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
import agGridTable from './js/agGridTable';
export default agGridTable;
</script>

<style lang="less" scoped>
@import "common/css/table.less";
@import "css/agGridTable.less";
</style>
