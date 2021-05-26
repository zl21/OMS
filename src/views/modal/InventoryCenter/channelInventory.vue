<template>
  <div
    style="width:250px"
    class="gf"
  >
    <!-- 是否确认同步库存？ -->
    <p class="title">
      {{ title == '按筛选条件手工同步到页面' ? '是否确认同步页面，本次所需时间较长，请耐心等待' :vmI18n.t('modalTips.by') }}
    </p>
    <businessButton :btn-config="btnConfig" />
  </div>
</template>

<script>
  import channelInventory from '@/js/modal/InventoryCenter/channelInventory';

  export default channelInventory;
</script>

<style>
  @import "~@/css/modal/InventoryCenter/channelInventory.less";
</style>
