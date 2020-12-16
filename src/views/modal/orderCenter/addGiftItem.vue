<!--增加赠品-->
<template>
  <div>
    <loading :loading="loading"></loading>
    <EasyMatrix :component-data="matrixData" />
    <businessActionTable
      :jordan-table-config="tableConfig"
      @on-select="onSelect"
      @on-select-cancel="onSelectCancel"
      @on-select-all="onSelectAll"
      @on-select-all-cancel="onSelectAllCancel"
      @on-row-click="onRowClick"
      @on-row-dblclick="onRowDblclick"
      @table-delete-detail="tableDeleteDetail"
      @on-page-change="pageChange"
      @on-page-size-change="pageSizeChange"
    />
    <businessButton :btn-config="btnConfig" />
  </div>
</template>
<script>
  import addGiftItem from '@/js/modal/orderCenter/addGiftItem';

  export default addGiftItem;
</script>
<style lang="less" scoped>
.order-footer {
  margin-top: 10px;
}
</style>
