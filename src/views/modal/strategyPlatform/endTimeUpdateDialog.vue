<template>
  <div
    v-loading="dialogLoad"
    class="time-dialog"
  >
    <div class="time-dialog-form">
      <businessForm :form-config="formConfig" />
    </div>
    <businessButton :btn-config="btnConfig" />
  </div>
</template>

<script>
  import endTimeUpdateDialog from '@/js/modal/strategyPlatform/endTimeUpdateDialog';

  export default endTimeUpdateDialog;
</script>

<style lang="less" scoped>
  @import "~@/css/modal/strategyPlatform/endTimeUpdateDialog.less";
</style>
