<template>
  <div class="tablists">
    <div class="tabs_header">
      <div class="nav_wrap_scroll">
        <div v-for="(item, index) in panels" :key="index" :class="showClass(index)" @click="handleHeaderClick(index)" @dblclick="handleHeaderDbClick(index)">
          <input v-if="showTitle(index, item)" :value="item.group" @input="check($event, item)" @keyup.13="noedit($event, item)" @blur="noedit($event, item)" />
          <span v-if="!showTitle(index, item)">{{ item.group }}{{ item.unit || '' }}</span>
        </div>
      </div>
    </div>
    <div class="tabs_content">
      <slot name="tab_content" />
      <!-- <div v-for="(item,index) in  panels" :key="index" v-show="showContent(index)">{{index}}</div> -->
    </div>
  </div>
</template>
<script>
import tabList from '@/js/pages/promotionCenter/details/tabList';

export default tabList;
</script>
<style lang="less" scoped>
@import '~@/css/pages/promotionCenter/details/tabList.less';
</style>
