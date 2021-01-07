<template>
  <div style="width:400px">
    <businessForm :formConfig="downLoadVipTimeOrderFormConfig"></businessForm>
    <jordanBtn :btnConfig="downLoadVipTimeOrderBtnConfig"></jordanBtn>
  </div>
</template>
<script>
  import downLoadVipBill from '@/js/modal/financeCenter/downLoadAlipayBill';

  export default downLoadVipBill;
</script>

<style lang="less" scoped>
  @import "~@/css/modal/financeCenter/downLoadAlipayBill.less";
</style>
