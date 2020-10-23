<template>
  <div style="width: 400px; padding-right: 20px">
    <businessForm :formConfig="warehouseManagementFromConfig"></businessForm>
    <jordanBtn :btnConfig="warehouseManagementBtnConfig"></jordanBtn>
  </div>
</template>

<script>
  import jtWarehouse from "@/js/modal/orderCenter/jtWarehouse";
  export default jtWarehouse;
</script>

<style>
.burgeon-select-dropdown-transfer {
  z-index: 9999 !important;
}
</style>
