<template>
  <div class="modifyWarehouse cus-modal">
    <OmsForm :form-config="formConfig" />
    <OmsButton :btn-config="btnConfig" class="modal-footer" />
  </div>
</template>

<script>
  import modifyWarehouse from '@/js/modal/orderCenter/returngood/modifyWarehouse';

  export default modifyWarehouse;
</script>

<style lang="less">
</style>
