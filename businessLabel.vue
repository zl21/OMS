<template>
  <div class="jordan-label-box">
    <div v-for="(item,index) in labelList" :key="index">
        <div 
          v-show="(item.isShow === false) ? false :true"
          class="jordan-label"
          :class="{colorStyle:defaultData === item.value}"
          @click="click(item,index)">
        <div class="underline_right"
            v-show="index === 0"></div>
        <span class="jordan-label-name">{{item.label}}</span>
        <div class="underline"></div>
      </div>
    </div>
    <div class="underline-flex"
         v-show="labelList.length !== 0 || labelList !== undefined"></div>
    </div>
</template>

<script>
import businessLabel from './js/businessLabel.js';
export default businessLabel;
</script>

<style lang="less" scoped>
@import "css/businessLabel.less";
</style>
