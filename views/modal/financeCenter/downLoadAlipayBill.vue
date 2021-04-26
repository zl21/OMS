<template>
  <div style="width:400px">
    <businessForm :form-config="downLoadVipTimeOrderFormConfig" />
    <jordanBtn :btn-config="downLoadVipTimeOrderBtnConfig" />
  </div>
</template>
<script>
  import downLoadVipBill from '@/js/modal/financeCenter/downLoadAlipayBill';

  export default downLoadVipBill;
</script>

<style lang="less" scoped>
  @import "~@/css/modal/financeCenter/downLoadAlipayBill.less";
</style>
