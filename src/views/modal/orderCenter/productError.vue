<template>
  <!-- 商品异常处理 -->
  <div class="productError customized-modal" v-loading="loading">
    <OmsTable
      :jordan-table-config="tableConfig"
      @on-select="onSelect"
      @on-select-cancel="onSelect"
      @on-select-all="onSelect"
      @on-select-all-cancel="onSelect"
      @on-page-change="pageChange"
      @on-page-size-change="pageSizeChange"
    />
    <OmsButton class="modal-footer" :btn-config="btnConfig" />
  </div>
</template>

<script>
  import productError from '@/js/modal/orderCenter/productError';
  export default productError;
</script>

