<template>
  <div class="import-page">
    <importTable :component-data="componentData" />
  </div>
</template>

<script>
  import extraReturnImport from '@/js/modal/orderCenter/extraReturnImport';

  export default extraReturnImport;
</script>

<style lang="less" scoped>
  @import "~@/css/modal/orderCenter/extraReturnImport.less";
</style>
