<template>
  <!-- 唯品会进度账单聚合表列表 唯品会月结账单聚合表列表 (生成销售单) -->
  <div
    class="generateSalesOrder"
    style="width:400px;padding-right:20px"
  >
    <OmsForm :form-config="generateFormConfig" />
    <OmsButton :btn-config="generateBtnConfig" />
  </div>
</template>

<script>
  import generateSalesOrder from '@/js/modal/financeCenter/generateSalesOrder';

  export default generateSalesOrder;
</script>

<style lang="less" scoped>
  @import "~@/css/modal/financeCenter/generateSalesOrder.less";
</style>
