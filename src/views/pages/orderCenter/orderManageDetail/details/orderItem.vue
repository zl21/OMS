<template>
  <div>
    <OmsTable
      :jordan-table-config="tableConfig"
      @on-page-change="pageChange"
      @on-page-size-change="pageSizeChange"
    />
  </div>
</template>

<script>
  import orderItem from '@/js/pages/orderCenter/orderManageDetail/details/orderItem';

  export default orderItem;
</script>
