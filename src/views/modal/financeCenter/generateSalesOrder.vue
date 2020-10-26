<template>
  <!-- 下载账单 -->
  <div class="generateSalesOrder" v-loading="pageLoad" style="width:400px;padding-right:20px">
    <businessForm :formConfig="generateFormConfig"></businessForm>
    <jordanBtn :btnConfig="generateBtnConfig"></jordanBtn>
  </div>
</template>

<script>
  import generateSalesOrder from "@/js/modal/financeCenter/generateSalesOrder";
  export default generateSalesOrder;
</script>

<style lang="less" scoped>
  @import "~@/css/modal/financeCenter/generateSalesOrder.less";
</style>
