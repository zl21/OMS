<template>
  <div class="import-page">
    <importTable :componentData="componentData"></importTable>
  </div>
</template>

<script>
import extraReturnImport from '@/js/modal/orderCenter/extraReturnImport';
export default extraReturnImport;
</script>

<style lang="less" scoped>
.import-page {
  width: 550px;
}
</style>
