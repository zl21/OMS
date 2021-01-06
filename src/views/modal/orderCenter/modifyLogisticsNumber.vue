<template>
  <div
    class="semiCustomModal"
    style="width: 400px;"
  >
    <div class="Modal-Form">
      <div class="Modal-Form-Item">
        <label>修改物流单号 : </label>
        <Input v-model="sticsNumber" />
      </div>
    </div>
    <businessButton :btn-config="btnConfig" />
  </div>
</template>

<script>
  import modifyLogisticsNumber from '@/js/modal/orderCenter/modifyLogisticsNumber';

  export default modifyLogisticsNumber;
</script>

<style lang="less" scoped>
  @import "~@/css/modal/orderCenter/modifyLogisticsNumber.less";
</style>
