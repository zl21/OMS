<template>
  <div class="dialog">
    <OmsTable
      :jordan-table-config="jordanTableConfig"
      @on-select="onSelect"
      @on-select-cancel="onSelectCancel"
      @on-select-all="onSelectAll"
      @on-select-all-cancel="onSelectAllCancel"
    />
    <div class="dialogBtn">
      <OmsButton :btn-config="btnConfig" />
    </div>
  </div>
</template>

<script>
  import scanDialog from '@/js/pages/orderCenter/scanIn/scanDialog';

  export default scanDialog;
</script>

<style scoped>
    .dialogBtn {
        margin-top: 10px;
    }
</style>
