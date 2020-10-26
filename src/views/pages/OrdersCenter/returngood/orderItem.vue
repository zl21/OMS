<template>
  <div>
    <jordan-action-table :jordanTableConfig="tableConfig"
     @on-page-change="pageChange"
     @on-page-size-change="pageSizeChange"
    ></jordan-action-table>
  </div>
</template>

<script>
  import orderItem from "@/js/pages/orderCenter/returngood/orderItem";
  export default orderItem;
</script>
