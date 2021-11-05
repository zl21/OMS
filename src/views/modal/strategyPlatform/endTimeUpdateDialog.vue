<template>
<!-- eg.直播解析策略 - 延迟结束时间 -->
  <div
    class="time-dialog"
  >
    <div class="time-dialog-form">
      <OmsForm :form-config="formConfig" />
    </div>
    <OmsButton :btn-config="btnConfig" />
  </div>
</template>

<script>
  import endTimeUpdateDialog from '@/js/modal/strategyPlatform/endTimeUpdateDialog';

  export default endTimeUpdateDialog;
</script>

<style lang="less" scoped>
  @import "~@/css/modal/strategyPlatform/endTimeUpdateDialog.less";
</style>
