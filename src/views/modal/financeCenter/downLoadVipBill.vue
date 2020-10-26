<template>
  <!-- 下载账单 -->
  <div class="downLoadVipBill" style="width:430px;padding-right:20px">
    <businessForm :formConfig="downLoadFormConfig"></businessForm>
    <jordanBtn :btnConfig="downLoadBtnConfig"></jordanBtn>
  </div>
</template>

<script>
  import downLoadVipBill from "@/js/modal/financeCenter/downLoadVipBill";
  export default downLoadVipBill;
</script>

<style lang="less" scoped>
  @import "~@/css/modal/financeCenter/downLoadVipBill.less";
</style>
