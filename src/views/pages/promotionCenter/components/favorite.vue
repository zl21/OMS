<template>
  <div
    class="favoriteForm"
    @click="setFavorite"
  >
    <span :class="icon" />
  </div>
</template>
<script>
  import favorite from '@/js/pages/promotionCenter/components/favorite';

  export default favorite;
</script>
<style lang="less" scoped>
@import "~@/css/pages/promotionCenter/components/favorite.less";
</style>
