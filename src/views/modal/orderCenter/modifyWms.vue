<template>
  <div class="modifyWms">
    <div class="form">
      <label>修改传WMS拣货单字段 : </label>
      <Input v-model="send_wms_pick" />
    </div>
    <OmsButton :btn-config="btnConfig" />
  </div>
</template>

<script>
  import modifyWms from '@/js/modal/orderCenter/modifyWms';

  export default modifyWms;
</script>

<style lang="less" scoped>
  @import "~@/css/modal/orderCenter/modifyWms.less";
</style>
