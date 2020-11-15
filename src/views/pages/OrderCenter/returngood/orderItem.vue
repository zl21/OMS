<template>
  <div>
    <jordan-action-table
      :jordan-table-config="tableConfig"
      @on-page-change="pageChange"
      @on-page-size-change="pageSizeChange"
    />
  </div>
</template>

<script>
  import orderItem from '@/js/pages/orderCenter/returngood/orderItem';

  export default orderItem;
</script>
<style lang="less">
  @import "~@/css/pages/orderCenter/returngood/orderItem.less";
</style>
