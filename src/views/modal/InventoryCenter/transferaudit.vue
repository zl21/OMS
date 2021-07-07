<template>
  <div
    style="width:750px"
    class="gf"
  >
    
    <business-action-table
      :jordan-table-config="jordanTableConfig"
      @on-select="returnOnSelect"
      @on-select-cancel="returnCancel"
      @on-select-all="returnSelectAll"
      @on-select-all-cancel="returnSelectAllCancel"
      @table-delete-detail="returnDeleteDetail"
    />
    <businessButton :btn-config="btnConfig" />
  </div>
</template>

<script>
  import transferaudit from '@/js/modal/InventoryCenter/transferaudit';

  export default transferaudit;
</script>

<style>
  @import "~@/css/modal/InventoryCenter/transferaudit.less";
</style>
