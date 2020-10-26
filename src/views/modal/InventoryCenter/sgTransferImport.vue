<template>
  <div style="width: 550px;">
    <importTable
      :component-data="componentData"
      @closeActionDialog="closeActionDialog"
    />
  </div>
</template>

<script>
  import sgTransferImport from "@/js/modal/InventoryCenter/sgTransferImport";
  export default sgTransferImport;
</script>

<style lang="less" scoped></style>
