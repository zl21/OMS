<template>
  <div class="modifyWms">
    <div class="form">
      <label>修改传WMS拣货单字段 : </label>
      <Input v-model="send_wms_pick" />
    </div>
    <businessButton :btn-config="btnConfig" />
  </div>
</template>

<script>
  import modifyWarehouse from '@/js/modal/orderCenter/modifyWarehouse';

  export default modifyWarehouse;
</script>

<style lang="less" scoped>
  @import "~@/css/modal/orderCenter/modifyWarehouse.less";
</style>
