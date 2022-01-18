<template>
  <div style="width:400px">
    <p class="custom-dialog-body-p">本次操作将提交至后台处理，是否确认提交？</p>
    <p class="custom-dialog-body-p">提交后可通过<a href="/SYSTEM/TABLE/CP_C_TASK/24386">[我的任务]</a>进行查看</p>
    <jordanBtn :btnConfig="exportBtnConfig"></jordanBtn>
  </div>
</template>

<script>
  import customstandsettleaccountexport from '@/js/modal/financeCenter/customstandsettleaccountexport';

  export default customstandsettleaccountexport;
</script>

<style lang="less" scoped>
  .custom-dialog-body-p{
    padding: 5px 0;
  }
</style>
