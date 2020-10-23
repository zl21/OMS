<template>
  <div style="width: 400px; padding-right: 20px">
    <businessForm :formConfig="formConfig"></businessForm>
    <jordanBtn :btnConfig="btnConfig"></jordanBtn>
  </div>
</template>

<script>
  import deliveryOrder from "@/js/modal/orderCenter/deliveryOrder";
  export default deliveryOrder;
</script>
<style>
</style>
