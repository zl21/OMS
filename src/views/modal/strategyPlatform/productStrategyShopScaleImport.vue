<template>
  <div class="import-page">
    <importTable :component-data="componentData" />
  </div>
</template>

<script>
  import productStrategyShopScaleImport from '@/js/modal/strategyPlatform/productStrategyShopScaleImport';

  export default productStrategyShopScaleImport;
</script>

<style lang="less" scoped>
  @import "~@/css/modal/strategyPlatform/productStrategyShopScaleImport.less";
</style>
