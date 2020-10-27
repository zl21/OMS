<template>
  <div class="order-item">
    <jordan-action-table
      :jordanTableConfig="tableConfig"
      @on-select="onSelect"
      @on-select-cancel="onSelectCancel"
      @on-select-all="onSelectAll"
      @on-select-all-cancel="onSelectAllCancel"
      @on-row-click="onRowClick"
      @on-row-dblclick="onRowDblclick"
      @table-delete-detail="tableDeleteDetail"
      @on-page-change="pageChange"
      @on-page-size-change="pageSizeChange"
    ></jordan-action-table>
  </div>
</template>

<script>
import custManageAdd from "@/js/pages/orderCenter/orderManageDetail/details/custManageAdd";
export default custManageAdd;
</script>
<style lang='less'>
  @import "~@/css/pages/orderCenter/orderManageDetail/details/custOrderItem.less";
</style>
