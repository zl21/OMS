<template>
  <div
    style="width:250px"
    class="gf"
  >
    <!-- 是否确认同步库存？ -->
    <p class="title">
    <!-- title == '按筛选条件手工同步到页面' -->
      {{ webname == 'manualCalcSyncPageChannelProduct' ? '是否确认同步页面' :vmI18n.t('modalTips.by') }}
    </p>
    <businessButton :btn-config="btnConfig" />
  </div>
</template>

<script>
  import channelInventory from '@/js/modal/inventoryCenter/channelInventory';

  export default channelInventory;
</script>

<style>
  @import "~@/css/modal/inventoryCenter/channelInventory.less";
</style>
