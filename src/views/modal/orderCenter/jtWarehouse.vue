<template>
  <div style="width: 400px; padding-right: 20px">
    <businessForm :form-config="warehouseManagementFromConfig" />
    <jordanBtn :btn-config="warehouseManagementBtnConfig" />
  </div>
</template>

<script>
  import jtWarehouse from '@/js/modal/orderCenter/jtWarehouse';

  export default jtWarehouse;
</script>

<style>
  @import "~@/css/modal/orderCenter/jtWarehouse.less";
</style>
