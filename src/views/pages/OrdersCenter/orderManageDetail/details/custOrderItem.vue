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
.order-item {
  .burgeon-table-tfoot {
    transform: translateY(1px) !important;
  }
  .burgeon-table-tfoot tr:first-child td {
    border-top: none;
  }
  // .burgeon-table-fixed {
  //   width: 42px !important;
  // }
}
</style>
