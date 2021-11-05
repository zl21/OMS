<!--
 * @Author: your name
 * @Date: 2021-11-03 18:01:58
 * @LastEditTime: 2021-11-04 15:47:59
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /burgeon-project-logic/src/views/modal/financeCenter/downLoadVipBill.vue
-->
<template>
  <!-- 下载账单 -->
  <div
    class="downLoadVipBill"
    style="width:430px;padding-right:20px"
  >
    <businessForm :form-config="downLoadFormConfig" />
    <OmsButton :btn-config="downLoadBtnConfig" />
  </div>
</template>

<script>
  import downLoadVipBill from '@/js/modal/financeCenter/downLoadVipBill';

  export default downLoadVipBill;
</script>

<style lang="less" scoped>
  @import "~@/css/modal/financeCenter/downLoadVipBill.less";
</style>
