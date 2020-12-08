<template>
  <div
    style="width:250px"
    class="gf"
  >
    <!-- 是否确认同步库存？ -->
    <p class="title">
      {{ vmI18n.t('modalTips.by') }}
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
