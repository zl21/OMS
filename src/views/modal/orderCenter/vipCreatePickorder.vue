<template>
  <div style="width: 400px; padding-right: 20px">
    <businessForm :formConfig="pickorderFromConfig"></businessForm>
    <jordanBtn :btnConfig="pickorderBtnConfig"></jordanBtn>
  </div>
</template>

<script>
  import vipCreatePickorder from "@/js/modal/orderCenter/vipCreatePickorder";
  export default vipCreatePickorder;
</script>

<style>
</style>
