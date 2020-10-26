<template>
  <div style="width:400px;padding-right:20px">
    <businessForm :formConfig="pickorderFromConfig"></businessForm>
    <jordanBtn :btnConfig="pickorderBtnConfig"></jordanBtn>
  </div>
</template>

<script>
  import vipDownloadPo from "@/js/modal/orderCenter/vipDownloadPo";
  export default vipDownloadPo;
</script>
