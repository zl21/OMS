<template>
  <div class="favoriteForm" @click="setFavorite">
    <span :class="icon" />
  </div>
</template>
<script>
  import favorite from "@/js/pages/promotionCenter/components/favorite";
  export default favorite;
</script>
<style lang="less" scoped>
.favoriteForm {
  border-radius: 2px;
  line-height: 24px;
  height: 24px;
  border: 1px solid #fd6442;
  color: #fd6442;
  display: inline-block;
  > span {
    font-size: 12px;
    padding: 5px;
  }
}
</style>
