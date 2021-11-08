<template>
  <div class="modifyWarehouse">
    <OmsForm :form-config="formConfig" />
    <OmsButton :btn-config="btnConfig" />
  </div>
</template>

<script>
  import modifyWarehouse from '@/js/modal/orderCenter/returngood/modifyWarehouse';

  export default modifyWarehouse;
</script>

<style lang="less">
</style>
