<template>
  <div class="queryConditionRetransmissionWms">
    <!-- 出库通知单->按查询条件重传wms按钮 -->
    <p>确定根据查询条件重传WMS?</p>
    <div class="dialog-footer">
      <OmsButton :btn-config="btnConfig" />
    </div>
  </div>
</template>

<script>
  import queryConditionRetransmissionWms from '@/js/modal/inventoryCenter/queryConditionRetransmissionWms';

  export default queryConditionRetransmissionWms;
</script>
