<!--
 * @Author: your name
 * @Date: 2021-04-26 18:32:29
 * @LastEditTime: 2021-11-02 17:57:28
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /burgeon-business-components/src/view/businessStatusFlag.vue
-->
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
import businessStatusFlag from 'burgeonComponents/js/businessStatusFlag.js';
export default businessStatusFlag;
</script>

<style lang="less">
@import "burgeonComponents/css/businessStatusFlag.less";
</style>

