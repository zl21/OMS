<template>
  <div style="width:400px">
    <p>本次操作已后台处理，是否至<a href="/SYSTEM/TABLE/CP_C_TASK/24386">[我的任务]</a>查看</p>
    <jordanBtn :btnConfig="exportBtnConfig"></jordanBtn>
  </div>
</template>

<script>
  import customstandsettleaccountexport from '@/js/modal/financeCenter/customstandsettleaccountexport';

  export default customstandsettleaccountexport;
</script>

<style lang="less" scoped>
</style>
