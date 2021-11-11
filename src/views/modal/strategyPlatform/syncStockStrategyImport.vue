<template>
  <div class="import-page">
    <ImportTable :component-data="componentData" />
  </div>
</template>

<script>
  import syncStockStrategyImport from '@/js/modal/strategyPlatform/syncStockStrategyImport';

  export default syncStockStrategyImport;
</script>

<style lang="less" scoped>
  @import "~@/css/modal/strategyPlatform/syncStockStrategyImport.less";
</style>
