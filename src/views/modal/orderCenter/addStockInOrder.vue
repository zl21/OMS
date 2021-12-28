<template>
  <div class="addStockInOrder cus-modal">
    <div class="subtablePart">
      <OmsForm :form-config="formConfig" />
    </div>
    <div class="buttons cus-modal-btn">
      <OmsButton :btn-config="btnConfig" />
    </div>
  </div>
</template>
<script>
  import addStockInOrder from '@/js/modal/orderCenter/addStockInOrder';

  export default addStockInOrder; 
</script>
