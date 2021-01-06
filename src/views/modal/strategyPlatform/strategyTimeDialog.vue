<template>
  <div
    v-loading="dialogLoad"
    class="time-dialog"
  >
    <div class="time-dialog-form">
      <businessForm
        :form-config="formConfig"
      />
    </div>
    <businessButton
      :btn-config="btnConfig"
    />
  </div>
</template>

<script>
  import strategyTimeDialog from '@/js/modal/strategyPlatform/strategyTimeDialog';

  export default strategyTimeDialog;
</script>

<style lang="less" scoped>
  @import "~@/css/modal/strategyPlatform/strategyTimeDialog.less";
</style>
