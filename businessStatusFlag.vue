<!-- 单据状态标志 -->
<template>
  <!--
    statusName 根据状态名称来判断显示哪张水印
  -->
  <div class="statusName"
  v-if="statusName !== ''">
    <img :src="flagObj[statusName]"/>
  </div>
</template>

<script>
import businessStatusFlag from './js/businessStatusFlag.js';
export default businessStatusFlag;
</script>

<style lang="less">
@import "css/businessStatusFlag.less";
</style>

