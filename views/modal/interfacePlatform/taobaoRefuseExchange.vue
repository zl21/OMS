<template>
  <!-- 淘宝换货单接口-拒绝换货 -->
  <div class="taobao-page">
    <business-form :form-config="formConfig" />
    <business-btn :btn-config="btnConfig" />
  </div>
</template>

<script>
import taobaoRefuseExchange from '@/js/modal/interfacePlatform/taobaoRefuseExchange';

export default taobaoRefuseExchange;
</script>

<style lang="less" scoped>
@import "~@/css/modal/interfacePlatform/taobaoRefuseExchange.less";
</style>
