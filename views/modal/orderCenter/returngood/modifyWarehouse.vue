<template>
  <div class="modifyWarehouse">
    <business-form :form-config="formConfig" />
    <business-btn :btn-config="btnConfig" />
  </div>
</template>

<script>
  import modifyWarehouse from '@/js/modal/orderCenter/returngood/modifyWarehouse';

  export default modifyWarehouse;
</script>

<style lang="less">
</style>
