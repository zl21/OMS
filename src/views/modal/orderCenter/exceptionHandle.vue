<template>
  <!-- 异常处理 -->
  <div class="exceptionHandle customized-modal" v-loading="loading">
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
import exceptionHandle from '@/js/modal/orderCenter/exceptionHandle';

export default exceptionHandle;
</script>
