<template>
  <!-- 唯品会退货单->配货单明细 -->
  <div class="distributionOrderList">
    <businessActionTable
      :jordan-table-config="tableConfig"
      @on-page-change="pageChange"
      @on-page-size-change="pageSizeChange"
    />
  </div>
</template>

<script>
  import distributionOrderList from '@/js/pages/orderCenter/vipJit/distributionOrderList';

  export default distributionOrderList;
</script>
