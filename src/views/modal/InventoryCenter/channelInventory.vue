<template>
  <div style="width:250px" class="gf">
    <!-- 是否确认同步库存？ -->
    <p class="title">{{vmI18n.t('mmodalTips.by')}}</p>
    <div class="dialog-footer">
      <!-- 确定 -->
      <Button type="primary" size="small" @click="determine">
        {{vmI18n.t("common.determine")}}
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
        ">{{ vmI18n.t("common.cancel") }}</Button>
    </div>
  </div>
</template>

<script>
  import channelInventory from "@/js/modal/InventoryCenter/channelInventory";
  export default channelInventory;
</script>

<style>
  @import "~@/css/modal/InventoryCenter/channelInventory.less";
</style>
