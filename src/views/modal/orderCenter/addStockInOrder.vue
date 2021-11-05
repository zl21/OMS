<template>
  <div class="addStockInOrder customized-modal">
    <div class="subtablePart">
      <businessForm :form-config="formConfig" />
    </div>
    <div class="buttons customized-modal-btn">
      <OmsButton :btn-config="btnConfig" />
    </div>
  </div>
</template>
<script>
  import addStockInOrder from '@/js/modal/orderCenter/addStockInOrder';

  export default addStockInOrder; 
</script>
