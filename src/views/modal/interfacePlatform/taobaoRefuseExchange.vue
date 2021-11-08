<!--
 * @Author: your name
 * @Date: 2021-04-27 11:20:18
 * @LastEditTime: 2021-07-20 15:30:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /project-logic/views/modal/interfacePlatform/taobaoRefuseExchange.vue
-->
<template>
  <!-- 淘宝换货单接口-拒绝换货 -->
  <div class="customized-modal" style="width: 430px">
    <OmsForm :form-config="formConfig" />
    <OmsButton  class="modal-footer" :btn-config="btnConfig" />
  </div>
</template>

<script>
import taobaoRefuseExchange from '@/js/modal/interfacePlatform/taobaoRefuseExchange';

export default taobaoRefuseExchange;
</script>

<style lang="less" scoped>
@import "~@/css/modal/interfacePlatform/taobaoRefuseExchange.less";
</style>
