<template>
  <div
    style="width:460px"
  >
    <businessForm :form-config="receiptFormConfig" />
    <businessButton :btn-config="downLoadBtnConfig" />
  </div>
</template>

<script>
  import customizedReceipt from '@/js/modal/InterfacePlatform/customizedReceipt';

  export default customizedReceipt;
</script>

<style >
  @import "~@/css/modal/InterfacePlatform/customizedReceipt.less";
</style>
