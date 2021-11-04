<template>
  <div style="width: 550px;">
    <importTable
      :component-data="componentData"
      @closeActionDialog="closeActionDialog"
    />
  </div>
</template>

<script>
  import sgTransferImport from '@/js/modal/inventoryCenter/sgTransferImport';

  export default sgTransferImport;
</script>

<style lang="less" scoped></style>
