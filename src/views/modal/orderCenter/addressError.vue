<template>
  <!-- 地址异常处理 -->
  <div class="addressError customized-modal" v-loading="loading">
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
  import addressError from '@/js/modal/orderCenter/addressError';
  export default addressError
</script>

<style lang="less">
</style>