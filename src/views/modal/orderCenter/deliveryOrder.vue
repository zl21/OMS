<template>
  <div style="width: 400px; padding-right: 20px">
    <businessForm :form-config="formConfig" />
    <jordanBtn :btn-config="btnConfig" />
  </div>
</template>

<script>
  import deliveryOrder from '@/js/modal/orderCenter/deliveryOrder';

  export default deliveryOrder;
</script>
<style lang="less" scoped></style>
