<template>
  <div class="queryConditionRetransmissionWms">
    <!-- 出库通知单->按查询条件重传wms按钮 -->
    <p>确定根据查询条件重传WMS?</p>
    <div class="dialog-footer">
      <Button
        type="primary"
        size="small"
        @click="determine"
      >
        {{ vmI18n.t("common.determine") }}
      </Button>
      <!-- 取消 -->
      <Button
        type="error"
        ghost
        size="small"
        @click="
          () => {
            this.$emit('closeActionDialog');
          }
        "
      >
        {{ vmI18n.t("common.cancel") }}
      </Button>
    </div>
  </div>
</template>

<script>
  import queryConditionRetransmissionWms from '@/js/modal/InventoryCenter/queryConditionRetransmissionWms';

  export default queryConditionRetransmissionWms;
</script>
