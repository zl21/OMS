<template>
  <div class="dilog">
    <jordan-table
      :jordan-table-config="jordanTableConfig"
      @on-select="onSelect"
      @on-select-cancel="onSelectCancel"
      @on-select-all="onSelectAll"
      @on-select-all-cancel="onSelectAllCancel"
    />
    <div class="dilogBtn">
      <jordan-button :btn-config="btnConfig" />
    </div>
  </div>
</template>

<script>
  import scandilog from '@/js/pages/orderCenter/scanIn/scandilog.js';

  export default scandilog;
</script>

<style scoped>
    .dilogBtn {
        margin-top: 10px;
    }
</style>
