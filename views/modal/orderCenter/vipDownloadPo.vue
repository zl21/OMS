<template>
  <div style="width:400px;padding-right:20px">
    <businessForm :form-config="pickorderFromConfig" />
    <businessButton :btn-config="pickorderBtnConfig" />
  </div>
</template>

<script>
  import vipDownloadPo from '@/js/modal/orderCenter/vipDownloadPo';

  export default vipDownloadPo;
</script>
