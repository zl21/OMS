<template>
  <div style="width: 400px; padding-right: 20px">
    <businessForm :form-config="pickorderFromConfig" />
    <jordanBtn :btn-config="pickorderBtnConfig" />
  </div>
</template>

<script>
  import vipCreatePickorder from '@/js/modal/orderCenter/vipCreatePickorder';

  export default vipCreatePickorder;
</script>
