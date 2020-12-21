<template>
  <div
    v-loading="pageLoad"
    class="taobao-page"
  >
    <business-form :form-config="formConfig" />
    <business-btn :btn-config="btnConfig" />
  </div>
</template>

<script>
  import taobaoRefuseExchange from '@/js/modal/InterfacePlatform/taobaoRefuseExchange';

  export default taobaoRefuseExchange;
</script>

<style lang="less" scoped>
  @import '~@/css/modal/InterfacePlatform/taobaoRefuseExchange.less';
</style>
