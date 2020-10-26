<template>
  <div class="marking">
    <!-- 会员加急发货 -->
    <div v-if="componentData.pageType === 'vip'" class="vip">
      <!-- <span>当前操作会给订单打上加急发货【急】标识，请确认！</span> -->
      <span>{{ vmI18n.t("modalTips.yc") }}</span>
    </div>
    <!-- 定金预售提前发货 -->
    <div v-else class="deposit">
      <re-action-table :jordan-table-config="depositConfig" />
    </div>
    <jordanBtn style="padding-top: 15px" :btn-config="btnConfig" />
  </div>
</template>

<script>
  import manualMarking from "@/js/modal/orderCenter/manualMarking";
  export default manualMarking;
</script>

<style lang="less" scoped>
  @import "~@/css/modal/orderCenter/manualMarking.less";
</style>
