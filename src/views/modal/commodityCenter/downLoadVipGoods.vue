<template>
  <div class="customized-modal" style="width:400px;padding-right:15px">
    <businessForm :form-config="formConfig" />
    <OmsButton class="modal-footer" :btn-config="buttonConfig" />
  </div>
</template>

<script>
  import downLoadVipGoods from '@/js/modal/commodityCenter/downLoadVipGoods';

  export default downLoadVipGoods;
</script>

<style></style>
