<template>
  <!-- HOLD单策略 - 调整策略时间 -->
  <div v-loading="dialogLoad" class="cus-modal">
    <OmsForm :form-config="formConfig" />
    <div class="modal-footer">
      <OmsButton :btn-config="btnConfig" />
    </div>
  </div>
</template>

<script>
import strategyTimeDialog from '@/js/modal/strategyPlatform/strategyTimeDialog';

export default strategyTimeDialog;
</script>

<style lang="less" scoped>
@import "~@/css/modal/strategyPlatform/strategyTimeDialog.less";
</style>
