<template>
  <!-- 商品异常处理 -->
  <div class="productError customized-modal">
    <businessActionTable
      :jordan-table-config="tableConfig"
      @on-select="onSelect"
      @on-select-cancel="onSelect"
      @on-select-all="onSelect"
      @on-select-all-cancel="onSelect"
      @on-page-change="pageChange"
      @on-page-size-change="pageSizeChange"
    />
    <businessButton class="modal-footer" :btn-config="btnConfig" />
    <loading :loading="loading" />
  </div>
</template>

<script>
  import productError from '@/js/modal/orderCenter/productError';
  export default productError;
</script>

