<template>
  <div class="monitorPlatformList" style="height: 100px" v-if="tableName == 'OC_B_ORDER_LOG'">
    <div>哈哈哈，这个是测试啦啦啦</div>
  </div>
</template>
<script>

export default {
  inheritAttrs: true,
  computed: {
    tableName() {
      return this.$store.state.global.activeTab.tableName
    }
  }
}
</script>
<style lang="less" scoped>
.monitorPlatformList {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>