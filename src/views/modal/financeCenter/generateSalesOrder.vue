<template>
  <!-- 下载账单 -->
  <div
    v-loading="pageLoad"
    class="generateSalesOrder"
    style="width:400px;padding-right:20px"
  >
    <businessForm :form-config="generateFormConfig" />
    <jordanBtn :btn-config="generateBtnConfig" />
  </div>
</template>

<script>
  import generateSalesOrder from '@/js/modal/financeCenter/generateSalesOrder';

  export default generateSalesOrder;
</script>

<style lang="less" scoped>
  @import "~@/css/modal/financeCenter/generateSalesOrder.less";
</style>
