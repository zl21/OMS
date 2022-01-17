<template>
  <div class="cus-modal" style="width:400px;">
    <OmsForm :form-config="pickorderFromConfig" />
    <OmsButton class="modal-footer" :btn-config="pickorderBtnConfig" />
  </div>
</template>

<script>
  import vipDownloadPo from '@/js/modal/orderCenter/vipDownloadPo';

  export default vipDownloadPo;
</script>
